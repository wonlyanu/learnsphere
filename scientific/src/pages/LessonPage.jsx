// src/pages/LessonPage.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BEGINNER_LEVELS } from "../data/beginnerLevels";
import { INTERMEDIATE_LEVELS } from "../data/intermediateLevels";
import { ADVANCED_LEVELS } from "../data/advancedLevels";
import "./LessonPage.css";

function LessonSection({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lesson-section">
      <button className="section-title" onClick={() => setOpen(!open)}>
        {title} {open ? "▲" : "▼"}
      </button>
      {open && <div className="section-content">{children}</div>}
    </div>
  );
}

export default function LessonPage() {
  const { level, type } = useParams(); // type: beginner / intermediate / advanced
  const navigate = useNavigate();

  // Select correct level array based on type
  let lvl;
  if (type === "beginner") lvl = BEGINNER_LEVELS.find(l => l.id === parseInt(level, 10));
  else if (type === "intermediate") lvl = INTERMEDIATE_LEVELS.find(l => l.id === parseInt(level, 10));
  else if (type === "advanced") lvl = ADVANCED_LEVELS.find(l => l.id === parseInt(level, 10));

  if (!lvl) return <div className="not-found">Level not found</div>;

  const STORAGE_KEY = `${type}Progress`;

  const markAsRead = () => {
    const saved = parseInt(localStorage.getItem(STORAGE_KEY) || "1", 10);
    if (parseInt(level, 10) >= saved) {
      localStorage.setItem(STORAGE_KEY, level);
    }
    navigate(`/${type}/level/${level}/quiz`);
  };

  const renderContent = (text) =>
    text.split("\n").map((line, i) => <p key={i}>{line}</p>);

  return (
    <>
      <video autoPlay loop muted className="lesson-background">
        <source src="/videos/lesson-bg.mp4" type="video/mp4" />
      </video>

      <div className="lesson-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h2 className="lesson-title">{lvl.title}</h2>

        {lvl.sections.map((sec, idx) => (
          <LessonSection key={idx} title={sec.title}>
            {renderContent(sec.content)}
          </LessonSection>
        ))}

        {lvl.codeExample && (
          <LessonSection title="Code Example">
            <pre>
              <code>{lvl.codeExample}</code>
            </pre>
          </LessonSection>
        )}

        <button className="complete-btn" onClick={markAsRead}>
          Quest Complete 🎯
        </button>
      </div>
    </>
  );
}
