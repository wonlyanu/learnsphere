import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from './GameContext';

const DefensiveQuests = () => {
  const navigate = useNavigate();
  const { unlockedDefensive, stars, badges, setUnlockedDefensive, unlockNext } = useGame();
  const [showPopup, setShowPopup] = useState(false);
  const [dedicatedScore, setDedicatedScore] = useState(0);
  const [dedicatedQuestion, setDedicatedQuestion] = useState(0);
  const [popupLevel, setPopupLevel] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'DEFENSIVE SECURITY QUEST';
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [unlockPhase, setUnlockPhase] = useState(0);
  const [errorPositions, setErrorPositions] = useState([]);
  const [visibleErrors, setVisibleErrors] = useState(0);

  const [navigateTo, setNavigateTo] = useState('');

  const dedicatedQuestions = {
    expert: [
      { q: "What is a firewall? 🔥", options: ["A wall of fire", "A security barrier", "A type of network"], correct: 1 },
      { q: "What is encryption? 🔒", options: ["Hiding data", "Securing data with codes", "Deleting data"], correct: 1 },
      { q: "What is antivirus software? 🛡️", options: ["Good software", "Protects against malware", "A type of hardware"], correct: 1 },
      { q: "What is intrusion detection? 🚨", options: ["Detecting intruders", "Monitoring network traffic", "Both"], correct: 2 },
      { q: "What is a honeypot? 🍯", options: ["A sweet trap", "Decoy system to attract attackers", "A type of bee"], correct: 1 },
      { q: "What is access control? 🔑", options: ["Controlling access", "Restricts who can access resources", "A type of lock"], correct: 1 },
      { q: "What is a security audit? 📋", options: ["A review of security measures", "Checking finances", "A type of test"], correct: 0 },
      { q: "What is patch management? 🔧", options: ["Managing patches", "Applying software updates to fix vulnerabilities", "Fixing clothes"], correct: 1 },
      { q: "What is data backup? 💾", options: ["Copying data", "Creating copies of data for recovery", "Deleting data"], correct: 1 },
      { q: "What is incident response? 🚑", options: ["Responding to incidents", "Handling security breaches and incidents", "A type of alarm"], correct: 1 }
    ],
    advanced: [
      { q: "What is zero trust? 🔒", options: ["Trust everyone", "Never trust, always verify", "Trust once"], correct: 1 },
      { q: "What is SIEM? 📊", options: ["Security Information and Event Management", "A type of software", "System for managing events"], correct: 0 },
      { q: "What is threat hunting? 🔍", options: ["Hunting animals", "Proactively searching for threats", "A game"], correct: 1 },
      { q: "What is endpoint detection? 💻", options: ["Detecting endpoints", "Monitoring and responding to threats on endpoints", "A type of detection"], correct: 1 },
      { q: "What is network segmentation? 🌐", options: ["Dividing network", "Splitting network into segments to limit breaches", "Connecting networks"], correct: 1 },
      { q: "What is compliance? 📜", options: ["Following rules", "Adhering to legal and regulatory standards", "A type of agreement"], correct: 1 },
      { q: "What is risk assessment? ⚖️", options: ["Assessing risks", "Evaluating potential risks and impacts", "A type of balance"], correct: 1 },
      { q: "What is cryptography? 🔐", options: ["Study of codes", "Science of secure communication", "A type of math"], correct: 1 },
      { q: "What is digital forensics? 🔬", options: ["Forensic science", "Investigating and analyzing digital evidence", "A type of lab"], correct: 1 },
      { q: "What is cloud security? ☁️", options: ["Securing clouds", "Protecting data and applications in cloud environments", "Weather security"], correct: 1 }
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
    }, 100); // Adjust speed as needed
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
        navigate(`/quest/defensive/${navigateTo}/challenge`);
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
      {/* Back Button */}
      <button
        onClick={() => navigate('/game-selection')}
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

      {/* Title */}
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

      {/* Stars and Badges */}
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

      {/* Quest Islands */}
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '2rem',
        display: 'flex',
        gap: '2rem'
      }}>
        {/* Beginner Island */}
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
          <p>Start your defensive security journey with basic concepts and tools.</p>
        </div>

        {/* Expert Island */}
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
          <p>Dive deeper into advanced defensive techniques.</p>
        </div>

        {/* Advanced Island */}
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
          <p>Master complex defense strategies.</p>
        </div>
      </div>

      {/* Popup */}
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

      {/* Full Screen Animation */}
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

export default DefensiveQuests;
