import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from './GameContext';

const webContent = {
  frontend: {
    beginner: [
      {
        title: "HTML Fundamentals",
        theory: [
          "HTML (HyperText Markup Language) is the foundation of web content structure. It uses a system of tags to define elements like headings, paragraphs, lists, and links. Each element serves a specific purpose in creating meaningful and accessible web content.",
          "Semantic HTML introduces meaningful tags like header, nav, main, article, and footer. These elements provide clear structural meaning to both browsers and developers, improving accessibility and SEO.",
          "Document metadata and head elements play a vital role in how pages are processed and displayed. Meta tags control character encoding, viewport settings, and SEO-related information."
        ],
        quiz: {
          question: "What is HTML primarily used for?",
          options: ["Structuring web content", "Styling web pages", "Server-side logic"],
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

  const [currentStep, setCurrentStep] = useState(0);
  const [showTheory, setShowTheory] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const currentContent = webContent[type]?.[level]?.[currentStep];

  if (!currentContent) {
    return <div className="quest-page">Content not found</div>;
  }

  const handleAnswer = (selectedIndex) => {
    const isCorrect = selectedIndex === currentContent.quiz.correct;
    
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
        if (currentStep < webContent[type][level].length - 1) {
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
          {currentContent.theory.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
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
        Level {currentStep + 1} / {webContent[type][level].length}
        <div>Score: {score}</div>
      </div>
    </div>
  );
};

export default QuestPageWeb;