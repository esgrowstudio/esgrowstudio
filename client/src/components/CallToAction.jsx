import { Link } from "react-router-dom";
import EditorialImage from "./EditorialImage.jsx";
export default function CallToAction() {
  return (
    <div className="home-refined shared-chapter">
      <section
        className="hr-finale hr-container"
        aria-label="Your next chapter"
      >
        <div className="hr-finale-inner reveal">
          <div className="hr-finale-copy">
            <p className="eyebrow">LET’S MAKE YOUR NEXT MOVE MATTER</p>
            <h2>
              Ready for your
              <br />
              <em>next chapter?</em>
            </h2>
            <p>
              Not enough enquiries? Outgrown your website?
              <br />
              Tell us what’s holding you back. We’ll help you find a clear way
              forward.
            </p>
            <Link className="button" to="/contact">
              Tell us what you’re thinking <span>↗</span>
            </Link>
          </div>
          <div className="hr-finale-art">
            <EditorialImage
              name="botanical-growth"
              sizes="(max-width: 680px) 90vw, 36vw"
              decorative
            />
            <span className="hr-finale-caption">FROM ROOTS TO RESULTS. ↗</span>
          </div>
        </div>
      </section>
    </div>
  );
}
