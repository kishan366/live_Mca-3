import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Hide the default cursor
    document.body.style.cursor = "none";

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
      // Clean up event listeners and restore the cursor
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", checkTouch);
      document.body.style.cursor = "auto";
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
        transition: "top 0.05s linear, left 0.05s linear",
        top: position.y,
        left: position.x,

        // Triangle shape using CSS borders
        width: 0,
        height: 0,
        borderTop: "10px solid transparent",
        borderBottom: "10px solid transparent",
        borderLeft: "15px solid red",
        borderRadius: "2px",
        borderLeftColor: "black",

        // Glow effect
        filter: "drop-shadow(0 0 5px red) drop-shadow(0 0 10px red)",
      }}
    />
  );
}