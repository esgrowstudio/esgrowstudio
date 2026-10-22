import { Link, useParams } from "react-router-dom";
import services from "../data/services.json";
import EditorialImage from "../components/EditorialImage.jsx";
import FaqList from "../components/FaqList.jsx";
import CallToAction from "../components/CallToAction.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
const notes = {
  "web-design": [
    "A feeling, before a feature.",
    "We start with the people using your website: what they need to understand, where they hesitate and what would make the experience feel effortless.",
    [
      "Clarify the journey",
      "Explore the visual direction",
      "Refine the experience",
    ],
  ],
  "website-development": [
    "What’s under the surface matters.",
    "A considered build means clean structure, responsive behaviour and a practical plan for content, integrations and handover.",
    ["Plan the architecture", "Build and test", "Launch with confidence"],
  ],
  seo: [
    "Build the foundations for being found.",
    "Search work starts with understanding what your audience needs. We connect site structure, useful pages and a clear measurement plan.",
    ["Review the site", "Map intent to content", "Improve and review"],
  ],
  "digital-strategy": [
    "A roadmap you can actually use.",
    "We look at the whole journey, then identify which decisions matter first. Your strategy should help you say yes to the right work and no to distractions.",
    [
      "Listen and investigate",
      "Connect the opportunities",
      "Choose the next steps",
    ],
  ],
  "social-media": [
    "Consistency with a point of view.",
    "A calendar is only useful when it carries a recognisable voice. We build content pillars around your audience, then plan a rhythm your business can sustain.",
    ["Find the content pillars", "Create and approve", "Publish and learn"],
  ],
  "performance-marketing": [
    "A campaign is more than an ad.",
    "The audience, creative, offer and landing page all play a part. We review them together and use testing to choose what to improve next.",
    ["Plan the offer", "Test the creative", "Review the whole journey"],
  ],
  "hosting-cloud": [
    "Make the practical things clearer.",
    "Domains, DNS, deployment and backups should have clear owners. We help you choose an appropriate setup and document how it is maintained.",
    [
      "Assess the requirements",
      "Configure and migrate",
      "Document and monitor",
    ],
  ],
  "branding-content": [
    "Be recognisable in every conversation.",
    "The right words and visual cues help your business show up consistently. We connect positioning, identity and content so each touchpoint feels like part of the same world.",
    ["Find the position", "Shape the identity", "Bring the story to life"],
  ],
  "maintenance-support": [
    "Launch is the start of the relationship.",
    "Regular care keeps information current and gives your team a clear route for updates and issues. We agree what is covered and how requests are handled.",
    ["Review the website", "Agree a care plan", "Keep improving together"],
  ],
};
export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  if (!service) return <NotFoundPage />;
  const index = services.indexOf(service),
    note = notes[slug];
  return (
    <>
      <section className={"service-detail-hero page-wrap detail-" + index}>
        <div className="service-hero-copy">
          <Link className="breadcrumb" to="/services">
            ← All services
          </Link>
          <p className="eyebrow">
            {String(index + 1).padStart(2, "0")} / {service.name}
          </p>
          <h1>{service.headline}</h1>
          <p className="lead">{service.description}</p>
          <Link className="button yellow" to={"/contact?service=" + slug}>
            Let’s talk about{" "}
            {index === 2 ? "search" : index === 6 ? "hosting" : "your project"}{" "}
            ↗
          </Link>
        </div>
        <figure className="service-detail-photo">
          <EditorialImage name={slug} priority />
          <figcaption>
            <span>{service.name}</span>
            <span>ILLUSTRATIVE SERVICE CONCEPT</span>
          </figcaption>
        </figure>
      </section>
      <section className={"service-delivery page-wrap delivery-" + (index % 3)}>
        <div className="delivery-heading">
          <p className="eyebrow">THE SCOPE, CONSIDERED</p>
          <h2>
            {index % 3 === 0
              ? "From the big idea to the little details."
              : index % 3 === 1
                ? "The pieces we bring together."
                : "A focused approach to your next step."}
          </h2>
        </div>
        <div className="delivery-list">
          {service.deliverables.map((item, i) => (
            <article className="reveal" key={item}>
              <span>0{i + 1}</span>
              <h3>{item}</h3>
              <span aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>
      <section className={"service-method page-wrap method-" + (index % 3)}>
        <div>
          <p className="eyebrow">THE WAY FORWARD</p>
          <h2>{note[0]}</h2>
          <p className="lead">{note[1]}</p>
        </div>
        <ol>
          {note[2].map((step, i) => (
            <li key={step}>
              <span>0{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </section>
      <section className="service-answers page-wrap">
        <div>
          <p className="eyebrow">A LITTLE CLARITY</p>
          <h2>Before we begin.</h2>
          <p className="small-note">{service.note}</p>
        </div>
        <FaqList items={service.faqs} />
      </section>
      <section className="related-services page-wrap">
        <p className="eyebrow">BETTER, CONNECTED</p>
        <div>
          {[1, 2, 3].map((offset) => {
            const next = services[(index + offset) % services.length];
            return (
              <Link key={next.slug} to={"/services/" + next.slug}>
                {next.name}
                <span>↗</span>
              </Link>
            );
          })}
        </div>
      </section>
      <CallToAction compact />
    </>
  );
}
