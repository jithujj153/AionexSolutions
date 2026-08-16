import Link from "next/link";
import { OutcomesMetrics } from "@/components/home/AnimatedMetric";
import styles from "./HomeSections.module.css";

const steps = [
  {
    title: "Discover",
    body: "We clarify the role, market, and what great looks like for your team.",
  },
  {
    title: "Match",
    body: "AIONEX shortlists privately — permanent, contract, campus, or leadership.",
  },
  {
    title: "Place",
    body: "Interviews, offers, and handoff — with compliance support when you need it.",
  },
];

const apart = [
  {
    title: "End-to-end workforce",
    body: "From sourcing and onboarding to payroll and employee administration.",
  },
  {
    title: "Compliance-led",
    body: "PF, ESI, professional tax, and labour requirements handled with care.",
  },
  {
    title: "Flexible staffing",
    body: "Scale contract or permanent capacity as projects and seasons change.",
  },
  {
    title: "Pan-India delivery",
    body: "India-based support across industries — so ops stay close to your sites.",
  },
];

const roles = [
  { label: "IT & Software", href: "/jobs" },
  { label: "Engineering", href: "/jobs?department=engineering" },
  { label: "Manufacturing", href: "/jobs" },
  { label: "BFSI", href: "/jobs" },
  { label: "Pharma & Lifesciences", href: "/jobs" },
  { label: "Sales & BD", href: "/jobs?department=sales" },
  { label: "HR & Admin", href: "/jobs?department=operations" },
  { label: "Freshers", href: "/jobs" },
  { label: "Leadership", href: "/jobs?department=leadership" },
];

/** Placeholder voice — swap for client-approved quotes later. Attribution: title + company only. */
const testimonials = [
  {
    kind: "employer" as const,
    quote:
      "AIONEX sent three people. We hired one in week five — and the shortlist actually matched the brief.",
    title: "VP of Engineering",
    company: "HelioStack",
  },
  {
    kind: "placed" as const,
    quote:
      "They prepped me for the interview like a coach, not a form. I landed a role that actually fits how I work.",
    title: "Senior Software Engineer",
    company: "HelioStack",
  },
  {
    kind: "employer" as const,
    quote:
      "Clear intake, quiet process, no resume spam. We filled a senior product role without burning the team’s calendar.",
    title: "Head of Product",
    company: "Northline Systems",
  },
  {
    kind: "placed" as const,
    quote:
      "No endless applications into a void. One clear process, honest feedback, and an offer I was proud to take.",
    title: "Product Manager",
    company: "Northline Systems",
  },
  {
    kind: "employer" as const,
    quote:
      "They understood what ‘good’ looked like for our ops hire. Offer accepted in under a month.",
    title: "Director of Operations",
    company: "Meridian Forge",
  },
  {
    kind: "placed" as const,
    quote:
      "AIONEX matched me to a team that valued ops craft. Onboarding felt intentional from day one.",
    title: "Operations Lead",
    company: "Meridian Forge",
  },
  {
    kind: "employer" as const,
    quote:
      "We needed a design lead who could ship, not just present. The shortlist was sharp and interview-ready.",
    title: "Design Director",
    company: "Cove & Pine",
  },
  {
    kind: "placed" as const,
    quote:
      "They advocated for my level and scope — not just ‘any design seat.’ The role has real ownership.",
    title: "Product Designer",
    company: "Cove & Pine",
  },
  {
    kind: "employer" as const,
    quote:
      "First agency that treated our hiring bar as a brief, not a keyword hunt. Closed a sales lead role cleanly.",
    title: "Head of Revenue",
    company: "Atlas Thread",
  },
  {
    kind: "placed" as const,
    quote:
      "Transparent about timeline and expectations. I walked into interviews knowing exactly what success looked like.",
    title: "Enterprise Account Executive",
    company: "Atlas Thread",
  },
  {
    kind: "employer" as const,
    quote:
      "Communication stayed tight. No ghosting, no volume dump — just candidates we could actually debate.",
    title: "Engineering Manager",
    company: "Kiln Digital",
  },
  {
    kind: "placed" as const,
    quote:
      "After months of noise elsewhere, this felt human. Placed into a stack I already loved — and stayed.",
    title: "Full-Stack Engineer",
    company: "Kiln Digital",
  },
];

/** Boutique-agency scale — specific, modest, grounded (swap for client-real figures later). */
const outcomes = [
  {
    value: 140,
    suffix: "+",
    label: "Placements closed",
    detail: "Full-time hires across eng, product, and ops",
  },
  {
    value: 28,
    suffix: " days",
    label: "Median time-to-offer",
    detail: "From brief approved to accepted offer",
  },
  {
    value: 91,
    suffix: "%",
    label: "Offer acceptance",
    detail: "Candidates we introduce who receive an offer",
  },
  {
    value: 86,
    suffix: "%",
    label: "Still in role at 12 months",
    detail: "Retention check across completed searches",
  },
];

