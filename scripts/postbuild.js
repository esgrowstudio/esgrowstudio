import fs from "node:fs";
import path from "node:path";
const { routes } = await import("../src/data/routes.js");
const html = fs.readFileSync("dist/index.html", "utf8");
for (const page of routes) {
  if (page.path === "/") continue;
  const dir = path.join("dist", page.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "index.html"),
    html.replace(
      "<title>Esgrow Studio</title>",
      `<title>${page.title} — Esgrow Studio</title>`,
    ),
  );
}
fs.writeFileSync("dist/404.html", html);
// Every known route has its own static entry, so Vercel can serve deep links
// directly. The root 404.html handles unknown URLs without a runtime server.
