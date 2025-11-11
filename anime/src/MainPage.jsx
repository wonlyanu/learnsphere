import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mainpage-container">
      <h1 className="mainpage-title">Welcome — Choose a Path</h1>

      <div className="mainpage-cards">
        <div
          className="mainpage-card cybersecurity"
          onClick={() => navigate('/cybersecurity')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' ? navigate('/cybersecurity') : null)}
        >
          <h2>Cybersecurity</h2>
          <p>Learn offensive & defensive security through interactive quests.</p>
        </div>

        <div
          className="mainpage-card webdev"
          onClick={() => navigate('/web-development')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' ? navigate('/web-development') : null)}
        >
          <h2>Web Development</h2>
          <p>Build websites, learn front-end basics and more (placeholder).</p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
