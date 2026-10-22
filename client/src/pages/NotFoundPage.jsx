import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <section className="not-found page-wrap">
      <p className="eyebrow">A LITTLE OFF THE PATH</p>
      <div className="error-art" aria-hidden="true">
        4<span>✿</span>4
      </div>
      <h1>A different turn.</h1>
      <p>
        The page you’re looking for may have moved.
        <br />
        Let’s find you a brighter starting point.
      </p>
      <div className="actions">
        <Link className="button yellow" to="/">
          Back to the sunshine ↗
        </Link>
        <Link className="button" to="/services">
          Explore services
        </Link>
      </div>
    </section>
  );
}
