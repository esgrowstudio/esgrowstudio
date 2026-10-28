import CallToAction from "../components/CallToAction.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import FaqList from "../components/FaqList.jsx";
import EditorialImage from "../components/EditorialImage.jsx";
const plans = [
  {
    name: "Project",
    line: "One considered leap.",
    text: "A defined piece of work, from first conversation to a clear handover.",
    items: [
      "Website design or development",
      "Brand and content projects",
      "Agreed scope and milestones",
    ],
    type: "project",
  },
  {
    name: "Growth",
    line: "Build the momentum.",
    text: "A connected rhythm of marketing work, shaped around your goals.",
    items: [
      "SEO, social or paid campaigns",
      "A prioritised delivery plan",
      "Regular progress reviews",
    ],
    type: "ongoing",
  },
  {
    name: "Care",
    line: "Keep it growing.",
    text: "Practical support for the website your business depends on.",
    items: [
      "Planned checks and updates",
      "A defined request process",
      "Clear support coverage",
    ],
    type: "ongoing",
  },
];
export default function PricingPage() {
  const [mode, setMode] = useState("All");
  return (
    <>
      <section className="pricing-intro page-wrap">
        <p className="eyebrow">RIGHT-SIZED PARTNERSHIPS</p>
        <h1>
          A clear scope.
          <br />A sensible next step.
        </h1>
        <p className="lead">
          Start with what your business needs most.
          <br />
          We’ll help you prioritise the work, agree the scope and understand
          where your investment goes.
        </p>
        <div className="filter-pills">
          {["All", "Project", "Ongoing"].map((item) => (
            <button
              key={item}
              aria-pressed={mode === item}
              onClick={() => setMode(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>
      <section className="pricing-plans page-wrap">
        <div className="plan-grid">
          {plans
            .filter((p) => mode === "All" || p.type === mode.toLowerCase())
            .map((plan) => (
              <article
                className={"plan plan-" + plan.name.toLowerCase()}
                key={plan.name}
              >
                <EditorialImage
                  name={
                    {
                      Project: "connected-sculpture",
                      Growth: "performance-marketing",
                      Care: "maintenance-support",
                    }[plan.name]
                  }
                  className="plan-editorial"
                  sizes="(max-width: 680px) 88vw, 28vw"
                  decorative
                />
                <p className="eyebrow">{plan.name}</p>
                <h2>{plan.line}</h2>
                <p>{plan.text}</p>
                <span className="plan-price">Quoted around your scope</span>
                <ul>
                  {plan.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link
                  className="button yellow"
                  to={"/contact?plan=" + plan.name.toLowerCase()}
                >
                  Discuss {plan.name.toLowerCase()} ↗
                </Link>
              </article>
            ))}
        </div>
        <p className="small-note">
          Your proposal sets out fees, currency, taxes and payment milestones.
          Ad spend, hosting and third-party subscriptions are itemised
          separately. No payment is collected here.
        </p>
      </section>
      <section className="proposal-process page-wrap">
        <div>
          <p className="eyebrow">NO GUESSWORK</p>
          <h2>
            Here’s how we
            <br />
            find the right fit.
          </h2>
        </div>
        <ol>
          <li>
            <span>01</span>
            <div>
              <h3>A conversation.</h3>
              <p>
                Your goals, your starting point and what you need from a
                partner.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>A clear proposal.</h3>
              <p>Scope, timeline, responsibilities and costs, written down.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>A shared plan.</h3>
              <p>Agree the next steps, then get the good things moving.</p>
            </div>
          </li>
        </ol>
      </section>
      <section className="pricing-faq page-wrap">
        <h2>The practical details.</h2>
        <FaqList
          items={[
            {
              q: "Can we start with a smaller phase?",
              a: "Yes. A focused first phase can help you clarify the next stage without committing to everything at once.",
            },
            {
              q: "Is advertising spend included?",
              a: "Media spend and third-party costs are separate unless your written proposal explicitly includes them.",
            },
            {
              q: "What affects the final quote?",
              a: "Deliverables, platform, integrations, content needs, timeline and support expectations all shape the scope.",
            },
          ]}
        />
      </section>
      <CallToAction />
    </>
  );
}
