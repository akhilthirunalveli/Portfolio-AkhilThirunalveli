"use client";

import { useState, useEffect, useRef } from "react";
import { X, PaperPlaneTilt, CheckCircle, WarningCircle, Lock } from "@phosphor-icons/react";

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmail("");
      setStatus("idle");
      setMessage("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();
      setMessage(data.message);
      setStatus(res.ok ? "success" : "error");
    } catch {
      setMessage("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="subscribe-overlay" onClick={onClose}>
      <div className="subscribe-modal" onClick={(e) => e.stopPropagation()}>

        {/* Decorative top accent */}
        <div className="subscribe-modal__accent" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <button className="subscribe-modal__close" onClick={onClose} aria-label="Close">
          <X size={16} weight="bold" />
        </button>

        {status === "success" ? (
          <div className="subscribe-modal__success">
            <div className="subscribe-modal__success-icon">
              <CheckCircle size={40} weight="fill" />
            </div>
            <h2>You&apos;re in!</h2>
            <p>{message || "Thanks for subscribing. I'll reach out when something new drops."}</p>
            <button className="subscribe-modal__done-btn" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="subscribe-modal__header">
              <p className="subscribe-modal__label">Newsletter</p>
              <h2>Stay in the loop</h2>
              <p className="subscribe-modal__subtitle">
                Get new articles delivered to your inbox. Written thoughtfully, sent rarely.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="subscribe-form">
              <label className="subscribe-form__label" htmlFor="subscribe-email">
                Email address
              </label>
              <input
                id="subscribe-email"
                ref={inputRef}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                required
                className="subscribe-form__input"
              />

              <button
                type="submit"
                disabled={status === "loading" || !email.trim()}
                className="subscribe-form__btn"
              >
                {status === "loading" ? (
                  <span className="subscribe-form__btn-loading">
                    <span className="subscribe-form__dot" />
                    <span className="subscribe-form__dot" />
                    <span className="subscribe-form__dot" />
                  </span>
                ) : (
                  <>
                    Subscribe <PaperPlaneTilt size={15} weight="bold" />
                  </>
                )}
              </button>

              {status === "error" && (
                <div className="subscribe-modal__error">
                  <WarningCircle size={15} weight="bold" />
                  <span>{message || "Something went wrong. Please try again."}</span>
                </div>
              )}

              <p className="subscribe-form__privacy">
                <Lock size={11} weight="bold" />
                No spam. Unsubscribe anytime.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
