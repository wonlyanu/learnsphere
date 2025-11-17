import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from './GameContext';
import Confetti from 'react-confetti';

const ChallengePageWeb = () => {
  const { type, level } = useParams(); // type: frontend/backend, level: beginner/expert/advanced
  const navigate = useNavigate();
  const { challengeLevels, updateChallengeLevel, unlockNext } = useGame();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  const [confettiActive, setConfettiActive] = useState(false);
  const [gameSequence, setGameSequence] = useState([]);
  const [gameIndex, setGameIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(-1);
  const [quizIndex, setQuizIndex] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [showCongrats, setShowCongrats] = useState(false);
  const [showCompletionMessages, setShowCompletionMessages] = useState(false);
  const [completionMessages, setCompletionMessages] = useState([]);
  const [blurScreen, setBlurScreen] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('idle');
  const [finalMessage, setFinalMessage] = useState(false);

  const fullTitle = `${type.toUpperCase()} ${level.toUpperCase()} Challenges`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedTitle(fullTitle.slice(0, index + 1));
      index++;
      if (index === fullTitle.length) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [fullTitle]);

  const shuffle = (array) => {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const generateCompletionMessages = () => {
    const messages = [];
    const numMessages = 50; // match cybersecurity count
    for (let i = 0; i < numMessages; i++) {
      messages.push({
        id: i,
        text: "Congratulations!",
        x: Math.random() * 90 + '%',
        y: Math.random() * 90 + '%',
        delay: Math.random() * 3000,
        visible: false
      });
    }
    setCompletionMessages(messages);
  };

  useEffect(() => {
    if (showCompletionMessages) {
      // Phase 1: Screen turns black
      setAnimationPhase('black');
      setBlurScreen(true);
      setTimeout(() => {
        // Phase 2: Show final message
        setAnimationPhase('final');
        setFinalMessage(true);
        setTimeout(() => {
          setFinalMessage(false);
          setShowCompletionMessages(false);
          setAnimationPhase('idle');
          navigate('/web-game-selection');
        }, 2000); // Show message for 2 seconds
      }, 1000); // Black screen for 1 second
    }
  }, [showCompletionMessages, navigate, type]);

  // Web-specific level content (frontend/backend) - keep similar quantity to cybersecurity
  const levelData = {
    frontend: {
      beginner: [
        { content: "HTML elements are the building blocks of webpages. Understand tags, attributes, and semantic markup. Use headings, paragraphs, lists and forms to structure content properly. Semantic HTML improves accessibility and SEO and provides a solid foundation for styling and scripting.", quizType: 'multiple', quiz: { question: "What is semantic HTML?", options: ["Meaningful markup", "Styles only", "A server"], correct: 0 } },
        { content: "CSS controls presentation of HTML. The box model consists of margin, border, padding and content. Learn selectors, specificity, and layout models like flexbox and grid to build responsive layouts.", quizType: 'multiple', quiz: { question: "What is the CSS box model?", options: ["Margin, border, padding, content", "Only margin", "Only padding"], correct: 0 } },
        { content: "JavaScript adds interactivity by manipulating the DOM, handling events, and communicating with servers via fetch/XHR. Understand variables, functions, scope, and asynchronous patterns like promises and async/await.", quizType: 'multiple', quiz: { question: "What does async/await help with?", options: ["Handling async code", "Styling pages", "Compressing images"], correct: 0 } },
        { content: "Responsive design ensures interfaces work on various screens. Use media queries, fluid layouts, and flexible images to create designs that adapt to devices from phones to desktops.", quizType: 'multiple', quiz: { question: "What are media queries used for?", options: ["Adapt styles to screen sizes", "Load fonts", "Encrypt data"], correct: 0 } },
        { content: "Accessibility ensures content is usable by people with disabilities. Use semantic HTML, ARIA roles when necessary, and test with screen readers to improve inclusivity.", quizType: 'multiple', quiz: { question: "Why use semantic HTML?", options: ["Accessibility and SEO", "Only for style", "Only for scripts"], correct: 0 } },
        { content: "Forms and client-side validation improve user experience. Validate input on both client and server, provide helpful feedback, and handle errors gracefully.", quizType: 'multiple', quiz: { question: "Where should you validate input?", options: ["Client and server", "Only client", "Only server"], correct: 0 } },
        { content: "Performance matters. Optimize images, minimize requests, and use caching and bundling to reduce load times. Tools like Lighthouse and DevTools help identify bottlenecks.", quizType: 'multiple', quiz: { question: "Why optimize images?", options: ["Improve load times", "Increase size", "Only for SEO"], correct: 0 } },
        { content: "Modern workflows use build tools (bundlers), package managers, and transpilers to write maintainable code and target multiple browsers.", quizType: 'multiple', quiz: { question: "What is a bundler?", options: ["Packages assets for production", "A CSS rule", "A DB"], correct: 0 } },
        { content: "Testing and debugging are essential. Use unit, integration and end-to-end tests, and rely on browser DevTools to inspect network, performance, and DOM issues.", quizType: 'multiple', quiz: { question: "What can DevTools inspect?", options: ["DOM, network, performance", "Only CSS", "Only images"], correct: 0 } },
        { content: "Final frontend challenge covers HTML/CSS/JS integration and building accessible, performant interfaces with modern tooling.", quizType: 'multiple', quiz: { question: "What is a key goal of frontend development?", options: ["Usability and performance", "Only styling", "Only animations"], correct: 0 } }
      ],
      expert: Array(10).fill({ content: "Advanced frontend topics include frameworks, state management, SSR/SSG, and performance tuning. Learn patterns for scaling UI architecture.", quizType: 'multiple', quiz: { question: "What is SSR?", options: ["Server-Side Rendering", "Client-only UI", "A CSS tool"], correct: 0 } }),
      advanced: [
        { content: "Cutting-edge frontend: PWAs, WebAssembly, micro-frontends, and edge rendering. Focus on high-performance, offline-capable apps.", quizType: 'multiple', quiz: { question: "What is a PWA?", options: ["Progressive Web App", "A plugin", "A font"], correct: 0 } }
      ]
    },
    backend: {
      beginner: [
        { content: "Backend fundamentals cover servers, routing, and basic API design. Learn how HTTP requests are handled and how to structure endpoints.", quizType: 'multiple', quiz: { question: "What does a server do?", options: ["Serve responses to clients", "Style pages", "Store fonts"], correct: 0 } },
        { content: "Databases store and retrieve data. Understand relational and NoSQL options, CRUD operations, and basic indexing.", quizType: 'multiple', quiz: { question: "What does CRUD stand for?", options: ["Create Read Update Delete", "Compute Render Update Delete", "None"], correct: 0 } },
        { content: "APIs expose functionality to clients. RESTful principles, status codes, and consistent designs make APIs easier to use.", quizType: 'multiple', quiz: { question: "What is REST?", options: ["Architectural style for APIs", "A CSS framework", "A font"], correct: 0 } },
        { content: "Authentication and authorization protect resources. Use secure storage for credentials and follow best practices for tokens and sessions.", quizType: 'multiple', quiz: { question: "What is authentication?", options: ["Verifying user identity", "Styling a page", "Compressing images"], correct: 0 } },
        { content: "Caching and performance improve response times. Use caches responsibly to reduce database load and speed up repeated requests.", quizType: 'multiple', quiz: { question: "Why cache?", options: ["Improve response times", "Slow down servers", "Only for images"], correct: 0 } },
        { content: "Logging and monitoring help diagnose issues and maintain reliability. Collect metrics and set up alerts for anomalies.", quizType: 'multiple', quiz: { question: "What is logging for?", options: ["Debugging and auditing", "Only styling", "Only fonts"], correct: 0 } },
        { content: "Scaling strategies include horizontal scaling, load balancing, and stateless services for better resilience.", quizType: 'multiple', quiz: { question: "What is load balancing?", options: ["Distributing traffic", "A CSS method", "A DB"], correct: 0 } },
        { content: "Secure coding practices and input validation prevent common vulnerabilities like injection attacks.", quizType: 'multiple', quiz: { question: "Why validate input?", options: ["Prevent injection and errors", "Improve styles", "Faster images"], correct: 0 } },
        { content: "Deployment basics: continuous integration and delivery help ship reliable updates. Understand containers and orchestration basics.", quizType: 'multiple', quiz: { question: "What is CI?", options: ["Continuous Integration", "A CSS rule", "A font"], correct: 0 } },
        { content: "Final backend challenge covers integrating APIs, databases, and deploying a resilient service.", quizType: 'multiple', quiz: { question: "What is a key backend goal?", options: ["Reliability and correctness", "Only speed", "Only features"], correct: 0 } }
      ],
      expert: Array(10).fill({ content: "Encryption is the process of converting information or data into a code, especially to prevent unauthorized access. Encryption is one of the most important methods for providing data security, especially for end-to-end protection of data transmitted across networks. There are two main types: symmetric and asymmetric encryption.", quizType: 'multiple', quiz: { question: "What is encryption?", options: ["Hiding data", "Securing data with codes", "Deleting data"], correct: 1 } }),
      advanced: Array(10).fill({ content: "Modern backend advanced topics: microservices, observability, zero-downtime deployment, and secure architecture patterns.", quizType: 'multiple', quiz: { question: "What is observability?", options: ["Monitoring and tracing", "Only logging", "Only metrics"], correct: 0 } })
    }
  };

  const currentLevels = levelData[type][level];

  const bgSrc = '/piratemap.png';

  const bgStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    objectFit: 'cover',
    zIndex: -1
  };

  const levelPositions = [
    { level: 1, icon: "Straw Hat", x: "19%", y: "31%" },
    { level: 2, icon: "Ship Wheel", x: "26%", y: "31%" },
    { level: 3, icon: "Bug/Virus", x: "21%", y: "59%" },
    { level: 4, icon: "Chest/Locker", x: "34%", y: "64%" },
    { level: 5, icon: "Target/Eye", x: "38%", y: "44%" },
    { level: 6, icon: "Lock", x: "49%", y: "61%" },
    { level: 7, icon: "Circuit Board", x: "50%", y: "42%" },
    { level: 8, icon: "CPU/Brain", x: "64%", y: "52%" },
    { level: 9, icon: "Jolly Roger", x: "73%", y: "62%" },
    { level: 10, icon: "Treasure Chest", x: "83%", y: "63%" }
  ];

  const icons = ['🏴‍☠️', '⚓', '🐛', '📦', '🎯', '🔒', '🔌', '🧠', '🏴‍☠️', '💰'];

  const handleLevelClick = (index) => {
    if (index === 0 || challengeLevels[type][level][index - 1]) {
      setSelectedLevel(index);
      setShowContent(true);
      setShowQuiz(false);
      setQuizIndex(0);
    }
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setGameSequence(shuffle([1,2,3]));
    setGameIndex(0);
    setQuizIndex(0);
  };

  const handleGameClick = (num) => {
    if (num === gameSequence[gameIndex]) {
      if (gameIndex === 2) {
        setShowCongrats(true);
        updateChallengeLevel(type, level, selectedLevel, true);
        if (selectedLevel === 9) {
          unlockNext(type, level);
        }
        setTimeout(() => {
          setConfettiActive(true);
        }, 1000);
        setTimeout(() => {
          setConfettiActive(false);
          setShowCongrats(false);
          setShowContent(false);
          setShowQuiz(false);
          if (selectedLevel === 9 && level === 'advanced') {
            setShowCompletionMessages(true);
          } else if (selectedLevel === 9) {
            navigate(`/${type}-quests`);
          }
          setSelectedLevel(null);
        }, 4000);
      } else {
        setGameIndex(prev => prev + 1);
      }
    } else {
      alert("Wrong order! Start over");
      setGameIndex(0);
    }
  };

  const handleAnswer = (i) => {
    setUserAnswer(i);
    const quiz = currentLevels[selectedLevel].quiz;
    const correct = Array.isArray(quiz) ? quiz[quizIndex].correct : quiz.correct;
    if (i === correct) {
      if (Array.isArray(quiz) && quizIndex < quiz.length - 1) {
        setQuizIndex(prev => prev + 1);
        setUserAnswer(-1);
      } else {
        setConfettiActive(true);
        setShowCongrats(true);
        updateChallengeLevel(type, level, selectedLevel, true);
        if (selectedLevel === 9) {
          unlockNext(type, level);
        }
        setTimeout(() => {
          setConfettiActive(false);
          setShowCongrats(false);
          setShowContent(false);
          setShowQuiz(false);
          if (selectedLevel === 9 && level === 'advanced') {
            setShowCompletionMessages(true);
          } else if (selectedLevel === 9) {
            navigate(`/${type}-quests`);
          }
          setSelectedLevel(null);
        }, 3000);
      }
    } else {
      alert("Wrong answer! Try again");
      setUserAnswer(-1);
    }
  };

  // Determine the current level index (next available level)
  let currentLevelIndex = -1;
  for (let i = 0; i < 10; i++) {
    if (i === 0 || challengeLevels[type][level][i - 1]) {
      if (!challengeLevels[type][level][i]) {
        currentLevelIndex = i;
        break;
      }
    }
  }

  return (
    <>
      <style>
        {`
          ::-webkit-scrollbar {
            display: none;
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          @keyframes popIn {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
      <div style={{
        position: 'relative',
        height: '100vh',
        color: 'white'
      }}>
      <img
        src={bgSrc}
        alt="Background"
        style={bgStyle}
      />
      <button
        onClick={() => navigate(`/${type}-quests`)}
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          background: 'transparent',
          border: '2px solid white',
          color: 'white',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          borderRadius: '5px',
          zIndex: 10
        }}
      >
        Back to Quest
      </button>
      <button
        onClick={() => navigate('/workspace')}
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          background: 'transparent',
          border: '2px solid white',
          color: 'white',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          borderRadius: '5px',
          zIndex: 10
        }}
      >
        My Workspace
      </button>

      <h1 style={{
        position: 'absolute',
        top: type === 'frontend' || type === 'backend' ? '25%' : '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: "'OnePieceFont', serif",
        fontSize: type === 'frontend' || type === 'backend' ? '4rem' : '1.2rem',
        fontWeight: 'bold',
        zIndex: 10,
        textShadow: type === 'frontend' || type === 'backend' ? '0 0 20px rgba(0,0,0,0.5)' : 'none'
      }}>{displayedTitle}</h1>

      <div style={{
        position: 'absolute',
        top: type === 'frontend' || (type === 'backend' && level === 'beginner') ? '70%' : '60%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '4rem',
        maxWidth: '800px'
      }}>
        {Array.from({length: 10}, (_, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {i === currentLevelIndex && (
                <img
                  src="/sunny.png"
                  alt="Sunny"
                  style={{
                    position: 'absolute',
                    top: '-60px',
                    left: '50%',
                    transform: 'translateX(-50%) scaleX(-1)',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    zIndex: 5
                  }}
                />
              )}
              <button
                onClick={() => handleLevelClick(i)}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: `url(/onepiecelogo.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  color: 'black',
                  border: challengeLevels[type][level][i] ? '2px solid green' : i === currentLevelIndex ? '2px solid yellow' : '2px solid orange',
                  fontSize: '1.5rem',
                  fontFamily: "'OnePieceFont', serif",
                  cursor: (i === 0 || challengeLevels[type][level][i - 1]) ? 'pointer' : 'not-allowed',
                  opacity: challengeLevels[type][level][i] ? 1 : (i === 0 || challengeLevels[type][level][i - 1]) ? 1 : 0.5,
                  animation: i === currentLevelIndex ? 'pulse 2s infinite' : 'none',
                  boxShadow: challengeLevels[type][level][i] ? '0 0 15px green' : i === currentLevelIndex ? '0 0 15px yellow' : '0 0 15px orange',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
              </button>
            </div>
            <div style={{
              marginTop: '5px',
              background: 'rgba(0,0,0,0.4)',
              color: 'white',
              padding: '2px 5px',
              borderRadius: '3px',
              fontSize: '0.8rem',
              fontFamily: "'OnePieceFont', serif"
            }}>
              Level {i + 1}
            </div>
          </div>
        ))}
      </div>

      {showContent && selectedLevel !== null && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,0,0,0.8)',
          padding: '2rem',
          borderRadius: '10px',
          maxWidth: '800px',
          zIndex: 20
        }}>
          <button
            onClick={() => {
              setShowContent(false);
              setSelectedLevel(null);
            }}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
          <h2>Level {selectedLevel + 1}</h2>
          <div dangerouslySetInnerHTML={{__html: currentLevels[selectedLevel].content.replace(/\n/g, '<br />')}} />
          {!showQuiz && (
            <button onClick={handleStartQuiz} style={{
              background: 'blue',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>Start Quiz</button>
          )}
        </div>
      )}

      {showQuiz && selectedLevel !== null && currentLevels[selectedLevel] && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,0,0,0.8)',
          padding: '2rem',
          borderRadius: '10px',
          maxWidth: '800px',
          zIndex: 20
        }}>
          <button
            onClick={() => {
              setShowQuiz(false);
              setSelectedLevel(null);
            }}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
          {currentLevels[selectedLevel].quizType === 'multiple' && (
            <>
              <h3>{Array.isArray(currentLevels[selectedLevel].quiz) ? currentLevels[selectedLevel].quiz[quizIndex].question : currentLevels[selectedLevel].quiz.question}</h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {(Array.isArray(currentLevels[selectedLevel].quiz) ? currentLevels[selectedLevel].quiz[quizIndex].options : currentLevels[selectedLevel].quiz.options).map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} style={{
                    background: 'gray',
                    color: 'white',
                    border: 'none',
                    padding: '1rem',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}>
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}
          {currentLevels[selectedLevel].quizType === 'guess' && (
            <>
              <h3>Guess the term: {currentLevels[selectedLevel].quiz.hint}</h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {currentLevels[selectedLevel].quiz.options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} style={{
                    background: 'gray',
                    color: 'white',
                    border: 'none',
                    padding: '1rem',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}>
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}
          {currentLevels[selectedLevel].quizType === 'memory' && (
            <>
              <h3>Arrange the numbers in order: Click {gameSequence[gameIndex]}</h3>
              <div style={{display: 'flex', justifyContent: 'center', gap: '1rem'}}>
                {[1,2,3].map(num => (
                  <button key={num} onClick={() => handleGameClick(num)} style={{
                    width: '50px',
                    height: '50px',
                    fontSize: '1.5rem',
                    background: 'gray',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '5px'
                  }}>
                    {num}
                  </button>
                ))}
              </div>
            </>
          )}
          {currentLevels[selectedLevel].quizType === 'match' && (
            <>
              <h3>Match the terms with definitions</h3>
              {currentLevels[selectedLevel].quiz.pairs.map((pair, i) => (
                <div key={i} style={{marginBottom: '1rem'}}>
                  <strong>{pair.term}:</strong> {pair.definition}
                </div>
              ))}
              <button onClick={() => {
                setConfettiActive(true);
                updateChallengeLevel(type, level, selectedLevel, true);
                setTimeout(() => {
                  setConfettiActive(false);
                  setShowContent(false);
                  setShowQuiz(false);
                  setSelectedLevel(null);
                }, 3000);
              }} style={{
                background: 'blue',
                color: 'white',
                border: 'none',
                padding: '1rem',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>Done</button>
            </>
          )}
        </div>
      )}

      {confettiActive && <Confetti numberOfPieces={300} recycle={false} />}

      {showCongrats && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,0,0,0.9)',
          padding: '2rem',
          borderRadius: '10px',
          textAlign: 'center',
          zIndex: 30,
          color: 'green',
          fontSize: '2rem',
          fontFamily: "'OnePieceFont', serif"
        }}>
          Congratulations! Level Completed!
        </div>
      )}

      {blurScreen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'black',
          zIndex: 35
        }} />
      )}

      {completionMessages.map((msg) => (
        <div
          key={msg.id}
          style={{
            position: 'absolute',
            top: msg.y,
            left: msg.x,
            color: 'red',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            fontFamily: "'OnePieceFont', serif",
            zIndex: 40,
            opacity: msg.visible ? 1 : 0,
            transition: 'opacity 0.5s',
            animation: msg.visible ? 'popIn 0.5s ease-out' : 'none'
          }}
        >
          {msg.text}
        </div>
      ))}

      {finalMessage && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,0,0,0.9)',
          padding: '2rem',
          borderRadius: '10px',
          textAlign: 'center',
          zIndex: 50,
          color: 'gold',
          fontSize: '3rem',
          fontFamily: "'OnePieceFont', serif",
          textShadow: '0 0 20px gold'
        }}>
          YOU HAVE SUCCESSFULLY COMPLETED THE WEB QUEST
        </div>
      )}

    </div>
    </>
  );
};

export default ChallengePageWeb;
