import React, { useRef, useState } from "react";
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
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const { navigateWithTransition } = usePageTransition();

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const style = {
    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
  };

  if (to) {
    return (
      <a
        ref={ref}
        href={to}
        className={`magnetic-btn ${className}`}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          if (onClick) onClick(e);
          navigateWithTransition(to, label);
        }}
        {...rest}
      >
        <span className="magnetic-btn-inner">{children}</span>
      </a>
    );
  }

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
        className={`magnetic-btn ${className}`}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        {...rest}
      >
        <span className="magnetic-btn-inner">{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      className={`magnetic-btn ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...rest}
    >
      <span className="magnetic-btn-inner">{children}</span>
    </button>
  );
}
