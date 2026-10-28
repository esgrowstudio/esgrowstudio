# Release verification — 27 October 2026

## Verified

- All 35 registered website routes inspected at 320px and 768px; the fully loaded route set inspected at 1440px. No document-level horizontal overflow found. Carousel content intentionally scrolls horizontally inside its own viewport.
- Compact desktop navigation checked at 1024px. Short landscape navigation checked at 844×390; menu remains within the viewport and scrolls internally. Navigation closes after a route selection.
- Contact form service preselection, validation, pending state, retained inputs on failure and success state checked.
- Actual browser form submission appeared in the supplied Google Sheet's `Website Enquiries` tab. Clearly labelled QA records remain in the sheet as verification evidence; customer/user records were not modified.
- Repeating the same API request ID and content returned success without another row for that ID.
- Spreadsheet general access changed from Anyone with the link to Restricted with the owner's explicit approval. Delivery continued working after the change.
- Apps Script runs as the studio owner and authenticates server requests with a secret. Only a digest of that secret is in the script. No secret found in generated client JavaScript.
- 16 automated tests pass, covering client receipts/timeouts, service validation, invalid data, storage failure, API routing and Sheets transport.
- Production build passes. All 35 production paths returned their expected status; custom and unknown 404 paths returned 404.
- Production dependency audit reports zero vulnerabilities after the compatible body-parser update.
- Homepage photo retains the original composition with responsive WebP assets (about 47–167 KB versus the 2.5 MB source). Non-home routes load separately.

## Deployment items still requiring the live environment

- Deploy to a Node-compatible host and configure INQUIRY_SHEETS_URL and INQUIRY_SHEETS_SECRET as private environment variables there. The local ignored .env is not deployed by Git.
- Verify one labelled submission from the final HTTPS domain. This report confirms local website delivery to the live Google Sheet, not a publicly deployed website.
- Finalise legal business details and retention policy; legal pages remain draft-labelled. Homepage review examples remain visibly labelled demonstrations.
- Tests represent the checked browser and viewport sizes, not every physical device or browser engine.
