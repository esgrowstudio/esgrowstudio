# Google Sheets enquiry integration

Target spreadsheet: https://docs.google.com/spreadsheets/d/1tpG637BoiOutcXQsLd_iBrEF27lo0hr3Wkmeekjk88s/edit

Apps Script source: `integrations/google-sheets/Code.gs`.

## Receiver setup

1. Open the supplied spreadsheet, then Extensions → Apps Script.
2. Use the receiver source. Keep the destination ID fixed to the studio spreadsheet. The receiver creates a dedicated `Website Enquiries` tab and preserves other existing tabs.
3. Generate a random 32-byte-or-longer server secret. Store it only in the backend’s private `INQUIRY_SHEETS_SECRET` environment variable. Put its SHA-256 digest in `CONFIG.secretHash`; the digest can be stored in source control, the secret cannot.
4. Deploy as a Web app, executing as the studio owner. Allow the server to call it without a Google browser login (`Anyone`). Approve the requested Sheets access using the owner account. The script still rejects writes without the correct secret.
5. Save the final `/exec` URL as `INQUIRY_SHEETS_URL` on the Node server. Restart the server after changing environment configuration.
6. Check `/api/ready`, then submit one clearly labelled test through the actual website. Verify the row in Sheets. Do not treat source tests alone as proof of external delivery.

## Columns

Inquiry ID; Received (IST); Name; Email; Business / Website; Service; Project Message; Privacy Consent; Source; Status; Payload Hash.

The ID and hidden payload digest support safe retries. The receiver checks expected column headers and refuses to write if they have been changed. Add additional management columns after the existing columns; keep the first eleven in place. You can change the `Status` value manually to Reviewed or Closed. The script does not send email or subscribe visitors to marketing.

## Data and security behavior

- Validation and per-IP rate limiting happen in Express before any Sheets request.
- The browser never receives the script URL or server secret.
- The Apps Script receiver rechecks the secret, text lengths, email, request ID and privacy consent.
- A script lock serializes writes and duplicate checks; the same request ID/content is acknowledged without a second row.
- A matching request ID with different content fails instead of silently overwriting a lead.
- Leading spreadsheet formula characters in customer-provided text are escaped.
- A success message requires both a successful receiver response and the expected request ID.
- On timeout or failure, the form retains its contents. A brief download is local only.
- Sheet access and legal retention requirements remain the studio owner’s responsibility. With the owner’s explicit approval, general access was changed to Restricted; the receiver continues to run as the owner.

## Deployment and updates

The website needs a Node backend; a static-only deployment does not run the contact API. Copy the two private environment values to the live host. When receiver code changes, update the existing Apps Script deployment to a new version; editing the source alone does not update an already published version. If the secret is rotated, update the server value and receiver digest together.

Official references: https://developers.google.com/apps-script/guides/web and https://developers.google.com/apps-script/reference/lock/lock-service.
