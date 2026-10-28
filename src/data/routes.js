import services from "./services.json" with { type: "json" };
import articles from "./articles.json" with { type: "json" };
import policies from "./policies.json" with { type: "json" };
import { projects } from "./projects.js";
export const routes = [
  {
    path: "/",
    title: "From roots to results",
    description:
      "Thoughtful websites, digital strategy and connected marketing. Esgrow brings design and technology together to help your business grow.",
  },
  { path: "/services", title: "Our services" },
  { path: "/work", title: "Selected work" },
  { path: "/pricing", title: "Pricing" },
  { path: "/about", title: "About the studio" },
  { path: "/blog", title: "The journal" },
  { path: "/contact", title: "Contact" },
  { path: "/faq", title: "Frequently asked questions" },
  { path: "/sitemap", title: "Explore the site" },
  { path: "/404", title: "Page not found" },
  ...services.map((s) => ({ path: "/services/" + s.slug, title: s.name })),
  ...projects.map((p) => ({
    path: "/work/" + p.slug,
    title: p.name + " case study",
    description: p.teaser,
  })),
  ...articles.map((a) => ({ path: "/blog/" + a.slug, title: a.title })),
  ...Object.entries(policies).map(([slug, p]) => ({
    path: "/" + slug,
    title: p.title,
  })),
];
