import mongoose from "mongoose";
import Inquiry from "../models/Inquiry.js";
import { validateInquiry } from "../utils/validateInquiry.js";
export async function createInquiry(req, res) {
  if (req.body?.website)
    return res.status(400).json({ message: "Unable to accept this inquiry." });
  const { error, value } = validateInquiry(req.body);
  if (error) return res.status(400).json({ message: error });
  if (mongoose.connection.readyState !== 1)
    return res.status(503).json({
      message:
        "Inquiry delivery is not configured right now. Please download your brief and try again later.",
    });
  try {
    await Inquiry.create(value);
    return res.status(201).json({ message: "Inquiry received." });
  } catch {
    return res.status(503).json({
      message:
        "Your inquiry could not be saved. Please try again or download your brief.",
    });
  }
}
