import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

export default function BackendHomePage() {
  const words = [
    "🗄️ Data Master",
    "⚡ API Architect",
    "🛠️ Server Engineer",
    "🔒 Security Sentinel",
    "🐍 Python Pro",
    "☕ Java Guru",
    "🧩 Microservice Magician",
    "📦 Database Ninja",
  ];

  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const navigate = useNavigate();
  
  // 🔊 Background audio only on this page
  useEffect(() => {
    const audio = new Audio("/1.mp3");
    audio.loop = true;
    audio.muted = true;     // allow autoplay
    audio.play();

    setTimeout(() => {
      audio.muted = false;  // unmute after autoplay begins
    }, 300);

    return () => {
      audio.pause();        // stop audio when leaving page
      audio.currentTime = 0;
    };
  }, []);

  // Rotate words every 3 seconds
  useEffect(() => {
    const wordChange = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(wordChange);
  }, []);

  // Typing animation
  useEffect(() => {
    setDisplayedText("");
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

      {/* 🔙 Back Button */}
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back
      </button>

      {/* Center Gamified Card */}
      <Link to="/backend-levels" className="center-card">
        <h1>Backend Adventure</h1>
        <i>
          <p className="swap-word">{displayedText}</p>
        </i>
        <p className="click-start">Click to start your quest →</p>
      </Link>
    </div>
  );
}
