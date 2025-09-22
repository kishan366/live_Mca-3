import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect if touch device
    const checkTouch = () => {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);

    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    if (!isTouch) {
      window.addEventListener("mousemove", move);
    }

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", checkTouch);
    };
  }, [isTouch]);

  if (isTouch) return null; // ✅ Hide cursor on mobile/tablet

  return (
    <div
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        width: "clamp(12px, 2vw, 20px)", // responsive size
        height: "clamp(12px, 2vw, 20px)",
        borderRadius: "50%",
        backgroundColor: "rgba(255,255,255,0.7)",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        transition: "top 0.05s linear, left 0.05s linear", // smooth movement
      }}
    />
  );
}
