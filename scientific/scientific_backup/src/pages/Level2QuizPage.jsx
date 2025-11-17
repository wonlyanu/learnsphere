import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LEVEL2 } from "../data/level2Data";
import "./QuizPage.css";

export default function Level2QuizPage() {
  const { level } = useParams();
  const navigate = useNavigate();
  const lvl = LEVEL2.find((l) => l.id === parseInt(level));

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);

  if (!lvl) return <div>Level not found</div>;

  const handleAnswer = (option) => {
    if (option === lvl.questions[currentQ].answer) setScore(score + 1);
    if (currentQ + 1 < lvl.questions.length) setCurrentQ(currentQ + 1);
    else alert(`Quiz finished! Score: ${score + 1}/${lvl.questions.length}`);
  };

  return (
    <div className="quiz-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h2>{lvl.questions[currentQ].question}</h2>
      <div className="options">
        {lvl.questions[currentQ].options.map((opt, i) => (
          <button key={i} className="option-btn" onClick={() => handleAnswer(opt)}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
