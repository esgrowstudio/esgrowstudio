import { Link } from "react-router-dom";
import services from "../data/services.json";
import { projects, projectImage } from "../data/projects.js";
import ServiceIcon from "../components/ServiceIcon.jsx";
import CallToAction from "../components/CallToAction.jsx";
import EditorialImage from "../components/EditorialImage.jsx";
export default function HomePage() {
  return (
    <>
      <section
        className="atmosphere-hero"
        aria-label="Esgrow — From roots to results"
      >
        <img
          className="atmosphere-background"
          src="/assets/hero-green-atmosphere.png"
          alt=""
          width="1672"
          height="941"
          fetchPriority="high"
          decoding="async"
        />
        <div className="atmosphere-composition">
          <h1 className="roots-statement" aria-label="From roots to results">
            <span>FROM</span>
            <span>ROOTS</span>
            <span>TO RESULTS</span>
          </h1>
          <div className="atmosphere-wordmark" aria-label="Esgrow">
            <span>ESGROW</span>
          </div>
        </div>
        <a className="atmosphere-scroll" href="#services">
          <span>scroll for more</span>
          <span className="atmosphere-scroll-arrow" aria-hidden="true">
            ↓
          </span>
        </a>
      </section>
      <section className="home-services page-wrap" id="services">
        <div className="home-services-intro reveal">
          <p className="eyebrow">OUR SERVICES</p>
          <h2>
            Everything you need.
            <br />
            <span>All connected.</span>
          </h2>
          <p>
            From your first website to your next growth campaign, we bring
            strategy, design and technology together to move your business
            forward.
          </p>
          <Link className="text-link" to="/services">
            Explore all services <span>→</span>
          </Link>
          <div className="service-intro-note">
            <span className="status-dot" /> One partner. The bigger picture.
          </div>
        </div>
        <div className="home-service-grid">
          {services.map((service) => (
            <Link
              className="growth-service-card reveal"
              to={"/services/" + service.slug}
              key={service.slug}
            >
              <div className="home-service-image">
                <EditorialImage
                  name={service.slug}
                  sizes="(max-width: 680px) 44vw, (max-width: 820px) 29vw, 19vw"
                  decorative
                />
              </div>
              <div className="home-service-body">
                <ServiceIcon slug={service.slug} />
                <h3>{service.name}</h3>
                <p>{service.headline}</p>
                <span className="service-card-bottom">
                  Explore service <span>↗</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="vision-band page-wrap">
        <div className="vision-preview reveal">
          <EditorialImage name="digital-workspace" />
          <span className="vision-label">
            DESIGNED TO CONNECT. BUILT TO CONVERT. ↗
          </span>
        </div>
        <div className="reveal">
          <p className="eyebrow">FROM POSSIBILITY TO REALITY</p>
          <h2>
            Let’s make your
            <br />
            digital vision <span>a reality.</span>
          </h2>
          <p>
            Custom solutions. A connected team. A clear way forward. Whether
            you’re starting fresh or ready for your next chapter, we’ll help you
            build it with purpose.
          </p>
          <Link className="button" to="/contact">
            Start your project <span>→</span>
          </Link>
        </div>
      </section>
      <section className="home-work page-wrap">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">FEATURED WORK</p>
            <h2>
              Good ideas.
              <br />
              <span>Out in the world.</span>
            </h2>
            <p>
              Different businesses. Considered solutions. Explore the thinking
              and craft behind our work.
            </p>
          </div>
          <Link className="text-link" to="/work">
            View all work <span>→</span>
          </Link>
        </div>
        <div className="home-project-grid">
          {[projects[0], projects[1], projects[2], projects[3]].map(
            (project) => (
              <Link
                className="home-project-card reveal"
                key={project.slug}
                to={"/work/" + project.slug}
              >
                <div className="home-project-image">
                  <img
                    src={projectImage(project.image)}
                    alt={project.name + " website"}
                    width="1600"
                    height="900"
                    loading="lazy"
                  />
                  <span>View project ↗</span>
                </div>
                <div className="home-project-caption">
                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.category}</p>
                  </div>
                  <span className="round-arrow">↗</span>
                </div>
              </Link>
            ),
          )}
        </div>
      </section>
      <section className="growth-process page-wrap">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">HOW WE MAKE IT HAPPEN</p>
            <h2>
              Clear at every step.
              <br />
              <span>Connected from day one.</span>
            </h2>
          </div>
          <p>
            A practical process that keeps you involved, makes decisions easier
            and gives every deliverable a purpose.
          </p>
        </div>
        <div className="growth-process-grid">
          {[
            [
              "Discover & define",
              "We listen to your goals, understand your audience and agree on the scope, priorities and measures of success.",
            ],
            [
              "Design & build",
              "We turn the strategy into thoughtful design and reliable technology, with regular check-ins and room to refine.",
            ],
            [
              "Launch & grow",
              "We test across devices, prepare your handover and agree on the support or marketing work that comes next.",
            ],
          ].map(([title, text], i) => (
            <article className="reveal" key={title}>
              <EditorialImage
                name={["digital-strategy", "web-design", "seo"][i]}
                className="process-editorial"
                sizes="(max-width: 680px) 88vw, 28vw"
                decorative
              />
              <span className="process-number">
                0{i + 1}
                <span>↗</span>
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <CallToAction home />
    </>
  );
}
