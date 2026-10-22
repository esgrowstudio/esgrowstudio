import { Link, useParams } from "react-router-dom";
import { projects, projectImage } from "../data/projects.js";
import CaseFeature from "../components/CaseFeature.jsx";
import usePortfolioMotion from "../hooks/usePortfolioMotion.js";
import CallToAction from "../components/CallToAction.jsx";
import NotFoundPage from "./NotFoundPage.jsx";

export default function ProjectPage() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  const ref = usePortfolioMotion(slug);
  if (!project) return <NotFoundPage />;
  const next = projects[(index + 1) % projects.length];
  return (
    <>
      <div
        className={"project-case project-case-" + slug}
        ref={ref}
        style={{
          "--project-accent": project.accent,
          "--project-ink": project.ink,
        }}
      >
        <section className="project-case-intro page-wrap">
          <div className="case-topline">
            <Link to="/work">← All projects</Link>
            <span>CASE STUDY {project.number} / 09</span>
            <span>{project.category}</span>
          </div>
          <p className="eyebrow" data-enter>
            {project.sector}
          </p>
          <h1 data-enter>{project.name}</h1>
          <div className="case-headline-bottom" data-enter>
            <p>{project.line}</p>
            <a
              className="button"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit website <span>↗</span>
            </a>
          </div>
        </section>
        <figure className="case-showcase page-wrap" data-enter>
          <div className="case-screen-wrap">
            <div className="case-screen-bar">
              <span aria-hidden="true">● ● ●</span>
              <span>{new URL(project.url).hostname.replace("www.", "")}</span>
              <span>WEBSITE PREVIEW ↗</span>
            </div>
            <img
              src={projectImage(project.image)}
              alt={project.name + " actual website homepage"}
              width="1600"
              height="900"
              fetchPriority="high"
            />
          </div>
          <figcaption>Actual website capture · {project.name}</figcaption>
        </figure>
        <nav
          className="case-section-nav page-wrap"
          aria-label="Case study sections"
        >
          <a href="#overview">Overview</a>
          <a href="#challenge">The challenge</a>
          <a href="#approach">Our approach</a>
          <a href="#experience">The experience</a>
          <a href="#outcome">The outcome</a>
        </nav>
        <section className="case-overview page-wrap" id="overview">
          <div data-enter>
            <p className="eyebrow">THE BUSINESS, FIRST</p>
            <h2>{project.line}</h2>
            <p className="case-body">{project.description}</p>
          </div>
          <aside data-enter>
            <p className="eyebrow">WHAT WE WORKED ON</p>
            <ul>
              {project.scope.map((s) => (
                <li key={s}>
                  {s}
                  <span aria-hidden="true">↗</span>
                </li>
              ))}
            </ul>
            <p className="case-site-note">
              {project.siteNote ||
                "Built around the business. Designed for its next step."}
            </p>
          </aside>
        </section>
        <section className="case-challenge page-wrap" id="challenge">
          <div className="case-chapter-label" data-enter>
            <span>01</span>
            <p className="eyebrow">THE CHALLENGE</p>
          </div>
          <div data-enter>
            <h2>{project.challengeTitle}</h2>
            {project.challenge.map((p) => (
              <p className="case-body" key={p}>
                {p}
              </p>
            ))}
          </div>
        </section>
        <section className="case-approach page-wrap" id="approach">
          <div data-enter>
            <p className="eyebrow">02 / OUR APPROACH</p>
            <h2>{project.strategyTitle}</h2>
          </div>
          <div data-enter>
            {project.strategy.map((p) => (
              <p className="case-body" key={p}>
                {p}
              </p>
            ))}
          </div>
        </section>
        <section className="case-experience page-wrap" id="experience">
          <div className="case-experience-heading" data-enter>
            <p className="eyebrow">03 / THE EXPERIENCE</p>
            <h2>{project.featureTitle}</h2>
            <p className="case-body">{project.featureIntro}</p>
          </div>
          <CaseFeature key={slug} project={project} />
        </section>
        <section
          className="case-journey page-wrap"
          aria-label="Project journey"
          data-enter
        >
          <p className="eyebrow">HOW THE PIECES CONNECT</p>
          <ol>
            {project.journey.map((step, i) => (
              <li key={step}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p>{step}</p>
                <b aria-hidden="true">↗</b>
              </li>
            ))}
          </ol>
        </section>
        <section className="case-outcome page-wrap" id="outcome">
          <div data-enter>
            <p className="eyebrow">04 / THE OUTCOME</p>
            <h2>{project.outcomeTitle}</h2>
          </div>
          <div data-enter>
            {project.outcomes.map((p) => (
              <p className="case-body" key={p}>
                {p}
              </p>
            ))}
            <p className="case-evidence">
              Project scope and outcomes provided by Esgrow Studio. Website
              previews show the public experience; they do not independently
              verify business results.
            </p>
          </div>
          <div className="case-takeaway" data-enter>
            <span aria-hidden="true">✿</span>
            <p>{project.takeaway}</p>
          </div>
        </section>
        <section className="case-next page-wrap">
          <div>
            <p className="eyebrow">KEEP EXPLORING</p>
            <Link to="/work">See all 9 projects ↗</Link>
          </div>
          <Link to={"/work/" + next.slug} className="case-next-link">
            <img
              src={projectImage(next.image)}
              alt=""
              width="260"
              height="150"
              loading="lazy"
            />
            <span>
              <small>NEXT CASE STUDY</small>
              {next.name}
            </span>
            <b aria-hidden="true">↗</b>
          </Link>
        </section>
      </div>
      <CallToAction />
    </>
  );
}
