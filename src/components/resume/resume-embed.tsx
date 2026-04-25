import Link from "next/link";

import { ACTIVITIES } from "@/config/activities";
import { AWARDS } from "@/config/awards";
import { MILESTONES } from "@/config/milestones";
import { PROJECTS } from "@/config/projects";
import { RESUME } from "@/config/resume";
import { siteConfig } from "@/config/site";

/**
 * <ResumeEmbed /> — HTML-canonical resume rendered on /resume.
 *
 * Design call: the HTML version is the source of truth — searchable,
 * accessible, themeable, printable. The PDF (when it lands) is a
 * derivative, served via /resume/ali-arbab-resume.pdf for
 * institutions that need a file upload.
 *
 * The print stylesheet (see <style> block) makes Ctrl/Cmd+P produce
 * a clean two-color layout that matches the brutalist aesthetic
 * without burning ink on the dark surface tokens. Until the real
 * PDF ships, "Print to PDF" from any browser is a perfectly fine
 * fallback — same content, same structure.
 *
 * Server component — no client state. All values resolve at build /
 * render time.
 */

function formatDateRange(from: string, to?: string): string {
  if (!to) {
    const currentYear = new Date().getFullYear().toString();
    return from === currentYear ? from : `${from}–present`;
  }
  return `${from}–${to}`;
}

