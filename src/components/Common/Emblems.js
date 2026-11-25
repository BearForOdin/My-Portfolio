import React from "react";

export function BullseyeEmblem({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`ed-emblem ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <rect width="200" height="200" rx="34" fill="#C8C2B5" />
      <circle cx="100" cy="100" r="66" fill="#0B0B0C" />
      <circle cx="100" cy="100" r="38" fill="#FEFFF8" />
      <circle cx="100" cy="100" r="18" fill="#FF5D1F" />
    </svg>
  );
}

export function SmileyEmblem({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`ed-emblem ed-emblem-smiley ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="16"
        y="16"
        width="168"
        height="168"
        rx="84"
        fill="#FF5D1F"
      />
      <circle cx="72" cy="82" r="10" fill="#0B0B0C" />
      <circle cx="128" cy="82" r="10" fill="#0B0B0C" />
      <path
        d="M64 114C72 138 128 138 136 114"
        stroke="#0B0B0C"
        strokeWidth="12"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function NodeEmblem({ className = "" }) {
  return (
    <svg
      viewBox="0 0 140 240"
      className={`ed-emblem ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <rect width="140" height="240" rx="28" fill="#C8C2B5" />
      <line x1="70" y1="68" x2="70" y2="172" stroke="#0B0B0C" strokeWidth="14" />
      <circle cx="70" cy="64" r="24" fill="#0B0B0C" />
      <circle cx="70" cy="64" r="9" fill="#FF5D1F" />
      <circle cx="70" cy="176" r="24" fill="#0B0B0C" />
      <circle cx="70" cy="176" r="9" fill="#FEFFF8" />
    </svg>
  );
}
