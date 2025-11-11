import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import RobotIntro from "../components/RobotIntro"; // 👈 robot intro
import "./AdvancedTest.css";

const QUESTIONS = [
  { 
    q: "What is the purpose of the Node.js event loop?", 
    a: "Handle asynchronous I/O",
    explanation: "The event loop allows Node.js to handle multiple I/O operations without blocking the main thread."
  },
  { 
    q: "Which HTTP method is used to update a resource in a REST API?", 
    a: "PUT",
    explanation: "PUT (or PATCH) is used to modify existing resources in REST APIs."
  },
  { 
    q: "A One-to-Many database relationship example is:", 
    a: "User → Posts",
    explanation: "One user can have multiple posts; this is a One-to-Many relationship."
  },
  { 
    q: "JWT (JSON Web Token) is primarily used for:", 
    a: "Authentication",
    explanation: "JWT is a token-based authentication system used to verify user identity."
  },
  { 
    q: "Which Node.js module is commonly used for logging HTTP requests?", 
    a: "Morgan",
    explanation: "Morgan logs HTTP requests for monitoring and debugging purposes."
  },
  { 
    q: "What is the purpose of database indexing?", 
    a: "Improve query performance",
    explanation: "Indexing speeds up query operations by allowing faster lookups on table columns."
  },
  { 
    q: "Soft delete in databases is used to:", 
    a: "Temporarily mark records inactive",
    explanation: "Soft delete marks data as inactive instead of removing it permanently."
  },
  { 
    q: "Which tool is commonly used for monitoring Node.js applications in production?", 
    a: "PM2",
    explanation: "PM2 monitors Node.js apps, keeps them running, and provides logs."
  },
  { 
    q: "Redis is mainly used for:", 
    a: "Caching",
    explanation: "Redis stores frequently accessed data in memory to reduce database load."
  },
  { 
    q: "Load balancing is used to:", 
    a: "Distribute traffic across multiple servers",
    explanation: "Load balancing distributes incoming traffic to multiple servers for better performance and scalability."
  },
];


export default function IntermediateTest() {
  const [answers, setAnswers] = useState({});
  const [showTrophy, setShowTrophy] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showIntro, setShowIntro] = useState(true); // 👈 robot intro toggle
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const handleSubmit = () => {
    let score = 0;
    QUESTIONS.forEach((q, i) => {
      if (
        answers[i] &&
        answers[i].toLowerCase().includes(q.a.toLowerCase().split(" ")[0])
      ) {
        score++;
      }
    });

    if (score >= 6) {
      setShowTrophy(true);
      setShowConfetti(true);
      localStorage.setItem("intermediateProgress", "1");

      setTimeout(() => {
        setShowTrophy(false);
        setShowConfetti(false);
        alert(`🎉 Test passed! Intermediate Level 1 unlocked. (Score: ${score}/10)`);
        navigate("/intermediate");
      }, 4000);
    } else {
      alert(`❌ You need at least 6 correct. (Score: ${score}/10)`);
    }
  };
  // Show robot first
    if (showIntro) {
      return <RobotIntro onFinish={() => setShowIntro(false)} />;
      
    }

  return (
    <div className="advanced-test">
        {/* 🔙 Back button same as Levels */}
      <button className="back-button" onClick={() => navigate("/intermediate")}>
        ← Back
      </button>
      <h1>⚡ Spark the Journey</h1>
      <i><p>🧩 Puzzle of Progress</p></i>

      <ol>
        {QUESTIONS.map((q, i) => (
          <li key={i}>
            <p>{q.q}</p>
            <input
              type="text"
              placeholder="Type your answer..."
              value={answers[i] || ""}
              onChange={(e) => handleChange(i, e.target.value)}
            />
          </li>
        ))}
      </ol>

      <button className="test-submit" onClick={handleSubmit}>
        🏆 Claim Mastery
      </button>

      {showConfetti && <Confetti numberOfPieces={300} gravity={0.2} />}
      {showTrophy && (
        <div className="trophy-overlay">
          <div className="trophy">🏆</div>
        </div>
      )}
    </div>
  );
}
