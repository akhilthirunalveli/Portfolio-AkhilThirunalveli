
// ── Portfolio Data ──────────────────────────────────────────────
// Central data file. Edit content here — components read from this.

export const personalInfo = {
  name: "Akhil Thirunalveli",
  firstName: "Akhil",
  lastName: "Thirunalveli",
  title: "AI & Full Stack Engineer",
  tagline: "Building things that live on the internet",
  location: "India",
  email: "work.akhilthirunalveli@gmail.com", // update with real email
  resumeUrl: "/Resume/Akhil_Thirunalveli_Resume.pdf", // Add your resume PDF in the public folder
};

export const aboutData = {
  bio: [
    "A developer passionate about crafting clean, performant, and thoughtful digital experiences. I enjoy the full spectrum, I'm engineer first then a developer. I love building solutions that make a difference.",
    "When I'm not coding, you'll find me exploring new technologies, contributing to open source, or Learning about stockmarket and trying my luck on it.",
  ],
  interests: ["AI & Open Source", "System Design", "UI/UX", "Cloud Infrastructure", "Problem-Solving"],
};

export const experienceData = [
  {
    id: "exp-snorkel",
    role: "AI Engineer Intern (Contract)",
    company: "Snorkel AI",
    companyUrl: "https://snorkel.ai",
    duration: "Present",
    type: "Internship",
    location: "Redwood City, CA, United States | Remote",
    bullets: [
      "Developed specialized training datasets and evaluation environments targeting frontier model failure modes, improving model reliability in adversarial and edge-case scenarios.",
      "Designed and evaluated 1,000+ task instances advancing Claude Sonnet in software engineering workflows specifically Git operations, pull request review, and repository issue resolution at scale.",
      "Built and tested autonomous AI agents capable of multi-step task execution across complex software engineering scenarios; identified and closed capability gaps in agent reasoning and tool use.",
    ],
    tags: ["LLM", "Adversarial Testing", "AI Agents", "Claude Sonnet", "Git Ops", "RLAIF"],
  },
  {
    id: "exp-sbi",
    role: "Software Development Engineer Intern",
    company: "State Bank of India Foundation",
    companyUrl: "https://sbifoundation.in",
    duration: "Oct – Dec 2024",
    type: "Internship",
    location: "Mumbai, Maharashtra, India | On-site",
    bullets: [
      "Engineered an AI-assisted decision pipeline processing 200k+ applications, reducing turnaround time by 85% through automated multi-stage agentic workflows with rule-based scoring and validation layers.",
      "Built anomaly detection and failure triage systems to surface data inconsistencies, ensuring auditability.",
      "Designed scalable backend pipelines in Python and SQL with structured validation checkpoints, enabling reliable and debuggable outputs across 200k+ records.",
    ],
    tags: ["Python", "SQL", "Agentic Workflows", "Anomaly Detection", "Data Engineering"],
  },
];

