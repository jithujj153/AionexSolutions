import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy",
  description: "How AIONEX handles resumes, applications, and career alert data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="page page-light">
      <div className="container" style={{ maxWidth: 760 }}>
        <p className="eyebrow">Legal</p>
        <h1 className="page-title">Privacy Policy</h1>
        <div className="prose" style={{ marginTop: "2rem" }}>
          <p>
            AIONEX collects personal information when you apply for a role, request hiring support,
            subscribe to career alerts, or contact us.
          </p>
          <h2>What we collect</h2>
          <ul>
            <li>Contact details (name, email, phone)</li>
            <li>Resume / CV files and cover notes</li>
            <li>Company and role requirements for hire requests</li>
            <li>Career alert preferences</li>
          </ul>
          <h2>How we use it</h2>
          <p>
            We use this information to evaluate applications, respond to hire requests, send
            consented career alerts, and operate our recruiting service. Applications are reviewed by
            AIONEX Admin/HR staff.
          </p>
          <h2>Sharing</h2>
          <p>
            We do not publish a public candidate directory. Candidate materials may be shared with
            relevant hiring clients only as part of an active engagement.
          </p>
          <h2>Retention</h2>
          <p>
            We retain application and lead data as needed for recruiting operations and legal
            obligations. You may request deletion by contacting us.
          </p>
          <h2>Contact</h2>
          <p>
            Privacy questions: use the <a href="/contact">Contact</a> form, call{" "}
            <a href="tel:+919591469847">+91-9591469847</a>, or email{" "}
            <a href="mailto:Business@aionexoutsourcing.com">Business@aionexoutsourcing.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
