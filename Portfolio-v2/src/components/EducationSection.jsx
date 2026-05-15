import SectionHeading from "./SectionHeading";
import { educationData } from "@/data/portfolio";

export default function EducationSection() {
  return (
    <section id="education" className="portfolio-section">
      <SectionHeading number="05" title="Education" id="education-heading" />
      <div className="education-list">
        {educationData.map((edu) => (
          <article key={edu.id} className="education-card">
            <div className="education-card__header">
              <h3 className="education-card__degree">{edu.degree}</h3>
              <div className="education-card__header-meta">
                {edu.grade && (
                  <span className="education-card__grade">{edu.grade}</span>
                )}
                <span className="education-card__duration">{edu.duration}</span>
              </div>
            </div>
            <p className="education-card__field">{edu.field}</p>
            <p className="education-card__institution">{edu.institution}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
