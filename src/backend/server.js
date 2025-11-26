import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Start cron job
import "./jobs/reminderJob.js";

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/reminder", reminderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
