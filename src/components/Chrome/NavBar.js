import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TransitionLink, usePageTransition } from "../TransitionContext";
import { PROFILE } from "../../data/portfolioData";

const LAST_NAME_CHARS = PROFILE.lastName.split("");

export default function NavBar() {
  const location = useLocation();
  const { copyText, setCursorVariant } = usePageTransition();
  const [menuOpen, setMenuOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const popoverRef = useRef(null);

  const isScrollablePage =
    location.pathname !== "/" && location.pathname !== "/contact";

  useEffect(() => {
    if (!isScrollablePage) {
      setScrolled(false);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isScrollablePage, location.pathname]);

  useEffect(() => {
    if (!emailOpen) return;
    const handleOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setEmailOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [emailOpen]);

  const isActive = (path) => {
    if (path === "/works") {
      return location.pathname.startsWith("/works") || location.pathname === "/project";
    }
    return location.pathname === path;
  };

  // Strict 3-link center nav matching douglus.site simplicity (Resume removed from top)
  const navItems = [
    { to: "/works", label: "Works", curtain: "WORK" },
    { to: "/about", label: "About", curtain: "ABOUT" },
    { to: "/contact", label: "Contact", curtain: "CONTACT" },
  ];

  const onEnterLink = () => setCursorVariant({ mode: "link", text: "" });
  const onLeaveLink = () => setCursorVariant({ mode: "default", text: "" });

  return (
    <>
      <header className={`ed-navbar ${isScrollablePage && scrolled ? "is-scrolled" : ""}`}>
        <div className="ed-navbar-inner">
          {/* Left: Kinetic expanding logo */}
          <TransitionLink
            to="/"
            label="HOME"
            className="ed-logo"
            onClick={() => setMenuOpen(false)}
            onMouseEnter={onEnterLink}
            onMouseLeave={onLeaveLink}
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

          {/* Center: Minimal comma-separated 3-item nav */}
          <nav className="ed-nav-center" aria-label="Primary">
            {navItems.map((item, idx) => (
              <React.Fragment key={item.to}>
                <TransitionLink
                  to={item.to}
                  label={item.curtain}
                  className={`ed-nav-link ${isActive(item.to) ? "is-active" : ""}`}
                  onMouseEnter={onEnterLink}
                  onMouseLeave={onLeaveLink}
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

          {/* Right: Github, LinkedIn, Email */}
          <div className="ed-nav-right">
            <a
              href={PROFILE.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ed-nav-ext"
              onMouseEnter={onEnterLink}
              onMouseLeave={onLeaveLink}
            >
              <span>Github</span>
              <span className="ed-nav-strike" />
            </a>
            <a
              href={PROFILE.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="ed-nav-ext"
              onMouseEnter={onEnterLink}
              onMouseLeave={onLeaveLink}
            >
              <span>LinkedIn</span>
              <span className="ed-nav-strike" />
            </a>
            <button
              type="button"
              className="ed-nav-ext ed-nav-email-btn"
              onClick={() => setEmailOpen((prev) => !prev)}
              onMouseEnter={onEnterLink}
              onMouseLeave={onLeaveLink}
              aria-expanded={emailOpen}
            >
              <span>Email</span>
              <span className="ed-nav-strike" />
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

      {/* Signature Vermilion Email Popover (outside difference blend so color stays pure #FF6432) */}
      <AnimatePresence>
        {emailOpen && (
          <motion.div
            ref={popoverRef}
            className="ed-email-popover"
            initial={{ opacity: 0, y: -12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              className="ed-popover-row"
              onClick={() => {
                copyText(PROFILE.email, "Email copied");
                setEmailOpen(false);
              }}
            >
              <span>{PROFILE.email}</span>
              <span className="ed-popover-hint">COPY</span>
            </button>
            <button
              type="button"
              className="ed-popover-row"
              onClick={() => {
                copyText(PROFILE.phone, "Phone copied");
                setEmailOpen(false);
              }}
            >
              <span>{PROFILE.phone}</span>
              <span className="ed-popover-hint">COPY</span>
            </button>
            <div className="ed-popover-foot">
              <span>Based in {PROFILE.location}</span>
              <TransitionLink
                to="/resume"
                label="RESUME"
                className="ed-popover-cv"
                onClick={() => setEmailOpen(false)}
              >
                CV ↗
              </TransitionLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Fullscreen Editorial Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="ed-mobile-drawer is-open"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.56, ease: [0.16, 1, 0.3, 1] }}
          >
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
                    label={item.curtain}
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
                  <TransitionLink
                    to="/resume"
                    label="RESUME"
                    onClick={() => setMenuOpen(false)}
                  >
                    Resume ↗
                  </TransitionLink>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
