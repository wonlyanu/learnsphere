// client/src/pages/BeginnerTest.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti"; 
import RobotIntro from "../components/RobotIntro"; // 👈 robot intro
import "./AdvancedTest.css"; // trophy CSS reused

const QUESTIONS = [
  { q: "What runs the backend of a website?", a: "Server" },
  { q: "Which language is used in Node.js?", a: "JavaScript" },
  { q: "Where is data stored?", a: "Database" },
  { q: "Which framework is used with Node.js?", a: "Express" },
  { q: "What does API stand for?", a: "Application Programming Interface" },
  { q: "What type of database is MongoDB?", a: "NoSQL" },
  { q: "Which protocol is used for data transfer?", a: "HTTP" },
  { q: "What is used to protect user data?", a: "Encryption" },
  { q: "What checks user identity?", a: "Authentication" },
  { q: "What stores user details?", a: "Database" },
];


export default function BeginnerTest() {
  const [answers, setAnswers] = useState({});
  const [showTrophy, setShowTrophy] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showIntro, setShowIntro] = useState(true); // 👈 robot intro toggle
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const handleSubmit = () => {
    let score = 0;
    QUESTIONS.forEach((q, i) => {
      if (
        answers[i] &&
        answers[i].toLowerCase().includes(q.a.toLowerCase().split(" ")[0])
      ) {
        score++;
      }
    });

    if (score >= 6) {
      setShowTrophy(true);
      setShowConfetti(true);

      localStorage.setItem("beginnerProgress", "1");

      setTimeout(() => {
        setShowTrophy(false);
        setShowConfetti(false);
        alert(`🎉 Test passed! Beginner Level 1 unlocked. (Score: ${score}/10)`);
        navigate("/beginner");
      }, 4000);
    } else {
      alert(`❌ You need at least 6 correct. (Score: ${score}/10)`);
    }
  };

  // Show robot first
  if (showIntro) {
    return <RobotIntro onFinish={() => setShowIntro(false)} />;
    
  }

  return (
    <div className="advanced-test">
      {/* 🔙 Back button (goes to beginner page) */}
      <button className="back-button" onClick={() => navigate("/beginner")}>
        ← Back
      </button>

      <h1>⚡ Spark the Journey</h1>
      <i>
        <p>🧩 Puzzle of Progress</p>
      </i>

      <ol>
        {QUESTIONS.map((q, i) => (
          <li key={i}>
            <p>{q.q}</p>
            <input
              type="text"
              placeholder="Type your answer..."
              value={answers[i] || ""}
              onChange={(e) => handleChange(i, e.target.value)}
            />
          </li>
        ))}
      </ol>

      <button className="test-submit" onClick={handleSubmit}>
        🏆 Claim Glory
      </button>

      {/* 🎉 Confetti */}
      {showConfetti && <Confetti numberOfPieces={300} gravity={0.2} />}

      {/* 🏆 Trophy */}
      {showTrophy && (
        <div className="trophy-overlay">
          <div className="trophy">🏆</div>
        </div>
      )}
    </div>
  );
}
