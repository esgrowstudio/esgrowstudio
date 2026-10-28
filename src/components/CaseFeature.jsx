import { useState } from "react";
import { projectImage } from "../data/projects.js";

function FeatureList({ project }) {
  return (
    <div className="case-feature-list">
      {project.featureItems.map((item, i) => (
        <article key={item.title}>
          <span>{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function CaseFeature({ project }) {
  const [active, setActive] = useState(0);
  const seasonal = ["All season", "Rakhi edit", "Diwali edit"];
  const { slug } = project;
  if (slug === "rasam-o-riwaz")
    return (
      <div className="seasonal-feature" data-enter>
        <div className="seasonal-visual">
          <img
            src={projectImage(project.detailImage)}
            alt={project.detailAlt}
            loading="lazy"
            width="900"
            height="900"
          />
          <span>CURATED WITH INTENTION</span>
        </div>
        <div className="seasonal-control">
          <p className="eyebrow">A CATALOGUE WITH A LIFECYCLE</p>
          <div
            className="case-option-buttons"
            role="group"
            aria-label="Explore collection types"
          >
            {seasonal.map((s, i) => (
              <button
                key={s}
                aria-pressed={active === i}
                onClick={() => setActive(i)}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="seasonal-state" aria-live="polite" key={active}>
            <span className="collection-status">
              {active === 0 ? "EVERGREEN COLLECTION" : "SEASONAL COLLECTION"}
            </span>
            <h3>{seasonal[active]}</h3>
            <p>
              {active === 0
                ? "The year-round range stays discoverable, while festival edits change around it."
                : "Prepare the edit, publish it for the occasion, then archive it for a future season."}
            </p>
            <div className="collection-cycle">
              <span>Prepare</span>
              <b>→</b>
              <span>Publish</span>
              <b>→</b>
              <span>Archive</span>
            </div>
          </div>
          <p className="case-demo-note">
            Collection workflow illustration. The client’s admin panel manages
            the live catalogue.
          </p>
        </div>
      </div>
    );
  if (slug === "resqverse")
    return (
      <div className="relief-feature" data-enter>
        <div className="relief-hub">
          <span aria-hidden="true">✳</span>
          <h3>
            One shared
            <br />
            response.
          </h3>
          <p>
            Clear roles.
            <br />
            Connected records.
          </p>
        </div>
        <div className="relief-role-area">
          <div
            className="case-option-buttons"
            role="group"
            aria-label="Explore platform roles"
          >
            {project.featureItems.map((item, i) => (
              <button
                key={item.title}
                aria-pressed={active === i}
                onClick={() => setActive(i)}
              >
                {item.title}
              </button>
            ))}
          </div>
          <div className="relief-role" aria-live="polite" key={active}>
            <span>ROLE {String(active + 1).padStart(2, "0")}</span>
            <h3>{project.featureItems[active].title}</h3>
            <p>{project.featureItems[active].text}</p>
          </div>
          <div className="relief-funding">
            <span>Donation</span>
            <b>→</b>
            <span>Admin review</span>
            <b>→</b>
            <span>NGO allocation</span>
          </div>
        </div>
      </div>
    );
  if (slug === "swaad-sweets")
    return (
      <div data-enter>
        <div className="swaad-comparison">
          <article>
            <span>THE STARTING POINT</span>
            <h3>
              Borrowed
              <br />
              shelf space.
            </h3>
            <p>{project.before}</p>
          </article>
          <article>
            <span>THE NEW DIRECTION</span>
            <h3>
              A home
              <br />
              of their own.
            </h3>
            <p>{project.after}</p>
            <span className="case-decoration" aria-hidden="true">
              ↗
            </span>
          </article>
        </div>
        <div className="case-food-strip">
          <img
            src={projectImage(project.detailImage)}
            alt={project.detailAlt}
            loading="lazy"
            width="900"
            height="600"
          />
          <div>
            <p className="eyebrow">ONE PLACE. EVERY CRAVING.</p>
            <p>
              Sweets. Pizza.
              <br />
              Café favourites.
            </p>
            <span>The complete menu, together.</span>
          </div>
        </div>
      </div>
    );
  if (slug === "award-arts")
    return (
      <div className="award-feature" data-enter>
        <div className="case-tool-screenshot">
          <img
            src={projectImage(project.detailImage)}
            alt={project.detailAlt}
            width="1600"
            height="900"
            loading="lazy"
          />
          <span>ACTUAL CUSTOM STUDIO</span>
        </div>
        <FeatureList project={project} />
        <a
          href="https://www.awardarts.in/custom"
          className="text-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore the live custom studio ↗
        </a>
      </div>
    );
  if (slug === "localcart")
    return (
      <div className="marketplace-feature" data-enter>
        <div className="marketplace-shops" aria-label="Types of local sellers">
          <div>
            <span aria-hidden="true">01</span>
            <h3>
              The kirana
              <br />
              next door.
            </h3>
            <p>Everyday essentials</p>
          </div>
          <div>
            <span aria-hidden="true">02</span>
            <h3>
              Fresh from
              <br />
              the market.
            </h3>
            <p>Local produce</p>
          </div>
          <div>
            <span aria-hidden="true">03</span>
            <h3>
              Your local
              <br />
              favourites.
            </h3>
            <p>Neighbourhood retail</p>
          </div>
        </div>
        <div className="marketplace-shared">
          <span>ONE SHARED PLATFORM</span>
          <p>
            Individual stores.
            <br />A connected marketplace.
          </p>
          <span className="payment-pill">Razorpay integration ↗</span>
        </div>
        <FeatureList project={project} />
      </div>
    );
  if (slug === "delta-trophies")
    return (
      <div className="wholesale-feature" data-enter>
        <div className="wholesale-catalogue">
          <img
            src={projectImage("delta-collections-screen")}
            alt="Delta Trophies live product catalogue"
            width="1600"
            height="900"
            loading="lazy"
          />
          <span>FINISHED GOODS + COMPONENTS</span>
        </div>
        <FeatureList project={project} />
      </div>
    );
  return (
    <div className={"case-product-feature feature-" + slug} data-enter>
      <div className="case-product-photo">
        <img
          src={projectImage(project.detailImage)}
          alt={project.detailAlt}
          width="1000"
          height="1000"
          loading="lazy"
        />
        <span>
          {slug === "esfire-india"
            ? "PRODUCT × PEOPLE × PLACE"
            : slug === "delta-tech-force"
              ? "CLARITY IN EVERY DETAIL"
              : "LITTLE DETAILS. BIG GLOW."}
        </span>
      </div>
      <FeatureList project={project} />
    </div>
  );
}
