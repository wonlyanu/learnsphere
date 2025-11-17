import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from './GameContext';

const FrontendQuests = () => {
  const navigate = useNavigate();
  const { unlockedOffensive, stars, badges, setUnlockedOffensive, unlockNext } = useGame();
  const [showPopup, setShowPopup] = useState(false);
  const [dedicatedScore, setDedicatedScore] = useState(0);
  const [dedicatedQuestion, setDedicatedQuestion] = useState(0);
  const [popupLevel, setPopupLevel] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'FRONTEND DEVELOPMENT QUEST';
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [unlockPhase, setUnlockPhase] = useState(0);
  const [errorPositions, setErrorPositions] = useState([]);
  const [visibleErrors, setVisibleErrors] = useState(0);
  const [loadingText, setLoadingText] = useState('loading');
  const [navigateTo, setNavigateTo] = useState('');

  const quests = [
    {
      title: 'BEGINNER',
      description: 'Learn basic HTML/CSS/JS concepts essential for frontend development.',
      route: '/web-quest/frontend/beginner'
    },
    {
      title: 'EXPERT',
      description: 'Dive deeper into frameworks, state management and performance.',
      route: '/web-quest/frontend/expert'
    },
    {
      title: 'ADVANCED',
      description: 'Master complex frontend architectures and optimization.',
      route: '/web-quest/frontend/advanced'
    }
  ];

  const dedicatedQuestions = {
    beginner: [
      { q: "What is an HTML element? 🌐", options: ["A type of file", "A building block of a webpage", "A password"], correct: 1 },
      { q: "What does CSS stand for? 🎨", options: ["Cascading Style Sheets", "Computer Style System", "Colorful Styling Service"], correct: 0 },
      { q: "What does JS do? ⚙️", options: ["Styles pages", "Adds interactivity", "Stores data"], correct: 1 },
      { q: "What is responsive design? 📱", options: ["Design for mobile only", "Design that adapts to screen sizes", "A design tool"], correct: 1 },
      { q: "What is the DOM? 🌳", options: ["Document Object Model", "A styling library", "A build tool"], correct: 0 },
      { q: "What is accessibility? ♿", options: ["Making UI pretty", "Making sites usable by all users", "Testing only"], correct: 1 },
      { q: "What is SEO? 🔎", options: ["Search Engine Optimization", "A debugging tool", "A CSS framework"], correct: 0 },
      { q: "What is a CSS selector? 🧭", options: ["Selects HTML elements to style", "Chooses a color", "Loads fonts"], correct: 0 },
      { q: "What is a web font? 🔤", options: ["A font for web use", "A type of image", "A CSS property"], correct: 0 },
      { q: "What is progressive enhancement? 🚀", options: ["Adding features progressively", "A testing strategy", "A deployment method"], correct: 0 }
    ],
    expert: [
      { q: "What is a component? 🧩", options: ["A UI building block", "A backend server", "A database"], correct: 0 },
      { q: "What is state management? 🔄", options: ["Styling technique", "Managing UI data and state", "Deploy process"], correct: 1 },
      { q: "What is hydration? 💧", options: ["Making static markup interactive", "Refreshing the page", "A CSS trick"], correct: 0 },
      { q: "What is SSR? 🖥️", options: ["Server-Side Rendering", "Static Styling Resource", "Single Script Runtime"], correct: 0 },
      { q: "What is a virtual DOM? 🧠", options: ["A real browser DOM", "An in-memory DOM representation", "A CSS model"], correct: 1 },
      { q: "What is bundling? 📦", options: ["Packaging assets for production", "A testing approach", "A layout technique"], correct: 0 },
      { q: "What is tree-shaking? 🌲", options: ["Removing unused code", "A CSS method", "A deploy strategy"], correct: 0 },
      { q: "What is lazy loading? 💤", options: ["Loading resources when needed", "Loading everything at once", "A font format"], correct: 0 },
      { q: "What is accessibility testing? ✅", options: ["Ensuring usability for all", "Only performance testing", "Only SEO testing"], correct: 0 },
      { q: "What is performance budgeting? ⏱️", options: ["Allocating time for tasks", "Setting limits for resource sizes", "A design pattern"], correct: 1 }
    ],
    advanced: [
      { q: "What is web assembly? 🧩", options: ["A binary instruction format", "A CSS framework", "A font format"], correct: 0 },
      { q: "What is progressive web app? 📲", options: ["An app-like web experience", "A testing tool", "A design system"], correct: 0 },
      { q: "What is service worker? 🧠", options: ["A script that runs in background", "A server process", "A CSS rule"], correct: 0 },
      { q: "What is critical rendering path? 🔧", options: ["Steps browser takes to render", "A CSS method", "A DB query"], correct: 0 },
      { q: "What is accessibility auditing? 🔍", options: ["Reviewing accessibility issues", "A styling audit", "A security test"], correct: 0 },
      { q: "What is micro-frontend? 🔬", options: ["Breaking frontend into smaller apps", "A JS library", "A database"], correct: 0 },
      { q: "What is design systems? 🎨", options: ["Reusable UI components and guidelines", "CI tool", "Build tool"], correct: 0 },
      { q: "What is edge rendering? 🌐", options: ["Rendering closer to users", "Client-only rendering", "A CSS trick"], correct: 0 },
      { q: "What is monorepo? 📁", options: ["Single repo for multiple projects", "A deployment system", "A font"], correct: 0 },
      { q: "What is observability? 🔭", options: ["Understanding runtime behavior", "A testing tool", "A deploy step"], correct: 0 }
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
      setLoadingText('loading');
      const timeout1 = setTimeout(() => setUnlockPhase(1), 1000);
      const timeout2 = setTimeout(() => setUnlockPhase(2), 1500);
      const timeout3 = setTimeout(() => {
        setShowUnlockAnimation(false);
        setNavigateTo('');
        setShowPopup(false);
        setDedicatedScore(0);
        setDedicatedQuestion(0);
        setSelectedAnswer(null);
        navigate(`/web-quest/frontend/${navigateTo}/challenge`);
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

  const isUnlocked = (level) => unlockedOffensive[level];

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
      setUnlockedOffensive(prev => ({ ...prev, [popupLevel]: true }));
      unlockNext('offensive', popupLevel);
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
      background: 'url(/ace-off.png) center / cover no-repeat fixed',
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
        left: '2rem',
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
        left: '2rem',
        display: 'flex',
        gap: '2rem'
      }}>
        {quests.map((quest, index) => (
          <div
            key={index}
            style={{
              background: 'rgba(0,0,0,0.7)',
              padding: '1.5rem',
              borderRadius: '10px',
              textAlign: 'center',
              cursor: 'pointer',
              maxWidth: '200px',
              minHeight: '200px',
              opacity: isUnlocked(quest.route.split('/').slice(-1)[0]) ? 1 : 0.5
            }}
            onClick={() => handleQuestClick(quest.route.split('/').slice(-1)[0])}
          >
            <h2>{quest.title}</h2>
            <p>{quest.description}</p>
          </div>
        ))}
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
          {unlockPhase === 1 && <div style={{fontSize: '2rem'}}>{loadingText}</div>}
          {unlockPhase === 2 && <div style={{fontSize: '6rem', color: 'green', fontWeight: 'bold'}}>ACCESS PERMITTED</div>}
        </div>
      )}
    </div>
  );
};

export default FrontendQuests;
