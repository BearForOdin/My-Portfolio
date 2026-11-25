import React, { useEffect, useState } from "react";

export default function Preloader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading | holding | exiting | done

  useEffect(() => {
    let start = null;
    let rafId = null;
    const duration = 1450; // snappy, tactile editorial pace

    const step = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const raw = Math.min(1, elapsed / duration);
      // Ease-out cubic for natural deceleration near 100%
      const eased = 1 - Math.pow(1 - raw, 3);
      const nextVal = Math.round(eased * 100);
      setPercent(nextVal);

      if (raw < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setPhase("holding");
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    if (phase === "holding") {
      const t1 = setTimeout(() => setPhase("exiting"), 360);
      return () => clearTimeout(t1);
    }
    if (phase === "exiting") {
      const t2 = setTimeout(() => {
        setPhase("done");
        if (onComplete) onComplete();
      }, 720);
      return () => clearTimeout(t2);
    }
  }, [phase, onComplete]);

  if (phase === "done") return null;

  const formatted = String(percent).padStart(3, "0");

  return (
    <div
      className={`pl-overlay pl-${phase}`}
      role="status"
      aria-label={`Loading portfolio ${percent}%`}
    >
      {/* Top Bar */}
      <div className="pl-bar pl-top">
        <span className="pl-meta">SELASI DZEAMESI // KIRULABS</span>
        <span className="pl-counter">{formatted}%</span>
      </div>

      {/* Center Monumental Phrase: OWN THE SPACE */}
      <div className="pl-center">
        <div className="pl-eyebrow">CREATIVE DEVELOPER · ACCRA, GHANA</div>
        <div className="pl-phrase" aria-label="OWN THE SPACE">
          <span className="pl-word-mask">
            <span className="pl-word" style={{ animationDelay: "60ms" }}>
              OWN
            </span>
          </span>
          <span className="pl-word-mask">
            <span className="pl-word" style={{ animationDelay: "150ms" }}>
              THE
            </span>
          </span>
          <span className="pl-word-mask">
            <span className="pl-word pl-word-accent" style={{ animationDelay: "240ms" }}>
              SPACE<span className="pl-dot">.</span>
            </span>
          </span>
        </div>

        {/* Hairline Progress Rule */}
        <div className="pl-rule-track">
          <div
            className="pl-rule-fill"
            style={{ transform: `scaleX(${percent / 100})` }}
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pl-bar pl-bottom">
        <span className="pl-meta">SOFTWARE · ART · LEADERSHIP</span>
        <span className="pl-meta">PORTFOLIO © 2026</span>
      </div>
    </div>
  );
}
