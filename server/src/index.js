import "dotenv/config";
import mongoose from "mongoose";
import { createApp } from "./app.js";
import { connectDatabase } from "./config/database.js";
const port = Number(process.env.PORT) || 3000;
const server = createApp().listen(port, "0.0.0.0", () =>
  console.log(`Esgrow API: http://localhost:${port}`),
);
connectDatabase(process.env.MONGODB_URI);
async function shutdown() {
  server.close();
  await mongoose.disconnect();
  process.exit(0);
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
