import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction.jsx";
import FaqList from "../components/FaqList.jsx";
import "../styles/packages.css";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "39,999",
    tagline: "Launch your online presence",
    description:
      "For businesses and independent professionals who need a website and the essentials to get discovered.",
    features: [
      [
        "A website built around you",
        "A responsive business or personal website that explains what you do and gives visitors a clear way to enquire.",
      ],
      [
        "Meta and Google Ads setup",
        "We configure both ad accounts and launch one introductory campaign on the platform agreed for your goals.",
      ],
      [
        "SEO and local discovery",
        "Foundational on-page SEO, Google Business Profile setup where eligible, and a simple way to request genuine customer reviews.",
      ],
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "74,999",
    tagline: "Run a 45-day growth programme",
    description:
      "For businesses ready to combine a stronger brand, original content and active promotion.",
    badge: "Recommended",
    includes: "Everything in Starter, plus:",
    features: [
      [
        "Website, domain and branding",
        "Domain registration, a cohesive visual direction, SEO and local visibility support, plus a designed catalogue or menu where relevant.",
      ],
      [
        "On-location shoot and social content",
        "We visit your location and shoot with a female model. Includes 4 cinematic edited reels, static post design, publishing and social media management.",
      ],
      [
        "45 days of managed Meta Ads",
        "We research your audience, build and run the campaigns, track lead activity and refine targeting, creative or messaging when performance calls for it.",
      ],
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "99,999",
    tagline: "Produce more. Go deeper.",
    description:
      "For businesses that need more content, deeper campaign support and a programme shaped around their priorities.",
    includes: "Everything in Growth, with these upgrades:",
    features: [
      [
        "10 cinematic reels in total",
        "Ten edited reels in place of Growth’s four, with more room for creative concepts, storytelling and production polish.",
      ],
      [
        "Advanced campaign support",
        "More room to test audience segments, creative angles and messaging, with deeper performance reviews and optimisation.",
      ],
      [
        "Custom scope and schedule",
        "Plan shoot dates and content rollout around your business. Request add-ons and we’ll agree the scope, timing and any additional fees in writing.",
      ],
    ],
  },
];

const questions = [
  {
    q: "Is the Meta ad budget included?",
    a: "Yes. Growth’s first 45 days of Meta ad spend come out of the ₹74,999 package price. Premium inherits that 45-day inclusion. We agree the media allocation before launch. Starter includes campaign setup and launch; its media budget is separate. Spend beyond the included period is agreed separately.",
  },
  {
    q: "What happens if the ads aren’t bringing in leads?",
    a: "We review where the drop-off is happening, from the audience and creative to the offer and enquiry flow, then refine the campaign based on what we learn. Lead volume and sales depend on the market, offer and customer response.",
  },
  {
    q: "How do we plan the shoot and content?",
    a: "We agree the location, shoot schedule, creative direction and static post scope before production. Growth includes 4 edited reels and Premium includes 10 in total.",
  },
  {
    q: "What will the proposal confirm?",
    a: "Your proposal confirms website scope, shoot logistics, the included ad budget, payment milestones and applicable taxes. It also lists any requested add-ons and ongoing costs such as domain renewal, hosting or subscriptions.",
  },
];

export default function PricingPage() {
  return (
    <div className="packages-page">
      <section className="packages-hero page-wrap">
        <p className="eyebrow">ESGROW STUDIO / PRICING</p>
        <h1>
          Build your presence.
          <br />
          <em>Grow with a plan.</em>
        </h1>
        <p className="packages-lead">
          Three packages for different stages of business, from your first
          website to a full campaign with original content.
        </p>
        <a className="text-link" href="#packages">
          Explore the packages ↓
        </a>
      </section>

      <section
        id="packages"
        className="packages-section page-wrap"
        aria-label="Pricing packages"
      >
        <div className="packages-grid">
          {plans.map((plan, index) => (
            <article
              className={`package-card package-${plan.id} reveal`}
              key={plan.id}
            >
              <div className="package-label">
                <span>
                  0{index + 1} / {plan.name}
                </span>
                {plan.badge && (
                  <span className="package-badge">{plan.badge}</span>
                )}
              </div>
              <h2>{plan.name}</h2>
              <p className="package-price">
                ₹{plan.price} <span>INR / package</span>
              </p>
              <h3>{plan.tagline}</h3>
              <p>{plan.description}</p>
              {plan.id !== "starter" && (
                <p className="package-spend">
                  First 45 days of Meta ad spend included
                </p>
              )}
              {plan.includes && (
                <p className="package-inherits">{plan.includes}</p>
              )}
              <ul className="package-features">
                {plan.features.map(([title, detail]) => (
                  <li key={title}>
                    <strong>{title}</strong>
                    <p>{detail}</p>
                  </li>
                ))}
              </ul>
              <Link
                className={`button ${plan.id === "growth" ? "yellow" : ""}`}
                to={`/contact?plan=${plan.id}`}
              >
                Discuss {plan.name} ↗
              </Link>
            </article>
          ))}
        </div>
        <p className="packages-note">
          All prices are in INR. We confirm deliverables, applicable taxes and
          any optional costs in your proposal before work begins.
        </p>
      </section>

      <section
        className="packages-programme page-wrap reveal"
        aria-labelledby="programme-title"
      >
        <div className="packages-programme-inner">
          <p className="eyebrow">INSIDE THE 45-DAY PROGRAMME</p>
          <h2 id="programme-title">Launch. Learn. Refine.</h2>
          <p>
            Growth and Premium pair content production with active Meta campaign
            management. The included media budget is agreed before launch.
          </p>
          <ol>
            <li>
              <span>01</span>
              <h3>Plan and produce</h3>
              <p>
                Define the offer and audience, plan the shoot, and build
                creative around what customers need to see.
              </p>
            </li>
            <li>
              <span>02</span>
              <h3>Launch and measure</h3>
              <p>
                Publish the content, launch the campaign and monitor enquiry
                activity as performance data comes in.
              </p>
            </li>
            <li>
              <span>03</span>
              <h3>Refine and review</h3>
              <p>
                Adjust creative, targeting or messaging based on what the
                campaign tells us, then discuss the next steps.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="packages-faq page-wrap reveal">
        <div>
          <p className="eyebrow">BEFORE YOU CHOOSE</p>
          <h2>
            Good questions.
            <br />
            Clear answers.
          </h2>
        </div>
        <FaqList items={questions} />
      </section>
      <CallToAction />
    </div>
  );
}
