import React, { useEffect, useState, useRef } from "react";
import { motion, animate } from "framer-motion";

const REEL_WORDS = [
  { text: "OWN", accent: false },
  { text: "THE", accent: false },
  { text: "SPACE", accent: true },
];

export default function Preloader({ onReveal, onComplete }) {
  // slotIndex: -1 (below mask) -> 0 ("OWN") -> 1 ("THE") -> 2 ("SPACE") -> 3 (rolled out)
  const [slotIndex, setSlotIndex] = useState(-1);
  const [exiting, setExiting] = useState(false);

  const counterRef = useRef(null);
  const onRevealRef = useRef(onReveal);
  const onCompleteRef = useRef(onComplete);
  onRevealRef.current = onReveal;
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Update percentage directly in DOM (zero 60fps React re-renders -> butter-smooth motion)
    const controls = animate(0, 100, {
      duration: 1.85,
      ease: [0.32, 0, 0.24, 1],
      onUpdate: (latest) => {
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.round(latest)}%`;
        }
      },
    });

    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));

    // Continuous, pause-free word rollout -> immediate smooth dissolve into Home
    at(40, () => setSlotIndex(0)); // OWN
    at(640, () => setSlotIndex(1)); // THE
    at(1240, () => setSlotIndex(2)); // SPACE
    at(1860, () => {
      setSlotIndex(3); // roll SPACE cleanly out top
      setExiting(true); // smooth dissolve begins immediately (zero delay)
      if (onRevealRef.current) onRevealRef.current();
    });
    at(2460, () => {
      if (onCompleteRef.current) onCompleteRef.current();
    });

    return () => {
      controls.stop();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <motion.div
      className="pl-overlay"
      role="status"
      aria-label="Loading portfolio"
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={
        exiting
          ? { duration: 0.56, delay: 0, ease: [0.455, 0.03, 0.515, 0.955] }
          : { duration: 0 }
      }
      style={{ pointerEvents: exiting ? "none" : "all" }}
    >
      <div className="pl-inner">
        <div className="pl-left-stage">
          <div className="pl-word-wrap" aria-label="OWN THE SPACE">
            <motion.div
              className="pl-word-rail"
              initial={{ y: "100%" }}
              animate={{ y: `${-slotIndex * 100}%` }}
              transition={{
                duration: 0.36,
                ease: [0.37, 0, 0.63, 1],
              }}
            >
              {REEL_WORDS.map((w) => (
                <div
                  key={w.text}
                  className={`pl-reel-word ${w.accent ? "pl-word-accent" : ""}`}
                >
                  {w.text}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          ref={counterRef}
          className="pl-counter"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: exiting ? 0 : 1, y: exiting ? -10 : 0 }}
          transition={{ duration: 0.28, ease: [0.455, 0.03, 0.515, 0.955] }}
        >
          0%
        </motion.div>
      </div>
    </motion.div>
  );
}
