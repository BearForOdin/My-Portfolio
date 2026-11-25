import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePageTransition } from "../TransitionContext";

export default function CustomCursor() {
  const { cursorVariant } = usePageTransition();
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const x = useSpring(mouseX, { stiffness: 520, damping: 38, mass: 0.25 });
  const y = useSpring(mouseY, { stiffness: 520, damping: 38, mass: 0.25 });

  useEffect(() => {
    const fine = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
    setIsTouch(!fine);
    if (!fine) return;

    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [mouseX, mouseY, visible]);

  if (isTouch) return null;

  const isMedia = cursorVariant.mode === "media";
  const isLink = cursorVariant.mode === "link";
  const scale = pressed ? 0.78 : isMedia ? 3.2 : isLink ? 1.75 : 1;

  return (
    <motion.div
      className={`ed-cursor ${isMedia ? "is-media" : ""}`}
      style={{ x, y }}
      animate={{
        opacity: visible ? 1 : 0,
        scale,
      }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      {isMedia && cursorVariant.text && (
        <span className="ed-cursor-label">{cursorVariant.text}</span>
      )}
    </motion.div>
  );
}
