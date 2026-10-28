import { Link } from "react-router-dom";
import { Brand } from "./Header.jsx";
import ContactDetails from "./ContactDetails.jsx";

const groups = [
  {
    title: "EXPERTISE",
    links: [
      ["Web design", "/services/web-design"],
      ["Development", "/services/website-development"],
      ["SEO & marketing", "/services/performance-marketing"],
      ["All services", "/services"],
    ],
  },
  {
    title: "STUDIO",
    links: [
      ["About us", "/about"],
      ["Selected work", "/work"],
      ["Pricing", "/pricing"],
      ["Journal", "/blog"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "THE LITTLE THINGS",
    links: [
      ["FAQs", "/faq"],
      ["Terms & conditions", "/terms"],
      ["Privacy policy", "/privacy"],
      ["Cookie policy", "/cookies"],
    ],
  },
];
export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand-column">
          <Brand />
          <h3>
            Rooted in vision.
            <br />
            Built for growth.
          </h3>
          <Link className="button yellow small" to="/contact">
            Start a conversation ↗
          </Link>
        </div>
        <div className="footer-links">
          {groups.map((group) => (
            <div key={group.title}>
              <span>{group.title}</span>
              {group.links.map(([name, to]) => (
                <Link key={to} to={to}>
                  {name}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-contact-column">
          <span className="footer-column-title">LET’S CONNECT</span>
          <ContactDetails compact />
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Esgrow Studio</span>
        <div className="footer-small-links">
          <Link to="/accessibility">Accessibility</Link>
          <Link to="/sitemap">Sitemap</Link>
        </div>
        <span>Made with a little extra care. ✳</span>
      </div>
    </footer>
  );
}
