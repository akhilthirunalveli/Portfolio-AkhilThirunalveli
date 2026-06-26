"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import ThemeToggle from "./ThemeToggle";
import SubscribeModal from "./SubscribeModal";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [isAi, setIsAi] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // AT -> AI swap interval
    const interval = setInterval(() => {
      setIsAi((prev) => !prev);
    }, 2500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__inner">
          <Link href="/" className="navbar__brand flex items-center">
            <span>A</span>
            <span className="relative grid overflow-hidden">
              <span
                className={`col-start-1 row-start-1 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isAi ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
                }`}
              >
                T
              </span>
              <span
                className={`col-start-1 row-start-1 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] text-blue-500 ${
                  isAi ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                }`}
              >
                I
              </span>
            </span>
          </Link>

          <div className="navbar__nav">
            <Link
              href="/"
              className={`navbar__link ${
                pathname === "/" ? "navbar__link--active" : ""
              }`}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={`navbar__link ${
                pathname === "/about" ? "navbar__link--active" : ""
              }`}
            >
              About
            </Link>
          </div>

          <div className="navbar__actions">
            <ThemeToggle />
            <button
              className="navbar__subscribe-btn"
              onClick={() => setShowSubscribe(true)}
            >
              Subscribe
            </button>
          </div>

          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X size={22} weight="bold" />
            ) : (
              <List size={22} weight="bold" />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="navbar__mobile-menu">
            <Link
              href="/"
              className="navbar__mobile-link"
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="navbar__mobile-link"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
            <div className="navbar__mobile-actions">
              <ThemeToggle />
              <button
                className="navbar__subscribe-btn"
                onClick={() => {
                  setShowSubscribe(true);
                  setMobileOpen(false);
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        )}
      </nav>

      <SubscribeModal
        isOpen={showSubscribe}
        onClose={() => setShowSubscribe(false)}
      />
    </>
  );
}
