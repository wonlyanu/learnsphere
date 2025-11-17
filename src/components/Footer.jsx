import React from "react";
// Assuming CSS styles are imported elsewhere or are global
// reuse existing styles

const Footer = ({ goToTechnology, goToResources, goToAbout, goToContact, goToCybersecurity, goToWebdev }) => {
  
  // Helper function to handle scrolling and then page navigation
  const handleNavigation = (navigateFn, ...args) => {
    // 1. Scroll to the top of the viewport
    window.scrollTo(0, 0);
    
    if (typeof navigateFn === 'function') {
      // 2. IMPORTANT: Add a slight delay (300ms) to allow for
      // an animated transition (e.g., top-to-bottom slide) 
      // to be triggered in the main App component.
      setTimeout(() => {
        navigateFn(...args);
      }, 300); 
    } else {
      console.warn("Navigation function not provided to Footer component:", navigateFn);
    }
  };

  return (
    <footer className="footer dark">
      <div className="footer-inner">
        <div className="footer-columns">
          <div className="footer-col">
            <h3>Discover</h3>
            <ul>
              {/* Updated to use handleNavigation */}
              <li onClick={() => handleNavigation(goToAbout)}>About</li>
              <li onClick={() => handleNavigation(goToResources)}>Resources</li>
              <li onClick={() => handleNavigation(goToContact)}>Contact Us</li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Learn</h3>
            <ul>
              {/* Updated to use handleNavigation */}
              <li onClick={() => handleNavigation(goToCybersecurity)}>Cyber Security</li>
              <li onClick={() => handleNavigation(goToWebdev)}>Web Development</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Made with ❤️ by LearnSphere AI Team</p>
          <p>© 2025 LearnSphere Inc. | Terms | Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
