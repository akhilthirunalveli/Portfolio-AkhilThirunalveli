import SectionHeading from "./SectionHeading";
import { experienceData } from "@/data/portfolio";
import { MapPin } from "lucide-react";

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
          pointerEvents: "none"
        }}
      />
      <SectionHeading number="01" title="Experience" id="experience-heading" />
      <div className="timeline">
        {experienceData.map((exp) => (
          <article key={exp.id} className="timeline__item">
            <div className="timeline__marker" aria-hidden="true" />

            <div className="timeline__header">
              <h3 className="timeline__role">{exp.role}</h3>
              <span className="timeline__duration">{exp.duration}</span>
            </div>

            <div className="timeline__meta">
              <a href={exp.companyUrl} className="timeline__company" target="_blank" rel="noopener noreferrer">
                {exp.company} ↗
              </a>
              {exp.type && <span className="timeline__sep">·</span>}
              {exp.type && <span className="timeline__type">{exp.type}</span>}
              {exp.location && <span className="timeline__sep">·</span>}
              {exp.location && (
                <span className="timeline__location">
                  <MapPin size={11} /> {exp.location}
                </span>
              )}
            </div>

            <ul className="timeline__bullets">
              {exp.bullets?.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>

            <div className="timeline__tags">
              {exp.tags?.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
