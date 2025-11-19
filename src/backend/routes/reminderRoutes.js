import express from "express";
import { saveReminderPreference, sendReminder } from "../controllers/reminderController.js";

const router = express.Router();

router.post("/preference", saveReminderPreference);
router.post("/send", sendReminder); // optional manual trigger

export default router;
