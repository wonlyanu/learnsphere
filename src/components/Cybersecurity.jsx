import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import { playSelectSound } from "../utils/selectSound";

export default function Cybersecurity({
  goBack,
  goToProfile,
  goToTechnology,
  goToAbout,
  goToContact,
  goBackHome,
}) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedTopics, setCompletedTopics] = useState(new Set());
  const [xp, setXp] = useState(0);

  const videoData = [
    {
      id: 1,
      url: "https://www.youtube.com/embed/zYLkdT731x8",
      title: "Introduction to Cybersecurity",
      description: "Foundational concepts and threat landscape overview",
      xp: 50,
      difficulty: "Beginner"
    },
    {
      id: 2,
      url: "https://www.youtube.com/embed/1zVZ9cWFnCc",
      title: "Network Protocols & Security",
      description: "Understand communication vulnerabilities and defenses",
      xp: 75,
      difficulty: "Intermediate"
    },
    {
      id: 3,
      url: "https://www.youtube.com/embed/-X1vf69CxCA",
      title: "Red Team Operations",
      description: "Offensive techniques and penetration testing methods",
      xp: 100,
      difficulty: "Advanced"
    },
    {
      id: 4,
      url: "https://www.youtube.com/embed/gvhvXCJ6CAU",
      title: "Blue Team Defense",
      description: "Incident response and security monitoring strategies",
      xp: 100,
      difficulty: "Advanced"
    },
    {
      id: 5,
      url: "https://www.youtube.com/embed/apDWCRY-x5c",
      title: "Reverse Engineering Malware",
      description: "Dissecting malicious code to understand behavior",
      xp: 125,
      difficulty: "Expert"
    },
    {
      id: 6,
      url: "https://www.youtube.com/embed/7PAk1wsy3VI",
      title: "Open Source Intelligence (OSINT)",
      description: "Gathering intelligence from publicly available sources",
      xp: 75,
      difficulty: "Intermediate"
    },
    {
      id: 7,
      url: "https://www.youtube.com/embed/3cUpqfM2xm8",
      title: "Malware Analysis Techniques",
      description: "Dynamic and static analysis methodologies",
      xp: 150,
      difficulty: "Expert"
    },
    {
      id: 8,
      url: "https://www.youtube.com/embed/3-MSlNVqzYY",
      title: "NotPetya Cyber Attack",
      description: "Case study of the devastating supply chain attack",
      xp: 75,
      difficulty: "Intermediate"
    },
    {
      id: 9,
      url: "https://www.youtube.com/embed/TLPHmHPaCiQ",
      title: "Zero-Day Exploit Market",
      description: "Understanding the underground economy of exploits",
      xp: 100,
      difficulty: "Advanced"
    },
    {
      id: 10,
      url: "https://www.youtube.com/embed/_OmpRDWRT9U",
      title: "WannaCry Ransomware",
      description: "Analysis of the global ransomware pandemic",
      xp: 75,
      difficulty: "Intermediate"
    }
  ];

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % videoData.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + videoData.length) % videoData.length);

  const markAsComplete = (index) => {
    if (!completedTopics.has(index)) {
      setCompletedTopics(prev => new Set([...prev, index]));
      setXp(prev => prev + videoData[index].xp);
    }
  };

  // Calculate progress percentage
  const progressPercentage = Math.round(
    (completedTopics.size / videoData.length) * 100
  );

  // Get visible cards with completion status
  const visibleCards = [
    { ...videoData[currentIndex], index: currentIndex },
    { ...videoData[(currentIndex + 1) % videoData.length], index: (currentIndex + 1) % videoData.length },
    { ...videoData[(currentIndex + 2) % videoData.length], index: (currentIndex + 2) % videoData.length },
  ].map(item => ({
    ...item,
    completed: completedTopics.has(item.index)
  }));

  return (
    <div className="cybersecurity-page">
      <Navbar
        goToProfile={goToProfile}
        goToTechnology={goToTechnology}
        goToAbout={goToAbout}
        goToContact={goToContact}
        goBackHome={goBackHome}
      />

      {/* Animated background */}
      <div className="background-animation"></div>
      
      <video className="bg-video" autoPlay loop muted playsInline>
        <source src="/videos/respage.mp4" type="video/mp4" />
      </video>

      <motion.button
        className="back-btn"
        onClick={goBack}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        &#9664; SECURE EXIT
      </motion.button>

      {/* Player Stats Bar */}
      <div className="player-stats">
        <div className="stat xp-stat">
          <span className="stat-label">XP</span>
          <span className="stat-value">{xp}</span>
        </div>
        <div className="progress-container">
          <div 
            className="progress-bar"
            style={{ width: `${progressPercentage}%` }}
          ></div>
          <span className="progress-text">{progressPercentage}% Complete</span>
        </div>
        <div className="stat badge-stat">
          <span className="stat-label">BADGES</span>
          <span className="stat-value">{Math.floor(xp / 100)}</span>
        </div>
      </div>

      <div className="tech-header">
        <motion.h1 
          className="title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          CYBER DEFENSE ACADEMY
        </motion.h1>
        <p className="subtitle">
          Master cybersecurity warfare through interactive missions and real-world scenarios
        </p>
      </div>

      {/* Mission Status */}
      <div className="mission-status">
        <div className="status-item">
          <span className="status-value">{completedTopics.size}</span>
          <span className="status-label">MISSIONS COMPLETE</span>
        </div>
        <div className="status-item">
          <span className="status-value">{videoData.length - completedTopics.size}</span>
          <span className="status-label">MISSIONS REMAINING</span>
        </div>
        <div className="status-item">
          <span className="status-value">{xp} XP</span>
          <span className="status-label">ACQUIRED</span>
        </div>
      </div>

      <div className="slider-container">
        <button className="arrow-btn left" onClick={prevSlide}>
          &#10094;
        </button>

        <div className="slider">
          <AnimatePresence mode="wait">
            {visibleCards.map((card, index) => (
              <motion.div
                key={card.id}
                className={`cyber-card ${card.completed ? 'completed' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -10 }}
                onClick={() => {
                  playSelectSound();
                  setSelectedVideo(card.index);
                }}
              >
                <div className="card-badge">
                  <span className={`difficulty ${card.difficulty.toLowerCase()}`}>
                    {card.difficulty}
                  </span>
                  {card.completed && <span className="completion-badge">✓</span>}
                </div>
                
                <div className="card-icon">
                  <div className="hexagon">
                    <span className="icon">{card.title.charAt(0)}</span>
                  </div>
                </div>
                
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
                
                <div className="card-footer">
                  <span className="xp-reward">+{card.xp} XP</span>
                  <button 
                    className={`complete-btn ${card.completed ? 'completed' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsComplete(card.index);
                    }}
                  >
                    {card.completed ? 'COMPLETED' : 'MARK COMPLETE'}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <button className="arrow-btn right" onClick={nextSlide}>
          &#10095;
        </button>
      </div>

      {/* Achievement Unlock Notification */}
      {xp >= 300 && (
        <motion.div 
          className="achievement-notification"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="achievement-icon">🏆</div>
          <div className="achievement-content">
            <h4>Achievement Unlocked!</h4>
            <p>Cyber Novice Badge Earned</p>
          </div>
        </motion.div>
      )}

      {/* Video Modal */}
      {selectedVideo !== null && (
        <div className="video-modal" onClick={() => setSelectedVideo(null)}>
          <motion.div
            className="video-fullscreen"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <button
              className="close-video-btn"
              onClick={() => setSelectedVideo(null)}
            >
              ✖
            </button>
            <div className="video-header">
              <h3>{videoData[selectedVideo].title}</h3>
              <span className={`difficulty ${videoData[selectedVideo].difficulty.toLowerCase()}`}>
                {videoData[selectedVideo].difficulty}
              </span>
            </div>
            <iframe
              src={`${videoData[selectedVideo].url}?autoplay=1`}
              title={videoData[selectedVideo].title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="fullscreen-iframe"
            ></iframe>
            <div className="video-meta">
              <p>{videoData[selectedVideo].description}</p>
              <button 
                className="complete-video-btn"
                onClick={() => {
                  markAsComplete(selectedVideo);
                  setSelectedVideo(null);
                }}
              >
                MARK MISSION COMPLETE (+{videoData[selectedVideo].xp} XP)
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <style>{`
        .cybersecurity-page {
          position: relative;
          min-height: 100vh;
          color: white;
          overflow-x: hidden;
          padding-bottom: 50px;
        }

        .background-animation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 10% 20%, rgba(76, 175, 80, 0.15) 0%, transparent 20%),
            radial-gradient(circle at 90% 80%, rgba(33, 150, 243, 0.15) 0%, transparent 20%);
          z-index: -2;
          animation: pulse 10s infinite alternate;
        }

        @keyframes pulse {
          0% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }

        .bg-video {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
          filter: brightness(0.15) saturate(1.2);
        }

        .back-btn {
          position: absolute;
          top: 120px;
          left: 40px;
          background: linear-gradient(135deg, #00c853, #009624);
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 30px;
          cursor: pointer;
          font-weight: 600;
          letter-spacing: 1px;
          box-shadow: 0 4px 15px rgba(0, 200, 83, 0.3);
          z-index: 10;
        }

        .back-btn:hover {
          box-shadow: 0 6px 20px rgba(0, 200, 83, 0.5);
        }

        /* Player Stats */
        .player-stats {
          position: absolute;
          top: 120px;
          right: 40px;
          display: flex;
          align-items: center;
          gap: 20px;
          background: rgba(0, 0, 0, 0.5);
          padding: 12px 20px;
          border-radius: 30px;
          backdrop-filter: blur(10px);
        }

        .stat {
          text-align: center;
        }

        .stat-label {
          font-size: 0.8rem;
          opacity: 0.7;
          display: block;
        }

        .stat-value {
          font-weight: 700;
          font-size: 1.2rem;
          color: #b29625ff;
        }

        .progress-container {
          width: 150px;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          position: relative;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #00c853, #009624);
          border-radius: 4px;
          transition: width 0.5s ease;
        }

        .progress-text {
          position: absolute;
          top: -20px;
          left: 0;
          width: 100%;
          text-align: center;
          font-size: 0.7rem;
        }

        .tech-header {
          text-align: center;
          margin-top: 180px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .title {
          font-size: 3.5rem;
          margin-bottom: 10px;
          background: linear-gradient(90deg, #9f2ca3ff, #65095dff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: none;
        }

        .subtitle {
          color: #cfd8dc;
          font-size: 1.3rem;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Mission Status */
        .mission-status {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin: 40px 0;
        }

        .status-item {
          text-align: center;
          padding: 15px 25px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 15px;
          border: 1px solid rgba(79, 195, 247, 0.3);
          min-width: 180px;
        }

        .status-value {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: #6c087eff;
          margin-bottom: 5px;
        }

        .status-label {
          font-size: 0.9rem;
          opacity: 0.8;
          letter-spacing: 1px;
        }

        /* Slider */
        .slider-container {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          margin-top: 50px;
          gap: 40px;
        }

        .slider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
        }

        .cyber-card {
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(114, 8, 86, 0.3);
          border-radius: 20px;
          padding: 30px;
          width: 300px;
          text-align: center;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(5px);
        }

        .cyber-card:hover {
          transform: translateY(-15px);
          border-color: #9c27b0;
          box-shadow: 0 15px 40px rgba(156, 39, 176, 0.4);
        }

        .cyber-card.completed {
          border-color: #045f33ff;
          background: rgba(0, 30, 0, 0.6);
        }

        .card-badge {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .difficulty {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .difficulty.beginner { background: rgba(33, 150, 243, 0.2); color: #2196f3; }
        .difficulty.intermediate { background: rgba(255, 193, 7, 0.2); color: #ffc107; }
        .difficulty.advanced { background: rgba(255, 152, 0, 0.2); color: #ff9800; }
        .difficulty.expert { background: rgba(244, 67, 54, 0.2); color: #f44336; }

        .completion-badge {
          background: #00e676;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.8rem;
        }

        .card-icon {
          margin: 20px 0;
        }

        .hexagon {
          width: 80px;
          height: 46px;
          background: rgba(79, 195, 247, 0.2);
          position: relative;
          margin: 10px auto;
          border-radius: 4px;
        }

        .hexagon:before,
        .hexagon:after {
          content: "";
          position: absolute;
          width: 0;
          border-left: 40px solid transparent;
          border-right: 40px solid transparent;
        }

        .hexagon:before {
          bottom: 100%;
          border-bottom: 23px solid rgba(79, 195, 247, 0.2);
        }

        .hexagon:after {
          top: 100%;
          border-top: 23px solid rgba(179, 172, 180, 0.2);
        }

        .icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem;
          color: #a50fc0ff;
          z-index: 2;
        }

        .card-title {
          font-size: 1.5rem;
          margin: 20px 0 10px;
          color: #f5eff6ff;
        }

        .cyber-card.completed .card-title {
          color: #00e676;
        }

        .card-description {
          color: #fcfafcff;
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
        }

        .xp-reward {
          background: rgba(188, 153, 85, 0.2);
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .complete-btn {
          background: rgba(45, 66, 14, 0.1);
          color: #69f76eff;
          border: 1px solid rgba(228, 149, 248, 0.5);
          padding: 8px 15px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .complete-btn:hover {
          background: rgba(191, 79, 247, 0.2);
        }

        .complete-btn.completed {
          background: #00e676;
          border-color: #00e676;
          color: white;
        }

        .arrow-btn {
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          font-size: 2.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(5px);
        }

        .arrow-btn:hover {
          background: rgba(191, 79, 247, 0.2);
          transform: scale(1.1);
        }

        /* Achievement Notification */
        .achievement-notification {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: rgba(0, 0, 0, 0.8);
          border-left: 4px solid gold;
          border-radius: 10px;
          padding: 15px;
          display: flex;
          gap: 15px;
          align-items: center;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          z-index: 1000;
        }

        .achievement-icon {
          font-size: 2rem;
        }

        .achievement-content h4 {
          margin: 0 0 5px 0;
          color: gold;
        }

        .achievement-content p {
          margin: 0;
          font-size: 0.9rem;
          color: #f1b2f2ff;
        }

        /* Video Modal */
        .video-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }

        .video-fullscreen {
          position: relative;
          width: 90%;
          height: 85%;
          max-width: 1200px;
          background: black;
          border-radius: 15px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .video-header {
          padding: 20px;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .video-header h3 {
          margin: 0;
          color: #e0f7fa;
        }

        .fullscreen-iframe {
          flex: 1;
          border: none;
        }

        .video-meta {
          padding: 20px;
          background: rgba(0, 0, 0, 0.7);
        }

        .video-meta p {
          color: #f2b2f2ff;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .complete-video-btn {
          background: linear-gradient(135deg, #00c853, #009624);
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 30px;
          cursor: pointer;
          font-weight: 600;
          letter-spacing: 1px;
          width: 100%;
          transition: all 0.3s ease;
        }

        .complete-video-btn:hover {
          box-shadow: 0 5px 15px rgba(0, 200, 83, 0.4);
        }

        .close-video-btn {
          position: absolute;
          top: 20px;
          right: 30px;
          background: rgba(244, 67, 54, 0.9);
          border: none;
          color: white;
          border-radius: 50%;
          font-size: 1.2rem;
          width: 40px;
          height: 40px;
          cursor: pointer;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-video-btn:hover {
          background: #f44336;
        }

        @media (max-width: 1024px) {
          .player-stats {
            right: 20px;
          }
          
          .mission-status {
            flex-wrap: wrap;
          }
          
          .status-item {
            min-width: 140px;
            padding: 12px 15px;
          }
        }

        @media (max-width: 768px) {
          .back-btn {
            top: 100px;
            left: 20px;
            padding: 10px 20px;
            font-size: 0.9rem;
          }
          
          .player-stats {
            top: 100px;
            right: 20px;
            padding: 8px 15px;
          }
          
          .stat-value {
            font-size: 1rem;
          }
          
          .title {
            font-size: 2.5rem;
          }
          
          .subtitle {
            font-size: 1.1rem;
            padding: 0 20px;
          }
          
          .mission-status {
            gap: 15px;
            margin: 20px 0;
          }
          
          .status-item {
            min-width: 110px;
            padding: 10px;
          }
          
          .status-value {
            font-size: 1.5rem;
          }
          
          .slider-container {
            margin-top: 30px;
            gap: 20px;
          }
          
          .cyber-card {
            width: 260px;
            padding: 20px;
          }
          
          .card-title {
            font-size: 1.3rem;
          }
        }

        @media (max-width: 480px) {
          .player-stats {
            position: static;
            margin: 20px auto;
            width: 90%;
            justify-content: center;
          }
          
          .mission-status {
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }
          
          .status-item {
            width: 90%;
          }
          
          .slider {
            flex-direction: column;
            gap: 20px;
          }
          
          .arrow-btn {
            display: none;
          }
          
          .cyber-card {
            width: 90%;
          }
          
          .video-fullscreen {
            width: 95%;
            height: 80%;
          }
        }
      `}</style>
    </div>
  );
}