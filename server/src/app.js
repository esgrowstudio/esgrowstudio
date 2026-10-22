import express from "express";
import helmet from "helmet";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import apiRoutes from "./routes/apiRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
const buildDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../dist",
);
export function createApp() {
  const app = express();
  app.disable("x-powered-by");
  if (process.env.TRUST_PROXY)
    app.set("trust proxy", Number(process.env.TRUST_PROXY));
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          "script-src": ["'self'"],
          "style-src": [
            "'self'",
            "'unsafe-inline'",
            "https://fonts.googleapis.com",
          ],
          "font-src": ["'self'", "https://fonts.gstatic.com"],
          "img-src": ["'self'", "data:", "blob:"],
          "upgrade-insecure-requests":
            process.env.NODE_ENV === "production" ? [] : null,
        },
      },
      strictTransportSecurity:
        process.env.NODE_ENV === "production" ? undefined : false,
    }),
  );
  app.use(express.json({ limit: "24kb" }));
  app.use((req, res, next) => {
    const allowed = process.env.FRONTEND_ORIGIN;
    if (allowed && req.headers.origin === allowed) {
      res.setHeader("Access-Control-Allow-Origin", allowed);
      res.setHeader("Vary", "Origin");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
      if (req.method === "OPTIONS") return res.sendStatus(204);
    }
    next();
  });
  app.use("/api", apiRoutes);
  app.use(express.static(buildDirectory, { index: false, redirect: false }));
  app.get("*", (req, res) => {
    const filename = path.join(buildDirectory, "index.html");
    if (!fs.existsSync(filename))
      return res.status(503).send("Run npm run build to prepare the frontend.");
    const routes = JSON.parse(
      fs.readFileSync(path.join(buildDirectory, "routes.json"), "utf8"),
    );
    const route = req.path.replace(/\/$/, "") || "/";
    res.status(routes.includes(route) ? 200 : 404).sendFile(filename);
  });
  app.use(errorHandler);
  return app;
}
