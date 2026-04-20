import Link from "next/link";

import { MILESTONES } from "@/config/milestones";
import { siteConfig } from "@/config/site";
import { LiveCountdown } from "@/components/shell/live-countdown";

export const metadata = {
  title: "About",
  description: "The long version: three projects, a resume, and how I got here.",
};

const COURSEWORK = [
  { id: "ap-calc-bc", label: "AP Calculus BC" },
  { id: "ap-phys-c-mech", label: "AP Physics C: Mechanics" },
  { id: "ap-eng-lang", label: "AP English Language & Composition" },
  { id: "ap-csa", label: "AP Computer Science A" },
] as const;

export default function AboutPage() {
  const milestoneById = Object.fromEntries(MILESTONES.map((m) => [m.id, m]));

  return (
    <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-16 pb-16 sm:pt-20">
      <div className="brutalist-grid" aria-hidden />

      {/* MASTHEAD */}
      <header className="mb-16 grid grid-cols-12 gap-4 border-b-2 border-[var(--color-border)] pb-6">
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Author
          </p>
          <p className="font-mono text-sm font-medium">{siteConfig.author}</p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Section
          </p>
          <p className="font-mono text-sm font-medium">/about — long version</p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Class
          </p>
          <p className="font-mono text-sm font-medium">XII · final year</p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Navigate
          </p>
          <p className="font-mono text-sm font-medium">
            <Link href="/" className="hover:text-[var(--color-primary)]">
              ← home
            </Link>
          </p>
        </div>
      </header>

      {/* § 01 — LETTER */}
      <section className="mb-24 grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 01
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Hello
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <h1
            className="text-[clamp(3rem,7vw,6rem)] leading-[0.9] font-medium tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Hi &mdash; I&apos;m Ali.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-[var(--color-fg)]/85">
            I&apos;m a Class XII student. This page is the long version of who I am and what
            I&apos;ve built. Whoever you are &mdash; admissions officer, recruiter, collaborator,
            curious reader &mdash; thanks for spending a few minutes here.
          </p>
        </div>
      </section>

      {/* § 02 — ACADEMIC SNAPSHOT (live AP countdowns) */}
      <section className="mb-24 grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 02
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Academics
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <h2
            className="mb-6 text-[clamp(2rem,4vw,3.5rem)] leading-tight font-medium tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Class XII &mdash; AP exams sitting May 2026.
          </h2>
          <ul className="border-2 border-[var(--color-border)]">
            {COURSEWORK.map((c, i) => {
              const m = milestoneById[c.id];
              return (
                <li
                  key={c.id}
                  className={
                    "grid grid-cols-12 items-center gap-4 p-5" +
                    (i < COURSEWORK.length - 1 ? " border-b-2 border-[var(--color-border)]" : "")
                  }
                >
                  <span className="col-span-1 font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
                    0{i + 1}
                  </span>
                  <span className="col-span-12 font-mono text-base font-medium sm:col-span-5">
                    {c.label}
                  </span>
                  <span className="col-span-6 font-mono text-[11px] tracking-[0.2em] text-[var(--color-muted)] uppercase sm:col-span-3">
                    {m?.subLabel ?? ""}
                  </span>
                  <span className="col-span-6 text-right sm:col-span-3">
                    {m ? (
                      <LiveCountdown iso={m.at} className="text-sm text-[var(--color-primary)]" />
                    ) : (
                      <span className="font-mono text-[11px] text-[var(--color-muted)]">
                        pending
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
            Countdowns tick client-side from your local clock &middot; work offline &middot; past
            exams auto-flip to ✓
          </p>
        </div>
      </section>

      {/* § 03 — COMING SOON */}
      <section className="grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 03
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Long
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <div className="border-2 border-dashed border-[var(--color-border)] p-10 text-center">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
              The long version — coming soon
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg)]/75">
              Journey timeline, three per-project &ldquo;why I built this&rdquo; essays,
              activities and leadership, awards and recognition, embedded resume. Ships in Phase 3
              of the build.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
