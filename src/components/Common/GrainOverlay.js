import React, { useEffect, useState } from "react";

/**
 * Pure analog TV-style monochrome grain overlay (no glitches, no scanlines).
 * Generates a crisp 200x200 offscreen tile with both dark and light micro-grains
 * so it reads cleanly over both warm cream (#FEFFF8) and dark (#0A0A0A) surfaces
 * at 60% opacity.
 */
export default function GrainOverlay() {
  const [tileUrl, setTileUrl] = useState("");

  useEffect(() => {
    const size = 400;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const rand = Math.random();
      if (rand > 0.52) {
        // Fine dark grain fleck (reads over cream canvas)
        const v = 12 + Math.floor(Math.random() * 24);
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = Math.floor(18 + Math.random() * 34);
      } else if (rand < 0.36) {
        // Fine warm-white grain fleck (reads over pitch-black sections)
        data[i] = 252;
        data[i + 1] = 248;
        data[i + 2] = 238;
        data[i + 3] = Math.floor(14 + Math.random() * 28);
      } else {
        data[i + 3] = 0;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    setTileUrl(canvas.toDataURL("image/png"));
  }, []);

  if (!tileUrl) return null;

  return (
    <div className="tv-grain-overlay" aria-hidden="true">
      <div
        className="tv-grain-layer"
        style={{ backgroundImage: `url(${tileUrl})` }}
      />
    </div>
  );
}
