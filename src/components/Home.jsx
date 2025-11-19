import React, { useState, useEffect, useRef } from "react";
import "./Home.css";

// ---------------- Typewriter Component ----------------
const TypewriterText = ({ text = "", speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!text) return;
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return <p style={{ whiteSpace: "pre-line" }}>{displayedText}</p>;
};

// ---------------- Home Component ----------------
const Home = ({
  goToProfile,
  goToOnboarding,
  goToTechnology,
  goToAbout,
  goToContact,
  goBackHome,
}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [profileName, setProfileName] = useState("");
  const [avatarLetter, setAvatarLetter] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [aiMessage, setAiMessage] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;

  const titleRef = useRef(null);

  // ---------------- Auth Handlers ----------------
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (!formData.email || !formData.password)
        return alert("Fill all fields!");
      setProfileName(formData.email.split("@")[0]);
      setAvatarLetter(formData.email.charAt(0).toUpperCase());
      setLoggedIn(true);
      setShowSignup(false);
      setAiMessage(`🤖 Welcome back, ${formData.email}!`);
    } else {
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      )
        return alert("Fill all fields!");
      if (formData.password !== formData.confirmPassword)
        return alert("Passwords do not match!");
      setProfileName(formData.name);
      setAvatarLetter(formData.name.charAt(0).toUpperCase());
      setLoggedIn(true);
      setShowSignup(false);
      setAiMessage(`🤖 Welcome aboard, ${formData.name}!`);
    }
    setTimeout(() => setAiMessage(""), 4000);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setProfileName("");
    setAvatarLetter("");
    setDropdownVisible(null);
    setAiMessage("🤖 You’ve been logged out. Sign up to continue!");
    setTimeout(() => setAiMessage(""), 4000);
  };

  const handleProtectedClick = (callback) => {
    if (!loggedIn) {
      setAiMessage("🤖 Please sign up first to access this!");
      setShowSignup(true);
      setTimeout(() => setAiMessage(""), 4000);
      return;
    }
    if (callback) callback();
  };

  const handleGetStarted = () => {
    handleProtectedClick(() => goToOnboarding());
  };

  // ---------------- Video Slider Logic ----------------
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);

  // ---------------- Render ----------------
  return (
    <div className="home-wrapper">

   

      {/* Hero Section */}
      <section className="hero-section">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="background-video"
          src="/videos/back.mp4"
        />
        <div className="gamified-text">GAMIFIED</div>
        <div className="learning-text">LEARNING</div>
        <div className="subtitle-container">
          <TypewriterText
            text={
              "Interactive problem solving that's effective and fun.\nGet smarter in just 15 minutes a day."
            }
          />
         <button
  className="get-started"
  onClick={() => {
    const savedUser = JSON.parse(localStorage.getItem("learnsphereUser"));
    if (savedUser?.loggedIn) goToOnboarding();
    else window.openSignupPopup(); // this triggers Navbar signup
  }}
>
  Get Started
</button>

        </div>
      </section>

      {/* Explore Section */}
      {/* Explore Section */}
<section className="explore-section">
  <div className="explore-inner">
    <div className="explore-intro">
      <h1 className="explore-title">
        Journey through play. Discover. Learn. Evolve.
      </h1>
      <h3 className="explore-subline">
        Learn new technologies step by step. Challenge yourself with
        interactive content.
      </h3>
    </div>

    <div
      className="course-cards"
      onClick={() => {
        const savedUser = JSON.parse(localStorage.getItem("learnsphereUser"));
        if (savedUser?.loggedIn) goToTechnology();
        else window.openSignupPopup(); // same as Get Started
      }}
      style={{ cursor: "pointer" }}
    >
      <div
        className="course-card"
        onClick={(e) => {
          e.stopPropagation();
          const savedUser = JSON.parse(localStorage.getItem("learnsphereUser"));
          if (savedUser?.loggedIn) goToTechnology("cyber");
          else window.openSignupPopup();
        }}
      >
        <video
          src="/videos/cyber.mp4"
          className="course-video"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="course-info">
          <h3>Cyber Security</h3>
          <p>
            Learn to protect networks, analyze vulnerabilities, and defend
            against threats.
          </p>
        </div>
      </div>

      <div
        className="course-card"
        onClick={(e) => {
          e.stopPropagation();
          const savedUser = JSON.parse(localStorage.getItem("learnsphereUser"));
          if (savedUser?.loggedIn) goToTechnology("web");
          else window.openSignupPopup();
        }}
      >
        <video
          src="/videos/web.mp4"
          className="course-video"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="course-info">
          <h3>Web Development</h3>
          <p>
            Master HTML, CSS, and JavaScript to build responsive, modern web
            applications.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Video Slider */}
      <div className="video-section">
        <video
          className="background-video"
          src="/videos/thback.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div
          className="video-slider"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {[
            {
              title: "Welcome to LearnSphere AI",
              text: "Where learning meets adventure! Gamify your growth, challenge your limits, and let AI guide you toward mastery.",
            },
            {
              title: "Learn. Earn. Evolve",
              text: "Complete missions, earn badges, and unlock new levels of knowledge.",
            },
            {
              title: "Personalized by AI",
              text: "Our AI mentor crafts personalized challenges based on your learning style.",
            },
            {
              title: "Learning = Play",
              text: "Compete with others in gamified AI learning modules.",
            },
            {
              title: "Your Future Awaits",
              text: "From beginner to pro — your story unfolds in the LearnSphere. The AI will guide you to greatness.",
            },
          ].map((slide, i) => (
            <div className="video-slide" key={i}>
              <div className="card-overlay">
                <div className="card-content">
                  <h2>{slide.title}</h2>
                  <p>{slide.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="dots">
          {[...Array(totalSlides)].map((_, i) => (
            <span
              key={i}
              className={`dot ${currentSlide === i ? "active" : ""}`}
              onClick={() => goToSlide(i)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;                              