// WebGames.jsx
import React, { useState, useEffect, useRef } from 'react';
import './WebGames.css';
import { playBackgroundMusic, stopBackgroundMusic } from '../utils/backgroundMusic';
import { playClickSound } from '../utils/clickSound';

// Import GIFs for game interactions

const layoutAnimation = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWNpc21jNDcxdjVlZmZoa3BiaGJ1OHIzbzM2bDBpaXU2YzIxc3NoMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9B7XwCQZRQfQs/giphy.gif";
const jsAnimation = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmd5cTIyamN4bGdyYWdhMGJqbXo2ajFvMWN1dmxsbGlpdTVxbmdkNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5e25aUTZPcI94uMZgv/giphy.gif`";
const responsiveAnimation = "https://media.giphy.com/media/f6hnhH1h4K1DvwuQKU/giphy.gif";
const deployAnimation = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWNpc21jNDcxdjVlZmZoa3BiaGJ1OHIzbzM2bDBpaXU2YzIxc3NoMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9B7XwCQZRQfQs/giphy.gif";

const WebGamesHub = ({ goBack }) => {
  const videoRef = useRef(null);
  const [activeGame, setActiveGame] = useState(null);
  const [gameData, setGameData] = useState({
    score: 0,
    level: 1,
    achievements: [],
    unlockedGames: ['markup']
  });
  const [showAchievements, setShowAchievements] = useState(false);

    
  const games = [
    {
      id: 'markup',
      title: 'Markup Master',
      description: 'Build HTML structures with semantic tags',
      gif: layoutAnimation ,
      component: <MarkupMasterGame onComplete={(score, achievement) => updateScore(score, achievement)} />
    },
    {
      id: 'styling',
      title: 'Style Studio',
      description: 'Create stunning layouts with CSS Flexbox and Grid',
      gif: layoutAnimation,
      locked: !gameData.unlockedGames.includes('styling'),
      component: <StyleStudioGame onComplete={(score, achievement) => updateScore(score, achievement)} />
    },
    {
      id: 'scripting',
      title: 'JavaScript Jungle',
      description: 'Solve coding challenges with JS logic',
      gif: jsAnimation,
      locked: !gameData.unlockedGames.includes('scripting'),
      component: <ScriptingChallengeGame onComplete={(score, achievement) => updateScore(score, achievement)} />
    },
    {
      id: 'responsive',
      title: 'Responsive Racer',
      description: 'Design adaptive layouts for all devices',
      gif: responsiveAnimation,
      locked: !gameData.unlockedGames.includes('responsive'),
      component: <ResponsiveDesignerGame onComplete={(score, achievement) => updateScore(score, achievement)} />
    },
    {
      id: 'deployment',
      title: 'Deployment Dash',
      description: 'Deploy websites to production servers',
      gif: deployAnimation,
      locked: !gameData.unlockedGames.includes('deployment'),
      component: <DeploymentDashGame onComplete={(score, achievement) => updateScore(score, achievement)} />
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

  // Background music controls
  useEffect(() => {
    // Start background music when component mounts
    playBackgroundMusic('games.mp3');

    // Stop music when component unmounts
    return () => {
      stopBackgroundMusic();
    };
  }, []);

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
    <div className="web-games-hub" style={{ marginTop: '240px' }}>
      {/* Background GIF */}
      <img
        className="background-video"
        src="/videos/gambg.gif"
        alt="Web Development Background Animation"
      />

      <header className="hub-header">
        <button className="back-btn" onClick={() => { playClickSound(); goBack(); }}>← Back to Home</button>

        <h1
          style={{
            color: "#f6f3f6ff",
            fontSize: "4rem",
            fontWeight: "900",
            textAlign: "center",
            marginTop: "20px",
            letterSpacing: "4px",
            fontFamily: "'Orbitron', sans-serif",
            textShadow: `
             
              2px 2px 4px rgba(0, 0, 0, 0.8)
            `
          }}
        >
          WEB DEV GAMES
        </h1>
      </header>

      <div className="player-stats-container">
        <div className="stat-badge">
          <span className="label">Level:</span>
          <span className="value">{gameData.level}</span>
        </div>
        <div className="stat-badge">
          <span className="label">Score:</span>
          <span className="value">{gameData.score}</span>
        </div>
        <div className="stat-badge achievements-badge" onClick={() => { playClickSound(); setShowAchievements(!showAchievements); }}>
          <span className="label">Achievements:</span>
          <span className="value">{gameData.achievements.length}</span>
        </div>
      </div>

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
      </footer>
    </div>
  );
};

// Markup Master Game Component
const MarkupMasterGame = ({ onComplete }) => {
  const [stage, setStage] = useState(1);
  const [completedStages, setCompletedStages] = useState([]);
  const [answers, setAnswers] = useState({
    formStructure: '',
    articleTags: '',
    navigationHTML: ''
  });
  const [result, setResult] = useState('');
  const [showHint, setShowHint] = useState(null);
  const [pointsAwarded, setPointsAwarded] = useState(0);

  const handleAnswerChange = (field, value) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const checkFormStructure = () => {
    if (answers.formStructure.toLowerCase().includes('<form') && 
        answers.formStructure.toLowerCase().includes('</form>') &&
        answers.formStructure.toLowerCase().includes('input')) {
      setCompletedStages([...completedStages, 'form']);
      setStage(2);
      setResult('✅ Correct! Proceed to stage 2...');
      setPointsAwarded(prev => prev + 50);
    } else {
      setResult('❌ Incorrect! Try again. Hint: Use semantic HTML tags');
    }
  };

  const checkArticleTags = () => {
    if (answers.articleTags.toLowerCase().includes('<article') && 
        answers.articleTags.toLowerCase().includes('</article>') &&
        answers.articleTags.toLowerCase().includes('<header') && 
        answers.articleTags.toLowerCase().includes('<footer')) {
      setCompletedStages([...completedStages, 'article']);
      setStage(3);
      setResult('✅ Well done! Proceed to final stage...');
      setPointsAwarded(prev => prev + 50);
    } else {
      setResult('❌ Not quite! Ensure you use proper semantic structure');
    }
  };

  const checkNavigationHTML = () => {
    if (answers.navigationHTML.toLowerCase().includes('<nav') && 
        answers.navigationHTML.toLowerCase().includes('</nav>') &&
        answers.navigationHTML.toLowerCase().includes('<ul') && 
        answers.navigationHTML.toLowerCase().includes('<li>')) {
      const finalScore = pointsAwarded + 100;
      onComplete(finalScore, "Markup Master!");
      setCompletedStages([...completedStages, 'navigation']);
      setResult(`✅ Markup mastery achieved! +${finalScore} points awarded!`);
      setTimeout(() => setPointsAwarded(0), 3000);
    } else {
      setResult('❌ Missing semantic elements. Try again!');
    }
  };

  return (
    <div className="markup-master-game">
      <h3>🎯 MARKUP MASTER</h3>
      <p className="instructions">Build proper HTML structures with semantic markup!</p>
      
      <div className="progress-tracker">
        {[1, 2, 3].map(num => (
          <div 
            key={num} 
            className={`step ${stage === num ? 'active' : ''} ${completedStages.includes(
              num === 1 ? 'form' : 
              num === 2 ? 'article' : 'navigation'
            ) ? 'completed' : ''}`}
          >
            Stage {num}
          </div>
        ))}
      </div>
      
      {stage >= 1 && (
        <div className="puzzle-stage">
          <h4>📋 Stage 1: Form Construction</h4>
          <p>Create a contact form with name, email, and message fields</p>
          <div className="puzzle-input">
            <textarea 
              value={answers.formStructure}
              onChange={(e) => handleAnswerChange('formStructure', e.target.value)}
              placeholder="Write HTML for a contact form"
              rows="4"
              cols="50"
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
                  <li>Use the &lt;form&gt; element to wrap everything</li>
                  <li>Include input elements with appropriate types</li>
                  <li>Add labels for accessibility</li>
                  <li>Don't forget the submit button</li>
                </ul>
              </div>
            )}
          </div>
          {result && <p className={`result ${result.includes('✅') ? 'success' : 'error'}`}>{result}</p>}
          {completedStages.includes('form') && <p className="success">✓ Stage 1 Completed | 50 pts</p>}
        </div>
      )}
      
      {stage >= 2 && (
        <div className="puzzle-stage">
          <h4>📄 Stage 2: Article Structure</h4>
          <p>Build a blog post with header, content, and footer</p>
          <div className="puzzle-input">
            <textarea 
              value={answers.articleTags}
              onChange={(e) => handleAnswerChange('articleTags', e.target.value)}
              placeholder="Write HTML for a blog article"
              rows="4"
              cols="50"
            />
            <button onClick={checkArticleTags}>Submit</button>
          </div>
          <div className="hint-section">
            <button className="hint-toggle" onClick={() => setShowHint(showHint === 'article' ? null : 'article')}>
              {showHint === 'article' ? 'Close Hint' : 'Toggle Hint'}
            </button>
            {showHint === 'article' && (
              <div className="hint-box">
                <h5>Detailed Hint:</h5>
                <ul>
                  <li>Wrap content in &lt;article&gt; tag</li>
                  <li>Use &lt;header&gt; for titles and metadata</li>
                  <li>&lt;section&gt; elements for content sections</li>
                  <li>&lt;footer&gt; for author info and dates</li>
                </ul>
              </div>
            )}
          </div>
          {result && <p className={`result ${result.includes('✅') ? 'success' : 'error'}`}>{result}</p>}
          {completedStages.includes('article') && <p className="success">✓ Stage 2 Completed | 50 pts</p>}
        </div>
      )}
      
      {stage >= 3 && (
        <div className="puzzle-stage">
          <h4>🧭 Stage 3: Navigation Menu</h4>
          <p>Create a semantic navigation menu for a website</p>
          <div className="puzzle-input">
            <textarea 
              value={answers.navigationHTML}
              onChange={(e) => handleAnswerChange('navigationHTML', e.target.value)}
              placeholder="Write HTML for site navigation"
              rows="4"
              cols="50"
            />
            <button onClick={checkNavigationHTML}>Submit</button>
          </div>
          <div className="hint-section">
            <button className="hint-toggle" onClick={() => setShowHint(showHint === 'navigation' ? null : 'navigation')}>
              {showHint === 'navigation' ? 'Close Hint' : 'Toggle Hint'}
            </button>
            {showHint === 'navigation' && (
              <div className="hint-box">
                <h5>Detailed Hint:</h5>
                <ul>
                  <li>Use &lt;nav&gt; element to define navigation</li>
                  <li>List items should be in &lt;ul&gt; and &lt;li&gt;</li>
                  <li>Clean hierarchy is important for accessibility</li>
                  <li>Semantic tags help screen readers</li>
                </ul>
              </div>
            )}
          </div>
          {result && <p className={`result ${result.includes('✅') ? 'success' : 'error'}`}>{result}</p>}
          {completedStages.includes('navigation') && <p className="success">✓ Stage 3 Completed</p>}
        </div>
      )}
    </div>
  );
};

// Style Studio Game Component
const StyleStudioGame = ({ onComplete }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [obstacles, setObstacles] = useState([
    { id: 1, x: 30, y: 40, type: 'grid', passed: false },
    { id: 2, x: 70, y: 60, type: 'flex', passed: false },
    { id: 3, x: 20, y: 80, type: 'position', passed: false }
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
      onComplete(score, "Layout Artist");
    }
  }, [timeLeft, gameOver, score, onComplete]);

  const moveDesigner = (direction) => {
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
      
      // Check collision
      const hit = obstacles.find(obs => 
        Math.abs(newX - obs.x) < 8 && Math.abs(newY - obs.y) < 8
      );
      
      if (hit) {
        setGameOver(true);
        onComplete(score, "Design Collision");
        return prev;
      }
      
      // Check if passed an obstacle
      const passed = obstacles.filter(obs => 
        !obs.passed && Math.abs(newX - obs.x) < 8 && Math.abs(newY - obs.y) < 8
      );
      
      if (passed.length > 0) {
        const points = passed.length * 50;
        setScore(prev => prev + points);
        setObstacles(prev => 
          prev.map(obs => 
            passed.find(p => p.id === obs.id) 
              ? {...obs, passed: true} 
              : obs
          )
        );
        
        // Achievement tracking
        if (obstacles.filter(o => o.passed).length + passed.length === obstacles.length) {
          setAchievements(prev => [...prev, "Perfect Layout"]);
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
        moveDesigner({
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
    <div className="style-studio-game">
      <div className="game-info">
        <div>⏱️ Time: {timeLeft}s</div>
        <div>💰 Score: {score}</div>
        <button className="hint-toggle minimal" onClick={() => setShowHint(!showHint)}>
          {showHint ? 'Hide Hints' : 'Show Hints'}
        </button>
      </div>
      
      <div className="game-area">
        {/* Designer */}
        <div 
          className="designer" 
          style={{ left: `${position.x}%`, top: `${position.y}%` }}
        >
          💻
        </div>
        
        {/* Obstacles */}
        {obstacles.map(obstacle => (
          <div 
            key={obstacle.id}
            className={`obstacle ${obstacle.type} ${obstacle.passed ? 'passed' : ''}`}
            style={{ left: `${obstacle.x}%`, top: `${obstacle.y}%` }}
          >
            {obstacle.type === 'grid' && '🔲'}
            {obstacle.type === 'flex' && '↔️'}
            {obstacle.type === 'position' && '📍'}
          </div>
        ))}
      </div>
      
      <div className="controls">
        <p>Use arrow keys to position elements correctly</p>
        <div className="keyboard">
          <button onClick={() => moveDesigner('up')} className="control-btn">↑</button>
          <div className="row">
            <button onClick={() => moveDesigner('left')} className="control-btn">←</button>
            <button onClick={() => moveDesigner('down')} className="control-btn">↓</button>
            <button onClick={() => moveDesigner('right')} className="control-btn">→</button>
          </div>
        </div>
      </div>
      
      {showHint && (
        <div className="hint-box detailed">
          <h4>🎨 Styling Tips:</h4>
          <ul>
            <li><strong>Navigation:</strong> Use arrow keys or buttons for movement</li>
            <li><strong>Layout Models:</strong> Avoid grid (🔲), flexbox (↔️), and positioning (📍) traps</li>
            <li><strong>Scoring:</strong> Pass each styling challenge for 50 points</li>
            <li><strong>Time:</strong> Complete layout tasks within 60 seconds</li>
            <li><strong>Achievement:</strong> Perfect all challenges for "Perfect Layout"</li>
          </ul>
        </div>
      )}
      
      {gameOver && (
        <div className="game-over">
          <h3>Design Session Over!</h3>
          <p>Final Score: <span className="score-value">{score}</span> points</p>
          {achievements.length > 0 && (
            <p className="achievement">🎖️ Achievement Unlocked: {achievements[0]}</p>
          )}
          <p><em>Press "Back to Hub" to redesign</em></p>
        </div>
      )}
    </div>
  );
};

// Scripting Challenge Game Component
const ScriptingChallengeGame = ({ onComplete }) => {
  const [challenges, setChallenges] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameActive, setGameActive] = useState(true);
  const [selectedFunctions, setSelectedFunctions] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [complexity, setComplexity] = useState(1);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);

  const scriptingFunctions = [
    { 
      id: 1, 
      name: 'arrayMethods', 
      usage: 'map/filter/reduce', 
      description: 'Transform arrays efficiently', 
      category: 'data' 
    },
    { 
      id: 2, 
      name: 'asyncHandling', 
      usage: 'Promises/async-await', 
      description: 'Handle asynchronous operations', 
      category: 'async' 
    },
    { 
      id: 3, 
      name: 'domManipulation', 
      usage: 'querySelector/update', 
      description: 'Interact with HTML elements', 
      category: 'ui' 
    },
    { 
      id: 4, 
      name: 'eventListeners', 
      usage: 'addEventListener', 
      description: 'Respond to user actions', 
      category: 'events' 
    },
    { 
      id: 5, 
      name: 'apiIntegration', 
      usage: 'fetch/axios', 
      description: 'Connect to web services', 
      category: 'network' 
    },
    { 
      id: 6, 
      name: 'objectDestructuring', 
      usage: 'const {a,b} = obj', 
      description: 'Extract object properties', 
      category: 'syntax' 
    }
  ];

  const challengeTypes = [
    { 
      id: 1, 
      type: 'DOM Manipulation', 
      difficulty: 'easy', 
      points: 1, 
      solvedBy: [3], 
      description: 'Update element text content' 
    },
    { 
      id: 2, 
      type: 'Array Transformation', 
      difficulty: 'medium', 
      points: 2, 
      solvedBy: [1], 
      description: 'Filter and map array data' 
    },
    { 
      id: 3, 
      type: 'API Integration', 
      difficulty: 'hard', 
      points: 3, 
      solvedBy: [5], 
      description: 'Fetch and display remote data' 
    },
    { 
      id: 4, 
      type: 'Event Handling', 
      difficulty: 'medium', 
      points: 2, 
      solvedBy: [4], 
      description: 'Add click event listener' 
    },
    { 
      id: 5, 
      type: 'Async Operations', 
      difficulty: 'hard', 
      points: 3, 
      solvedBy: [2], 
      description: 'Handle promise chains' 
    },
    { 
      id: 6, 
      type: 'Object Destructuring', 
      difficulty: 'easy', 
      points: 1, 
      solvedBy: [6], 
      description: 'Extract properties from objects' 
    }
  ];

  // Generate challenges periodically with increasing complexity
  useEffect(() => {
    if (!gameActive) return;
    
    const interval = 4000 - (complexity * 300);
    
    const challengeInterval = setInterval(() => {
      const newChallenge = {
        id: Date.now(),
        challenge: challengeTypes[Math.floor(Math.random() * challengeTypes.length)],
        time: Math.max(5, 15 - complexity)
      };
      setChallenges(prev => [...prev, newChallenge]);
    }, Math.max(500, interval));
    
    return () => clearInterval(challengeInterval);
  }, [gameActive, complexity]);

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
              const newLives = l - challenge.challenge.points;
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

  // Complexity progression
  useEffect(() => {
    if (score > 0 && score % 250 === 0) {
      setComplexity(prev => Math.min(prev + 1, 10));
      setCombo(0);
    }
  }, [score]);

  // Track best combo
  useEffect(() => {
    if (combo > bestCombo) {
      setBestCombo(combo);
    }
  }, [combo, bestCombo]);

  const solveChallenge = (challengeId, funcs) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) return;
    
    // Check if any selected function solves this challenge
    const isSolved = challenge.challenge.solvedBy.some(funcId => 
      funcs.includes(funcId)
    );
    
    if (isSolved) {
      const challengeScore = challenge.challenge.points * 10 * (combo + 1);
      setScore(prev => prev + challengeScore);
      setCombo(prev => {
        const newCombo = prev + 1;
        return newCombo;
      });
    } else {
      setLives(prev => {
        const newLives = prev - challenge.challenge.points;
        if (newLives <= 0) {
          setGameActive(false);
          onComplete(score, "JS Developer");
        }
        return newLives;
      });
      setCombo(0);
    }
    
    setChallenges(prev => prev.filter(c => c.id !== challengeId));
    setSelectedFunctions([]);
  };

  const toggleFunction = (funcId) => {
    setSelectedFunctions(prev => 
      prev.includes(funcId) 
        ? prev.filter(id => id !== funcId) 
        : [...prev, funcId]
    );
  };

  return (
    <div className="scripting-game">
      <div className="game-header">
        <div>❤️ Lives: {lives}</div>
        <div>💰 Score: {score}</div>
        <div>🔥 Combo: {combo}x</div>
        <button className="hint-toggle minimal" onClick={() => setShowHint(!showHint)}>
          {showHint ? 'Hide Hints' : 'Show Hints'}
        </button>
      </div>
      
      <div className="functions-panel">
        <h4>🔧 JavaScript Functions</h4>
        <p className="functions-description">Select functions to solve coding challenges</p>
        <div className="functions-list">
          {scriptingFunctions.map(func => (
            <div 
              key={func.id} 
              className={`function ${selectedFunctions.includes(func.id) ? 'selected' : ''} ${func.category}`}
              onClick={() => toggleFunction(func.id)}
            >
              <div className="function-name">{func.name}</div>
              <div className="function-usage">{func.usage}</div>
              <div className="function-description">{func.description}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="challenges-panel">
        <h4>🧩 Coding Challenges</h4>
        <p className="challenges-description">Solve challenges before time runs out!</p>
        <div className="challenges-list">
          {challenges.map(challenge => (
            <div key={challenge.id} className={`challenge ${challenge.challenge.difficulty}`}>
              <div className="challenge-header">
                <div className="challenge-type">{challenge.challenge.type}</div>
                <div className="challenge-points">Points: {challenge.challenge.points}x</div>
              </div>
              <div className="challenge-timer">⏱️ Time: {challenge.time}s</div>
              <div className="challenge-description">{challenge.challenge.description}</div>
              <button onClick={() => solveChallenge(challenge.id, selectedFunctions)}>
                SOLVE
              </button>
            </div>
          ))}
          
          {challenges.length === 0 && (
            <p className="no-challenges">✅ No active challenges. Waiting for tasks... ✅</p>
          )}
        </div>
      </div>
      
      {showHint && (
        <div className="hint-box detailed">
          <h4>🧠 Scripting Strategies:</h4>
          <ul>
            <li><strong>Function Selection:</strong> Read challenge descriptions and match with appropriate methods</li>
            <li><strong>Difficulties:</strong> Easy (green) gives 1 point, Hard (red) gives 3 points</li>
            <li><strong>Combos:</strong> Solve without missing to build combos for bonus points</li>
            <li><strong>Progression:</strong> Every 250 points increases challenge frequency and difficulty</li>
            <li><strong>Best Combo:</strong> Current record is {bestCombo}x consecutive solutions</li>
            <li><strong>Categories:</strong>
              <ul>
                <li><span className="category data">Data:</span> Array/object manipulation</li>
                <li><span className="category async">Async:</span> Promises and async operations</li>
                <li><span className="category ui">UI:</span> DOM updates and manipulation</li>
                <li><span className="category events">Events:</span> Event handling and listeners</li>
                <li><span className="category network">Network:</span> API calls and data fetching</li>
                <li><span className="category syntax">Syntax:</span> ES6+ features and shortcuts</li>
              </ul>
            </li>
          </ul>
        </div>
      )}
      
      {!gameActive && (
        <div className="game-over">
          <h3>Coding Session Ended!</h3>
          <p>Final Score: <span className="score-value">{score}</span> points</p>
          <p>Best Combo: {bestCombo}x</p>
          <p><em>Press "Back to Hub" to code again</em></p>
        </div>
      )}
    </div>
  );
};

// Responsive Designer Game Component
const ResponsiveDesignerGame = ({ onComplete }) => {
  const [devices, setDevices] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [gameActive, setGameActive] = useState(true);
  const [accuracy, setAccuracy] = useState(100);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [totalDevices, setTotalDevices] = useState(0);
  const [correctAdjustments, setCorrectAdjustments] = useState(0);

  const deviceSamples = [
    {
      id: 1,
      type: 'mobile',
      viewport: '320px',
      issue: 'Text too small on mobile',
      correctApproach: 'Use relative units like em/rem',
      solution: true
    },
    {
      id: 2,
      type: 'tablet',
      viewport: '768px',
      issue: 'Elements overlapping on tablet',
      correctApproach: 'Add media queries for breakpoints',
      solution: true
    },
    {
      id: 3,
      type: 'desktop',
      viewport: '1200px',
      issue: 'Fixed width breaking layout',
      correctApproach: 'Use percentage/max-width instead',
      solution: true
    },
    {
      id: 4,
      type: 'mobile',
      viewport: '375px',
      issue: 'Images overflowing container',
      correctApproach: 'Set max-width: 100% on images',
      solution: true
    },
    {
      id: 5,
      type: 'tablet',
      viewport: '1024px',
      issue: 'Navigation unusable on tablet',
      correctApproach: 'Implement hamburger menu pattern',
      solution: true
    }
  ];

  // Generate devices
  useEffect(() => {
    if (!gameActive) return;
    
    const deviceInterval = setInterval(() => {
      const randomDevice = deviceSamples[Math.floor(Math.random() * deviceSamples.length)];
      setDevices(prev => [...prev, { ...randomDevice, time: 15, id: Date.now() }]);
      setTotalDevices(prev => prev + 1);
    }, Math.max(3000, 8000 - (score * 10)));
    
    return () => clearInterval(deviceInterval);
  }, [gameActive, score]);

  // Countdown devices
  useEffect(() => {
    if (!gameActive || devices.length === 0) return;
    
    const countdownInterval = setInterval(() => {
      setDevices(prev => 
        prev.map(device => ({
          ...device,
          time: device.time - 1
        })).filter(device => {
          if (device.time <= 0) {
            if (!device.solution) {
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
  }, [devices, gameActive]);

  // Check game over
  useEffect(() => {
    if (lives <= 0) {
      setGameActive(false);
      onComplete(score, accuracy >= 90 ? "Responsiveness Expert" : "UI Designer");
    }
  }, [lives, score, accuracy, onComplete]);

  const fixLayout = (deviceId, isResponsive) => {
    const device = devices.find(d => d.id === deviceId);
    if (!device) return;
    
    const correctlyIdentified = (device.solution && isResponsive) || 
                               (!device.solution && !isResponsive);
    
    if (correctlyIdentified) {
      setScore(prev => prev + 50);
      setStreak(prev => prev + 1);
      setCorrectAdjustments(prev => prev + 1);
    } else {
      setLives(prev => prev - 1);
      setStreak(0);
    }
    
    // Update accuracy
    setAccuracy(Math.round(((correctAdjustments + (correctlyIdentified ? 1 : 0)) / (totalDevices + 1)) * 100));
    
    setDevices(prev => prev.filter(d => d.id !== deviceId));
  };

  return (
    <div className="responsive-designer-game">
      <div className="game-header">
        <div>❤️ Lives: {lives}</div>
        <div>💰 Score: {score}</div>
        <div>📈 Accuracy: {accuracy}%</div>
        <div>🔥 Streak: {streak}x</div>
        <button className="hint-toggle minimal" onClick={() => setShowHint(!showHint)}>
          {showHint ? 'Hide Hints' : 'Show Hints'}
        </button>
      </div>
      
      <div className="design-screen">
        <h4>📱 Device Testing Lab</h4>
        <p className="screen-description">Identify and fix responsive design issues!</p>
        <div className="device-list">
          {devices.map(device => (
            <div key={device.id} className="device-card">
              <div className="device-header">
                <div className="device-type">
                  {device.type === 'mobile' && '📱'}
                  {device.type === 'tablet' && '💻'}
                  {device.type === 'desktop' && '🖥️'} {device.type}
                </div>
                <div className="viewport-size">{device.viewport}</div>
                <div className="timer">⏱️ {device.time}s</div>
              </div>
              <div className="issue-description">
                <div className="issue">⚠️ Issue: {device.issue}</div>
                <div className="solution">💡 Fix: {device.correctApproach}</div>
              </div>
              <div className="device-actions">
                <button 
                  className="fix-btn" 
                  onClick={() => fixLayout(device.id, true)}
                >
                  🔧 Apply Fix
                </button>
                <button 
                  className="review-btn" 
                  onClick={() => fixLayout(device.id, false)}
                >
                  👁️ Review Later
                </button>
              </div>
            </div>
          ))}
          
          {devices.length === 0 && (
            <p className="no-devices">📭 No layout issues detected. Great job!</p>
          )}
        </div>
      </div>
      
      {showHint && (
        <div className="hint-box detailed">
          <h4>📐 Responsive Design Principles:</h4>
          <ul>
            <li><strong>Mobile First:</strong> Start with small screens then scale up</li>
            <li><strong>Flexible Units:</strong> Use %, em, rem instead of fixed px values</li>
            <li><strong>Media Queries:</strong> Set breakpoints for different viewports</li>
            <li><strong>Scalable Images:</strong> Use max-width: 100% for media</li>
            <li><strong>Touch Targets:</strong> Make buttons large enough for fingers (min 44px)</li>
            <li><strong>Viewport Meta:</strong> Include &lt;meta name="viewport"&gt; tag</li>
            <li><strong>CSS Grid/Flexbox:</strong> Modern layout techniques for responsiveness</li>
          </ul>
          <p><strong>Current Stats:</strong> Devices tested: {totalDevices}, Accuracy: {accuracy}%, Streak: {streak}x</p>
        </div>
      )}
      
      {!gameActive && (
        <div className="game-over">
          <h3>Design QA Session Complete!</h3>
          <p>Final Score: <span className="score-value">{score}</span> points</p>
          <p>Design Accuracy: {accuracy}%</p>
          <p><em>Press "Back to Hub" to test more layouts</em></p>
        </div>
      )}
    </div>
  );
};

// Deployment Dash Game Component
const DeploymentDashGame = ({ onComplete }) => {
  const [code, setCode] = useState('');
  const [buildStatus, setBuildStatus] = useState('idle');
  const [deploySteps, setDeploySteps] = useState(3);
  const [attempts, setAttempts] = useState(5);
  const [gameActive, setGameActive] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [buildTime, setBuildTime] = useState(0);
  const [deploymentHistory, setDeploymentHistory] = useState([]);

  const deploymentOptions = [
    { step: 1, title: 'Lint Code', description: 'Check for syntax errors', duration: 2000 },
    { step: 2, title: 'Run Tests', description: 'Execute unit/integration tests', duration: 3000 },
    { step: 3, title: 'Optimize Assets', description: 'Minify CSS/JS and compress images', duration: 4000 },
    { step: 4, title: 'Build Project', description: 'Compile and bundle resources', duration: 5000 },
    { step: 5, title: 'Deploy Assets', description: 'Upload to CDN', duration: 3000 }
  ];

  const simulateBuildProcess = () => {
    if (attempts <= 1) {
      setGameActive(false);
      onComplete(0, "Deployment Failed");
      return;
    }

    setAttempts(prev => prev - 1);
    setBuildStatus('building');
    setBuildTime(0);

    // Simulate deployment process
    let totalTime = 0;
    deploymentOptions.forEach(option => {
      totalTime += option.duration;
    });

    setBuildTime(totalTime / 1000);

    // After build simulation completes
    setTimeout(() => {
      const buildSuccess = Math.random() > 0.3; // 70% success rate
      
      if (buildSuccess) {
        setBuildStatus('success');
        setGameActive(false);
        onComplete(200, "DevOps Master");
        setDeploymentHistory(prev => [...prev, {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          status: 'success',
          buildTime: (totalTime / 1000).toFixed(1),
          steps: deploySteps
        }]);
      } else {
        setBuildStatus('failed');
        setDeploymentHistory(prev => [...prev, {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          status: 'failed',
          error: 'Build failed at optimization step',
          steps: deploySteps
        }]);
      }
    }, totalTime);
  };

  const adjustStep = (change) => {
    setDeploySteps(prev => Math.max(1, Math.min(5, prev + change)));
  };

  return (
    <div className="deployment-game">
      <div className="game-header">
        <div className="attempts-left">⚙️ Attempts Left: {attempts}</div>
        <button className="hint-toggle minimal" onClick={() => setShowHint(!showHint)}>
          {showHint ? 'Hide Hints' : 'Show Hints'}
        </button>
      </div>
      
      {gameActive ? (
        <>
          <div className="deployment-challenge">
            <h3>🚀 DEPLOYMENT DASH</h3>
            <p className="instructions">Configure your deployment pipeline for successful release!</p>
            
            <div className="code-editor">
              <textarea 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your clean code here..."
                rows="6"
                cols="60"
              />
            </div>
            
            <div className="pipeline-config">
              <h4>🛠️ Deployment Pipeline Configuration</h4>
              <div className="*steps-control">
                <button onClick={() => adjustStep(-1)} disabled={deploySteps <= 1}>⬅️ Fewer Steps</button>
                <span className="steps-display">Pipeline Steps: {deploySteps}</span>
                <button onClick={() => adjustStep(1)} disabled={deploySteps >= 5}>More Steps ➡️</button>
              </div>
              
              <div className="pipeline-steps">
                {deploymentOptions.slice(0, deploySteps).map(option => (
                  <div key={option.step} className="pipeline-step">
                    <div className="step-number">Step {option.step}</div>
                    <div className="step-title">{option.title}</div>
                    <div className="step-description">{option.description}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="stats-panel">
              <div className="stat">
                <span>⏱️ Estimated Build Time:</span>
                <span className="value">{buildTime.toFixed(1)}s</span>
              </div>
              <div className="stat">
                <span>🔁 Deployment Attempts:</span>
                <span className="value">{6-attempts}/5</span>
              </div>
            </div>
            
            <button 
              className="deploy-btn" 
              onClick={simulateBuildProcess}
              disabled={buildStatus === 'building' || attempts <= 0}
            >
              {buildStatus === 'building' ? '📦 Deploying...' : '🚀 Start Deployment'}
            </button>
          </div>
          
          <div className="deployment-history">
            <h4>📜 Deployment History</h4>
            {deploymentHistory.length > 0 ? (
              <ul>
                {deploymentHistory.map((entry, index) => (
                  <li key={index} className="history-entry">
                    <span>[{entry.timestamp}]</span>
                    <span className={entry.status}>
                      {entry.status === 'success' ? '✅ Success' : '❌ Failed'}
                    </span>
                    {entry.buildTime && <span>({entry.buildTime}s build)</span>}
                    {entry.error && <span>Error: {entry.error}</span>}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No deployments yet. Ready for your first launch?</p>
            )}
          </div>
          
          {showHint && (
            <div className="hint-box detailed">
              <h4>🌐 Deployment Best Practices:</h4>
              <ul>
                <li><strong>Code Quality:</strong> Lint before deploying to catch syntax errors</li>
                <li><strong>Testing:</strong> Run automated tests to prevent regressions</li>
                <li><strong>Optimization:</strong> Minify assets and compress resources</li>
                <li><strong>CI/CD:</strong> Automate builds and deployments</li>
                <li><strong>Rollbacks:</strong> Always have a quick rollback plan</li>
                <li><strong>Monitoring:</strong> Track performance and errors post-deploy</li>
                <li><strong>Blue-Green:</strong> Deploy to alternate environment first</li>
                <li><strong>Canary Releases:</strong> Roll out to subset of users first</li>
              </ul>
              <p><strong>Current Pipeline:</strong> {deploySteps} steps | Est. time: {buildTime.toFixed(1)}s</p>
            </div>
          )}
        </>
      ) : (
        <div className="game-over">
          <h3>Deployment Status: {buildStatus === 'success' ? 'SUCCESS!' : 'FAILED!'}</h3>
          <p>Outcome: {buildStatus === 'success' ? 'Application deployed successfully' : 'Deployment encountered errors'}</p>
          <p>Score: {buildStatus === 'success' ? '200 points awarded' : '0 points'}</p>
          <p><em>Press "Back to Hub" to deploy again</em></p>
        </div>
      )}
    </div>
  );
};

export default WebGamesHub;