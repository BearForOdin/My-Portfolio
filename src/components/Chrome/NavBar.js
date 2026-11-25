import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { TransitionLink, usePageTransition } from "../TransitionContext";
import { PROFILE } from "../../data/portfolioData";

const LAST_NAME_CHARS = PROFILE.lastName.split("");

export default function NavBar() {
  const location = useLocation();
  const { copyText } = usePageTransition();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/works") {
      return location.pathname.startsWith("/works") || location.pathname === "/project";
    }
    return location.pathname === path;
  };

  const navItems = [
    { to: "/works", label: "Works" },
    { to: "/about", label: "About" },
    { to: "/resume", label: "Resume" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className="ed-navbar">
        <div className="ed-navbar-inner">
          {/* Left: Kinetic expanding logo */}
          <TransitionLink
            to="/"
            label="HOME"
            className="ed-logo"
            onClick={() => setMenuOpen(false)}
          >
            <span className="ed-logo-first">{PROFILE.firstName}</span>
            <span className="ed-logo-expand" aria-hidden="true">
              <span className="ed-logo-space">&nbsp;</span>
              {LAST_NAME_CHARS.map((ch, idx) => (
                <span
                  key={idx}
                  className="ed-logo-char"
                  style={{ transitionDelay: `${idx * 24}ms` }}
                >
                  {ch}
                </span>
              ))}
            </span>
          </TransitionLink>

          {/* Center: Comma-separated Swiss editorial links */}
          <nav className="ed-nav-center" aria-label="Primary">
            {navItems.map((item, idx) => (
              <React.Fragment key={item.to}>
                <TransitionLink
                  to={item.to}
                  label={item.label.toUpperCase()}
                  className={`ed-nav-link ${isActive(item.to) ? "is-active" : ""}`}
                >
                  <span>{item.label}</span>
                  <span className="ed-nav-deco" />
                </TransitionLink>
                {idx < navItems.length - 1 && (
                  <span className="ed-nav-comma" aria-hidden="true">
                    ,&nbsp;
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Right: Socials + instant-copy Email */}
          <div className="ed-nav-right">
            <a
              href={PROFILE.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ed-nav-ext"
            >
              Github
            </a>
            <a
              href={PROFILE.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="ed-nav-ext"
            >
              LinkedIn
            </a>
            <button
              type="button"
              className="ed-nav-ext ed-nav-email-btn"
              onClick={() => copyText(PROFILE.email, "Email copied")}
              title={`Click to copy ${PROFILE.email}`}
            >
              Email
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="ed-mobile-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Editorial Drawer */}
      <div className={`ed-mobile-drawer ${menuOpen ? "is-open" : ""}`}>
        <div className="ed-mobile-drawer-inner">
          <div className="ed-mobile-links">
            <TransitionLink
              to="/"
              label="HOME"
              className="ed-mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              <span className="ed-mobile-idx">00/</span> Home
            </TransitionLink>
            {navItems.map((item, idx) => (
              <TransitionLink
                key={item.to}
                to={item.to}
                label={item.label.toUpperCase()}
                className="ed-mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                <span className="ed-mobile-idx">0{idx + 1}/</span> {item.label}
              </TransitionLink>
            ))}
          </div>

          <div className="ed-mobile-meta">
            <button
              type="button"
              className="ed-mobile-email"
              onClick={() => copyText(PROFILE.email, "Email copied")}
            >
              {PROFILE.email}
            </button>
            <div className="ed-mobile-socials">
              <a href={PROFILE.socials.github} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
              <a href={PROFILE.socials.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
              <a href={PROFILE.socials.medium} target="_blank" rel="noopener noreferrer">
                Medium ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
