import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti"; 
import RobotIntro from "../components/RobotIntro"; // 👈 robot intro
import "./AdvancedTest.css";

const QUESTIONS = [
  { 
    q: "Which of the following ensures asynchronous communication between microservices?", 
    a: "Message Queue",
    explanation: "Message Queues allow asynchronous communication between microservices without waiting for immediate responses."
  },
  { 
    q: "In GraphQL, what is used to modify or create data?", 
    a: "Mutation",
    explanation: "Mutations in GraphQL are used to modify or create data, unlike Queries which only fetch data."
  },
  { 
    q: "What protocol provides full-duplex real-time communication?", 
    a: "WebSocket",
    explanation: "WebSocket provides a full-duplex connection enabling real-time bidirectional communication between client and server."
  },
  { 
    q: "Redis is commonly used for:", 
    a: "In-memory caching",
    explanation: "Redis stores frequently accessed data in memory to speed up read/write operations, reducing load on the database."
  },
  { 
    q: "What is the main purpose of CI/CD in backend development?", 
    a: "Automating testing and deployment",
    explanation: "CI/CD pipelines automate testing and deployment, improving development speed and reliability."
  },
  { 
    q: "Which security practice helps prevent SQL Injection?", 
    a: "Input validation & sanitization",
    explanation: "Validating and sanitizing input prevents malicious SQL queries from being executed."
  },
  { 
    q: "AWS Lambda is an example of:", 
    a: "Serverless computing",
    explanation: "AWS Lambda allows running backend code without managing servers, enabling serverless architectures."
  },
  { 
    q: "Winston in Node.js is used for:", 
    a: "Logging",
    explanation: "Winston is a Node.js logging library used to track application behavior and errors."
  },
  { 
    q: "Horizontal scaling involves:", 
    a: "Adding more servers",
    explanation: "Horizontal scaling adds multiple servers to distribute load, unlike vertical scaling which upgrades a single server."
  },
  { 
    q: "Why use WebSocket over HTTP for a chat application?", 
    a: "Enables real-time bidirectional communication",
    explanation: "WebSockets allow continuous two-way communication, ideal for chat applications needing instant updates."
  },
];




export default function AdvancedTest() {
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

      localStorage.setItem("advancedProgress", "1");

      setTimeout(() => {
        setShowTrophy(false);
        setShowConfetti(false);
        alert(`🎉 Test passed! Advanced Level 1 unlocked. (Score: ${score}/10)`);
        navigate("/advanced");
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
      <button className="back-button" onClick={() => navigate("/advanced")}>
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
        🏆 Claim Glory
      </button>

      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={600}
          gravity={0.2}
        />
      )}

      {showTrophy && (
        <div className="trophy-overlay">
          <div className="trophy">🏆</div>
        </div>
      )}
    </div>
  );
}
