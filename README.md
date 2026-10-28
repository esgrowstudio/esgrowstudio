# Esgrow Studio

React/Vite agency website with a Node/Express API. Contact enquiries are saved to the studio’s Google Sheet through an authenticated Google Apps Script receiver. A public browser login is not required for website visitors.

## Local development

Use Node.js 20.19+ or 22.12+. Run `npm ci`, copy `.env.example` to `.env`, configure the Google Sheets receiver below, then run `npm run dev`. Open http://localhost:5173. The API runs on port 3000; Vite proxies `/api` to it.

Without a configured receiver, the website runs but submissions return an honest HTTP 503. The form retains the visitor’s details and offers a local brief download. MongoDB is not required for the contact flow. Legacy MongoDB model/config files remain available but are not used by the active receiver.

## Google Sheets contact flow

See [the integration guide](docs/google-sheets-integration.md). The server-only configuration is:

- `INQUIRY_SHEETS_URL`: the deployed Apps Script `/exec` URL.
- `INQUIRY_SHEETS_SECRET`: a random server secret whose SHA-256 digest matches `CONFIG.secretHash` in the Apps Script receiver.

Never put either setting in a `VITE_` variable, client source or Git. The `.env` file is ignored. Copy both settings into the production host’s private environment settings when deploying; local `.env` settings do not transfer automatically.

Flow: visitor form → Express validation and rate limiting → authenticated Apps Script request → dedicated `Website Enquiries` tab → matching acknowledgement → success message. Stable request IDs and a script lock prevent duplicate rows when the same request is retried. Editing a form field creates a new request ID. User text is escaped before it can be interpreted as a spreadsheet formula.

`GET /api/health` checks that the process is running. `GET /api/ready` verifies access to the actual Sheets destination and returns 503 when it cannot confirm readiness. Neither endpoint exposes enquiry data or credentials. Email notifications are not implemented; the team reviews the Google Sheet.

## Production

Run `npm run build`, then `npm start`. Deploy the full stack to a Node-compatible host. Express serves the build, API and direct page routes. Set `NODE_ENV=production`, your host’s `PORT`, and the two Sheets environment settings. Use HTTPS. Set `TRUST_PROXY` only for the trusted reverse proxy used by your host.

For separate frontend/API hosting, set the exact frontend URL in `FRONTEND_ORIGIN` and set `VITE_API_URL` to the API origin before building. Configure your static frontend host to route known website paths to their emitted index files or the SPA entry. A frontend-only static host cannot run the enquiry API.

## Checks

- `npm run check`: server syntax.
- `npm test`: validation, request/receipt behavior, API routing and Sheets transport tests.
- `npm run build`: frontend production build and known-route entry files.
- `npm audit --omit=dev`: production dependency audit.

The 35 page routes, nine service details and real project stories live in `client/src/data/routes.js`. Images have responsive WebP variants; non-home routes load separately. Motion respects reduced-motion preferences. `dist/` is generated and ignored.

## Launch-specific items

- Verify one labelled test enquiry appears in the Google Sheet from the deployed website.
- Confirm the studio’s legal business identity, address, retention period and final legal wording. Current legal pages remain clearly labelled drafts.
- Homepage review examples are visibly labelled demonstrations; replace them with approved genuine reviews before presenting them as customer endorsements.
- Agree actual fees, deliverables and support commitments in each written proposal.
- Keep the enquiry spreadsheet restricted to the people who need access; it contains customer contact data.
