"use client";

import { useEffect, useState } from "react";

/**
 * <CommandPaletteTrigger /> — small button in the nav that opens
 * the command palette via a "open-command-palette" custom window
 * event the <CommandPalette /> listens for.
 *
 * The kbd hint reads "⌘K" on Mac, "Ctrl+K" elsewhere — detected on
 * mount so SSR markup is stable. While platform is undetermined we
 * render the generic 'K' to avoid layout shift.
 */
export function CommandPaletteTrigger() {
  const [isMac, setIsMac] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  function open() {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new Event("open-command-palette"));
  }

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Open command palette"
      className="inline-flex items-center gap-2 border border-[var(--color-border)] bg-transparent px-2 py-1 font-mono text-[10px] tracking-[0.15em] text-[var(--color-muted)] uppercase transition-colors hover:border-[var(--color-fg)] hover:text-[var(--color-fg)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)] focus:outline-none"
    >
      <span className="hidden sm:inline">Search</span>
      <kbd className="font-mono text-[10px] text-[var(--color-fg)]/80">
        {isMac === null ? "K" : isMac ? "⌘K" : "Ctrl+K"}
      </kbd>
    </button>
  );
}
