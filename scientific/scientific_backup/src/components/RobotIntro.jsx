import React, { useEffect } from "react";
import Lottie from "lottie-react";
import robotAnimation from "../assets/robot.json";
import "./RobotIntro.css";

export default function RobotIntro({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 4000); // Show robot for 4 sec then go to test
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="robot-intro">
      <Lottie animationData={robotAnimation} loop={true} className="robot" />
      <h2 className="ready-text">Are you ready? </h2>
    
    </div>
  );
}
