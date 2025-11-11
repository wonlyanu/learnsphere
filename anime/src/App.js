import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function Page({ title }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#181a20",
      color: "#fff",
      padding: "4rem"
    }}>
      <h2>{title}</h2>
      <p>This is the {title} page.</p>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
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
        </Routes>
      </Router>
    </GameProvider>
  );
}
