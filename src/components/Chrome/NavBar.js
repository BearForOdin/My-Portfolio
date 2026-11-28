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

  // Match douglus.site 1200px desktop <-> mobile/tablet switch
  const [isCompact, setIsCompact] = useState(
    typeof window !== "undefined" ? window.innerWidth < 1200 : false
  );

  useEffect(() => {
    const onResize = () => {
      const compact = window.innerWidth < 1200;
      setIsCompact(compact);
      if (!compact) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isScrollablePage =
    (location.pathname !== "/" || isCompact) && location.pathname !== "/contact";

  useEffect(() => {
    if (!isScrollablePage || menuOpen) {
      setScrolled(false);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isScrollablePage, location.pathname, menuOpen]);

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

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

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
      <header
        className={`ed-navbar ${
          !menuOpen && isScrollablePage && scrolled ? "is-scrolled" : ""
        } ${menuOpen ? "is-menu-open" : ""}`}
      >
        <div className="ed-navbar-inner">
          {/* Left: Kinetic expanding logo (desktop) / crisp Selasi (mobile) */}
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

          {/* Center: Minimal comma-separated 3-item nav (Desktop >= 1200px) */}
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

          {/* Right: Github, LinkedIn, Email (Desktop >= 1200px) */}
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

          {/* Mobile & Tablet (< 1200px): Plain borderless "Menu" / "Close" text matching douglus.site */}
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

      {/* Signature Vermilion Email Popover (Desktop) */}
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

      {/* Mobile & Tablet Fullscreen Drawer (Exact douglus.site coral-red bold centered links) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="m-menu-overlay"
            initial={{ opacity: 0, y: "-4%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-4%" }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="m-menu-list" aria-label="Mobile Navigation">
              <TransitionLink
                to="/"
                label="HOME"
                className="m-menu-item m-menu-home"
                onClick={() => setMenuOpen(false)}
              >
                <span className="m-menu-tag">intro</span>
                <span>HOME</span>
              </TransitionLink>

              {navItems.map((item) => (
                <TransitionLink
                  key={item.to}
                  to={item.to}
                  label={item.curtain}
                  className="m-menu-item"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label.toUpperCase()}
                </TransitionLink>
              ))}
            </nav>

            <footer className="m-menu-footer">
              <div className="m-menu-contact">
                <button
                  type="button"
                  onClick={() => copyText(PROFILE.email, "Email copied")}
                >
                  {PROFILE.email}
                </button>
                <button
                  type="button"
                  onClick={() => copyText(PROFILE.phone, "Phone copied")}
                >
                  {PROFILE.phone}
                </button>
              </div>
              <div className="m-menu-socials">
                <a
                  href={PROFILE.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
                <a
                  href={PROFILE.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
