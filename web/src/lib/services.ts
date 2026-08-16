export type ServiceOffering = {
  id: string;
  title: string;
  summary: string;
  points?: string[];
  /** Local path under /public or remote Unsplash */
  image: string;
  imageAlt: string;
};

/** Shared for nav dropdown + services page cards */
export const ourServices: ServiceOffering[] = [
  {
    id: "campus-placement",
    title: "Campus Placement Services",
    summary:
      "Structured campus hiring for fresh talent — college engagement, assessments, and offers that scale with your graduate intake.",
    points: [
      "Campus drives and college partnerships",
      "Assessments and shortlisting at scale",
      "Offer management for graduate batches",
    ],
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "University graduates at a commencement ceremony",
  },
  {
    id: "permanent-executive",
    title: "Permanent Hiring & Executive Recruitment",
    summary:
      "Full-time placement across functions, with dedicated executive search for roles that need experience, judgment, and cultural fit.",
    points: [
      "Role scoping with hiring managers",
      "Private shortlists — not resume dumps",
      "Offer support through acceptance",
    ],
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Professionals collaborating in a modern office",
  },
  {
    id: "contract-staffing",
    title: "Contract Staffing",
    summary:
      "Scale workforce up or down for projects and seasons — without the long-term cost of permanent headcount.",
    points: [
      "End-to-end lifecycle: source, onboard, payroll, exit",
      "Pro-rata and project-based staffing models",
      "Employee admin, attendance, and documentation",
    ],
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Team collaborating around a workspace",
  },
  {
    id: "executive-leadership",
    title: "Executive & Leadership Hiring",
    summary:
      "Confidential leadership searches for CXO, business-head, and critical leadership seats with stakeholder-aligned shortlists.",
    points: [
      "Discrete outreach for senior leaders",
      "Stakeholder calibration on mandate and culture",
      "Support through offer and start",
    ],
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Leadership discussion in a meeting room",
  },
  {
    id: "rpo",
    title: "Recruitment Process Outsourcing (RPO)",
    summary:
      "We run sourcing, screening, and coordination as an extension of your talent team — end-to-end or project-based.",
    points: [
      "Full RPO or surge support for high-volume hiring",
      "Interview scheduling, screening, and assessments",
      "Optional implant recruiters on-site with your team",
    ],
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Recruiters reviewing candidate profiles together",
  },
  {
    id: "statutory-compliance",
    title: "Statutory Compliance Services",
    summary:
      "Minimize compliance risk and simplify workforce admin — so growth stays clean and audit-ready.",
    points: [
      "PF, ESI, and professional tax support",
      "Employee docs, attendance, returns, and F&F",
      "Compliance audits and advisory when rules change",
    ],
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Professional reviewing documents and compliance records",
  },
  {
    id: "senior-middle",
    title: "Senior & Middle-Level Hiring",
    summary:
      "Focused hiring for senior and mid-management roles that keep delivery, operations, and growth moving.",
    points: [
      "Domain-aware search for mid and senior roles",
      "Calibration with hiring managers each week",
      "Faster cycles without lowering the bar",
    ],
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Senior professional in a workplace setting",
  },
];
