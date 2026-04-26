import type { Metadata } from "next";
import Link from "next/link";

import { PROJECTS } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Three projects across AI, voice, and IoT. StockSaathi coaches teen investors, BolHisaab takes Hindi voice ledger entries, and MagLock locks doors.",
  path: "/projects",
  ogImage: "/og/projects.png",
  ogImageAlt: "Three project worlds — StockSaathi, BolHisaab, MagLock Protocol",
});

export default function ProjectsIndexPage() {
  return (
    <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-16 pb-16 sm:pt-20">
      <div className="brutalist-grid" aria-hidden />

      {/* ============================================================
          MASTHEAD
          ============================================================ */}
      <header className="mb-16 grid grid-cols-12 gap-4 border-b-2 border-[var(--color-border)] pb-6">
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Author
          </p>
          <p className="font-mono text-sm font-medium">{siteConfig.author}</p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Section
          </p>
          <p className="font-mono text-sm font-medium">/projects</p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Count
          </p>
          <p className="font-mono text-sm font-medium">{PROJECTS.length} projects</p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Navigate
          </p>
          <p className="font-mono text-sm font-medium">
            <Link href="/" className="hover:text-[var(--color-primary)]">
              ← home
            </Link>
          </p>
        </div>
      </header>

      {/* ============================================================
          HEADLINE
          ============================================================ */}
      <section className="mb-16 grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 00
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Index
          </p>
        </div>
        <div className="col-span-12 flex flex-col gap-6 md:col-span-10">
          <h1
            className="text-[clamp(3rem,7vw,6rem)] leading-[0.9] font-medium tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Three worlds.
          </h1>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            Each project picks a specific audience and ships for them. Click into a tile to enter
            that project&apos;s own world — palette, typography, and motion all invert to its
            identity. The shell stays brutalist so you know you&apos;re still on Ali&apos;s site.
          </p>
        </div>
      </section>

      {/* ============================================================
          PROJECT TILES — full-width shared-border 3-col slab
          ============================================================ */}
      <section>
        <div className="grid grid-cols-12 gap-0 border-2 border-[var(--color-border)]">
          {PROJECTS.map((p, i) => (
            <article
              key={p.slug}
              className={
                "brutalist-glass-hover col-span-12 flex flex-col gap-6 border-[var(--color-border)] p-8 md:col-span-4" +
                (i < 2 ? " md:border-r-2" : "") +
                (i === 0 ? " border-b-2 md:border-b-0" : "") +
                (i === 1 ? " border-b-2 md:border-b-0" : "")
              }
            >
              <Link href={`/projects/${p.slug}`} className="flex h-full flex-col gap-6">
                <div className="flex items-baseline justify-between">
                  <p
                    className="font-mono text-[52px] leading-none font-medium tracking-[-0.04em]"
                    style={{
                      color: p.primaryColor,
                      fontFeatureSettings: "'ss01'",
                    }}
                  >
                    0{i + 1}
                  </p>
                  <span className="border border-[var(--color-border)] px-2 py-0.5 font-mono text-[9px] tracking-[0.25em] uppercase">
                    {p.statusLabel}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <h2
                    className="text-3xl leading-tight font-medium tracking-[-0.01em]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {p.name}
                  </h2>
                  <p className="text-sm leading-relaxed text-[var(--color-fg)]">{p.tagline}.</p>
                  <p className="text-[13px] leading-relaxed text-[var(--color-muted)]">
                    {p.description}
                  </p>
                </div>

                <div className="brutalist-rule" />

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
                  <div className="flex justify-between gap-4">
                    <dt className="text-[var(--color-muted)]">Accent</dt>
                    <dd className="text-right font-medium" style={{ color: p.primaryColor }}>
                      {p.primaryColor.toLowerCase()}
                    </dd>
                  </div>
                </dl>

                <span
                  className="mt-auto inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase"
                  style={{ color: p.primaryColor }}
                >
                  Enter world &rarr;
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
