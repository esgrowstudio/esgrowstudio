import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction.jsx";
import EditorialImage from "../components/EditorialImage.jsx";
import SelectedWorkCarousel from "../components/SelectedWorkCarousel.jsx";

const challenges = [
  {
    label: "Not enough enquiries",
    title: "Make it easier for the right people to find you.",
    text: "If the enquiries have slowed down, the answer isn’t always more advertising. We look at who you’re reaching, what your website says and how easy it is to take the next step.",
    steps: [
      "Understand your audience and search intent",
      "Strengthen your landing pages and calls to action",
      "Connect SEO, campaigns and enquiry tracking",
    ],
    image: "performance-marketing",
    service: "performance-marketing",
    outcome: "A clearer path from first visit to a meaningful conversation.",
  },
  {
    label: "A website that falls short",
    title: "Your business has grown. Your website should show it.",
    text: "An unclear or difficult website can lose people before they understand your value. We bring your offer into focus and build an experience that works beautifully on the devices your customers use.",
    steps: [
      "Clarify your offer and customer journey",
      "Design a distinctive, mobile-first experience",
      "Build, test and make the next action obvious",
    ],
    image: "web-design",
    service: "web-design",
    outcome:
      "A digital home that helps people understand, trust and choose you.",
  },
  {
    label: "Marketing without direction",
    title: "Give every channel a shared purpose.",
    text: "Posting, running ads and updating a website can feel like separate jobs. We help connect them around a practical plan, so your time and budget support the same business priorities.",
    steps: [
      "Review your current channels and priorities",
      "Align your content, creative and campaigns",
      "Review useful signals and refine the next move",
    ],
    image: "digital-strategy",
    service: "digital-strategy",
    outcome:
      "Clearer priorities, connected messages and more informed decisions.",
  },
  {
    label: "Starting something new",
    title: "You bring the ambition. Let’s shape the first steps.",
    text: "You don’t need a perfect brief to get started. Tell us what you’re building, who it’s for and where you want to go. We’ll help turn the idea into a sensible digital launch plan.",
    steps: [
      "Define your positioning and essential pages",
      "Build the brand foundations and launch priorities",
      "Plan what comes next as your business develops",
    ],
    image: "branding-content",
    service: "branding-content",
    outcome: "A considered start, with room to grow at your own pace.",
  },
];
function Arrive({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
export default function AboutPage() {
  const [active, setActive] = useState(0);
  const visual = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: visual,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-24, 24]);
  const challenge = challenges[active];
  return (
    <>
      <div className="agency-about">
        <section className="aa-hero aa-wrap">
          <Arrive>
            <p className="eyebrow">
              ESGROW STUDIO / BUILT AROUND YOUR AMBITION
            </p>
            <h1>
              A little more clarity.
              <br />A lot more <em>possibility.</em>
            </h1>
          </Arrive>
          <Arrive className="aa-hero-bottom" delay={0.12}>
            <span className="aa-seal" aria-hidden="true">
              E<span>↗</span>
            </span>
            <p>
              We’re a digital studio bringing strategy, design, development and
              marketing together. Here to help good businesses become easier to
              discover, understand and choose.
            </p>
            <Link className="text-link" to="/contact">
              Let’s talk about your business ↗
            </Link>
          </Arrive>
          <div className="aa-panorama" ref={visual}>
            <motion.div style={{ y: reduced ? 0 : y }}>
              <EditorialImage name="creative-studio" priority sizes="92vw" />
            </motion.div>
            <div className="aa-photo-note">
              <span>OUR POINT OF VIEW</span>
              <p>
                Great work starts with
                <br />
                understanding your world.
              </p>
            </div>
            <span className="aa-photo-index">01 / THE STUDIO MINDSET</span>
          </div>
        </section>
        <section className="aa-intro aa-wrap aa-section">
          <Arrive>
            <p className="eyebrow">WHO WE ARE</p>
            <h2>
              Creative minds.
              <br />
              Practical thinkers.
              <br />
              <em>On your side.</em>
            </h2>
          </Arrive>
          <Arrive delay={0.1}>
            <p className="aa-large-copy">
              You know your business. We help translate what makes it valuable
              into a digital presence that people can connect with.
            </p>
            <p>
              ESGROW STUDIO connects the pieces that are too often treated
              separately: your brand, your website and the way you reach
              customers. From shaping a new idea to improving an established
              business online, we bring creative thinking and technical delivery
              into the same conversation.
            </p>
            <p>
              We start by listening. What are you trying to achieve? What’s
              getting in the way? Then we agree on clear priorities, build with
              care and help you understand the next step.
            </p>
            <div className="aa-signoff">
              <span>FROM ROOTS</span>
              <span>↗</span>
              <span>TO RESULTS</span>
            </div>
          </Arrive>
        </section>
        <section
          className="aa-challenges aa-section"
          aria-labelledby="aa-challenge-title"
        >
          <div className="aa-wrap">
            <Arrive className="aa-section-head">
              <div>
                <p className="eyebrow">LET’S START WITH YOU</p>
                <h2>
                  Where are you
                  <br />
                  <em>feeling stuck?</em>
                </h2>
              </div>
              <p>
                You don’t need to know which service to ask for. Start with the
                challenge. We’ll help you find a useful way forward.
              </p>
            </Arrive>
            <h3 className="aa-sr-only" id="aa-challenge-title">
              Explore your business challenge
            </h3>
            <div
              className="aa-challenge-options"
              aria-label="Business challenges"
            >
              {challenges.map((item, i) => (
                <button
                  key={item.label}
                  type="button"
                  aria-pressed={active === i}
                  aria-controls="aa-challenge-panel"
                  onClick={() => setActive(i)}
                >
                  <span>0{i + 1}</span>
                  {item.label}
                  <span aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
            <div
              className="aa-challenge-panel"
              id="aa-challenge-panel"
              aria-live="polite"
            >
              <motion.div
                key={active}
                className="aa-challenge-copy"
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <p className="eyebrow">A WAY FORWARD / 0{active + 1}</p>
                <h3>{challenge.title}</h3>
                <p>{challenge.text}</p>
                <ul>
                  {challenge.steps.map((step) => (
                    <li key={step}>
                      <span aria-hidden="true">↗</span>
                      {step}
                    </li>
                  ))}
                </ul>
                <p className="aa-outcome">{challenge.outcome}</p>
                <Link
                  className="text-link"
                  to={`/services/${challenge.service}`}
                >
                  Explore how we can help ↗
                </Link>
              </motion.div>
              <EditorialImage
                name={challenge.image}
                sizes="(max-width: 760px) 90vw, 42vw"
              />
            </div>
          </div>
        </section>
        <section className="aa-wrap aa-section">
          <Arrive className="aa-section-head">
            <div>
              <p className="eyebrow">WHAT WE BRING TO THE TABLE</p>
              <h2>
                One connected team.
                <br />
                <em>Every important detail.</em>
              </h2>
            </div>
            <Link className="text-link" to="/services">
              Explore all our services ↗
            </Link>
          </Arrive>
          <div className="aa-capabilities">
            {[
              [
                "branding-content",
                "01 / CREATE CLARITY",
                "A brand people understand.",
                "Positioning, identity and content that explain who you are, why you matter and what makes your business worth choosing.",
                "Brand strategy · Identity · Content",
              ],
              [
                "website-development",
                "02 / BUILD CONFIDENCE",
                "An experience people trust.",
                "Thoughtful design and dependable development that make your website clear, easy to use and ready for the next enquiry.",
                "Web design · Development · Support",
              ],
              [
                "seo",
                "03 / CONNECT WITH PEOPLE",
                "A presence people discover.",
                "Search, social and paid campaigns connected to your audience, with useful measurement to guide what happens next.",
                "SEO · Social media · Paid campaigns",
              ],
            ].map(([image, number, title, copy, tags], i) => (
              <Arrive key={title} delay={i * 0.08}>
                <article className="aa-capability">
                  <EditorialImage
                    name={image}
                    sizes="(max-width: 760px) 90vw, 28vw"
                    decorative
                  />
                  <div>
                    <p className="eyebrow">{number}</p>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                    <p className="aa-tags">{tags}</p>
                  </div>
                </article>
              </Arrive>
            ))}
          </div>
        </section>
        <section className="aa-belief aa-wrap">
          <Arrive>
            <p className="eyebrow">THE BELIEF BEHIND THE WORK</p>
            <blockquote>
              “Your next stage of growth shouldn’t feel like something you have
              to figure out <em>alone.</em>”
            </blockquote>
            <p>
              Our role is to bring clarity, care and a practical way forward.
              <br />
              Your ambition stays at the centre of the conversation.
            </p>
            <span className="aa-belief-signature">
              THE ESGROW STUDIO APPROACH ↗
            </span>
          </Arrive>
        </section>
        <section className="aa-wrap aa-section aa-approach">
          <Arrive className="aa-approach-heading">
            <p className="eyebrow">HOW WE MOVE FORWARD</p>
            <h2>
              A clear process.
              <br />
              <em>A shared direction.</em>
            </h2>
            <p>
              From the first conversation to the next improvement, you should
              know what we’re doing and why it matters.
            </p>
            <Link className="text-link" to="/contact">
              Tell us where you want to go ↗
            </Link>
          </Arrive>
          <div className="aa-steps">
            {[
              [
                "Listen & understand",
                "We talk about your business, customers, current challenges and goals. The right questions come before the first design.",
              ],
              [
                "Agree on a direction",
                "Together, we prioritise the work, define the scope and agree on deliverables. You know what’s included and what comes next.",
              ],
              [
                "Create, build & refine",
                "Strategy becomes tangible work. We share progress, invite feedback and test the experience across screen sizes before launch.",
              ],
              [
                "Launch & keep learning",
                "We make the handover clear and discuss the support you need. Where ongoing work is agreed, we review performance and plan improvements.",
              ],
            ].map(([title, copy], i) => (
              <Arrive key={title}>
                <article>
                  <span className="aa-step-number">0{i + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              </Arrive>
            ))}
          </div>
        </section>
        <section className="aa-work aa-section">
          <Arrive className="aa-wrap aa-section-head">
            <div>
              <p className="eyebrow">OUR THINKING, IN PRACTICE</p>
              <h2>
                Different businesses.
                <br />
                <em>Considered solutions.</em>
              </h2>
            </div>
            <p>
              Explore the project stories behind the visuals: the challenge, our
              approach and the details that shaped the work.
            </p>
          </Arrive>
          <SelectedWorkCarousel />
        </section>
        <section className="aa-wrap aa-partnership aa-section">
          <Arrive>
            <p className="eyebrow">WHAT YOU CAN EXPECT</p>
            <h2>
              Good work.
              <br />
              <em>A better working relationship.</em>
            </h2>
          </Arrive>
          <div>
            {[
              [
                "Honest conversations",
                "Clear recommendations, realistic expectations and a scope we agree together.",
              ],
              [
                "A business-first perspective",
                "Design decisions connected to your audience and goals, with room for your feedback.",
              ],
              [
                "Care beyond the surface",
                "Readable content, thoughtful mobile layouts and the practical details that make an experience work.",
              ],
            ].map(([title, text]) => (
              <Arrive key={title}>
                <article>
                  <span aria-hidden="true">↗</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              </Arrive>
            ))}
          </div>
        </section>
      </div>
      <CallToAction />
    </>
  );
}
