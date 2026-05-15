import SectionHeading from "./SectionHeading";
import { ExternalLink, GitMerge } from "lucide-react";
import Image from "next/image";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function FluxionCard() {
  return (
    <article className="bento-card--oss">
      <div className="oss-header">
        <div className="oss-header-left">
          <div className="oss-repo">
            <GitHubIcon />
            <span> Fluxion - AI Agent Builder</span>
          </div>
          <h3 className="oss-title">Premium Homepage Redesign</h3>
        </div>
        <div className="oss-status">
          <GitMerge size={14} />
          Merged
        </div>
      </div>
      <p className="oss-subtitle">Contributed a complete redesign of the Fluxion AI Agent Builder landing page, migrating to a solid design system.</p>
      <a
        href="https://github.com/anshtripathi6969/FLUXION--AI-AGENT-BUILDER/pull/27"
        className="oss-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon /> View Pull Request <ExternalLink size={14} />
      </a>
    </article>
  );
}

function LeadershipCard() {
  const roles = [
    { title: "Lead, Non Technical Team", period: "Sep 2024 – Sep 2025", dur: "1 yr 1 mo" },
    { title: "Lead, Content Team", period: "Sep 2023 – Oct 2024", dur: "1 yr 2 mos" },
    { title: "Editor, Content Writer", period: "May 2022 – Aug 2023", dur: "1 yr 4 mos" },
  ];
  return (
    <article className="bento-card bento-card--timeline">
      <span className="bento-card__badge">Leadership</span>
      <div className="mini-timeline">
        {roles.map((r, i) => (
          <div key={i} className="mini-timeline__item">
            <div className="mini-timeline__dot" />
            <div>
              <h4 className="mini-timeline__role">{r.title}</h4>
              <span className="mini-timeline__period">{r.period} · {r.dur}</span>
            </div>
          </div>
        ))}
      </div>

      {/* GDG subsection inside Leadership */}
      <div className="leadership-gdg">
        <div className="leadership-gdg__header">
          <Image
            src="/Logo/google-developers-svgrepo-com.svg"
            alt="GDG"
            width={20}
            height={20}
          />
          <span className="bento-card__badge bento-card__badge--google">GDG VIT</span>
        </div>
        <h4 className="leadership-gdg__title">Google Developer Groups</h4>
        <p className="leadership-gdg__sub">Member · On-campus chapter</p>
      </div>
    </article>
  );
}

function GDSCCard() {
  const roles = [
    { title: "Lead, Gen AI & Cloud Facilitator", period: "Jan 2023 – Dec 2023", dur: "1 yr" },
    { title: "Mentor, Google Cloud Career Practitioner", period: "Aug 2022 – Dec 2022", dur: "5 mos" },
  ];
  return (
    <article className="bento-card bento-card--gdsc" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div>
        <div className="bento-card__top">
          <GoogleIcon />
          <span className="bento-card__badge bento-card__badge--google">GDSC</span>
        </div>
        <h3 className="bento-card__title">Google Developer Student Clubs</h3>
        <p className="bento-card__subtitle">Full-time · 1 yr 5 mos · On-site</p>
        <div className="mini-timeline">
          {roles.map((r, i) => (
            <div key={i} className="mini-timeline__item">
              <div className="mini-timeline__dot mini-timeline__dot--google" />
              <div>
                <h4 className="mini-timeline__role">{r.title}</h4>
                <span className="mini-timeline__period">{r.period} · {r.dur}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
        <ul className="tag-list" style={{ margin: 0 }}>
          <li className="tag">Google Cloud</li>
          <li className="tag">Gen AI</li>
          <li className="tag">Community</li>
        </ul>
      </div>
    </article>
  );
}

function AgentblazerCard() {
  return (
    <article className="bento-card bento-card--salesforce">
      <div className="salesforce-header">
        <img src="/Logo/salesforce-cloud.svg" alt="Salesforce" className="salesforce-logo" />
        <span className="salesforce-org">Salesforce</span>
      </div>
      <h3 className="bento-card__title">Agentblazer Champion</h3>
      <div className="salesforce-meta">
        <span className="salesforce-badge">Champion</span>
        <span className="salesforce-issued">Issued Jan 2026</span>
      </div>
      <span className="bento-card__year">2026</span>
    </article>
  );
}

function AMSCard() {
  return (
    <article className="bento-card bento-card--ams">
      <Image src="/Logo/ams-logo.svg" alt="AMS" width={300} height={50} className="ams-logo-large" />
      <span className="bento-card__badge bento-card__badge--ams"></span>
      <h3 className="bento-card__title">American Mathematical Society</h3>
      <p className="bento-card__subtitle">Lead, Non Technical Department</p>
      <span className="ams-period">Jan 2023 - Dec 2023 · 1 yr</span>
    </article>
  );
}

async function GitHubCard() {
  let contributions = "Lots of";
  try {
    const res = await fetch("https://github.com/users/akhilthirunalveli/contributions", { next: { revalidate: 3600 } });
    if (res.ok) {
      const html = await res.text();
      const match = html.match(/([0-9,]+)\s+contributions/i);
      if (match) contributions = match[1];
    }
  } catch (error) {
    console.error("Failed to fetch contributions");
  }

  return (
    <article className="bento-card bento-card--github">
      <div className="bento-card__top">
        <GitHubIcon />
        <span className="bento-card__badge bento-card__badge--github">GitHub</span>
      </div>
      <h3 className="bento-card__title">{contributions} Contributions</h3>
      <p className="bento-card__subtitle" style={{marginBottom: "0"}}>in the last year</p>
      <div className="github-chart-container">
        <img 
          src="https://ghchart.rshah.org/akhilthirunalveli" 
          alt="GitHub Contributions" 
          className="github-chart"
        />
      </div>
    </article>
  );
}

function LeetcodeCard() {
  return (
    <article className="bento-card bento-card--leetcode">
      <div className="bento-card__top">
        <span className="bento-card__badge bento-card__badge--leetcode">LeetCode</span>
      </div>
      <h3 className="bento-card__title">Problem Solving</h3>
      <p className="bento-card__subtitle" style={{marginBottom: "0"}}>Data Structures & Algorithms</p>
      <div className="leetcode-chart-container">
        <img 
          src="https://leetcard.jacoblin.cool/akhilthirunalveli?theme=light&font=Inter&ext=svg" 
          alt="LeetCode Stats" 
          className="leetcode-chart"
        />
      </div>
    </article>
  );
}

export default function AchievementsSection() {
  return (
    <section id="achievements" className="portfolio-section">
      <SectionHeading number="06" title="Achievements" id="achievements-heading" />
      <div className="bento-grid">
        <FluxionCard />
        <AgentblazerCard />
        <LeadershipCard />
        <AMSCard />
        <GDSCCard />
        <GitHubCard />
        <LeetcodeCard />
      </div>
    </section>
  );
}
