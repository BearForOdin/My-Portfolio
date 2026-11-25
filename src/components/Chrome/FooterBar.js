import React from "react";
import { useLocation } from "react-router-dom";
import { PROFILE } from "../../data/portfolioData";

const CHAPTERS = [
  { id: 0, label: "01" },
  { id: 1, label: "02" },
  { id: 2, label: "03" },
  { id: 3, label: "04" },
  { id: 4, label: "05" },
];

export default function FooterBar({ scrollProgress = 0, activeChapter = 0, onJumpChapter }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isContact = location.pathname === "/contact";
  const year = new Date().getFullYear();

  // Only pin fixed bottom chrome on single-viewport canvases (Home & Contact);
  // scrollable editorial pages render the copyright bar cleanly inside DarkOutro
  if (!isHome && !isContact) return null;

  return (
    <footer className="ed-footerbar">
      <div className="ed-footerbar-inner">
        <div className="ed-footer-left">
          <span>© {year} Portfolio</span>
        </div>

        <div className="ed-footer-center" aria-label="Scroll progress">
          {isHome && (
            <>
              <div className="ed-chapter-dots">
                {CHAPTERS.map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    className={`ed-chapter-dot ${activeChapter === ch.id ? "is-active" : ""}`}
                    onClick={() => onJumpChapter && onJumpChapter(ch.id)}
                    title={`Jump to ${ch.label}/`}
                  >
                    {ch.label}
                  </button>
                ))}
              </div>
              <div className="ed-progress-track">
                <div
                  className="ed-progress-fill"
                  style={{ transform: `scaleX(${Math.max(0.03, Math.min(1, scrollProgress))})` }}
                />
              </div>
            </>
          )}
        </div>

        <div className="ed-footer-right">
          <span className="ed-footer-credit">
            Design &amp; code by {PROFILE.firstName}
          </span>
        </div>
      </div>
    </footer>
  );
}
