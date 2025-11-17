import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BEGINNER_LEVELS } from "../data/beginnerLevels";
import { INTERMEDIATE_LEVELS } from "../data/intermediateLevels";
import { ADVANCED_LEVELS } from "../data/advancedLevels";
import "./LevelPage.css";

export default function LevelPage() {
  const { type, level } = useParams(); // type can be beginner / intermediate / advanced
  const navigate = useNavigate();

  // Select the correct level array based on type
  let levels;
  if (type === "beginner") levels = BEGINNER_LEVELS;
  else if (type === "intermediate") levels = INTERMEDIATE_LEVELS;
  else if (type === "advanced") levels = ADVANCED_LEVELS;

  const lvl = levels?.find((l) => l.id === parseInt(level, 10));

  if (!lvl) return <div className="level-page">Level not found</div>;

  return (
    <div className="level-page">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div className="overlay-page" />
      <button className="back-button-page" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2 className="level-title">{`Level ${lvl.id}: ${lvl.title}`}</h2>

      <div className="card-container">
        <div
          className="card lesson-card"
          onClick={() => navigate(`/${type}/level/${lvl.id}/lesson`)}
        >
          🏰 Explorer’s Map
        </div>

        <div
          className="card quiz-card"
          onClick={() => navigate(`/${type}/level/${lvl.id}/quiz`)}
        >
          🎯 Brain Quest
        </div>
      </div>
    </div>
  );
}
