"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Copy, Check } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

export default function EmailModal({ onClose }) {
  const [copied, setCopied] = useState(false);

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

  const handleCopy = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return createPortal(
    <div className="cert-overlay" onClick={onClose} style={{ zIndex: 1000 }}>
      <div 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "1.5rem",
          background: "var(--bg-surface)", 
          padding: "0.5rem 0.5rem 0.5rem 1.25rem", 
          borderRadius: "8px",
          border: "1px solid var(--rule-soft)",
          boxShadow: "var(--shadow-hard)",
          animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", color: "var(--blueprint)", fontWeight: 600, fontSize: "0.95rem" }}>
          {personalInfo.email}
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button 
            onClick={handleCopy}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: copied ? "#10b981" : "var(--blueprint)",
              color: "white",
              border: "none",
              borderRadius: "4px",
              width: "36px",
              height: "36px",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
            title="Copy email"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>

          <button
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--bg-surface-hover)",
              color: "var(--ink)",
              border: "1px solid var(--rule-soft)",
              borderRadius: "4px",
              width: "36px",
              height: "36px",
              cursor: "pointer",
              fontSize: "1.1rem"
            }}
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
