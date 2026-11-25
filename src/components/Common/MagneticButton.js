import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePageTransition } from "../TransitionContext";

export default function MagneticButton({
  children,
  to,
  href,
  onClick,
  className = "",
  label,
  strength = 0.28,
  target,
  rel,
  ...rest
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });
  const { navigateWithTransition } = usePageTransition();

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const motionProps = {
    ref,
    style: { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileTap: { scale: 0.96 },
  };

  if (to) {
    return (
      <motion.a
        {...motionProps}
        href={to}
        className={`magnetic-btn ${className}`}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          if (onClick) onClick(e);
          navigateWithTransition(to, label);
        }}
        {...rest}
      >
        <span className="magnetic-btn-inner">{children}</span>
      </motion.a>
    );
  }

  if (href) {
    return (
      <motion.a
        {...motionProps}
        href={href}
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
        className={`magnetic-btn ${className}`}
        onClick={onClick}
        {...rest}
      >
        <span className="magnetic-btn-inner">{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type="button"
      className={`magnetic-btn ${className}`}
      onClick={onClick}
      {...rest}
    >
      <span className="magnetic-btn-inner">{children}</span>
    </motion.button>
  );
}
