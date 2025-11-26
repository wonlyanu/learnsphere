import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Onboarding.css";

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

export default function Onboarding({ goToTechnology }) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(null);
  const [email, setEmail] = useState("");
  const [showAiNotification, setShowAiNotification] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const whooshAudio = useRef(null);

  useEffect(() => {
    whooshAudio.current = new Audio("/whoosh_audio.mp3");
    whooshAudio.current.volume = 0.7;
  }, []);

  const playSound = () => {
    if (whooshAudio.current) {
      whooshAudio.current.currentTime = 0;
      whooshAudio.current.play().catch(() => {});
    }
  };

  // --- FINAL MERGED ONBOARDING DATA ---
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

    // NEW EMAIL STEP
    { type: "email_prompt", title: "Email Prompt" },

    { type: "thought", title: "LearnSphere keeps you motivated through games, themes and more!" },

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

  const technologyStepIndex = 1;
  const reminderStepIndex = 5;
  const emailPromptIndex = 6;
  const playgroundStepIndex = 8;

  const selectOption = (optId) => {
    setSelected(optId === selected ? null : optId);
  };

  const next = async () => {
    playSound();

    //--- Requirement checks ---
    if (current.type === "question" && !selected) return;

    let nextStep = step + 1;

    //--- Handle Reminder Step ---
    if (step === reminderStepIndex) {
      localStorage.setItem("dailyReminder", selected);

      if (selected === "skip") {
        nextStep = emailPromptIndex + 1;
      }
    }

    //--- Handle Email Step ---
    if (step === emailPromptIndex) {
      if (!isValidEmail(email)) return;

      localStorage.setItem("userEmail", email);

      setShowAiNotification(true);

      try {
        await fetch("http://localhost:5000/api/reminder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            allow: localStorage.getItem("dailyReminder"),
          }),
        });
      } catch (error) {
        console.error("Reminder API Failed:", error);
      }

      setTimeout(() => {
        setShowAiNotification(false);
        setStep(nextStep);
      }, 1500);

      return;
    }

    //--- Saving Preferences ---
    if (step === technologyStepIndex) {
      localStorage.setItem("selectedTechnology", selected);
    }

    if (step === playgroundStepIndex) {
      localStorage.setItem("selectedPlayground", selected);
    }

    //--- Final Step ---
    if (nextStep >= onboardingData.length) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);

      const play = localStorage.getItem("selectedPlayground");

      if (play) {
        if (play === "anime") window.location.href = "http://localhost:3000";
        if (play === "scientific") window.location.href = "http://localhost:5174";
      }

      return;
    }

    setSelected(null);
    setStep(nextStep);
  };

  // --- Framer Variants ---
  const cardVariants = {
    enter: { opacity: 0, y: 20, scale: 0.98 },
    center: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.98 },
  };

  const lineVariants = {
    initial: { width: 0 },
    animate: { width: "100%", transition: { duration: 0.8 } },
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

          {/* ---------- EMAIL STEP UI ---------- */}
          {current.type === "email_prompt" && (
            <>
              <motion.div className="onb-color-line-top" variants={lineVariants} initial="initial" animate="animate" />
              <h2 className="onb-title neon">Where should we send your reminders?</h2>

              <AnimatePresence mode="wait">
                {showAiNotification ? (
                  <motion.div
                    key="ai-notif"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="ai-notification-block"
                  >
                    🤖 <p>Confirmed! Reminders will be sent to <b>{email}</b></p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="email-box"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="onb-email-input-container"
                  >
                    <p className="onb-sub">Enter your email address</p>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="onb-email-input"
                    />
                    <motion.button
                      className="onb-continue send-btn"
                      onClick={next}
                      disabled={!isValidEmail(email)}
                    >
                      Send →
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          {/* ---------- DEFAULT UI (Questions, Thoughts, Welcome, Final) ---------- */}
          {(current.type === "welcome" ||
            current.type === "question" ||
            current.type === "thought" ||
            current.type === "final") && (
            <>
              {(current.type !== "welcome" && current.type !== "final") && (
                <motion.div
                  className="onb-color-line-top"
                  variants={lineVariants}
                  initial="initial"
                  animate="animate"
                />
              )}

              <h2 className="onb-title neon">{current.title || current.question}</h2>

              {current.type === "question" && (
                <div className="choices-grid">
                  {current.options.map((opt) => {
                    const isSel = selected === opt.id;
                    return (
                      <motion.div
                        key={opt.id}
                        className={`choice-card choice-label-only ${isSel ? "selected" : ""}`}
                        onClick={() => selectOption(opt.id)}
                        whileHover={{ y: -6 }}
                      >
                        <div className="choice-label">{opt.label}</div>
                        <div className={`choice-dot ${isSel ? "show" : ""}`} />
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
