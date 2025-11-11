import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BEGINNER_LEVELS } from "../data/beginnerLevels";
import { INTERMEDIATE_LEVELS } from "../data/intermediateLevels";
import { ADVANCED_LEVELS } from "../data/advancedLevels";
import Confetti from "react-confetti";
import "./QuizPage.css";

export default function QuizPage() {
  const { type, level } = useParams(); // get type: beginner/intermediate/advanced
  const navigate = useNavigate();

  // Select correct dataset based on type
  let levels;
  if (type === "beginner") levels = BEGINNER_LEVELS;
  else if (type === "intermediate") levels = INTERMEDIATE_LEVELS;
  else if (type === "advanced") levels = ADVANCED_LEVELS;

  const lvl = levels.find((l) => l.id === parseInt(level, 10));
  const STORAGE_KEY = `${type}Progress`;

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showTrophy, setShowTrophy] = useState(false);

  if (!lvl) return <div>Level not found</div>;

  const handleAnswer = (option) => {
    const correct = option === lvl.questions[currentQ].answer;
    if (correct) setScore((prev) => prev + 1);

    if (currentQ + 1 < lvl.questions.length) {
      setCurrentQ((prev) => prev + 1);
    } else {
      const finalScore = score + (correct ? 1 : 0);
      const percent = (finalScore / lvl.questions.length) * 100;
      setScore(finalScore);
      setFinished(true);

      if (percent >= 60) {
        // Unlock next level
        const saved = parseInt(localStorage.getItem(STORAGE_KEY) || "1", 10);
        if (parseInt(level) + 1 > saved) {
          localStorage.setItem(STORAGE_KEY, parseInt(level) + 1);
        }

        // Show confetti and trophy for 4 seconds
        setShowConfetti(true);
        setShowTrophy(true);
        setTimeout(() => {
          setShowConfetti(false);
          setShowTrophy(false);
        }, 4000);
      }
    }
  };

  // Final Result Screen
  if (finished) {
    const percent = (score / lvl.questions.length) * 100;
    return (
      <div className="quiz-container">
        <h2>Task Conquered ⚔️</h2>
        <p>
          Your Score: {score}/{lvl.questions.length} ({percent.toFixed(1)}%)
        </p>
        {percent >= 60 ? (
          <p className="success">⚡ Power-Up Earned!</p>
        ) : (
          <p className="retry">⚠️ Challenge failed—give it another shot!</p>
        )}
        <div className="quiz-actions">
          <button
            className="back-btn"
            onClick={() => navigate(`/${type}`)}
          >
            Back to Levels
          </button>
          {percent < 60 && (
            <button
              className="retry-btn"
              onClick={() => {
                setCurrentQ(0);
                setScore(0);
                setFinished(false);
              }}
            >
              🔄 Battle Again
            </button>
          )}
        </div>

        {/* Confetti */}
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={400}
            gravity={0.2}
          />
        )}

        {/* Trophy Overlay */}
        {showTrophy && (
          <div className="trophy-overlay">
            <div className="trophy">🏆</div>
          </div>
        )}
      </div>
    );
  }

  // Active Question Screen
  const q = lvl.questions[currentQ];
  const progress = ((currentQ + 1) / lvl.questions.length) * 100;

  return (
    <div className="quiz-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }} />
      </div>

      <h2>{`Question ${currentQ + 1}: ${q.question}`}</h2>
      <div className="options">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            className="option-btn"
            onClick={() => handleAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
