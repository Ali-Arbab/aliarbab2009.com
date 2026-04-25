import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Resume",
  description:
    "Class XII student with four AP exams in progress and three live projects in AI, voice, and IoT. Download the one-page resume as PDF or read it on this page.",
  path: "/resume",
  ogImage: "/og/resume.png",
  ogImageAlt: "Resume of Ali Arbab — Class XII builder",
});

export default function ResumePage() {
  return (
    <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-16 pb-16 sm:pt-20">
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
            Section
          </p>
          <p className="font-mono text-sm font-medium">/resume</p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Format
          </p>
          <p className="font-mono text-sm font-medium">PDF · single page</p>
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

      {/* § 01 — HEADLINE */}
      <section className="mb-16 grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 01
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            CV
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <h1
            className="text-[clamp(3rem,7vw,6rem)] leading-[0.9] font-medium tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Resume.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-fg)]/85">
            The downloadable PDF is being finalized and will live at this URL shortly. Use the
            full admissions-ready narrative at{" "}
            <Link
              href="/about"
              className="underline decoration-2 underline-offset-4 hover:text-[var(--color-primary)]"
            >
              /about
            </Link>{" "}
            in the meantime.
          </p>
        </div>
      </section>

      {/* § 02 — PLACEHOLDER */}
      <section className="grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 02
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            PDF
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <div className="border-2 border-dashed border-[var(--color-border)] p-10 text-center">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
              Resume PDF — coming soon
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg)]/75">
              Inline PDF viewer + prominent download + HTML-accessible fallback. Ships in Phase 3
              once the PDF is finalized and scrubbed of address/phone/school metadata.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
