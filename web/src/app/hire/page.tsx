import { HireForm } from "@/components/forms/HireForm";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Hire talent",
  description: "Tell AIONEX what roles you need. We match privately — no public candidate search.",
  path: "/hire",
});

export default function HirePage() {
  return (
    <div className="page page-light">
      <div className="container" style={{ maxWidth: 720 }}>
        <p className="eyebrow">For employers</p>
        <h1 className="page-title">Hire with AIONEX</h1>
        <p className="page-lead">
          Matching is done by the agency. There is no public talent directory on this site — tell
          us what you need and our team will follow up.
        </p>
        <HireForm />
      </div>
    </div>
  );
}
