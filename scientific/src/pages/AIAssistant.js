import React, { useState } from "react";
import "./AIAssistant.css";
import { MessageCircle, X } from "lucide-react"; // nice icons

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hi! I'm your LearnSphere AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { from: "user", text: input }]);

    // Simple example responses — you can expand this later
    let botReply = "🤔 I'm not sure yet, but I'm learning!";
    if (input.toLowerCase().includes("frontend"))
      botReply = "💻 Frontend helps you create beautiful interfaces using HTML, CSS, and React!";
    else if (input.toLowerCase().includes("backend"))
      botReply = "⚙️ Backend powers the logic, databases, and APIs behind every app!";
    else if (input.toLowerCase().includes("cyber"))
      botReply = "🛡️ Cybersecurity protects data and systems from digital threats!";
    else if (input.toLowerCase().includes("why learnsphere"))
      botReply = "🚀 LearnSphere AI helps you learn interactively through gamified quests in web dev, cybersecurity, and more!";

    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
    }, 800);

    setInput("");
  };

  return (
    <div className="ai-assistant">
      {/* Floating Icon */}
      {!open && (
        <button className="chat-toggle" onClick={() => setOpen(true)}>
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <h4>LearnSphere AI Assistant 🤖</h4>
            <button className="close-btn" onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
