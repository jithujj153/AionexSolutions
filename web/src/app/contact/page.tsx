import Image from "next/image";
import { ContactForm } from "@/components/forms/ContactForm";
import {
  SITE_ADDRESS,
  SITE_EMAIL,
  SITE_EMAIL_HREF,
  SITE_PHONE,
  SITE_PHONE_HREF,
} from "@/lib/contact";
import { pageMeta } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = pageMeta({
  title: "Contact us",
  description:
    "Reach AIONEX for a personalized conversation — call, email, or send a message from Bengaluru.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className={`page page-light ${styles.page}`}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <p className={`eyebrow ${styles.eyebrowRow}`}>
            <TalkIcon />
            Let’s talk
          </p>
          <h1 className={styles.title}>Unlock possibilities and shape success</h1>
          <p className={styles.lead}>
            Reach out to us for a personalized conversation. Your goals, our priority — let’s start
            the journey together.
          </p>

          <div className={styles.photo}>
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80"
              alt="AIONEX team collaborating around a table"
              fill
              sizes="(max-width: 960px) 100vw, 50vw"
              className={styles.photoImage}
            />
          </div>

          <div className={styles.address}>
            <h2>Address</h2>
            <ul>
              <li>
                <PinIcon />
                <span>{SITE_ADDRESS}</span>
              </li>
              <li>
                <PhoneIcon />
                <a href={SITE_PHONE_HREF}>Call: {SITE_PHONE}</a>
              </li>
              <li>
                <MailIcon />
                <a href={SITE_EMAIL_HREF}>{SITE_EMAIL}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.formCol}>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

function TalkIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 4.75h12A1.25 1.25 0 0 1 19.25 6v9.5A1.25 1.25 0 0 1 18 16.75H9.2L5.75 20v-3.25H6A1.25 1.25 0 0 1 4.75 15.5V6A1.25 1.25 0 0 1 6 4.75Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M8 9h8M8 12.25h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s6.5-5.2 6.5-11A6.5 6.5 0 0 0 5.5 10c0 5.8 6.5 11 6.5 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="10" r="2.1" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7.2 3.75h2.4l1.2 3.2-1.6 1.2a12.5 12.5 0 0 0 5.65 5.65l1.2-1.6 3.2 1.2v2.4c0 .9-.75 1.7-1.65 1.85C9.4 18.9 5.1 14.6 4.35 6.4 4.2 5.5 5 4.75 5.9 4.75H7.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.75" y="5.75" width="16.5" height="12.5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4.5 7.5 7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
