# Esgrow Studio — frontend only

React + Vite website with direct contact-form delivery to the studio’s Google Sheet. The website needs no Node/Express API, MongoDB database, Vercel Function, private key or server secret. Google Apps Script remains the external Sheet receiver.

## Run locally

Use Node.js 20.19+ or 22.12+ for development/build tools only.

```sh
npm ci
npm run dev
```

After dependencies are installed, run just `npm run dev` from the project root and open http://localhost:5173. `npm start` runs the same frontend. There is no separate client/server command. `npm run build` creates `dist/`; `npm run preview` serves that static build at http://localhost:4173.

The existing public receiver URL is already configured in `src/data/inquiry-config.js`. To use a different deployment, set `VITE_GOOGLE_SHEETS_URL` in `.env.local` or the hosting provider’s build settings. No secret belongs in a `VITE_` variable.

## Contact form

The browser submits directly to Google Apps Script using an invisible form/iframe. The receiver validates the submission, appends it to the existing `Website Enquiries` tab and sends a `postMessage` receipt to the submitting site. The frontend accepts only a Google-hosted receipt with the correct request ID and one-time nonce. An iframe load or an opaque network response is never treated as success.

Validation, a spam honeypot, best-effort request limits, duplicate protection and formula escaping run in the Google receiver. The Sheet remains Restricted. The receiver is a public form endpoint: browser code cannot hold a private secret, and origin fields are not authentication or comprehensive bot protection.

See [the integration guide](docs/google-sheets-integration.md) for updating the receiver and adding allowed website addresses.

## Vercel deployment preparation

The repository includes `vercel.json`:

- Root Directory: repository root (leave blank / `.`).
- Framework: Vite.
- Install: `npm ci`.
- Build: `npm run build`.
- Output: `dist`.
- No backend/serverless functions or database environment variables.

The build creates a static HTML entry for every known React route plus `404.html`. Clean URLs and direct refreshes therefore work without an API server. The public receiver URL already has a default; `VITE_GOOGLE_SHEETS_URL` is only an optional override.

**Before testing a deployed Vercel URL:** add its exact origin (for example `https://your-project.vercel.app`) to the Google Apps Script project’s `ALLOWED_ORIGINS` Script Property. Add your final custom domain there as well. Do not enter a path or trailing slash. Local development and preview origins are already allowed. Updating a Script Property does not require redeploying receiver code.

Production: https://esgrowstudio.vercel.app. Its exact origin is configured in the receiver’s `ALLOWED_ORIGINS` property. Add any future custom domain there before accepting enquiries from it.

## Web Analytics

Vercel Web Analytics is mounted once in `src/main.jsx` using `@vercel/analytics/react`. It tracks visits and client-side page navigation without analytics cookies. Query strings and URL fragments are stripped before sending page URLs; form values are not sent as analytics events. No analytics environment variables or backend are required. View results in the Vercel project’s Analytics dashboard after deployment.

## Checks

```sh
npm run check
npm test
npm run build
```

The focused tests cover Google receipt validation, timeouts, cleanup, receiver validation, duplicate/conflicting requests, formula escaping and request limits. The Google receiver source is retained under `integrations/google-sheets/Code.gs`; this is not hosted by Vercel.

Website layouts, assets, page content and animations remain in `src/` and `public/`. Legal pages still require final business details before commercial launch, and demonstration reviews remain labelled as examples.

## Folder guide

- `src/`: active website pages, shared components, styles, data and browser-side form delivery.
- `public/`: only deployed images, fonts, icons and the intro bootstrap file.
- `integrations/google-sheets/`: source of the external Google Sheet receiver; needed when updating that integration.
- `scripts/`: build/check tasks and the optional responsive-imagery export utility.
- `tests/`: focused contact-delivery regression tests.
- `docs/`: setup notes, image provenance and preserved originals under `reference-assets/`.
- `node_modules/`: installed development/build dependencies; regenerate with `npm ci`.
- `dist/`: generated static site, rebuilt with `npm run build` and used by the preview. Do not edit it directly.

`.vercelignore` excludes documentation, original references, local artifacts and non-deployment tools from Vercel uploads. There is no website `server/` folder.
