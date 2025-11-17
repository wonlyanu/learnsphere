import React, { useState } from "react";
import { motion } from "framer-motion"; // Added motion import for animations
import "./Contact.css";
import "./About.css";

// Removed: Navbar, Footer, and Home.css imports

export default function Contact() {
  // Removed: goBack prop
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "", 
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null); // State for displaying error messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null); // Clear error on typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Validation
    const { name, email, subject, message } = formData;
    if (!name || !email || !subject || !message) {
      // Set state to display error instead of using alert()
      setError("⚠️ All fields are mandatory for secure transmission.");
      return;
    }

    // You can replace this with an API call here
    console.log("Transmission Initiated:", formData);

    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    // Hide confirmation after few seconds
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="contact-page">
      {/* Background Video */}
      <video className="bg-video" autoPlay loop muted playsInline>
        <source src="/videos/respage.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Dark Overlay */}
      <div className="contact-overlay"></div>

      {/* Contact Content */}
      <div className="contact-content">
        <motion.div 
          className="contact-box"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="contact-title">ENCRYPTED TRANSMISSION PROTOCOL</h1>
          <p className="contact-subtitle">
            Attention Agent: Use this terminal to report bugs, submit feedback, or request new quest lines. All transmissions are highly classified.
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

            <button type="submit" className="send-btn">
              INITIATE TRANSMISSION
            </button>
          </form>

          {/* Error Message Display */}
          {error && (
            <motion.p 
                className="error-message"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}

          {/* Success Message */}
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
