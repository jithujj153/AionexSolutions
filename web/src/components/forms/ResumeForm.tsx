"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { postMultipart } from "@/lib/api";
import styles from "./ResumeForm.module.css";

const EXPERIENCE = [
  "Fresher",
  "0–1 years",
  "1–3 years",
  "3–5 years",
  "5–8 years",
  "8–12 years",
  "12+ years",
];

const USER_TYPES = ["Fresher", "Experienced", "Contract", "Consultant"];

const COUNTRIES = ["India", "United Arab Emirates", "United States", "United Kingdom", "Singapore", "Other"];

const COUNTRY_CODES = [
  { value: "+91", label: "India (+91)" },
  { value: "+971", label: "UAE (+971)" },
  { value: "+1", label: "USA / Canada (+1)" },
  { value: "+44", label: "UK (+44)" },
  { value: "+65", label: "Singapore (+65)" },
];

export function ResumeForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company_url") || "")) {
      setStatus("success");
      setMessage("Resume received — AIONEX HR will review and contact you.");
      form.reset();
      return;
    }

    const skills = String(data.get("skills") || "")
      .split(/[,;]+/)
      .map((item) => item.trim())
      .filter(Boolean);
    if (skills.length > 5) {
      setStatus("error");
      setMessage("Enter up to 5 skills only.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const result = await postMultipart("/aionex/v1/apply", data);
      setStatus("success");
      setMessage(result.message || "Resume received — AIONEX HR will review and contact you.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to submit resume.");
    }
  }

  return (
    <section id="resume" className={styles.band} aria-labelledby="resume-heading">
      <div className="container">
        <div className={styles.card}>
          <header className={styles.head}>
            <p className="eyebrow">Registration</p>
            <h2 id="resume-heading">Post your resume</h2>
            <p>Fields marked * are required. AIONEX HR reviews every profile.</p>
          </header>

          <form className={styles.grid} onSubmit={onSubmit}>
            <div className="hp" aria-hidden>
              <label>
                Company URL
                <input name="company_url" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <label className={styles.field}>
              <span>First name *</span>
              <input name="first_name" autoComplete="given-name" required />
            </label>
            <label className={styles.field}>
              <span>Last name *</span>
              <input name="last_name" autoComplete="family-name" required />
            </label>

            <label className={styles.field}>
              <span>Country *</span>
              <select name="country" defaultValue="India" required>
                {COUNTRIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.field}>
              <span>Experience *</span>
              <select name="experience" defaultValue="" required>
                <option value="" disabled>
                  Select experience
                </option>
                {EXPERIENCE.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <span>Email *</span>
              <input name="email" type="email" autoComplete="email" required />
              <small>Use your email as username</small>
            </label>
            <label className={styles.field}>
              <span>User type *</span>
              <select name="user_type" defaultValue="" required>
                <option value="" disabled>
                  Select user type
                </option>
                {USER_TYPES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <small>&nbsp;</small>
            </label>

            <label className={styles.field}>
              <span>Skills *</span>
              <input name="skills" placeholder="Java, React, SQL" required />
              <small>Up to 5 skills, separated by commas</small>
            </label>
            <label className={styles.field}>
              <span>Resume *</span>
              <input
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                required
              />
              <small>PDF, DOC, or DOCX only</small>
            </label>

            <label className={styles.field}>
              <span>Country code *</span>
              <select name="country_code" defaultValue="+91" required>
                {COUNTRY_CODES.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.field}>
              <span>Mobile number *</span>
              <input name="mobile" type="tel" autoComplete="tel" inputMode="tel" required />
            </label>

            <div className={styles.footer}>
              <p className={styles.legal}>
                By submitting you agree to our <Link href="/privacy">Privacy Policy</Link>.
              </p>
              <button className="btn btn-accent" type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Sending…" : "Submit"}
              </button>
              {message ? (
                <p className={`form-message ${status === "error" ? "error" : "success"}`}>{message}</p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
