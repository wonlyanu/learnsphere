import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CarouselHomeWeb = () => {
  const [text, setText] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I'm your AI assistant for web development. How can I help you?" }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const bgAudioRef = useRef(null);   // 🎵 Background music reference
  const navigate = useNavigate();

  // ▶ CLICK SOUND
  const playClickSound = () => {
    const audio = new Audio('/click.mp3');
    audio.volume = 1.0;
    audio.play().catch(() => {});
  };

  // ▶ Typing animation
  useEffect(() => {
    const fullText = "WELCOME TO THE WORLD OF WEB DEVELOPMENT";
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 100);
  }, []);

  // ▶ Auto-scroll chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messages]);

  // ▶ Chat message handler
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      playClickSound();

      setMessages(prev => [...prev, { sender: 'user', text: inputText }]);
      const lowerText = inputText.toLowerCase();
      let response = 'I can help with frontend, backend, or general web development topics.';

      if (lowerText.includes('frontend')) {
        response = 'Frontend development focuses on HTML, CSS, JavaScript, and UX. Want to learn more?';
      } else if (lowerText.includes('backend')) {
        response = 'Backend development focuses on servers, databases, and APIs.';
      } else if (lowerText.includes('basics')) {
        response = 'Web development basics include semantic HTML, responsive CSS, and building interactive UIs with JavaScript.';
      }

      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'ai', text: response }]);
      }, 500);

      setInputText('');
    }
  };

  // ▶ Background Music Start / Stop (WARNING FIXED)
  useEffect(() => {
    const audio = bgAudioRef.current;  // ⭐ Save value now

    if (audio) {
      audio.volume = 0.4;
      audio.play().catch(() => {});
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>

      {/* 🎵 BACKGROUND MUSIC */}
      <audio ref={bgAudioRef} src="/1.mp3" loop />

      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      >
        <source src="/home1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔙 Back Button */}
      <div style={{ position: 'absolute', top: '5%', left: '3%', zIndex: 2 }}>
        <button
          onClick={() => { playClickSound(); navigate('/'); }}
          style={{
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
            border: '2px solid white',
            padding: '0.4rem 0.8rem',
            cursor: 'pointer',
            fontSize: '1rem',
            borderRadius: '10px',
            boxShadow: '0 0 5px white'
          }}
        >
          ⬅ Back
        </button>
      </div>

      {/* Heading + View More */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        color: 'white',
        zIndex: 1
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem', fontWeight: 'bold', textShadow: '0 0 10px black' }}>
          {text}
        </h1>

        <button
          onClick={() => { playClickSound(); setShowPopup(true); }}
          style={{
            background: 'transparent',
            border: '2px solid white',
            color: 'white',
            padding: '0.3rem 0.6rem',
            cursor: 'pointer',
            fontSize: '0.9rem',
             fontFamily: "'OnePieceFont', 'Comic Sans MS', cursive, sans-serif"
          }}
        >
          View More
        </button>
      </div>

      {/* Get Started */}
      <div style={{
        position: 'absolute',
        bottom: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1
      }}>
        <button
          onClick={() => { playClickSound(); navigate('/web-game-selection'); }}
          style={{
            background: 'green',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            fontSize: '1.2rem',
            borderRadius: '20px',
            boxShadow: '0 0 10px white',
             fontFamily: "'OnePieceFont', 'Comic Sans MS', cursive, sans-serif"
          }}
        >
          Get Started
        </button>
      </div>

      {/* Chat Bot Icon */}
      <div
        onClick={() => { playClickSound(); setShowChat(!showChat); }}
        style={{
          position: 'fixed',
          bottom: '5%',
          right: '3%',
          zIndex: 10,
          cursor: 'pointer',
          fontSize: '3rem'
        }}
      >
        🤖
      </div>

      {showChat && (
        <div style={{
          position: 'fixed',
          bottom: '15%',
          right: '3%',
          width: '300px',
          height: '400px',
          background: 'rgba(0, 0, 0, 0.8)',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          color: 'white',
          borderRadius: '10px',
          border: '1px solid white'
        }}>
          <div style={{ padding: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
            Dev Assistant
            <button
              onClick={() => { playClickSound(); setShowChat(false); }}
              style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
            {messages.map((msg, index) => (
              <div key={index} style={{
                marginBottom: '0.5rem',
                textAlign: msg.sender === 'user' ? 'right' : 'left'
              }}>
                <div style={{
                  display: 'inline-block',
                  background: msg.sender === 'user' ? '#007bff' : '#333',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '10px'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} style={{ padding: '0.5rem' }}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type here..."
              style={{
                width: '100%',
                padding: '0.3rem',
                background: '#333',
                color: 'white',
                borderRadius: '10px',
                border: 'none'
              }}
            />
          </form>
        </div>
      )}

      {/* Popup */}
      {showPopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2
        }}>
          <div style={{
            background: 'black',
            color: 'white',
            padding: '2rem',
            borderRadius: '10px',
            width: '600px'
          }}>
            <h2>About Web Development</h2>

            <button
              onClick={() => { playClickSound(); setShowPopup(false); }}
              style={{
                background: 'white',
                color: 'black',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '1rem'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselHomeWeb;