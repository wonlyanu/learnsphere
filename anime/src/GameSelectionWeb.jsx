import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './GameSelection.css';

const GameSelectionWeb = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [animating, setAnimating] = useState(false);
  const [animatingCard, setAnimatingCard] = useState(null);

  useEffect(() => {
    const fullText = "CHOOSE YOUR PATH, DEVELOPER!";
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 100);
  }, []);

  const handleSelect = (type) => {
    setAnimatingCard(type);
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      navigate(type === 'frontend' ? '/frontend-quests' : '/backend-quests');
    }, 1000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 25%, #0a0a2a 50%, #000000 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <button onClick={() => navigate('/web-development')} style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        background: 'transparent',
        border: '2px solid white',
        color: 'white',
        padding: '0.3rem 2rem',
        cursor: 'pointer',
        fontFamily: "'OnePieceFont', 'Comic Sans MS', cursive, sans-serif",
        fontSize: '1.5rem'
      }}>Back</button>
      <TransitionGroup>
        <CSSTransition key="selection" timeout={500} classNames="fade">
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <h1 style={{
              fontSize: '3rem',
              marginBottom: '3rem',
              fontFamily: "'OnePieceFont', 'Comic Sans MS', cursive, sans-serif",
              color: 'white',
              letterSpacing: '0.2rem'
            }}>{text}</h1>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20rem',
              flexWrap: 'wrap',
              marginTop: '3rem',
              marginBottom: '5rem',
              position: 'relative',
              zIndex: 1
            }}>
              <div
                onClick={() => handleSelect('frontend')}
                style={{
                  width: '300px',
                  height: '350px',
                  background: 'url(/offensive-card.jpg) no-repeat center/cover',
                  border: '2px solid red',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 0 10px rgba(255,0,0,0.2), 0 0 20px rgba(255,0,0,0.2), 0 0 30px rgba(255,0,0,0.2), 0 0 40px rgba(255,0,0,0.2), 0 0 50px rgba(255,0,0,0.2), 0 0 60px rgba(255,0,0,0.2)',
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <h2>Frontend</h2>
                <p>Master building interactive user interfaces and UX.</p>
              </div>
              <div
                onClick={() => handleSelect('backend')}
                style={{
                  width: '300px',
                  height: '350px',
                  background: 'url(/defensive-card.jpg) no-repeat center/cover',
                  border: '2px solid blue',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 0 10px rgba(0,0,255,0.2), 0 0 20px rgba(0,0,255,0.2), 0 0 30px rgba(0,0,255,0.2), 0 0 40px rgba(0,0,255,0.2), 0 0 50px rgba(0,0,255,0.2), 0 0 60px rgba(0,0,255,0.2)',
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <h2>Backend</h2>
                <p>Learn server-side development, databases and APIs.</p>
              </div>
            </div>
            <img
              src="/sunny.png"
              alt="Ship"
              className="ship-move"
              style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                width: '550px',
                height: 'auto',
                zIndex: 0,
                filter: 'blur(0.5px) brightness(0.1)'
              }}
            />
          </div>
        </CSSTransition>
      </TransitionGroup>
      {animating && (
        <div className="expand" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: animatingCard === 'frontend' ? 'url(/offensive-card.jpg) no-repeat center/cover' : 'url(/defensive-card.jpg) no-repeat center/cover',
          zIndex: 1000
        }} />
      )}
    </div>
  );
};

export default GameSelectionWeb;
