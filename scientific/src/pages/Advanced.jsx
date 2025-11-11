// client/src/pages/Advanced.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Beginner.css"; // reuse same CSS

const STORAGE_KEY = "advancedProgress";


const LEVEL_CONTENT = [
  { title: "Microservices Architecture" },
  { title: "Message Queues & Event-Driven Architecture" },
  { title: "GraphQL APIs" },
  { title: "WebSockets & Real-Time Communication" },
  { title: "Advanced Caching Strategies" },
  { title: "DevOps & CI/CD for Backend" },
  { title: "Advanced Security" },
  { title: "Cloud Integration & Serverless" },
  { title: "Monitoring & Logging" },
  { title: "Scalability & Load Balancing" },
];


export default function Advanced() {
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState(0); // initially locked

  useEffect(() => {
    const saved = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
    setUnlocked(Math.max(0, saved));
  }, []);

 const handleClick = (level) => {
  if (level === 1 && unlocked === 0) {
    navigate("/advanced-test"); // ✅ must match App.jsx
  } else if (level <= unlocked) {
    navigate(`/advanced/level/${level}`);
  } else {
    alert("🎯 Quest for Glory");
  }
};



  const buildPath = (count, segH, width, amp) => {
    const cx = width / 2;
    let d = `M ${cx} 20`;
    for (let i = 0; i < count - 1; i++) {
      const y1 = 20 + i * segH;
      const y2 = 20 + (i + 1) * segH;
      const dir = i % 2 === 0 ? -1 : 1;
      const cx1 = cx + dir * amp;
      const cx2 = cx + dir * amp;
      d += ` C ${cx1} ${y1 + segH / 3} ${cx2} ${y2 - segH / 3} ${cx} ${y2}`;
    }
    return d;
  };

  const count = LEVEL_CONTENT.length;
  const segH = 150;
  const svgW = 420;
  const amp = 120;
  const svgH = 40 + segH * (count - 1) + 40;
  const pathD = buildPath(count, segH, svgW, amp);

  return (
    <div className="beginner-page">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div className="overlay" />

      <button className="back-button" onClick={() => navigate("/levels")}>
        ← Back
      </button>

      <h1 className="title">🔮 Legend</h1>

      <div className="roadmap-wrapper" style={{ height: svgH }}>
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="roadmap-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <path d={pathD} className="roadmap-path" />
        </svg>

        {LEVEL_CONTENT.map((item, index) => {
          const level = index + 1;
          const top = 20 + index * segH;
          const side = index % 2 === 0 ? "left" : "right";
          const unlockedFlag = level <= unlocked;

          const leftStyle =
            side === "left"
              ? { left: `calc(50% - ${amp + 200}px)` }
              : { left: `calc(50% + ${amp - 20}px)` };

          return (
            <div
              key={level}
              className={`roadmap-step ${side} ${unlockedFlag ? "unlocked" : "locked"}`}
              style={{ top }}
              onClick={() => handleClick(level)}
            >
              <div className="step-circle">
                <span className="circle-number">{level}</span>
                {!unlockedFlag && <span className="lock-icon">🔒</span>}
              </div>
              <div className="step-text" style={leftStyle}>
                <h3>{`${level}. ${item.title}`}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
