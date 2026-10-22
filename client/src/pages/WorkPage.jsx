import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { projects, projectFilters, projectImage } from "../data/projects.js";
import usePortfolioMotion from "../hooks/usePortfolioMotion.js";
import CallToAction from "../components/CallToAction.jsx";
import EditorialImage from "../components/EditorialImage.jsx";
const WorkScrollStroke = lazy(
  () => import("../components/WorkScrollStroke.jsx"),
);

export default function WorkPage() {
  const [filter, setFilter] = useState("All work");
  const shown = projects.filter(
    (p) => filter === "All work" || p.filters.includes(filter),
  );
  const ref = usePortfolioMotion(filter);
  return (
    <>
      <div className="portfolio-page" ref={ref}>
        <Suspense fallback={null}>
          <WorkScrollStroke containerRef={ref} layoutKey={filter} />
        </Suspense>
        <section className="portfolio-intro page-wrap">
          <div className="work-editorial-hero">
            <EditorialImage name="digital-workspace" priority />
            <span className="editorial-image-label">
              IDEAS, BROUGHT TO LIFE. <span>↗</span>
            </span>
          </div>
          <div className="portfolio-kicker">
            <p className="eyebrow">OUR WORK / FROM ROOTS TO RESULTS</p>
            <span>09 projects. Different possibilities.</span>
          </div>
          <div className="portfolio-headline" data-enter>
            <h1>
              Ideas in action.
              <br />
              <span>Built around you.</span>
            </h1>
          </div>
          <div className="portfolio-intro-copy" data-enter>
            <p>
              From a neighbourhood café to a manufacturing floor.
              <br />
              We build digital experiences around the way a business actually
              works.
            </p>
            <a href="#project-collection" className="portfolio-down">
              Explore the projects <span>↓</span>
            </a>
          </div>
        </section>
        <section
          className="project-collection page-wrap"
          id="project-collection"
          aria-label="Project collection"
        >
          <div className="portfolio-filterbar">
            <div
              className="filter-pills"
              role="group"
              aria-label="Filter projects by service"
            >
              {projectFilters.map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  aria-pressed={filter === item}
                >
                  {item}
                  <small>
                    {item === "All work"
                      ? projects.length
                      : projects.filter((p) => p.filters.includes(item)).length}
                  </small>
                </button>
              ))}
            </div>
            <span className="portfolio-count" role="status">
              {String(shown.length).padStart(2, "0")} projects
            </span>
          </div>
          <div className="real-project-grid" key={filter}>
            {shown.map((project, i) => (
              <article
                className={
                  "real-project-card" +
                  (i === 0 ? " is-featured" : i % 2 === 1 ? " copy-first" : "")
                }
                key={project.slug}
                data-enter
                style={{
                  "--project-accent": project.accent,
                  "--project-ink": project.ink,
                }}
              >
                <Link
                  to={"/work/" + project.slug}
                  className="project-cover"
                  aria-label={"Read the " + project.name + " case study"}
                >
                  <img
                    src={projectImage(project.image)}
                    alt={project.name + " website preview"}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    width="1600"
                    height="900"
                  />
                  <span className="project-cover-action">
                    View case study <span>↗</span>
                  </span>
                </Link>
                <div className="real-project-copy">
                  <div>
                    <p className="project-row-number">
                      {project.number} / 09 · {project.sector}
                    </p>
                    <p className="eyebrow">
                      {project.category}
                      {project.filters.includes("Growth") ? " + GROWTH" : ""}
                    </p>
                    <h2>
                      <Link to={"/work/" + project.slug}>{project.name}</Link>
                    </h2>
                    <p>{project.teaser}</p>
                  </div>
                  <Link
                    className="project-round-link"
                    to={"/work/" + project.slug}
                    aria-label={"Explore " + project.name}
                  >
                    ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="portfolio-closing" data-enter>
            <span className="eyebrow">
              DIFFERENT BUSINESSES. THE SAME CARE.
            </span>
            <p>
              A good website starts with a better understanding of the business
              behind it.
            </p>
            <Link className="text-link" to="/contact">
              Let’s talk about yours ↗
            </Link>
            <div className="work-stroke-flower-space" aria-hidden="true" />
            <a
              className="stroke-attribution"
              href="https://skiper-ui.com/v1/skiper19"
              target="_blank"
              rel="noopener noreferrer"
            >
              Scroll animation adapted from Skiper UI ↗
            </a>
          </div>
        </section>
      </div>
      <CallToAction />
    </>
  );
}
