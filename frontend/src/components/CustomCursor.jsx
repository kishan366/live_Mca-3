import React, { useEffect } from "react";

export default function CustomCursor() {

  useEffect(() => {
    // Make sure default cursor is visible
    document.body.style.cursor = "auto";

    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  return null; // No custom cursor element
}
