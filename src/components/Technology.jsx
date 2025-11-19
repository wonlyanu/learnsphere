import React, { useState } from "react";
import { motion } from "framer-motion";
import Webdev from "./Webdev";
import Cybersecurity from "./Cybersecurity";
import "./Technology.css";

// Removed: Navbar, Footer, and Home.css imports

export default function Technology({ goBackHome }) {
  const [webPage, setWebPage] = useState(false);
  const [cyberPage, setCyberPage] = useState(false);

  // If webPage is true, render the Webdev component
  if (webPage) {
    // Note: Since the overall app structure is unknown, this logic assumes Webdev
    // is a temporary view and we pass a function to go back to the Technology view.
    return <Webdev goBack={() => setWebPage(false)} />;
  }

  // If cyberPage is true, render the Cybersecurity component
  if (cyberPage) {
    return <Cybersecurity goBack={() => setCyberPage(false)} goBackHome={goBackHome} />;
  }

  return (
    <div className="technology-page">
      {/* Back Button */}
      <motion.button
        className="back-btn back-to-home-btn"
        onClick={goBackHome}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        &#9664; BACK TO HOME
      </motion.button>

      {/* Background Video */}
      <video className="bg-video" autoPlay loop muted playsInline>
        <source src="/videos/techback.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Hero Section */}
      <motion.div
        className="tech-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="title">SELECT YOUR STARTING SKILL TREE</h1>
        <p className="subtitle">
          Choose your primary specialization. This selection determines your initial quest line.
        </p>
      </motion.div>

      {/* Technology Cards */}
      <div className="tech-container">
        <motion.div
          className="tech-card web"
          whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)" }}
          transition={{ duration: 0.2 }}
          onClick={() => setWebPage(true)}
        >
          <h2 className="card-title">WEB DEVELOPMENT</h2>
          <p className="card-description">
            **[PATH: CREATOR]** Master Front-end frameworks, Back-end services, and database management to build vast digital worlds.
          </p>
          <motion.button
            className="select-btn"
            whileTap={{ scale: 0.95 }}
          >
            SELECT PATH
          </motion.button>
        </motion.div>

        <motion.div
          className="tech-card cyber"
          whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)" }}
          transition={{ duration: 0.2 }}
          onClick={() => setCyberPage(true)}
        >
          <h2 className="card-title">CYBER SECURITY</h2>
          <p className="card-description">
            **[PATH: DEFENDER]** Learn network defense, ethical hacking, and vulnerability assessment to secure digital domains.
          </p>
          <motion.button
            className="select-btn"
            whileTap={{ scale: 0.95 }}
          >
            SELECT PATH
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
