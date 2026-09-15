import Image from "next/image";
import Link from "next/link";
import { OutcomesMetrics } from "@/components/home/AnimatedMetric";
import { outcomes, outcomesHeading, outcomesLead } from "@/lib/outcomes";
import styles from "./HomeSections.module.css";

const workPillars = [
  {
    title: "What we do?",
    body: "We specialize in delivering tailored HR solutions, from executive searches to contract hiring and payroll outsourcing. At AIONEX, we’re not just recruiters; we’re architects of career growth.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Team collaborating over laptops and documents",
  },
  {
    title: "How we can help?",
    body: "We help businesses thrive by connecting them with exceptional talent. Our comprehensive services ensure that your workforce aligns seamlessly with your strategic goals, fostering success at every level.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Modern office building against a clear sky",
  },
  {
    title: "Why partner with us?",
    body: "Partnering with AIONEX means unlocking a world of unparalleled expertise and reliability. We’re your strategic ally, committed to delivering top-notch services that propel your business forward with confidence.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&h=900&q=80",
    imageAlt: "Handshake closing a business agreement",
  },
] as const;

const whyChoose = [
  {
    title: "Experience",
    body: "10+ years of delivering the best services.",
  },
  {
    title: "Trust",
    body: "Trusted by 138+ clients for 8500+ placements.",
  },
  {
    title: "Innovation",
    body: "Innovative packages and specialized services.",
  },
  {
    title: "Reliability",
    body: "Recognized in a short span for our reliable services.",
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
                  {outcomesHeading}
                </h2>
                <p className={styles.outcomesLead}>{outcomesLead}</p>
              </div>

              <OutcomesMetrics items={outcomes} />
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.archSection} ${styles.process}`} aria-labelledby="process-heading">
        <div className={`container ${styles.processInner}`}>
          <div className={styles.processHead}>
            <div>
              <p className="eyebrow">How we work</p>
              <h2 id="process-heading" className={styles.processTitle}>
                Discover AIONEX: Architects of Success
              </h2>
            </div>
            <div className={styles.processIntro}>
              <p>
                At AIONEX, we craft success stories through innovative HR solutions. Explore our
                journey and discover how we’re redefining the future of manpower recruitment and
                outsourcing consultancy.
              </p>
              <Link href="/about" className="btn btn-dark">
                Read more
              </Link>
            </div>
          </div>

          <div className={styles.processGrid}>
            {workPillars.map((item) => (
              <article key={item.title} className={styles.processCard}>
                <div className={styles.processCardMedia}>
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 860px) 100vw, 33vw"
                    className={styles.processCardImage}
                  />
                </div>
                <div className={styles.processCardBody}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.whyChoose}`} aria-labelledby="why-choose-heading">
        <div className={styles.whyChooseBg} aria-hidden>
          <Image
            src="/media/why-choose-globe.png"
            alt=""
            fill
            sizes="100vw"
            className={styles.whyChooseBgImage}
          />
        </div>
        <div className={`container ${styles.whyChooseInner}`}>
          <p className="eyebrow">Why choose AIONEX</p>
          <h2 id="why-choose-heading" className={styles.whyChooseTitle}>
            Enriching Work-Life, Reducing Attrition
          </h2>
          <ul className={styles.whyChooseGrid}>
            {whyChoose.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
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
            <h3>Browse careers. Apply with your resume.</h3>
            <p>Search current openings and send your profile directly to the AIONEX team.</p>
            <Link href="/jobs" className="btn btn-dark">
              View careers
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
