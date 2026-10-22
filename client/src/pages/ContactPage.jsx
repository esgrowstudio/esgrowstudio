import { Link } from "react-router-dom";
import InquiryForm from "../components/InquiryForm.jsx";
import EditorialImage from "../components/EditorialImage.jsx";
export default function ContactPage() {
  return (
    <section className="contact-page page-wrap">
      <div className="contact-introduction">
        <p className="eyebrow">GET IN TOUCH</p>
        <h1>
          Let’s build something
          <br />
          <span>great together.</span>
        </h1>
        <p className="lead">
          Have a project in mind or a challenge to solve?
          <br />
          We’d love to hear what you’re working towards.
        </p>
        <EditorialImage
          name="contact-desk"
          className="contact-editorial"
          priority
        />
        <div className="contact-guidance">
          <p>Tell us what you’re working towards. We’ll take it from there.</p>
          <Link className="text-link" to="/faq">
            A few useful answers ↗
          </Link>
        </div>
      </div>
      <div className="contact-form-panel">
        <h2>Tell us about your project.</h2>
        <p className="form-panel-intro">
          Share a few details and help us understand the right next step.
        </p>
        <InquiryForm />
      </div>
    </section>
  );
}
