import { AlertForm } from "@/components/forms/AlertForm";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Job alerts",
  description: "Get notified when AIONEX posts new open roles.",
  path: "/alerts",
});

export default function AlertsPage() {
  return (
    <div className="page page-light">
      <div className="container" style={{ maxWidth: 640 }}>
        <p className="eyebrow">Stay updated</p>
        <h1 className="page-title">Job alerts</h1>
        <p className="page-lead">
          Subscribe for new open roles. Confirm your email, then unsubscribe anytime from any alert.
        </p>
        <AlertForm />
      </div>
    </div>
  );
}
