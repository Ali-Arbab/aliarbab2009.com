import Link from "next/link";

import { PROJECTS } from "@/config/projects";
import { BootSequence, StatTicker } from "@/components/styles/cyberpunk-decor";

export default function CyberpunkVariantPage() {
  return (
    <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24 pb-16 sm:pt-28">
      {/* ============================================================
          TOP STRIP — status bar / system readout
          ============================================================ */}
      <header className="mb-14 flex flex-col gap-5 border-b border-[var(--color-border)] pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[var(--color-primary)]" />
            <span className="text-[var(--color-primary)]">OPERATOR</span>
            <span className="text-[var(--color-muted)]">&middot;</span>
            <span className="text-[var(--color-fg)]">ali.arbab</span>
            <span className="text-[var(--color-muted)]">&middot;</span>
            <span className="text-[var(--color-muted)]">class.XII</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
            <span className="text-[var(--color-accent-amber)]">&#9650;</span>
            <span>node.aliarbab2009.com</span>
          </div>
        </div>
        <StatTicker />
      </header>

      {/* ============================================================
          HERO — Orbitron title with chromatic aberration + typing
          ============================================================ */}
      <section className="mb-24 flex flex-col gap-10">
        <div>
          <p className="mb-4 font-mono text-[10px] tracking-[0.35em] text-[var(--color-accent-cyan)] uppercase">
            &gt; transmission.init
          </p>
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="variant-cyberpunk-glitch text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] font-extrabold tracking-[-0.02em] text-[var(--color-fg)] uppercase"
          >
            <span className="block">ALI // ARBAB</span>
            <span
              className="variant-cyberpunk-cursor block text-[var(--color-primary)]"
              style={{ textShadow: "0 0 40px rgba(0, 255, 163, 0.45)" }}
            >
              BUILDS.AT.NIGHT
            </span>
          </h1>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="max-w-2xl">
            <p
              className="text-xl leading-relaxed text-[var(--color-fg)]/85"
              style={{ fontFamily: "var(--font-body)", letterSpacing: "0.01em" }}
            >
              Three live systems. An AI coach teaching teens how markets actually behave. A voice
              interface for shopkeepers who don&apos;t speak English. A dual-relay smart lock
              running on a private mesh. All built, all shipped, all documented.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
              <Link
                href="/projects"
                className="group relative inline-flex items-center gap-2 border border-[var(--color-primary)] bg-transparent px-5 py-3 font-mono text-xs tracking-[0.2em] text-[var(--color-primary)] uppercase transition-all duration-200 hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-fg)] hover:shadow-[0_0_30px_var(--color-glow)]"
              >
                &gt; access.projects
                <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                  ]
                </span>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-[var(--color-border)] bg-transparent px-5 py-3 font-mono text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase transition-colors hover:border-[var(--color-accent-cyan)] hover:text-[var(--color-accent-cyan)]"
              >
                about.log
              </Link>
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 border border-[var(--color-border)] bg-transparent px-5 py-3 font-mono text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase transition-colors hover:border-[var(--color-accent-magenta)] hover:text-[var(--color-accent-magenta)]"
              >
                resume.pdf
              </Link>
            </div>
          </div>

          {/* Boot log panel */}
          <div className="border border-[var(--color-border)] bg-[var(--color-surface-2)]/60 p-5 backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--color-danger)]" />
              <span className="h-2 w-2 rounded-full bg-[var(--color-accent-amber)]" />
              <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />
              <span className="ml-2 font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
                boot.seq
              </span>
            </div>
            <BootSequence />
          </div>
        </div>
      </section>

      {/* ============================================================
          PROJECT NODES — three panels, glitch on hover
          ============================================================ */}
      <section>
        <div className="mb-8 flex items-center justify-between border-b border-[var(--color-border)] pb-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-accent-cyan)] uppercase">
            &gt; ls ./projects
          </p>
          <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
            3 nodes detected
          </p>
        </div>

        <ul className="grid gap-5 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <li key={p.slug}>
              <Link
                href={`/projects/${p.slug}`}
                className="group relative flex h-full flex-col gap-4 border border-[var(--color-border)] bg-[var(--color-surface-2)]/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-2)]/70 hover:shadow-[0_0_50px_-20px_var(--color-glow)]"
              >
                {/* corner brackets — cyberpunk frame accent */}
                <span className="pointer-events-none absolute top-2 left-2 h-3 w-3 border-t border-l border-[var(--color-primary)] opacity-50 transition-opacity group-hover:opacity-100" />
                <span className="pointer-events-none absolute top-2 right-2 h-3 w-3 border-t border-r border-[var(--color-primary)] opacity-50 transition-opacity group-hover:opacity-100" />
                <span className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b border-l border-[var(--color-primary)] opacity-50 transition-opacity group-hover:opacity-100" />
                <span className="pointer-events-none absolute right-2 bottom-2 h-3 w-3 border-r border-b border-[var(--color-primary)] opacity-50 transition-opacity group-hover:opacity-100" />

                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
                    node.0{i + 1}
                  </p>
                  <p
                    className="font-mono text-[10px] tracking-[0.2em] uppercase"
                    style={{
                      color:
                        p.status === "live"
                          ? "var(--color-primary)"
                          : p.status === "pre-launch"
                            ? "var(--color-accent-amber)"
                            : "var(--color-accent-magenta)",
                    }}
                  >
                    [{p.status === "live" ? "ONLINE" : p.status === "pre-launch" ? "STAGING" : "LOCAL"}]
                  </p>
                </div>

                <h3
                  className="variant-cyberpunk-glitch text-2xl leading-tight font-extrabold tracking-[-0.01em] text-[var(--color-fg)] uppercase transition-colors group-hover:text-[var(--color-primary)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {p.name}
                </h3>

                <p className="text-sm leading-relaxed text-[var(--color-fg)]/80">
                  {p.tagline}.
                </p>

                <div className="mt-auto flex flex-wrap gap-1">
                  {p.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="border border-[var(--color-border)] px-2 py-0.5 font-mono text-[10px] tracking-[0.1em] text-[var(--color-muted)] uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-3 font-mono text-[10px] tracking-[0.2em] uppercase">
                  <span className="text-[var(--color-muted)]">year.{p.year}</span>
                  <span className="text-[var(--color-primary)] transition-transform group-hover:translate-x-1">
                    enter →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ============================================================
          FOOTER — ASCII signature + terminal tagline
          ============================================================ */}
      <footer className="mt-24 border-t border-[var(--color-border)] pt-6">
        <pre
          className="font-mono text-[10px] leading-[1.4] text-[var(--color-primary)]/40"
          aria-hidden
        >
          {String.raw`    _      _      ___      _      ____    ____       _      ____
   / \    | |    |_ _|    / \    |  _ \  | __ )     / \    | __ )
  / _ \   | |     | |    / _ \   | |_) | |  _ \    / _ \   |  _ \
 / ___ \  | |___  | |   / ___ \  |  _ <  | |_) |  / ___ \  | |_) |
/_/   \_\ |_____||___| /_/   \_\ |_| \_\ |____/  /_/   \_\ |____/ `}
        </pre>
        <p className="mt-4 font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
          end.of.transmission &middot; operator signing off &middot;{" "}
          <span className="text-[var(--color-primary)]">
            <Link href="/contact">/establish.contact</Link>
          </span>
        </p>
      </footer>
    </main>
  );
}
