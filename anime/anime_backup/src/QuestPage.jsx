import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from './GameContext';

const QuestPage = () => {
  const { type, level } = useParams();
  const navigate = useNavigate();
  const { scores, challengeProgress, updateScore, updateChallengeProgress, addStars, addBadge, updateStreak, unlockedOffensive, unlockedDefensive, setUnlockedOffensive, setUnlockedDefensive, unlockNext } = useGame();

  const [dedicatedQuiz, setDedicatedQuiz] = useState(false);
  const [dedicatedScore, setDedicatedScore] = useState(0);
  const [dedicatedQuestion, setDedicatedQuestion] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showTheory, setShowTheory] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);

  // Dedicated questions for unlocking levels
  const dedicatedQuestions = {
    offensive: {
      expert: [
        { q: "What is a zero-day exploit? 🕵️", options: ["An old exploit", "A new unknown vulnerability", "A patched exploit"], correct: 1 },
        { q: "What is phishing?", options: ["Fishing", "A cyber attack", "A game"], correct: 1 },
        { q: "What is SQL injection?", options: ["A database query", "Injecting malicious code into queries", "A type of fish"], correct: 1 },
        { q: "What is a firewall?", options: ["A wall of fire", "A security barrier", "A type of network"], correct: 1 },
        { q: "What is malware?", options: ["Good software", "Malicious software", "A type of hardware"], correct: 1 },
        { q: "What is encryption?", options: ["Hiding data", "Securing data with codes", "Deleting data"], correct: 1 },
        { q: "What is a DDoS attack?", options: ["A dance", "Distributed Denial of Service", "A type of coffee"], correct: 1 },
        { q: "What is social engineering?", options: ["Building software", "Manipulating people for info", "Designing networks"], correct: 1 },
        { q: "What is a buffer overflow?", options: ["Data overflow", "Memory corruption", "Network issue"], correct: 1 },
        { q: "What is penetration testing?", options: ["Testing pens", "Simulating attacks to find vulnerabilities", "Writing code"], correct: 1 }
      ],
      advanced: [
        { q: "What is social engineering? 🎭", options: ["Building software", "Manipulating people for info", "Designing networks"], correct: 1 },
        { q: "What is advanced persistent threat?", options: ["A threat that persists", "Long-term targeted attacks", "A type of virus"], correct: 1 },
        { q: "What is a rootkit?", options: ["A gardening tool", "Software that hides its presence", "A type of root"], correct: 1 },
        { q: "What is man-in-the-middle attack?", options: ["A physical attack", "Intercepting communication", "A type of game"], correct: 1 },
        { q: "What is privilege escalation?", options: ["Increasing privileges", "Lowering privileges", "A type of promotion"], correct: 0 },
        { q: "What is a honeypot?", options: ["A sweet trap", "Decoy system to attract attackers", "A type of bee"], correct: 1 },
        { q: "What is steganography?", options: ["Hiding data in plain sight", "Encrypting data", "Deleting data"], correct: 0 },
        { q: "What is a zero-knowledge proof?", options: ["Knowing nothing", "Proving knowledge without revealing info", "A math problem"], correct: 1 },
        { q: "What is a side-channel attack?", options: ["Attacking from the side", "Exploiting physical characteristics", "A type of channel"], correct: 1 },
        { q: "What is quantum computing threat?", options: ["Breaking encryption", "A new computer", "A type of quantum"], correct: 0 }
      ]
    },
    defensive: {
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
    }
  };

  // Challenges: each has theory and 1 quiz, except 10th has 10 quizzes
  const challenges = {
    offensive: {
      beginner: [
        { theory: "Introduction to Offensive Security: Learn about phishing attacks.", quiz: { q: "What is phishing?", options: ["A fish", "A cyber attack", "A language"], correct: 1 } },
        { theory: "SQL Injection Basics.", quiz: { q: "What is SQL injection?", options: ["A query", "Code injection", "Database"], correct: 1 } },
        { theory: "Cross-Site Scripting (XSS).", quiz: { q: "What is XSS?", options: ["Scripting", "Injecting scripts", "Site crossing"], correct: 1 } },
        { theory: "Password Cracking.", quiz: { q: "What is brute force?", options: ["Guessing", "Trying combinations", "Smart guessing"], correct: 1 } },
        { theory: "Social Engineering.", quiz: { q: "What is pretexting?", options: ["Building", "False scenario", "Engineering"], correct: 1 } },
        { theory: "Malware Types.", quiz: { q: "What is a trojan?", options: ["Horse", "Disguised malware", "Virus"], correct: 1 } },
        { theory: "Network Attacks.", quiz: { q: "What is DDoS?", options: ["Dance", "Denial of Service", "Distributed"], correct: 1 } },
        { theory: "Wireless Security.", quiz: { q: "What is WEP?", options: ["Encryption", "Weak protocol", "Wireless"], correct: 1 } },
        { theory: "Web Vulnerabilities.", quiz: { q: "What is CSRF?", options: ["Request forgery", "Cross-Site", "Script"], correct: 0 } },
        { theory: "Final Challenge: Multiple quizzes.", quizzes: [
          { q: "Q1", options: ["A", "B", "C"], correct: 0 },
          { q: "Q2", options: ["A", "B", "C"], correct: 1 },
          { q: "Q3", options: ["A", "B", "C"], correct: 2 },
          { q: "Q4", options: ["A", "B", "C"], correct: 0 },
          { q: "Q5", options: ["A", "B", "C"], correct: 1 },
          { q: "Q6", options: ["A", "B", "C"], correct: 2 },
          { q: "Q7", options: ["A", "B", "C"], correct: 0 },
          { q: "Q8", options: ["A", "B", "C"], correct: 1 },
          { q: "Q9", options: ["A", "B", "C"], correct: 2 },
          { q: "Q10", options: ["A", "B", "C"], correct: 0 }
        ] }
      ],
      expert: [
        { theory: "Expert Offensive Security: Advanced phishing techniques.", quiz: { q: "What is spear phishing?", options: ["Targeted phishing", "Random phishing", "Email phishing"], correct: 0 } },
        // Add 8 more...
        { theory: "Expert Final Challenge.", quizzes: [
          { q: "Q1", options: ["A", "B", "C"], correct: 0 },
          // Add 9 more...
        ] }
      ],
      advanced: [
        { theory: "Advanced Offensive Security: Zero-day exploits.", quiz: { q: "What is a zero-day?", options: ["Known exploit", "Unknown exploit", "Old exploit"], correct: 1 } },
        // Add 8 more...
        { theory: "Advanced Final Challenge.", quizzes: [
          { q: "Q1", options: ["A", "B", "C"], correct: 0 },
          // Add 9 more...
        ] }
      ]
    },
    defensive: {
      beginner: [
        { theory: "Introduction to Defensive Security: Learn about firewalls.", quiz: { q: "What is a firewall?", options: ["Fire wall", "Security barrier", "Virus"], correct: 1 } },
        // Add 8 more...
        { theory: "Final Challenge.", quizzes: [
          // 10 quizzes
        ] }
      ],
      expert: [
        { theory: "Expert Defensive Security: Intrusion detection systems.", quiz: { q: "What is IDS?", options: ["Intrusion Detection System", "Internet Data Service", "Internal Device System"], correct: 0 } },
        // Add 8 more...
        { theory: "Expert Final Challenge.", quizzes: [
          { q: "Q1", options: ["A", "B", "C"], correct: 0 },
          // Add 9 more...
        ] }
      ],
      advanced: [
        { theory: "Advanced Defensive Security: Threat intelligence.", quiz: { q: "What is threat intelligence?", options: ["Smart threats", "Information about threats", "AI threats"], correct: 1 } },
        // Add 8 more...
        { theory: "Advanced Final Challenge.", quizzes: [
          { q: "Q1", options: ["A", "B", "C"], correct: 0 },
          // Add 9 more...
        ] }
      ]
    }
  };

  useEffect(() => {
    const isOffensive = type === 'offensive';
    const unlocked = level === 'beginner' || (isOffensive ? unlockedOffensive[level] : unlockedDefensive[level]);
    if (!unlocked) {
      setDedicatedQuiz(true);
    } else {
      setCurrentChallenge(challengeProgress[type][level]);
    }
  }, [type, level, scores, challengeProgress, unlockedOffensive, unlockedDefensive]);

  const handleDedicatedAnswer = (index) => {
    if (index === dedicatedQuestions[type][level][dedicatedQuestion].correct) {
      setDedicatedScore(dedicatedScore + 1);
    }
    if (dedicatedQuestion < 9) {
      setDedicatedQuestion(dedicatedQuestion + 1);
    } else {
      if (dedicatedScore + (index === dedicatedQuestions[type][level][dedicatedQuestion].correct ? 1 : 0) >= 8) {
        if (type === 'offensive') {
          if (level === 'expert') setUnlockedOffensive(prev => ({ ...prev, expert: true }));
          if (level === 'advanced') setUnlockedOffensive(prev => ({ ...prev, advanced: true }));
        } else if (type === 'defensive') {
          if (level === 'expert') setUnlockedDefensive(prev => ({ ...prev, expert: true }));
          if (level === 'advanced') setUnlockedDefensive(prev => ({ ...prev, advanced: true }));
        }
        setDedicatedQuiz(false);
        setCurrentChallenge(0);
      } else {
        // Failed, retry
        setDedicatedScore(0);
        setDedicatedQuestion(0);
      }
    }
  };

  const handleQuizAnswer = (index) => {
    const challenge = challenges[type][level][currentChallenge];
    const quiz = challenge.quiz || challenge.quizzes[currentQuiz];
    if (index === quiz.correct) {
      setQuizScore(quizScore + 1);
    }
    if (currentChallenge < 9) {
      // Single quiz per challenge
      if (quizScore + (index === quiz.correct ? 1 : 0) >= 1) {
        updateChallengeProgress(type, level, currentChallenge + 1);
        setCurrentChallenge(currentChallenge + 1);
        setQuizScore(0);
        setShowTheory(true);
      } else {
        // Failed, retry
        setQuizScore(0);
      }
    } else {
      // 10th challenge, multiple quizzes
      if (currentQuiz < 9) {
        setCurrentQuiz(currentQuiz + 1);
      } else {
        // Finish
        const finalScore = quizScore + (index === quiz.correct ? 1 : 0);
        updateScore(type, level, finalScore);
        addStars(finalScore);
        if (finalScore >= 8) addBadge(`${type}-${level}`);
        updateStreak(finalScore >= 7 ? 1 : 0);
        setShowFeedback(true);
        if (finalScore >= 8) unlockNext(type, level);
      }
    }
  };

  if (dedicatedQuiz) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'black',
        color: 'white',
        padding: '2rem'
      }}>
        <h1>Dedicated Quiz to Unlock {level.toUpperCase()}</h1>
        <p>Question {dedicatedQuestion + 1} of 10</p>
        <h2>{dedicatedQuestions[type][level][dedicatedQuestion]?.q}</h2>
        {dedicatedQuestions[type][level][dedicatedQuestion]?.options.map((opt, i) => (
          <button key={i} onClick={() => handleDedicatedAnswer(i)} style={{
            display: 'block',
            width: '100%',
            padding: '1rem',
            margin: '0.5rem 0',
            background: 'gray',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px'
          }}>
            {opt}
          </button>
        ))}
      </div>
    );
  }

  if (showFeedback) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'black',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1>Quest Complete! 🎉</h1>
        <p>Score: {quizScore}/10</p>
        <button onClick={() => navigate(`/${type}-quests`)} style={{ padding: '1rem', marginTop: '1rem' }}>Back to Map</button>
      </div>
    );
  }

  const challenge = challenges[type][level][currentChallenge];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'black',
      color: 'white',
      padding: '2rem',
      position: 'relative'
    }}>
      <button onClick={() => navigate(`/${type}-quests`)} style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        background: 'transparent',
        border: '2px solid white',
        color: 'white',
        padding: '0.5rem',
        cursor: 'pointer'
      }}>Back</button>

      <h1>Challenge {currentChallenge + 1} of 10</h1>
      {showTheory ? (
        <div>
          <p>{challenge.theory}</p>
          <button onClick={() => setShowTheory(false)} style={{ padding: '1rem', marginTop: '1rem' }}>Start Quiz</button>
        </div>
      ) : (
        <div>
          <h2>{challenge.quiz ? challenge.quiz.q : challenge.quizzes[currentQuiz].q}</h2>
          {(challenge.quiz ? [challenge.quiz] : [challenge.quizzes[currentQuiz]]).map((q, i) => (
            q.options.map((opt, j) => (
              <button key={j} onClick={() => handleQuizAnswer(j)} style={{
                display: 'block',
                width: '100%',
                padding: '1rem',
                margin: '0.5rem 0',
                background: 'gray',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '5px'
              }}>
                {opt}
              </button>
            ))
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestPage;
