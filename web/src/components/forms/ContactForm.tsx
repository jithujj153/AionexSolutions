"use client";

import { FormEvent, useState } from "react";
import { postJson } from "@/lib/api";

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

    setStatus("loading");
    try {
      const result = await postJson("/aionex/v1/contact", {
        name: data.get("name"),
        email: data.get("email"),
        message: data.get("message"),
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
    <form className="form" onSubmit={onSubmit}>
      <div className="hp" aria-hidden>
        <label>
          Company URL
          <input name="company_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required />
      </div>
      <button className="btn btn-accent" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
      {message ? (
        <p className={`form-message ${status === "error" ? "error" : "success"}`}>{message}</p>
      ) : null}
    </form>
  );
}
