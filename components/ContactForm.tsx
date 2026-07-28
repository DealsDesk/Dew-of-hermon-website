"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "loading" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMessage(
          result.error || "Something went wrong. Please try again or call us."
        );
        setStatus("error");
        return;
      }

      setStatus("sent");
      form.reset();
    } catch {
      setErrorMessage(
        "We couldn't reach the server. Please check your connection and try again."
      );
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-[28px] py-12 text-center">
        <div className="mb-5 h-14 w-14 rounded-drop bg-primary/15" />
        <h3 className="font-display text-2xl font-medium text-primary-dark">
          Message received.
        </h3>
        <p className="mt-2 max-w-xs font-body text-sm text-ink/60">
          We&rsquo;ll be in touch shortly to confirm your booking or answer
          your question.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      {/* Honeypot — hidden from real visitors, bots tend to fill every field */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-body text-xs font-semibold uppercase tracking-wide text-ink/50">
            Name
          </span>
          <input
            required
            type="text"
            name="name"
            placeholder="Your full name"
            className="rounded-2xl border border-lavender-pale bg-white/70 px-4 py-3 font-body text-sm text-ink outline-none transition-colors focus:border-primary-light"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-body text-xs font-semibold uppercase tracking-wide text-ink/50">
            Phone
          </span>
          <input
            required
            type="tel"
            name="phone"
            placeholder="083 000 0000"
            className="rounded-2xl border border-lavender-pale bg-white/70 px-4 py-3 font-body text-sm text-ink outline-none transition-colors focus:border-primary-light"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-body text-xs font-semibold uppercase tracking-wide text-ink/50">
          Email
        </span>
        <input
          required
          type="email"
          name="email"
          placeholder="you@email.com"
          className="rounded-2xl border border-lavender-pale bg-white/70 px-4 py-3 font-body text-sm text-ink outline-none transition-colors focus:border-primary-light"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-body text-xs font-semibold uppercase tracking-wide text-ink/50">
          What are you looking for?
        </span>
        <select
          name="interest"
          defaultValue="scan"
          className="rounded-2xl border border-lavender-pale bg-white/70 px-4 py-3 font-body text-sm text-ink outline-none transition-colors focus:border-primary-light"
        >
          <option value="scan">Book a Body Scan</option>
          <option value="supplements">Ask about Green World packages</option>
          <option value="other">Something else</option>
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-body text-xs font-semibold uppercase tracking-wide text-ink/50">
          Message
        </span>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us a little about what you're hoping to achieve..."
          className="resize-none rounded-2xl border border-lavender-pale bg-white/70 px-4 py-3 font-body text-sm text-ink outline-none transition-colors focus:border-primary-light"
        />
      </label>

      {status === "error" && (
        <p role="alert" className="font-body text-sm text-red-600">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary mt-2 w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
