import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function FrontendHomePage() {
  const words = [
    "🌐 HTML Hero",
    "🎨 CSS Sorcerer",
    "⚛️ React Wizard",
    "📱 Responsive Master",
    "🎯 JavaScript Ninja",
    "🔥 Animation Artist",
    "🎪 UI/UX Magician",
    "🚀 Performance Guru",
  ];

  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  // Rotate words every 3 seconds
  useEffect(() => {
    const wordChange = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(wordChange);
  }, []);

  // Typing animation
  useEffect(() => {
    setDisplayedText(""); // reset
    const word = words[index];
    let i = 0;
    const typing = setInterval(() => {
      setDisplayedText(word.slice(0, i + 1));
      i++;
      if (i === word.length) clearInterval(typing);
    }, 100);
    return () => clearInterval(typing);
  }, [index]);

  return (
    <div className="home-app">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Center Gamified Card */}
      <Link to="/frontend-levels" className="center-card">
        <h1>Frontend Adventure</h1>
        <i>
          <p className="swap-word">{displayedText}</p>
        </i>
        <p className="click-start">Click to start your quest →</p>
      </Link>
    </div>
  );
}
