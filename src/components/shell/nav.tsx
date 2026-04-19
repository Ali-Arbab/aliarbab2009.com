import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Nav() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "border-b border-[var(--color-border)]/60",
        "bg-[var(--color-bg)]/80 backdrop-blur-md",
        "supports-[backdrop-filter]:bg-[var(--color-bg)]/60",
      )}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight transition-colors hover:text-[var(--color-primary)]"
        >
          ali arbab
          <span className="ml-1 text-[var(--color-muted)]">.com</span>
        </Link>

        <ul className="flex items-center gap-6 text-sm">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
