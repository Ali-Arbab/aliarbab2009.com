"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Route-level error boundary.
 *
 * Triggers for any unhandled error inside the marketing layout's <main>.
 * Anything that breaks the root layout itself (Nav, Footer, ThemeScript)
 * falls through to global-error.tsx instead.
 *
 * The `digest` prop is a server-generated hash Next exposes for matching
 * a public-facing error to the server log line — useful when triaging.
 *
 * Visual language mirrors not-found.tsx so the brutalist grid + cobalt
 * accent feel intentional, not error-y.
 */
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // P4.16 will wire Sentry.captureException here.
    // For now, surface the digest in console so dev workflows + Vercel
    // logs can correlate.
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("[error.tsx]", error);
    }
  }, [error]);

  return (
    <main className="relative mx-auto flex min-h-dvh w-full max-w-[1400px] flex-col items-start justify-center gap-10 px-6 py-24">
      <div className="brutalist-grid" aria-hidden />

      <div className="grid w-full grid-cols-12 items-end gap-4 border-b-2 border-[var(--color-border)] pb-6">
        <p className="col-span-6 font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase md:col-span-3">
          Error · {error.digest ?? "client"}
        </p>
        <p className="col-span-6 font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase md:col-span-9">
          something broke
        </p>
      </div>

      <div className="grid w-full grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            §
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            500
          </p>
        </div>
        <div className="col-span-12 flex flex-col gap-8 md:col-span-10">
          <h1
            className="text-[clamp(4rem,10vw,9rem)] leading-[0.85] font-medium tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Something <span className="text-[var(--color-primary)]">broke.</span>
          </h1>
          <p className="max-w-prose text-lg leading-relaxed text-[var(--color-fg)]/85">
            I&apos;ve been notified. In the meantime, you can try reloading or head home.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-3 border-2 border-[var(--color-border)] bg-[var(--color-primary)] px-5 py-3 font-mono text-xs tracking-[0.2em] text-[var(--color-primary-fg)] uppercase transition-transform hover:-translate-y-0.5"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-3 border-2 border-[var(--color-border)] bg-transparent px-5 py-3 font-mono text-xs tracking-[0.2em] uppercase transition-colors hover:bg-[var(--color-border)] hover:text-[var(--color-bg)]"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
