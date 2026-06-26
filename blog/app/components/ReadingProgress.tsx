"use client";

import { useState, useEffect } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = documentHeight - windowHeight;

      if (maxScroll > 0) {
        setProgress(Math.min((scrollY / maxScroll) * 100, 100));
      }
    };

    // Set initial state
    updateProgress();

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  if (progress <= 0) return null;

  return (
    <div className="reading-progress">
      <div
        className="reading-progress__bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
