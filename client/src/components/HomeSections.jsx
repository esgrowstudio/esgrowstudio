import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import services from "../data/services.json";
import SelectedWorkCarousel from "./SelectedWorkCarousel.jsx";
import EditorialImage from "./EditorialImage.jsx";
import ServiceIcon from "./ServiceIcon.jsx";

function Arrive({ children, className = "", direction = "up", delay = 0 }) {
  const reduced = useReducedMotion();
  const offset =
    direction === "left"
      ? { x: -32 }
      : direction === "right"
        ? { x: 32 }
        : { y: 32 };
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const featured = [
  "web-design",
  "website-development",
  "seo",
  "performance-marketing",
];
const serviceCopy = {
  "web-design": "Distinctive websites. Effortless experiences.",
  "website-development": "Fast, responsive builds that work beautifully.",
  seo: "Help the right people find your business.",
  "performance-marketing": "Thoughtful campaigns. Clearer next steps.",
};
const reviews = [
  {
    name: "Aarav Mehta",
    initials: "AM",
    role: "Retail founder · Mumbai",
    text: "The whole process felt clear from day one. Our website finally reflects the care we put into our products, and it’s so much easier to use on mobile.",
  },
  {
    name: "Simran Kaur",
    initials: "SK",
    role: "Café owner · Chandigarh",
    text: "They listened to our ideas and brought everything together beautifully. We loved the attention to the little details and the regular updates along the way.",
  },
  {
    name: "Rohan Sharma",
    initials: "RS",
    role: "Business owner · New Delhi",
    text: "What stood out was how simple they made everything feel. From the first design to the handover, we always knew what was happening and what came next.",
  },
];

export default function HomeSections() {
  return (
    <div className="home-refined">
      <div className="hr-intro-strip">
        <div className="hr-container">
          <p>
            <span className="hr-live-dot" /> A digital studio for your next
            chapter.
          </p>
          <span>
            Strategy <i /> Design <i /> Development <i /> Growth
          </span>
        </div>
      </div>

      <section
        className="hr-services hr-section hr-container"
        id="services"
        aria-labelledby="hr-services-title"
      >
        <Arrive className="hr-section-top" direction="left">
          <div>
            <p className="eyebrow">01 / WHAT WE DO</p>
            <h2 id="hr-services-title">
              Big-picture thinking.
              <br />
              <em>Beautifully connected.</em>
            </h2>
          </div>
          <div className="hr-section-aside">
            <p>
              Your brand deserves more than a good-looking website. We connect
              design, technology and growth to help your business move forward.
            </p>
            <Link className="hr-link" to="/services">
              Explore all 9 services <span>↗</span>
            </Link>
          </div>
        </Arrive>
        <div className="hr-services-grid">
          {featured.map((slug, i) => {
            const service = services.find((item) => item.slug === slug);
            return (
              <Arrive
                key={slug}
                delay={(i % 2) * 0.1}
                direction={i % 2 ? "right" : "left"}
              >
                <Link className="hr-service-card" to={`/services/${slug}`}>
                  <div className="hr-service-art">
                    <EditorialImage
                      name={slug}
                      decorative
                      sizes="(max-width: 680px) 90vw, 43vw"
                    />
                    <span className="hr-card-index">0{i + 1}</span>
                    <span className="hr-card-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                  <div className="hr-service-info">
                    <ServiceIcon slug={slug} />
                    <div>
                      <h3>{service.name}</h3>
                      <p>{serviceCopy[slug]}</p>
                    </div>
                  </div>
                </Link>
              </Arrive>
            );
          })}
        </div>
        <Arrive className="hr-service-note">
          <p>A complete team, without the complexity.</p>
          <Link to="/services">
            Branding, social media, hosting & more <span>→</span>
          </Link>
        </Arrive>
      </section>

      <section className="hr-studio-wrap" aria-labelledby="hr-studio-title">
        <div className="hr-studio hr-container">
          <Arrive className="hr-studio-visual" direction="left">
            <EditorialImage
              name="creative-studio"
              sizes="(max-width: 800px) 90vw, 44vw"
            />
            <div className="hr-glass-note">
              <span className="hr-note-icon">✳</span>
              <span>
                Good things grow
                <br />
                <strong>when we build together.</strong>
              </span>
            </div>
          </Arrive>
          <Arrive className="hr-studio-copy" direction="right">
            <p className="eyebrow">SMALL DETAILS. BIGGER PICTURE.</p>
            <h2 id="hr-studio-title">
              Your ambition.
              <br />
              Our craft.
              <br />
              <em>One shared vision.</em>
            </h2>
            <p>
              We’re a design-minded digital studio bringing ideas to life with
              clarity and care. We ask the right questions, keep you in the loop
              and build around what your business actually needs.
            </p>
            <div className="hr-values">
              <span>✳ Thoughtful by design</span>
              <span>↗ Built for what’s next</span>
              <span>◎ People before process</span>
            </div>
            <Link className="hr-link" to="/about">
              Meet the studio <span>↗</span>
            </Link>
          </Arrive>
        </div>
      </section>

      <section
        className="hr-work hr-section hr-container"
        id="selected-work"
        aria-labelledby="hr-work-title"
      >
        <Arrive className="hr-section-top">
          <div>
            <p className="eyebrow">02 / SELECTED WORK</p>
            <h2 id="hr-work-title">
              Ideas made real.
              <br />
              <em>Every detail considered.</em>
            </h2>
          </div>
          <div className="hr-section-aside">
            <p>
              A little of what happens when thoughtful strategy meets purposeful
              design.
            </p>
            <Link className="hr-link" to="/work">
              View all projects <span>↗</span>
            </Link>
          </div>
        </Arrive>
        <SelectedWorkCarousel />
      </section>

      <section className="hr-process-wrap" aria-labelledby="hr-process-title">
        <div className="hr-section hr-container">
          <Arrive className="hr-section-top">
            <div>
              <p className="eyebrow">03 / A CLEAR WAY FORWARD</p>
              <h2 id="hr-process-title">
                From first hello.
                <br />
                <em>To what comes next.</em>
              </h2>
            </div>
            <p className="hr-section-aside">
              No guesswork. Just a collaborative process, clear milestones and a
              team that keeps things moving.
            </p>
          </Arrive>
          <div className="hr-process-grid">
            {[
              [
                "Discover & define",
                "First, we listen.",
                "We get to know your business, audience and ambitions. Together, we define the right direction, scope and priorities.",
              ],
              [
                "Design & build",
                "Then, we make it real.",
                "Ideas become considered design and dependable technology, with regular check-ins and room to refine the details.",
              ],
              [
                "Launch & evolve",
                "And keep moving forward.",
                "We test, launch and hand over with care. Need ongoing support or marketing? We’ll map out the next chapter together.",
              ],
            ].map(([title, subtitle, text], i) => (
              <Arrive key={title} delay={i * 0.1}>
                <article className="hr-process-card">
                  <div className="hr-step-line">
                    <span>0{i + 1}</span>
                    <span aria-hidden="true">{["◎", "✳", "↗"][i]}</span>
                  </div>
                  <p className="hr-step-subtitle">{subtitle}</p>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              </Arrive>
            ))}
          </div>
        </div>
      </section>

      <section
        className="hr-reviews hr-section hr-container"
        aria-labelledby="hr-reviews-title"
      >
        <Arrive className="hr-section-top">
          <div>
            <p className="eyebrow">04 / THE PEOPLE SIDE</p>
            <h2 id="hr-reviews-title">
              Great work starts with
              <br />
              <em>a great connection.</em>
            </h2>
          </div>
          <div className="hr-section-aside">
            <span className="hr-demo-label">Demo testimonials</span>
            <p>
              Illustrative reviews with fictional names and businesses, shown as
              a preview of this section.
            </p>
          </div>
        </Arrive>
        <div className="hr-review-grid">
          {reviews.map((review, i) => (
            <Arrive key={review.name} delay={i * 0.1}>
              <figure className="hr-review">
                <div className="hr-review-top">
                  <span aria-label="Illustrative five-star rating">★★★★★</span>
                  <span className="hr-quote-mark" aria-hidden="true">
                    “
                  </span>
                </div>
                <blockquote>{review.text}</blockquote>
                <figcaption>
                  <span className="hr-avatar" aria-hidden="true">
                    {review.initials}
                  </span>
                  <div>
                    <strong>{review.name}</strong>
                    <span>{review.role}</span>
                  </div>
                  <span className="hr-review-demo">Demo</span>
                </figcaption>
              </figure>
            </Arrive>
          ))}
        </div>
      </section>

      <section
        className="hr-finale hr-container"
        aria-labelledby="hr-finale-title"
      >
        <Arrive>
          <div className="hr-finale-inner">
            <div className="hr-finale-copy">
              <p className="eyebrow">LET’S MAKE YOUR NEXT MOVE MATTER</p>
              <h2 id="hr-finale-title">
                Ready for your
                <br />
                <em>next chapter?</em>
              </h2>
              <p>
                A fresh idea, a new website or a bigger ambition.
                <br />
                Let’s find the right way forward, together.
              </p>
              <Link className="button" to="/contact">
                Tell us what you’re thinking <span>↗</span>
              </Link>
            </div>
            <div className="hr-finale-art">
              <EditorialImage
                name="botanical-growth"
                sizes="(max-width: 680px) 90vw, 36vw"
                decorative
              />
              <span className="hr-finale-caption">
                FROM ROOTS TO RESULTS. ↗
              </span>
            </div>
          </div>
        </Arrive>
      </section>
    </div>
  );
}
