import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const TransitionContext = createContext(null);

export function usePageTransition() {
  return useContext(TransitionContext);
}

// Verbatim SVG morphing wave coordinates inspired by douglus.site
const COVER_START = "M 0 100 V 100 Q 50 100 100 100 V 100 z";
const COVER_CURVE = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
const COVER_END = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

const REVEAL_START = "M 0 0 V 100 Q 50 100 100 100 V 0 z";
const REVEAL_CURVE = "M 0 0 V 50 Q 50 100 100 50 V 0 z";
const REVEAL_END = "M 0 0 V 0 Q 50 0 100 0 V 0 z";

// Stable animation targets (prevents keyframe array recreation / glitchy replays)
const COVER_ANIM = { d: [COVER_START, COVER_CURVE, COVER_END] };
const COVER_HOLD = { d: COVER_END };
const REVEAL_ANIM = { d: [REVEAL_START, REVEAL_CURVE, REVEAL_END] };

function getDestinationLabel(to) {
  if (to === "/" || to === "") return "HOME";
  if (to === "/works" || to === "/project") return "WORK";
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
  const [phase, setPhase] = useState("idle"); // idle | covering | covered | revealing
  const [label, setLabel] = useState("");
  const [toast, setToast] = useState(null);
  const [cursorVariant, setCursorVariant] = useState({ mode: "default", text: "" });
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
    (text, labelText = "Copied") => {
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
      setPhase("covering");

      // Swap route once dome wave reaches full cover
      setTimeout(() => {
        navigate(to);
        window.scrollTo(0, 0);
        setPhase("covered");
      }, 620);

      // Begin top-anchored curved reveal
      setTimeout(() => {
        setPhase("revealing");
      }, 1020);

      // Unlock and clear overlay
      setTimeout(() => {
        setPhase("idle");
        lockRef.current = false;
      }, 1680);
    },
    [navigate, location.pathname]
  );

  const isActive = phase !== "idle";
  const showTitle = phase === "covering" || phase === "covered";

  return (
    <TransitionContext.Provider
      value={{
        navigateWithTransition,
        showToast,
        copyText,
        isTransitioning: isActive,
        cursorVariant,
        setCursorVariant,
      }}
    >
      {children}

      {/* Framer Motion SVG Dome-Wave Curtain Overlay */}
      <AnimatePresence>
        {isActive && (
          <div className="curtain-overlay" aria-hidden="true">
            <svg
              className="curtain-svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Single persistent SVG path (zero unmount flash & zero keyframe replay) */}
              <motion.path
                fill="#1c1d20"
                initial={{ d: COVER_START }}
                animate={
                  phase === "revealing"
                    ? REVEAL_ANIM
                    : phase === "covered"
                    ? COVER_HOLD
                    : COVER_ANIM
                }
                transition={
                  phase === "covered"
                    ? { duration: 0 }
                    : {
                        duration: phase === "revealing" ? 0.64 : 0.62,
                        times: [0, 0.48, 1],
                        ease: [0.76, 0, 0.24, 1],
                      }
                }
              />
            </svg>

            <div className="curtain-stage">
              <div className="ts-line-dest">
                <motion.div
                  className="ts-word"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={
                    showTitle
                      ? { y: "0%", opacity: 1 }
                      : { y: "-110%", opacity: 0 }
                  }
                  transition={
                    showTitle
                      ? { duration: 0.42, delay: 0.24, ease: [0.215, 0.61, 0.355, 1] }
                      : { duration: 0.28, ease: [0.55, 0.055, 0.675, 0.19] }
                  }
                >
                  {label}
                </motion.div>
              </div>
              <motion.div
                className="ts-rule"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={
                  showTitle
                    ? { scaleX: 1, opacity: 1 }
                    : { scaleX: 0, opacity: 0 }
                }
                transition={
                  showTitle
                    ? { duration: 0.38, delay: 0.32, ease: [0.455, 0.03, 0.515, 0.955] }
                    : { duration: 0.2, ease: "easeIn" }
                }
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Interaction Lock during transition */}
      {isActive && <div className="interaction-lock" />}

      {/* Minimal Editorial Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="editorial-toast"
            role="status"
            initial={{ opacity: 0, y: 14, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 10, x: "-50%" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="toast-dot" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
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
