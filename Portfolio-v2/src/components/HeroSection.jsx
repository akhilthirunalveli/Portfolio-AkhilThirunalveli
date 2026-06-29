"use client";
import { personalInfo } from "@/data/portfolio";
import { Volume2, Mail } from "lucide-react";
import { useRef, useState } from "react";
import EmailModal from "./EmailModal";

export default function HeroSection() {
  const audioRef = useRef(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const playPronunciation = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero__name-block">
        <h1 className="hero__name">
          <span className="hero__name-line hero__name-line--first">
            {personalInfo.firstName}
          </span>
          <span className="hero__name-line hero__name-line--second">
            {personalInfo.lastName}
            <button
              onClick={playPronunciation}
              className="hero__pronunciation"
              aria-label="Listen to pronunciation"
            >
              <Volume2 size={24} />
            </button>
            <audio ref={audioRef} src="/Voice/AkhilThirunalveli_Voiceover.mp3" preload="auto" />
          </span>
        </h1>
      </div>

      <div className="hero__meta">
        <div className="hero__meta-wrapper">
          <p className="hero__title">{personalInfo.title}</p>
          <p className="hero__tagline">{personalInfo.tagline}</p>
        </div>
        <div className="hero__actions">
          <a href="#projects" className="btn btn--primary">View Work</a>
          <a
            href={personalInfo.resumeUrl}
            className="btn btn--primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="btn btn--primary"
            aria-label="Email Me"
          >
            <Mail size={18} />
            Email
          </button>
        </div>
      </div>


      {isEmailModalOpen && <EmailModal onClose={() => setIsEmailModalOpen(false)} />}
    </section>
  );
}
