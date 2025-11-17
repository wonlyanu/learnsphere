import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from './GameContext';

const OffensiveQuests = () => {
  const navigate = useNavigate();
  const { unlockedOffensive, stars, badges, setUnlockedOffensive, unlockNext } = useGame();
  const [showPopup, setShowPopup] = useState(false);
  const [dedicatedScore, setDedicatedScore] = useState(0);
  const [dedicatedQuestion, setDedicatedQuestion] = useState(0);
  const [popupLevel, setPopupLevel] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'OFFENSIVE SECURITY QUEST';
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [unlockPhase, setUnlockPhase] = useState(0);
  const [errorPositions, setErrorPositions] = useState([]);
  const [visibleErrors, setVisibleErrors] = useState(0);
  const [loadingText, setLoadingText] = useState('loading');
  const [navigateTo, setNavigateTo] = useState('');

  const quests = [
    {
      title: 'BEGINNER',
      description: 'Learn basic networking concepts essential for offensive security.',
      route: '/quest/offensive/beginner'
    },
    {
      title: 'EXPERT',
      description: 'Dive deeper into advanced penetration testing techniques.',
      route: '/quest/offensive/expert'
    },
    {
      title: 'ADVANCED',
      description: 'Master complex attacks and defense strategies.',
      route: '/quest/offensive/advanced'
    }
  ];

  const dedicatedQuestions = {
    beginner: [
      { q: "What is an IP address? 🌐", options: ["A type of computer", "A unique identifier for devices on a network", "A password"], correct: 1 },
      { q: "What does TCP stand for? 📡", options: ["Transmission Control Protocol", "Total Computer Power", "Tech Control Panel"], correct: 0 },
      { q: "What is a subnet mask used for? 🛡️", options: ["Hiding data", "Dividing a network into subnetworks", "Encrypting messages"], correct: 1 },
      { q: "What is port scanning? 🔍", options: ["Scanning for open ports on a network", "Checking computer temperature", "Monitoring internet speed"], correct: 0 },
      { q: "What is a firewall? 🔥", options: ["A physical barrier", "A network security system", "A type of virus"], correct: 1 },
      { q: "What is ARP? 📋", options: ["Address Resolution Protocol", "Advanced Routing Protocol", "Automatic Repair Program"], correct: 0 },
      { q: "What is a MAC address? 🏷️", options: ["Media Access Control address", "Main Access Code", "Machine Address Code"], correct: 0 },
      { q: "What is DNS? 🌍", options: ["Domain Name System", "Data Network Service", "Digital Network Security"], correct: 0 },
      { q: "What is a VPN? 🔒", options: ["Virtual Private Network", "Very Private Node", "Visual Programming Network"], correct: 0 },
      { q: "What is packet sniffing? 👃", options: ["Smelling packets", "Capturing and analyzing network packets", "Sending packets"], correct: 1 }
    ],
    expert: [
      { q: "What is a zero-day exploit? 🕵️", options: ["An old exploit", "A new unknown vulnerability", "A patched exploit"], correct: 1 },
      { q: "What is phishing? 🎣", options: ["Fishing", "Tricking users into revealing info", "A game"], correct: 1 },
      { q: "What is SQL injection? 💉", options: ["A database query", "Injecting malicious SQL code", "A type of injection"], correct: 1 },
      { q: "What is a vulnerability scanner? 🔍", options: ["Scanning for weaknesses", "A tool to find exploits", "A type of scanner"], correct: 0 },
      { q: "What is a trojan horse? 🐴", options: ["A horse", "Malware disguised as legitimate software", "A type of virus"], correct: 1 },
      { q: "What is brute force attack? 🔨", options: ["Guessing passwords", "Trying all possible combinations", "A physical attack"], correct: 1 },
      { q: "What is a DDoS attack? 🌊", options: ["A dance", "Overwhelming a server with traffic", "A type of coffee"], correct: 1 },
      { q: "What is pretexting? 🎭", options: ["Building software", "Creating a false scenario to gain info", "Designing networks"], correct: 1 },
      { q: "What is a buffer overflow? 💥", options: ["Data overflow", "Writing more data than buffer can hold", "Network issue"], correct: 1 },
      { q: "What is penetration testing? 🛡️", options: ["Testing pens", "Ethical hacking to find vulnerabilities", "Writing code"], correct: 1 }
    ],
    advanced: [
      { q: "What is spear phishing? 🎯", options: ["General phishing", "Targeted phishing attacks", "A type of spear"], correct: 1 },
      { q: "What is advanced persistent threat? 🕵️‍♂️", options: ["A threat that persists", "Long-term stealthy attacks", "A type of virus"], correct: 1 },
      { q: "What is a rootkit? 🌱", options: ["A gardening tool", "Hides malicious processes", "A type of root"], correct: 1 },
      { q: "What is man-in-the-middle attack? 👤", options: ["A physical attack", "Intercepting and altering communication", "A type of game"], correct: 1 },
      { q: "What is privilege escalation? ⬆️", options: ["Increasing access rights", "Lowering privileges", "A type of promotion"], correct: 0 },
      { q: "What is a botnet? 🤖", options: ["A network of robots", "Network of compromised devices", "A type of net"], correct: 1 },
      { q: "What is steganography? 🖼️", options: ["Hiding data in images", "Encrypting data", "Deleting data"], correct: 0 },
      { q: "What is a zero-knowledge proof? 🤐", options: ["Knowing nothing", "Proving without revealing info", "A math problem"], correct: 1 },
      { q: "What is a side-channel attack? 📡", options: ["Attacking from the side", "Exploiting timing or power usage", "A type of channel"], correct: 1 },
      { q: "What is quantum computing threat? ⚛️", options: ["Breaking current encryption", "A new computer", "A type of quantum"], correct: 0 }
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
        navigate(`/quest/offensive/${navigateTo}/challenge`);
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

  useEffect(() => {
    if (unlockPhase === 1 && showUnlockAnimation) {
      const interval = setInterval(() => {
        setLoadingText(prev => {
          if (prev === 'loading') return 'loading.';
          if (prev === 'loading.') return 'loading..';
          if (prev === 'loading..') return 'loading...';
          if (prev === 'loading...') return 'loading';
          return prev;
        });
      }, 200);
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
        left: '2rem',
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

      {/* Quest Cards */}
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
              opacity: isUnlocked(quest.route.split('/').pop()) ? 1 : 0.5
            }}
            onClick={() => handleQuestClick(quest.route.split('/').pop())}
          >
            <h2>{quest.title}</h2>
            <p>{quest.description}</p>
          </div>
        ))}
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
          {unlockPhase === 1 && <div style={{fontSize: '2rem'}}>{loadingText}</div>}
          {unlockPhase === 2 && <div style={{fontSize: '6rem', color: 'green', fontWeight: 'bold'}}>ACCESS PERMITTED</div>}
        </div>
      )}
    </div>
  );
};

export default OffensiveQuests;
