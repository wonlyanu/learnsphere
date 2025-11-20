import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import { motion, AnimatePresence } from "framer-motion";
import cyberImage from './assets/image1.png';
import webImage from './assets/image2.png';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mainpage-container">
      {/* 🔙 Back Button */}
      <button className="back-button" onClick={() => navigate('/onboarding')}>
        ← Back
      </button>

      <h1 className="mainpage-title">Welcome — Choose a Path</h1>

      <div className="mainpage-cards">

        {/* Cybersecurity Card */}
        <div
          className="mainpage-card cybersecurity"
          style={{ backgroundImage: `url(${cyberImage})` }}
          onClick={() => navigate('/cybersecurity')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' ? navigate('/cybersecurity') : null)}
        >
          <div className="card-overlay">
            <h2>Cybersecurity</h2>
            <p>Learn offensive & defensive security through interactive quests.</p>
          </div>
        </div>

        {/* Web Development Card */}
        <div
          className="mainpage-card webdev"
          style={{ backgroundImage: `url(${webImage})` }}
          onClick={() => navigate('/web-development')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' ? navigate('/web-development') : null)}
        >
          <div className="card-overlay">
            <h2>Web Development</h2>
            <p>Build websites, learn front-end basics and more.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MainPage;
