import { Link } from "react-router-dom";
import EditorialImage from "./EditorialImage.jsx";
export default function CallToAction() {
  return (
    <section className="growth-cta page-wrap">
      <div className="growth-cta-inner reveal">
        <EditorialImage
          name="botanical-growth"
          className="cta-editorial"
          sizes="180px"
          decorative
        />
        <div>
          <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
          <h2>Ready to grow your business?</h2>
          <p>Bring your idea. Let’s build something great together.</p>
        </div>
        <Link className="button" to="/contact">
          Let’s get started <span>→</span>
        </Link>
      </div>
    </section>
  );
}
