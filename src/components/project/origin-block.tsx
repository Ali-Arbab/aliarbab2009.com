import Link from "next/link";

import { WHY_I_BUILT } from "@/config/why-i-built";

/**
 * <OriginBlock slug="..." /> — per-project "why I built this" block,
 * rendered as § 04 on each project page.
 *
 * Pulls the matching entry from src/config/why-i-built.ts and renders
 * problem / why / learned in project-theme tokens, plus the editorial
 * pull-quote in display serif. /about renders the same prose but in a
 * different layout (3-up grid). On project pages the same content
 * gets the full width treatment with a 'continue on /about' CTA.
 *
 * Server component — silently renders nothing if the slug has no entry.
 */
export function OriginBlock({ slug }: { slug: string }) {
  const entry = WHY_I_BUILT.find((e) => e.slug === slug);
  if (!entry) return null;

  return (
    <div className="border-2 border-[var(--color-border)]">
      {entry.pullQuote && (
        <div className="border-b-2 border-[var(--color-border)] p-8 md:p-12">
          <blockquote
            className="text-[clamp(1.25rem,2.5vw,1.875rem)] leading-snug text-[var(--color-fg)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span aria-hidden className="text-[var(--color-primary)]">
              &ldquo;
            </span>
            {entry.pullQuote}
            <span aria-hidden className="text-[var(--color-primary)]">
              &rdquo;
            </span>
          </blockquote>
        </div>
      )}

      <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
        <div className="border-b-2 border-[var(--color-border)] p-6 md:border-r-2 md:border-b-0">
          <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Problem
          </p>
          <p className="text-[15px] leading-relaxed text-[var(--color-fg)]">{entry.problem}</p>
        </div>
        <div className="border-b-2 border-[var(--color-border)] p-6 md:border-r-2 md:border-b-0">
          <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Why me
          </p>
          <p className="text-[15px] leading-relaxed text-[var(--color-fg)]">{entry.why}</p>
        </div>
        <div className="p-6">
          <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Learned
          </p>
          <p className="text-[15px] leading-relaxed text-[var(--color-fg)]">{entry.learned}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-baseline justify-between gap-3 border-t-2 border-[var(--color-border)] px-6 py-4">
        <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
          More on Ali&apos;s journey & projects
        </p>
        <Link
          href="/about"
          className="font-mono text-[11px] tracking-[0.25em] text-[var(--color-primary)] uppercase underline-offset-4 hover:underline"
        >
          /about &rarr;
        </Link>
      </div>
    </div>
  );
}
