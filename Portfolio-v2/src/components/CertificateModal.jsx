"use client";
import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

/* ── Confetti Engine ─────────────────────────────── */
function launchConfetti(canvas) {
  const ctx = canvas.getContext("2d");
  const W = (canvas.width = window.innerWidth);
  const H = (canvas.height = window.innerHeight);

  const COLORS = [
    "#3553ff", "#6b8eff", "#ff6b6b", "#ffd93d",
    "#6bcb77", "#ff8e53", "#a855f7", "#ec4899",
    "#14b8a6", "#f97316",
  ];

  const pieces = [];
  const TOTAL = 150;

  for (let i = 0; i < TOTAL; i++) {
    pieces.push({
      x: W * 0.5 + (Math.random() - 0.5) * W * 0.4,
      y: H * 0.45,
      vx: (Math.random() - 0.5) * 18,
      vy: -(Math.random() * 16 + 6),
      w: Math.random() * 8 + 4,
      h: Math.random() * 6 + 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot: Math.random() * Math.PI * 2,
      rv: (Math.random() - 0.5) * 0.3,
      opacity: 1,
      gravity: 0.25 + Math.random() * 0.1,
      drag: 0.98 + Math.random() * 0.015,
    });
  }

  let frameId;
  const animate = () => {
    ctx.clearRect(0, 0, W, H);
    let alive = false;

    pieces.forEach((p) => {
      p.vy += p.gravity;
      p.vx *= p.drag;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.rv;

      if (p.y > H * 0.7) {
        p.opacity -= 0.02;
      }

      if (p.opacity <= 0) return;
      alive = true;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    if (alive) {
      frameId = requestAnimationFrame(animate);
    }
  };

  frameId = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(frameId);
}

export default function CertificateModal({ onClose, imageUrl, title }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  /* Fire confetti once the canvas mounts */
  const setCanvasRef = useCallback((node) => {
    canvasRef.current = node;
    if (node) {
      const cleanup = launchConfetti(node);
      /* store cleanup so we can cancel on unmount */
      node._confettiCleanup = cleanup;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (canvasRef.current?._confettiCleanup) {
        canvasRef.current._confettiCleanup();
      }
    };
  }, []);

  return createPortal(
    <div className="cert-overlay" onClick={onClose}>
      {/* Confetti canvas sits on top of everything */}
      <canvas
        ref={setCanvasRef}
        className="cert-confetti-canvas"
      />
      <div className="cert-box" onClick={(e) => e.stopPropagation()}>
        <div className="cert-box__header">
          <h3 className="cert-box__title">{title || "Graduation Certificate"}</h3>
          <button
            className="cert-box__close"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            ✕
          </button>
        </div>
        <div className="cert-box__image-container">
          <img
            src={imageUrl}
            alt={title || "Graduation Certificate"}
            className="cert-box__image"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
