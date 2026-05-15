import SectionHeading from "./SectionHeading";
import { aboutData } from "@/data/portfolio";
import { Presentation, PenLine } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="portfolio-section">
      <SectionHeading number="02" title="About" id="about-heading" />
      <div className="about-grid">
        <div className="about__text">
          {aboutData.bio.map((paragraph, i) => (
            <p key={i} className="about__paragraph">
              {paragraph}
            </p>
          ))}
          <div className="about__actions">
            <a href="https://presentations.akhil.world/" className="about__action-btn">
              <Presentation size={16} />
              DeckRoom | Presentations
            </a>
            <a href="https://blog.akhil.world/" className="about__action-btn" target="_blank" rel="noopener noreferrer">
              <PenLine size={16} />
              Blog
            </a>
          </div>
        </div>
        <div className="about__sidebar">
          <h3 className="about__sidebar-title">Interests</h3>
          <ul className="tag-list tag-list--vertical" role="list">
            {aboutData.interests.map((interest) => (
              <li key={interest} className="tag tag--accent">
                {interest}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
