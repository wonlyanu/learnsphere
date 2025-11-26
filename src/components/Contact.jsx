import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Contact.css";
import "./About.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { name, email, subject, message } = formData;
    if (!name || !email || !subject || !message) {
      setError("⚠️ All fields are mandatory for secure transmission.");
      return;
    }

    try {
      setLoading(true);

      // --- POST TO BACKEND ---
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        setError("❌ Transmission failed. Server denied the request.");
        setLoading(false);
        return;
      }

      // Success!
      setSubmitted(true);
      setLoading(false);

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("❌ Server not reachable. Check backend connection.");
    }
  };

  return (
    <div className="contact-page">
      <video className="bg-video" autoPlay loop muted playsInline>
        <source src="/videos/respage.mp4" type="video/mp4" />
      </video>

      <div className="contact-overlay"></div>

      <div className="contact-content">
        <motion.div
          className="contact-box"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="contact-title">ENCRYPTED TRANSMISSION PROTOCOL</h1>
          <p className="contact-subtitle">
            Attention Agent: Use this terminal to report bugs, submit feedback,
            or request new quest lines. All transmissions are highly classified.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder=" Agent Codename (Your Name)"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder=" Secure Channel (Email Address)"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder=" Subject File (Bug Report, New Quest Idea, Feedback)"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder=" Detailed Transmission (Your Message)"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" className="send-btn" disabled={loading}>
              {loading ? "TRANSMITTING..." : "INITIATE TRANSMISSION"}
            </button>
          </form>

          {/* Error */}
          {error && (
            <motion.p
              className="error-message"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}

          {/* Success */}
          {submitted && (
            <motion.p
              className="success-message"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ✅ Transmission received. Awaiting command response.
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
