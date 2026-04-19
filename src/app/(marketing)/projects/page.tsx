import Link from "next/link";

import { PROJECTS } from "@/config/projects";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Projects",
  description: "Three project worlds: StockSaathi, BolHisaab, and MagLock Protocol.",
};

export default function ProjectsIndexPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pt-20 pb-16">
      <header className="mb-12 flex flex-col gap-3">
        <p className="font-mono text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase">
          Projects
        </p>
        <h1 className="font-display text-5xl leading-tight tracking-tight sm:text-6xl">
          Three worlds.
        </h1>
        <p className="max-w-2xl text-lg text-[var(--color-muted)]">
          Each one picks a specific audience and ships for them. Click in — each project page
          inverts the site&apos;s palette, typography, and motion into its own world.
        </p>
      </header>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className={cn(
                "group flex h-full flex-col justify-between gap-5 rounded-[var(--radius-base)]",
                "border border-[var(--color-border)] bg-[var(--color-surface-2)] p-6",
                "transition-[border-color,box-shadow,transform] duration-300",
                "hover:-translate-y-1 hover:border-[var(--tile-accent)]",
                "hover:shadow-[0_20px_60px_-20px_var(--tile-glow)]",
              )}
              style={
                {
                  "--tile-accent": project.primaryColor,
                  "--tile-glow": `${project.primaryColor}80`,
                } as React.CSSProperties
              }
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Badge variant={project.status === "live" ? "live" : "muted"}>
                    {project.statusLabel}
                  </Badge>
                  <span className="font-mono text-xs text-[var(--color-muted)]">
                    {project.year}
                  </span>
                </div>

                <h2
                  className="text-2xl font-semibold tracking-tight transition-colors"
                  style={{ color: "var(--color-fg)" }}
                >
                  {project.name}
                </h2>

                <p className="text-sm text-[var(--color-muted)]">{project.tagline}</p>
                <p className="text-sm leading-relaxed text-[var(--color-fg)]/80">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.stack.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[var(--color-border)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-muted)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
