import { useState } from "react";
import BrandMark from "./BrandMark.jsx";
const principles = [
  [
    "Make it beautiful. Make it useful. Make it mean something. The best digital experiences do all three.",
    "Craft, with purpose.",
  ],
  [
    "Your website, your search strategy and your ads should be having the same conversation. We bring them together.",
    "One connected picture.",
  ],
  [
    "Stay curious. Listen closely. Keep making things better. That’s how a good partnership becomes great work.",
    "People before processes.",
  ],
];
export default function StudioPrinciples() {
  const [index, setIndex] = useState(0);
  return (
    <section className="perspective section-pad">
      <div className="perspective-heading reveal">
        <p className="eyebrow">The way we see it</p>
        <h2>
          Good work starts
          <br />
          with good energy.
        </h2>
        <div className="slider-controls">
          <button
            onClick={() => setIndex((index + 2) % 3)}
            aria-label="Previous studio principle"
          >
            ←
          </button>
          <button
            onClick={() => setIndex((index + 1) % 3)}
            aria-label="Next studio principle"
          >
            →
          </button>
          <span>0{index + 1} — 03</span>
        </div>
      </div>
      <div className="quote-image reveal">
        <span>
          Small team.
          <br />
          Wide horizons.
        </span>
      </div>
      <article className="quote-card reveal">
        <div className="quote-top">
          <span>✦ ✦ ✦ ✦ ✦</span>
          <span className="quote-tag">Our studio principles</span>
        </div>
        <blockquote key={index} className="quote-enter">
          “{principles[index][0]}”
        </blockquote>
        <div className="quote-author">
          <BrandMark className="author-brand-mark" size={38} />
          <div>
            <strong>{principles[index][1]}</strong>
            <p>Esgrow Studio</p>
          </div>
        </div>
      </article>
    </section>
  );
}
