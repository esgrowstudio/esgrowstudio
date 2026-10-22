import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 100, trim: true },
    email: {
      type: String,
      required: true,
      maxlength: 254,
      trim: true,
      lowercase: true,
    },
    business: { type: String, maxlength: 200, default: "" },
    service: { type: String, required: true, maxlength: 100 },
    message: { type: String, required: true, minlength: 15, maxlength: 5000 },
    consent: { type: Boolean, required: true },
    status: {
      type: String,
      enum: ["new", "reviewed", "closed"],
      default: "new",
    },
  },
  { timestamps: true },
);
export default mongoose.model("Inquiry", schema);
