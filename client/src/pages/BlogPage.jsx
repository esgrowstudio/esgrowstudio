import { Link } from "react-router-dom";
import articles from "../data/articles.json";
import EditorialImage from "../components/EditorialImage.jsx";
import { articleVisuals } from "../data/visuals.js";
export default function BlogPage() {
  const [featured, ...rest] = articles;
  return (
    <>
      <section className="journal-heading page-wrap">
        <div>
          <p className="eyebrow">THE ESGROW JOURNAL</p>
          <h1>A little perspective.</h1>
        </div>
        <p>
          Ideas for better digital experiences.
          <br />
          Notes from the work, and the thinking behind it.
        </p>
      </section>
      <section className="journal-feature page-wrap">
        <Link to={"/blog/" + featured.slug} className="feature-story">
          <EditorialImage name={articleVisuals[featured.slug]} priority />
          <div>
            <p className="eyebrow">FEATURED / {featured.category}</p>
            <h2>{featured.title}</h2>
            <p>{featured.sections[0].text.slice(0, 145)}…</p>
            <span className="text-link">Read the story ↗</span>
          </div>
        </Link>
      </section>
      <section className="journal-rest page-wrap">
        <div className="section-heading">
          <h2>More from the studio.</h2>
          <span className="eyebrow">SMALL NOTES. USEFUL IDEAS.</span>
        </div>
        <div className="journal-pair">
          {rest.map((article) => (
            <Link key={article.slug} to={"/blog/" + article.slug}>
              <div className="journal-photo">
                <EditorialImage
                  name={articleVisuals[article.slug]}
                  decorative
                />
              </div>
              <p className="eyebrow">{article.category}</p>
              <h3>{article.title}</h3>
              <span className="text-link">Read the story ↗</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
