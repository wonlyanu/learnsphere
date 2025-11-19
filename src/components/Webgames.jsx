// WebDevGamesHub.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Webgames.css';

// Import GIFs for game interactions
const htmlAnimation = "https://media.giphy.com/media/3o7TKsQ8UQ4l4LhGz6/giphy.gif";
const cssAnimation = "https://media.giphy.com/media/l0HlNaQ6YlYp8/giphy.gif";
const jsAnimation = "https://media.giphy.com/media/xT0xeMA62E1XIlup68/giphy.gif";
const frameworkAnimation = "https://media.giphy.com/media/Lr4CaCvfRuGDC/giphy.gif";
const responsiveAnimation = "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif";

const WebDevGamesHub = ({ goBack }) => {
  const videoRef = useRef(null);
  const [activeGame, setActiveGame] = useState(null);
  const [gameData, setGameData] = useState({
    score: 0,
    level: 1,
    achievements: [],
    unlockedGames: ['html']
  });
  const [showAchievements, setShowAchievements] = useState(false);

  const games = [
    {
      id: 'html',
      title: 'HTML Structure Builder',
      description: 'Create semantic markup with drag & drop',
      icon: '🔍',
      gif: htmlAnimation,
      component: <HTMLBuilderGame onComplete={(score, achievement) => updateScore(score, achievement)} />
    },
    {
      id: 'css',
      title: 'CSS Designer Studio',
      description: 'Style beautiful layouts with Flexbox/Grid',
      icon: '🎨',
      gif: cssAnimation,
      locked: !gameData.unlockedGames.includes('css'),
      component: <CSSDesignerGame onComplete={(score, achievement) => updateScore(score, achievement)} />
    },
    {
      id: 'js',
      title: 'JavaScript Logic Quest',
      description: 'Solve programming challenges',
      icon: '🔧',
      gif: jsAnimation,
      locked: !gameData.unlockedGames.includes('js'),
      component: <JSLogicGame onComplete={(score, achievement) => updateScore(score, achievement)} />
    },
    {
      id: 'responsive',
      title: 'Responsive Design',
      description: 'Build adaptive layouts for all devices',
      icon: '📱',
      gif: responsiveAnimation,
      locked: !gameData.unlockedGames.includes('responsive'),
      component: <ResponsiveDesignGame onComplete={(score, achievement) => updateScore(score, achievement)} />
    },
    {
      id: 'framework',
      title: 'Framework Mastery',
      description: 'Master React/Vue/Angular components',
      icon: '⚛️',
      gif: frameworkAnimation,
      locked: !gameData.unlockedGames.includes('framework'),
      component: <FrameworkMasteryGame onComplete={(score, achievement) => updateScore(score, achievement)} />
    }
  ];

  useEffect(() => {
    // Unlock next game when level increases
    const nextGameIndex = gameData.level - 1;
    if (nextGameIndex < games.length) {
      const nextGame = games[nextGameIndex].id;
      if (!gameData.unlockedGames.includes(nextGame)) {
        setGameData(prev => ({
          ...prev,
          unlockedGames: [...prev.unlockedGames, nextGame]
        }));
      }
    }
  }, [gameData.level, games]);

  // Video controls
  useEffect(() => {
    if (videoRef.current) {
      if (activeGame) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(e => console.log('Video play failed:', e));
      }
    }
  }, [activeGame]);

  const updateScore = (points, achievement) => {
    setGameData(prev => {
      const newScore = prev.score + points;
      const newLevel = Math.floor(newScore / 200) + 1;
      let newAchievements = [...prev.achievements];
      
      if (achievement && !prev.achievements.includes(achievement)) {
        newAchievements = [...newAchievements, achievement];
      }
      
      return {
        ...prev,
        score: newScore,
        level: newLevel,
        achievements: newAchievements
      };
    });
  };

  const startGame = (gameId) => {
    const game = games.find(g => g.id === gameId);
    if (!game.locked) {
      setActiveGame(gameId);
    }
  };

  const exitGame = () => {
    setActiveGame(null);
  };

  return (
    <div className="webdev-games-hub">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="bg-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/respage.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Background Smoke Effect */}
      <div className="background-smoke"></div>

      <header className="hub-header">
        <button className="back-btn" onClick={goBack}>← Back to Home</button>
        <h1><center> WEB DEVELOPMENT GAMES</center> </h1>
        <div className="player-stats">
          <div className="stat-badge">
            <span className="label">Level:</span>
            <span className="value">{gameData.level}</span>
          </div>
          <div className="stat-badge">
            <span className="label">Score:</span>
            <span className="value">{gameData.score}</span>
          </div>
          <button className="achievements-btn" onClick={() => setShowAchievements(!showAchievements)}>
            🏆 Achievements ({gameData.achievements.length})
          </button>
        </div>
      </header>

      {showAchievements && (
        <div className="achievements-overlay">
          <div className="achievements-panel">
            <h2>🎖️ Your Achievements</h2>
            <div className="achievements-grid">
              {gameData.achievements.length > 0 ? (
                gameData.achievements.map((achievement, index) => (
                  <div key={index} className="achievement-card">
                    <div className="achievement-icon">🏆</div>
                    <div className="achievement-name">{achievement}</div>
                  </div>
                ))
              ) : (
                <p className="no-achievements">Complete challenges to earn achievements!</p>
              )}
            </div>
            <button className="close-btn" onClick={() => setShowAchievements(false)}>Close</button>
          </div>
        </div>
      )}

      {activeGame ? (
        <div className="game-container">
          <div className="game-header">
            <button className="exit-btn" onClick={exitGame}>← Back to Hub</button>
            <h2>{games.find(g => g.id === activeGame)?.title}</h2>
          </div>
          <div className="game-content">
            {games.find(g => g.id === activeGame)?.component}
          </div>
        </div>
      ) : (
        <div className="games-grid">
          {games.map((game) => (
            <div 
              key={game.id} 
              className={`game-card glow-card smaller ${game.locked ? 'locked' : ''}`}
              onClick={() => startGame(game.id)}
            >
              {game.locked ? (
                <div className="lock-overlay">
                  <div className="lock-icon">🔒</div>
                  <p>Reach Level {games.findIndex(g => g.id === game.id) + 1} to unlock</p>
                </div>
              ) : (
                <div className="card-content">
                  <img src={game.gif} alt={game.title} className="game-gif" />
                  <div className="card-icon">{game.icon}</div>
                  <h3>{game.title}</h3>
                  <p>{game.description}</p>
                  <div className="play-button">PLAY NOW</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <footer className="hub-footer">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(gameData.score % 200) / 2}%` }}
          ></div>
        </div>
        <p>Next Level: {(gameData.level) * 200} points</p>
        <p>© 2025 Web Development Training Center | All games for educational purposes</p>
      </footer>
    </div>
  );
};

// HTML Structure Builder Game Component
const HTMLBuilderGame = ({ onComplete }) => {
  const [stage, setStage] = useState(1);
  const [completedStages, setCompletedStages] = useState([]);
  const [answers, setAnswers] = useState({
    semanticTag: '',
    formStructure: '',
    accessibilityAttr: ''
  });
  const [result, setResult] = useState('');
  const [showHint, setShowHint] = useState(null);
  const [pointsAwarded, setPointsAwarded] = useState(0);

  const handleAnswerChange = (field, value) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const checkSemanticTag = () => {
    const correctAnswers = ['main', 'nav', 'aside', 'header', 'footer', 'section', 'article'];
    if (correctAnswers.includes(answers.semanticTag.toLowerCase())) {
      setCompletedStages([...completedStages, 'semantic']);
      setStage(2);
      setResult('✅ Correct! Proceed to stage 2...');
      setPointsAwarded(prev => prev + 50);
    } else {
      setResult('❌ Incorrect! Try again.');
    }
  };

  const checkFormStructure = () => {
    if (answers.formStructure.toLowerCase().includes('<form>') && 
        answers.formStructure.toLowerCase().includes('</form>') &&
        answers.formStructure.toLowerCase().includes('submit')) {
      setCompletedStages([...completedStages, 'form']);
      setStage(3);
      setResult('✅ Well done! Proceed to final stage...');
      setPointsAwarded(prev => prev + 50);
    } else {
      setResult('❌ Not quite! Try again.');
    }
  };

  const checkAccessibility = () => {
    if (answers.accessibilityAttr.toLowerCase().includes('alt="') ||
        answers.accessibilityAttr.toLowerCase().includes('aria-label') ||
        answers.accessibilityAttr.toLowerCase().includes('role=')) {
      const finalScore = pointsAwarded + 100;
      onComplete(finalScore, "HTML Architect");
      setCompletedStages([...completedStages, 'accessibility']);
      setResult(`✅ Perfect markup! +${finalScore} points awarded!`);
      setTimeout(() => setPointsAwarded(0), 3000);
    } else {
      setResult('❌ Missing accessibility features!');
    }
  };

  return (
    <div className="html-builder-game">
      <h3>🔍 HTML STRUCTURE BUILDER</h3>
      <p className="instructions">Create accessible and semantic HTML structures!</p>
      
      <div className="progress-tracker">
        {[1, 2, 3].map(num => (
          <div 
            key={num} 
            className={`step ${stage === num ? 'active' : ''} ${completedStages.includes(
              num === 1 ? 'semantic' : 
              num === 2 ? 'form' : 'accessibility'
            ) ? 'completed' : ''}`}
          >
            Stage {num}
          </div>
        ))}
      </div>
      
      {stage >= 1 && (
        <div className="puzzle-stage">
          <h4>🏗️ Stage 1: Semantic Markup</h4>
          <p>Which element represents the main content area?</p>
          <div className="puzzle-input">
            <input 
              type="text" 
              value={answers.semanticTag}
              onChange={(e) => handleAnswerChange('semanticTag', e.target.value)}
              placeholder="Enter HTML tag name"
            />
            <button onClick={checkSemanticTag}>Submit</button>
          </div>
          <div className="hint-section">
            <button className="hint-toggle" onClick={() => setShowHint(showHint === 'semantic' ? null : 'semantic')}>
              {showHint === 'semantic' ? 'Close Hint' : 'Toggle Hint'}
            </button>
            {showHint === 'semantic' && (
              <div className="hint-box">
                <h5>Detailed Hint:</h5>
                <ul>
                  <li>It contains the primary content</li>
                  <li>Not navigation or sidebar</li>
                  <li>Introduced in HTML5</li>
                  <li>Single per page</li>
                </ul>
              </div>
            )}
          </div>
          {result && <p className={`result ${result.includes('✅') ? 'success' : 'error'}`}>{result}</p>}
          {completedStages.includes('semantic') && <p className="success">✓ Stage 1 Completed | 50 pts</p>}
        </div>
      )}
      
      {stage >= 2 && (
        <div className="puzzle-stage">
          <h4>📄 Stage 2: Form Structure</h4>
          <p>Create a basic form with username and submit button</p>
          <div className="puzzle-input">
            <textarea 
              value={answers.formStructure}
              onChange={(e) => handleAnswerChange('formStructure', e.target.value)}
              placeholder="Enter HTML form structure"
              rows="4"
            />
            <button onClick={checkFormStructure}>Submit</button>
          </div>
          <div className="hint-section">
            <button className="hint-toggle" onClick={() => setShowHint(showHint === 'form' ? null : 'form')}>
              {showHint === 'form' ? 'Close Hint' : 'Toggle Hint'}
            </button>
            {showHint === 'form' && (
              <div className="hint-box">
                <h5>Detailed Hint:</h5>
                <ul>
                  <li>Open with &lt;form&gt; and close with &lt;/form&gt;</li>
                  <li>Include &lt;input type="text"&gt; for username</li>
                  <li>Add &lt;button type="submit"&gt; for submission</li>
                  <li>Wrap inputs in labels or use "for" attribute</li>
                </ul>
              </div>
            )}
          </div>
          {result && <p className={`result ${result.includes('✅') ? 'success' : 'error'}`}>{result}</p>}
          {completedStages.includes('form') && <p className="success">✓ Stage 2 Completed | 50 pts</p>}
        </div>
      )}
      
      {stage >= 3 && (
        <div className="puzzle-stage">
          <h4>♿ Stage 3: Accessibility Features</h4>
          <p>Add accessibility to this image tag: &lt;img src="logo.png"&gt;</p>
          <div className="puzzle-input">
            <input 
              type="text" 
              value={answers.accessibilityAttr}
              onChange={(e) => handleAnswerChange('accessibilityAttr', e.target.value)}
              placeholder="Add accessibility attribute"
            />
            <button onClick={checkAccessibility}>Submit</button>
          </div>
          <div className="hint-section">
            <button className="hint-toggle" onClick={() => setShowHint(showHint === 'accessibility' ? null : 'accessibility')}>
              {showHint === 'accessibility' ? 'Close Hint' : 'Toggle Hint'}
            </button>
            {showHint === 'accessibility' && (
              <div className="hint-box">
                <h5>Detailed Hint:</h5>
                <ul>
                  <li>Descriptive "alt" attribute describes the image</li>
                  <li>"aria-label" for screen readers</li>
                  <li>"role" to define purpose (presentation, button)</li>
                  <li>Example: alt="Company Logo"</li>
                </ul>
              </div>
            )}
          </div>
          {result && <p className={`result ${result.includes('✅') ? 'success' : 'error'}`}>{result}</p>}
          {completedStages.includes('accessibility') && <p className="success">✓ Stage 3 Completed</p>}
        </div>
      )}
    </div>
  );
};

// CSS Designer Studio Game Component
const CSSDesignerGame = ({ onComplete }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [designElements, setDesignElements] = useState([
    { id: 1, x: 30, y: 40, type: 'flex', applied: false },
    { id: 2, x: 70, y: 60, type: 'grid', applied: false },
    { id: 3, x: 20, y: 80, type: 'animation', applied: false }
  ]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showHint, setShowHint] = useState(false);
  const [achievements, setAchievements] = useState([]);

  // Game timer
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameOver) {
      setGameOver(true);
      onComplete(score, "Layout Master");
    }
  }, [timeLeft, gameOver, score, onComplete]);

  const applyStyling = (direction) => {
    if (gameOver) return;
    
    setPosition(prev => {
      let newX = prev.x;
      let newY = prev.y;
      
      switch(direction) {
        case 'up': newY = Math.max(10, prev.y - 5); break;
        case 'down': newY = Math.min(90, prev.y + 5); break;
        case 'left': newX = Math.max(10, prev.x - 5); break;
        case 'right': newX = Math.min(90, prev.x + 5); break;
        default: break;
      }
      
      // Check proximity to styling elements
      const closeElements = designElements.filter(element => 
        Math.abs(newX - element.x) < 8 && Math.abs(newY - element.y) < 8
      );
      
      if (closeElements.length > 0) {
        const points = closeElements.length * 50;
        setScore(prev => prev + points);
        setDesignElements(prev => 
          prev.map(element => 
            closeElements.find(c => c.id === element.id) 
              ? {...element, applied: true} 
              : element
          )
        );
        
        // Achievement tracking
        if (designElements.filter(d => d.applied).length + closeElements.length === designElements.length) {
          setAchievements(prev => [...prev, "CSS Artist"]);
        }
      }
      
      return { x: newX, y: newY };
    });
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        applyStyling({
          'ArrowUp': 'up',
          'ArrowDown': 'down',
          'ArrowLeft': 'left',
          'ArrowRight': 'right'
        }[e.key]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="css-designer-game">
      <div className="game-info">
        <div>⏱️ Time: {timeLeft}s</div>
        <div>💰 Score: {score}</div>
        <button className="hint-toggle minimal" onClick={() => setShowHint(!showHint)}>
          {showHint ? 'Hide Hints' : 'Show Hints'}
        </button>
      </div>
      
      <div className="game-area">
        {/* Designer Element */}
        <div 
          className="designer-element" 
          style={{ left: `${position.x}%`, top: `${position.y}%` }}
        >
          💡
        </div>
        
        {/* Styling Elements */}
        {designElements.map(element => (
          <div 
            key={element.id}
            className={`design-element ${element.type} ${element.applied ? 'applied' : ''}`}
            style={{ left: `${element.x}%`, top: `${element.y}%` }}
          >
            {element.type === 'flex' && '📦'}
            {element.type === 'grid' && '🏁'}
            {element.type === 'animation' && '🎭'}
          </div>
        ))}
      </div>
      
      <div className="controls">
        <p>Use arrow keys to collect styling techniques</p>
        <div className="keyboard">
          <button onClick={() => applyStyling('up')} className="control-btn">↑</button>
          <div className="row">
            <button onClick={() => applyStyling('left')} className="control-btn">←</button>
            <button onClick={() => applyStyling('down')} className="control-btn">↓</button>
            <button onClick={() => applyStyling('right')} className="control-btn">→</button>
          </div>
        </div>
      </div>
      
      {showHint && (
        <div className="hint-box detailed">
          <h4>🎨 CSS Design Tips:</h4>
          <ul>
            <li><strong>Navigation:</strong> Use arrow keys or buttons to move</li>
            <li><strong>Collection:</strong> Gather styling elements (Flexbox 📦, Grid 🏁, Animation 🎭)</li>
            <li><strong>Scoring:</strong> Collect each element for 50 points</li>
            <li><strong>Time:</strong> Complete collection in 60 seconds</li>
            <li><strong>Achievement:</strong> Collect ALL elements for "CSS Artist"</li>
          </ul>
        </div>
      )}
      
      {gameOver && (
        <div className="game-over">
          <h3>Design Challenge Ended!</h3>
          <p>Final Score: <span className="score-value">{score}</span> points</p>
          {achievements.length > 0 && (
            <p className="achievement">🎖️ Achievement Unlocked: {achievements[0]}</p>
          )}
          <p><em>Press "Back to Hub" to try again</em></p>
        </div>
      )}
    </div>
  );
};

// JavaScript Logic Quest Game Component
const JSLogicGame = ({ onComplete }) => {
  const [challenges, setChallenges] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameActive, setGameActive] = useState(true);
  const [selectedConcepts, setSelectedConcepts] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [challengeLevel, setChallengeLevel] = useState(1);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);

  const jsConcepts = [
    { id: 1, type: 'variables', description: 'Declaring with let/const/var' },
    { id: 2, type: 'functions', description: 'Reusable code blocks' },
    { id: 3, type: 'arrays', description: 'Ordered data collections' },
    { id: 4, type: 'objects', description: 'Key-value data structures' },
    { id: 5, type: 'loops', description: 'Iteration constructs' },
    { id: 6, type: 'promises', description: 'Asynchronous operations' }
  ];

  const challengeTypes = [
    { id: 1, type: 'algorithm', complexity: 'high', points: 100, solvedBy: [2, 3, 5] },
    { id: 2, type: 'api', complexity: 'medium', points: 50, solvedBy: [1, 4, 6] },
    { id: 3, type: 'dom', complexity: 'medium', points: 50, solvedBy: [1, 2, 5] },
    { id: 4, type: 'data', complexity: 'low', points: 25, solvedBy: [3, 4] },
    { id: 5, type: 'event', complexity: 'medium', points: 50, solvedBy: [1, 5, 6] }
  ];

  // Generate challenges periodically with increasing difficulty
  useEffect(() => {
    if (!gameActive) return;
    
    const interval = 3000 - (challengeLevel * 200);
    
    const challengeInterval = setInterval(() => {
      const newChallenge = {
        id: Date.now(),
        challenge: challengeTypes[Math.floor(Math.random() * challengeTypes.length)],
        time: Math.max(5, 15 - challengeLevel)
      };
      setChallenges(prev => [...prev, newChallenge]);
    }, Math.max(500, interval));
    
    return () => clearInterval(challengeInterval);
  }, [gameActive, challengeLevel]);

  // Countdown challenges
  useEffect(() => {
    if (!gameActive || challenges.length === 0) return;
    
    const countdownInterval = setInterval(() => {
      setChallenges(prev => 
        prev.map(challenge => ({
          ...challenge,
          time: challenge.time - 1
        })).filter(challenge => {
          if (challenge.time <= 0) {
            setLives(l => {
              const newLives = l - 1;
              if (newLives <= 0) {
                setGameActive(false);
                onComplete(score, "JS Ninja");
              }
              return newLives;
            });
            setCombo(0);
            return false;
          }
          return true;
        })
      );
    }, 1000);
    
    return () => clearInterval(countdownInterval);
  }, [challenges, gameActive, score, onComplete]);

  // Difficulty progression
  useEffect(() => {
    if (score > 0 && score % 200 === 0) {
      setChallengeLevel(prev => Math.min(prev + 1, 10));
      setCombo(0);
    }
  }, [score]);

  // Track best combo
  useEffect(() => {
    if (combo > bestCombo) {
      setBestCombo(combo);
    }
  }, [combo, bestCombo]);

  const solveChallenge = (challengeId, concepts) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) return;
    
    const isSolved = challenge.challenge.solvedBy.some(conceptId => 
      concepts.includes(conceptId)
    );
    
    if (isSolved) {
      const pointsEarned = challenge.challenge.points * (combo + 1);
      setScore(prev => prev + pointsEarned);
      setCombo(prev => prev + 1);
    } else {
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameActive(false);
          onComplete(score, "JS Specialist");
        }
        return newLives;
      });
      setCombo(0);
    }
    
    setChallenges(prev => prev.filter(c => c.id !== challengeId));
    setSelectedConcepts([]);
  };

  const toggleConcept = (conceptId) => {
    setSelectedConcepts(prev => 
      prev.includes(conceptId) 
        ? prev.filter(id => id !== conceptId) 
        : [...prev, conceptId]
    );
  };

  return (
    <div className="js-game">
      <div className="game-header">
        <div>❤️ Lives: {lives}</div>
        <div>💰 Score: {score}</div>
        <div>🔥 Combo: {combo}x</div>
        <button className="hint-toggle minimal" onClick={() => setShowHint(!showHint)}>
          {showHint ? 'Hide Hints' : 'Show Hints'}
        </button>
      </div>
      
      <div className="concepts-panel">
        <h4>🔧 JS Concepts</h4>
        <p className="concepts-description">Select concepts to solve programming challenges</p>
        <div className="concepts-list">
          {jsConcepts.map(concept => (
            <div 
              key={concept.id} 
              className={`concept ${selectedConcepts.includes(concept.id) ? 'selected' : ''}`}
              onClick={() => toggleConcept(concept.id)}
            >
              <div className="concept-type">[{concept.type}]</div>
              <div className="concept-description">{concept.description}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="challenges-panel">
        <h4>🚀 Programming Challenges</h4>
        <p className="challenges-description">Apply concepts to solve logic problems!</p>
        <div className="challenges-list">
          {challenges.map(challenge => (
            <div key={challenge.id} className={`challenge ${challenge.challenge.complexity}`}>
              <div className="challenge-header">
                <div className="challenge-type">{challenge.challenge.type}</div>
                <div className="challenge-points">Points: {challenge.challenge.points}</div>
              </div>
              <div className="challenge-timer">⏱️ Time: {challenge.time}s</div>
              <button onClick={() => solveChallenge(challenge.id, selectedConcepts)}>
                SOLVE
              </button>
            </div>
          ))}
          
          {challenges.length === 0 && (
            <p className="no-challenges">✅ No active challenges. Ready for new ones... ✅</p>
          )}
        </div>
      </div>
      
      {showHint && (
        <div className="hint-box detailed">
          <h4>🔧 JavaScript Problem Solving:</h4>
          <ul>
            <li><strong>Concept Matching:</strong> Read challenge types and match with appropriate JS concepts</li>
            <li><strong>Complexities:</strong> High (purple) most points, Low (green) fewer points</li>
            <li><strong>Combos:</strong> Solve consecutively for bonus points</li>
            <li><strong>Progression:</strong> Every 200 points increases challenge frequency</li>
            <li><strong>Best Combo:</strong> Current record is {bestCombo}x consecutive solves</li>
          </ul>
        </div>
      )}
      
      {!gameActive && (
        <div className="game-over">
          <h3>Code Challenge Completed!</h3>
          <p>Final Score: <span className="score-value">{score}</span> points</p>
          <p>Best Combo: {bestCombo}x</p>
          <p><em>Press "Back to Hub" to restart</em></p>
        </div>
      )}
    </div>
  );
};

// Responsive Design Game Component
const ResponsiveDesignGame = ({ onComplete }) => {
  const [designs, setDesigns] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [gameActive, setGameActive] = useState(true);
  const [accuracy, setAccuracy] = useState(100);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [totalDesigns, setTotalDesigns] = useState(0);
  const [correctAdaptations, setCorrectAdaptations] = useState(0);

  const designSamples = [
    {
      id: 1,
      device: 'tablet',
      task: 'Fit content in portrait mode',
      isResponsive: true,
      issues: ['Overflowing images', 'Too-wide columns']
    },
    {
      id: 2,
      device: 'mobile',
      task: 'Optimize touch targets',
      isResponsive: false,
      issues: ['Small buttons', 'Dense layout']
    },
    {
      id: 3,
      device: 'desktop',
      task: 'Expand layout for large screen',
      isResponsive: true,
      issues: ['Cramped space', 'Tiny sidebar']
    },
    {
      id: 4,
      device: 'widescreen',
      task: 'Utilize extra screen real estate',
      isResponsive: true,
      issues: ['Wasted space', 'Misaligned elements']
    },
    {
      id: 5,
      device: 'foldable',
      task: 'Support crease adaptation',
      isResponsive: false,
      issues: ['Content split', 'Poor orientation handling']
    }
  ];

  // Generate designs
  useEffect(() => {
    if (!gameActive) return;
    
    const designInterval = setInterval(() => {
      const randomDesign = designSamples[Math.floor(Math.random() * designSamples.length)];
      setDesigns(prev => [...prev, { ...randomDesign, time: 15, id: Date.now() }]);
      setTotalDesigns(prev => prev + 1);
    }, Math.max(3000, 8000 - (score * 10)));
    
    return () => clearInterval(designInterval);
  }, [gameActive, score]);

  // Countdown designs
  useEffect(() => {
    if (!gameActive || designs.length === 0) return;
    
    const countdownInterval = setInterval(() => {
      setDesigns(prev => 
        prev.map(design => ({
          ...design,
          time: design.time - 1
        })).filter(design => {
          if (design.time <= 0) {
            if (!design.isResponsive) {
              setLives(l => l - 1);
              setStreak(0);
            }
            return false;
          }
          return true;
        })
      );
    }, 1000);
    
    return () => clearInterval(countdownInterval);
  }, [designs, gameActive]);

  // Check game over
  useEffect(() => {
    if (lives <= 0) {
      setGameActive(false);
      onComplete(score, accuracy >= 90 ? "Responsive Expert" : "UX Designer");
    }
  }, [lives, score, accuracy, onComplete]);

  const adaptDesign = (designId, isResponsive) => {
    const design = designs.find(d => d.id === designId);
    if (!design) return;
    
    const correctlyIdentified = (design.isResponsive && isResponsive) || 
                               (!design.isResponsive && !isResponsive);
    
    if (correctlyIdentified) {
      setScore(prev => prev + 50);
      setStreak(prev => prev + 1);
      setCorrectAdaptations(prev => prev + 1);
    } else {
      setLives(prev => prev - 1);
      setStreak(0);
    }
    
    // Update accuracy
    setAccuracy(Math.round(((correctAdaptations + (correctlyIdentified ? 1 : 0)) / (totalDesigns + 1)) * 100));
    
    setDesigns(prev => prev.filter(d => d.id !== designId));
  };

  return (
    <div className="responsive-game">
      <div className="game-header">
        <div>❤️ Lives: {lives}</div>
        <div>💰 Score: {score}</div>
        <div>📈 Accuracy: {accuracy}%</div>
        <div>🔥 Streak: {streak}x</div>
        <button className="hint-toggle minimal" onClick={() => setShowHint(!showHint)}>
          {showHint ? 'Hide Hints' : 'Show Hints'}
        </button>
      </div>
      
      <div className="design-lab">
        <h4>📱 Design Lab</h4>
        <p className="lab-description">Adapt layouts for different viewports quickly!</p>
        <div className="design-list">
          {designs.map(design => (
            <div key={design.id} className="design-card">
              <div className="design-header">
                <div className="device">{design.device}</div>
                <div className="timer">⏱️ {design.time}s</div>
              </div>
              <div className="design-task">Task: {design.task}</div>
              <div className="issues-list">
                {design.issues.map((issue, idx) => (
                  <span key={idx} className="issue">⚠️ {issue}</span>
                ))}
              </div>
              <div className="design-actions">
                <button 
                  className="responsive-btn" 
                  onClick={() => adaptDesign(design.id, true)}
                >
                  ✔ Responsive
                </button>
                <button 
                  className="broken-btn" 
                  onClick={() => adaptDesign(design.id, false)}
                >
                  ❌ Broken
                </button>
              </div>
            </div>
          ))}
          
          {designs.length === 0 && (
            <p className="no-designs">📭 No pending designs. Checking for new ones...</p>
          )}
        </div>
      </div>
      
      {showHint && (
        <div className="hint-box detailed">
          <h4>📱 Responsive Design Principles:</h4>
          <ul>
            <li><strong>Viewport Meta:</strong> Always include &lt;meta name="viewport"&gt;</li>
            <li><strong>CSS Media Queries:</strong> Adjust layout for different screen sizes</li>
            <li><strong>Flexible Grids:</strong> Use percentages or flexbox/grid instead of fixed widths</li>
            <li><strong>Scalable Images:</strong> Use max-width: 100% for media elements</li>
            <li><strong>Mobile First:</strong> Start with mobile styles and enhance for larger screens</li>
            <li><strong>Touch Targets:</strong> Ensure buttons are at least 44x44 pixels</li>
            <li><strong>Readability:</strong> Maintain readable text (16px minimum)</li>
          </ul>
          <p><strong>Current Stats:</strong> Adaptations: {totalDesigns}, Accuracy: {accuracy}%, Streak: {streak}x</p>
        </div>
      )}
      
      {!gameActive && (
        <div className="game-over">
          <h3>Design Lab Closed!</h3>
          <p>Final Score: <span className="score-value">{score}</span> points</p>
          <p>Adaptation Accuracy: {accuracy}%</p>
          <p><em>Press "Back to Hub" to play again</em></p>
        </div>
      )}
    </div>
  );
};

// Framework Mastery Game Component
const FrameworkMasteryGame = ({ onComplete }) => {
  const [project, setProject] = useState('');
  const [completeness, setCompleteness] = useState(0);
  const [attempts, setAttempts] = useState(5);
  const [componentsPerSecond, setComponentsPerSecond] = useState(5);
  const [timeToComplete, setTimeToComplete] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [buildingTime, setBuildingTime] = useState(0);
  const [buildHistory, setBuildHistory] = useState([]);

  const calculateCompleteness = (proj) => {
    let score = 0;
    
    // Feature checks
    if (proj.includes('state')) score += 20;
    if (proj.includes('props')) score += 20;
    if (proj.includes('hooks')) score += 20;
    if (proj.includes('router')) score += 15;
    if (proj.includes('api')) score += 15;
    if (proj.includes('test')) score += 10;
    
    // Completeness deductions
    if (/(.)\1{2,}/.test(proj)) score -= 20;
    if (/copy/i.test(proj)) score -= 10;
    
    return Math.min(100, Math.max(0, score));
  };

  const calculateCompletionTime = (proj) => {
    const complexityFactors = {
      state: 2,
      props: 1.5,
      hooks: 3,
      router: 4,
      api: 3.5,
      test: 2.5
    };
    
    let totalFactors = 0;
    Object.entries(complexityFactors).forEach(([factor, weight]) => {
      if (proj.toLowerCase().includes(factor)) {
        totalFactors += weight;
      }
    });
    
    const complexity = totalFactors * 20;
    const seconds = complexity / componentsPerSecond;
    
    return seconds;
  };

  const formatTime = (seconds) => {
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds/60)} minutes`;
    return `${Math.round(seconds/3600)} hours`;
  };

  const buildProject = () => {
    if (attempts <= 1) {
      setGameActive(false);
      onComplete(0, "Framework Novice");
      return;
    }
    
    setAttempts(prev => prev - 1);
    
    // Simulate build success
    const successChance = completeness / 100;
    const success = Math.random() < successChance / 5;
    
    if (success) {
      setGameActive(false);
      onComplete(200, "Framework Expert");
    } else {
      setBuildHistory(prev => [
        ...prev, 
        { attempt: 6 - attempts, completed: false, time: formatTime(timeToComplete) }
      ]);
    }
  };

  useEffect(() => {
    const completenessValue = calculateCompleteness(project);
    setCompleteness(completenessValue);
    
    const timeInSeconds = calculateCompletionTime(project);
    setTimeToComplete(timeInSeconds);
    setBuildingTime(formatTime(timeInSeconds));
  }, [project]);

  const getCompletenessLevel = () => {
    if (completeness >= 80) return { label: 'Production Ready', color: '#33cc33' };
    if (completeness >= 60) return { label: 'Well Structured', color: '#66cc66' };
    if (completeness >= 40) return { label: 'Functional', color: '#ffcc00' };
    if (completeness >= 20) return { label: 'Basic', color: '#ff9966' };
    return { label: 'Incomplete', color: '#ff4d4d' };
  };

  return (
    <div className="framework-game">
      <div className="game-header">
        <div className="attempts-left">🚧 Builds Remaining: {attempts}</div>
        <button className="hint-toggle minimal" onClick={() => setShowHint(!showHint)}>
          {showHint ? 'Hide Hints' : 'Show Hints'}
        </button>
      </div>
      
      {gameActive ? (
        <>
          <div className="project-challenge">
            <h3>⚛️ FRAMEWORK MASTERY</h3>
            <p className="instructions">Describe your project architecture to build it!</p>
            
            <div className="project-input-area">
              <textarea 
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="Describe your project features (e.g., user state management, API integration)"
                rows="5"
              />
              <div className="completeness-meter">
                <div 
                  className="completeness-fill" 
                  style={{
                    width: `${completeness}%`,
                    backgroundColor: getCompletenessLevel().color
                  }}
                ></div>
                <div className="completeness-label">
                  {getCompletenessLevel().label} ({completeness}/100)
                </div>
              </div>
            </div>
            
            <div className="stats-panel">
              <div className="stat">
                <span>🏗️ Build Time Est:</span>
                <span className="value">{buildingTime}</span>
              </div>
              <div className="stat">
                <span>⚡ Components/sec:</span>
                <span className="value">{componentsPerSecond}</span>
              </div>
              <div className="stat">
                <span>🏗️ Build Attempts:</span>
                <span className="value">{6-attempts}/5</span>
              </div>
            </div>
            
            <button 
              className="attempt-btn" 
              onClick={buildProject}
              disabled={attempts <= 0}
            >
              Start Build Process
            </button>
          </div>
          
          <div className="build-history">
            <h4>🔨 Build History</h4>
            {buildHistory.length > 0 ? (
              <ul>
                {buildHistory.map((entry, index) => (
                  <li key={index} className="history-entry">
                    <span>Build #{entry.attempt}:</span>
                    <span className={entry.completed ? 'success' : 'failed'}>
                      {entry.completed ? '✅ Completed!' : '❌ Failed'}
                    </span>
                    <span>Est time: {entry.time}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No builds recorded yet</p>
            )}
          </div>
          
          {showHint && (
            <div className="hint-box detailed">
              <h4>⚛️ Framework Best Practices:</h4>
              <ul>
                <li><strong>Component Architecture:</strong> Separate dumb/presentational from smart/components</li>
                <li><strong>State Management:</strong> Use Context API, Redux, or built-in solutions</li>
                <li><strong>Routing:</strong> Implement client-side routing for SPA behavior</li>
                <li><strong>Data Fetching:</strong> Integrate with REST/GraphQL APIs effectively</li>
                <li><strong>Testing:</strong> Include unit/integration tests (Jest, React Testing Library)</li>
                <li><strong>Performance:</strong> Optimize re-renders with memoization</li>
                <li><strong>Bundling:</strong> Use modern bundlers (Webpack, Vite, Parcel)</li>
                <li><strong>Ecosystem:</strong> Leverage community libraries appropriately</li>
              </ul>
              <p><strong>Current Project Quality:</strong> {completeness}% | Est completion time: {buildingTime}</p>
            </div>
          )}
        </>
      ) : (
        <div className="game-over">
          <h3>Project Status: {attempts <= 1 ? 'FAILED!' : 'SUCCESS!'}</h3>
          <p>Build Outcome: {attempts <= 1 ? 'Project incomplete' : 'App deployed successfully'}</p>
          <p>Score: {attempts > 1 ? '200 points awarded' : '0 points'}</p>
          <p><em>Press "Back to Hub" to try again</em></p>
        </div>
      )}
    </div>
  );
};

export default WebDevGamesHub;