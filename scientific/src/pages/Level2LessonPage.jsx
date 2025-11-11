import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LEVEL2 } from "../data/level2Data.jsx";

import "./LessonPage.css";

const STORAGE_KEY = "level2Progress";

// Reusable Accordion Component
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

export default function Level2LessonPage() {
  const { level } = useParams();
  const navigate = useNavigate();

  // Find the lesson in LEVEL2 data
  const lvl = LEVEL2.find((l) => l.id === parseInt(level));

  if (!lvl) return <div className="not-found">Level not found</div>;

  const markAsRead = () => {
    const saved = parseInt(localStorage.getItem(STORAGE_KEY) || "1", 10);
    if (parseInt(level, 10) >= saved) {
      localStorage.setItem(STORAGE_KEY, level);
    }
    navigate(`/level2/${level}/quiz`);
  };

  return (
    <>
      {/* Background video */}
      <video autoPlay loop muted className="lesson-background">
        <source src="/videos/lesson-bg.mp4" type="video/mp4" />
      </video>

      <div className="lesson-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h2 className="lesson-title">{`Lesson: ${lvl.title}`}</h2>

        {/* Lesson Content */}
        <LessonSection title="Lesson Content">
          <pre>{lvl.lessonText}</pre>
        </LessonSection>

        {/* Code Example, if exists */}
        {lvl.codeExample && (
          <LessonSection title="Code Example">
            <pre>{lvl.codeExample}</pre>
          </LessonSection>
        )}

        {/* Mark as Complete */}
        <button className="complete-btn" onClick={markAsRead}>
          ✅ Mark as Complete & Go to Quiz
        </button>
      </div>
    </>
  );
}
