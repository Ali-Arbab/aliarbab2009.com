import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { ResumeActions } from "@/components/resume/resume-actions";
import { ResumeEmbed } from "@/components/resume/resume-embed";
import { JsonLd } from "@/components/seo/json-ld";
import { resumeJsonLd } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Resume",
  description:
    "Class XII student with four AP exams in progress and three live projects in AI, voice, and IoT. Read the resume on this page or print to PDF.",
  path: "/resume",
  ogImage: "/og/resume.png",
  ogImageAlt: "Resume of Ali Arbab — Class XII builder",
});

export default function ResumePage() {
  return (
    <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-16 pb-16 sm:pt-20">
      <JsonLd data={resumeJsonLd()} />
      <div className="brutalist-grid resume-print-hide" aria-hidden />

      {/* MASTHEAD */}
      <header className="resume-print-hide mb-16 grid grid-cols-12 gap-4 border-b-2 border-[var(--color-border)] pb-6">
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
          <p className="font-mono text-sm font-medium">HTML · print-ready</p>
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
      <section className="resume-print-hide mb-12 grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 01
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            CV
          </p>
        </div>
        <div className="col-span-12 flex flex-col gap-6 md:col-span-10">
          <h1
            className="text-[clamp(3rem,7vw,6rem)] leading-[0.9] font-medium tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Resume.
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-fg)]">
            One page, no buzzword stack. The HTML version below is the source of truth — it&apos;s
            searchable, indexable, and prints cleanly. For a fuller narrative, see{" "}
            <Link
              href="/about"
              className="underline decoration-2 underline-offset-4 hover:text-[var(--color-primary)]"
            >
              /about
            </Link>
            .
          </p>
          <ResumeActions />
        </div>
      </section>

      {/* § 02 — RESUME BODY */}
      <section className="grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10 print:border-0 print:pt-0">
        <div className="resume-print-hide col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 02
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Body
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <ResumeEmbed />
        </div>
      </section>
    </div>
  );
}
