import fs from "node:fs";
import path from "node:path";
import { routes } from "../src/data/routes.js";
import { getMetadata, origin, socialImage } from "../src/data/seo.js";

const html = fs.readFileSync("dist/index.html", "utf8");
const escape = (value) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const meta = (key, value, kind = "name") =>
  `<meta ${kind}="${key}" content="${escape(value)}">`;
function render(pathname) {
  const { title, description, canonical } = getMetadata(pathname);
  const tags = canonical
    ? [
        `<link rel="canonical" href="${escape(canonical)}">`,
        meta("og:type", "website", "property"),
        meta("og:site_name", "Esgrow Studio", "property"),
        meta("og:title", title, "property"),
        meta("og:description", description, "property"),
        meta("og:url", canonical, "property"),
        meta("og:image", socialImage, "property"),
        meta("twitter:card", "summary_large_image"),
      ]
    : [meta("robots", "noindex")];
  if (pathname === "/")
    tags.push(
      `<script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Esgrow Studio",
        url: origin,
        email: "info@esgrowstudio.com",
        logo: origin + "/assets/brand/apple-touch-icon.png",
      })}</script>`,
    );
  return html
    .replace(/<title>.*?<\/title>/, () => `<title>${escape(title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, () =>
      meta("description", description),
    )
    .replace("</head>", () => tags.join("\n") + "\n</head>");
}
for (const page of routes) {
  const dir = path.join("dist", page.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), render(page.path));
}
fs.writeFileSync("dist/404.html", render("/404"));
const urls = routes
  .map(({ path }) => getMetadata(path).canonical)
  .filter(Boolean);
fs.writeFileSync(
  "dist/sitemap.xml",
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((url) => `  <url><loc>${escape(url)}</loc></url>`).join("\n") +
    "\n</urlset>\n",
);
fs.writeFileSync(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
);
