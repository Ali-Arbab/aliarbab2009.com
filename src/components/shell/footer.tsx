import Link from "next/link";

import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-[var(--color-border)] py-8">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 px-6 text-xs sm:flex-row sm:items-center">
        <p className="font-mono tracking-[0.2em] text-[var(--color-muted)] uppercase">
          © 2026 / {siteConfig.author} / Set in Space Grotesk + JetBrains Mono
        </p>
        <ul className="flex items-center gap-5 font-mono tracking-[0.2em] text-[var(--color-muted)] uppercase">
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
            <Link href="/contact" className="transition-colors hover:text-[var(--color-fg)]">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/resume" className="transition-colors hover:text-[var(--color-fg)]">
              Resume
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
