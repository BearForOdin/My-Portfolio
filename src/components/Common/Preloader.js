import React, { useEffect, useState, useRef } from "react";
import { motion, animate } from "framer-motion";

const REEL_WORDS = [
  { text: "OWN", accent: false },
  { text: "THE", accent: false },
  { text: "SPACE", accent: true },
];

export default function Preloader({ onReveal, onComplete }) {
  const [percent, setPercent] = useState(0);
  // slotIndex: -1 (below mask) -> 0 ("OWN") -> 1 ("THE") -> 2 ("SPACE") -> 3 (rolled out above)
  const [slotIndex, setSlotIndex] = useState(-1);
  const [exiting, setExiting] = useState(false);

  const onRevealRef = useRef(onReveal);
  const onCompleteRef = useRef(onComplete);
  onRevealRef.current = onReveal;
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2.15,
      ease: [0.32, 0, 0.24, 1],
      onUpdate: (latest) => setPercent(Math.round(latest)),
    });

    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));

    // Single clean word rollout: OWN -> THE -> SPACE -> roll out & fade away
    at(80, () => setSlotIndex(0)); // OWN
    at(760, () => setSlotIndex(1)); // THE
    at(1440, () => setSlotIndex(2)); // SPACE
    at(2140, () => {
      setSlotIndex(3); // roll SPACE cleanly out top
      setExiting(true);
      if (onRevealRef.current) onRevealRef.current();
    });
    at(2760, () => {
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
      aria-label={`Loading ${percent}%`}
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={
        exiting
          ? { duration: 0.52, delay: 0.12, ease: [0.455, 0.03, 0.515, 0.955] }
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
                duration: slotIndex === 3 ? 0.34 : 0.38,
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
          className="pl-counter"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: exiting ? 0 : 1, y: exiting ? -8 : 0 }}
          transition={{ duration: 0.25, ease: [0.455, 0.03, 0.515, 0.955] }}
        >
          {percent}%
        </motion.div>
      </div>
    </motion.div>
  );
}
