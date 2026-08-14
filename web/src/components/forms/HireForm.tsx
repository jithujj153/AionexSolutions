"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { postJson } from "@/lib/api";

export function HireForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company_url") || "")) {
      setStatus("success");
      setMessage("Our team will contact you.");
      form.reset();
      return;
    }

    setStatus("loading");
    try {
      const result = await postJson("/aionex/v1/hire", {
        company: data.get("company"),
        contact_name: data.get("contact_name"),
        email: data.get("email"),
        phone: data.get("phone"),
        roles_needed: data.get("roles_needed"),
        seniority: data.get("seniority"),
        location: data.get("location"),
        timeline: data.get("timeline"),
        notes: data.get("notes"),
      });
      setStatus("success");
      setMessage(result.message || "Our team will contact you.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send request.");
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
        <label htmlFor="company">Company</label>
        <input id="company" name="company" required />
      </div>
      <div className="field">
        <label htmlFor="contact_name">Contact name</label>
        <input id="contact_name" name="contact_name" required />
      </div>
      <div className="field">
        <label htmlFor="email">Work email</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div className="field">
        <label htmlFor="phone">Phone</label>
        <input id="phone" name="phone" type="tel" />
      </div>
      <div className="field">
        <label htmlFor="roles_needed">Roles needed</label>
        <textarea id="roles_needed" name="roles_needed" required />
      </div>
      <div className="field">
        <label htmlFor="seniority">Seniority</label>
        <input id="seniority" name="seniority" />
      </div>
      <div className="field">
        <label htmlFor="location">Location</label>
        <input id="location" name="location" />
      </div>
      <div className="field">
        <label htmlFor="timeline">Timeline</label>
        <input id="timeline" name="timeline" placeholder="e.g. 30–60 days" />
      </div>
      <div className="field">
        <label htmlFor="notes">Notes</label>
        <textarea id="notes" name="notes" />
      </div>
      <p className="prose">
        We do not publish a candidate directory. Matching is handled by AIONEX. See our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
      <button className="btn btn-accent" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Request talent"}
      </button>
      {message ? (
        <p className={`form-message ${status === "error" ? "error" : "success"}`}>{message}</p>
      ) : null}
    </form>
  );
}
