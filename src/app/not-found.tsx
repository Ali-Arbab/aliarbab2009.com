import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative mx-auto flex min-h-dvh w-full max-w-[1400px] flex-col items-start justify-center gap-10 px-6 py-24">
      <div className="brutalist-grid" aria-hidden />

      <div className="grid w-full grid-cols-12 items-end gap-4 border-b-2 border-[var(--color-border)] pb-6">
        <p className="col-span-6 font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase md:col-span-3">
          Error · 404
        </p>
        <p className="col-span-6 font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase md:col-span-9">
          route not found
        </p>
      </div>

      <div className="grid w-full grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            §
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            404
          </p>
        </div>
        <div className="col-span-12 flex flex-col gap-8 md:col-span-10">
          <h1
            className="text-[clamp(4rem,10vw,9rem)] leading-[0.85] font-medium tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            No page <span className="text-[var(--color-primary)]">here.</span>
          </h1>
          <p className="max-w-prose text-lg leading-relaxed text-[var(--color-fg)]/80">
            Nothing lives at this path. Try the projects index or head home.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-3 border-2 border-[var(--color-border)] bg-[var(--color-primary)] px-5 py-3 font-mono text-xs tracking-[0.2em] text-[var(--color-primary-fg)] uppercase transition-transform hover:-translate-y-0.5"
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 border-2 border-[var(--color-border)] bg-transparent px-5 py-3 font-mono text-xs tracking-[0.2em] uppercase transition-colors hover:bg-[var(--color-border)] hover:text-[var(--color-bg)]"
            >
              Projects
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
