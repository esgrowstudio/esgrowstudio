import { Link, useParams } from "react-router-dom";
import articles from "../data/articles.json";
import NotFoundPage from "./NotFoundPage.jsx";
import EditorialImage from "../components/EditorialImage.jsx";
import { articleVisuals } from "../data/visuals.js";
import BrandMark from "../components/BrandMark.jsx";
export default function ArticlePage() {
  const { slug } = useParams(),
    article = articles.find((a) => a.slug === slug);
  if (!article) return <NotFoundPage />;
  const minutes = Math.max(
    1,
    Math.ceil(
      article.sections
        .map((s) => s.text)
        .join(" ")
        .split(/\s+/).length / 200,
    ),
  );
  return (
    <>
      <section className="article-heading page-wrap">
        <Link className="breadcrumb" to="/blog">
          ← The journal
        </Link>
        <p className="eyebrow">
          {article.category} / {minutes} MIN READ
        </p>
        <h1>{article.title}</h1>
        <div className="article-byline">
          <BrandMark className="article-brand-mark" size={38} />
          <span>
            Esgrow Studio
            <br />
            <small>Notes & perspectives</small>
          </span>
        </div>
      </section>
      <section className="article-cover page-wrap">
        <EditorialImage
          name={articleVisuals[article.slug]}
          sizes="90vw"
          priority
        />
      </section>
      <div className="article-layout page-wrap">
        <aside>
          <p className="eyebrow">IN THIS STORY</p>
          {article.sections.map((section, i) => (
            <a href={"#section-" + i} key={section.title}>
              {section.title}
            </a>
          ))}
        </aside>
        <div className="article-body">
          {article.sections.map((section, i) => (
            <section id={"section-" + i} key={section.title}>
              <span className="eyebrow">0{i + 1}</span>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}
          <div className="article-end">
            <span>✳</span>
            <p>A little clarity can be a good place to start.</p>
            <Link className="text-link" to="/contact">
              Talk it through with us ↗
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
