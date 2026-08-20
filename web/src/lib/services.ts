export type ServiceOffering = {
  id: string;
  title: string;
  summary: string;
  points?: string[];
  /** Shown in the header Services dropdown */
  featured?: boolean;
  href?: string;
  /** Local path under /public or remote Unsplash */
  image: string;
  imageAlt: string;
  imagePosition?: string;
};

/** Shared for nav dropdown + services page cards */
export const ourServices: ServiceOffering[] = [
  {
    id: "executive-search",
    title: "Executive Search",
    featured: true,
    href: "/services/executive-search",
    summary:
      "Confidential leadership searches for CXO, business-head, and critical seats — shortlists aligned to mandate, culture, and judgment.",
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
    id: "permanent-recruitment",
    title: "Permanent Recruitment",
    featured: true,
    href: "/services/permanent-recruitment",
    summary:
      "Full-time hiring across functions — from role scoping to a private shortlist and offer support through acceptance.",
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
    id: "contract-hiring",
    title: "Contract Hiring",
    featured: true,
    href: "/services/contract-hiring",
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
    id: "payroll-outsourcing",
    title: "Payroll Process Outsourcing",
    featured: true,
    href: "/services/payroll-process-outsourcing",
    summary:
      "Run payroll as a managed service — accurate payslips, deductions, and filings without building an in-house payroll desk.",
    points: [
      "Monthly payroll processing and payslips",
      "Statutory deductions, reimbursements, and reports",
      "Single owner for queries, exceptions, and close",
    ],
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Payroll and finance documents on a desk",
  },
  {
    id: "bpo",
    title: "Business Process Outsourcing",
    featured: true,
    href: "/services/business-process-outsourcing",
    summary:
      "Outsource defined operations so your team stays on core work — with process ownership, SLAs, and a named delivery lead.",
    points: [
      "Process mapping and handover",
      "Trained teams for admin, ops, and support lanes",
      "Reporting, SLAs, and continuous improvement",
    ],
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Operations team working in an office",
  },
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
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&h=900&q=80&crop=faces",
    imageAlt: "Senior professional in a workplace setting",
    imagePosition: "50% 18%",
  },
];

export const navServices = ourServices.filter((item) => item.featured);
export const moreServices = ourServices.filter((item) => !item.featured);

export type ProductOffering = {
  id: string;
  title: string;
  summary: string;
  href: string;
  headline: string;
  storyTitle: string;
  story: string[];
  benefitsTitle: string;
  benefitsLead: string;
  benefits: { title: string; body: string }[];
};

export const ourProducts: ProductOffering[] = [
  {
    id: "factory-erp",
    title: "Factory end-to-end automation ERP",
    href: "/services/factory-erp",
    headline: "Plant operations, one system.",
    summary:
      "A unified ERP layer for plant operations — from planning and inventory through production, quality, and dispatch.",
    storyTitle: "From plan to dispatch.",
    story: [
      "AIONEX’s factory ERP brings planning, inventory, production, quality, and dispatch into one operational layer — so plant teams are not stitching together spreadsheets, shop-floor notes, and disconnected tools.",
      "The system is built for manufacturing reality: materials in, work orders through the line, quality checks, and finished goods out. You get a live view of stock, throughput, and exceptions without waiting on month-end reconciliation.",
    ],
    benefitsTitle: "What the ERP covers",
    benefitsLead:
      "One system from the plan to the gate — so production, stores, and dispatch work from the same numbers.",
    benefits: [
      {
        title: "Planning & inventory",
        body: "Align material plans with live stock so shortages surface before they stop the line.",
      },
      {
        title: "Production",
        body: "Track work orders, routing, and output so plant managers see what is running and what is delayed.",
      },
      {
        title: "Quality",
        body: "Capture checks in the flow of work — not as a separate paper trail after the batch has moved.",
      },
      {
        title: "Dispatch",
        body: "Close the loop from finished goods to shipment with a record that stores, sales, and finance can trust.",
      },
    ],
  },
  {
    id: "fuel-pump-erp",
    title: "Fuel pump ERP",
    href: "/services/fuel-pump-erp",
    headline: "Retail fuel, under control.",
    summary:
      "Purpose-built ERP for fuel pump and petroleum retail — sales, stock, shifts, and reconciliation.",
    storyTitle: "Sales, stock, and close of day.",
    story: [
      "Fuel retail runs on tight margins and tighter shifts. AIONEX’s fuel pump ERP is purpose-built for petroleum outlets — so sales, tank stock, shift handovers, and reconciliation sit in one place instead of notebooks and end-of-day spreadsheets.",
      "Attendants, supervisors, and owners see the same picture: litres sold, stock on hand, and what still needs to match before the books close. Built for the rhythm of a pump, not a generic retail suite.",
    ],
    benefitsTitle: "Built for the pump",
    benefitsLead:
      "Purpose-built for petroleum retail — so every shift can close clean and every tank stays accounted for.",
    benefits: [
      {
        title: "Sales",
        body: "Record pump and shop sales against the shift so volume and value are visible as the day runs.",
      },
      {
        title: "Stock",
        body: "Track tank and shop inventory so receipts, sales, and remaining stock stay in one ledger.",
      },
      {
        title: "Shifts",
        body: "Handover with a clear close — who was on, what moved, and what still needs a check.",
      },
      {
        title: "Reconciliation",
        body: "Match sales, stock, and collections at close of day without rebuilding the numbers by hand.",
      },
    ],
  },
  {
    id: "custom-software",
    title: "Custom software solutions",
    href: "/services/custom-software",
    headline: "Software that fits the work.",
    summary:
      "Bespoke applications and integrations when a product box doesn’t fit — web, internal tools, and system connections.",
    storyTitle: "When a product box doesn’t fit.",
    story: [
      "Some processes will never sit neatly inside an off-the-shelf product. AIONEX builds bespoke applications and integrations — web systems, internal tools, and connections between the systems you already run — so the software matches the work, not the other way around.",
      "We start from the process: who uses it, what must not break, and which systems already hold the source of truth. Then we deliver a tool your team can actually run, with a path to extend it as the operation grows.",
    ],
    benefitsTitle: "How we build",
    benefitsLead:
      "Applications and integrations shaped around your process — web, internal tools, and the systems they must talk to.",
    benefits: [
      {
        title: "Web applications",
        body: "Customer-facing or internal web apps when a portal, workflow, or operations desk needs its own shape.",
      },
      {
        title: "Internal tools",
        body: "Purpose-built desks for ops, finance, or plant teams that replace spreadsheet workarounds.",
      },
      {
        title: "Integrations",
        body: "Connect ERP, payroll, and line-of-business systems so data moves once and stays consistent.",
      },
      {
        title: "Owned delivery",
        body: "A named path from brief to launch — and support after go-live when the process changes.",
      },
    ],
  },
];

