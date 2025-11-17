import React from "react";
import { Link } from "react-router-dom";
import "./MainLanding.css";

export default function MainLanding() {
  return (
    <div className="main-landing">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Title */}
      <h1 className="main-title">LearnSphere AI</h1>

      {/* Two Glowing Cards */}
      <div className="cards-container">
        <Link to="/frontend" className="adventure-card frontend-card">
          <h2>Frontend Adventure</h2>
          <p>Master the art of web design and user interfaces</p>
          <span className="arrow">→</span>
        </Link>

        <Link to="/backend" className="adventure-card backend-card">
          <h2>Backend Adventure</h2>
          <p>Build powerful servers and APIs</p>
          <span className="arrow">→</span>
        </Link>
      </div>
    </div>
  );
}
