import Image from "next/image";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { ourServices } from "@/lib/services";
import styles from "./page.module.css";

export const metadata = pageMeta({
  title: "Services & Products",
  description:
    "AIONEX services — campus placement, permanent and executive hiring, contract staffing, RPO, statutory compliance, and industry practices.",
  path: "/services",
});

const industries = [
  "Aerospace & Defense",
  "Automobile & Auto Components",
  "Consumer Durables & Building Materials",
  "Education",
  "Electrical & Electronics",
  "Financial Services",
  "FMCG",
  "Healthcare",
  "Industrial",
  "Internet",
  "Logistics",
  "Media & Entertainment",
  "Outsourcing & Offshoring",
  "Pharma, Lifesciences, Medical Devices & Diagnostics",
  "Real Estate",
  "Retail",
  "Services",
  "Technology",
  "Telecom",
];

const talentCategories = [
  "IT & Software",
  "Non-IT",
  "Engineering",
  "Manufacturing",
  "Banking & Financial Services",
  "Pharmaceuticals",
  "Oil & Gas",
  "Architecture",
  "BPO & Customer Support",
  "Freshers & Graduates",
  "Media & Entertainment",
  "Sales & Business Development",
  "HR & Administration",
  "Finance & Accounts",
  "Supply Chain & Logistics",
];

const products = [
  {
    id: "factory-erp",
    title: "Factory end-to-end automation ERP",
    summary:
      "A unified ERP layer for plant operations — from planning and inventory through production, quality, and dispatch.",
  },
  {
    id: "fuel-pump-erp",
    title: "Fuel pump ERP",
    summary:
      "Purpose-built ERP for fuel pump and petroleum retail — sales, stock, shifts, and reconciliation.",
  },
  {
    id: "custom-software",
    title: "Custom software solutions",
    summary:
      "Bespoke applications and integrations when a product box doesn’t fit — web, internal tools, and system connections.",
  },
];

export default function ServicesPage() {
  return (
    <div className={`page page-light ${styles.services}`}>
      <section className={`container ${styles.hero}`}>
        <p className="eyebrow">Services &amp; products</p>
        <h1 className={styles.title}>Our services. Your industries.</h1>
        <p className={styles.lead}>
          Campus-to-leadership hiring, contract staffing, RPO, and statutory compliance — with
          practice depth across the industries you operate in.
        </p>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="services-heading">
        <p className="eyebrow">Our services</p>
        <h2 id="services-heading" className={styles.sectionTitle}>
          How we partner with you.
        </h2>
        <p className={styles.sectionLead}>
          Explore each lane — hover Services in the menu, or open a card below.
        </p>

        <div className={styles.cardGrid}>
          {ourServices.map((item) => (
            <article key={item.id} id={item.id} className={styles.card}>
              <div className={styles.cardMedia}>
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 860px) 100vw, 50vw"
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.cardBody}>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                {item.points ? (
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                ) : null}
                <Link href="/hire" className={styles.cardCta}>
                  Talk to us →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="talent-heading">
        <p className="eyebrow">Talent categories</p>
        <h2 id="talent-heading" className={styles.sectionTitle}>
          Expertise across disciplines.
        </h2>
        <ul className={styles.chipRow} aria-label="Talent categories">
          {talentCategories.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="industries-heading">
        <p className="eyebrow">Industry practices</p>
        <h2 id="industries-heading" className={styles.sectionTitle}>
          Where we hire.
        </h2>
        <p className={styles.sectionLead}>
          Domain-aware recruiting across manufacturing, services, technology, and regulated sectors.
        </p>
        <ul className={styles.industryGrid} aria-label="Industry practices">
          {industries.map((name) => (
            <li key={name} className={styles.industryItem}>
              {name}
            </li>
          ))}
        </ul>
      </section>

      <section className={`container ${styles.section}`} aria-labelledby="products-heading">
        <p className="eyebrow">Products &amp; software</p>
        <h2 id="products-heading" className={styles.sectionTitle}>
          ERP and custom build.
        </h2>
        <ol className={styles.list} aria-label="Products">
          {products.map((item, index) => {
            const n = index + 1;
            return (
              <li key={item.id} id={item.id} className={styles.item}>
                <span className={styles.index}>{`0${n}`}</span>
                <div className={styles.body}>
                  <h3>{item.title}</h3>
                  <p className={styles.summary}>{item.summary}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className={styles.ctaBand}>
        <div className="container">
          <p className="eyebrow">Next step</p>
          <h2 className={styles.ctaTitle}>Tell us what you need.</h2>
          <p className={styles.ctaLead}>
            Campus drive, leadership seat, RPO, contract staffing, or compliance — start with a
            short note.
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
