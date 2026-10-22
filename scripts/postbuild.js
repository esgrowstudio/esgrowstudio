import fs from "node:fs";
import path from "node:path";
const { routes } = await import("../client/src/data/routes.js");
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
fs.writeFileSync("dist/routes.json", JSON.stringify(routes.map((r) => r.path)));
// Static hosts can serve each known route directly; Express serves the SPA with
// correct status codes. No API is simulated in the static preview.
