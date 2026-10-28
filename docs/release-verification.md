# Frontend-only conversion — 29 October 2026

- Removed the complete server directory, Express/MongoDB middleware and controllers, API tests and server-only dependencies.
- Removed the Vite API proxy and local server-secret configuration.
- Kept the website’s page components, visual layout, styles, images and animations intact. The contact form import and error handling now use direct Google delivery.
- Replaced API submission with a hidden form/iframe transport and checked Google-hosted acknowledgements.
- Google Apps Script remains the external Sheet receiver. It preserves the existing tab, columns and enquiries.
- Added static Vercel configuration and retained generated route HTML entries for deep links.
- New focused tests cover receiver validation, duplicate handling, formula safety, request limits, receipt matching, timeouts and cleanup.

Vercel publication is intentionally not part of this change. The assigned live domain must be added to the receiver’s ALLOWED_ORIGINS Script Property before taking live enquiries there. Final business details for the legal draft pages remain a separate launch item.

Verified after conversion:

- `npm run check`, all 8 focused tests and `npm run build` pass.
- All 35 static route entries exist and load in the production preview.
- Both the development frontend (5173) and compiled static preview (4173) submitted labelled test enquiries directly to the existing Google Sheet and received matching success acknowledgements.
- The built client has no `/api/inquiries` calls, the server directory is absent, and the dependency audit reports zero production vulnerabilities.
- Page components, CSS and public visual assets have no changes from the previously approved frontend.

The runnable frontend now lives directly at the repository root: `src/`, `public/` and `index.html`. `npm run dev` or `npm start` starts only that frontend on port 5173. There is no client/server nesting in the build. The generated JavaScript/CSS files were hash-compared with the previous build and remain identical after this folder reorganisation.
