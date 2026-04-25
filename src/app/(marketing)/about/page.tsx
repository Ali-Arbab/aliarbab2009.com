import type { Metadata } from "next";
import Link from "next/link";

import { MILESTONES } from "@/config/milestones";
import { siteConfig } from "@/config/site";
import { JourneySection } from "@/components/about/journey-section";
import { WhyIBuiltSection } from "@/components/about/why-i-built-section";
import { LiveCountdown } from "@/components/shell/live-countdown";
import { JsonLd } from "@/components/seo/json-ld";
import { aboutPageJsonLd } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Class XII student building AI, voice, and IoT systems. The long version: three projects, the journey behind them, the resume, and how I work.",
  path: "/about",
  ogImage: "/og/about.png",
  ogImageAlt: "About Ali Arbab — long-version bio",
});

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
      <JsonLd data={aboutPageJsonLd()} />
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
          <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-[var(--color-fg)]/85">
            <p>
              I&apos;m a Class XII student finishing high school in 2026, sitting four AP exams in
              May, and shipping software in the meantime. This page is the long version: the
              journey, the projects, and the reasoning behind both.
            </p>
            <p>
              Three years ago I&apos;d never heard of an ESP32, didn&apos;t know that Next.js
              wasn&apos;t a typo, and thought a stock simulator was a glorified calculator. Today
              there&apos;s an investment coach for teenagers running at{" "}
              <a
                href="https://stocksaathi.co.in"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-2 underline-offset-4 hover:text-[var(--color-primary)]"
              >
                stocksaathi.co.in
              </a>
              , a voice-first ledger for shopkeepers in pre-launch at bolhisaab.in, and a dual-door
              smart lock built on two ESP32 boards sitting on my desk that I can unlock from my
              phone over the local network.
            </p>
            <p>
              The through-line is people, not tech. Indian teenagers who don&apos;t have a safe
              place to learn how markets actually behave. Hindi-first shopkeepers who shouldn&apos;t
              have to translate &ldquo;Ram took 500 rupees on credit&rdquo; into English to keep
              their books. A house that locks itself when the family forgets, without sending door
              state to a server in a different country.
            </p>
            <p>
              Whoever you are &mdash; admissions officer, recruiter, collaborator, curious reader
              &mdash; thanks for spending a few minutes here. If anything below sparks a question,
              there&apos;s a contact form at{" "}
              <Link
                href="/contact"
                className="underline decoration-2 underline-offset-4 hover:text-[var(--color-primary)]"
              >
                /contact
              </Link>
              .
            </p>
          </div>
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
                    {m?.score ? (
                      <span className="inline-flex items-baseline gap-1.5 font-mono text-sm font-medium text-[var(--color-primary)]">
                        <span className="text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
                          Score
                        </span>
                        {m.score}
                      </span>
                    ) : m ? (
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

      {/* § 03 — JOURNEY · § 04 — ACTIVITIES · § 05 — AWARDS */}
      <JourneySection />

      {/* § 06 — WHY I BUILT (per-project motivation essays) */}
      <WhyIBuiltSection />

      {/* § 07 — CLOSE (signoff + colophon + last-reviewed stamp) */}
      <section className="grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 07
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Close
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <h2
            className="mb-8 text-[clamp(2rem,4vw,3.5rem)] leading-tight font-medium tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            That&apos;s the long version.
          </h2>
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-[var(--color-fg)]/85">
            <p>
              Three projects, four AP exams, one site. If you&apos;ve scrolled this far, thank you
              &mdash; that&apos;s a meaningful slice of attention and I don&apos;t take it for
              granted.
            </p>
            <p>
              A note on this site itself: built in Next.js 15 + Tailwind v4 + TypeScript strict,
              deployed to Vercel. The brutalist Swiss-grid is deliberate &mdash; everything reduces
              to type and hairline borders so the work in the project pages can shout. Source is
              open at{" "}
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-2 underline-offset-4 hover:text-[var(--color-primary)]"
              >
                github.com/{siteConfig.githubHandle}
              </a>{" "}
              if you want to see how it&apos;s put together.
            </p>
            <p>
              If anything here matches something you&apos;re building or weighing, the shortest path
              is{" "}
              <Link
                href="/contact"
                className="underline decoration-2 underline-offset-4 hover:text-[var(--color-primary)]"
              >
                /contact
              </Link>
              .
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 border-2 border-[var(--color-border)] bg-[var(--color-primary)] px-5 py-3 font-mono text-xs tracking-[0.2em] text-[var(--color-primary-fg)] uppercase transition-transform hover:-translate-y-0.5"
            >
              Browse all projects
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                &rarr;
              </span>
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center gap-3 border-2 border-[var(--color-border)] bg-transparent px-5 py-3 font-mono text-xs tracking-[0.2em] uppercase transition-colors hover:bg-[var(--color-border)] hover:text-[var(--color-bg)]"
            >
              Resume
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border-2 border-[var(--color-border)] bg-transparent px-5 py-3 font-mono text-xs tracking-[0.2em] uppercase transition-colors hover:bg-[var(--color-border)] hover:text-[var(--color-bg)]"
            >
              Contact
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-baseline justify-between gap-3 border-t-2 border-[var(--color-border)] pt-4">
            <p className="text-2xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              &mdash; Ali
            </p>
            <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
              Last reviewed{" "}
              <time dateTime={siteConfig.lastReviewedISO}>{siteConfig.lastReviewedISO}</time>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
