import React, { useEffect, useState } from "react";
import { usePageTransition } from "../components/TransitionContext";
import { PROFILE } from "../data/portfolioData";

export default function ContactPage() {
  const { copyText } = usePageTransition();
  const [accraTime, setAccraTime] = useState("");

  useEffect(() => {
    const tick = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-GB", {
          timeZone: PROFILE.timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date());
        setAccraTime(`${formatted} GMT`);
      } catch {
        setAccraTime("GMT");
      }
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="contact-poster-page">
      <div className="contact-poster-grid">
        {/* Left ~65%: Colossal Swiss Poster Display Words */}
        <div className="contact-poster-left">
          <div className="poster-word poster-word-1">REACH</div>

          <div className="poster-row-2">
            <div className="poster-word poster-word-2">TALK</div>
            <div className="poster-note">
              <span className="poster-note-eyebrow">GET IN TOUCH</span>
              <p>
                Open to frontend roles, freelance collaborations, creative builds &amp; honest
                conversations.
              </p>
            </div>
          </div>

          <div className="poster-word poster-word-3">BUILD</div>
          <div className="poster-word poster-word-4">CONNECT</div>
        </div>

        {/* Right ~35%: Hairline Divided Contact Table */}
        <aside className="contact-poster-right">
          <div className="contact-table">
            <div className="contact-row">
              <span className="contact-key">EMAIL</span>
              <button
                type="button"
                className="contact-val contact-copy-btn"
                onClick={() => copyText(PROFILE.email, "Email copied")}
                title="Click to copy email"
              >
                {PROFILE.email}
                <span className="contact-copy-hint">COPY</span>
              </button>
            </div>

            <div className="contact-row">
              <span className="contact-key">PHONE</span>
              <button
                type="button"
                className="contact-val contact-copy-btn"
                onClick={() => copyText(PROFILE.phone, "Phone copied")}
                title="Click to copy phone"
              >
                {PROFILE.phone}
                <span className="contact-copy-hint">COPY</span>
              </button>
            </div>

            <div className="contact-row">
              <span className="contact-key">BASED</span>
              <span className="contact-val">
                {PROFILE.location} <span className="contact-time">({accraTime})</span>
              </span>
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
              <a href={PROFILE.socials.instagram} target="_blank" rel="noopener noreferrer">
                INSTAGRAM <span>↗</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Far-right vertical availability strip */}
        <div className="contact-vertical-status" aria-label={PROFILE.availability}>
          <span className="ed-status-dot" />
          <span>{PROFILE.availability}</span>
        </div>
      </div>
    </main>
  );
}
