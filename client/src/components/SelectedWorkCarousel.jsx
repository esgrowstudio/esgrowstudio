import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects, projectImage } from "../data/projects.js";

const notes = [
  {
    text: "Built for brands ready to move forward.",
    number: `${projects.length.toString().padStart(2, "0")}`,
    caption: "project stories to explore",
    dark: true,
  },
  {
    text: "A clear direction. A considered design. A website that feels like your business.",
    number: "01",
    caption: "Strategy meets craft",
  },
  {
    text: "From the first impression to the next enquiry. Every touchpoint matters.",
    number: "02",
    caption: "Designed around people",
  },
  {
    text: "Different businesses. One connected approach to design, technology and growth.",
    number: "↗",
    caption: "From roots to results",
    dark: true,
  },
];

function Cards({ duplicate = false }) {
  return projects.slice(0, 4).map((project, index) => (
    <div className="swc-pair" key={project.slug}>
      <Link
        className="swc-project"
        to={`/work/${project.slug}`}
        aria-label={`Explore ${project.name} project`}
        tabIndex={duplicate ? -1 : undefined}
      >
        <img
          src={projectImage(project.detailImage || project.image)}
          alt={project.detailAlt || `${project.name} website`}
          width="800"
          height="1100"
          loading="lazy"
          draggable="false"
        />
        <div className="swc-image-top">
          <span>{project.category}</span>
          <span>Design & development</span>
        </div>
        <div className="swc-image-bottom">
          <h3>{project.name}</h3>
          <span aria-hidden="true">↗</span>
        </div>
      </Link>
      <article
        className={`swc-note${notes[index].dark ? " swc-note-dark" : ""}`}
      >
        <p>{notes[index].text}</p>
        <div>
          <span className="swc-number">{notes[index].number}</span>
          <p>{notes[index].caption}</p>
        </div>
      </article>
    </div>
  ));
}

export default function SelectedWorkCarousel() {
  const viewport = useRef(null);
  const group = useRef(null);
  const touching = useRef(false);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const running = !paused && !hovered && !focused && !reduced && visible;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(viewport.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const element = viewport.current;
    let frame,
      last = 0,
      position = element.scrollLeft;
    const animate = (time) => {
      const elapsed = last ? Math.min(time - last, 48) : 0;
      last = time;
      if (!touching.current) {
        // Keep sub-pixel progress rather than losing small increments to scroll rounding.
        const width = group.current?.getBoundingClientRect().width || 1;
        position = (position + elapsed * 0.027) % width;
        element.scrollLeft = position;
      } else position = element.scrollLeft;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  return (
    <div
      className="swc"
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected project stories"
    >
      <div className="swc-toolbar hr-container">
        <p>A closer look at what we create.</p>
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused || !!reduced}
          disabled={!!reduced}
          aria-label={
            paused ? "Play project carousel" : "Pause project carousel"
          }
        >
          <span aria-hidden="true">{paused || reduced ? "▷" : "Ⅱ"}</span>
          {reduced ? "Motion off" : paused ? "Play" : "Pause"}
        </button>
      </div>
      <div
        className="swc-viewport"
        ref={viewport}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setFocused(false);
        }}
        onPointerDown={() => {
          touching.current = true;
        }}
        onPointerUp={() => {
          touching.current = false;
        }}
        onPointerCancel={() => {
          touching.current = false;
        }}
      >
        <div className="swc-track">
          <div className="swc-group" ref={group}>
            <Cards />
          </div>
          <div className="swc-group" aria-hidden="true">
            <Cards duplicate />
          </div>
        </div>
      </div>
      <div className="swc-bottom hr-container">
        <span>Thoughtful work. Across industries.</span>
        <span>
          Swipe to explore <span aria-hidden="true">↔</span>
        </span>
      </div>
    </div>
  );
}
