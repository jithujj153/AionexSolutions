import Link from "next/link";
import { ExpertForm } from "@/components/forms/ExpertForm";
import { pageMeta } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = pageMeta({
  title: "Permanent Recruitment",
  description:
    "Permanent staffing with AIONEX — screened, qualified candidates across industries, with a transparent process and fast turnaround.",
  path: "/services/permanent-recruitment",
});

const benefits = [
  {
    title: "Industry-Centric Expertise",
    body: "Benefit from our recruiters’ deep industry knowledge, ensuring access to candidates tailored to your specific industry needs.",
  },
  {
    title: "Transparent Recruitment Process",
    body: "Our 100% transparent recruitment process prioritizes clarity and efficiency, ensuring you receive the best candidates promptly.",
  },
  {
    title: "Innovative Talent Sourcing",
    body: "AIONEX employs a unique recruitment procedure, leveraging our database, network, and modern methodologies like social media and referrals to connect with the most qualified candidates.",
  },
  {
    title: "Distinctive Approach to Staffing",
    body: "AIONEX stands out as a leading staffing agency in Bengaluru, thanks to our distinctive recruitment process, connecting clients with the industry’s best talent.",
  },
];

export default function PermanentRecruitmentPage() {
  return (
    <div className={`page page-light ${styles.page}`}>
      <section className={`container ${styles.hero}`}>
        <div className={styles.copy}>
          <p className="eyebrow">Permanent Recruitment</p>
          <h1 className={styles.title}>Tailored Talent Solutions</h1>
          <p className={styles.lead}>
            Experience seamless permanent staffing solutions with AIONEX. Our dedicated recruiters,
            transparent processes, and innovative methodologies ensure your company secures the
            best-matched candidates promptly. Elevate your workforce with AIONEX’s distinctive
            approach to permanent recruitment.
          </p>
        </div>
        <div className={styles.formCol}>
          <ExpertForm topic="Permanent Recruitment" />
        </div>
      </section>

      <section className={`container ${styles.story}`} aria-labelledby="approach-heading">
        <div className={styles.storyCopy}>
          <h2 id="approach-heading" className={styles.sectionTitle}>
            Fully screened. Ready to join.
          </h2>
          <p>
            AIONEX’s Permanent Recruitment service opens the door to a pool of fully screened and
            qualified candidates across various industries. Our seasoned team of recruiters, each
            with industry expertise, commits to helping your company achieve its business
            objectives. Our recruitment process is a testament to transparency, guaranteeing the
            delivery of the finest candidates at any organizational level, with unparalleled
            turnaround time.
          </p>
        </div>
      </section>

      <section className={styles.benefits} aria-labelledby="benefits-heading">
        <div className="container">
          <p className="eyebrow">Benefits</p>
          <h2 id="benefits-heading" className={styles.sectionTitle}>
            Discover the AIONEX difference
          </h2>
          <p className={styles.benefitsLead}>
            Elevate your workforce with AIONEX’s Tailored Talent Solutions — where every
            recruitment is a strategic investment in your company’s success.
          </p>
          <ul className={styles.benefitGrid}>
            {benefits.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
          <Link href="/contact" className="btn btn-dark">
            Talk to us
          </Link>
        </div>
      </section>
    </div>
  );
}
