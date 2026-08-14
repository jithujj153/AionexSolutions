import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = pageMeta({
  title: "Services & Products",
  description:
    "AIONEX recruiting services — permanent placement, leadership search, specialist hiring, and candidate matching — plus factory ERP, fuel pump ERP, and custom software.",
  path: "/services",
});

type Offering = {
  id: string;
  title: string;
  summary: string;
  points: string[];
};

const recruiting: Offering[] = [
  {
    id: "permanent-placement",
    title: "Permanent placement",
    summary:
      "Full-time hiring across engineering, product, design, operations, sales, and leadership — calibrated to your brief, not a resume dump.",
    points: [
      "Role scoping with the hiring manager before search starts",
      "Active sourcing plus screened applicants from open roles",
      "Private shortlists shared only with your team",
      "Interview coordination through offer and notice-period planning",
    ],
  },
  {
    id: "leadership-search",
    title: "Leadership & executive search",
    summary:
      "Discrete searches for senior and leadership roles where fit, judgment, and confidentiality matter as much as skills.",
    points: [
      "Targeted outreach for hard-to-reach leaders",
      "Stakeholder calibration on culture and mandate",
      "Confidential process for sensitive replacements or new seats",
      "Offer support through acceptance and start",
    ],
  },
  {
    id: "specialist-hiring",
    title: "Specialist & niche hiring",
    summary:
      "When the market is thin — niche technical stacks, design craft, ops excellence, or sales leadership — we run a precise search.",
    points: [
      "Must-have vs nice-to-have clarity up front",
      "Market mapping for scarce skill sets",
      "Fewer, stronger introductions that respect interview time",
      "Feedback loops so the shortlist improves weekly",
    ],
  },
  {
    id: "employer-search",
    title: "Employer retained search",
    summary:
      "Partner with AIONEX when you need a dedicated search lane — status you can act on, not a black box.",
    points: [
      "Clear milestones from brief to shortlist to close",
      "Regular status updates for hiring managers",
      "Alignment across interview panel feedback",
      "Support for competing offers and candidate experience",
    ],
  },
  {
    id: "candidate-matching",
    title: "Candidate matching & open roles",
    summary:
      "For professionals: published roles with a direct path to the AIONEX team — no public profile marketplace.",
    points: [
      "Browse curated open roles on our jobs board",
      "Apply once; we route you to relevant searches",
      "Job alerts when new roles match your preferences",
      "Materials shared only for active, relevant opportunities",
    ],
  },
  {
    id: "hiring-support",
    title: "Interview & offer support",
    summary:
      "We stay in the loop after introductions — so process doesn’t stall and strong candidates don’t go cold.",
    points: [
      "Loop scheduling and panel coordination",
      "Fast calibration when feedback diverges",
      "Honest timelines for candidates and clients",
      "Clean handoff into onboarding after acceptance",
    ],
  },
];

const products: Offering[] = [
  {
    id: "factory-erp",
    title: "Factory end-to-end automation ERP",
    summary:
      "A unified ERP layer for plant operations — from planning and inventory through production, quality, and dispatch.",
    points: [
      "Shop-floor to back-office visibility in one system",
      "Inventory, BOM, production orders, and quality checkpoints",
      "Dashboards for throughput, downtime, and fulfillment",
      "Built to fit your process — not a rigid off-the-shelf template",
    ],
  },
  {
    id: "fuel-pump-erp",
    title: "Fuel pump ERP",
    summary:
      "Purpose-built ERP for fuel pump and petroleum retail operations — sales, stock, shifts, and reconciliation.",
    points: [
      "Pump-side sales and shift reconciliation",
      "Tank and stock tracking with variance visibility",
      "Dealer / outlet reporting for owners and managers",
      "Controls that reduce leakage and manual spreadsheet work",
    ],
  },
  {
    id: "custom-software",
    title: "Custom software solutions",
    summary:
      "Bespoke applications and integrations when a product box doesn’t fit — web, internal tools, and system connections.",
    points: [
      "Web apps and internal tools for your workflows",
      "Integrations with existing ERPs, CRMs, and devices",
      "Clear discovery, build, and handoff with your team",
      "Support options after go-live",
    ],
  },
];

function OfferingList({
  items,
  startAt = 1,
  ariaLabel,
}: {
  items: Offering[];
  startAt?: number;
  ariaLabel: string;
}) {
  return (
    <ol className={styles.list} aria-label={ariaLabel} start={startAt}>
      {items.map((item, index) => {
        const n = startAt + index;
        const label = n < 10 ? `0${n}` : `${n}`;
        return (
          <li key={item.id} id={item.id} className={styles.item}>
            <span className={styles.index}>{label}</span>
            <div className={styles.body}>
              <h3>{item.title}</h3>
              <p className={styles.summary}>{item.summary}</p>
              <ul className={styles.points}>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function ServicesPage() {
  return (
    <div className={`page page-light ${styles.services}`}>
      <section className={`container ${styles.hero}`}>
        <p className="eyebrow">Services &amp; products</p>
        <h1 className={styles.title}>Recruiting first. Systems when you need them.</h1>
        <p className={styles.lead}>
          AIONEX is an agency-led recruiting partner for open roles and hard-to-find talent. We also
          deliver industry ERP and custom software for teams that need operations systems alongside
          hiring.
        </p>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="recruiting-heading">
        <p className="eyebrow">Recruiting</p>
        <h2 id="recruiting-heading" className={styles.sectionTitle}>
          How we hire with you.
        </h2>
        <p className={styles.sectionLead}>
          Precision shortlists, private matching, and a clear path from brief to accepted offer —
          for employers and for candidates.
        </p>
        <OfferingList items={recruiting} ariaLabel="Recruiting services" />
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="products-heading">
        <p className="eyebrow">Products &amp; software</p>
        <h2 id="products-heading" className={styles.sectionTitle}>
          ERP and custom build.
        </h2>
        <p className={styles.sectionLead}>
          When you need the system as well as the people — factory automation, fuel retail, or a
          custom application.
        </p>
        <OfferingList items={products} startAt={recruiting.length + 1} ariaLabel="Products" />
      </section>

      <section className={styles.ctaBand}>
        <div className="container">
          <p className="eyebrow">Next step</p>
          <h2 className={styles.ctaTitle}>Tell us what you need.</h2>
          <p className={styles.ctaLead}>
            Hiring a team, filling a leadership seat, or scoping an ERP — start with a short note
            and we’ll route you to the right lane.
          </p>
          <div className={styles.actions}>
            <Link href="/hire" className="btn btn-accent">
              Hire talent
            </Link>
            <Link href="/jobs" className="btn btn-dark">
              View open roles
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Contact AIONEX
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
