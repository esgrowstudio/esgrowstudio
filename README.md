# Esgrow Studio

A MERN agency website: React + Vite frontend, Express/Node API and Mongoose/MongoDB inquiry storage. Includes 28 routes, nine service details, portfolio concepts, journal articles, quote-based pricing, legal drafts and a custom 404 page.

## Run locally

Use Node.js 20.19+ or 22.12+. Run `npm ci`, copy `.env.example` to `.env`, and set your own `MONGODB_URI`. Then run `npm run dev` and open http://localhost:5173. The API runs on port 3000; Vite proxies `/api` to it.

Without a database, the site still runs and inquiry submissions return an honest HTTP 503. Brief downloads remain available. No secrets are included in the repository.

## Production

Run `npm run build`, then `npm start`. Express serves the React build, correct 404 responses and the API from one origin. Set `NODE_ENV=production`, a real `MONGODB_URI` and your platform's `PORT`. Configure `TRUST_PROXY` only for your trusted reverse proxy.

Deploy the full stack to a Node-compatible host with MongoDB Atlas or another MongoDB instance. The Sites deployment is a frontend preview; it cannot run the Express process. For a separate API origin, configure the exact frontend origin in `FRONTEND_ORIGIN`, set `VITE_API_URL` before building and use HTTPS on both origins.

## Editing

The repository uses a conventional client/server structure:

```text
client/
  public/assets/       # Original website imagery
  src/
    components/        # Shared navigation, footer, forms and UI
    pages/             # Individual React page layouts
    data/              # Structured services, articles and policy copy
    hooks/             # Route-aware motion with listener cleanup
    styles/            # Original theme and page layouts
server/
  src/
    config/            # Database configuration
    controllers/       # Inquiry request handling
    middleware/        # API error handling
    models/            # Mongoose schemas
    routes/            # Express API routing
    utils/             # Request validation
    app.js             # Express application
    index.js           # Process startup and shutdown
  tests/               # Server validation tests
scripts/               # Production build packaging
```

`dist/` is generated and ignored by Git. Known route entry files are emitted for static previews. Page layouts and interactions live in React components and hooks rather than raw HTML templates or injected script files.

Run `npm run check`, `npm test` and `npm run build` to validate changes. The API intentionally exposes no public endpoint to read submitted inquiries.

## Before commercial launch

- Connect MongoDB and verify a submitted inquiry is stored. Confirm how your authorised team will review submissions; email notifications are not implemented.
- Confirm the legal entity, business address, privacy contact and contractual terms. Legal pages are explicitly drafts.
- Replace or retain portfolio concepts as appropriate; current work is labelled illustrative.
- Confirm actual pricing, support commitments and provider costs in written proposals.

The included WebP images were generated for this website. The site respects reduced-motion preferences.
