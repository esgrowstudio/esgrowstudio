import { visuals, visualSource } from "../data/visuals.js";

export default function EditorialImage({
  name,
  className = "",
  priority = false,
  sizes = "(max-width: 680px) 90vw, 45vw",
  decorative = false,
}) {
  const visual = visuals[name];
  if (!visual) return null;
  return (
    <picture className={"editorial-image " + className}>
      <img
        src={visualSource(name, 640)}
        srcSet={[320, 640, 1200]
          .map((width) => `${visualSource(name, width)} ${width}w`)
          .join(", ")}
        sizes={sizes}
        alt={decorative ? "" : visual.alt}
        width="1536"
        height="1024"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
