import React, { useState, useEffect } from "react";
import "./Home.css";

const Navbar = ({
  goToProfile,
  goToTechnology,
  goToResources,
  goToAbout,
  goToContact,
  goBackHome,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [avatarLetter, setAvatarLetter] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [aiMessage, setAiMessage] = useState("");

  // ---------- Load login status ----------
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("learnsphereUser"));
    if (savedUser?.loggedIn) {
      setLoggedIn(true);
      setAvatarLetter(savedUser.avatarLetter);
    }
  }, []);

  // ---------- Logout ----------
  const handleLogout = () => {
    localStorage.removeItem("learnsphereUser");
    setLoggedIn(false);
    setAvatarLetter("");
    setDropdownVisible(null);
    setAiMessage("🤖 You’ve been logged out!");
    setTimeout(() => setAiMessage(""), 3000);
  };

  // ---------- Auth Handlers ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      alert("Please fill all fields!");
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userAvatar = (formData.name || formData.email)[0].toUpperCase();
    const userData = {
      loggedIn: true,
      avatarLetter: userAvatar,
      email: formData.email,
    };

    localStorage.setItem("learnsphereUser", JSON.stringify(userData));
    setLoggedIn(true);
    setAvatarLetter(userAvatar);
    setShowSignup(false);
    setAiMessage(`Welcome, ${formData.name || formData.email}! 🤖`);
    setTimeout(() => setAiMessage(""), 3000);
  };

  // ---------- Helper to protect routes ----------
  const handleProtectedClick = (callback) => {
    if (!loggedIn) {
      setAiMessage("🤖 Please sign up or log in first!");
      setShowSignup(true);
      setTimeout(() => setAiMessage(""), 3000);
      return;
    }
    callback();
  };

  // ---------- Allow Home.jsx to open signup ----------
  useEffect(() => {
    window.openSignupPopup = () => setShowSignup(true);
  }, []);

  return (
    <nav className="navbar transparent">
      {/* Logo */}
      <div className="nav-left" onClick={goBackHome}>
        <img src="/images/logo.jpeg" alt="Logo" className="logo" />
        <h2>LearnSphere AI</h2>
      </div>

      {/* Center */}
      <div className="nav-center">
        {/* Explore */}
        <div className="nav-item" onMouseLeave={() => setDropdownVisible(null)}>
          <button
            className="nav-btn"
            onClick={() =>
              handleProtectedClick(() =>
                setDropdownVisible(
                  dropdownVisible === "explore" ? null : "explore"
                )
              )
            }
          >
            Explore ▼
          </button>
          {dropdownVisible === "explore" && loggedIn && (
            <div className="dropdown">
              <a
                href="#"
                onClick={() =>
                  handleProtectedClick(() => window.location.href = "http://localhost:3000/web-development")
                }
              >
                Web Development
              </a>
              <a
                href="#"
                onClick={() =>
                  handleProtectedClick(() => window.location.href = "http://localhost:3000/cybersecurity")
                }
              >
                Cyber Security
              </a>
            </div>
          )}
        </div>

        {/* Discover */}
        <div className="nav-item" onMouseLeave={() => setDropdownVisible(null)}>
          <button
            className="nav-btn"
            onClick={() =>
              handleProtectedClick(() =>
                setDropdownVisible(
                  dropdownVisible === "discover" ? null : "discover"
                )
              )
            }
          >
            Discover ▼
          </button>
          {dropdownVisible === "discover" && loggedIn && (
            <div className="dropdown">
              <a href="#" onClick={goBackHome}>
                Home
              </a>
              <a href="#" onClick={goToAbout}>
                About
              </a>
              <a href="#" onClick={goToResources}>
                Resources
              </a>
              <a href="#" onClick={goToContact}>
                Contact Us
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="nav-right">
        {!loggedIn ? (
          <a href="#" className="signup-text" onClick={() => setShowSignup(true)}>
            Sign Up
          </a>
        ) : (
          <div className="avatar-wrapper">
            <div
              className="avatar"
              onClick={() =>
                setDropdownVisible(
                  dropdownVisible === "profile" ? null : "profile"
                )
              }
            >
              {avatarLetter}
            </div>
            {dropdownVisible === "profile" && (
              <div className="profile-dropdown">
                <button onClick={goToProfile}>Profile</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* AI Message */}
      {aiMessage && <div className="ai-message">{aiMessage}</div>}

      {/* Signup/Login Overlay */}
      {showSignup && (
        <div className="auth-page">
          <video autoPlay loop muted playsInline className="background-video">
            <source src="/videos/signback.mp4" type="video/mp4" />
          </video>
          <div className="auth-container">
            <div className="auth-left">
              {isLogin ? (
                <>
                  <h1>Have an account?</h1>
                  <p>Login to continue your journey with LearnSphere AI!</p>
                </>
              ) : (
                <>
                  <h1>Create your Account</h1>
                  <p>Join our platform to start learning and exploring!</p>
                </>
              )}
            </div>
            <div className="auth-right">
              <button className="close-btn" onClick={() => setShowSignup(false)}>
                ✖
              </button>
              <h2>{isLogin ? "Login" : "Sign Up"}</h2>
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                )}
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {!isLogin && (
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                )}
                <button type="submit" className="join-btn">
                  {isLogin ? "Login →" : "Sign Up →"}
                </button>
              </form>
              <p className="toggle-text">
                {isLogin ? (
                  <>
                    No account? <span onClick={() => setIsLogin(false)}>Sign Up</span>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <span onClick={() => setIsLogin(true)}>Login</span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
