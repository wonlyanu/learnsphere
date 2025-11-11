import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from './GameContext';

const Workspace = () => {
  const { stars, badges } = useGame();
  const [notes, setNotes] = useState('');
  const [savedMessage, setSavedMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedNotes = localStorage.getItem('workspaceNotes');
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  const handleNotesChange = (e) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    localStorage.setItem('workspaceNotes', newNotes);
  };

  const handleSave = () => {
    localStorage.setItem('workspaceNotes', notes);
    setSavedMessage('Notes saved!');
    setTimeout(() => setSavedMessage(''), 2000);
  };

  return (
    <div style={{
      height: '100vh',
      background: 'black',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          background: 'transparent',
          border: '2px solid white',
          color: 'white',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          borderRadius: '5px'
        }}
      >
        Back
      </button>
      <h1 style={{fontFamily: "'OnePieceFont', serif"}}>My Workspace</h1>
      <div style={{
        background: 'rgba(0,0,0,0.8)',
        padding: '2rem',
        borderRadius: '10px',
        maxWidth: '800px',
        width: '100%'
      }}>
        <h2>Your Stars: {stars}</h2>
        <h2>My Badges: {badges.length > 0 ? badges.join(', ') : 'None yet'}</h2>
        <textarea
          value={notes}
          onChange={handleNotesChange}
          placeholder="Type your notes here..."
          style={{
            width: '100%',
            height: '300px',
            background: 'gray',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '1rem',
            fontSize: '1rem',
            resize: 'vertical'
          }}
        />
        <button
          onClick={handleSave}
          style={{
            background: 'blue',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Save Notes
        </button>
        {savedMessage && <p style={{color: 'green', marginTop: '0.5rem'}}>{savedMessage}</p>}
      </div>
    </div>
  );
};

export default Workspace;
