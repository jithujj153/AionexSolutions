"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { postJson } from "@/lib/api";

export function AlertForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company_url") || "")) {
      setStatus("success");
      setMessage("Check your inbox to confirm your subscription.");
      form.reset();
      return;
    }
    if (!data.get("consent")) {
      setStatus("error");
      setMessage("Please agree to receive job alerts.");
      return;
    }

    setStatus("loading");
    try {
      const result = await postJson("/aionex/v1/subscribe", {
        email: data.get("email"),
        department: data.get("department"),
        location: data.get("location"),
      });
      setStatus("success");
      setMessage(result.message || "Check your inbox to confirm your subscription.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to subscribe.");
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="hp" aria-hidden>
        <label>
          Company URL
          <input name="company_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div className="field">
        <label htmlFor="department">Preferred department (optional)</label>
        <input id="department" name="department" placeholder="engineering, product…" />
      </div>
      <div className="field">
        <label htmlFor="location">Preferred location (optional)</label>
        <input id="location" name="location" />
      </div>
      <label className="field" style={{ gridTemplateColumns: "auto 1fr", alignItems: "center" }}>
        <input name="consent" type="checkbox" required />
        <span>
          I agree to receive job alerts and accept the <Link href="/privacy">Privacy Policy</Link>.
        </span>
      </label>
      <button className="btn btn-accent" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </button>
      {message ? (
        <p className={`form-message ${status === "error" ? "error" : "success"}`}>{message}</p>
      ) : null}
    </form>
  );
}
