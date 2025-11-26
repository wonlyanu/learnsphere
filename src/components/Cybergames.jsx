// CyberGamesHub.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Cybergames.css';
import { playBackgroundMusic, playBackgroundMusicNoFile, stopBackgroundMusic, pauseBackgroundMusic, resumeBackgroundMusic, playSuccessSound } from '../utils/backgroundMusic';

// Import GIFs for game interactions
const fireAnimation = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWNpc21jNDcxdjVlZmZoa3BiaGJ1OHIzbzM2bDBpaXU2YzIxc3NoMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9B7XwCQZRQfQs/giphy.gif";
const lockAnimation = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmd5cTIyamN4bGdyYWdhMGJqbXo2ajFvMWN1dmxsbGlpdTVxbmdkNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5e25aUTZPcI94uMZgv/giphy.gif";
const shieldAnimation = "https://media.giphy.com/media/WoWm8YzFQJg5W/giphy.gif";
const hackerAnimation = "https://media.giphy.com/media/3o7qE1YN7aBOFPRw8E/giphy.gif";
const balloonAnimation = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWNpc21jNDcxdjVlZmZoa3BiaGJ1OHIzbzM2bDBpaXU2YzIxc3NoMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9B7XwCQZRQfQs/giphy.gif";


const CyberGamesHub = ({ goBack }) => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [activeGame, setActiveGame] = useState(null);
  const [gameData, setGameData] = useState({
    score: 0,
    level: 1,
    achievements: [],
    unlockedGames: ['escape']
  });
  const [showAchievements, setShowAchievements] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicPaused, setMusicPaused] = useState(false);

    
  const games = [
    {
      id: 'escape',
      title: 'Cyber Escape Room',
      description: 'Solve puzzles to escape the digital facility',
      gif: fireAnimation,
      component: <CyberEscapeRoom onComplete={(score, achievement) => updateScore(score, achievement)} />
    },
    {
      id: 'balloon',
      title: 'Cyber Hot Balloon',
      description: 'Navigate through airspace avoiding cyber threats',
     
      gif: balloonAnimation,
      locked: !gameData.unlockedGames.includes('balloon'),
      component: <CyberBalloonGame onComplete={(score, achievement) => updateScore(score, achievement)} />
    },
    {
      id: 'firewall',
      title: 'Firewall Defender',
      description: 'Block incoming cyber attacks in real-time',
      
      gif: shieldAnimation,
      locked: !gameData.unlockedGames.includes('firewall'),
      component: <FirewallDefenderGame onComplete={(score, achievement) => updateScore(score, achievement)} />
    },
    {
      id: 'phishing',
      title: 'Phishing Hunter',
      description: 'Identify malicious emails before they cause damage',
     
      gif: hackerAnimation,
      locked: !gameData.unlockedGames.includes('phishing'),
      component: <PhishingHunterGame onComplete={(score, achievement) => updateScore(score, achievement)} />
    },
    {
      id: 'password',
      title: 'Password Fortress',
      description: 'Protect accounts against brute force attacks',
   
      gif: lockAnimation,
      locked: !gameData.unlockedGames.includes('password'),
      component: <PasswordFortressGame onComplete={(score, achievement) => updateScore(score, achievement)} />
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

  // Auto-play background music when component mounts
  useEffect(() => {
    playBackgroundMusicNoFile();
    setMusicPlaying(true);

    // Stop music when component unmounts
    return () => {
      stopBackgroundMusic();
    };
  }, []);

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

      // Play success sound when level increases
      if (newLevel > prev.level) {
        playSuccessSound();
      }

      return {
        ...prev,
        score: newScore,
        level: newLevel,
        achievements: newAchievements
      };
    });
  };

  const toggleMusic = () => {
    if (musicPlaying) {
      pauseBackgroundMusic();
      setMusicPlaying(false);
      setMusicPaused(true);
    } else {
      if (musicPaused) {
        resumeBackgroundMusic();
        setMusicPaused(false);
      } else {
        playBackgroundMusicNoFile();
      }
      setMusicPlaying(true);
    }
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
    <div className="cyber-games-hub">
      {/* Background GIF */}
      <img
        className="background-video"
        src="/videos/gamebg.gif"
        alt="Games Background Animation"
      />

<header className="hub-header">
  <button className="back-btn" onClick={goBack}>← Back to Home</button>
  <button className="music-toggle-btn" onClick={toggleMusic}>
    {musicPlaying ? '🔊' : '🔇'}
  </button>

  <h1
    style={{
      fontcolor: "#f0c0f8ff",
      fontSize: "4rem",
      fontWeight: "900",
      textAlign: "center",
      marginTop: "20px",
      letterSpacing: "4px",        // wide futuristic text
      fontFamily: "'Orbitron', sans-serif", // futuristic font
      textShadow: `


        2px 2px 4px rgba(52, 11, 52, 0.8)   /* outer outline */
      `
    }}
  >
    CYBER SECURE GAMES
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
        <div className="stat-badge achievements-badge" onClick={() => setShowAchievements(!showAchievements)}>
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

// Escape Room Game Component
const CyberEscapeRoom = ({ onComplete }) => {
  const [stage, setStage] = useState(1);
  const [completedStages, setCompletedStages] = useState([]);
  const [answers, setAnswers] = useState({
    password: '',
    cipher: '',
    checksum: ''
  });
  const [result, setResult] = useState('');
  const [showHint, setShowHint] = useState(null);
  const [pointsAwarded, setPointsAwarded] = useState(0);

  const handleAnswerChange = (field, value) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const checkPassword = () => {
    if (answers.password.toLowerCase() === 'cybersecurity') {
      setCompletedStages([...completedStages, 'password']);
      setStage(2);
      setResult('✅ Correct! Proceed to stage 2...');
      setPointsAwarded(prev => prev + 50);
    } else {
      setResult('❌ Incorrect! Try again.');
    }
  };

  const checkCipher = () => {
    if (answers.cipher.toLowerCase() === 'base64') {
      setCompletedStages([...completedStages, 'cipher']);
      setStage(3);
      setResult('✅ Well done! Proceed to final stage...');
      setPointsAwarded(prev => prev + 50);
    } else {
      setResult('❌ Not quite! Try again.');
    }
  };

  const checkChecksum = () => {
    if (answers.checksum === '14532') {
      const finalScore = pointsAwarded + 100;
      onComplete(finalScore, "Escaped the Facility!");
      setCompletedStages([...completedStages, 'checksum']);
      setResult(`✅ Escape successful! +${finalScore} points awarded!`);
      setTimeout(() => setPointsAwarded(0), 3000);
    } else {
      setResult('❌ Invalid checksum!');
    }
  };

  return (
    <div className="escape-room-game">
      <h3>🔐 CYBER ESCAPE ROOM</h3>
      <p className="instructions">Solve each puzzle to escape the digital facility!</p>
      
      <div className="progress-tracker">
        {[1, 2, 3].map(num => (
          <div 
            key={num} 
            className={`step ${stage === num ? 'active' : ''} ${completedStages.includes(
              num === 1 ? 'password' : 
              num === 2 ? 'cipher' : 'checksum'
            ) ? 'completed' : ''}`}
          >
            Stage {num}
          </div>
        ))}
      </div>
      
      {stage >= 1 && (
        <div className="puzzle-stage">
          <h4>🔒 Stage 1: Master Password</h4>
          <p>Find the master password to unlock the terminal</p>
          <div className="puzzle-input">
            <input 
              type="text" 
              value={answers.password}
              onChange={(e) => handleAnswerChange('password', e.target.value)}
              placeholder="Enter password"
            />
            <button onClick={checkPassword}>Submit</button>
          </div>
          <div className="hint-section">
            <button className="hint-toggle" onClick={() => setShowHint(showHint === 'password' ? null : 'password')}>
              {showHint === 'password' ? 'Close Hint' : 'Toggle Hint'}
            </button>
            {showHint === 'password' && (
              <div className="hint-box">
                <h5>Detailed Hint:</h5>
                <ul>
                  <li>Think about what field we're working in</li>
                  <li>Combine "cyber" with "security" (camelCase)</li>
                  <li>Case sensitivity matters - try lowercase</li>
                  <li>Check your spelling carefully</li>
                </ul>
              </div>
            )}
          </div>
          {result && <p className={`result ${result.includes('✅') ? 'success' : 'error'}`}>{result}</p>}
          {completedStages.includes('password') && <p className="success">✓ Stage 1 Completed | 50 pts</p>}
        </div>
      )}
      
      {stage >= 2 && (
        <div className="puzzle-stage">
          <h4>🔍 Stage 2: Cipher Decoder</h4>
          <p>What cipher is this? <strong>Q3liZXI=</strong></p>
          <div className="puzzle-input">
            <input 
              type="text" 
              value={answers.cipher}
              onChange={(e) => handleAnswerChange('cipher', e.target.value)}
              placeholder="Enter cipher type"
            />
            <button onClick={checkCipher}>Submit</button>
          </div>
          <div className="hint-section">
            <button className="hint-toggle" onClick={() => setShowHint(showHint === 'cipher' ? null : 'cipher')}>
              {showHint === 'cipher' ? 'Close Hint' : 'Toggle Hint'}
            </button>
            {showHint === 'cipher' && (
              <div className="hint-box">
                <h5>Detailed Hint:</h5>
                <ul>
                  <li>The equals sign (=) is a clue</li>
                  <li>It starts with "ba" - think alphabetically</li>
                  <li>Commonly used for embedding data in URLs</li>
                  <li>Three letters, ends with "se64"</li>
                </ul>
              </div>
            )}
          </div>
          {result && <p className={`result ${result.includes('✅') ? 'success' : 'error'}`}>{result}</p>}
          {completedStages.includes('cipher') && <p className="success">✓ Stage 2 Completed | 50 pts</p>}
        </div>
      )}
      
      {stage >= 3 && (
        <div className="puzzle-stage">
          <h4>🧮 Stage 3: Checksum Validation</h4>
          <p>Calculate MD5("Secure")+SHA1("Room") mod 100000</p>
          <div className="puzzle-input">
            <input 
              type="number" 
              value={answers.checksum}
              onChange={(e) => handleAnswerChange('checksum', e.target.value)}
              placeholder="Enter checksum"
            />
            <button onClick={checkChecksum}>Submit</button>
          </div>
          <div className="hint-section">
            <button className="hint-toggle" onClick={() => setShowHint(showHint === 'checksum' ? null : 'checksum')}>
              {showHint === 'checksum' ? 'Close Hint' : 'Toggle Hint'}
            </button>
            {showHint === 'checksum' && (
              <div className="hint-box">
                <h5>Detailed Hint:</h5>
                <ul>
                  <li>Use a hash calculator tool</li>
                  <li>MD5 produces a 32-character hex string</li>
                  <li>SHA1 produces a 40-character hex string</li>
                  <li>Add the decimal values together then mod by 100000</li>
                  <li>Example: md5 of "test" is 098F6BCD4621D373CADE4E832627B4F6</li>
                </ul>
              </div>
            )}
          </div>
          {result && <p className={`result ${result.includes('✅') ? 'success' : 'error'}`}>{result}</p>}
          {completedStages.includes('checksum') && <p className="success">✓ Stage 3 Completed</p>}
        </div>
      )}
    </div>
  );
};

// Hot Balloon Game Component
const CyberBalloonGame = ({ onComplete }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [obstacles, setObstacles] = useState([
    { id: 1, x: 30, y: 40, type: 'worm', passed: false },
    { id: 2, x: 70, y: 60, type: 'phish', passed: false },
    { id: 3, x: 20, y: 80, type: 'malware', passed: false }
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
      onComplete(score, "Airspace Navigator");
    }
  }, [timeLeft, gameOver, score, onComplete]);

  const moveBalloon = (direction) => {
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
        onComplete(score, "Balloon Destroyed");
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
          setAchievements(prev => [...prev, "Perfect Flight"]);
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
        moveBalloon({
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
    <div className="hot-balloon-game">
      <div className="game-info">
        <div>⏱️ Time: {timeLeft}s</div>
        <div>💰 Score: {score}</div>
        <button className="hint-toggle minimal" onClick={() => setShowHint(!showHint)}>
          {showHint ? 'Hide Hints' : 'Show Hints'}
        </button>
      </div>
      
      <div className="game-area">
        {/* Balloon */}
        <div 
          className="balloon" 
          style={{ left: `${position.x}%`, top: `${position.y}%` }}
        >
          🎈
        </div>
        
        {/* Obstacles */}
        {obstacles.map(obstacle => (
          <div 
            key={obstacle.id}
            className={`obstacle ${obstacle.type} ${obstacle.passed ? 'passed' : ''}`}
            style={{ left: `${obstacle.x}%`, top: `${obstacle.y}%` }}
          >
            {obstacle.type === 'worm' && '🐛'}
            {obstacle.type === 'phish' && '🎣'}
            {obstacle.type === 'malware' && '🦠'}
          </div>
        ))}
      </div>
      
      <div className="controls">
        <p>Use arrow keys to navigate through cyber airspace</p>
        <div className="keyboard">
          <button onClick={() => moveBalloon('up')} className="control-btn">↑</button>
          <div className="row">
            <button onClick={() => moveBalloon('left')} className="control-btn">←</button>
            <button onClick={() => moveBalloon('down')} className="control-btn">↓</button>
            <button onClick={() => moveBalloon('right')} className="control-btn">→</button>
          </div>
        </div>
      </div>
      
      {showHint && (
        <div className="hint-box detailed">
          <h4>🎮 Gameplay Tips:</h4>
          <ul>
            <li><strong>Navigation:</strong> Use arrow keys or buttons for movement</li>
            <li><strong>Obstacles:</strong> Avoid worms (🐛), phishing hooks (🎣), and viruses (🦠)</li>
            <li><strong>Scoring:</strong> Pass each obstacle for 50 points</li>
            <li><strong>Time:</strong> Survive for the full 60 seconds</li>
            <li><strong>Achievement:</strong> Avoid ALL obstacles for "Perfect Flight"</li>
          </ul>
        </div>
      )}
      
      {gameOver && (
        <div className="game-over">
          <h3>Flight Ended!</h3>
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

// Firewall Defender Game Component
const FirewallDefenderGame = ({ onComplete }) => {
  const [attacks, setAttacks] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameActive, setGameActive] = useState(true);
  const [selectedRules, setSelectedRules] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [attackPower, setAttackPower] = useState(1); // Increases every 5 attacks
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);

  const firewallRules = [
    { id: 1, type: 'allow', protocol: 'TCP', port: 443, description: 'HTTPS traffic', category: 'essential' },
    { id: 2, type: 'block', protocol: 'UDP', port: 53, description: 'DNS exfiltration', category: 'security' },
    { id: 3, type: 'allow', protocol: 'TCP', port: 80, description: 'HTTP traffic', category: 'essential' },
    { id: 4, type: 'block', protocol: 'ICMP', description: 'Ping floods', category: 'protection' },
    { id: 5, type: 'allow', protocol: 'TCP', port: 22, description: 'SSH access', category: 'admin' },
    { id: 6, type: 'block', protocol: 'any', port: 23, description: 'Telnet (insecure)', category: 'security' }
  ];

  const attackTypes = [
    { id: 1, type: 'DDoS', severity: 'critical', power: 3, blockedBy: [2, 4], description: 'Distributed Denial of Service' },
    { id: 2, type: 'Malware', severity: 'high', power: 2, blockedBy: [2, 6], description: 'Malicious software' },
    { id: 3, type: 'Port Scan', severity: 'medium', power: 1, blockedBy: [1, 3, 5], description: 'Port scanning activity' },
    { id: 4, type: 'Brute Force', severity: 'high', power: 2, blockedBy: [5, 6], description: 'Password guessing attack' },
    { id: 5, type: 'Phishing', severity: 'low', power: 1, blockedBy: [2], description: 'Social engineering attempt' }
  ];

  // Generate attacks periodically with increasing difficulty
  useEffect(() => {
    if (!gameActive) return;
    
    const interval = 4000 - (attackPower * 300); // Faster attacks as power increases
    
    const attackInterval = setInterval(() => {
      const newAttack = {
        id: Date.now(),
        attack: attackTypes[Math.floor(Math.random() * attackTypes.length)],
        time: Math.max(5, 15 - attackPower) // Less time as game progresses
      };
      setAttacks(prev => [...prev, newAttack]);
    }, Math.max(500, interval));
    
    return () => clearInterval(attackInterval);
  }, [gameActive, attackPower]);

  // Countdown attacks
  useEffect(() => {
    if (!gameActive || attacks.length === 0) return;
    
    const countdownInterval = setInterval(() => {
      setAttacks(prev => 
        prev.map(attack => ({
          ...attack,
          time: attack.time - 1
        })).filter(attack => {
          if (attack.time <= 0) {
            setLives(l => {
              const newLives = l - attack.attack.power;
              if (newLives <= 0) {
                setGameActive(false);
                onComplete(score, "Network Guardian");
              }
              return newLives;
            });
            setCombo(0); // Reset combo on miss
            return false;
          }
          return true;
        })
      );
    }, 1000);
    
    return () => clearInterval(countdownInterval);
  }, [attacks, gameActive, score, onComplete]);

  // Difficulty progression
  useEffect(() => {
    if (score > 0 && score % 250 === 0) {
      setAttackPower(prev => Math.min(prev + 1, 10)); // Cap at 10x speed
      setCombo(0); // Reset combo when level advances
    }
  }, [score]);

  // Track best combo
  useEffect(() => {
    if (combo > bestCombo) {
      setBestCombo(combo);
    }
  }, [combo, bestCombo]);

  const defendAttack = (attackId, rules) => {
    const attack = attacks.find(a => a.id === attackId);
    if (!attack) return;
    
    // Check if any selected rule blocks this attack
    const isBlocked = attack.attack.blockedBy.some(ruleId => 
      rules.includes(ruleId)
    );
    
    if (isBlocked) {
      // Calculate score based on difficulty and combo
      const attackScore = attack.attack.power * 10 * (combo + 1);
      setScore(prev => prev + attackScore);
      setCombo(prev => {
        const newCombo = prev + 1;
        return newCombo;
      });
    } else {
      setLives(prev => {
        const newLives = prev - attack.attack.power;
        if (newLives <= 0) {
          setGameActive(false);
          onComplete(score, "Network Guardian");
        }
        return newLives;
      });
      setCombo(0); // Reset combo on miss
    }
    
    setAttacks(prev => prev.filter(a => a.id !== attackId));
    setSelectedRules([]);
  };

  const toggleRule = (ruleId) => {
    setSelectedRules(prev => 
      prev.includes(ruleId) 
        ? prev.filter(id => id !== ruleId) 
        : [...prev, ruleId]
    );
  };

  return (
    <div className="firewall-game">
      <div className="game-header">
        <div>❤️ Lives: {lives}</div>
        <div>💰 Score: {score}</div>
        <div>🔥 Combo: {combo}x</div>
        <button className="hint-toggle minimal" onClick={() => setShowHint(!showHint)}>
          {showHint ? 'Hide Hints' : 'Show Hints'}
        </button>
      </div>
      
      <div className="rules-panel">
        <h4>🔒 Firewall Rules</h4>
        <p className="rules-description">Select rules to defend against incoming attacks</p>
        <div className="rules-list">
          {firewallRules.map(rule => (
            <div 
              key={rule.id} 
              className={`rule ${selectedRules.includes(rule.id) ? 'selected' : ''} ${rule.category}`}
              onClick={() => toggleRule(rule.id)}
            >
              <div className="rule-type">[{rule.type.toUpperCase()}]</div>
              <div className="rule-details">
                <span className="protocol">{rule.protocol}</span>
                {rule.port && <span className="port">port {rule.port}</span>}
                <br />
                <span className="description">{rule.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="attacks-panel">
        <h4>🚀 Incoming Attacks</h4>
        <p className="attacks-description">Defend attacks before time runs out!</p>
        <div className="attacks-list">
          {attacks.map(attack => (
            <div key={attack.id} className={`attack ${attack.attack.severity}`}>
              <div className="attack-header">
                <div className="attack-type">{attack.attack.type}</div>
                <div className="attack-power">Power: {attack.attack.power}x</div>
              </div>
              <div className="attack-timer">⏱️ Time: {attack.time}s</div>
              <div className="attack-description">{attack.attack.description}</div>
              <button onClick={() => defendAttack(attack.id, selectedRules)}>
                DEFEND
              </button>
            </div>
          ))}
          
          {attacks.length === 0 && (
            <p className="no-attacks">✅ No active attacks. Standing by... ✅</p>
          )}
        </div>
      </div>
      
      {showHint && (
        <div className="hint-box detailed">
          <h4>🛡️ Firewall Defense Strategy:</h4>
          <ul>
            <li><strong>Rule Selection:</strong> Read attack descriptions and match with blocking rules</li>
            <li><strong>Severities:</strong> Critical (red) deals most damage, low (green) least damage</li>
            <li><strong>Combos:</strong> Successfully defend without missing to build combos</li>
            <li><strong>Progression:</strong> Every 250 points increases attack frequency and power</li>
            <li><strong>Best Combo:</strong> Current record is {bestCombo}x consecutive defenses</li>
            <li><strong>Rules:</strong>
              <ul>
                <li><span className="category essential">Essential:</span> Allow needed services</li>
                <li><span className="category security">Security:</span> Block exploitations</li>
                <li><span className="category protection">Protection:</span> Prevent common attacks</li>
                <li><span className="category admin">Admin:</span> Control administrative access</li>
              </ul>
            </li>
          </ul>
        </div>
      )}
      
      {!gameActive && (
        <div className="game-over">
          <h3>Defense Breach!</h3>
          <p>Final Score: <span className="score-value">{score}</span> points</p>
          <p>Best Combo: {bestCombo}x</p>
          <p><em>Press "Back to Hub" to restart game</em></p>
        </div>
      )}
    </div>
  );
};

// Phishing Hunter Game Component
const PhishingHunterGame = ({ onComplete }) => {
  const [emails, setEmails] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [gameActive, setGameActive] = useState(true);
  const [accuracy, setAccuracy] = useState(100);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [totalEmails, setTotalEmails] = useState(0);
  const [correctClassifications, setCorrectClassifications] = useState(0);

  const emailSamples = [
    {
      id: 1,
      sender: 'bankofsecure@securebank.com',
      subject: 'URGENT: Account Verification Required!',
      body: 'Your account has been locked due to suspicious activity. Please verify your identity by clicking the link below.',
      isPhishing: true,
      indicators: ['Urgent language', 'Suspicious sender domain', 'Unusual request']
    },
    {
      id: 2,
      sender: 'notifications@google.com',
      subject: 'New sign-in from Chrome browser',
      body: 'We noticed a new sign-in to your Google Account on a Windows device. Review activity to ensure it was you.',
      isPhishing: false,
      indicators: []
    },
    {
      id: 3,
      sender: 'support@apple-id.com',
      subject: 'Apple ID Locked - Action Required',
      body: 'Your Apple ID was disabled due to multiple failed login attempts. Click here to restore your account immediately.',
      isPhishing: true,
      indicators: ['Fake domain', 'Action required urgency', 'Immediate action requested']
    },
    {
      id: 4,
      sender: 'hr@mycompany.com',
      subject: 'Updated Employee Handbook Available',
      body: 'Please review the attached updated employee handbook. All staff must acknowledge receipt.',
      isPhishing: false,
      indicators: []
    },
    {
      id: 5,
      sender: 'delivery@fedex-tracking.com',
      subject: 'Package Delivery Failed',
      body: 'Your package could not be delivered. Click to reschedule delivery or your package will be returned.',
      isPhishing: true,
      indicators: ['Generic greeting', 'Suspicious sender', 'Action required']
    },
    {
      id: 6,
      sender: 'it-support@microsoft-security.com',
      subject: 'Security Alert: Critical Update Required',
      body: 'Your Microsoft account requires immediate attention. Verify your credentials to prevent account suspension.',
      isPhishing: true,
      indicators: ['Fake Microsoft domain', 'Account threats', 'Urgency pressure']
    }
  ];

  // Generate emails
  useEffect(() => {
    if (!gameActive) return;
    
    const emailInterval = setInterval(() => {
      const randomEmail = emailSamples[Math.floor(Math.random() * emailSamples.length)];
      setEmails(prev => [...prev, { ...randomEmail, time: 15, id: Date.now() }]);
      setTotalEmails(prev => prev + 1);
    }, Math.max(3000, 8000 - (score * 10))); // Speed increases with score
    
    return () => clearInterval(emailInterval);
  }, [gameActive, score]);

  // Countdown emails
  useEffect(() => {
    if (!gameActive || emails.length === 0) return;
    
    const countdownInterval = setInterval(() => {
      setEmails(prev => 
        prev.map(email => ({
          ...email,
          time: email.time - 1
        })).filter(email => {
          if (email.time <= 0) {
            if (!email.isPhishing) {
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
  }, [emails, gameActive]);

  // Check game over
  useEffect(() => {
    if (lives <= 0) {
      setGameActive(false);
      onComplete(score, accuracy >= 90 ? "Phishing Expert" : "Email Analyst");
    }
  }, [lives, score, accuracy, onComplete]);

  const classifyEmail = (emailId, isPhishing) => {
    const email = emails.find(e => e.id === emailId);
    if (!email) return;
    
    const correctlyIdentified = (email.isPhishing && isPhishing) || 
                               (!email.isPhishing && !isPhishing);
    
    if (correctlyIdentified) {
      setScore(prev => prev + 50);
      setStreak(prev => prev + 1);
      setCorrectClassifications(prev => prev + 1);
    } else {
      setLives(prev => prev - 1);
      setStreak(0);
    }
    
    // Update accuracy
    setAccuracy(Math.round(((correctClassifications + (correctlyIdentified ? 1 : 0)) / (totalEmails + 1)) * 100));
    
    setEmails(prev => prev.filter(e => e.id !== emailId));
  };

  return (
    <div className="phishing-game">
      <div className="game-header">
        <div>❤️ Lives: {lives}</div>
        <div>💰 Score: {score}</div>
        <div>📈 Accuracy: {accuracy}%</div>
        <div>🔥 Streak: {streak}x</div>
        <button className="hint-toggle minimal" onClick={() => setShowHint(!showHint)}>
          {showHint ? 'Hide Hints' : 'Show Hints'}
        </button>
      </div>
      
      <div className="inbox">
        <h4>📬 Email Inbox</h4>
        <p className="inbox-description">Quickly identify phishing emails before time runs out!</p>
        <div className="email-list">
          {emails.map(email => (
            <div key={email.id} className="email-card">
              <div className="email-header">
                <div className="sender">{email.sender}</div>
                <div className="timer">⏱️ {email.time}s</div>
              </div>
              <div className="email-subject">{email.subject}</div>
              <div className="email-body">{email.body.substring(0, 80)}...</div>
              <div className="email-actions">
                <button 
                  className="phish-btn" 
                  onClick={() => classifyEmail(email.id, true)}
                >
                  🎣 Phishing
                </button>
                <button 
                  className="legit-btn" 
                  onClick={() => classifyEmail(email.id, false)}
                >
                  ✅ Legitimate
                </button>
              </div>
              <div className="indicators">
                {email.indicators.length > 0 && (
                  <details>
                    <summary>⚠️ Risk Indicators</summary>
                    <ul>
                      {email.indicators.map((indicator, idx) => (
                        <li key={idx}>{indicator}</li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            </div>
          ))}
          
          {emails.length === 0 && (
            <p className="no-emails">📭 No unread emails. Waiting for new messages...</p>
          )}
        </div>
      </div>
      
      {showHint && (
        <div className="hint-box detailed">
          <h4>🎣 Phishing Detection Tips:</h4>
          <ul>
            <li><strong>Sender Analysis:</strong> Check domain name carefully (e.g., apple-id.com vs apple.com)</li>
            <li><strong>Urgency Tactics:</strong> Be suspicious of terms like "immediately", "urgent", or "act now"</li>
            <li><strong>Mismatched Links:</strong> Hover over links to see actual destinations</li>
            <li><strong>Generic Greetings:</strong> Legitimate companies rarely use "Dear Customer"</li>
            <li><strong>Spelling Errors:</strong> Professional companies proofread their emails</li>
            <li><strong>Reward Scams:</strong> Too-good-to-be-true offers (lottery winnings, inheritances)</li>
            <li><strong>Authority Impersonation:</strong> Fake emails from banks, government, or tech companies</li>
          </ul>
          <p><strong>Current Stats:</strong> Classifications: {totalEmails}, Accuracy: {accuracy}%, Streak: {streak}x</p>
        </div>
      )}
      
      {!gameActive && (
        <div className="game-over">
          <h3>Email Defense Breached!</h3>
          <p>Final Score: <span className="score-value">{score}</span> points</p>
          <p>Classification Accuracy: {accuracy}%</p>
          <p><em>Press "Back to Hub" to play again</em></p>
        </div>
      )}
    </div>
  );
};

// Password Fortress Game Component
const PasswordFortressGame = ({ onComplete }) => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [attempts, setAttempts] = useState(5);
  const [guessesPerSecond, setGuessesPerSecond] = useState(1000000);
  const [timeToCrack, setTimeToCrack] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [crackingTime, setCrackingTime] = useState(0);
  const [bruteForceHistory, setBruteForceHistory] = useState([]);

  const strengthLevels = [
    { min: 0, max: 20, label: 'Very Weak', color: '#ff4d4d' },
    { min: 21, max: 40, label: 'Weak', color: '#ff9966' },
    { min: 41, max: 60, label: 'Moderate', color: '#ffcc00' },
    { min: 61, max: 80, label: 'Strong', color: '#66cc66' },
    { min: 81, max: 100, label: 'Very Strong', color: '#33cc33' }
  ];

  const calculateStrength = (pwd) => {
    let score = 0;
    
    // Length check
    if (pwd.length >= 8) score += 20;
    if (pwd.length >= 12) score += 10;
    if (pwd.length >= 16) score += 10;
    
    // Character variety
    if (/[a-z]/.test(pwd)) score += 10;
    if (/[A-Z]/.test(pwd)) score += 10;
    if (/[0-9]/.test(pwd)) score += 10;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 20;

    // Complexity patterns
    if (/(.)\1{2,}/.test(pwd)) score -= 20; // Repeated chars
    if (/123|abc|qwe/.test(pwd)) score -= 20; // Common sequences
    
    return Math.min(100, Math.max(0, score));
  };

  const calculateTimeToCrack = (pwd) => {
    const charSets = {
      lowercase: 26,
      uppercase: 26,
      numbers: 10,
      symbols: 32
    };
    
    let charsetSize = 0;
    if (/[a-z]/.test(pwd)) charsetSize += charSets.lowercase;
    if (/[A-Z]/.test(pwd)) charsetSize += charSets.uppercase;
    if (/[0-9]/.test(pwd)) charsetSize += charSets.numbers;
    if (/[^A-Za-z0-9]/.test(pwd)) charsetSize += charSets.symbols;
    
    const combinations = Math.pow(charsetSize, pwd.length);
    const seconds = combinations / guessesPerSecond;
    
    return seconds;
  };

  const formatTime = (seconds) => {
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds/60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds/3600)} hours`;
    if (seconds < 31536000) return `${Math.round(seconds/86400)} days`;
    return `${Math.round(seconds/31536000)} years`;
  };

  const attemptLogin = () => {
    if (attempts <= 1) {
      setGameActive(false);
      onComplete(0, "Fortress Infiltrated");
      return;
    }
    
    setAttempts(prev => prev - 1);
    
    // Simulate brute force attempt
    const successChance = strength / 100;
    const success = Math.random() < successChance / 10;
    
    if (success) {
      setGameActive(false);
      onComplete(200, "Password Master");
    } else {
      setBruteForceHistory(prev => [
        ...prev, 
        { attempt: 6 - attempts, cracked: false, time: formatTime(timeToCrack) }
      ]);
    }
  };

  useEffect(() => {
    const strengthValue = calculateStrength(password);
    setStrength(strengthValue);
    
    const timeInSeconds = calculateTimeToCrack(password);
    setTimeToCrack(timeInSeconds);
    setCrackingTime(formatTime(timeInSeconds));
  }, [password]);

  const getStrengthLevel = () => {
    return strengthLevels.find(level => 
      strength >= level.min && strength <= level.max
    ) || strengthLevels[0];
  };

  return (
    <div className="password-game">
      <div className="game-header">
        <div className="attempts-left">🔐 Attempts Left: {attempts}</div>
        <button className="hint-toggle minimal" onClick={() => setShowHint(!showHint)}>
          {showHint ? 'Hide Hints' : 'Show Hints'}
        </button>
      </div>
      
      {gameActive ? (
        <>
          <div className="password-challenge">
            <h3>🛡️ PASSWORD FORTRESS</h3>
            <p className="instructions">Create an unbreakable password to protect your fortress!</p>
            
            <div className="password-input-area">
              <input 
                type="text" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                maxLength="50"
              />
              <div className="strength-meter">
                <div 
                  className="strength-fill" 
                  style={{
                    width: `${strength}%`,
                    backgroundColor: getStrengthLevel().color
                  }}
                ></div>
                <div className="strength-label">
                  {getStrengthLevel().label} ({strength}/100)
                </div>
              </div>
            </div>
            
            <div className="stats-panel">
              <div className="stat">
                <span>🛡️ Time to Crack:</span>
                <span className="value">{crackingTime}</span>
              </div>
              <div className="stat">
                <span>⚡ Guesses/sec:</span>
                <span className="value">{guessesPerSecond.toLocaleString()}</span>
              </div>
              <div className="stat">
                <span>🔓 Login Attempts:</span>
                <span className="value">{6-attempts}/5</span>
              </div>
            </div>
            
            <button 
              className="attempt-btn" 
              onClick={attemptLogin}
              disabled={attempts <= 0}
            >
              Attempt Brute Force Attack
            </button>
          </div>
          
          <div className="bruteforce-history">
            <h4>⚔️ Brute Force Attempts</h4>
            {bruteForceHistory.length > 0 ? (
              <ul>
                {bruteForceHistory.map((entry, index) => (
                  <li key={index} className="history-entry">
                    <span>Attempt #{entry.attempt}:</span>
                    <span className={entry.cracked ? 'success' : 'failed'}>
                      {entry.cracked ? '✅ Cracked!' : '❌ Failed'}
                    </span>
                    <span>Estimated time: {entry.time}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No attacks recorded yet</p>
            )}
          </div>
          
          {showHint && (
            <div className="hint-box detailed">
              <h4>🔐 Password Creation Best Practices:</h4>
              <ul>
                <li><strong>Length Matters:</strong> Minimum 12 characters, ideally 16+</li>
                <li><strong>Character Mix:</strong> Use uppercase, lowercase, numbers, and symbols</li>
                <li><strong>Avoid Dictionary Words:</strong> Hackers use wordlists</li>
                <li><strong>No Personal Info:</strong> Names, birthdays, pet names are guessable</li>
                <li><strong>Passphrases:</strong> Combine 4+ unrelated words ("CorrectHorseBatteryStaple")</li>
                <li><strong>Unique Per Account:</strong> Password managers help generate different passwords</li>
                <li><strong>Regular Updates:</strong> Change passwords periodically</li>
                <li><strong>Multi-Factor Auth:</strong> Add extra layer beyond just password</li>
              </ul>
              <p><strong>Current Password Quality:</strong> {strength}% | Estimated crack time: {crackingTime}</p>
            </div>
          )}
        </>
      ) : (
        <div className="game-over">
          <h3>Fortress Status: {attempts <= 1 ? 'BREACHED!' : 'SECURE!'}</h3>
          <p>Attack Outcome: {attempts <= 1 ? 'Password was cracked' : 'Attack successfully resisted'}</p>
          <p>Score: {attempts > 1 ? '200 points awarded' : '0 points'}</p>
          <p><em>Press "Back to Hub" to try again</em></p>
        </div>
      )}
    </div>
  );
};

export default CyberGamesHub;