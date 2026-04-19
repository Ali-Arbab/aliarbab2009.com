export const metadata = {
  title: "About",
  description: "The long version: three projects, a resume, and how I got here.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 pt-20 pb-16">
      <header className="flex flex-col gap-6">
        <p className="font-mono text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase">
          About
        </p>
        <h1 className="font-display text-5xl leading-tight tracking-tight sm:text-6xl">
          Hi — I&apos;m Ali.
        </h1>
        <p className="text-xl leading-relaxed text-[var(--color-muted)]">
          I&apos;m a Class XII student. This page is the long version of who I am and what
          I&apos;ve built. Whoever you are &mdash; admissions officer, recruiter, collaborator, curious
          reader &mdash; thanks for spending a few minutes of your day on this.
        </p>
      </header>

      <section className="mt-16 rounded-[var(--radius-base)] border border-dashed border-[var(--color-border)] p-8">
        <p className="font-mono text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase">
          The long version — coming soon
        </p>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Journey timeline, per-project &ldquo;why I built this&rdquo; essays, activities and awards, an
          academic snapshot with live AP countdowns, and the embedded resume ship in Phase 3.
        </p>
      </section>
    </article>
  );
}
