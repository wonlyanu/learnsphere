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
  const navigate = useNavigate();

  useEffect(() => {
    const fullText = "WELCOME TO THE WORLD OF WEB DEVELOPMENT";
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 100);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
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

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
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
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        color: 'white',
        zIndex: 1,
        fontFamily: "'OnePieceFont', 'Arial', sans-serif"
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem', fontWeight: 'bold', textShadow: '0 0 10px black' }}>{text}</h1>
        <button
          onClick={() => setShowPopup(true)}
          style={{
            background: 'transparent',
            border: '2px solid white',
            color: 'white',
            padding: '0.3rem 0.6rem',
            margin: '1rem 0 1rem -3rem',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontFamily: "'OnePieceFont', 'Comic Sans MS', cursive, sans-serif"
          }}
        >
          View More
        </button>
      </div>
      <div style={{
        position: 'absolute',
        bottom: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1
      }}>
        <button
          onClick={() => navigate('/web-game-selection')}
          style={{
            background: 'green',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            fontSize: '1.2rem',
            borderRadius: '20px',
            boxShadow: '0 0 10px white',
            marginLeft: '-4rem',
            fontFamily: "'OnePieceFont', 'Comic Sans MS', cursive, sans-serif"
          }}
        >
          Get Started
        </button>
      </div>
      <div
        onClick={() => setShowChat(!showChat)}
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
          <div style={{ padding: '0.5rem', background: 'transparent', color: 'white', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Dev Assistant
            <button
              onClick={() => setShowChat(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}
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
                  color: 'white',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '10px',
                  maxWidth: '80%',
                  fontSize: '0.9rem'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} style={{ padding: '0.5rem', borderTop: '1px solid #333' }}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
              style={{
                width: '100%',
                padding: '0.3rem',
                background: '#333',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                outline: 'none',
                fontSize: '0.9rem'
              }}
            />
          </form>
        </div>
      )}
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
            maxWidth: '600px',
            maxHeight: '80vh',
            overflowY: 'auto',
            textAlign: 'left'
          }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>About Web Development</h2>
            <p>Web development is the practice of building and maintaining websites and web applications. It includes frontend (what users see) and backend (server-side logic) development, databases, APIs, and deployment.</p>
            <p>Key areas include:</p>
            <ul style={{ marginLeft: '1.5rem', lineHeight: '1.6' }}>
              <li><strong>Frontend:</strong> HTML, CSS, JavaScript, frameworks like React or Vue.</li>
              <li><strong>Backend:</strong> Servers, databases, APIs, authentication and business logic.</li>
              <li><strong>DevOps:</strong> CI/CD, containerization, and deployment.</li>
              <li><strong>Testing:</strong> Unit, integration, and end-to-end testing.</li>
              <li><strong>Accessibility:</strong> Making web apps usable for everyone.</li>
            </ul>
            <p>Explore the Frontend and Backend tracks to dive deeper!</p>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                background: 'white',
                color: 'black',
                border: 'none',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                marginTop: '1rem',
                borderRadius: '5px'
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
