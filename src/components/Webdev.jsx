import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";

export default function Webdev({
  goBack,
  goToProfile,
  goToTechnology,
  goToAbout,
  goToContact,
  goBackHome,
}) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const videoUrls = [
  "https://www.youtube.com/embed/HfTXHrWMGVY", // Web Dev
  "https://www.youtube.com/embed/XBu54nfzxAQ", // Backend
  "https://www.youtube.com/embed/WG5ikvJ2TKA", // Frontend
  "https://www.youtube.com/embed/M_P7qSiI14U", // Cross-Browser Compatibility
  "https://www.youtube.com/embed/Hq5AHD8PKhY", // Progressive Web Apps (PWAs)
  "https://www.youtube.com/embed/s7wmiS2mSXY", // API
  "https://www.youtube.com/embed/bpWzFFbWxZg", // Native Frameworks
  "https://www.youtube.com/embed/Tn6-PIqc4UM", // React
  "https://www.youtube.com/embed/ENrzD9HAZK4", // Node
  "https://www.youtube.com/embed/-bt_y4Loofg", // MongoDB
];

const cardTitles = [
  "Web Development",
  "Backend Development",
  "Frontend Development",
  "Cross-Browser Compatibility",
  "Progressive Web Apps (PWAs)",
  "API Integration",
  "Native Frameworks",
  "React.js",
  "Node.js",
  "MongoDB",
];


  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % cardTitles.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + cardTitles.length) % cardTitles.length);

  const visibleCards = [
    cardTitles[currentIndex],
    cardTitles[(currentIndex + 1) % cardTitles.length],
    cardTitles[(currentIndex + 2) % cardTitles.length],
  ];

  return (
    <div className="cybersecurity-page">
      <Navbar
        goToProfile={goToProfile}
        goToTechnology={goToTechnology}
        goToAbout={goToAbout}
        goToContact={goToContact}
        goBackHome={goBackHome}
      />

      <video className="bg-video" autoPlay loop muted playsInline>
        <source src="/videos/techback.mp4" type="video/mp4" />
      </video>

      <motion.button
        className="back-btn"
        onClick={goBack}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        &#9664; RETREAT
      </motion.button>

      <div className="tech-header">
        <h1 className="title">WEB DEVELOPMENT</h1>
        <p className="subtitle">
          Master the art of creating digital worlds — build, innovate, and deploy.
        </p>
      </div>

      <div className="slider-container">
        <button className="arrow-btn left" onClick={prevSlide}>
          &#10094;
        </button>

        <div className="slider">
          <AnimatePresence mode="wait">
            {visibleCards.map((title, index) => (
              <motion.div
                key={title}
                className="cyber-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.4 }}
                onClick={() =>
                  setSelectedVideo((currentIndex + index) % cardTitles.length)
                }
              >
                <h3 className="card-title">{title}</h3>
                <p className="card-description">Click to watch the video.</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <button className="arrow-btn right" onClick={nextSlide}>
          &#10095;
        </button>
      </div>

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
            <iframe
              src={`${videoUrls[selectedVideo]}?autoplay=1`}
              title={cardTitles[selectedVideo]}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="fullscreen-iframe"
            ></iframe>
          </motion.div>
        </div>
      )}

      <style>{`
        .cybersecurity-page {
          position: relative;
          min-height: 100vh;
          color: white;
          overflow: hidden;
        }

        .bg-video {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
          filter: brightness(0.35);
        }

        .back-btn {
          position: absolute;
          top: 120px;
          left: 40px;
          background: rgba(236, 229, 229, 0.94);
          color: #000c0aff;
          border: 1px solid #010d0bff;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
        }

        .tech-header {
          text-align: center;
          margin-top: 180px;
          margin-left: 350px;
        }

        .title {
          font-size: 3rem;
          color: #f9fefeff;
        }

        .subtitle {
          color: #cfcfcf;
          font-size: 1.2rem;
        }

        .slider-container {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          margin-top: 100px;
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
          border: 1px solid rgba(229, 239, 239, 0.92);
          border-radius: 15px;
          padding: 25px;
          width: 250px;
          text-align: center;
          cursor: pointer;
          box-shadow: 0 0 15px rgba(231, 239, 239, 0.88);
          transition: all 0.3s ease;
        }

        .cyber-card:hover {
          border-color: #5c5f63ff;
          background: rgba(74, 178, 72, 0.85);
          transform: translateY(-10px);
        }

        .arrow-btn {
          background: transparent;
          color: black;
          border: transparent;
          font-size: 3rem;
          cursor: pointer;
          transition: 0.3s;
          font-weight: bold;
        }

        .arrow-btn:hover {
          transform: scale(1.15);
        }

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
        }

        .video-fullscreen {
          position: relative;
          width: 90%;
          height: 80%;
          max-width: 1200px;
        }

        .fullscreen-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        .close-video-btn {
          position: absolute;
          top: 20px;
          right: 30px;
          background: rgba(231, 224, 224, 0.95);
          border: 1px solid #010e0dff;
          color: #010807ff;
          border-radius: 8px;
          font-size: 1.5rem;
          padding: 5px 10px;
          cursor: pointer;
          z-index: 2;
        }

        @media (max-width: 768px) {
          .slider {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
