import React from "react";
import { usePageTransition } from "../TransitionContext";
import MagneticButton from "./MagneticButton";
import { PROFILE } from "../../data/portfolioData";

export default function DarkOutro({ onBack, backLabel = "Back to top", isHorizontal = false }) {
  const { copyText } = usePageTransition();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className={`ed-outro ${isHorizontal ? "ed-outro-horizontal" : ""}`}>
      <div className="ed-outro-inner">
        <div className="ed-outro-eyebrow">
          <span className="ed-status-dot" />
          <span>{PROFILE.availability}</span>
        </div>

        <h2 className="ed-outro-headline">Let&apos;s have a chat</h2>

        <div className="ed-outro-actions">
          <MagneticButton
            className="ed-dark-pill"
            onClick={() => copyText(PROFILE.email, "Email copied")}
          >
            {PROFILE.email}
          </MagneticButton>

          <MagneticButton
            className="ed-dark-pill"
            onClick={() => copyText(PROFILE.phone, "Phone copied")}
          >
            {PROFILE.phone}
          </MagneticButton>

          <MagneticButton to="/resume" label="RESUME" className="ed-dark-pill ed-dark-pill-accent">
            Resume / CV ↗
          </MagneticButton>

          <MagneticButton className="ed-dark-pill ed-dark-pill-ghost" onClick={handleBack}>
            {isHorizontal ? "← Back to 01/" : `↑ ${backLabel}`}
          </MagneticButton>
        </div>

        <div className="ed-outro-socials">
          <a href={PROFILE.socials.github} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
          <a href={PROFILE.socials.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          <a href={PROFILE.socials.medium} target="_blank" rel="noopener noreferrer">
            Medium ↗
          </a>
          <a href={PROFILE.socials.twitter} target="_blank" rel="noopener noreferrer">
            X / Twitter ↗
          </a>
          <a href={PROFILE.socials.instagram} target="_blank" rel="noopener noreferrer">
            Instagram ↗
          </a>
        </div>
      </div>
    </section>
  );
}
