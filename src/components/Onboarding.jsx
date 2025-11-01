// In Onboarding.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Onboarding.css"; // <--- ADD THIS LINE (OR UNCOMMENT IT)

// ... rest of your component

export default function Onboarding({ goToTechnology }) {
  const [step, setStep] = useState(1); // STARTING AT STEP 1 (Interest Question)
  const [selected, setSelected] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showLines, setShowLines] = useState(false); 
  
  // Adjusted STARTING step to 1 to match the screenshot state.
  // You might want to keep it at 0 if you want the 'Welcome' step to show first.

  // --- UPDATED onboardingData: Images removed per user request ---
  const onboardingData = [
    // Step 0: Welcome (If step is 0)
    { type: "welcome", title: "Hello! I am your guide.", subtitle: "Let's get to know each other" },

    // Step 1: Interest (Image removed) - CORRESPONDS TO SCREENSHOT
    {
      type: "question",
      question: "Which are you more interested in?",
      options: [
        { id: "sec", label: "Cybersecurity" },
        { id: "web", label: "Web Development" },
      ],
    },

    // Step 2: Motivation (Image removed)
    {
      type: "question",
      question: "Why are you learning skills for?",
      options: [
        { id: "fun", label: "For fun" },
        { id: "skill_enh", label: "Skill enhancement" },
        { id: "resume", label: "Resume boost" },
      ],
    },

    // Step 3: Commitment Thought
    { type: "thought", title: "People who stay committed have a high chance of reaching their goals. " },

    // Step 4: Time Commitment (Image removed)
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

    // Step 5: Daily Reminder (Image removed)
    {
      type: "question",
      question: "Do you want LearnSphere to send you daily reminders?",
      options: [
        { id: "allow", label: "Allow" },
        { id: "skip", label: "Skip" },
      ],
    },

    // Step 6: Motivation Thought
    { type: "thought", title: "I know its hard to be motivated, but LearnSphere keeps you engaging through fun games, themes... so dive in! " },

    // Step 7: Personal Playground (Image removed)
    {
      type: "question",
      question: "Before diving in, choose your personal playground",
      options: [
        { id: "anime", label: "Anime" },
        { id: "scientific", label: "Scientific" },
      ],
    },

    // Step 8: Final Step
    { type: "final", title: "You're ready — let's learn! " },
  ];
  // -------------------------------------------------------------------

  const current = onboardingData[step];
  
  // Adjusted index 1 for technology selection to handle the case where
  // the initial step is 0 (Welcome) or 1 (Interest).
  const technologyStepIndex = onboardingData.findIndex(d => d.type === "question" && d.question === "Which are you more interested in?");

  const selectOption = (optId) => setSelected(optId === selected ? null : optId);

  const next = () => {
    // Check if a selection is required for 'question' type steps
    if (current.type === "question" && !selected) return;

    // Handle navigation logic
    if (step < onboardingData.length - 1) {
      // If we're moving from the technology question (step 1 in the array, index 1)
      if (step === technologyStepIndex) {
        // Save the selected technology before moving on
        localStorage.setItem("selectedTechnology", selected);
      }
      // If we're moving from the playground question (step 7)
      if (step === 7) {
        // Save the selected playground
        localStorage.setItem("selectedPlayground", selected);
      }
      setStep((s) => s + 1);
      setSelected(null); // Clear selection for the next step
    } else {
      // Final Step Logic
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);

      // Check if playground was selected
      const selectedPlayground = localStorage.getItem("selectedPlayground");
      if (selectedPlayground) {
        // Redirect to subapp based on playground
        if (selectedPlayground === "anime") {
          window.location.href = "http://localhost:3000"; // Anime runs on 3000
        } else if (selectedPlayground === "scientific") {
          window.location.href = "http://localhost:5174"; // Scientific runs on 5174
        }
        localStorage.removeItem("selectedPlayground"); // Clean up
      } else {
        // Fallback to technology page
        if (typeof goToTechnology === "function") {
          const selectedTechId = localStorage.getItem("selectedTechnology") || "sec"; // Default to 'sec'
          localStorage.removeItem("selectedTechnology"); // Clean up storage
          goToTechnology(selectedTechId);
        }
      }
    }
  };


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
      {/* Video background - assuming '/videos/onback.mp4' is available */}
      <video autoPlay loop muted className="onb-bg">
        <source src="/videos/onback.mp4" type="video/mp4" />
      </video>

      {/* Confetti (Removed for simplicity, state kept for potential future re-implementation) */}
      {/* {showConfetti && <Confetti recycle={false} numberOfPieces={140} />} */}

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
          {/* Welcome Step */}
          {current.type === "welcome" && (
            <>
              {/* Assuming '/images/logo.jpeg' is available */}
              <img src="/images/logo.jpeg" alt="LearnSphere Logo" className="onb-logo" width="100" height="100" />
              <h1 className="onb-title neon">{current.title}</h1>
              <p className="onb-sub">{current.subtitle}</p>
              <motion.button
                className="onb-continue big"
                onClick={next}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue →
              </motion.button>
            </>
          )}

          {/* Questions & Thoughts */}
          {(current.type === "question" || current.type === "thought") && (
            <>
              {/* Top animated rainbow line */}
              <motion.div
                className="onb-color-line-top"
                variants={lineVariants}
                initial="initial"
                animate="animate"
              />

              <h2 className="onb-title neon">{current.question || current.title}</h2>

              {current.type === "question" && (
                <div className="choices-grid">
                  {current.options.map((opt) => {
                    const isSel = selected === opt.id;
                    return (
                      <motion.div
                        key={opt.id}
                        // Added 'choice-label-only' class for specific styling changes
                        className={`choice-card choice-label-only ${isSel ? "selected" : ""}`}
                        onClick={() => selectOption(opt.id)}
                        whileHover={{ y: -6 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* The card now contains only the label and the selection indicator */}
                        <div className="choice-label">{opt.label}</div>
                        {/* MODIFIED: Selection indicator is a small, filled circle (dot) */}
                        <div className={`choice-dot ${isSel ? "show" : ""}`} />
                      </motion.div>
                    );
                  })}
                </div>
              )}
              
              <motion.button
                className="onb-continue"
                onClick={next}
                // Button is disabled if it's a question step and no option is selected
                disabled={current.type === "question" && !selected}
                whileHover={{ scale: selected || current.type === "thought" ? 1.03 : 1 }}
              >
                Continue →
              </motion.button>
            </>
          )}

          {/* Final Step */}
          {current.type === "final" && (
            <>
              <h1 className="onb-title neon">{current.title}</h1>
              <motion.button
                className="onb-continue big"
                onClick={next}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue →
              </motion.button>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Colorful paper fall (Commented out) */}
      {/* ... (Motion divs for confetti effect) */}
    </div>
  );
}