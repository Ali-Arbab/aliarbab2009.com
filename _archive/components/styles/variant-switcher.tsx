"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const VARIANTS = [
  { href: "/", label: "01 / neon minimal", key: "/" },
  { href: "/styles/editorial", label: "02 / editorial", key: "/styles/editorial" },
  { href: "/styles/cyberpunk", label: "03 / cyberpunk", key: "/styles/cyberpunk" },
  { href: "/styles/brutalist", label: "04 / brutalist", key: "/styles/brutalist" },
] as const;

/**
 * Persistent switcher chip at the top of every aesthetic-variant page.
 * Lets Ali hop between the four variants in one click to compare them.
 * Deleted once a winner is picked.
 */
export function VariantSwitcher() {
  const pathname = usePathname();

  return (
    <div className="pointer-events-none fixed top-0 right-0 left-0 z-50 flex justify-center px-3 pt-3">
      <nav
        aria-label="Aesthetic variant switcher"
        className="pointer-events-auto flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-white/20 bg-black/70 p-1 text-[11px] font-mono text-white shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md"
      >
        <span className="px-3 py-1.5 text-white/50">variant:</span>
        {VARIANTS.map((v) => {
          const active = pathname === v.key;
          return (
            <Link
              key={v.key}
              href={v.href}
              className={cn(
                "rounded-full px-3 py-1.5 whitespace-nowrap transition-colors",
                active
                  ? "bg-white text-black"
                  : "text-white/70 hover:bg-white/10 hover:text-white",
              )}
              aria-current={active ? "page" : undefined}
            >
              {v.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