export const projectsData = [
  {
    id: "proj-mockmate",
    title: "MockMate",
    description:
      "A suite of tools to help you land your dream job with confidence.",
    tags: ["WebRTC", "Langchain", "MERN"],
    thumbnail: "/Projects/Mockmate.png",
    liveUrl: "https://mockmateapp.vercel.app",
    repoUrl: "https://github.com/akhilthirunalveli/MockMate",
    users: "120+",
  },
  {
    id: "proj-kms",
    title: "KnowMyStatus",
    description:
      "A teacher monitoring and status tracking system designed for educational institutions.",
    tags: ["Supabase", "Framer", "MERN"],
    thumbnail: "/Projects/KnowmyStatus.png",
    liveUrl: "https://knowmystatus.vercel.app",
    repoUrl: "https://github.com/akhilthirunalveli/KnowMyStatus-KMS",
    users: "8k+",
  },
  {
    id: "proj-tickr",
    title: "Tickr",
    description:
      "A CLI-first time-tracking tool for accurate, auditable work logs without bloated GUIs.",
    tags: ["SQLite", "Node.js", "TUI"],
    thumbnail: "/Projects/TIckr.png",
    liveUrl: "https://tickr-cli.vercel.app/",
    repoUrl: "https://github.com/akhilthirunalveli/Tickr",
    users: "In collab with Fiverr",
  },
  {
    id: "proj-teletype",
    title: "TeleType",
    description:
      "Real-time multi-client messaging over WebSockets with concurrent connections with no internet required.",
    tags: ["WebSockets", "LAN", "Offline Usage"],
    thumbnail: "/Projects/Teletype.png",
    liveUrl: "https://teletype-edpe.onrender.com/",
    repoUrl: "https://github.com/akhilthirunalveli/TeleType",
    users: "40+",
  },
  {
    id: "proj-newssailor",
    title: "NewsSailor",
    description:
      "An automated news site that shows you updates from across the globe within seconds.",
    tags: ["AWS", "Actions", "React"],
    thumbnail: "/Projects/NewsSailor.png",
    liveUrl: "https://www.newssailor.com/",
    repoUrl: null,
    users: "10k+",
  },
  {
    id: "proj-aura",
    title: "Aura",
    description:
      "Helps you find balance by tracking your mood, sleep, and activity.",
    tags: ["React Native", "ML", "Expo"],
    thumbnail: "/Projects/Aura.png",
    liveUrl: "https://aura-apk.vercel.app/",
    repoUrl: "https://github.com/akhilthirunalveli/Aura",
    users: "10+",
  },
];

export const techStackData = {
  languages: ["JavaScript", "TypeScript", "Python", "Langchain"],
  frontend: ["React", "Next.js", "Tailwind CSS", "HTML/CSS"],
  backend: ["Node.js", "Express", "FastAPI", "PostgreSQL"],
  tools: ["Git", "Docker", "AWS", "Linux", "Figma"],
};

export const educationData = [
  {
    id: "edu-1",
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    institution: "Vellore Institute of Technology",
    duration: "2022 – 2026",
    grade: "CGPA: 8.65 / 10",
  },
  // Add more entries as needed
];

export const achievementsData = [
  {
    id: "ach-1",
    title: "Hackathon Winner",
    description: "First place at XYZ Hackathon 2024 — built a real-time collaboration tool in 36 hours.",
    year: "2024",
  },
  {
    id: "ach-2",
    title: "Open Source Contributor",
    description: "Contributed to major open-source projects with 500+ stars on personal repositories.",
    year: "2023",
  },
  {
    id: "ach-3",
    title: "Technical Writing",
    description: "Published articles on system design and web performance reaching 10k+ readers.",
    year: "2023",
  },
];

export const socialsData = [
  {
    id: "social-github",
    platform: "GitHub",
    url: "https://github.com/akhilthirunalveli",
  },
  {
    id: "social-linkedin",
    platform: "LinkedIn",
    url: "https://linkedin.com/in/akhilthirunalveli",
  },
  {
    id: "social-twitter",
    platform: "X",
    url: "https://x.com/archivebyakhil",
  },
  {
    id: "social-email",
    platform: "Email",
    url: "mailto:work.akhilthirunalveli@gmail.com",
  },
  {
    id: "social-blog",
    platform: "Blog",
    url: "https://blog.akhil.world/",
  },
  {
    id: "social-deckroom",
    platform: "Deck Room",
    url: "https://presentations.akhil.world/",
  },
  {
    id: "social-leetcode",
    platform: "LeetCode",
    url: "https://leetcode.com/akhilthirunalveli",
  },
  {
    id: "social-resume",
    platform: "Resume",
    url: "/Resume/Akhil_Thirunalveli_Resume.pdf",
  },
];

export const navItems = [
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Education", href: "#education" },
  { label: "Achievements", href: "#achievements" },
  { label: "Socials", href: "#socials" },
];
