import React, { useEffect, useState, useRef } from "react";
import { motion, animate } from "framer-motion";

const REEL_WORDS = [
  { text: "OWN", accent: false },
  { text: "THE", accent: false },
  { text: "SPACE", accent: true },
];

// Exact douglus.site top-anchored curved curtain reveal (zero flat stall)
const CURTAIN_COVERED = "M 0 0 V 100 Q 50 100 100 100 V 0 z";
const CURTAIN_CURVE = "M 0 0 V 50 Q 50 100 100 50 V 0 z";
const CURTAIN_GONE = "M 0 0 V 0 Q 50 0 100 0 V 0 z";

export default function Preloader({ onReveal, onComplete }) {
  const [percent, setPercent] = useState(0);
  // slotIndex: -1 (below mask) -> 0 ("OWN") -> 1 ("THE") -> 2 ("SPACE") -> 3 (gliding out)
  const [slotIndex, setSlotIndex] = useState(-1);
  const [exiting, setExiting] = useState(false);

  const onRevealRef = useRef(onReveal);
  const onCompleteRef = useRef(onComplete);
  onRevealRef.current = onReveal;
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Continuous counter hitting 100% right as the curtain begins lifting
    const controls = animate(0, 100, {
      duration: 1.82,
      ease: [0.32, 0, 0.24, 1],
      onUpdate: (latest) => setPercent(Math.round(latest)),
    });

    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));

    // Continuous, pause-free rhythm: OWN -> THE -> SPACE -> immediate curved lift into Home
    at(40, () => setSlotIndex(0)); // OWN
    at(640, () => setSlotIndex(1)); // THE
    at(1240, () => setSlotIndex(2)); // SPACE
    at(1840, () => {
      setSlotIndex(3); // SPACE glides out upward
      setExiting(true); // curved dark curtain sweeps up immediately (delay: 0)
      if (onRevealRef.current) onRevealRef.current(); // Hero rises in sync underneath
    });
    at(2600, () => {
      if (onCompleteRef.current) onCompleteRef.current();
    });

    return () => {
      controls.stop();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      className="pl-overlay"
      role="status"
      aria-label={`Loading ${percent}%`}
      style={{ pointerEvents: exiting ? "none" : "all" }}
    >
      {/* Curved SVG Curtain: sweeps up cleanly with zero delay */}
      <svg
        className="pl-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          fill="#0e0e0e"
          initial={{ d: CURTAIN_COVERED }}
          animate={
            exiting
              ? { d: [CURTAIN_COVERED, CURTAIN_CURVE, CURTAIN_GONE] }
              : { d: CURTAIN_COVERED }
          }
          transition={
            exiting
              ? {
                  duration: 0.72,
                  times: [0, 0.48, 1],
                  ease: [0.76, 0, 0.24, 1],
                }
              : { duration: 0 }
          }
        />
      </svg>

      <div className="pl-inner">
        <div className="pl-left-stage">
          <div className="pl-word-wrap" aria-label="OWN THE SPACE">
            <motion.div
              className="pl-word-rail"
              initial={{ y: "100%" }}
              animate={{ y: `${-slotIndex * 100}%` }}
              transition={{
                duration: slotIndex === 3 ? 0.36 : 0.36,
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
          animate={{ opacity: exiting ? 0 : 1, y: exiting ? -16 : 0 }}
          transition={{ duration: 0.24, ease: [0.55, 0.055, 0.675, 0.19] }}
        >
          {percent}%
        </motion.div>
      </div>
    </div>
  );
}
