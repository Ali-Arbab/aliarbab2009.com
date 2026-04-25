import Link from "next/link";

import { ThemeToggle } from "@/components/shell/theme-toggle";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Nav() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "no-print",
        "border-b-2 border-[var(--color-border)]",
        "bg-[var(--color-bg)]/92 backdrop-blur-[6px]",
        "supports-[backdrop-filter]:bg-[var(--color-bg)]/80",
      )}
    >
      <nav className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight transition-colors hover:text-[var(--color-primary)]"
        >
          ali_arbab
          <span className="ml-1 text-[var(--color-muted)]">/2026</span>
        </Link>

        <div className="flex items-center gap-5 text-sm">
          <ul className="hidden items-center gap-5 font-mono text-[11px] tracking-[0.15em] uppercase sm:flex">
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
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
