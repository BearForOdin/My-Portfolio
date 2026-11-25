import React from "react";
import { motion } from "framer-motion";
import { usePageTransition } from "../components/TransitionContext";
import { PROFILE } from "../data/portfolioData";

export default function ContactPage() {
  const { copyText, setCursorVariant } = usePageTransition();

  return (
    <main className="contact-poster-page">
      <div className="contact-poster-grid">
        {/* Left ~65%: Colossal Swiss Poster Words */}
        <div className="contact-poster-left">
          <motion.div
            className="poster-word poster-word-1"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            REACH
          </motion.div>

          <div className="poster-row-2">
            <motion.div
              className="poster-word poster-word-2"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              TALK
            </motion.div>
            <motion.div
              className="poster-note"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="poster-note-eyebrow">GET IN TOUCH</span>
              <p>
                Open to new projects, collaborations, creative builds &amp; honest conversations.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="poster-word poster-word-3"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            BUILD
          </motion.div>

          <motion.div
            className="poster-word poster-word-4"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            CONNECT
          </motion.div>
        </div>

        {/* Right ~35%: Hairline Divided Minimal Contact Table */}
        <motion.aside
          className="contact-poster-right"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="contact-table">
            <div className="contact-row">
              <span className="contact-key">EMAIL</span>
              <button
                type="button"
                className="contact-val contact-copy-btn"
                onClick={() => copyText(PROFILE.email, "Email copied")}
                onMouseEnter={() => setCursorVariant({ mode: "link", text: "" })}
                onMouseLeave={() => setCursorVariant({ mode: "default", text: "" })}
              >
                {PROFILE.email}
              </button>
            </div>

            <div className="contact-row">
              <span className="contact-key">PHONE</span>
              <button
                type="button"
                className="contact-val contact-copy-btn"
                onClick={() => copyText(PROFILE.phone, "Phone copied")}
                onMouseEnter={() => setCursorVariant({ mode: "link", text: "" })}
                onMouseLeave={() => setCursorVariant({ mode: "default", text: "" })}
              >
                {PROFILE.phone}
              </button>
            </div>

            <div className="contact-row">
              <span className="contact-key">BASED</span>
              <span className="contact-val">{PROFILE.location}</span>
            </div>

            <div className="contact-socials-list">
              <a href={PROFILE.socials.github} target="_blank" rel="noopener noreferrer">
                GITHUB <span>↗</span>
              </a>
              <a href={PROFILE.socials.linkedin} target="_blank" rel="noopener noreferrer">
                LINKEDIN <span>↗</span>
              </a>
              <a href={PROFILE.socials.medium} target="_blank" rel="noopener noreferrer">
                MEDIUM <span>↗</span>
              </a>
              <a href={PROFILE.socials.twitter} target="_blank" rel="noopener noreferrer">
                X / TWITTER <span>↗</span>
              </a>
            </div>
          </div>
        </motion.aside>

        {/* Far-right vertical availability strip */}
        <div className="contact-vertical-status" aria-label={PROFILE.availability}>
          <span className="ed-status-dot" />
          <span>{PROFILE.availability}</span>
        </div>
      </div>
    </main>
  );
}
