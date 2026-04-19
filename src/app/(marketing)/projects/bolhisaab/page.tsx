import Link from "next/link";

import { getProjectBySlug } from "@/config/projects";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const project = getProjectBySlug("bolhisaab")!;

export const metadata = {
  title: project.name,
  description: project.tagline,
};

export default function BolHisaabPage() {
  return (
    <article className="mx-auto w-full max-w-6xl px-6 pt-20 pb-16">
      <header className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="primary">◐ {project.statusLabel}</Badge>
          <span className="font-mono text-xs text-[var(--color-muted)]">{project.year}</span>
        </div>
        <h1 className="font-display text-5xl leading-tight tracking-tight text-[var(--color-primary)] sm:text-7xl">
          {project.name}
        </h1>
        <p className="max-w-3xl text-xl leading-relaxed text-[var(--color-fg)]">
          {project.tagline}.
        </p>
        <p className="max-w-3xl text-base leading-relaxed text-[var(--color-muted)]">
          {project.description}
        </p>
      </header>

      <section className="mt-14 flex flex-wrap items-center gap-3 text-sm">
        <Link
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: "primary", size: "md" }))}
        >
          View source on GitHub
        </Link>
      </section>

      <section className="mt-16 rounded-[var(--radius-base)] border border-dashed border-[var(--color-border)] p-8 text-center">
        <p className="font-mono text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase">
          Case study — coming soon
        </p>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          An interactive voice demo, the full architecture (Groq Whisper → intent parser →
          Supabase → Hindi TTS), screenshots, and a code walkthrough of the Hindi intent parser
          ship in Phase 2.
        </p>
      </section>
    </article>
  );
}
