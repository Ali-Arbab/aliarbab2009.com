"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

/**
 * Toggle button for switching between light and dark brutalist modes.
 *
 * - Reads data-theme from <html> on mount (set by ThemeScript pre-paint)
 * - Click flips it + persists to localStorage
 * - Respects prefers-reduced-motion (no transition)
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = (document.documentElement.dataset.theme as Theme) || "dark";
    setTheme(current);
  }, []);

  const toggle = () => {
    // Read the LIVE data-theme attribute at click time rather than relying
    // on React state. ThemeScript writes data-theme pre-paint and any
    // intermediate route navigation can mutate it; relying on closure
    // state introduced a 2-click bug where the first click "computed"
    // the next theme from a stale value, set it to the SAME visual state,
    // and only the second click actually flipped.
    const current: Theme = (document.documentElement.dataset.theme as Theme) || (theme ?? "dark");
    const next: Theme = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* localStorage may be disabled — ignore */
    }
    setTheme(next);
  };

  // Before hydration, render an invisible placeholder so layout doesn't shift
  if (theme === null) {
    return (
      <span
        aria-hidden
        data-theme-toggle
        className="no-print inline-block h-8 w-8 border border-[var(--color-border)]"
      />
    );
  }

  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      data-theme-toggle
      className={cn(
        "no-print",
        "relative inline-flex h-8 w-8 items-center justify-center",
        "border border-[var(--color-border)]",
        "bg-transparent text-[var(--color-fg)]",
        "transition-colors hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-fg)]",
      )}
    >
      {theme === "dark" ? (
        /* sun */
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        /* moon */
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
