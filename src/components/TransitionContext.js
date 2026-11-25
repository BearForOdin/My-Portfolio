import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const TransitionContext = createContext(null);

export function usePageTransition() {
  return useContext(TransitionContext);
}

function getDestinationLabel(to) {
  if (to === "/" || to === "") return "HOME";
  if (to === "/works" || to === "/project") return "WORKS";
  if (to === "/about") return "ABOUT";
  if (to === "/contact") return "CONTACT";
  if (to === "/resume") return "RESUME";
  if (to.startsWith("/works/")) {
    return to
      .replace("/works/", "")
      .replace(/-/g, " ")
      .toUpperCase();
  }
  return "EXPLORE";
}

export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [phase, setPhase] = useState("idle"); // idle | entering | holding | leaving
  const [label, setLabel] = useState("");
  const [toast, setToast] = useState(null);
  const lockRef = useRef(false);
  const toastTimerRef = useRef(null);

  const showToast = useCallback((message) => {
    setToast(message);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 2400);
  }, []);

  const copyText = useCallback(
    (text, labelText = "Copied to clipboard") => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          () => showToast(`${labelText}: ${text}`),
          () => showToast(text)
        );
      } else {
        showToast(text);
      }
    },
    [showToast]
  );

  const navigateWithTransition = useCallback(
    (to, customLabel) => {
      if (lockRef.current) return;
      if (to === location.pathname) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      lockRef.current = true;
      setLabel(customLabel || getDestinationLabel(to));
      setPhase("entering");

      // Navigate once curtain covers screen
      setTimeout(() => {
        navigate(to);
        window.scrollTo(0, 0);
        setPhase("holding");
      }, 420);

      // Reveal new page
      setTimeout(() => {
        setPhase("leaving");
      }, 760);

      // Reset to idle
      setTimeout(() => {
        setPhase("idle");
        lockRef.current = false;
      }, 1220);
    },
    [navigate, location.pathname]
  );

  return (
    <TransitionContext.Provider
      value={{ navigateWithTransition, showToast, copyText, isTransitioning: phase !== "idle" }}
    >
      {children}

      {/* SVG Curved Curtain Transition Overlay */}
      <div
        className={`curtain-overlay curtain-${phase}`}
        aria-hidden={phase === "idle"}
      >
        <svg
          className="curtain-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            className="curtain-path"
            d="M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z"
          />
        </svg>
        <div className="curtain-content">
          <span className="curtain-eyebrow">NAVIGATING TO</span>
          <div className="curtain-title">{label}</div>
          <div className="curtain-rule" />
        </div>
      </div>

      {/* Interaction Lock */}
      {phase !== "idle" && <div className="interaction-lock" />}

      {/* Minimal Editorial Toast */}
      <div className={`editorial-toast ${toast ? "is-visible" : ""}`} role="status">
        <span className="toast-dot" />
        <span>{toast}</span>
      </div>
    </TransitionContext.Provider>
  );
}

export function TransitionLink({ to, label, className = "", children, onClick, ...rest }) {
  const { navigateWithTransition } = usePageTransition();

  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (onClick) onClick(e);
    navigateWithTransition(to, label);
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
}