export function HomeSections() {
  return (
    <>
      <section className={`${styles.archSection} ${styles.outcomes}`} aria-labelledby="outcomes-heading">
        <div className={`${styles.archGrid} ${styles.archGridMediaLeft}`}>
          <div className={`${styles.archMedia} ${styles.archMediaLeft}`} aria-hidden>
            <div className={styles.archFrame}>
              <span className={styles.archMeta}>01 / Elevation · Outcomes</span>
              <video
                className={styles.archVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src="/media/outcomes.mp4" type="video/mp4" />
              </video>
              <div className={styles.archGuides}>
                <span />
                <span />
                <span />
                <span />
              </div>
              <span className={styles.archCorner} data-pos="tl" />
              <span className={styles.archCorner} data-pos="tr" />
              <span className={styles.archCorner} data-pos="bl" />
              <span className={styles.archCorner} data-pos="br" />
            </div>
          </div>

          <div className={styles.archCopy}>
            <div className={styles.archCopyInner}>
              <div className={styles.outcomesIntro}>
                <p className="eyebrow">Outcomes</p>
                <h2 id="outcomes-heading" className={styles.sectionTitle}>
                  Happy recruiting, measured quietly.
                </h2>
                <p className={styles.outcomesLead}>
                  Trailing 24 months across retained searches. Not marketplace volume — searches we
                  ran end to end with hiring managers.
                </p>
              </div>

              <OutcomesMetrics items={outcomes} />
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.archSection} ${styles.process}`} aria-labelledby="process-heading">
        <div className={`${styles.archGrid} ${styles.archGridMediaRight}`}>
          <div className={styles.archCopy}>
            <div className={styles.archCopyInner}>
              <p className="eyebrow">How we work</p>
              <h2 id="process-heading" className={styles.sectionTitle}>
                Agency-led. Outcome-focused.
              </h2>
              <ol className={`${styles.steps} ${styles.archSteps}`}>
                {steps.map((step, index) => (
                  <li key={step.title}>
                    <span className={styles.stepIndex}>0{index + 1}</span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className={`${styles.archMedia} ${styles.archMediaRight}`} aria-hidden>
            <div className={styles.archFrame}>
              <span className={styles.archMeta}>02 / Section · Process</span>
              <video
                className={styles.archVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src="/media/process.mp4" type="video/mp4" />
              </video>
              <div className={styles.archGuides}>
                <span />
                <span />
                <span />
                <span />
              </div>
              <span className={styles.archCorner} data-pos="tl" />
              <span className={styles.archCorner} data-pos="tr" />
              <span className={styles.archCorner} data-pos="bl" />
              <span className={styles.archCorner} data-pos="br" />
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.testimonials}`} aria-labelledby="testimonials-heading">
        <div className="container">
          <p className="eyebrow">Voices</p>
          <h2 id="testimonials-heading" className={styles.sectionTitle}>
            Hiring managers and people we placed.
          </h2>
        </div>

        <div className={styles.marquee} role="region" aria-label="Client and placed talent testimonials">
          <div className={styles.marqueeTrack}>
            {[...testimonials, ...testimonials].map((item, index) => (
              <blockquote
                key={`${item.kind}-${item.company}-${item.title}-${index}`}
                className={styles.marqueeItem}
                aria-hidden={index >= testimonials.length}
              >
                <span className={styles.testimonialKind}>
                  {item.kind === "placed" ? "Placed talent" : "Hiring manager"}
                </span>
                <p>“{item.quote}”</p>
                <footer>
                  <span className={styles.testimonialTitle}>{item.title}</span>
                  <span className={styles.testimonialCompany}>{item.company}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.apart}`} aria-labelledby="apart-heading">
        <div className="container">
          <p className="eyebrow">What sets us apart</p>
          <h2 id="apart-heading" className={styles.sectionTitle}>
            Precision operations. Steady growth.
          </h2>
          <p className={styles.apartLead}>
            Focus on your core business while we support hiring, contract staffing, and statutory
            workforce administration.
          </p>
          <ul className={styles.apartList}>
            {apart.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
          <Link href="/services" className="btn btn-dark" style={{ marginTop: "1.5rem" }}>
            View all services
          </Link>
        </div>
      </section>

      <section className={`section ${styles.roles}`}>
        <div className="container">
          <p className="eyebrow">Talent we place</p>
          <h2 className={styles.sectionTitle}>Expertise across disciplines.</h2>
          <div className={styles.chips}>
            {roles.map((role) => (
              <Link key={role.label} href={role.href}>
                {role.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.split}`}>
        <div className={`container ${styles.splitGrid}`}>
          <article className={styles.panel}>
            <p className="eyebrow">For candidates</p>
            <h3>Browse open roles. Apply with your resume.</h3>
            <p>Search current openings and send your profile directly to the AIONEX team.</p>
            <Link href="/jobs" className="btn btn-dark">
              View open roles
            </Link>
          </article>
          <article className={`${styles.panel} ${styles.panelDark}`}>
            <p className="eyebrow">For employers</p>
            <h3>Need talent or workforce support?</h3>
            <p>
              Permanent, contract, RPO, or compliance — tell us what you need. We match offline.
            </p>
            <Link href="/hire" className="btn btn-accent">
              Hire with AIONEX
            </Link>
          </article>
        </div>
      </section>

      <section className={`section ${styles.trust}`}>
        <div className="container">
          <p>Trusted by teams that need precise hiring and compliant workforce support.</p>
        </div>
      </section>
    </>
  );
}
