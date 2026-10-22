import mongoose from "mongoose";
export async function connectDatabase(uri) {
  mongoose.set("bufferCommands", false);
  if (!uri) {
    console.log("MONGODB_URI is not set. Inquiry delivery is disabled.");
    return;
  }
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log("MongoDB connected.");
  } catch {
    console.error(
      "MongoDB unavailable. Check your environment configuration. Inquiry delivery remains disabled.",
    );
  }
}
