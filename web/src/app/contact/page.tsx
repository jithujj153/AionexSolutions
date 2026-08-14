import { ContactForm } from "@/components/forms/ContactForm";
import { SITE_EMAIL, SITE_EMAIL_HREF, SITE_PHONE, SITE_PHONE_HREF } from "@/lib/contact";
import { pageMeta } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = pageMeta({
  title: "Contact",
  description: "Contact AIONEX — call or email Business@aionexoutsourcing.com.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="page page-light">
      <div className="container" style={{ maxWidth: 640 }}>
        <p className="eyebrow">Contact</p>
        <h1 className="page-title">Get in touch</h1>
        <p className="page-lead">
          For hiring needs, use the <a href="/hire">Hire</a> form. Or reach us directly:
        </p>

        <ul className={styles.direct}>
          <li>
            <span>Call</span>
            <a href={SITE_PHONE_HREF}>{SITE_PHONE}</a>
          </li>
          <li>
            <span>Email</span>
            <a href={SITE_EMAIL_HREF}>{SITE_EMAIL}</a>
          </li>
        </ul>

        <p className={styles.or}>Or send a message</p>
        <ContactForm />
      </div>
    </div>
  );
}
