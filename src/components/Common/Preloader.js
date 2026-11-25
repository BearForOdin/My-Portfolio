import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";

const CURTAIN_COVERED = "M 0 0 V 100 Q 50 100 100 100 V 0 z";
const CURTAIN_CURVE = "M 0 0 V 50 Q 50 100 100 50 V 0 z";
const CURTAIN_GONE = "M 0 0 V 0 Q 50 0 100 0 V 0 z";

const WORDS = [
  { text: "OWN", accent: false },
  { text: "THE", accent: false },
  { text: "SPACE", accent: true },
];

export default function Preloader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [stage, setStage] = useState("loading"); // loading | wordsOut | curtainOut | done

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.55,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setPercent(Math.round(latest)),
      onComplete: () => setStage("wordsOut"),
    });
    return () => controls.stop();
  }, []);

  useEffect(() => {
    if (stage === "wordsOut") {
      const t = setTimeout(() => setStage("curtainOut"), 360);
      return () => clearTimeout(t);
    }
    if (stage === "curtainOut") {
      const t = setTimeout(() => {
        setStage("done");
        if (onComplete) onComplete();
      }, 720);
      return () => clearTimeout(t);
    }
  }, [stage, onComplete]);

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          className="pl-overlay"
          role="status"
          aria-label={`Loading ${percent}%`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
          {/* Curved SVG Curtain Background (matching douglus.site exit wave) */}
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
                stage === "curtainOut"
                  ? {
                      d: [CURTAIN_COVERED, CURTAIN_CURVE, CURTAIN_GONE],
                    }
                  : { d: CURTAIN_COVERED }
              }
              transition={
                stage === "curtainOut"
                  ? {
                      duration: 0.72,
                      times: [0, 0.48, 1],
                      ease: [0.76, 0, 0.24, 1],
                    }
                  : { duration: 0 }
              }
            />
          </svg>

          {/* Foreground: ONLY left-aligned "OWN THE SPACE" + percentage */}
          <div className="pl-inner">
            <div className="pl-left-stage">
              <div className="pl-phrase" aria-label="OWN THE SPACE">
                {WORDS.map((word, idx) => {
                  const reverseIdx = WORDS.length - 1 - idx;
                  const isExiting = stage === "wordsOut" || stage === "curtainOut";
                  return (
                    <span key={word.text} className="pl-word-mask">
                      <motion.span
                        className={`pl-word ${word.accent ? "pl-word-accent" : ""}`}
                        initial={{ y: "115%", opacity: 0 }}
                        animate={
                          isExiting
                            ? { y: "-115%", opacity: 0 }
                            : { y: "0%", opacity: 1 }
                        }
                        transition={
                          isExiting
                            ? {
                                duration: 0.42,
                                delay: reverseIdx * 0.045,
                                ease: [0.55, 0.055, 0.675, 0.19],
                              }
                            : {
                                duration: 0.65,
                                delay: 0.06 + idx * 0.075,
                                ease: [0.215, 0.61, 0.355, 1],
                              }
                        }
                      >
                        {word.text}
                      </motion.span>
                    </span>
                  );
                })}
              </div>
            </div>

            <motion.div
              className="pl-counter"
              initial={{ opacity: 0, y: 12 }}
              animate={
                stage === "wordsOut" || stage === "curtainOut"
                  ? { opacity: 0, y: -12 }
                  : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
            >
              {percent}%
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
