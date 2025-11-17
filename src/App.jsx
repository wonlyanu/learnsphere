import React, { useState, useEffect } from "react";
import "./components/Home.css";
import Home from "./components/Home";
import Onboarding from "./components/Onboarding";
import Cybersecurity from "./components/Cybersecurity";
import Webdev from "./components/Webdev";
import Cybergames from "./components/Cybergames";
import Webgames from "./components/Webgames";
import Resources from "./components/Resources";
import About from "./components/About";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedTech, setSelectedTech] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [avatarLetter, setAvatarLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    photo: null,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "",
    about: "",
  });

  // ---------------- Load saved login state ----------------
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("learnsphereUser"));
    if (savedUser?.loggedIn) {
      setLoggedIn(true);
      setProfileName(savedUser.profileName);
      setAvatarLetter(savedUser.avatarLetter);
    }
  }, []);

  // ---------------- Navigation handlers ----------------
  const goToHome = () => setCurrentPage("home");
  const goToOnboarding = () => setCurrentPage("onboarding");
  const goToCybersecurity = () => setCurrentPage("cybersecurity");
  const goToWebdev = () => setCurrentPage("webdev");
  const goToWebgames = () => setCurrentPage("webgames");
  const goToCybergames = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage("cybergames");
      setLoading(false);
    }, 2000); // 2 second loading time
  };
  const goToResources = () => setCurrentPage("resources");
  const goToAbout = () => setCurrentPage("about");
  const goToContact = () => setCurrentPage("contact");
  const goToProfile = () => setCurrentPage("profile");

  // ---------------- Profile data update ----------------
  const handleSaveProfile = (updatedProfile) => {
    setProfileData(updatedProfile);
  };

  // ---------------- Shared Props ----------------
  const sharedProps = {
    goToProfile,
    goToOnboarding,
    goToCybersecurity,
    goToWebdev,
    goToWebgames,
    goToCybergames,
    goToResources,
    goToAbout,
    goToContact,
    goBackHome: goToHome,
  };

  return (
    <div className="app-container" style={{ width: "100vw", height: "100vh" }}>
      {/* Loading Screen */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <img
            src="/videos/cyberload.gif"
            alt="Loading..."
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      {/* Navbar hidden on Profile & Onboarding */}
      {currentPage !== "profile" && currentPage !== "onboarding" && !loading && (
        <Navbar
          goToProfile={goToProfile}
          goToResources={goToResources}
          goToAbout={goToAbout}
          goToContact={goToContact}
          goBackHome={goToHome}
        />
      )}

      {/* Page Routing */}
      {currentPage === "home" && !loading && <Home {...sharedProps} />}
      {currentPage === "onboarding" && !loading && (
        <Onboarding goBackHome={goToHome} />
      )}
      {currentPage === "cybersecurity" && !loading && (
        <Cybersecurity goBack={goToHome} {...sharedProps} />
      )}
      {currentPage === "webdev" && !loading && (
        <Webdev goBack={goToHome} {...sharedProps} />
      )}
      {currentPage === "webgames" && !loading && (
        <Webgames goBack={goToHome} {...sharedProps} />
      )}
      {currentPage === "cybergames" && !loading && (
        <Cybergames goBack={goToHome} {...sharedProps} />
      )}
      {currentPage === "resources" && !loading && <Resources {...sharedProps} />}
      {currentPage === "about" && !loading && <About {...sharedProps} />}
      {currentPage === "contact" && !loading && <Contact {...sharedProps} />}
      {currentPage === "profile" && !loading && (
        <Profile
          profileData={profileData}
          onSaveProfile={handleSaveProfile}
          goBack={goToHome}
        />
      )}

      {/* Footer hidden on Profile & Onboarding */}
      {currentPage !== "profile" && currentPage !== "onboarding" && !loading && (
        <Footer
          goToResources={goToResources}
          goToAbout={goToAbout}
          goToContact={goToContact}
          goToCybersecurity={goToCybersecurity}
          goToWebdev={goToWebdev}
        />
      )}
    </div>
  );
}

export default App;
