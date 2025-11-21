// ✅ FINAL WORKING AUDIO VERSION
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Onboarding.css";

export default function Onboarding({ goToTechnology }) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  // -------------------------------------------------------
  // ✅ 1. PRELOAD AUDIO USING useRef (browser safe)
  // -------------------------------------------------------
  const whooshAudio = useRef(null);

  useEffect(() => {
    whooshAudio.current = new Audio("/whoosh_audio.mp3");  // file inside public
    whooshAudio.current.volume = 0.7;
  }, []);

  // -------------------------------------------------------
  // ✅ 2. PLAY AUDIO SAFELY (ALWAYS WORKS)
  // -------------------------------------------------------
  const playSound = () => {
    if (whooshAudio.current) {
      whooshAudio.current.currentTime = 0; // restart sound
      whooshAudio.current.play().catch(() => {});
    }
  };

  // ALL STEPS
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

    {
      type: "thought",
      title: "People who stay committed have a high chance of reaching their goals.",
    },

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

    {
      type: "thought",
      title: "I know it’s hard to be motivated, but LearnSphere keeps you engaged through fun games and themes!",
    },

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

  const techStep = onboardingData.findIndex(
    (d) => d.type === "question" && d.question === "Which are you more interested in?"
  );

  const selectOption = (id) => {
    setSelected(id === selected ? null : id);
  };

  // -------------------------------------------------------
  // Continue button handler WITH SOUND WORKING
  // -------------------------------------------------------
  const next = () => {
    playSound(); // 🔥 SOUND FINALLY WORKS

    if (current.type === "question" && !selected) return;

    if (step < onboardingData.length - 1) {
      if (step === techStep) {
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

  const lineVariants = {
    initial: { width: 0 },
    animate: { width: "100%", transition: { duration: 0.8, ease: "easeInOut" } },
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
          {/* WELCOME STEP */}
          {current.type === "welcome" && (
            <>
              <img src="/images/logo.jpeg" className="onb-logo" width="100" height="100" />
              <h1 className="onb-title">{current.title}</h1>
              <p className="onb-sub">{current.subtitle}</p>
              <motion.button className="onb-continue big" onClick={next}>Continue →</motion.button>
            </>
          )}

          {/* QUESTION / THOUGHT */}
          {(current.type === "question" || current.type === "thought") && (
            <>
              <div className="onb-color-line-top" />

              <h2 className="onb-title">{current.question || current.title}</h2>

              {current.type === "question" && (
                <div className="choices-grid">
                  {current.options.map((opt) => {
                    const sel = selected === opt.id;
                    return (
                      <motion.div
                        key={opt.id}
                        className={`choice-card choice-label-only ${sel ? "selected" : ""}`}
                        onClick={() => selectOption(opt.id)}
                      >
                        <div className="choice-label">{opt.label}</div>
                        <div className={`choice-dot ${sel ? "show" : ""}`} />
                      </motion.div>
                    );
                  })}
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

          {/* FINAL STEP */}
          {current.type === "final" && (
            <>
              <h1 className="onb-title">{current.title}</h1>
              <motion.button className="onb-continue big" onClick={next}>Continue →</motion.button>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
