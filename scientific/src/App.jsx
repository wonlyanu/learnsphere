localStorage.clear();
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLanding from "./pages/MainLanding";
import FrontendHome from "./pages/FrontendHome";
import BackendHome from "./pages/BackendHome";
import Levels from "./pages/Levels";
import Beginner from "./pages/Beginner";
import BeginnerTest from "./pages/BeginnerTest";
import LevelPage from "./pages/LevelPage";
import LessonPage from "./pages/LessonPage";
import QuizPage from "./pages/QuizPage";
import Intermediate from "./pages/Intermediate";
import IntermediateTest from "./pages/IntermediateTest";
import Advanced from "./pages/Advanced";
import AdvancedTest from "./pages/AdvancedTest";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLanding />} />
        <Route path="/frontend" element={<FrontendHome />} />
        <Route path="/backend" element={<BackendHome />} />
        <Route path="/levels" element={<Levels />} />
        <Route path="/frontend-levels" element={<Levels />} />

        {/* Beginner routes */}
        <Route path="/beginner" element={<Beginner />} />
        <Route path="/beginner/test" element={<BeginnerTest />} />
        <Route path="/:type/level/:level" element={<LevelPage />} />
        <Route path="/:type/level/:level/lesson" element={<LessonPage />} />
        <Route path="/:type/level/:level/quiz" element={<QuizPage />} />

        {/* Intermediate routes */}
        <Route path="/intermediate" element={<Intermediate />} />
        <Route path="/intermediate/test" element={<IntermediateTest />} />

        {/* Advanced routes */}
        <Route path="/advanced" element={<Advanced />} />
        <Route path="/advanced-test" element={<AdvancedTest />} />
      </Routes>
    </Router>
  );
}

export default App;
