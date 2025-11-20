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
      <h5 className="main-title">Welcome - Choose a Path</h5>

      {/* Two Glowing Cards */}
      <div className="cards-container">
        {/* 🌐 Frontend Adventure Card */}
        <Link to="/frontend" className="adventure-card frontend-card">
          <div className="card-bg frontend-bg"></div>
          <div className="card-content">
            <h2>Frontend Adventure</h2>
            <p>Master the art of web design and user interfaces</p>
            <span className="arrow">→</span>
          </div>
        </Link>

        {/* ⚙️ Backend Adventure Card */}
        <Link to="/backend" className="adventure-card backend-card">
          <div className="card-bg backend-bg"></div>
          <div className="card-content">
            <h2>Backend Adventure</h2>
            <p>Build powerful servers and APIs</p>
            <span className="arrow">→</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
