import Link from "next/link";
import { ExpertForm } from "@/components/forms/ExpertForm";
import type { ProductOffering } from "@/lib/services";
import styles from "./ProductDetail.module.css";

export function ProductDetail({ product }: { product: ProductOffering }) {
  return (
    <div className={`page page-light ${styles.page}`}>
      <section className={`container ${styles.hero}`}>
        <div className={styles.copy}>
          <p className="eyebrow">Products &amp; software</p>
          <h1 className={styles.title}>{product.headline}</h1>
          <p className={styles.lead}>{product.summary}</p>
        </div>
        <div className={styles.formCol}>
          <ExpertForm topic={product.title} />
        </div>
      </section>

      <section className={`container ${styles.story}`} aria-labelledby="approach-heading">
        <div className={styles.storyCopy}>
          <h2 id="approach-heading" className={styles.sectionTitle}>
            {product.storyTitle}
          </h2>
          {product.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className={styles.benefits} aria-labelledby="benefits-heading">
        <div className="container">
          <p className="eyebrow">{product.title}</p>
          <h2 id="benefits-heading" className={styles.sectionTitle}>
            {product.benefitsTitle}
          </h2>
          <p className={styles.benefitsLead}>{product.benefitsLead}</p>
          <ul className={styles.benefitGrid}>
            {product.benefits.map((item) => (
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
