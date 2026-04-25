"use client";

/* eslint-disable @next/next/no-html-link-for-pages -- root-layout error
   boundary: <Link>/router may not exist when this renders. Plain <a> is
   the correct primitive here. */

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

/**
 * Root-layout error boundary — fires when even the layout shell crashes.
 *
 * Cannot rely on:
 *   - Tailwind classes (Next may not have inserted globals.css)
 *   - CSS custom properties from @theme (same reason)
 *   - next/font (fonts may not be loaded)
 *   - <Link> from next/link (router may be broken)
 *
 * Inline styles only. Plain <a> tags. Self-contained.
 */
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
    if (process.env.NODE_ENV !== "production") {
      console.error("[global-error.tsx]", error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#0a0a0a",
          color: "#f0f0ea",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          padding: "4rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "1.25rem",
        }}
      >
        <p
          style={{
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: "10px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#8a8a8a",
            margin: 0,
          }}
        >
          Error · {error.digest ?? "fatal"}
        </p>
        <h1
          style={{
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 0.9,
            margin: 0,
          }}
        >
          500 — <span style={{ color: "#6b82ff" }}>Server error.</span>
        </h1>
        <p style={{ maxWidth: "60ch", fontSize: "1.05rem", lineHeight: 1.55, margin: 0 }}>
          Something went wrong at a level that broke even the page shell. I&apos;ve been notified.
        </p>
        <a
          href="/"
          style={{
            marginTop: "1rem",
            display: "inline-block",
            border: "2px solid #f0f0ea",
            background: "#6b82ff",
            color: "#0a0a0a",
            padding: "0.75rem 1.25rem",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          Home
        </a>
      </body>
    </html>
  );
}
