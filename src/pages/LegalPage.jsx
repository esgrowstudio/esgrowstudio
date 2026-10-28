import { Link, useParams } from "react-router-dom";
import policies from "../data/policies.json";
import ContactDetails from "../components/ContactDetails.jsx";
export default function LegalPage({ type }) {
  const policy = policies[type];
  return (
    <section className="document-layout page-wrap">
      <aside>
        <span className="eyebrow">THE LITTLE THINGS</span>
        {Object.entries(policies).map(([slug, item]) => (
          <Link
            aria-current={slug === type ? "page" : undefined}
            key={slug}
            to={"/" + slug}
          >
            {item.title}
          </Link>
        ))}
      </aside>
      <article className="policy-document">
        <p className="eyebrow">ESGROW STUDIO</p>
        <h1>{policy.title}</h1>
        <p className="document-intro">Clear information, in one place.</p>
        {policy.sections.map((section, i) => (
          <section key={section.title}>
            <span className="document-number">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
              {section.link && (
                <a
                  href={section.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {section.link.label}
                </a>
              )}
            </div>
          </section>
        ))}
        <section>
          <span className="document-number">
            {String(policy.sections.length + 1).padStart(2, "0")}
          </span>
          <div>
            <h2>Contact the studio</h2>
            <ContactDetails />
          </div>
        </section>
      </article>
    </section>
  );
}