export function ResumeEmbed() {
  const apMilestones = MILESTONES;
  const projects = PROJECTS;
  const activities = [...ACTIVITIES].sort((a, b) => b.from.localeCompare(a.from));
  const awards = [...AWARDS].sort((a, b) => b.year - a.year);

  return (
    <article id="resume" className="resume-embed border-2 border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-12">
      {/* Print-only stylesheet — flips dark tokens to a paper-friendly
          black-on-white layout when the user hits Ctrl/Cmd+P. Also
          unwraps any parent grid/section so the resume claims the
          full page width regardless of how it's embedded. */}
      <style>{`
        @media print {
          @page { size: A4; margin: 14mm; }
          html, body { background: #ffffff !important; color: #000000 !important; }
          /* Unwrap every ancestor of the resume so it renders flat. */
          body :not(#resume):not(#resume *) {
            display: revert;
          }
          .resume-print-hide { display: none !important; }
          /* Force any remaining grid/flex parent to stack normally. */
          #resume,
          #resume * {
            grid-column: auto !important;
            grid-row: auto !important;
          }
          .resume-embed {
            border: none !important;
            background: #ffffff !important;
            color: #000000 !important;
            padding: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          .resume-embed * {
            color: #000000 !important;
            border-color: #000000 !important;
            background: transparent !important;
          }
          .resume-embed a { text-decoration: underline; }
          .resume-embed .resume-pill {
            border: 1px solid #000000 !important;
          }
          /* Avoid orphan section headings */
          .resume-embed h2, .resume-embed h3 { break-after: avoid; }
          .resume-embed li { break-inside: avoid; }
        }
      `}</style>

      {/* HEADER */}
      <header className="mb-8 border-b-2 border-[var(--color-border)] pb-6">
        <h1
          className="text-[clamp(2rem,5vw,3.25rem)] leading-[0.95] font-medium tracking-[-0.02em]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {siteConfig.author}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--color-fg)]/85">
          {RESUME.summary}
        </p>
        <ul className="mt-5 grid grid-cols-1 gap-2 font-mono text-[11px] tracking-wide sm:grid-cols-3">
          <li className="flex flex-col gap-1">
            <span className="text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
              Contact
            </span>
            <Link
              href="/contact"
              className="font-medium hover:text-[var(--color-primary)] underline-offset-4 hover:underline"
            >
              /contact (form)
            </Link>
          </li>
          <li className="flex flex-col gap-1">
            <span className="text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
              GitHub
            </span>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium hover:text-[var(--color-primary)] underline-offset-4 hover:underline"
            >
              @{siteConfig.githubHandle}
            </a>
          </li>
          <li className="flex flex-col gap-1">
            <span className="text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
              Web
            </span>
            <a
              href={siteConfig.url}
              className="font-medium hover:text-[var(--color-primary)] underline-offset-4 hover:underline"
            >
              aliarbab2009.com
            </a>
          </li>
        </ul>
      </header>

      {/* EDUCATION */}
      <section className="mb-8">
        <h2 className="mb-3 font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
          Education
        </h2>
        <p className="text-base font-medium">Class XII — final year</p>
        <p className="mt-1 text-sm leading-relaxed text-[var(--color-fg)]/80">
          AP exam track sitting May 2026:
        </p>
        <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {apMilestones.map((m) => (
            <li
              key={m.id}
              className="flex items-baseline justify-between gap-3 border-l-2 border-[var(--color-border)] pl-3"
            >
              <span className="text-sm font-medium">{m.label}</span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
                {new Date(m.at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  timeZone: "UTC",
                })}
              </span>
            </li>
          ))}
        </ul>
        <ul className="mt-4 flex flex-col gap-2 text-sm leading-relaxed text-[var(--color-fg)]/85">
          {RESUME.coursework.map((line, i) => (
            <li key={i} className="flex gap-3">
              <span aria-hidden className="text-[var(--color-muted)]">→</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* PROJECTS */}
      <section className="mb-8 border-t-2 border-[var(--color-border)] pt-6">
        <h2 className="mb-4 font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
          Projects
        </h2>
        <ul className="flex flex-col gap-5">
          {projects.map((p) => (
            <li key={p.slug} className="flex flex-col gap-2">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="text-base font-medium">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="hover:text-[var(--color-primary)] underline-offset-4 hover:underline"
                  >
                    {p.name}
                  </Link>
                  <span className="ml-2 text-[var(--color-fg)]/70">— {p.tagline}</span>
                </p>
                <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
                  {p.statusLabel} · {p.year}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[var(--color-fg)]/85">
                {p.description}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <li
                    key={s}
                    className="resume-pill border border-[var(--color-border)] px-2 py-0.5 font-mono text-[10px] tracking-wide text-[var(--color-fg)]/75"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <p className="font-mono text-[10px] tracking-wide text-[var(--color-muted)]">
                {p.liveUrl ? (
                  <>
                    Live:{" "}
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[var(--color-primary)]"
                    >
                      {p.liveUrl.replace(/^https?:\/\//, "")}
                    </a>{" "}
                    ·{" "}
                  </>
                ) : null}
                Source:{" "}
                <a
                  href={p.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--color-primary)]"
                >
                  {p.repoUrl.replace(/^https?:\/\/github\.com\//, "github.com/")}
                </a>
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ACTIVITIES */}
      <section className="mb-8 border-t-2 border-[var(--color-border)] pt-6">
        <h2 className="mb-4 font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
          Activities & Leadership
        </h2>
        <ul className="flex flex-col gap-4">
          {activities.map((a) => (
            <li key={a.id} className="flex flex-col gap-1">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="text-sm font-medium">{a.role}</p>
                <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
                  {formatDateRange(a.from, a.to)}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[var(--color-fg)]/80">{a.blurb}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* AWARDS — rendered only if non-empty */}
      {awards.length > 0 && (
        <section className="mb-8 border-t-2 border-[var(--color-border)] pt-6">
          <h2 className="mb-4 font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Awards & Recognition
          </h2>
          <ul className="flex flex-col gap-3">
            {awards.map((a) => (
              <li key={a.id} className="flex flex-col gap-1">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="text-sm font-medium">
                    {a.title}
                    {a.pending && (
                      <span className="ml-2 font-mono text-[10px] tracking-[0.25em] text-[var(--color-primary)] uppercase">
                        (pending)
                      </span>
                    )}
                  </p>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
                    {a.org} · {a.year}
                  </span>
                </div>
                {a.blurb && (
                  <p className="text-sm leading-relaxed text-[var(--color-fg)]/75">{a.blurb}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* SKILLS */}
      <section className="border-t-2 border-[var(--color-border)] pt-6">
        <h2 className="mb-4 font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
          Skills
        </h2>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {RESUME.skillGroups.map((g) => (
            <div key={g.label} className="flex flex-col gap-2">
              <dt className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
                {g.label}
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-1.5">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="resume-pill border border-[var(--color-border)] px-2 py-0.5 font-mono text-[10px] tracking-wide text-[var(--color-fg)]/85"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* FOOTER stamp */}
      <footer className="resume-print-hide mt-8 border-t-2 border-[var(--color-border)] pt-4">
        <p className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
          Last reviewed {siteConfig.lastReviewedISO} · Source of truth: this page
        </p>
      </footer>
    </article>
  );
}
