import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from './GameContext';

const BackendQuests = () => {
  const navigate = useNavigate();
  const { unlockedDefensive, stars, badges, setUnlockedDefensive, unlockNext } = useGame();
  const [showPopup, setShowPopup] = useState(false);
  const [dedicatedScore, setDedicatedScore] = useState(0);
  const [dedicatedQuestion, setDedicatedQuestion] = useState(0);
  const [popupLevel, setPopupLevel] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'BACKEND DEVELOPMENT QUEST';
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [unlockPhase, setUnlockPhase] = useState(0);
  const [errorPositions, setErrorPositions] = useState([]);
  const [visibleErrors, setVisibleErrors] = useState(0);

  const [navigateTo, setNavigateTo] = useState('');

  const dedicatedQuestions = {
    expert: [
      { q: "What is a database? 🗄️", options: ["A place to store data", "A web page", "A font"], correct: 0 },
      { q: "What is encryption? 🔒", options: ["Hiding data", "Securing data with codes", "Deleting data"], correct: 1 },
      { q: "What is an API? 🔁", options: ["A front-end tool", "Interface for services to communicate", "A database type"], correct: 1 },
      { q: "What is monitoring? 📊", options: ["Watching system metrics", "Styling pages", "Compressing images"], correct: 0 },
      { q: "What is a cache? 🧠", options: ["Temporary storage to speed up responses", "A server", "A CSS property"], correct: 0 },
      { q: "What is access control? 🔑", options: ["Controlling who can access resources", "A UI pattern", "A font"], correct: 0 },
      { q: "What is logging? 📝", options: ["Recording events for debugging and audit", "A design pattern", "A test"], correct: 0 },
      { q: "What is load balancing? ⚖️", options: ["Distributing traffic across servers", "A styling technique", "Database schema"], correct: 0 },
      { q: "What is containerization? 📦", options: ["Packaging apps with dependencies", "A font format", "A CSS layout"], correct: 0 },
      { q: "What is CI/CD? 🚀", options: ["Continuous Integration and Delivery", "A database", "A server"], correct: 0 }
    ],
    advanced: [
      { q: "What is zero trust? 🔒", options: ["Trust everyone", "Never trust, always verify", "Trust once"], correct: 1 },
      { q: "What is observability? 🔍", options: ["Monitoring only", "Collecting traces, metrics and logs", "A database"], correct: 1 },
      { q: "What is threat hunting? 🔎", options: ["Searching for malicious activity", "A frontend task", "A CSS method"], correct: 0 },
      { q: "What is endpoint detection? 💻", options: ["Monitoring endpoints for threats", "A UI test", "An image format"], correct: 0 },
      { q: "What is network segmentation? 🌐", options: ["Dividing networks", "A CSS layout", "A DB"], correct: 0 },
      { q: "What is compliance? 📜", options: ["Following rules and standards", "A JS pattern", "A font"], correct: 0 },
      { q: "What is risk assessment? ⚖️", options: ["Evaluating risks and impacts", "A design step", "A test"], correct: 0 },
      { q: "What is cryptography? 🔐", options: ["Study of codes", "A CSS library", "A DB"], correct: 0 },
      { q: "What is digital forensics? 🔬", options: ["Analyzing digital evidence", "A frontend technique", "A layout"], correct: 0 },
      { q: "What is cloud security? ☁️", options: ["Protecting cloud systems", "A font", "A data type"], correct: 0 }
    ]
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showUnlockAnimation) {
      setVisibleErrors(0);
      const timeout1 = setTimeout(() => setUnlockPhase(1), 1000);
      const timeout2 = setTimeout(() => setUnlockPhase(2), 1500);
      const timeout3 = setTimeout(() => {
        setShowUnlockAnimation(false);
        setNavigateTo('');
        setShowPopup(false);
        setDedicatedScore(0);
        setDedicatedQuestion(0);
        setSelectedAnswer(null);
        navigate(`/web-quest/backend/${navigateTo}/challenge`);
      }, 2000);
      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
      };
    }
  }, [showUnlockAnimation, navigateTo, navigate]);

  useEffect(() => {
    if (unlockPhase === 0 && showUnlockAnimation) {
      const interval = setInterval(() => {
        setVisibleErrors(prev => {
          if (prev < 100) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [unlockPhase, showUnlockAnimation]);


  const isUnlocked = (level) => level === 'beginner' || unlockedDefensive[level];

  const handleQuestClick = (level) => {
    if (isUnlocked(level)) {
      setNavigateTo(level);
      setShowUnlockAnimation(true);
      setUnlockPhase(0);
      setErrorPositions(Array.from({length: 100}, () => ({top: Math.random() * 80 + 10 + '%', left: Math.random() * 80 + 10 + '%'})));
    } else {
      setPopupLevel(level);
      setDedicatedScore(0);
      setDedicatedQuestion(0);
      setShowPopup(true);
    }
  };

  const handleDedicatedAnswer = (index) => {
    setSelectedAnswer(index);
    setDedicatedScore(prev => prev + (index === dedicatedQuestions[popupLevel][dedicatedQuestion].correct ? 1 : 0));
    if (dedicatedQuestion < 9) {
      setTimeout(() => {
        setDedicatedQuestion(dedicatedQuestion + 1);
        setSelectedAnswer(null);
      }, 1000);
    }
  };

  const handleSubmit = () => {
    const correct = selectedAnswer === dedicatedQuestions[popupLevel][dedicatedQuestion].correct;
    const newScore = dedicatedScore + (correct ? 1 : 0);
    if (newScore >= 8) {
      setUnlockedDefensive(prev => ({ ...prev, [popupLevel]: true }));
      unlockNext('defensive', popupLevel);
      setNavigateTo(popupLevel);
      setShowUnlockAnimation(true);
      setUnlockPhase(0);
      setErrorPositions(Array.from({length: 100}, () => ({top: Math.random() * 80 + 10 + '%', left: Math.random() * 80 + 10 + '%'})));
    } else {
      alert("Try again later");
      setShowPopup(false);
      setDedicatedScore(0);
      setDedicatedQuestion(0);
      setSelectedAnswer(null);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setDedicatedScore(0);
    setDedicatedQuestion(0);
    setSelectedAnswer(null);
  };

  return (
    <div style={{
      height: '100vh',
      background: 'url(/sabo-def.png) center / cover no-repeat fixed',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      overflow: 'hidden'
    }}>
      <button
        onClick={() => navigate('/web-game-selection')}
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          background: 'transparent',
          border: '2px solid white',
          color: 'white',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          borderRadius: '5px'
        }}
      >
        Back
      </button>

      <h1 style={{
        position: 'absolute',
        top: '40%',
        right: '2rem',
        transform: 'translateY(-50%)',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '4rem',
        margin: 0
      }}>
        {displayedText}
      </h1>

      <div style={{
        position: 'absolute',
        top: '2rem',
        right: '2rem',
        display: 'flex',
        gap: '1rem'
      }}>
        <div>Stars: {stars} ⭐</div>
        <div>Badges: {badges.length} 🏆</div>
      </div>

      <div style={{
        position: 'absolute',
        top: '60%',
        right: '2rem',
        display: 'flex',
        gap: '2rem'
      }}>
        <div
          style={{
            background: 'rgba(0,0,0,0.7)',
            padding: '1.5rem',
            borderRadius: '10px',
            textAlign: 'center',
            cursor: 'pointer',
            maxWidth: '200px',
            minHeight: '200px',
            opacity: isUnlocked('beginner') ? 1 : 0.5
          }}
          onClick={() => handleQuestClick('beginner')}
        >
          <h2>Beginner</h2>
          <p>Start your backend journey with basic server-side concepts and tools.</p>
        </div>

        <div
          style={{
            background: 'rgba(0,0,0,0.7)',
            padding: '1.5rem',
            borderRadius: '10px',
            textAlign: 'center',
            cursor: 'pointer',
            maxWidth: '200px',
            minHeight: '200px',
            opacity: isUnlocked('expert') ? 1 : 0.5
          }}
          onClick={() => handleQuestClick('expert')}
        >
          <h2>Expert</h2>
          <p>Dive deeper into databases, APIs and server architecture.</p>
        </div>

        <div
          style={{
            background: 'rgba(0,0,0,0.7)',
            padding: '1.5rem',
            borderRadius: '10px',
            textAlign: 'center',
            cursor: 'pointer',
            maxWidth: '200px',
            minHeight: '200px',
            opacity: isUnlocked('advanced') ? 1 : 0.5
          }}
          onClick={() => handleQuestClick('advanced')}
        >
          <h2>Advanced</h2>
          <p>Master cloud-native backend design and scaling strategies.</p>
        </div>
      </div>

      {showPopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.8)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            background: 'black',
            color: 'white',
            padding: '2rem',
            borderRadius: '10px',
            maxWidth: '600px',
            width: '90%',
            position: 'relative'
          }}>
            <button onClick={closePopup} style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'red',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '50%',
              width: '2rem',
              height: '2rem',
              fontSize: '1rem'
            }}>X</button>
            <h1>Dedicated Quiz to Unlock {popupLevel.toUpperCase()}</h1>
            <p>Question {dedicatedQuestion + 1} of 10</p>
            <h2>{dedicatedQuestions[popupLevel][dedicatedQuestion]?.q}</h2>
            {dedicatedQuestions[popupLevel][dedicatedQuestion]?.options.map((opt, i) => (
              <button key={i} onClick={() => handleDedicatedAnswer(i)} disabled={selectedAnswer !== null} style={{
                display: 'block',
                width: '100%',
                padding: '1rem',
                margin: '0.5rem 0',
                background: selectedAnswer === i ? 'blue' : 'gray',
                color: 'white',
                border: 'none',
                cursor: selectedAnswer !== null ? 'not-allowed' : 'pointer',
                borderRadius: '5px'
              }}>
                {opt}
              </button>
            ))}
            {dedicatedQuestion === 9 && selectedAnswer !== null && (
              <button onClick={handleSubmit} style={{
                display: 'block',
                width: '100%',
                padding: '1rem',
                margin: '1rem 0',
                background: 'green',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '5px'
              }}>Submit</button>
            )}
          </div>
        </div>
      )}

      {showUnlockAnimation && (
        <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'black', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {unlockPhase === 0 && errorPositions.slice(0, visibleErrors).map((pos, i) => (
            <div key={i} style={{position: 'absolute', ...pos, color: 'red', fontSize: '1.5rem'}}>error</div>
          ))}
          {unlockPhase === 1 && <div style={{fontSize: '2rem'}}>we are loading</div>}
          {unlockPhase === 2 && <div style={{fontSize: '6rem', color: 'green', fontWeight: 'bold'}}>ACCESS PERMITTED</div>}
        </div>
      )}
    </div>
  );
};

export default BackendQuests;
