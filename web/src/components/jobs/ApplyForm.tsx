"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { postMultipart } from "@/lib/api";
import styles from "./ApplyForm.module.css";

export function ApplyForm({ jobId, jobTitle }: { jobId: number; jobTitle: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company_url") || "")) {
      setStatus("success");
      setMessage("Application sent — AIONEX HR will review and contact you.");
      form.reset();
      return;
    }

    data.set("job_id", String(jobId));
    setStatus("loading");
    setMessage("");

    try {
      const result = await postMultipart("/aionex/v1/apply", data);
      setStatus("success");
      setMessage(result.message || "Application sent — AIONEX HR will review and contact you.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to submit application.");
    }
  }

  return (
    <aside className={styles.panel}>
      <h2>Apply for {jobTitle}</h2>
      <p>Send your resume to the AIONEX team. No account required.</p>
      <form className="form" onSubmit={onSubmit}>
        <div className="hp" aria-hidden>
          <label>
            Company URL
            <input name="company_url" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" required />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" required />
        </div>
        <div className="field">
          <label htmlFor="linkedin">LinkedIn</label>
          <input id="linkedin" name="linkedin" type="url" placeholder="https://" />
        </div>
        <div className="field">
          <label htmlFor="resume">Resume (PDF/DOC)</label>
          <input
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="cover_note">Cover note</label>
          <textarea id="cover_note" name="cover_note" />
        </div>
        <p className={styles.legal}>
          By applying you agree to our <Link href="/privacy">Privacy Policy</Link>.
        </p>
        <button className="btn btn-accent" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Submit application"}
        </button>
        {message ? (
          <p className={`form-message ${status === "error" ? "error" : "success"}`}>{message}</p>
        ) : null}
      </form>
    </aside>
  );
}
