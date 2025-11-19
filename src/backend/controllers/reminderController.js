import Reminder from "../models/Reminder.js";
import transporter from "../config/mailer.js";

// Save user’s reminder preference
export const saveReminderPreference = async (req, res) => {
  const { email, allow } = req.body;

  try {
    const existing = await Reminder.findOne({ email });

    if (existing) {
      existing.allow = allow;
      await existing.save();
      return res.status(200).json({ message: "Reminder preference updated" });
    }

    const newReminder = new Reminder({ email, allow });
    await newReminder.save();

    res.status(201).json({ message: "Reminder preference saved" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Send a manual reminder (for testing)
export const sendReminder = async (req, res) => {
  const { email } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "LearnSphere Daily Reminder",
      text: "👋 Don’t forget to continue your learning journey with LearnSphere AI today!",
    });

    await Reminder.findOneAndUpdate({ email }, { lastSent: new Date() });

    res.status(200).json({ message: "Reminder email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send reminder" });
  }
};
