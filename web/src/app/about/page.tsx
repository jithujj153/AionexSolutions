import Link from "next/link";
import { OutcomesMetrics } from "@/components/home/AnimatedMetric";
import { SITE_EMAIL, SITE_EMAIL_HREF, SITE_PHONE, SITE_PHONE_HREF } from "@/lib/contact";
import { pageMeta } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = pageMeta({
  title: "About",
  description:
    "About AIONEX Outsourcing — recruiting, contract staffing, RPO, and statutory compliance with people, process, and technology.",
  path: "/about",
});

const outcomes = [
  {
    value: 140,
    suffix: "+",
    label: "Placements closed",
    detail: "Permanent and contract hires across industries",
  },
  {
    value: 91,
    suffix: "%",
    label: "Offer acceptance",
    detail: "Candidates we introduce who receive an offer",
  },
  {
    value: 35,
    suffix: "+",
    label: "Hiring partners",
    detail: "Teams we support across India",
  },
];

const audiences = [
  {
    title: "Growing companies",
    body: "Teams that need permanent, campus, or leadership hiring without marketplace noise.",
  },
  {
    title: "Operations-led employers",
    body: "Organizations that want contract staffing, payroll support, and statutory compliance handled cleanly.",
  },
  {
    title: "Candidates with intent",
    body: "Professionals who want clear career openings and a direct path to the AIONEX team.",
  },
];

const process = [
  {
    step: "01",
    title: "Brief",
    body: "We lock scope, seniority, must-haves, and what “great” looks like with the hiring manager.",
  },
  {
    step: "02",
    title: "Search",
    body: "Active sourcing plus open-role applications. Shortlists stay private to AIONEX and the client.",
  },
  {
    step: "03",
    title: "Interview",
    body: "We coordinate loops, calibrate feedback quickly, and keep both sides informed.",
  },
  {
    step: "04",
    title: "Close",
    body: "Offer support, notice-period planning, and a clean handoff — with compliance help when needed.",
  },
];

const values = [
  {
    title: "People & process",
    body: "Domain-aware recruiters and clear workflows — not resume dumps.",
  },
  {
    title: "Compliance care",
    body: "Workforce administration and statutory support so growth stays audit-ready.",
  },
  {
    title: "Clear communication",
    body: "Hiring managers get status they can act on. Candidates get honest timelines.",
  },
  {
    title: "Flexible models",
    body: "Permanent, contract, RPO, or campus — sized to how you actually hire.",
  },
];

const focus = [
  "IT & Software",
  "Engineering",
  "Manufacturing",
  "BFSI",
  "Pharma",
  "Sales",
  "Freshers",
  "Leadership",
];

const pillars = [
  {
    title: "Our Vision",
    icon: "vision" as const,
    body: "At AIONEX, we envision becoming the top-ranked resource for quality manpower in HR solutions and business outsourcing. We are driven by innovation, aiming to provide cutting-edge solutions that redefine success for our clients and candidates alike.",
  },
  {
    title: "Our Mission",
    icon: "mission" as const,
    body: "Our mission at AIONEX is to consistently deliver superior and proficient dedication to the highest quality of client service. With warmth, friendliness, and individual pride, we strive to provide consistently superior HR solutions that bring delight to our clients and candidates.",
  },
  {
    title: "Our Culture",
    icon: "culture" as const,
    body: "At AIONEX, our culture is built on collaboration, integrity, and a shared commitment to success. We foster an environment where every team member is valued, ideas are celebrated, and innovation thrives. Together, we create a culture that goes beyond business — a community where individuals and ideas flourish.",
  },
];

function PillarIcon({ name }: { name: "vision" | "mission" | "culture" }) {
  if (name === "vision") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "mission") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 21V4.5h9.2l-.6 3.2 1.1.4L20 5.8v7.4l-5.3-2.3-1.1.4.6 3.2H5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path d="M5 21V4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="16" cy="9" r="2.1" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M3.8 18.5c.6-2.6 2.6-4 5.2-4s4.6 1.4 5.2 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M13.2 18.2c.5-1.9 1.9-3 3.8-3 1.5 0 2.7.7 3.4 1.9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <div className={`page page-light ${styles.about}`}>
      <section className={styles.hero}>
        <div className="container">
          <p className="eyebrow">About AIONEX</p>
          <h1 className="page-title">People, process, and compliance — for growth.</h1>
          <p className={styles.lead}>
            Aionex Outsourcing Services combines recruiting expertise with workforce and statutory
            support. We help clients build flexible, compliant teams so they can focus on core
            business and long-term growth.
          </p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="pillars-heading">
        <div className="container">
          <p className="eyebrow">Who we are</p>
          <h2 id="pillars-heading" className={styles.h2}>
            Vision, mission, and culture.
          </h2>
          <ol className={styles.pillars}>
            {pillars.map((item, index) => (
              <li key={item.title}>
                <div className={styles.pillarHead}>
                  <span className={styles.pillarIcon} aria-hidden>
                    <PillarIcon name={item.icon} />
                  </span>
                  <div>
                    <span className={styles.pillarIndex}>{`0${index + 1}`}</span>
                    <h3>{item.title}</h3>
                  </div>
                </div>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className="container">
          <p className="eyebrow">By the numbers</p>
          <h2 className={styles.h2}>Outcomes we work toward.</h2>
          <p className={styles.sectionLead}>
            Trailing 24 months across retained searches and placements we ran end to end.
          </p>
          <OutcomesMetrics items={outcomes} />
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <p className="eyebrow">Who we serve</p>
          <h2 className={styles.h2}>Hiring and workforce partners.</h2>
          <div className={styles.cardGrid}>
            {audiences.map((item) => (
              <article key={item.title} className={styles.card}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className="container">
          <p className="eyebrow">How we work</p>
          <h2 className={styles.h2}>A clear path from brief to start date.</h2>
          <ol className={styles.process}>
            {process.map((item) => (
              <li key={item.step}>
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <p className="eyebrow">What we value</p>
          <h2 className={styles.h2}>How we show up.</h2>
          <div className={styles.values}>
            {values.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className="container">
          <p className="eyebrow">Focus areas</p>
          <h2 className={styles.h2}>Talent we place most often.</h2>
          <div className={styles.chips}>
            {focus.map((item) => (
              <Link key={item} href="/jobs">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaBand}>
        <div className={`container ${styles.ctaInner}`}>
          <div>
            <p className="eyebrow">Work with AIONEX</p>
            <h2 className={styles.h2}>Ready to hire — or ready for your next role?</h2>
            <p className={styles.sectionLead}>
              Employers: tell us what you need. Candidates: browse careers and apply with your
              resume.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/hire" className="btn btn-accent">
                Hire talent
              </Link>
              <Link href="/jobs" className="btn btn-dark">
                Browse careers
              </Link>
            </div>
          </div>
          <aside className={styles.contactCard}>
            <h3>Talk to the team</h3>
            <p>
              <span>Call</span>
              <a href={SITE_PHONE_HREF}>{SITE_PHONE}</a>
            </p>
            <p>
              <span>Email</span>
              <a href={SITE_EMAIL_HREF}>{SITE_EMAIL}</a>
            </p>
            <Link href="/contact" className={styles.contactLink}>
              Contact form →
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}
