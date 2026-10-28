import { useState } from "react";
import { Link } from "react-router-dom";
import services from "../data/services.json";
import CallToAction from "../components/CallToAction.jsx";
import ServiceIcon from "../components/ServiceIcon.jsx";
import EditorialImage from "../components/EditorialImage.jsx";
import ParallaxImage from "../components/ParallaxImage.jsx";
import SelectedWorkCarousel from "../components/SelectedWorkCarousel.jsx";
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
    <div className="premium-services">
      <section className="directory-intro page-wrap ps-hero">
        <div>
          <p className="eyebrow">OUR SERVICES</p>
          <h1>
            Good ideas deserve
            <br />
            <span>a connected approach.</span>
          </h1>
          <p className="lead">
            A website that isn’t bringing enquiries? Marketing that feels
            disconnected? We help you find the missing pieces, connect with the
            right people and build a clearer path towards your business goals.
          </p>
          <a className="button" href="#service-catalog">
            Find your next step <span>↘</span>
          </a>
        </div>
        <ParallaxImage
          name="connected-sculpture"
          priority
          caption="STRATEGY → DESIGN → GROWTH"
        />
      </section>
      <section className="ps-directions page-wrap">
        <div className="reveal">
          <p className="eyebrow">START WITH WHAT YOU NEED</p>
          <h2>
            Different challenges.
            <br />
            <em>A clear way forward.</em>
          </h2>
        </div>
        <div className="ps-paths">
          {[
            [
              "Shape",
              "I need a clearer brand.",
              "Find your voice, clarify your positioning and make the right first impression.",
            ],
            [
              "Build",
              "I need a better website.",
              "Turn your offer into an experience that’s clear, useful and easy to act on.",
            ],
            [
              "Grow",
              "I need to reach more people.",
              "Connect search, social and campaigns around the customers you want to reach.",
            ],
          ].map(([filter, title, text]) => (
            <a
              key={filter}
              href="#service-catalog"
              onClick={() => setGroup(filter)}
              className="reveal"
            >
              <p className="eyebrow">{filter.toUpperCase()}</p>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="text-link">Explore the possibilities ↘</span>
            </a>
          ))}
        </div>
      </section>
      <section className="service-catalog page-wrap" id="service-catalog">
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
      <section className="ps-partnership page-wrap">
        <ParallaxImage
          name="conversation-space"
          caption="YOUR AMBITION. A SHARED PLAN."
        />
        <div className="reveal">
          <p className="eyebrow">MORE CONNECTED. LESS COMPLICATED.</p>
          <h2>
            You don’t need
            <br />
            <em>to figure it out alone.</em>
          </h2>
          <p>
            We help you choose what matters now, rather than adding every
            possible service. Your business goals, audience and budget guide the
            plan.
          </p>
          <ol>
            <li>
              <strong>Understand the challenge.</strong> A conversation about
              where you are and where you want to go.
            </li>
            <li>
              <strong>Connect the right pieces.</strong> A focused scope, with
              clear deliverables and priorities.
            </li>
            <li>
              <strong>Build, learn and refine.</strong> Thoughtful execution and
              a practical discussion about what comes next.
            </li>
          </ol>
          <Link className="text-link" to="/contact">
            Let’s find the right starting point ↗
          </Link>
        </div>
      </section>
      <section className="ps-work">
        <div className="page-wrap reveal">
          <p className="eyebrow">FROM THE PLAN TO THE REAL WORLD</p>
          <h2>
            See how the pieces
            <br />
            <em>come together.</em>
          </h2>
          <Link className="text-link" to="/work">
            Explore the project stories ↗
          </Link>
        </div>
        <SelectedWorkCarousel />
      </section>
      <CallToAction compact />
    </div>
  );
}
