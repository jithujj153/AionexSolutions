import Image from "next/image";
import Link from "next/link";
import { ExpertForm } from "@/components/forms/ExpertForm";
import { pageMeta } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = pageMeta({
  title: "Executive Search",
  description:
    "Executive search excellence with AIONEX in Bengaluru — confidential leadership hiring aligned to vision, culture, and mandate.",
  path: "/services/executive-search",
});

const benefits = [
  {
    title: "Understanding the Landscape",
    body: "We delve deep into the job profiles, ensuring a comprehensive grasp of the executive role requirements.",
  },
  {
    title: "Qualification Alignment",
    body: "Matching qualifications and candidature, we seek candidates whose skills resonate with the role.",
  },
  {
    title: "Strategic Vision Integration",
    body: "We align our search with the company’s vision and mission, ensuring resource acquisition that contributes to overarching goals.",
  },
  {
    title: "Expert-Driven Recruitment",
    body: "AIONEX boasts a team of seasoned professionals, ensuring superior executive recruitment unmatched by other consultancy firms.",
  },
];

export default function ExecutiveSearchPage() {
  return (
    <div className={`page page-light ${styles.page}`}>
      <section className={`container ${styles.hero}`}>
        <div className={styles.copy}>
          <p className="eyebrow">Executive Search</p>
          <h1 className={styles.title}>Executive Search Excellence</h1>
          <p className={styles.lead}>
            Discover unparalleled executive recruitment with AIONEX in Bengaluru. We go beyond
            hiring, crafting career growth for professionals and aligning executives with visionary
            companies. Elevate your leadership team with AIONEX’s expertise.
          </p>
        </div>
        <div className={styles.formCol}>
          <ExpertForm topic="Executive Search" />
        </div>
      </section>

      <section className={`container ${styles.story}`} aria-labelledby="approach-heading">
        <div className={styles.storyCopy}>
          <h2 id="approach-heading" className={styles.sectionTitle}>
            How we search.
          </h2>
          <p>
            AIONEX stands as the pinnacle executive search consultancy in Bengaluru, dedicated to
            transforming organizations and corporate firms through strategic talent acquisition. More
            than just recruitment, we guide job seekers toward sustainable career growth. Our
            executive recruitment and consulting services focus on the higher echelons of companies,
            ensuring alignment with their vision and mission.
          </p>
          <p>
            Our approach is distinguished by understanding job profiles, seeking candidates with
            matching qualifications, and aligning with the company’s strategic goals. What sets
            AIONEX apart is our seasoned team of recruitment professionals, ensuring the recruitment
            of the right executive for the role. We create a network of human resources that adds
            value to the industry and empowers companies to thrive.
          </p>
        </div>
        <div className={styles.storyMedia}>
          <Image
            src="/media/executive-search-process.png"
            alt="AIONEX executive search process: understand need, target search, screen and shortlist, interviews and follow-up"
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
            Explore the executive search journey with AIONEX
          </h2>
          <p className={styles.benefitsLead}>
            Elevate your leadership team. Connect with AIONEX for executive search excellence that
            transcends conventional recruitment approaches.
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
