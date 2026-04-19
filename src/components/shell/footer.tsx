import Link from "next/link";

import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--color-border)]/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-sm">
            ali arbab<span className="text-[var(--color-muted)]">.com</span>
          </p>
          <p className="text-xs text-[var(--color-muted)]">
            {siteConfig.shortDescription}
          </p>
        </div>

        <ul className="flex items-center gap-5 text-sm text-[var(--color-muted)]">
          <li>
            <Link
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[var(--color-fg)]"
            >
              GitHub
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="transition-colors hover:text-[var(--color-fg)]"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/resume"
              className="transition-colors hover:text-[var(--color-fg)]"
            >
              Resume
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
