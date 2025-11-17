import React from "react";
import { motion } from "framer-motion";
import "./About.css";

// Removed: import Navbar from "../components/Navbar";
// Removed: import Footer from "../components/Footer";
// Removed: import "./Home.css";


export default function About() {
  // Removed: goBack prop
  return (
    <div className="about-page">
      {/* Background Video */}
      <video className="bg-video" autoPlay loop muted playsInline>
        <source src="/videos/respage.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Removed Back Button component entirely */}

      {/* Content */}
      <motion.div
        className="about-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="main-title">
          <span className="text-gray-900">LEARNSPHERE AI:</span> QUEST LOG
        </h1>
        
        <p className="intro-text">
          <span role="img" aria-label="adventure">⚔️</span> Welcome, Adventurer! You've discovered the base camp of LearnSphere AI, the digital forge where Novices become Masters. This isn't just learning; it's a **role-playing game** for your skills.
        </p>

        <div className="quest-section">
            <h2 className="section-title">I. The Mastery System (XP & Levels)</h2>
            <p>
                Every lesson completed, every code challenge solved, and every concept mastered earns you **Experience Points (XP)**. Level up to unlock new advanced domains, ascend mentorship tiers, and earn exclusive, permanent **Badges** for your profile. Progress is persistent.
            </p>
        </div>

        <div className="quest-section">
            <h2 className="section-title">II. Your Co-Pilot, ARC</h2>
            <p>
                **ARC** is your dedicated AI mentor—your digital Sage. It constantly monitors your progress and adapts the curriculum to fit your unique style. ARC provides instant, line-by-line debug support and crafts personalized learning paths so your quest is always challenging, yet never overwhelming.
            </p>
        </div>

        <div className="quest-section">
            <h2 className="section-title">III. Our Ultimate Mission</h2>
            <p>
                Our mission is simple: to transform tedious study hours into rewarding playtime. We don't just teach skills in Cybersecurity and Web Development; we forge legends. **Start your campaign today and write your own story of mastery.**
            </p>
        </div>
        
      </motion.div>
    </div>
  );
}
