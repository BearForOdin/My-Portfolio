import React from "react";
import { motion } from "framer-motion";
import { TransitionLink, usePageTransition } from "../TransitionContext";
import MagneticButton from "./MagneticButton";
import { PROFILE } from "../../data/portfolioData";

export default function DarkOutro({ onBack, backLabel = "Back to top", isHorizontal = false }) {
  const { copyText, setCursorVariant } = usePageTransition();

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
        <motion.h2
          className="ed-outro-headline"
          initial={{ opacity: 0.9, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Let&apos;s have a chat
        </motion.h2>

        <div className="ed-outro-rule" />

        <div className="ed-outro-actions">
          <MagneticButton
            className="ed-dark-pill"
            onClick={() => copyText(PROFILE.email, "Email copied")}
            onMouseEnter={() => setCursorVariant({ mode: "link", text: "" })}
            onMouseLeave={() => setCursorVariant({ mode: "default", text: "" })}
          >
            {PROFILE.email}
          </MagneticButton>

          <MagneticButton
            className="ed-dark-pill"
            onClick={() => copyText(PROFILE.phone, "Phone copied")}
            onMouseEnter={() => setCursorVariant({ mode: "link", text: "" })}
            onMouseLeave={() => setCursorVariant({ mode: "default", text: "" })}
          >
            {PROFILE.phone}
          </MagneticButton>

          <MagneticButton
            className="ed-dark-pill ed-dark-pill-back"
            onClick={handleBack}
            onMouseEnter={() => setCursorVariant({ mode: "link", text: "" })}
            onMouseLeave={() => setCursorVariant({ mode: "default", text: "" })}
          >
            {isHorizontal ? "←——— Back" : `↑ ${backLabel}`}
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
            X ↗
          </a>
          <TransitionLink to="/resume" label="RESUME">
            Resume ↗
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
