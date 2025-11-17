import React, { useState } from "react";

export default function QuizCard({ questions, onComplete }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (choice) => {
    if (choice === questions[current].answer) setScore(score + 1);
    if (current + 1 < questions.length) setCurrent(current + 1);
    else {
      const percent = (score + (choice === questions[current].answer ? 1 : 0)) / questions.length * 100;
      if (percent >= 60) onComplete();
      else alert("Score below 60%! Try again.");
    }
  };

  return (
    <div className="quiz-card">
      <h3>Question {current + 1}</h3>
      <p>{questions[current].question}</p>
      {questions[current].options.map((opt) => (
        <button key={opt} onClick={() => handleAnswer(opt)}>{opt}</button>
      ))}
    </div>
  );
}
