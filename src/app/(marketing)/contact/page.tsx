import Link from "next/link";

import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Contact",
  description: "Get in touch — form + email + socials.",
};

export default function ContactPage() {
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
          <p className="font-mono text-sm font-medium">/contact</p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Response
          </p>
          <p className="font-mono text-sm font-medium">within 48 hours</p>
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

      {/* § 01 — INTRO */}
      <section className="mb-16 grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 01
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Intro
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <h1
            className="text-[clamp(3rem,7vw,6rem)] leading-[0.9] font-medium tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Say hi.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-fg)]/85">
            Reach out any time &mdash; a short note, a project question, or &ldquo;I&apos;d like
            to chat&rdquo; is all welcome. I reply within 48 hours.
          </p>
        </div>
      </section>

      {/* § 02 — CHANNELS */}
      <section className="mb-16 grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 02
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Channels
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <ul className="grid grid-cols-1 gap-0 border-2 border-[var(--color-border)] md:grid-cols-2">
            <li className="border-b-2 border-[var(--color-border)] md:border-r-2 md:border-b-0">
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-baseline justify-between p-6 transition-colors hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-fg)]"
              >
                <span className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase group-hover:text-[var(--color-primary-fg)]">
                    Email
                  </span>
                  <span className="font-mono text-lg font-medium">{siteConfig.email}</span>
                </span>
                <span aria-hidden className="font-mono text-lg">
                  →
                </span>
              </a>
            </li>
            <li>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="group flex items-baseline justify-between p-6 transition-colors hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-fg)]"
              >
                <span className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase group-hover:text-[var(--color-primary-fg)]">
                    GitHub
                  </span>
                  <span className="font-mono text-lg font-medium">@{siteConfig.githubHandle}</span>
                </span>
                <span aria-hidden className="font-mono text-lg">
                  ↗
                </span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* § 03 — FORM PLACEHOLDER */}
      <section className="grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 03
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Form
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <div className="border-2 border-dashed border-[var(--color-border)] p-10 text-center">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
              Contact form — coming soon
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg)]/75">
              A proper form (name / email / message / honeypot) with Resend delivery ships in
              Phase 3. Until then, email works.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
