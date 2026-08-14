import Link from "next/link";
import { OutcomesMetrics } from "@/components/home/AnimatedMetric";
import { SITE_EMAIL, SITE_EMAIL_HREF, SITE_PHONE, SITE_PHONE_HREF } from "@/lib/contact";
import { pageMeta } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = pageMeta({
  title: "About",
  description:
    "About AIONEX — agency-led recruiting for engineering, product, design, operations, and leadership roles.",
  path: "/about",
});

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
    value: 35,
    suffix: "+",
    label: "Hiring partners",
    detail: "Startups to mid-market teams we support",
  },
];

const audiences = [
  {
    title: "Growing product companies",
    body: "Series A–C teams building engineering and product orgs that need people who ship, not resume volume.",
  },
  {
    title: "Specialist functions",
    body: "Design, operations, sales leadership, and niche technical roles where the market is thin and briefs are precise.",
  },
  {
    title: "Candidates with intent",
    body: "Professionals who want clear open roles and a direct path to the AIONEX team — without a public profile marketplace.",
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
    body: "Offer support, notice-period planning, and a clean handoff into onboarding.",
  },
];

const values = [
  {
    title: "Precision over volume",
    body: "Fewer, stronger introductions beat long lists that waste interview time.",
  },
  {
    title: "Candidate privacy",
    body: "No public resume directory. Materials are shared only for active, relevant searches.",
  },
  {
    title: "Clear communication",
    body: "Hiring managers get status they can act on. Candidates get honest timelines.",
  },
  {
    title: "Long-term fit",
    body: "We measure success past the start date — retention at 12 months matters.",
  },
];

const focus = [
  "Engineering",
  "Product",
  "Design",
  "Operations",
  "Sales",
  "Leadership",
];

export default function AboutPage() {
  return (
    <div className={`page page-light ${styles.about}`}>
      <section className={styles.hero}>
        <div className="container">
          <p className="eyebrow">About AIONEX</p>
          <h1 className="page-title">Recruiting without marketplace noise.</h1>
          <p className={styles.lead}>
            AIONEX is an agency-led recruiting partner for teams that need clarity, discretion, and
            well-matched people. We publish open roles for candidates and run private searches for
            employers — matching stays with us.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <p className="eyebrow">By the numbers</p>
          <h2 className={styles.h2}>Outcomes from retained searches.</h2>
          <p className={styles.sectionLead}>
            Trailing 24 months. Boutique volume on purpose — every search owned end to end.
          </p>
          <OutcomesMetrics items={outcomes} />
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className="container">
          <p className="eyebrow">Who we serve</p>
          <h2 className={styles.h2}>Built for focused hiring, not open marketplaces.</h2>
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

      <section className={styles.section}>
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

      <section className={styles.sectionAlt}>
        <div className="container">
          <p className="eyebrow">What we value</p>
          <h2 className={styles.h2}>Standards we hire by.</h2>
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

      <section className={styles.section}>
        <div className="container">
          <p className="eyebrow">Focus areas</p>
          <h2 className={styles.h2}>Roles we search most often.</h2>
          <div className={styles.chips}>
            {focus.map((item) => (
              <Link key={item} href={`/jobs?department=${item.toLowerCase()}`}>
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
              Employers: tell us what you need. Candidates: browse open roles and apply with your
              resume.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/hire" className="btn btn-accent">
                Hire talent
              </Link>
              <Link href="/jobs" className="btn btn-dark">
                Browse open roles
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
