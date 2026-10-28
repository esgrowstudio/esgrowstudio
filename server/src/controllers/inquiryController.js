import {
  isSheetsConfigured,
  saveInquiryToSheets,
} from "../utils/googleSheets.js";
import { validateInquiry } from "../utils/validateInquiry.js";
export function createInquiryHandler({
  isStorageReady = isSheetsConfigured,
  saveInquiry = saveInquiryToSheets,
} = {}) {
  return async function createInquiry(req, res) {
    if (req.body?.website)
      return res
        .status(400)
        .json({ message: "Unable to accept this inquiry." });
    const { error, value } = validateInquiry(req.body);
    if (error) return res.status(400).json({ message: error });
    if (!isStorageReady())
      return res.status(503).json({
        message:
          "Inquiry delivery is not configured right now. Please download your brief and try again later.",
      });
    try {
      await saveInquiry(value);
      return res.status(201).json({ message: "Inquiry received." });
    } catch {
      return res.status(503).json({
        message:
          "We could not confirm your inquiry. Your details are still here; you can retry, download your brief or contact the studio directly.",
      });
    }
  };
}
export const createInquiry = createInquiryHandler();
