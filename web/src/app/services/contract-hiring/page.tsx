import Image from "next/image";
import Link from "next/link";
import { ExpertForm } from "@/components/forms/ExpertForm";
import { pageMeta } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = pageMeta({
  title: "Contract Hiring",
  description:
    "Contract staffing with AIONEX — flexible temporary workforce for short projects and longer assignments, without permanent headcount.",
  path: "/services/contract-hiring",
});

const benefits = [
  {
    title: "Understanding Your Business",
    body: "AIONEX begins by understanding your business intricately — its objectives, culture, and background. We delve into the specifics of the roles you’re looking to fill, ensuring a comprehensive understanding of your staffing needs.",
  },
  {
    title: "Flexible Work Arrangements",
    body: "Contract staffing, once commonplace in certain roles, is now expanding across both white and blue-collar jobs. This model offers businesses the flexibility to find talent for short projects while empowering skilled professionals to carve a distinct career path across various companies.",
  },
  {
    title: "Strategic Workforce Planning",
    body: "Our strategic approach to contract staffing ensures that your workforce aligns with your business objectives, offering the agility to adapt to short-term projects or evolving organizational needs.",
  },
];

export default function ContractHiringPage() {
  return (
    <div className={`page page-light ${styles.page}`}>
      <section className={`container ${styles.hero}`}>
        <div className={styles.copy}>
          <p className="eyebrow">Contract Hiring</p>
          <h1 className={styles.title}>Flexible Workforce Solutions</h1>
          <p className={styles.lead}>
            Explore the flexibility of talent with AIONEX’s Contract Staffing Recruitment. From short
            projects to long-term goals, our strategic approach ensures seamless and temporary
            workforce solutions, benefiting both businesses and skilled professionals.
          </p>
        </div>
        <div className={styles.formCol}>
          <ExpertForm topic="Contract Hiring" />
        </div>
      </section>

      <section className={`container ${styles.story}`} aria-labelledby="approach-heading">
        <div className={styles.storyCopy}>
          <h2 id="approach-heading" className={styles.sectionTitle}>
            Hire for the project.
          </h2>
          <p>
            AIONEX’s Contract Staffing Recruitment offers a dynamic approach to workforce solutions,
            providing businesses the flexibility to hire employees on a temporary basis. Contracted
            employees bring their skills to the client’s site for a specified period, often
            project-based.
          </p>
        </div>
        <div className={styles.storyMedia}>
          <Image
            src="/media/contract-hiring-process.png"
            alt="AIONEX recruitment services process: acquisition, briefing, research, mapping, validation, shortlisting, finalists, negotiations, closure, and relationship management"
            fill
            sizes="(max-width: 960px) 100vw, 46vw"
            className={styles.storyImage}
            unoptimized
            priority
          />
        </div>
      </section>

      <section className={styles.benefits} aria-labelledby="benefits-heading">
        <div className="container">
          <p className="eyebrow">Benefits</p>
          <h2 id="benefits-heading" className={styles.sectionTitle}>
            Embark on a tailored process with AIONEX
          </h2>
          <p className={styles.benefitsLead}>
            Discover the advantages of flexible workforce solutions with AIONEX, where temporary
            doesn’t mean compromise but an opportunity for both businesses and employees to thrive.
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
