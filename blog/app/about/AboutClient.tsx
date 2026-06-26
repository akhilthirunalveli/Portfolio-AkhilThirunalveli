"use client";

import { useRef } from "react";
import {
  GithubLogo,
  LinkedinLogo,
  XLogo,
  Envelope
} from "@phosphor-icons/react/dist/ssr";
import { useScrollAnimation } from "@/app/hooks/useIntersectionObserver";

const socials = [
  {
    platform: "GitHub",
    url: "https://github.com/akhilthirunalveli",
    icon: GithubLogo,
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/akhilthirunalveli",
    icon: LinkedinLogo,
  },
  {
    platform: "X (Twitter)",
    url: "https://x.com/archivebyakhil",
    icon: XLogo,
  },
  {
    platform: "Email",
    url: "mailto:work.akhilthirunalveli@gmail.com",
    icon: Envelope,
  },
];

export default function AboutClient() {
  const containerRef = useRef<HTMLElement>(null);
  useScrollAnimation(".about-fade");

  return (
    <main ref={containerRef}>
      <header className="about-hero">
        <h1 className="about-hero__name">Akhil Thirunalveli</h1>
        <p className="about-hero__title">AI & Full Stack Engineer</p>
        <p className="about-hero__tagline">
          Building things that live on the internet
        </p>
      </header>

      <section className="about-container">
        <article className="about-prose">
          <p className="about-fade">
            I’m a developer passionate about crafting clean, performant, and thoughtful digital experiences. I like to think of myself as an engineer first and a developer second—meaning I care deeply about the underlying architecture and system design before writing a single line of code. Whether it's building cloud infrastructure or refining the tiniest UI interaction, I love building solutions that actually make a difference.
          </p>
          <p className="about-fade">
            Currently, I'm working as an <strong>AI Engineer Intern (Contract) at <a href="https://snorkel.ai" target="_blank" rel="noopener noreferrer">Snorkel AI</a></strong>, where I get to push the boundaries of what frontier models can do. My work revolves around developing specialized training datasets and adversarial evaluation environments targeting AI failure modes. Recently, I designed and evaluated over 1,000 task instances to advance Claude Sonnet in complex software engineering workflows, and I’ve been actively building autonomous AI agents capable of multi-step task execution.
          </p>
          <p className="about-fade">
            Before Snorkel, I spent time at the <strong><a href="https://sbifoundation.in" target="_blank" rel="noopener noreferrer">State Bank of India Foundation</a></strong> as a Software Development Engineer Intern. There, I engineered an AI-assisted decision pipeline that processed over 200,000 applications, reducing turnaround time by 85%. I also built anomaly detection systems and scalable backend pipelines using Python and SQL to surface data inconsistencies and ensure structural integrity.
          </p>
          <p className="about-fade">
            I’m currently pursuing my <strong>Bachelor of Technology in Computer Science & Engineering</strong> at the Vellore Institute of Technology (2022–2026). My technical ecosystem spans across full-stack development and AI engineering—I work heavily with JavaScript, TypeScript, Python, and Langchain. On the frontend, I rely on React, Next.js, and Tailwind CSS, while my backend and infrastructure tools include Node.js, FastAPI, PostgreSQL, Docker, and AWS.
          </p>
          <p className="about-fade">
            When I'm not coding, you'll usually find me exploring new open-source technologies, diving into system design patterns, or learning about the stock market and trying my luck with it.
          </p>
        </article>

        <div className="about-socials-inline about-fade">
          {socials.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="about-social-link-inline"
            >
              <s.icon size={20} weight="bold" />
              <span>{s.platform}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
