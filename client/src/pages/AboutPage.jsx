import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction.jsx";
import EditorialImage from "../components/EditorialImage.jsx";
import ServiceIcon from "../components/ServiceIcon.jsx";
export default function AboutPage() {
  return (
    <>
      <section className="about-editorial page-wrap">
        <div className="about-letter">
          <p className="eyebrow">A LITTLE ABOUT ESGROW</p>
          <h1>
            Rooted in vision.
            <br />
            <span>Driven by purpose.</span>
          </h1>
          <p className="lead">
            We’re a digital studio helping businesses grow through thoughtful
            websites, connected marketing and practical technology.
          </p>
          <p>
            Esgrow Studio connects design, development and digital marketing. We
            help businesses bring the pieces together, so the website, the
            message and the next step feel part of the same picture.
          </p>
          <Link className="text-link" to="/contact">
            Get to know your next team ↗
          </Link>
        </div>
        <div className="page-editorial-hero">
          <EditorialImage name="creative-studio" priority />
          <span className="editorial-image-label">
            A SPACE FOR GOOD IDEAS. <span>↗</span>
          </span>
        </div>
      </section>
      <section className="about-story page-wrap">
        <div className="reveal">
          <p className="eyebrow">OUR STORY</p>
          <h2>
            Good things grow
            <br />
            from a <span>clear idea.</span>
          </h2>
          <p>
            Every brand starts with a possibility. Our role is to turn that
            possibility into a digital experience people can understand, trust
            and use.
          </p>
          <p>
            We bring creative thinking and technical delivery into the same
            conversation. From the first strategy session to the final handover,
            we help you connect the details to your bigger business goals.
          </p>
          <Link className="text-link" to="/work">
            See our ideas in action →
          </Link>
        </div>
        <div className="value-grid">
          {[
            [
              "digital-strategy",
              "Curiosity",
              "Ask better questions. Keep moving forward.",
            ],
            [
              "maintenance-support",
              "Integrity",
              "Clear scope. Honest communication. Shared expectations.",
            ],
            [
              "social-media",
              "Collaboration",
              "Your business knowledge. Our digital craft. One team.",
            ],
            [
              "seo",
              "Purpose",
              "Make each decision serve a meaningful business goal.",
            ],
          ].map(([icon, title, text]) => (
            <article className="reveal" key={title}>
              <ServiceIcon slug={icon} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="studio-manifesto page-wrap">
        <EditorialImage
          name="botanical-growth"
          className="manifesto-editorial"
          sizes="(max-width: 680px) 88vw, 35vw"
        />
        <p className="eyebrow">THE WAY WE WORK</p>
        <h2>
          Big on care.
          <br />
          <span>Light on complication.</span>
        </h2>
        <div className="manifesto-list">
          {[
            [
              "Clarity, before complexity.",
              "Ask useful questions. Agree what matters. Make the next step clear.",
            ],
            [
              "Craft, with a purpose.",
              "Make it feel considered, then make sure it works for the people using it.",
            ],
            [
              "A shared point of view.",
              "Keep the conversation open. Bring the right thinking to each part of the work.",
            ],
          ].map(([title, description], i) => (
            <article className="reveal" key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="about-disciplines page-wrap">
        <p className="eyebrow">THE PEOPLE BEHIND THE WORK</p>
        <h2>
          Different strengths.
          <br />
          <span>One shared direction.</span>
        </h2>
        <p className="lead">
          The right thinking, connected across every part of your project.
        </p>
        <div className="growth-process-grid">
          {[
            [
              "web-design",
              "Design & development",
              "Thoughtful interfaces, reliable builds and the little details that make an experience feel right.",
            ],
            [
              "performance-marketing",
              "Digital marketing",
              "Search, social, content and campaigns planned around the people you want to reach.",
            ],
            [
              "digital-strategy",
              "Strategy & delivery",
              "Clear priorities, practical project plans and a conversation that keeps everyone connected.",
            ],
          ].map(([icon, title, text]) => (
            <article className="reveal" key={title}>
              <EditorialImage
                name={icon}
                className="process-editorial"
                sizes="(max-width: 680px) 88vw, 28vw"
                decorative
              />
              <ServiceIcon slug={icon} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <CallToAction />
    </>
  );
}
