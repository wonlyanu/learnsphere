import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  allow: { type: Boolean, default: false },
  lastSent: { type: Date, default: null },
});

export default mongoose.model("Reminder", reminderSchema);
