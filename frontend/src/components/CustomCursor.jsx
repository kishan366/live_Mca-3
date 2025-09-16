import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });

  // Track cursor position
  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const addHover = () => setHovered(true);
    const removeHover = () => setHovered(false);

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  // Smooth trailing effect
  useEffect(() => {
    const follow = () => {
      setSmoothPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.2, // little faster follow
        y: prev.y + (position.y - prev.y) * 0.2,
      }));
      requestAnimationFrame(follow);
    };
    follow();
  }, [position]);

  return (
    <>
      {/* Small dot */}
      <div
        className={`custom-cursor-core ${hovered ? "hovered" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />

      {/* Soft ring */}
      <div
        className={`custom-cursor-ring ${hovered ? "hovered" : ""}`}
        style={{
          left: `${smoothPosition.x}px`,
          top: `${smoothPosition.y}px`,
        }}
      />

      <style jsx>{`
        .custom-cursor-core {
          position: fixed;
          transform: translate(-50%, -50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #333;
          pointer-events: none;
          z-index: 9999;
          transition: background 0.2s, transform 0.15s;
        }

        .custom-cursor-ring {
          position: fixed;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1.5px solid rgba(0, 0, 0, 0.4);
          pointer-events: none;
          z-index: 9998;
          transition: transform 0.25s, border-color 0.25s;
        }

        .custom-cursor-ring.hovered {
          transform: translate(-50%, -50%) scale(1.2);
          border-color: rgba(0, 0, 0, 0.6);
        }

        .custom-cursor-core.hovered {
          transform: translate(-50%, -50%) scale(1.2);
          background: #000;
        }
      `}</style>
    </>
  );
}
