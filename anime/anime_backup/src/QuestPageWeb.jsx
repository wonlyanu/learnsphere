import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from './GameContext';

// Sample content - move to separate file later
const webContent = {
  frontend: {
    beginner: [
      {
        title: "HTML Fundamentals",
        theory: "HTML (HyperText Markup Language) is the foundation of web content structure. It uses tags to define elements and their relationships.",
        quiz: {
          question: "What is HTML used for?",
          options: ["Structure content", "Style pages", "Server logic"],
          correct: 0
        }
      },
      {
        title: "CSS Basics",
        theory: "CSS controls the visual presentation and layout of web pages. It uses selectors to target elements and properties to define their appearance.",
        quiz: {
          question: "What is CSS used for?",
          options: ["Style web pages", "Handle data", "Run servers"],
          correct: 0
        }
      }
    ]
  }
};

const QuestPageWeb = () => {
  const { type, level } = useParams();
  const navigate = useNavigate();
  const { updateScore, addStars, addBadge, updateStreak, unlockNext } = useGame();

  const [showTheory, setShowTheory] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const content = webContent[type]?.[level];
  const currentContent = content?.[currentStep];

  if (!currentContent) {
    return (
      <div className="quest-page">
        <h1>Content not found</h1>
        <button onClick={() => navigate('/challenges')}>Back to Challenges</button>
      </div>
    );
  }

  const handleAnswer = (optionIndex) => {
    const isCorrect = optionIndex === currentContent.quiz.correct;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      updateScore(type, level, 10);
      addStars(1);
      updateStreak();
    }

    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      if (isCorrect) {
        if (currentStep < content.length - 1) {
          setCurrentStep(prev => prev + 1);
          setShowTheory(true);
        } else {
          addBadge(type, level);
          unlockNext(type, level);
          navigate('/challenges');
        }
      }
    }, 1500);
  };

  return (
    <div className="quest-page">
      <h1>{currentContent.title}</h1>
      
      {showTheory ? (
        <div className="theory-section">
          <p>{currentContent.theory}</p>
          <button onClick={() => setShowTheory(false)}>
            Take Quiz
          </button>
        </div>
      ) : (
        <div className="quiz-section">
          <h3>{currentContent.quiz.question}</h3>
          <div className="options">
            {currentContent.quiz.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
                className={showFeedback 
                  ? index === currentContent.quiz.correct 
                    ? 'correct' 
                    : 'incorrect'
                  : ''}
              >
                {option}
              </button>
            ))}
          </div>
          
          {showFeedback && (
            <div className="feedback">
              {score > 0 ? "Correct! Well done!" : "Incorrect. Try again!"}
            </div>
          )}
        </div>
      )}

      <div className="progress">
        Step {currentStep + 1} / {content.length}
        <div>Score: {score}</div>
      </div>

      <button 
        className="back-button"
        onClick={() => navigate('/challenges')}
      >
        Back to Challenges
      </button>
    </div>
  );
};

export default QuestPageWeb;