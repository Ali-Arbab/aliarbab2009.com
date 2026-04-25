"use client";

import { useState } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * ContactForm — brutalist hairline-bordered form that POSTs to
 * /api/contact (route handler, validates + delivers via Resend).
 *
 * Fields:
 *   - name      (text, required, 2-100 chars)
 *   - email     (email, required, RFC 5322)
 *   - message   (textarea, required, 10-5000 chars)
 *   - company   (honeypot — visible-to-bots, hidden via CSS off-screen
 *                position. Bots fill all fields; humans never see it.
 *                Filled honeypot → server returns silent 200, nothing
 *                actually sent.)
 *
 * State machine:
 *   idle → submitting → (success | error)
 *   error allows retry; success holds the success copy.
 *
 * Privacy: no field values are logged or persisted client-side
 * beyond what the user types into the form. On success, the form
 * resets so the message isn't held in DOM/state.
 *
 * A11y:
 *   - Each input has a <label> with for/id
 *   - aria-invalid on field error
 *   - role=\"status\" / role=\"alert\" on success/error blocks
 *   - aria-live=\"polite\" so screen readers announce state changes
 *   - Honeypot has tabIndex=-1 and aria-hidden=\"true\" so keyboard users
 *     and SR users skip it entirely
 */

type FormState = "idle" | "submitting" | "success" | "error";

const inputClass = cn(
  "w-full border-2 border-[var(--color-border)] bg-[var(--color-bg)]",
  "px-4 py-3 font-mono text-sm",
  "text-[var(--color-fg)] placeholder:text-[var(--color-muted)]",
  "focus:outline-2 focus:outline-offset-2 focus:outline-[var(--color-primary)]",
  "aria-[invalid=true]:border-[var(--color-danger)]",
);

const labelClass = "font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const body = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      company: String(formData.get("company") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };

      if (res.ok && data.ok) {
        setState("success");
        e.currentTarget.reset();
        return;
      }

      setErrorMsg(data.error ?? "Something went wrong. Please try again.");
      setState("error");
    } catch {
      setErrorMsg(`Network error. Try emailing me directly at ${siteConfig.email}.`);
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border-2 border-[var(--color-primary)] bg-[var(--color-bg)] p-10"
      >
        <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
          Message sent
        </p>
        <p className="mt-3 max-w-prose text-base leading-relaxed text-[var(--color-fg)]/85">
          Thanks &mdash; I read everything that lands in my inbox within 48 hours and reply if
          there&apos;s something specific to say back.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className={labelClass}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={100}
          autoComplete="name"
          className={inputClass}
          disabled={state === "submitting"}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className={labelClass}>
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          className={inputClass}
          disabled={state === "submitting"}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          className={cn(inputClass, "resize-y")}
          disabled={state === "submitting"}
        />
      </div>

      {/* Honeypot — hidden via off-screen positioning. Bots fill it,
          humans (sighted + keyboard + screen reader) never see it. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", top: "auto", overflow: "hidden" }}
      >
        <label htmlFor="contact-company">
          Company (leave empty)
          <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state === "error" && (
        <p
          role="alert"
          aria-live="polite"
          className="border-2 border-[var(--color-danger)] bg-[var(--color-bg)] p-4 font-mono text-sm text-[var(--color-fg)]"
        >
          {errorMsg}
        </p>
      )}

      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
          Reply within 48 hours
        </p>
        <button
          type="submit"
          disabled={state === "submitting"}
          className={cn(
            "inline-flex items-center gap-3 border-2 border-[var(--color-border)]",
            "bg-[var(--color-primary)] px-5 py-3",
            "font-mono text-xs tracking-[0.2em] text-[var(--color-primary-fg)] uppercase",
            "transition-transform hover:-translate-y-0.5",
            "disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60",
          )}
        >
          {state === "submitting" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
