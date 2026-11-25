import React, { useState, useCallback, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { TransitionProvider } from "./components/TransitionContext";
import Preloader from "./components/Common/Preloader";
import CustomCursor from "./components/Common/CustomCursor";
import GrainOverlay from "./components/Common/GrainOverlay";
import NavBar from "./components/Chrome/NavBar";
import FooterBar from "./components/Chrome/FooterBar";
import HomePage from "./pages/HomePage";
import WorksPage from "./pages/WorksPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ResumePage from "./pages/ResumePage";
import "./styles/editorial.css";

function AppShell() {
  const [scrollState, setScrollState] = useState({ progress: 0, chapter: 0 });
  const [heroReady, setHeroReady] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const jumpHandlerRef = useRef(null);

  const handleProgressChange = useCallback((progress, chapter) => {
    setScrollState({ progress, chapter });
  }, []);

  const registerJumpHandler = useCallback((fn) => {
    jumpHandlerRef.current = fn;
  }, []);

  const handleJumpChapter = useCallback((chapterIndex) => {
    if (jumpHandlerRef.current) {
      jumpHandlerRef.current(chapterIndex);
    }
  }, []);

  const handleRevealHero = useCallback(() => {
    setHeroReady(true);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setHeroReady(true);
    setPreloaderDone(true);
  }, []);

  return (
    <TransitionProvider>
      {!preloaderDone && (
        <Preloader
          onReveal={handleRevealHero}
          onComplete={handlePreloaderComplete}
        />
      )}
      <CustomCursor />
      <GrainOverlay />
      <div className="ed-app">
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                ready={heroReady}
                onProgressChange={handleProgressChange}
                registerJumpHandler={registerJumpHandler}
              />
            }
          />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/works/:slug" element={<ProjectDetailPage />} />
          <Route path="/project" element={<Navigate to="/works" replace />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <FooterBar
          scrollProgress={scrollState.progress}
          activeChapter={scrollState.chapter}
          onJumpChapter={handleJumpChapter}
        />
      </div>
    </TransitionProvider>
  );
}

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}
