"use client";

import { FormEvent, useState } from "react";
import { postJson } from "@/lib/api";
import styles from "./ContactForm.module.css";

export function ExpertForm({ topic }: { topic: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company_url") || "")) {
      setStatus("success");
      setMessage("Message sent. An expert will get back to you shortly.");
      form.reset();
      return;
    }

    const name = String(data.get("name") || "").trim();
    const company = String(data.get("company") || "").trim();
    const help = String(data.get("message") || "").trim() || "Please contact me about this service.";
    const composed = [`Topic: ${topic}`, help, company ? `Company: ${company}` : ""]
      .filter(Boolean)
      .join("\n\n");

    setStatus("loading");
    try {
      const result = await postJson("/aionex/v1/contact", {
        name,
        email: data.get("email"),
        company,
        message: composed,
      });
      setStatus("success");
      setMessage(result.message || "Message sent. An expert will get back to you shortly.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send message.");
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate={false}>
      <p className={styles.intro}>Send a question to an expert</p>
      <div className="hp" aria-hidden>
        <label>
          Company URL
          <input name="company_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className={styles.field}>
        <span>Full name *</span>
        <input name="name" autoComplete="name" required />
      </label>

      <div className={styles.row}>
        <label className={styles.field}>
          <span>Email *</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label className={styles.field}>
          <span>Company</span>
          <input name="company" autoComplete="organization" />
        </label>
      </div>

      <label className={`${styles.field} ${styles.grow}`}>
        <span>Message</span>
        <textarea name="message" rows={5} placeholder="How can we help?" />
      </label>

      <button className={`btn btn-accent ${styles.submit}`} type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Speak to an expert"}
      </button>

      {message ? (
        <p className={`form-message ${status === "error" ? "error" : "success"}`}>{message}</p>
      ) : null}
    </form>
  );
}
