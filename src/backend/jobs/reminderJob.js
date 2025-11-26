import cron from "node-cron";
import Reminder from "../models/Reminder.js";
import transporter from "../config/mailer.js";

// Runs every 24 hours at 9 AM
cron.schedule("0 9 * * *", async () => {
  console.log("📨 Running Daily Reminder Job...");

  try {
    const users = await Reminder.find({ allow: true });

    for (let user of users) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "LearnSphere Daily Reminder",
        text: "🔥 Continue your learning today! Visit LearnSphere now!",
      });

      user.lastSent = new Date();
      await user.save();
    }

    console.log("✅ Daily reminders sent successfully");
  } catch (error) {
    console.error("❌ Reminder Job Failed:", error);
  }
});