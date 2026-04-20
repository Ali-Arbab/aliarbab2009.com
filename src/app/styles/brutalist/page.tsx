import Link from "next/link";

import { PROJECTS } from "@/config/projects";

export default function BrutalistVariantPage() {
  return (
    <main className="relative mx-auto w-full max-w-[1400px] px-6 pt-24 pb-16 sm:pt-28">
      {/* ============================================================
          TOP MASTHEAD — mono labels on a 12-col grid
          ============================================================ */}
      <header className="mb-16 grid grid-cols-12 gap-4 border-b-2 border-[var(--color-border)] pb-6">
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Author
          </p>
          <p className="font-mono text-sm font-medium">Ali Arbab</p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Index
          </p>
          <p className="font-mono text-sm font-medium">aliarbab2009.com / 2026</p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Role
          </p>
          <p className="font-mono text-sm font-medium">Class XII &middot; Builder</p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Contents
          </p>
          <p className="font-mono text-sm font-medium">
            01 Intro &middot; 02 Work &middot; 03 Access
          </p>
        </div>
      </header>

      {/* ============================================================
          SECTION 01 — MONOGRAM + INTRO (mondrian-ish asymmetric grid)
          ============================================================ */}
      <section className="mb-28 grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 01
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Intro
          </p>
        </div>

        {/* Massive monogram */}
        <div className="col-span-12 md:col-span-5">
          <div className="relative border-2 border-[var(--color-border)] bg-[var(--color-surface)] p-8 aspect-[4/5] flex flex-col justify-between">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
              Monogram &middot; Plate 01
            </p>
            <p
              className="text-[clamp(8rem,18vw,14rem)] leading-[0.8] font-medium tracking-[-0.04em]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-[var(--color-primary)]">a</span>
              <span>a.</span>
            </p>
            <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
              <span>cobalt &middot; paper</span>
              <span>space grotesk</span>
            </div>
          </div>
        </div>

        {/* Headline + body */}
        <div className="col-span-12 flex flex-col gap-6 md:col-span-5">
          <p className="font-mono text-[11px] tracking-[0.25em] text-[var(--color-primary)] uppercase">
            Hello. I build.
          </p>
          <h1
            className="text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] font-medium tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Three projects.
            <br />
            <span className="text-[var(--color-primary)]">One system of</span>
            <br />
            <span className="italic">working.</span>
          </h1>
          <p
            className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]/85"
            style={{ fontFamily: "var(--font-display)" }}
          >
            I&apos;m Ali. I&apos;m in Class XII. I build software for people
            who are usually designed around — not for. An AI investment coach
            for teens, a voice-first ledger for shopkeepers, a smart lock
            running on two ESP32s.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 border-2 border-[var(--color-border)] bg-[var(--color-primary)] px-5 py-3 font-mono text-xs tracking-[0.2em] text-[var(--color-primary-fg)] uppercase transition-transform hover:-translate-y-0.5"
            >
              See the work
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 border-2 border-[var(--color-border)] bg-transparent px-5 py-3 font-mono text-xs tracking-[0.2em] uppercase transition-colors hover:bg-[var(--color-border)] hover:text-[var(--color-bg)]"
            >
              About
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center gap-3 border-2 border-[var(--color-border)] bg-transparent px-5 py-3 font-mono text-xs tracking-[0.2em] uppercase transition-colors hover:bg-[var(--color-border)] hover:text-[var(--color-bg)]"
            >
              Resume
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 02 — WORK (full-width grid with glass hover)
          ============================================================ */}
      <section className="mb-28">
        <div className="mb-8 grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-4">
          <div className="col-span-12 md:col-span-2">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
              § 02
            </p>
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
              Work
            </p>
          </div>
          <h2
            className="col-span-12 text-[clamp(2rem,4vw,3.5rem)] leading-tight font-medium tracking-tight md:col-span-10"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Three systems, three audiences.
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-0 border-2 border-[var(--color-border)]">
          {PROJECTS.map((p, i) => (
            <article
              key={p.slug}
              className={
                "variant-brutalist-glass-hover col-span-12 flex flex-col gap-6 border-[var(--color-border)] p-8 md:col-span-4" +
                (i < 2 ? " md:border-r-2" : "") +
                (i === 0 ? " border-b-2 md:border-b-0" : "") +
                (i === 1 ? " border-b-2 md:border-b-0" : "")
              }
            >
              <Link href={`/projects/${p.slug}`} className="flex h-full flex-col gap-6">
                <div className="flex items-baseline justify-between">
                  <p
                    className="font-mono text-[52px] leading-none font-medium tracking-[-0.04em] text-[var(--color-primary)]"
                    style={{ fontFeatureSettings: "'ss01'" }}
                  >
                    0{i + 1}
                  </p>
                  <span className="border border-[var(--color-border)] px-2 py-0.5 font-mono text-[9px] tracking-[0.25em] uppercase">
                    {p.statusLabel}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <h3
                    className="text-3xl leading-tight font-medium tracking-[-0.01em]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {p.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-fg)]/80">
                    {p.tagline}.
                  </p>
                  <p className="text-[13px] leading-relaxed text-[var(--color-fg)]/70">
                    {p.description}
                  </p>
                </div>

                <div className="variant-brutalist-rule" />

                <dl className="flex flex-col gap-2 font-mono text-[10px] tracking-[0.2em] uppercase">
                  <div className="flex justify-between">
                    <dt className="text-[var(--color-muted)]">Year</dt>
                    <dd className="text-[var(--color-fg)]">{p.year}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[var(--color-muted)]">Stack</dt>
                    <dd className="text-right text-[var(--color-fg)]">
                      {p.stack.slice(0, 3).join(" / ")}
                    </dd>
                  </div>
                </dl>

                <span className="mt-auto inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-[var(--color-primary)] uppercase">
                  Read case →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ============================================================
          SECTION 03 — ACCESS / CONTACT strip
          ============================================================ */}
      <section className="grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 03
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Access
          </p>
        </div>
        <div className="col-span-12 flex flex-col gap-6 md:col-span-10">
          <h2
            className="text-[clamp(2rem,4vw,3.5rem)] leading-tight font-medium tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Say hi.
          </h2>

          <ul className="grid grid-cols-1 gap-0 border-2 border-[var(--color-border)] md:grid-cols-3">
            <li className="border-b-2 border-[var(--color-border)] p-6 md:border-r-2 md:border-b-0">
              <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
                Contact
              </p>
              <Link
                href="/contact"
                className="mt-2 block font-mono text-lg font-medium underline decoration-2 underline-offset-4 hover:text-[var(--color-primary)]"
              >
                /contact
              </Link>
            </li>
            <li className="border-b-2 border-[var(--color-border)] p-6 md:border-r-2 md:border-b-0">
              <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
                Source
              </p>
              <Link
                href="https://github.com/aliarbab2009"
                target="_blank"
                rel="noreferrer"
                className="mt-2 block font-mono text-lg font-medium underline decoration-2 underline-offset-4 hover:text-[var(--color-primary)]"
              >
                @aliarbab2009
              </Link>
            </li>
            <li className="p-6">
              <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
                CV
              </p>
              <Link
                href="/resume"
                className="mt-2 block font-mono text-lg font-medium underline decoration-2 underline-offset-4 hover:text-[var(--color-primary)]"
              >
                /resume
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <footer className="mt-16 flex items-baseline justify-between border-t-2 border-[var(--color-border)] pt-4 font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
        <span>© 2026 / Ali Arbab</span>
        <span>Set in Space Grotesk &middot; JetBrains Mono</span>
      </footer>
    </main>
  );
}
