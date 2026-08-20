"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { postJson } from "@/lib/api";

export function UnsubscribePanel() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    token ? "idle" : "error",
  );
  const [message, setMessage] = useState(
    token ? "" : "Missing unsubscribe token. Use the link from your email.",
  );

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!token) return;
    setStatus("loading");
    try {
      const result = await postJson("/aionex/v1/unsubscribe", { token });
      setStatus("success");
      setMessage(result.message || "You have been unsubscribed.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to unsubscribe.");
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <p className="page-lead" style={{ marginTop: 0 }}>
        Stop receiving AIONEX career alerts for this email.
      </p>
      <button className="btn btn-dark" type="submit" disabled={!token || status === "loading"}>
        {status === "loading" ? "Updating…" : "Unsubscribe"}
      </button>
      {message ? (
        <p className={`form-message ${status === "error" ? "error" : "success"}`}>{message}</p>
      ) : null}
    </form>
  );
}
