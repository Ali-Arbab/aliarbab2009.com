import { ThemeToggleScript } from "@/components/shell/theme-toggle-script";

/**
 * Toggle button for switching between dark + light brutalist modes.
 *
 * Pure DOM, server-rendered. No "use client", no React state, no
 * useEffect. The button is plain static HTML; clicks are bound by
 * <ThemeToggleScript /> via an inline <script> that runs at HTML
 * parse time, right after the button. Both SVG icons are always
 * rendered; globals.css picks the visible one via :root[data-theme].
 * aria-label specialises post-bind via syncLabel() in the inline
 * script — no React state involved.
 *
 * Why no nonce prop / async layouts: an earlier attempt plumbed a
 * per-request CSP nonce in via async layouts (root + marketing).
 * That triggered React error #418 hydration cascades on cold loads
 * that nuked the inline scripts entirely. Reverted. CSP is currently
 * report-only (middleware ENFORCE_CSP=false), so an nonce-less inline
 * script logs a violation report but still executes. When CSP gets
 * enforced, switch to a different binding strategy (delegated body
 * listener, etc.) — don't re-introduce the async layout pattern.
 */
export function ThemeToggle() {
  return (
    <>
      <button
        type="button"
        data-theme-toggle
        aria-label="Toggle theme"
        title="Toggle theme"
        className="no-print relative inline-flex h-8 w-8 items-center justify-center border border-[var(--color-border)] bg-transparent text-[var(--color-fg)] transition-colors hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-fg)]"
      >
        {/* Sun — visible only when :root[data-theme="dark"]. */}
        <svg
          data-theme-toggle-sun
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
        {/* Moon — visible only when :root[data-theme="light"]. */}
        <svg
          data-theme-toggle-moon
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>
      <ThemeToggleScript />
    </>
  );
}
