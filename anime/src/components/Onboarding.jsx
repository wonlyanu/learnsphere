import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Onboarding.css";

export default function Onboarding({ goToTechnology }) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  // 🔊 Preload audio ONCE and reuse (fixes silent issue)
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/whoosh_audio.mp3");   // your updated path
    audioRef.current.volume = 0.7;

    // Fix: allow browser to load it first
    audioRef.current.load();
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // rewind
      audioRef.current.play().catch((err) => {
        console.log("Audio blocked by browser until interaction:", err);
      });
    }
  };

  // -----------------------------------------
  // Onboarding Steps
  // -----------------------------------------
  const onboardingData = [
    { type: "welcome", title: "Hello! I am your guide.", subtitle: "Let's get to know each other" },

    {
      type: "question",
      question: "Which are you more interested in?",
      options: [
        { id: "sec", label: "Cybersecurity" },
        { id: "web", label: "Web Development" },
      ],
    },

    {
      type: "question",
      question: "Why are you learning skills for?",
      options: [
        { id: "fun", label: "For fun" },
        { id: "skill_enh", label: "Skill enhancement" },
        { id: "resume", label: "Resume boost" },
      ],
    },

    { type: "thought", title: "People who stay committed have a high chance of reaching their goals." },

    {
      type: "question",
      question: "How much of your time are you gonna commit for your skill?",
      options: [
        { id: "10", label: "10 mins" },
        { id: "15", label: "15 mins" },
        { id: "25", label: "25 mins" },
        { id: "30", label: "30 mins" },
      ],
    },

    {
      type: "question",
      question: "Do you want LearnSphere to send you daily reminders?",
      options: [
        { id: "allow", label: "Allow" },
        { id: "skip", label: "Skip" },
      ],
    },

    { type: "thought", title: "I know it’s hard to be motivated, but LearnSphere keeps you engaged through fun games and themes!" },

    {
      type: "question",
      question: "Before diving in, choose your personal playground",
      options: [
        { id: "anime", label: "Anime" },
        { id: "scientific", label: "Scientific" },
      ],
    },

    { type: "final", title: "You're ready — let's learn!" },
  ];

  const current = onboardingData[step];

  const technologyStepIndex = onboardingData.findIndex(
    (d) => d.type === "question" && d.question === "Which are you more interested in?"
  );

  const selectOption = (optId) => {
    setSelected(optId === selected ? null : optId);
  };

  // -----------------------------------------
  // NEXT Button — Audio ALWAYS Plays Now
  // -----------------------------------------
  const next = () => {
    playSound(); // 🔥 sound works now

    if (current.type === "question" && !selected) return;

    if (step < onboardingData.length - 1) {
      if (step === technologyStepIndex) {
        localStorage.setItem("selectedTechnology", selected);
      }
      if (step === 7) {
        localStorage.setItem("selectedPlayground", selected);
      }

      setStep((s) => s + 1);
      setSelected(null);

    } else {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);

      const play = localStorage.getItem("selectedPlayground");
      if (play) {
        if (play === "anime") navigate("/anime");
        if (play === "scientific") navigate("/scientific");
        localStorage.removeItem("selectedPlayground");
      } else {
        const tech = localStorage.getItem("selectedTechnology") || "sec";
        localStorage.removeItem("selectedTechnology");
        if (typeof goToTechnology === "function") goToTechnology(tech);
      }
    }
  };

  // Animations
  const cardVariants = {
    enter: { opacity: 0, y: 20, scale: 0.98 },
    center: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.98 },
  };

  return (
    <div className="onboarding-root">

      <video autoPlay loop muted className="onb-bg">
        <source src="/videos/onback.mp4" type="video/mp4" />
      </video>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className="onb-card glass-card"
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45 }}
        >
          {/* WELCOME */}
          {current.type === "welcome" && (
            <>
              <img src="/images/logo.jpeg" alt="logo" className="onb-logo" width="100" />
              <h1 className="onb-title">{current.title}</h1>
              <p className="onb-sub">{current.subtitle}</p>

              <motion.button
                className="onb-continue big"
                onClick={next}
                whileHover={{ scale: 1.03 }}
              >
                Continue →
              </motion.button>
            </>
          )}

          {/* Questions & Thoughts */}
          {(current.type === "question" || current.type === "thought") && (
            <>
              <h2 className="onb-title">{current.question || current.title}</h2>

              {current.type === "question" && (
                <div className="choices-grid">
                  {current.options.map((opt) => (
                    <motion.div
                      key={opt.id}
                      className={`choice-card ${selected === opt.id ? "selected" : ""}`}
                      onClick={() => selectOption(opt.id)}
                      whileHover={{ y: -6 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="choice-label">{opt.label}</div>
                      <div className={`choice-dot ${selected === opt.id ? "show" : ""}`} />
                    </motion.div>
                  ))}
                </div>
              )}

              <motion.button
                className="onb-continue"
                onClick={next}
                disabled={current.type === "question" && !selected}
              >
                Continue →
              </motion.button>
            </>
          )}

          {/* Final */}
          {current.type === "final" && (
            <>
              <h1 className="onb-title">{current.title}</h1>

              <motion.button
                className="onb-continue big"
                onClick={next}
                whileHover={{ scale: 1.03 }}
              >
                Continue →
              </motion.button>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
