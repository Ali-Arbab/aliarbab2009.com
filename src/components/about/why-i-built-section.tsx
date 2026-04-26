import Link from "next/link";

import { PROJECTS } from "@/config/projects";
import { WHY_I_BUILT, type WhyIBuiltEntry } from "@/config/why-i-built";

/**
 * /about § 06 — Why I built each project.
 *
 * Three first-person essays joined to the project catalog by slug.
 * Each block runs problem → why-me → learned, with an optional
 * editorial pull-quote rendered in the display serif.
 *
 * Server component — all values resolve at build/render time. No
 * client-side state; the only interactive bits are the case-study
 * deep-link buttons (regular <Link>s).
 */

const PROJECT_BY_SLUG = new Map(PROJECTS.map((p) => [p.slug, p]));

function WhyBlock({ entry, index }: { entry: WhyIBuiltEntry; index: number }) {
  const project = PROJECT_BY_SLUG.get(entry.slug);
  if (!project) return null; // silently skip orphans

  return (
    <article className="grid grid-cols-12 gap-4 border-2 border-[var(--color-border)] p-6 md:p-8">
      {/* Header — project number, name, tagline, status */}
      <header className="col-span-12 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b-2 border-[var(--color-border)] pb-4">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            0{index + 1}
          </span>
          <h3
            className="text-2xl leading-tight font-medium tracking-[-0.01em] md:text-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.name}
          </h3>
          <span className="font-mono text-[11px] tracking-wide text-[var(--color-fg)]/70">
            {project.tagline}.
          </span>
        </div>
        <span className="border border-[var(--color-border)] px-2 py-0.5 font-mono text-[9px] tracking-[0.25em] uppercase">
          {project.statusLabel}
        </span>
      </header>

      {/* Body — three labelled paragraphs */}
      <div className="col-span-12 flex flex-col gap-5 md:col-span-8">
        <div>
          <p className="mb-1.5 font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Problem
          </p>
          <p className="text-[15px] leading-relaxed text-[var(--color-fg)]">{entry.problem}</p>
        </div>
        <div>
          <p className="mb-1.5 font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Why me
          </p>
          <p className="text-[15px] leading-relaxed text-[var(--color-fg)]">{entry.why}</p>
        </div>
        <div>
          <p className="mb-1.5 font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Learned
          </p>
          <p className="text-[15px] leading-relaxed text-[var(--color-fg)]">{entry.learned}</p>
        </div>
      </div>

      {/* Sidebar — pull-quote + read-the-case-study CTA */}
      <aside className="col-span-12 flex flex-col gap-5 md:col-span-4 md:border-l-2 md:border-[var(--color-border)] md:pl-6">
        {entry.pullQuote && (
          <blockquote
            className="border-l-2 border-[var(--color-primary)] pl-4 text-lg leading-snug text-[var(--color-fg)] italic"
            style={{ fontFamily: "var(--font-display)" }}
          >
            &ldquo;{entry.pullQuote}&rdquo;
          </blockquote>
        )}

        <dl className="flex flex-col gap-3 font-mono text-[10px] tracking-[0.25em] uppercase">
          <div className="flex flex-col gap-1">
            <dt className="text-[var(--color-muted)]">Stack</dt>
            <dd className="text-[var(--color-fg)]">{project.stack.slice(0, 4).join(" / ")}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-[var(--color-muted)]">Year</dt>
            <dd className="text-[var(--color-fg)]">{project.year}</dd>
          </div>
          {project.liveUrl ? (
            <div className="flex flex-col gap-1">
              <dt className="text-[var(--color-muted)]">Live</dt>
              <dd>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-[var(--color-primary)] underline-offset-4 hover:underline"
                >
                  {project.liveUrl.replace(/^https?:\/\//, "")}
                </a>
              </dd>
            </div>
          ) : null}
        </dl>

        <Link
          href={`/projects/${project.slug}`}
          className="mt-auto inline-flex items-center justify-between gap-3 border-2 border-[var(--color-border)] bg-transparent px-4 py-2.5 font-mono text-[10px] tracking-[0.25em] uppercase transition-colors hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-fg)]"
        >
          <span>Read the case study</span>
          <span aria-hidden>→</span>
        </Link>
      </aside>
    </article>
  );
}

export function WhyIBuiltSection() {
  return (
    <section className="mb-24 grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
      <div className="col-span-12 md:col-span-2">
        <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
          § 06
        </p>
        <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
          Why I built
        </p>
      </div>
      <div className="col-span-12 md:col-span-10">
        <h2
          className="mb-8 text-[clamp(2rem,4vw,3.5rem)] leading-tight font-medium tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Three projects, three motivations.
        </h2>
        <div className="flex flex-col gap-6">
          {WHY_I_BUILT.map((entry, i) => (
            <WhyBlock key={entry.slug} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
