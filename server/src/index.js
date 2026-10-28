import "dotenv/config";
import { createApp } from "./app.js";
import { isSheetsConfigured } from "./utils/googleSheets.js";
const port = Number(process.env.PORT) || 3000;
console.log(`Google Sheets enquiry receiver: ${isSheetsConfigured() ? "configured" : "not configured"}`);
const server = createApp().listen(port, "0.0.0.0", () =>
  console.log(`Esgrow API: http://localhost:${port}`),
);
async function shutdown() {
  server.close(() => process.exit(0));
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
