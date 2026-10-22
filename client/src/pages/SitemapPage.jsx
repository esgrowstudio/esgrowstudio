import { Link } from "react-router-dom";
import services from "../data/services.json";
import articles from "../data/articles.json";
export default function SitemapPage() {
  const groups = [
    [
      "THE STUDIO",
      [
        ["Home", "/"],
        ["About", "/about"],
        ["Work", "/work"],
        ["Pricing", "/pricing"],
        ["Contact", "/contact"],
        ["FAQs", "/faq"],
      ],
    ],
    ["OUR EXPERTISE", services.map((s) => [s.name, "/services/" + s.slug])],
    ["THE JOURNAL", articles.map((a) => [a.title, "/blog/" + a.slug])],
    [
      "THE LITTLE THINGS",
      [
        ["Privacy", "/privacy"],
        ["Terms & conditions", "/terms"],
        ["Cookies", "/cookies"],
        ["Accessibility", "/accessibility"],
      ],
    ],
  ];
  return (
    <section className="sitemap-page page-wrap">
      <p className="eyebrow">EVERYTHING, CONNECTED</p>
      <h1>Find your way.</h1>
      <div className="sitemap-grid">
        {groups.map(([title, links]) => (
          <div key={title}>
            <h2>{title}</h2>
            {links.map(([label, path]) => (
              <Link key={path} to={path}>
                {label}
                <span>↗</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
