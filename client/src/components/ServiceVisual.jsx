import { useState } from "react";
import BrandMark from "./BrandMark.jsx";
export default function ServiceVisual({ slug }) {
  const [selected, setSelected] = useState(0);
  return (
    <div
      className={"service-visual visual-" + slug}
      aria-label="Illustrative service concept"
    >
      {slug === "web-design" && (
        <div className="design-preview">
          <div className="mini-toolbar">
            <i />
            <i />
            <i />
          </div>
          <div className={"design-canvas tone-" + selected}>
            <span className="mini-logo">
              <BrandMark className="mini-brand-mark" size={22} />
              ESGROW
            </span>
            <p>
              Good things.
              <br />
              By design.
            </p>
            <span className="design-flower">✿</span>
            <div className="swatches" aria-label="Preview a colour direction">
              {["Sage", "Lilac", "Butter"].map((tone, i) => (
                <button
                  aria-label={tone}
                  aria-pressed={i === selected}
                  className={"swatch swatch-" + i}
                  key={tone}
                  onClick={() => setSelected(i)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {slug === "website-development" && (
        <div className="code-preview">
          <div className="mini-toolbar">
            <i />
            <i />
            <i />
            <span>your-next-chapter.jsx</span>
          </div>
          <pre>
            <span>// Small details. Solid foundations.</span>
            {"\n\n"}
            <b>const</b>
            {
              ' experience = {\n  responsive: true,\n  considered: true,\n  builtFor: "your next chapter"\n};\n\n'
            }
            <b>export default</b>
            {" experience;"}
          </pre>
          <span className="code-status">
            <i /> Ready for what comes next.
          </span>
        </div>
      )}
      {slug === "seo" && (
        <div className="search-preview">
          <span className="visual-label">A CLEARER PATH TO DISCOVERY</span>
          <div className="search-input">
            ⌕ <span>Find your next customer</span>
          </div>
          <div className="search-result">
            <span>YOUR BUSINESS</span>
            <strong>The right answer. At the right moment.</strong>
            <p>Clear structure. Helpful content. A better foundation.</p>
          </div>
          <div className="growth-curve">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <span className="visual-footnote">
            Illustrative direction, not performance data.
          </span>
        </div>
      )}
      {slug === "digital-strategy" && (
        <div className="strategy-preview">
          <span className="visual-label">YOUR NEXT MOVE</span>
          <div className="strategy-map">
            <span>Audience</span>
            <span>Brand</span>
            <b>✳</b>
            <span>Channels</span>
            <span>Goals</span>
          </div>
          <p>Find the common thread.</p>
        </div>
      )}
      {slug === "social-media" && (
        <div className="social-preview">
          <div className="social-post">
            <img src="/assets/bloom.webp" alt="Botanical content concept" />
            <span>
              Make room
              <br />
              for good things.
            </span>
          </div>
          <div className="social-caption">
            <span className="social-studio-brand">
              <BrandMark className="mini-brand-mark" size={22} />
              esgrow studio
            </span>
            <p>A story worth stopping for.</p>
            <div>♡ &nbsp; ◌ &nbsp; ↗</div>
          </div>
        </div>
      )}
      {slug === "performance-marketing" && (
        <div className="ads-preview">
          <span className="visual-label">CREATIVE → CLICK → CONNECTION</span>
          <div className="campaign-card">
            <span>YOUR NEXT CAMPAIGN</span>
            <strong>
              A good offer.
              <br />A clear next step.
            </strong>
            <span className="mock-cta">Explore what’s possible ↗</span>
          </div>
          <div className="ads-flow">
            <span>Test</span>
            <i>→</i>
            <span>Learn</span>
            <i>→</i>
            <span>Refine</span>
          </div>
          <span className="visual-footnote">
            An approach to testing, not a promise of results.
          </span>
        </div>
      )}
      {slug === "hosting-cloud" && (
        <div className="cloud-preview">
          <span className="visual-label">A WELL-CONNECTED FOUNDATION</span>
          <div className="cloud-icon">☁</div>
          <div className="cloud-nodes">
            <span>Domain</span>
            <span>Website</span>
            <span>Backups</span>
          </div>
          <p>One home for your digital world.</p>
        </div>
      )}
      {slug === "branding-content" && (
        <div className="brand-preview">
          <span className="visual-label">WORDS. FORM. FEELING.</span>
          <strong>
            Aa<span>✳</span>
          </strong>
          <p>
            Find your voice.
            <br />
            Make it unmistakably yours.
          </p>
          <div className="brand-palette">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      )}
      {slug === "maintenance-support" && (
        <div className="care-preview">
          <span className="visual-label">A LITTLE CARE GOES A LONG WAY</span>
          <div className="care-flower">✿</div>
          {[
            "Review the essentials",
            "Make considered updates",
            "Keep a recovery plan",
          ].map((text, i) => (
            <div className="care-line" key={text}>
              <span>0{i + 1}</span>
              {text}
              <b>✓</b>
            </div>
          ))}
          <span className="visual-footnote">
            Illustrative maintenance checklist.
          </span>
        </div>
      )}
    </div>
  );
}
