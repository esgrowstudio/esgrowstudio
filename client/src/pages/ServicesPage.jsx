import { useState } from "react";
import { Link } from "react-router-dom";
import services from "../data/services.json";
import CallToAction from "../components/CallToAction.jsx";
import ServiceIcon from "../components/ServiceIcon.jsx";
import EditorialImage from "../components/EditorialImage.jsx";
const groups = {
  All: services.map((s) => s.slug),
  Build: [
    "web-design",
    "website-development",
    "hosting-cloud",
    "maintenance-support",
  ],
  Grow: ["seo", "social-media", "performance-marketing"],
  Shape: ["digital-strategy", "branding-content"],
};
export default function ServicesPage() {
  const [group, setGroup] = useState("All");
  return (
    <>
      <section className="directory-intro page-wrap">
        <div>
          <p className="eyebrow">OUR SERVICES</p>
          <h1>
            Digital solutions.
            <br />
            <span>Real growth.</span>
          </h1>
          <p className="lead">
            We create connected digital solutions that help your business build
            its online presence, reach the right people and move forward with
            confidence.
          </p>
        </div>
        <div className="page-editorial-hero">
          <EditorialImage name="website-development" priority />
          <span className="editorial-image-label">
            DESIGN. BUILD. GROW. <span>↗</span>
          </span>
        </div>
      </section>
      <section className="service-catalog page-wrap">
        <div className="catalog-bar">
          <span>Nine ways forward.</span>
          <div className="filter-pills" aria-label="Filter services">
            {Object.keys(groups).map((name) => (
              <button
                aria-pressed={group === name}
                key={name}
                onClick={() => setGroup(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        <div className="service-tile-grid">
          {services
            .filter((s) => groups[group].includes(s.slug))
            .map((s) => {
              const i = services.indexOf(s);
              return (
                <Link
                  className="service-tile"
                  key={s.slug}
                  to={"/services/" + s.slug}
                >
                  <div className="service-tile-image">
                    <EditorialImage
                      name={s.slug}
                      sizes="(max-width: 680px) 44vw, (max-width: 820px) 45vw, 29vw"
                    />
                    <span className="image-index">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="service-tile-copy">
                    <ServiceIcon slug={s.slug} className="service-glyph" />
                    <h2>{s.name}</h2>
                    <p>{s.headline}</p>
                    <span className="service-card-bottom">
                      Explore service <span>↗</span>
                    </span>
                  </div>
                </Link>
              );
            })}
        </div>
        <p className="small-note">
          Not sure where to start?{" "}
          <Link to="/contact">Tell us what you’re trying to solve ↗</Link>
        </p>
      </section>
      <CallToAction compact />
    </>
  );
}
