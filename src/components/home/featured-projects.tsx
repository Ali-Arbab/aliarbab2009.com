import Link from "next/link";

import { PROJECTS } from "@/config/projects";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * FeaturedProjects — three large tiles on the home page.
 *
 * Each tile is themed to its project's primary color via inline CSS
 * custom properties (so the hover glow matches without loading the
 * full .theme-* block on the home page).
 */
export function FeaturedProjects() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="mb-10 flex items-end justify-between">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
          Three projects, three worlds
        </h2>
        <Link
          href="/projects"
          className="hidden text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)] sm:inline"
        >
          All projects →
        </Link>
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className={cn(
                "group flex h-full flex-col justify-between gap-6 rounded-[var(--radius-base)]",
                "border border-[var(--color-border)] bg-[var(--color-surface-2)]",
                "p-6 transition-[border-color,box-shadow,transform] duration-300",
                "hover:-translate-y-1 hover:border-[var(--tile-accent)]",
                "hover:shadow-[0_20px_60px_-20px_var(--tile-glow)]",
                "focus-visible:border-[var(--tile-accent)]",
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
                  <Badge
                    variant={project.status === "live" ? "live" : "muted"}
                    className="font-mono"
                  >
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
                    {project.statusLabel}
                  </Badge>
                  <span className="font-mono text-xs text-[var(--color-muted)]">
                    {project.year}
                  </span>
                </div>

                <h3
                  className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-[var(--tile-accent)]"
                  style={{
                    color: "var(--color-fg)",
                  }}
                >
                  {project.name}
                </h3>

                <p className="text-sm text-[var(--color-muted)]">
                  {project.tagline}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.stack.slice(0, 4).map((tech) => (
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
