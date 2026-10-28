import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * Adapted from Skiper UI Skiper19 (https://skiper-ui.com/v1/skiper19),
 * by @gurvinder-singh02, inspired by comgio.ai. Free-version attribution
 * is also shown on the Terms page. The route and flower geometry are custom.
 */
export default function WorkScrollStroke({ containerRef, layoutKey }) {
  const [geometry, setGeometry] = useState(null);
  const pathRef = useRef(null);
  const samplesRef = useRef([]);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 72%", "end 72%"],
    layoutEffect: false,
  });

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    let frame;
    const measure = () => {
      const width = root.clientWidth;
      const mobile = width <= 680;
      // offset geometry ignores reveal transforms, so paths don't jump on entry.
      const box = (element) => {
        let x = 0,
          y = 0,
          current = element;
        while (current && current !== root) {
          x += current.offsetLeft;
          y += current.offsetTop;
          current = current.offsetParent;
        }
        return {
          x,
          y,
          width: element.offsetWidth,
          height: element.offsetHeight,
        };
      };
      const title = root.querySelector(".portfolio-headline");
      const images = Array.from(root.querySelectorAll(".project-cover"));
      const end = root.querySelector(".work-stroke-flower-space");
      if (!title || !images.length || !end) return;
      const heading = box(title);
      const flower = box(end);
      const x = width / 2;
      const startY = heading.y + heading.height * 0.25;
      const curl = Math.min(width * 0.22, 240);
      let d = `M ${x - curl * 0.6} ${startY + 55} C ${x - curl} ${startY - 45}, ${x + curl} ${startY - 45}, ${x + curl * 0.7} ${startY + 55} C ${x + curl * 0.5} ${startY + 120}, ${x - curl * 0.8} ${startY + 95}, ${x - curl * 0.45} ${startY + 25} C ${x - curl * 0.2} ${startY - 25}, ${x + curl * 0.65} ${startY + 80}, ${x} ${heading.y + heading.height + 50}`;
      let previous = { x, y: heading.y + heading.height + 50 };
      images.forEach((image, i) => {
        const b = box(image);
        const target = { x: b.x + b.width * 0.5, y: b.y + b.height * 0.55 };
        const gap = target.y - previous.y;
        const sway = mobile ? width * 0.3 : width * 0.2;
        const side = i % 2 === 0 ? -1 : 1;
        d += ` C ${Math.max(24, Math.min(width - 24, previous.x + side * sway))} ${previous.y + gap * 0.42}, ${Math.max(24, Math.min(width - 24, target.x - side * sway))} ${target.y - gap * 0.38}, ${target.x} ${target.y}`;
        previous = target;
      });
      const radius = mobile ? 75 : 100;
      const cy = flower.y + flower.height / 2;
      const stemY = cy - radius - 35;
      d += ` C ${previous.x} ${previous.y + 130}, ${x - 160 * (mobile ? 0.4 : 1)} ${stemY - 130}, ${x} ${stemY}`;
      d += ` C ${x + 20} ${stemY + 15}, ${x} ${cy - radius}, ${x} ${cy - radius * 0.92}`;
      // One continuous six-petal outline, made by the same growing stroke.
      const points = [];
      for (let i = 0; i <= 180; i++) {
        const angle = -Math.PI / 2 + (i / 180) * Math.PI * 2;
        const r = radius * (0.72 + 0.2 * Math.cos(6 * (angle + Math.PI / 2)));
        points.push({
          x: x + r * Math.cos(angle),
          y: cy + r * Math.sin(angle),
        });
      }
      d += points
        .slice(1)
        .map((p) => ` L ${p.x} ${p.y}`)
        .join("");
      setGeometry({
        d,
        width,
        height: root.offsetHeight,
        flowerY: flower.y,
        flowerEnd: flower.y + flower.height,
        stemY,
      });
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    root
      .querySelectorAll(".project-cover,.portfolio-headline,.portfolio-closing")
      .forEach((el) => observer.observe(el));
    schedule();
    document.fonts.ready.then(schedule);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [containerRef, layoutKey]);

  useLayoutEffect(() => {
    if (!geometry || !pathRef.current) return;
    const path = pathRef.current;
    const total = path.getTotalLength();
    const samples = [];
    let maxY = 0;
    for (let i = 0; i <= 1000; i++) {
      const point = path.getPointAtLength((total * i) / 1000);
      // Map the travel through the flower to a small extra scroll distance.
      if (point.y >= geometry.stemY && i > 700) break;
      maxY = Math.max(maxY, point.y);
      samples.push({ y: maxY, length: i / 1000 });
    }
    // Find where the flower begins by locating its stem on the path.
    let flowerLength = 1;
    for (let i = 1000; i >= 0; i--) {
      const point = path.getPointAtLength((total * i) / 1000);
      if (point.y < geometry.stemY) {
        flowerLength = i / 1000;
        break;
      }
    }
    samplesRef.current = { samples, flowerLength };
  }, [geometry]);

  const pathLength = useTransform(scrollYProgress, (progress) => {
    if (reduced) return 1;
    if (!geometry) return 0;
    const y = progress * geometry.height;
    const { samples = [], flowerLength = 1 } = samplesRef.current;
    if (y >= geometry.stemY) {
      const p = Math.min(
        1,
        Math.max(
          0,
          (y - geometry.stemY) / (geometry.flowerEnd - geometry.stemY),
        ),
      );
      return flowerLength + (1 - flowerLength) * p;
    }
    const next = samples.findIndex((p) => p.y >= y);
    if (next < 0) return flowerLength;
    if (next === 0) return 0;
    const a = samples[next - 1],
      b = samples[next];
    return (
      a.length +
      (b.length - a.length) *
        Math.max(0, Math.min(1, (y - a.y) / Math.max(1, b.y - a.y)))
    );
  });

  if (!geometry) return null;
  return (
    <svg
      className="work-scroll-stroke"
      width={geometry.width}
      height={geometry.height}
      viewBox={`0 0 ${geometry.width} ${geometry.height}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <motion.path
        ref={pathRef}
        d={geometry.d}
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength }}
      />
    </svg>
  );
}
