import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import EditorialImage from "./EditorialImage.jsx";
export default function ParallaxImage({
  name,
  priority = false,
  className = "",
  caption,
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-22, 22]);
  return (
    <div ref={ref} className={`premium-parallax ${className}`}>
      <motion.div style={{ y: reduce ? 0 : y }}>
        <EditorialImage
          name={name}
          priority
          sizes="(max-width:760px) 90vw, 55vw"
        />
      </motion.div>
      {caption && <span className="premium-image-caption">{caption}</span>}
    </div>
  );
}
