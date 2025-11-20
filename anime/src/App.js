import React from "react";
import { Routes, Route } from "react-router-dom";
import { GameProvider } from "./GameContext";
import CarouselHome from "./CarouselHome";
import CarouselHomeWeb from "./CarouselHomeWeb";
import MainPage from "./MainPage";
import GameSelection from "./GameSelection";
import GameSelectionWeb from "./GameSelectionWeb";
import OffensiveQuests from "./OffensiveQuests";
import DefensiveQuests from "./DefensiveQuests";
import FrontendQuests from "./FrontendQuests";
import BackendQuests from "./BackendQuests";
import ChallengePage from "./ChallengePage";
import ChallengePageWeb from "./ChallengePageWeb";
import QuestPageWeb from "./QuestPageWeb";
import Workspace from "./Workspace";
import Onboarding from "./components/Onboarding";
import AiAssistant from "./components/AiAssistant"; // ✅ import AI Assistant

function Page({ title }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#181a20",
        color: "#fff",
        padding: "4rem",
      }}
    >
      <h2>{title}</h2>
      <p>This is the {title} page.</p>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/cybersecurity" element={<CarouselHome />} />
        <Route path="/web-development" element={<CarouselHomeWeb />} />
        <Route path="/game-selection" element={<GameSelection />} />
        <Route path="/web-game-selection" element={<GameSelectionWeb />} />
        <Route path="/offensive-quests" element={<OffensiveQuests />} />
        <Route path="/defensive-quests" element={<DefensiveQuests />} />
        <Route path="/frontend-quests" element={<FrontendQuests />} />
        <Route path="/backend-quests" element={<BackendQuests />} />
        <Route path="/quest/:type/:level/challenge" element={<ChallengePage />} />
        <Route path="/web-quest/:type/:level/challenge" element={<ChallengePageWeb />} />
        <Route path="/quest-web/:type/:level" element={<QuestPageWeb />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/cyber-intro" element={<Page title="Cyber-Intro" />} />
        <Route path="/offensive-security" element={<Page title="Offensive Security" />} />
        <Route path="/defensive-security" element={<Page title="Defensive Security" />} />
        <Route path="/anime" element={<Page title="Anime Playground" />} />
        <Route path="/scientific" element={<Page title="Scientific Playground" />} />
      </Routes>

      {/* ✅ Global AI Assistant visible on every page */}
      <AiAssistant />
    </GameProvider>
  );
}
