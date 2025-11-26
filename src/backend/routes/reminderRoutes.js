import express from "express";
import { saveReminderPreference, sendReminder } from "../controllers/remainderController.js";

const router = express.Router();

router.post("/save", saveReminderPreference);
router.post("/send", sendReminder);

export default router;