import Link from "next/link";
import { AionexMark } from "@/components/brand/AionexMark";
import styles from "./Hero.module.css";

const WORDMARK = "AIONEX";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.media} aria-hidden>
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
        <div className={styles.scrim} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.brandRow}>
          <span className={styles.markWrap} aria-hidden>
            <AionexMark className={styles.mark} />
          </span>
          <span className={styles.wordmark} aria-label="AIONEX">
            {WORDMARK.split("").map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className={styles.letter}
                style={{ animationDelay: `${820 + index * 80}ms` }}
              >
                {letter}
              </span>
            ))}
          </span>
        </div>
        <h1 className={`${styles.headline} animate-fade-up delay-1`}>
          We place people who move companies forward.
        </h1>
        <p className={`${styles.support} animate-fade-up delay-2`}>
          Recruiting, contract staffing, RPO, and compliance — private matching and workforce
          support so you can focus on growth.
        </p>
        <div className={`${styles.actions} animate-fade-up delay-3`}>
          <Link href="/jobs" className="btn btn-accent">
            Browse open roles
          </Link>
          <Link href="/hire" className="btn btn-ghost">
            Hire talent
          </Link>
        </div>
      </div>
    </section>
  );
}
