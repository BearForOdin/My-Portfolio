import React from "react";
import { useLocation } from "react-router-dom";
import { PROFILE } from "../../data/portfolioData";

const CHAPTERS = [
  { id: 0, label: "01", title: "Intro" },
  { id: 1, label: "02", title: "Craft" },
  { id: 2, label: "03", title: "Work" },
  { id: 3, label: "04", title: "Mark" },
  { id: 4, label: "05", title: "Chat" },
];

export default function FooterBar({ scrollProgress = 0, activeChapter = 0, onJumpChapter }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const year = new Date().getFullYear();

  return (
    <footer className="ed-footerbar">
      <div className="ed-footerbar-inner">
        <div className="ed-footer-left">
          <span>© {year} Portfolio</span>
        </div>

        {isHome && (
          <div className="ed-footer-center" aria-label="Scroll progress and chapters">
            <div className="ed-chapter-dots">
              {CHAPTERS.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  className={`ed-chapter-dot ${activeChapter === ch.id ? "is-active" : ""}`}
                  onClick={() => onJumpChapter && onJumpChapter(ch.id)}
                  title={`Jump to ${ch.label}/ ${ch.title}`}
                >
                  {ch.label}
                </button>
              ))}
            </div>
            <div className="ed-progress-track">
              <div
                className="ed-progress-fill"
                style={{ transform: `scaleX(${Math.max(0.04, Math.min(1, scrollProgress))})` }}
              />
            </div>
          </div>
        )}

        <div className="ed-footer-right">
          <span>Design &amp; code by {PROFILE.firstName}</span>
        </div>
      </div>
    </footer>
  );
}
