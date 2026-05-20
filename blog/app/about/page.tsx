import Link from "next/link";
import {
  ArrowLeft,
  GithubLogo,
  LinkedinLogo,
  XLogo,
  Envelope,
  ArrowSquareOut,
  MapPin,
  Briefcase,
  GraduationCap,
} from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "About — Akhil's Blog",
  description: "About Akhil Thirunalveli — AI & Full Stack Engineer",
};

const bio = [
  "A developer passionate about crafting clean, performant, and thoughtful digital experiences. I enjoy the full spectrum — I'm an engineer first, then a developer. I love building solutions that make a difference.",
  "When I'm not coding, you'll find me exploring new technologies, contributing to open source, or learning about the stock market and trying my luck on it.",
];

const interests = [
  "AI & Open Source",
  "System Design",
  "UI/UX",
  "Cloud Infrastructure",
  "Problem-Solving",
];

const experience = [
  {
    role: "AI Engineer Intern (Contract)",
    company: "Snorkel AI",
    companyUrl: "https://snorkel.ai",
    duration: "Present",
    location: "Redwood City, CA · Remote",
    bullets: [
      "Developed specialized training datasets and evaluation environments targeting frontier model failure modes.",
      "Designed and evaluated 1,000+ task instances advancing Claude Sonnet in software engineering workflows.",
      "Built and tested autonomous AI agents capable of multi-step task execution across complex scenarios.",
    ],
    tags: ["LLM", "Adversarial Testing", "AI Agents", "Claude Sonnet"],
  },
  {
    role: "Software Development Engineer Intern",
    company: "State Bank of India Foundation",
    companyUrl: "https://sbifoundation.in",
    duration: "Oct – Dec 2024",
    location: "Mumbai, India · On-site",
    bullets: [
      "Engineered an AI-assisted decision pipeline processing 200k+ applications, reducing turnaround time by 85%.",
      "Built anomaly detection and failure triage systems to surface data inconsistencies.",
      "Designed scalable backend pipelines in Python and SQL with structured validation checkpoints.",
    ],
    tags: ["Python", "SQL", "Agentic Workflows", "Data Engineering"],
  },
];

const education = {
  degree: "Bachelor of Technology",
  field: "Computer Science & Engineering",
  institution: "Vellore Institute of Technology",
  duration: "2022 – 2026",
  grade: "CGPA: 8.65 / 10",
};

const techStack = {
  languages: ["JavaScript", "TypeScript", "Python", "Langchain"],
  frontend: ["React", "Next.js", "Tailwind CSS", "HTML/CSS"],
  backend: ["Node.js", "Express", "FastAPI", "PostgreSQL"],
  tools: ["Git", "Docker", "AWS", "Linux", "Figma"],
};

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

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* Back link */}
      <Link href="/" className="about-back">
        <ArrowLeft size={16} weight="bold" /> Back to Blog
      </Link>

      {/* Hero */}
      <header className="about-hero">
        <h1 className="about-hero__name">Akhil Thirunalveli</h1>
        <p className="about-hero__title">AI & Full Stack Engineer</p>
        <p className="about-hero__tagline">
          Building things that live on the internet
        </p>
      </header>

      {/* Bio + Interests Grid */}
      <section className="about-section">
        <div className="about-bio-grid">
          <div className="about-bio">
            {bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="about-interests">
            <h3>Interests</h3>
            <ul>
              {interests.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="about-section">
        <h2 className="about-section__heading">
          <Briefcase size={18} weight="bold" /> Experience
        </h2>
        <div className="about-experience-list">
          {experience.map((exp, i) => (
            <article key={i} className="about-exp-card">
              <div className="about-exp-card__header">
                <div>
                  <h3 className="about-exp-card__role">{exp.role}</h3>
                  <div className="about-exp-card__meta">
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="about-exp-card__company"
                    >
                      {exp.company}{" "}
                      <ArrowSquareOut size={12} weight="bold" />
                    </a>
                    <span className="about-exp-card__location">
                      <MapPin size={12} weight="bold" /> {exp.location}
                    </span>
                  </div>
                </div>
                <span className="about-exp-card__duration">
                  {exp.duration}
                </span>
              </div>
              <ul className="about-exp-card__bullets">
                {exp.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
              <div className="about-exp-card__tags">
                {exp.tags.map((tag) => (
                  <span key={tag} className="about-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="about-section">
        <h2 className="about-section__heading">
          <GraduationCap size={18} weight="bold" /> Education
        </h2>
        <article className="about-edu-card">
          <div className="about-edu-card__header">
            <div>
              <h3 className="about-edu-card__degree">{education.degree}</h3>
              <p className="about-edu-card__field">{education.field}</p>
            </div>
            <span className="about-edu-card__duration">
              {education.duration}
            </span>
          </div>
          <div className="about-edu-card__footer">
            <span>{education.institution}</span>
            <span className="about-edu-card__grade">{education.grade}</span>
          </div>
        </article>
      </section>

      {/* Tech Stack */}
      <section className="about-section">
        <h2 className="about-section__heading">Tech Stack</h2>
        <div className="about-tech-grid">
          {Object.entries(techStack).map(([category, items]) => (
            <div key={category} className="about-tech-group">
              <h4 className="about-tech-group__label">{category}</h4>
              <div className="about-tech-group__items">
                {items.map((item) => (
                  <span key={item} className="about-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Connect */}
      <section className="about-section">
        <h2 className="about-section__heading">Connect</h2>
        <div className="about-socials">
          {socials.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="about-social-link"
            >
              <s.icon size={18} weight="bold" />
              {s.platform}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
