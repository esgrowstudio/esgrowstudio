import { Router } from "express";
import { isSheetsConfigured, checkSheetsReady } from "../utils/googleSheets.js";
import rateLimit from "express-rate-limit";
import { createInquiry } from "../controllers/inquiryController.js";
const router = Router();
const inquiryLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many inquiries. Please try again later." },
});
router.get("/health", (req, res) =>
  res.json({
    ok: true,
    inquiryStorage: "google-sheets",
    configured: isSheetsConfigured(),
  }),
);
router.get("/ready", async (req, res) => {
  const ready = await checkSheetsReady();
  res
    .status(ready ? 200 : 503)
    .json({ ready, inquiryStorage: "google-sheets" });
});
router.post("/inquiries", inquiryLimit, createInquiry);
router.use((req, res) =>
  res.status(404).json({ message: "API endpoint not found." }),
);
export default router;
