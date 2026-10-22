import { Link } from "react-router-dom";
import services from "../data/services.json";
export default function ServiceList({ compact = false }) {
  return (
    <div
      className={compact ? "service-directory compact" : "service-directory"}
    >
      {services.map((service, i) => (
        <Link
          className="service-row reveal"
          key={service.slug}
          to={"/services/" + service.slug}
        >
          <span className="step-number">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3>{service.name}</h3>
            {!compact && <p>{service.headline}</p>}
          </div>
          <span className="row-arrow" aria-hidden="true">
            ↗
          </span>
        </Link>
      ))}
    </div>
  );
}
