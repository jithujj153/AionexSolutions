"use client";

import { FormEvent, useState } from "react";
import { postJson } from "@/lib/api";
import styles from "./ContactForm.module.css";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company_url") || "")) {
      setStatus("success");
      setMessage("Message sent. We will get back to you shortly.");
      form.reset();
      return;
    }

    const first = String(data.get("first_name") || "").trim();
    const last = String(data.get("last_name") || "").trim();
    const name = `${first} ${last}`.trim();
    const phone = String(data.get("phone") || "").trim();
    const company = String(data.get("company") || "").trim();
    const help = String(data.get("message") || "").trim();
    const composed = [
      help,
      phone ? `Phone: ${phone}` : "",
      company ? `Company: ${company}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    setStatus("loading");
    try {
      const result = await postJson("/aionex/v1/contact", {
        name,
        first_name: first,
        last_name: last,
        email: data.get("email"),
        phone,
        company,
        message: composed,
      });
      setStatus("success");
      setMessage(result.message || "Message sent. We will get back to you shortly.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send message.");
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className="hp" aria-hidden>
        <label>
          Company URL
          <input name="company_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span>First name *</span>
          <input name="first_name" autoComplete="given-name" required />
        </label>
        <label className={styles.field}>
          <span>Last name *</span>
          <input name="last_name" autoComplete="family-name" required />
        </label>
      </div>

      <label className={styles.field}>
        <span>Email address *</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>

      <label className={styles.field}>
        <span>Phone number</span>
        <input name="phone" type="tel" autoComplete="tel" />
      </label>

      <label className={styles.field}>
        <span>Company</span>
        <input name="company" autoComplete="organization" />
      </label>

      <label className={`${styles.field} ${styles.grow}`}>
        <span>How we can help you? *</span>
        <textarea name="message" rows={5} required />
      </label>

      <button className={`btn btn-accent ${styles.submit}`} type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Contact us"}
      </button>

      {message ? (
        <p className={`form-message ${status === "error" ? "error" : "success"}`}>{message}</p>
      ) : null}
    </form>
  );
}
