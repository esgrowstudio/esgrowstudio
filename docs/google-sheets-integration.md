# Direct Google Sheets enquiries — no website backend

Spreadsheet: https://docs.google.com/spreadsheets/d/1tpG637BoiOutcXQsLd_iBrEF27lo0hr3Wkmeekjk88s/edit#gid=990203483

Receiver source: `integrations/google-sheets/Code.gs`.

## Flow

Browser contact form → hidden cross-origin form POST → Google Apps Script → existing Website Enquiries tab → Google-hosted postMessage acknowledgement → success state.

No Express process, MongoDB, Vercel Function, shared browser secret or Google service-account JSON is required. The public receiver executes as the studio owner. Visitors do not sign in to Google or receive access to the Sheet.

## Receiver deployment

The existing project and deployment URL are reused. In the Sheet’s Extensions → Apps Script editor, use the repository receiver source. Manage deployments → Edit → New version → Deploy. Execute as the studio owner and keep access as Anyone so the form can submit without Google authentication. Approve new permissions only after reviewing them.

The script creates the dedicated `Website Enquiries` tab if needed and preserves existing rows and other tabs. Keep the first eleven columns in order: Inquiry ID; Received (IST); Name; Email; Business / Website; Service; Project Message; Privacy Consent; Source; Status; Payload Hash. The digest column is hidden and used for conflict/duplicate checks. Status can be changed manually.

## Add the live domain

In Apps Script → Project Settings → Script Properties, set:

- Property: `ALLOWED_ORIGINS`
- Current production value: `https://esgrowstudio.vercel.app`. Append future custom domains as comma-separated exact origins.

Use the actual domains after Vercel assigns them. Do not add wildcards, paths or trailing slashes. localhost and 127.0.0.1 on ports 5173 and 4173 are already allowed. A disallowed origin receives a failure receipt and no row. Updating the property does not require publishing another script version.

## Validation and limits

- Required text, field lengths, email, known service choice, UUID, privacy consent and honeypot are checked in the receiver.
- A script lock serializes duplicate checks and appends.
- The same request ID and content are acknowledged without adding another row; conflicting content with the same ID is rejected.
- A best-effort cache bucket limits new rows to 30 per minute across the receiver. Cached limits are not a guaranteed defence against determined bots.
- Formula-like user text is escaped before writing it to cells.
- The frontend checks the Google message origin, exact request ID and a fresh nonce. No customer data is returned in the acknowledgement.
- Failure or timeout preserves form contents so the visitor can retry.

This is a public enquiry endpoint, not an authenticated server API. A claimed origin can be forged by a non-browser client. No secret in JavaScript could prevent that. If public spam becomes a problem, add a proper challenge verified by Apps Script; do not put an API secret in the website.

Sheet sharing stays Restricted; receiver web-app accessibility does not change Sheet sharing. No read API or marketing subscription is provided.

## Deployment checklist

1. Build the static website with `npm run build`.
2. Deploy `dist` using the repository Vercel settings.
3. Add the actual Vercel/custom-domain origins to `ALLOWED_ORIGINS`.
4. Submit a labelled test from that live domain and verify its row and success state.

Official references: https://developers.google.com/apps-script/guides/web and https://developers.google.com/apps-script/guides/html/restrictions.
