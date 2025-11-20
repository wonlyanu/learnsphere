import React, { useState, useRef, useEffect } from "react";

export default function AiAssistant() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "👋 Hello! I'm your LearnSphere AI Assistant. How can I help you today?" }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = { sender: "user", text: inputText };
    setMessages((prev) => [...prev, userMsg]);

    const lower = inputText.toLowerCase();
    let response = "I can guide you about AI, Web Development, or Cybersecurity!";

    // 💻 Web Development
    if (lower.includes("web")) {
      response =
        "🌐 Web Development is divided into:\n\n" +
        "👉 **Frontend Development** – focuses on what users see. It uses HTML, CSS, JavaScript, and frameworks like React.\n\n" +
        "👉 **Backend Development** – handles the logic, database, and APIs. It involves Node.js, Express, MongoDB, etc.\n\n" +
        "Together, these make up Full-Stack Development, where you build complete, dynamic web apps!";
    }

    // 🧠 AI
    if (lower.includes("ai") && !lower.includes("why")) {
      response =
        "🤖 Artificial Intelligence (AI) focuses on building systems that can learn, think, and make decisions like humans.\n\n" +
        "It includes topics like Machine Learning, Deep Learning, and Natural Language Processing.\n\n" +
        "LearnSphere uses AI to personalize learning paths for every student — helping you master topics faster!";
    }

    // 🔐 Cybersecurity
    if (lower.includes("cyber")) {
      response =
        "🛡️ Cybersecurity protects systems, data, and networks from attacks.\n\n" +
        "It has two main domains:\n\n" +
        "🔸 **Defensive Security** – focuses on protecting data, monitoring systems, using firewalls, encryption, and secure authentication.\n\n" +
        "🔸 **Offensive Security** – involves ethical hacking, penetration testing, and finding vulnerabilities before attackers do.\n\n" +
        "Both roles are critical for building safe and secure digital systems!";
    }

    // 💡 Why LearnSphere AI
    if (lower.includes("why learnsphere") || lower.includes("what is learnsphere")) {
      response =
        "🎓 **Why LearnSphere AI?**\n\n" +
        "LearnSphere AI is not just another learning platform — it’s an *intelligent gamified experience!* 🧩\n\n" +
        "💠 Personalized Learning – AI adapts your path based on your progress.\n" +
        "💠 Gamification – Earn XP, badges, and ranks as you learn.\n" +
        "💠 Practical Skills – Learn through interactive quizzes, scenarios, and challenges.\n" +
        "💠 Tech-Focused – Covers key domains like Web Development, Cybersecurity, and AI itself!\n\n" +
        "In short, LearnSphere AI helps you **learn smarter, faster, and with fun!** 🚀";
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "ai", text: response }]);
    }, 600);

    setInputText("");
  };

  return (
    <>
      {/* 🤖 Floating Chat Icon */}
      <div
        onClick={() => setShowChat(!showChat)}
        style={{
          position: "fixed",
          bottom: "5%",
          right: "3%",
          zIndex: 9999,
          cursor: "pointer",
          fontSize: "3rem"
        }}
      >
        🤖
      </div>

      {/* 💬 Chat Box */}
      {showChat && (
        <div
          style={{
            position: "fixed",
            bottom: "15%",
            right: "3%",
            width: "320px",
            height: "430px",
            background: "rgba(0, 0, 0, 0.9)",
            color: "white",
            zIndex: 9999,
            borderRadius: "12px",
            border: "1px solid #444",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              background: "#222",
              padding: "0.6rem",
              fontWeight: "bold",
              textAlign: "center",
              borderBottom: "1px solid #333",
            }}
          >
            LearnSphere Assistant
            <button
              onClick={() => setShowChat(false)}
              style={{
                float: "right",
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "1.1rem",
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "0.5rem" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  margin: "0.3rem 0",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    background: msg.sender === "user" ? "#007bff" : "#333",
                    padding: "0.4rem 0.7rem",
                    borderRadius: "10px",
                    maxWidth: "85%",
                    whiteSpace: "pre-wrap",
                    fontSize: "0.9rem",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} style={{ padding: "0.4rem", borderTop: "1px solid #333" }}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask me about Web, AI, or Cybersecurity..."
              style={{
                width: "100%",
                padding: "0.4rem",
                background: "#222",
                color: "white",
                border: "none",
                borderRadius: "10px",
                outline: "none",
              }}
            />
          </form>
        </div>
      )}
    </>
  );
}
