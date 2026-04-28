import Link from "next/link";

import { CommandPaletteTrigger } from "@/components/shell/command-palette-trigger";
import { ThemeToggle } from "@/components/shell/theme-toggle";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Site nav. Receives `nonce` and forwards it to <ThemeToggle> so the
 * inline theme-flip <script> can be CSP-allowed. The nonce comes from
 * the marketing layout, which awaits headers() at the top of its
 * server subtree. We deliberately don't read headers() here — that
 * would push <Nav> into RSC streaming and the toggle's inline script
 * would arrive AFTER hydration (silent first-click no-op on cold load).
 */
export function Nav({ nonce }: { nonce?: string }) {
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
          <CommandPaletteTrigger />
          <ThemeToggle nonce={nonce} />
        </div>
      </nav>
    </header>
  );
}
