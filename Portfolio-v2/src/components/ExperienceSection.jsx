import SectionHeading from "./SectionHeading";
import { experienceData } from "@/data/portfolio";
import { MapPin, Briefcase } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="portfolio-section"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "var(--bg)",
          zIndex: -1,
          pointerEvents: "none",
        }}
      />
      <SectionHeading number="01" title="Experience" id="experience-heading" />
      <div className="exp-timeline">
        {experienceData.map((exp, index) => (
          <article key={exp.id} className="exp-card">
            {/* Left accent bar */}
            <div className="exp-card__accent" aria-hidden="true" />

            {/* Step number */}
            <div className="exp-card__step" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Content */}
            <div className="exp-card__body">
              <div className="exp-card__top">
                <div className="exp-card__title-group">
                  <h3 className="exp-card__role">{exp.role}</h3>
                  <div className="exp-card__meta">
                    <a
                      href={exp.companyUrl}
                      className="exp-card__company"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {exp.company}
                    </a>
                    {exp.type && (
                      <span className="exp-card__type">{exp.type}</span>
                    )}
                  </div>
                </div>
                <div className="exp-card__right-meta">
                  <span className="exp-card__duration">{exp.duration}</span>
                  {exp.location && (
                    <span className="exp-card__location">
                      <MapPin size={11} /> {exp.location}
                    </span>
                  )}
                </div>
              </div>

              <ul className="exp-card__bullets">
                {exp.bullets?.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>

              <div className="exp-card__tags">
                {exp.tags?.map((tag) => (
                  <span key={tag} className="tag tag--accent">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
