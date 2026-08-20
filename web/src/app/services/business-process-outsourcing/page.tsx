import Image from "next/image";
import Link from "next/link";
import { ExpertForm } from "@/components/forms/ExpertForm";
import { pageMeta } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = pageMeta({
  title: "Business Process Outsourcing",
  description:
    "Business process outsourcing with AIONEX — efficiency, precision, and cost-effectiveness for non-core work so your team stays on core.",
  path: "/services/business-process-outsourcing",
});

const benefits = [
  {
    title: "Cost Optimization",
    icon: "/media/bpo-icons/001-value-chain.png",
  },
  {
    title: "Efficient Resource Allocation",
    icon: "/media/bpo-icons/002-resource.png",
  },
  {
    title: "Enhanced Operational Precision",
    icon: "/media/bpo-icons/003-enrichment.png",
  },
  {
    title: "Strategic Focus on Core Competencies",
    icon: "/media/bpo-icons/004-target.png",
  },
  {
    title: "Industry-Leading Expertise",
    icon: "/media/bpo-icons/005-rate.png",
  },
  {
    title: "Tailored Solutions for Diverse Business Functions",
    icon: "/media/bpo-icons/006-inclusive.png",
  },
];

export default function BusinessProcessOutsourcingPage() {
  return (
    <div className={`page page-light ${styles.page}`}>
      <section className={`container ${styles.hero}`}>
        <div className={styles.copy}>
          <p className="eyebrow">Business Process Outsourcing</p>
          <h1 className={styles.title}>Strategic Business Process Outsourcing</h1>
          <p className={styles.lead}>
            Optimize your business functions with AIONEX’s Business Process Outsourcing. As industry
            leaders, we bring efficiency, precision, and cost-effectiveness to non-core activities,
            allowing your organization to thrive.
          </p>
        </div>
        <div className={styles.formCol}>
          <ExpertForm topic="Business Process Outsourcing" />
        </div>
      </section>

      <section className={`container ${styles.story}`} aria-labelledby="approach-heading">
        <div className={styles.storyCopy}>
          <h2 id="approach-heading" className={styles.sectionTitle}>
            Focus on core. We’ll run the rest.
          </h2>
          <p>
            Explore the strategic advantages of AIONEX’s Business Process Outsourcing (BPO) service.
            Recognizing the increasing importance of businesses reducing operational costs and
            enhancing focus on core competencies, AIONEX becomes the trusted partner for BPO
            services.
          </p>
          <p>
            AIONEX, with its wealth of experience, offers a dynamic approach to BPO. We bring
            efficiency, precision, and cost-effectiveness to non-core activities, empowering your
            organization to channel resources strategically. Our dedicated BPO team ensures seamless
            operations, allowing your in-house teams to concentrate on mission-critical functions.
          </p>
        </div>
        <div className={styles.storyMedia}>
          <Image
            src="/media/bpo-process.png"
            alt="Business process outsourcing benefits: lower costs, reduced risks, product safety, predictability, quality, consistency, brand protection, and simplified operations"
            fill
            sizes="(max-width: 960px) 100vw, 46vw"
            className={styles.storyImage}
            unoptimized
            priority
          />
        </div>
      </section>

      <section className={styles.benefits} aria-labelledby="benefits-heading">
        <div className={`container ${styles.benefitsInner}`}>
          <h2 id="benefits-heading" className={styles.benefitsTitle}>
            Benefits of choosing AIONEX for Business Process Outsourcing
          </h2>
          <ul className={styles.benefitGrid}>
            {benefits.map((item) => (
              <li key={item.title}>
                <Image
                  src={item.icon}
                  alt=""
                  width={72}
                  height={72}
                  className={styles.benefitIcon}
                />
                <h3>{item.title}</h3>
              </li>
            ))}
          </ul>
          <p className={styles.benefitsLead}>
            Partnering with AIONEX for Business Process Outsourcing translates into streamlined
            operations, reduced costs, and a renewed emphasis on your organization’s core strengths.
            Embrace a future where non-core activities are seamlessly managed, allowing your
            business to thrive and flourish.
          </p>
          <Link href="/contact" className={`btn btn-accent ${styles.cta}`}>
            Talk to us
          </Link>
        </div>
      </section>
    </div>
  );
}
