import Link from "next/link";
import styles from "./Hero.module.css";

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
        <h1 className={`${styles.headline} animate-fade-up delay-1`}>
          Beyond Recruitment: AIONEX
          <br />
          Your Partner in Progress
        </h1>
        <p className={`${styles.support} animate-fade-up delay-2`}>
          At AIONEX, we understand that Talent drives your business strategy, and we make it our
          business to find that Talent.
        </p>
        <div className={`${styles.actions} animate-fade-up delay-3`}>
          <Link href="/jobs" className="btn btn-accent">
            Browse careers
          </Link>
          <Link href="/hire" className="btn btn-ghost">
            Hire talent
          </Link>
        </div>
      </div>
    </section>
  );
}
