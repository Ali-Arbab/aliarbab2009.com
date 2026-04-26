import type { Metadata } from "next";
import Link from "next/link";

import { getProjectBySlug } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { OriginBlock } from "@/components/project/origin-block";
import { JsonLd } from "@/components/seo/json-ld";
import { projectJsonLd } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/seo";

const project = getProjectBySlug("stocksaathi")!;

export const metadata: Metadata = buildMetadata({
  title: "StockSaathi — AI investment coach",
  description:
    "StockSaathi is a virtual rupee trading simulator with an AI coach trained on behavioral finance. Real-time data on 3,000+ BSE and NSE stocks.",
  path: "/projects/stocksaathi",
  ogImage: "/og/projects/stocksaathi.png",
  ogImageAlt: "StockSaathi — AI-coached investment simulator for Indian teens",
  ogType: "article",
  publishedTime: `${project.year}-09-01T00:00:00.000Z`,
  keywords: ["StockSaathi", "AI", "Investing", "Fintech", "Behavioral finance"],
});

export default function StockSaathiPage() {
  return (
    <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-16 pb-16 sm:pt-20">
      <JsonLd data={projectJsonLd("stocksaathi")} />
      <div className="brutalist-grid" aria-hidden />

      {/* MASTHEAD */}
      <header className="mb-16 grid grid-cols-12 gap-4 border-b-2 border-[var(--color-border)] pb-6">
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Author
          </p>
          <p className="font-mono text-sm font-medium">{siteConfig.author}</p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Project
          </p>
          <p className="font-mono text-sm font-medium">01 / {project.name}</p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Status
          </p>
          <p className="font-mono text-sm font-medium text-[var(--color-primary)]">
            ● {project.statusLabel}
          </p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Navigate
          </p>
          <p className="font-mono text-sm font-medium">
            <Link href="/projects" className="hover:text-[var(--color-primary)]">
              ← projects
            </Link>
          </p>
        </div>
      </header>

      {/* § 01 — HEADLINE + PITCH */}
      <section className="mb-20 grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 01
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Pitch
          </p>
        </div>
        <div className="col-span-12 flex flex-col gap-8 md:col-span-10">
          <h1
            className="text-[clamp(3rem,7vw,6rem)] leading-[0.9] font-medium tracking-[-0.02em] text-[var(--color-primary)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.name}
          </h1>
          <p
            className="max-w-3xl text-2xl leading-snug font-medium text-[var(--color-fg)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.tagline}.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            {project.description}
          </p>
        </div>
      </section>

      {/* § 02 — ACCESS (deploy + source) */}
      <section className="mb-20 grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 02
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Access
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <ul className="grid grid-cols-1 gap-0 border-2 border-[var(--color-border)] md:grid-cols-2">
            <li className="border-b-2 border-[var(--color-border)] p-6 md:border-r-2 md:border-b-0">
              <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
                Production
              </p>
              <Link
                href={project.liveUrl!}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-baseline gap-2 font-mono text-lg font-medium hover:text-[var(--color-primary)]"
              >
                stocksaathi.co.in <span aria-hidden>↗</span>
              </Link>
              <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
                Live at Vercel · 3,000+ BSE/NSE stocks
              </p>
            </li>
            <li className="p-6">
              <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
                Source
              </p>
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-baseline gap-2 font-mono text-lg font-medium hover:text-[var(--color-primary)]"
              >
                github.com/aliarbab2009/StockSaathi <span aria-hidden>↗</span>
              </Link>
              <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
                Vanilla JS · Python · Supabase · Groq LLM
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* § 03 — STACK */}
      <section className="mb-20 grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 03
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Stack
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <ul className="flex flex-wrap gap-0">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="-mr-px -mb-px border border-[var(--color-border)] px-4 py-2 font-mono text-[11px] tracking-[0.2em] uppercase"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* § 04 — ORIGIN (problem · why me · learned + pull-quote) */}
      <section className="mb-20 grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 04
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Origin
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <OriginBlock slug="stocksaathi" />
        </div>
      </section>

      {/* § 05 — CASE STUDY (Phase 1 prose lands May 16+) */}
      <section className="grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 05
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Case
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <div className="border-2 border-dashed border-[var(--color-border)] p-10 text-center">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
              Full case study — coming soon
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
              Architecture diagrams, live iframe embed, screenshot gallery, a demo video with
              chapter markers, a code walkthrough of the Groq streaming coach, and a challenges
              section ship in Phase 1 of the build (after APs, starts May 16).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
