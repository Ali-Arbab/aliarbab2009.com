import { NextResponse } from "next/server";
import { z } from "zod";

import { siteConfig } from "@/config/site";

/**
 * /api/contact — contact form sink.
 *
 * Defense layers (cheapest first):
 *   1. Origin check  — reject POSTs from foreign origins
 *   2. JSON Content-Type — reject form-encoded payloads (CSRF mitigation)
 *   3. Zod validation — name/email/message shape, body-size cap
 *   4. Honeypot field — bots fill `company`, humans don't see it
 *   5. Resend delivery — only when RESEND_API_KEY is set
 *
 * Phase 4.17 stretch (NOT YET WIRED, requires Vercel KV + Cloudflare
 * Turnstile env vars):
 *   6. Rate limit — Upstash Redis sliding window 3/hour, 20/day per IP
 *   7. Cloudflare Turnstile — invisible CAPTCHA token verification
 *
 * Without RESEND_API_KEY in env, this route returns 503 with a hint
 * to use mailto:ali@aliarbab2009.com directly. The form on /contact
 * will detect the 503 and surface that fallback to the user.
 *
 * Privacy: message bodies NEVER persist anywhere except in the outbound
 * Resend email (which goes to siteConfig.email and is the intended
 * destination). No logging of body content. IP only used for future
 * rate-limit window — auto-expires when added.
 */

const ContactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(5000),
  // Honeypot — must be empty. Visible-to-bots label, hidden via CSS.
  company: z.string().max(0),
});

const ALLOWED_ORIGINS = [
  siteConfig.url,
  "https://aliarbab2009.com",
  "https://www.aliarbab2009.com",
];

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return true; // same-origin or no-cors fetch — allow
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  // Vercel previews — *.vercel.app
  if (origin.endsWith(".vercel.app")) return true;
  return false;
}

export async function POST(request: Request) {
  // 1. Origin
  const origin = request.headers.get("origin");
  if (!isAllowedOrigin(origin)) {
    return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  }

  // 2. Content-Type
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Expected application/json" }, { status: 415 });
  }

  // 3. Body parse + Zod validation
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }
  const { name, email, message, company } = parsed.data;

  // 4. Honeypot — silent 200 so bots think they succeeded
  if (company.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // 5. Resend delivery — gated on env var availability
  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM_EMAIL ?? `noreply@aliarbab2009.com`;
  const contactTo = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;

  if (!resendKey) {
    return NextResponse.json(
      {
        error: "Email delivery not configured. Email me directly: " + siteConfig.email,
      },
      { status: 503 },
    );
  }

  // Plain text body — no HTML to avoid injection vectors. Reply-To
  // set so Ali can reply directly without exposing his actual inbox.
  const text = `Name: ${name}\nEmail: ${email}\n\n${message}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: resendFrom,
        to: [contactTo],
        reply_to: email,
        subject: `[aliarbab2009.com] ${name}`,
        text,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[contact] Resend error", res.status, detail.slice(0, 200));
      return NextResponse.json(
        { error: "Could not send. Try emailing directly: " + siteConfig.email },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact] Fetch error", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Network error. Try emailing directly: " + siteConfig.email },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

export function GET() {
  return new NextResponse(null, { status: 405 });
}
