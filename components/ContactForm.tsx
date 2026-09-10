"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Failed to send message");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send message");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-4">
      <h2 className="section-title mb-0">Send a message</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-mono text-xs text-muted">Name</span>
          <input name="name" type="text" required maxLength={100} placeholder="Your name" className="field" />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-mono text-xs text-muted">Email</span>
          <input name="email" type="email" required maxLength={200} placeholder="you@example.com" className="field" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block font-mono text-xs text-muted">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          minLength={10}
          maxLength={4000}
          placeholder="What are you working on?"
          className="field resize-none"
        />
      </label>
      {/* Honeypot — bots fill it, humans never see it. */}
      <input name="website" type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-xs" aria-live="polite">
          {status === "sent" && <span className="text-green-500">Sent — I&apos;ll reply soon.</span>}
          {status === "error" && <span className="text-red-400">{error}</span>}
        </p>
        <button type="submit" className="btn" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
