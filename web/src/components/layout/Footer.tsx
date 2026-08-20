import Link from "next/link";
import { AionexMark } from "@/components/brand/AionexMark";
import { SITE_EMAIL, SITE_EMAIL_HREF, SITE_PHONE, SITE_PHONE_HREF } from "@/lib/contact";
import styles from "./Footer.module.css";

const explore = [
  { href: "/jobs", label: "Career" },
  { href: "/services", label: "Services & products" },
  { href: "/alerts", label: "Career alerts" },
  { href: "/about", label: "About AIONEX" },
  { href: "/privacy", label: "Privacy" },
];

const employers = [
  { href: "/hire", label: "Hire talent" },
  { href: "/contact", label: "Contact us" },
  { href: "/about", label: "How we work" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden />
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brand} aria-label="AIONEX home">
              <AionexMark className={styles.mark} />
              <span>AIONEX</span>
            </Link>
            <p className={styles.tagline}>
              Agency-led recruiting for career openings and hard-to-find talent — private, curated
              matching.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/jobs" className="btn btn-ghost">
                Browse careers
              </Link>
              <Link href="/hire" className="btn btn-accent">
                Hire talent
              </Link>
            </div>
          </div>

          <div className={styles.columns}>
            <nav className={styles.col} aria-label="Explore">
              <h2>Explore</h2>
              <ul>
                {explore.map((item) => (
                  <li key={item.href + item.label}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className={styles.col} aria-label="Employers">
              <h2>Employers</h2>
              <ul>
                {employers.map((item) => (
                  <li key={item.href + item.label}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.col}>
              <h2>Contact</h2>
              <ul className={styles.contactList}>
                <li>
                  <span>Call</span>
                  <a href={SITE_PHONE_HREF}>{SITE_PHONE}</a>
                </li>
                <li>
                  <span>Email</span>
                  <a href={SITE_EMAIL_HREF}>{SITE_EMAIL}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} AIONEX. All rights reserved.</p>
          <p className={styles.note}>People who move companies forward.</p>
        </div>
      </div>
    </footer>
  );
}
