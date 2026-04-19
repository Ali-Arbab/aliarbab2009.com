export const metadata = {
  title: "Resume",
  description: "Download Ali Arbab's resume (PDF).",
};

export default function ResumePage() {
  return (
    <article className="mx-auto w-full max-w-2xl px-6 pt-20 pb-16">
      <header className="flex flex-col gap-6">
        <p className="font-mono text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase">
          Resume
        </p>
        <h1 className="font-display text-5xl leading-tight tracking-tight sm:text-6xl">
          Resume.
        </h1>
        <p className="text-lg leading-relaxed text-[var(--color-muted)]">
          The downloadable PDF is being finalized and will live at this URL shortly.
        </p>
      </header>

      <section className="mt-12 rounded-[var(--radius-base)] border border-dashed border-[var(--color-border)] p-6">
        <p className="font-mono text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase">
          Coming soon
        </p>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Inline PDF viewer + prominent download + HTML-accessible fallback. Ships in Phase 3.
        </p>
      </section>
    </article>
  );
}
