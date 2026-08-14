import { Suspense } from "react";
import { UnsubscribePanel } from "@/components/forms/UnsubscribePanel";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Unsubscribe",
  description: "Unsubscribe from AIONEX job alerts.",
  path: "/alerts/unsubscribe",
});

export default function UnsubscribePage() {
  return (
    <div className="page page-light">
      <div className="container" style={{ maxWidth: 560 }}>
        <p className="eyebrow">Email preferences</p>
        <h1 className="page-title">Unsubscribe</h1>
        <Suspense fallback={<p>Loading…</p>}>
          <UnsubscribePanel />
        </Suspense>
      </div>
    </div>
  );
}
