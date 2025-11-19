// Onboarding.jsx

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Onboarding.css"; // Ensure this is present and correct

// A simple email validation utility
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

export default function Onboarding({ goToTechnology }) {
    // Initial State
    const [step, setStep] = useState(1); 
    const [selected, setSelected] = useState(null);
    const [email, setEmail] = useState(""); // NEW: State for email input
    const [showAiNotification, setShowAiNotification] = useState(false); // NEW: State for AI notification
    const [showConfetti, setShowConfetti] = useState(false);
    const [showLines, setShowLines] = useState(false); 

    // --- UPDATED onboardingData: New Step at Index 6 ---
    const onboardingData = [
        // Step 0: Welcome (Index 0)
        { type: "welcome", title: "Hello! I am your guide.", subtitle: "Let's get to know each other" },
        // Step 1: Interest (Index 1)
        {
            type: "question",
            question: "Which are you more interested in?",
            options: [
                { id: "sec", label: "Cybersecurity" },
                { id: "web", label: "Web Development" },
            ],
        },
        // Step 2: Motivation (Index 2)
        {
            type: "question",
            question: "Why are you learning skills for?",
            options: [
                { id: "fun", label: "For fun" },
                { id: "skill_enh", label: "Skill enhancement" },
                { id: "resume", label: "Resume boost" },
            ],
        },
        // Step 3: Commitment Thought (Index 3)
        { type: "thought", title: "People who stay committed have a high chance of reaching their goals. " },
        // Step 4: Time Commitment (Index 4)
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

        // Step 5: Daily Reminder (Index 5)
        {
            type: "question",
            question: "Do you want LearnSphere to send you daily reminders?",
            options: [
                { id: "allow", label: "Allow" },
                { id: "skip", label: "Skip" },
            ],
        },

        // *** NEW STEP 6: Email Prompt (Index 6) ***
        { type: "email_prompt", title: "Email Prompt" },

        // Step 7: Motivation Thought (Index 7, was 6)
        { type: "thought", title: "I know its hard to be motivated, but LearnSphere keeps you engaging through fun games, themes... so dive in! " },

        // Step 8: Personal Playground (Index 8, was 7)
        {
            type: "question",
            question: "Before diving in, choose your personal playground",
            options: [
                { id: "anime", label: "Anime" },
                { id: "scientific", label: "Scientific" },
            ],
        },

        // Step 9: Final Step (Index 9, was 8)
        { type: "final", title: "You're ready — let's learn! " },
    ];
    // -------------------------------------------------------------------

    const current = onboardingData[step];

    const technologyStepIndex = onboardingData.findIndex(d => d.type === "question" && d.question === "Which are you more interested in?");
    const reminderStepIndex = onboardingData.findIndex(d => d.type === "question" && d.question === "Do you want LearnSphere to send you daily reminders?");
    const emailPromptStepIndex = onboardingData.findIndex(d => d.type === "email_prompt");
    const playgroundStepIndex = onboardingData.findIndex(d => d.question && d.question.includes("choose your personal playground"));

    const selectOption = (optId) => {
        setSelected(optId === selected ? null : optId);
    };

    const next = async () => {
  // 1️⃣ Check selection/input requirements
  if (current.type === "question" && !selected) return;

  let nextStep = step + 1;

  // 2️⃣ Handle Reminder Step (Index 5)
  if (step === reminderStepIndex) {
    localStorage.setItem("dailyReminder", selected);

    // If 'skip' chosen, skip the Email Prompt step (Index 6)
    if (selected === "skip") {
      nextStep = emailPromptStepIndex + 1;
    }
  }

  // 3️⃣ Handle Email Prompt Step (Index 6)
  else if (step === emailPromptStepIndex) {
    if (!isValidEmail(email)) return;

    // Store email locally
    localStorage.setItem("userEmail", email);
    setShowAiNotification(true);

    // ✅ Send to backend (reminder API)
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
      console.error("Failed to send reminder:", error);
    }

    // Wait for 1.5 seconds before proceeding
    setTimeout(() => {
      setStep(nextStep);
      setSelected(null);
      setShowAiNotification(false);
    }, 1500);

    return; // Exit to wait for timeout
  }

  // 4️⃣ Handle Data Storage Steps
  if (step === technologyStepIndex) {
    localStorage.setItem("selectedTechnology", selected);
  }
  if (step === playgroundStepIndex) {
    localStorage.setItem("selectedPlayground", selected);
  }

  // 5️⃣ Final Step Logic
  if (nextStep >= onboardingData.length) {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2500);

    const selectedPlayground = localStorage.getItem("selectedPlayground");
    if (selectedPlayground) {
     if (selectedPlayground === "anime") {
    window.location.href = "http://localhost:3000";   // Anime folder
} else if (selectedPlayground === "scientific") {
    window.location.href = "http://localhost:5174";   // Scientific folder FIX
}

      localStorage.removeItem("selectedPlayground");
    } else if (typeof goToTechnology === "function") {
      const selectedTechId =
        localStorage.getItem("selectedTechnology") || "sec";
      localStorage.removeItem("selectedTechnology");
      goToTechnology(selectedTechId);
    }
    return;
  }

  // 6️⃣ Default Step Progression
  setStep(nextStep);
  setSelected(null);
};


    // Framer Motion Variants (Unchanged)
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
                    {/* Step 0, 1, 2, 3, 4, 5, 7, 8, 9 Rendering */}
                    {(current.type === "welcome" || current.type === "question" || current.type === "thought" || current.type === "final") && (
                        <>
                            {(current.type !== "welcome" && current.type !== "final") && (
                                <motion.div className="onb-color-line-top" variants={lineVariants} initial="initial" animate="animate" />
                            )}
                            
                            {/* Title/Question */}
                            <h2 className="onb-title neon">{current.title || current.question}</h2>

                            {/* Options for Question steps */}
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
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <div className="choice-label">{opt.label}</div>
                                                <div className={`choice-dot ${isSel ? "show" : ""}`} />
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}
                            
                            {/* Continue Button */}
                            <motion.button
                                className={`onb-continue ${current.type === "welcome" || current.type === "final" ? 'big' : ''}`}
                                onClick={next}
                                disabled={current.type === "question" && !selected}
                                whileHover={{ scale: (selected || current.type !== "question") ? 1.03 : 1 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Continue →
                            </motion.button>
                        </>
                    )}

                    {/* *** Step 6: EMAIL PROMPT STEP RENDER LOGIC *** */}
                    {current.type === "email_prompt" && (
                        <>
                            <motion.div className="onb-color-line-top" variants={lineVariants} initial="initial" animate="animate" />
                            
                            <h2 className="onb-title neon">Where should we send your reminders?</h2>
                            
                            <AnimatePresence mode="wait">
                                {showAiNotification ? (
                                    // AI Notification Block
                                    <motion.div
                                        key="ai-notif"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="ai-notification-block"
                                    >
                                        <div className="ai-icon">🤖</div>
                                        <p className="ai-message">
                                            **Confirmed!** Your AI guide will send daily reminders to **{email}**.
                                        </p>
                                    </motion.div>
                                ) : (
                                    // Email Input Block
                                    <motion.div
                                        key="email-input"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="onb-email-input-container"
                                    >
                                        <p className="onb-sub">Enter your email address to receive daily learning reminders.</p>
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
                                            whileHover={{ scale: isValidEmail(email) ? 1.03 : 1 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Send →
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </>
                    )}
                    {/* *** END EMAIL PROMPT STEP RENDER LOGIC *** */}

                </motion.div>
            </AnimatePresence>
        </div>
    );
}