import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaStar, FaCloud, FaBolt } from "react-icons/fa"; // ✅ icons
import "./Levels.css";

export default function Levels() {
  const navigate = useNavigate();
  const location = useLocation();
  const isFrontend = location.pathname === "/frontend-levels";

  return (
    <div className="levels-page">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="overlay" />

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(isFrontend ? "/frontend" : "/backend")}>
        ← Back
      </button>

      {/* Linear Style Cards */}
      <div className="cards-container">
        <div
          className="linear-card purple"
          onClick={() => navigate("/beginner")}
        >
          <div className="icon">
            <FaStar />
          </div>
          <h2>🗡️ Rookie</h2>
          <i><p>Start from the basics</p></i>
        </div>

        <div
          className="linear-card blue"
          onClick={() => navigate("/intermediate")}
        >
          <div className="icon">
            <FaCloud />
          </div>
          <h2>🛡️ Warrior</h2>
          <i><p>Level up your skills</p></i>
        </div>

        <div
          className="linear-card green"
          onClick={() => navigate("/advanced")}
        >
          <div className="icon">
            <FaBolt />
          </div>
          <h2>🔮 Legend</h2>
         <i><p>Master development</p></i>
        </div>
      </div>
    </div>
  );
}
