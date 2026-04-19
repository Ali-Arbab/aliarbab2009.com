import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Contact",
  description: "Get in touch — form + email + socials.",
};

export default function ContactPage() {
  return (
    <article className="mx-auto w-full max-w-2xl px-6 pt-20 pb-16">
      <header className="flex flex-col gap-6">
        <p className="font-mono text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase">
          Contact
        </p>
        <h1 className="font-display text-5xl leading-tight tracking-tight sm:text-6xl">
          Say hi.
        </h1>
        <p className="text-lg leading-relaxed text-[var(--color-muted)]">
          Reach out any time &mdash; a short note, a project question, or &ldquo;I&apos;d like to chat&rdquo; is all
          welcome. I reply within 48 hours.
        </p>
      </header>

      <section className="mt-12 grid gap-3 text-sm">
        <a
          href={`mailto:${siteConfig.email}`}
          className="group flex items-center justify-between rounded-[var(--radius-base)] border border-[var(--color-border)] bg-[var(--color-surface-2)] px-5 py-4 transition-colors hover:border-[var(--color-primary)]"
        >
          <span className="flex flex-col">
            <span className="text-xs text-[var(--color-muted)]">Email</span>
            <span className="font-mono">{siteConfig.email}</span>
          </span>
          <span className="text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-primary)]">
            →
          </span>
        </a>

        <a
          href={siteConfig.github}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-between rounded-[var(--radius-base)] border border-[var(--color-border)] bg-[var(--color-surface-2)] px-5 py-4 transition-colors hover:border-[var(--color-primary)]"
        >
          <span className="flex flex-col">
            <span className="text-xs text-[var(--color-muted)]">GitHub</span>
            <span className="font-mono">@{siteConfig.githubHandle}</span>
          </span>
          <span className="text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-primary)]">
            →
          </span>
        </a>
      </section>

      <section className="mt-10 rounded-[var(--radius-base)] border border-dashed border-[var(--color-border)] p-6">
        <p className="font-mono text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase">
          Contact form — coming soon
        </p>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          A proper form (name / email / message) with Resend delivery ships in Phase 3.
        </p>
      </section>
    </article>
  );
}
