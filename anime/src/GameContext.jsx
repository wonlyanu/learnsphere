import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [progress, setProgress] = useState({
    offensive: { beginner: false, expert: false, advanced: false },
    defensive: { beginner: false, expert: false, advanced: false },
    frontend: { beginner: false, expert: false, advanced: false },
    backend: { beginner: false, expert: false, advanced: false }
  });
  const [scores, setScores] = useState({
    offensive: { beginner: 0, expert: 0, advanced: 0 },
    defensive: { beginner: 0, expert: 0, advanced: 0 },
    frontend: { beginner: 0, expert: 0, advanced: 0 },
    backend: { beginner: 0, expert: 0, advanced: 0 }
  });
  const [challengeProgress, setChallengeProgress] = useState({
    offensive: { beginner: 0, expert: 0, advanced: 0 },
    defensive: { beginner: 0, expert: 0, advanced: 0 },
    frontend: { beginner: 0, expert: 0, advanced: 0 },
    backend: { beginner: 0, expert: 0, advanced: 0 }
  });
  const [challengeLevels, setChallengeLevels] = useState({
    offensive: {
      beginner: Array(10).fill(false),
      expert: Array(10).fill(false),
      advanced: Array(10).fill(false)
    },
    defensive: {
      beginner: Array(10).fill(false),
      expert: Array(10).fill(false),
      advanced: Array(10).fill(false)
    },
    frontend: {
      beginner: Array(10).fill(false),
      expert: Array(10).fill(false),
      advanced: Array(10).fill(false)
    },
    backend: {
      beginner: Array(10).fill(false),
      expert: Array(10).fill(false),
      advanced: Array(10).fill(false)
    }
  });
  // Add web development challenge tracking
  // merge frontend/backend into challengeLevels if not present
  useEffect(() => {
    setChallengeLevels(prev => ({
      ...prev,
      frontend: prev.frontend || { beginner: Array(10).fill(false), expert: Array(10).fill(false), advanced: Array(10).fill(false) },
      backend: prev.backend || { beginner: Array(10).fill(false), expert: Array(10).fill(false), advanced: Array(10).fill(false) }
    }));
  }, []);
  const [unlockedOffensive, setUnlockedOffensive] = useState({ beginner: true, expert: false, advanced: false });
  const [unlockedDefensive, setUnlockedDefensive] = useState({ beginner: true, expert: false, advanced: false });
  const [unlockedFrontend, setUnlockedFrontend] = useState({ beginner: true, expert: false, advanced: false });
  const [unlockedBackend, setUnlockedBackend] = useState({ beginner: true, expert: false, advanced: false });
  const [badges, setBadges] = useState([]);
  const [stars, setStars] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('gameProgress');
    if (saved) {
      const data = JSON.parse(saved);
      setProgress(prev => data.progress || prev);
      setScores(prev => data.scores || prev);
      setChallengeProgress(prev => data.challengeProgress || prev);
      setChallengeLevels(prev => data.challengeLevels || prev);
      setUnlockedOffensive(prev => data.unlockedOffensive || prev);
      setUnlockedDefensive(prev => data.unlockedDefensive || prev);
      setUnlockedFrontend(prev => data.unlockedFrontend || prev);
      setUnlockedBackend(prev => data.unlockedBackend || prev);
      setBadges(prev => data.badges || prev);
      setStars(prev => data.stars || prev);
      setStreak(prev => data.streak || prev);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gameProgress', JSON.stringify({ progress, scores, challengeProgress, challengeLevels, unlockedOffensive, unlockedDefensive, unlockedFrontend, unlockedBackend, badges, stars, streak }));
  }, [progress, scores, challengeProgress, challengeLevels, unlockedOffensive, unlockedDefensive, badges, stars, streak]);

  const updateProgress = (type, level, completed) => {
    setProgress(prev => ({
      ...prev,
      [type]: { ...prev[type], [level]: completed }
    }));
  };

  const updateScore = (type, level, score) => {
    setScores(prev => ({
      ...prev,
      [type]: { ...prev[type], [level]: score }
    }));
  };

  const addBadge = (badge) => {
    setBadges(prev => [...prev, badge]);
  };

  const addStars = (amount) => {
    setStars(prev => prev + amount);
  };

  const updateStreak = (newStreak) => {
    setStreak(newStreak);
  };

  const updateChallengeProgress = (type, level, progress) => {
    setChallengeProgress(prev => ({
      ...prev,
      [type]: { ...prev[type], [level]: progress }
    }));
  };

  const updateChallengeLevel = (type, mainLevel, subLevel, unlocked) => {
    setChallengeLevels(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [mainLevel]: prev[type][mainLevel].map((val, i) => i === subLevel ? unlocked : val)
      }
    }));
  };

  const unlockNext = (type, level) => {
    if (type === 'offensive') {
      if (level === 'beginner') setUnlockedOffensive(prev => ({ ...prev, expert: true }));
      if (level === 'expert') setUnlockedOffensive(prev => ({ ...prev, advanced: true }));
    } else if (type === 'defensive') {
      if (level === 'beginner') setUnlockedDefensive(prev => ({ ...prev, expert: true }));
      if (level === 'expert') setUnlockedDefensive(prev => ({ ...prev, advanced: true }));
    } else if (type === 'frontend') {
      if (level === 'beginner') setUnlockedFrontend(prev => ({ ...prev, expert: true }));
      if (level === 'expert') setUnlockedFrontend(prev => ({ ...prev, advanced: true }));
    } else if (type === 'backend') {
      if (level === 'beginner') setUnlockedBackend(prev => ({ ...prev, expert: true }));
      if (level === 'expert') setUnlockedBackend(prev => ({ ...prev, advanced: true }));
    }
  };

  return (
    <GameContext.Provider value={{
      progress,
      scores,
      challengeProgress,
      challengeLevels,
      unlockedOffensive,
      unlockedDefensive,
      unlockedFrontend,
      unlockedBackend,
      badges,
      stars,
      streak,
      updateProgress,
      updateScore,
      updateChallengeProgress,
      updateChallengeLevel,
      unlockNext,
      setUnlockedOffensive,
      setUnlockedDefensive,
      setUnlockedFrontend,
      setUnlockedBackend,
      addBadge,
      addStars,
      updateStreak
    }}>
      {children}
    </GameContext.Provider>
  );
};
