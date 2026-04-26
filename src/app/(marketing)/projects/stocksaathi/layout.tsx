/**
 * StockSaathi project layout — applies the teal theme-world
 * to every descendant. Shell (Nav/Footer) stays on site-default
 * because it lives in the marketing layout above.
 *
 * Paints bg + fg explicitly via the project tokens so the theme is
 * self-contained: re-binding --color-bg / --color-fg here means the
 * page can't accidentally render with a different theme's background
 * if root tokens ever change. (The cream-themed BolHisaab page hit
 * exactly that bug — invisible dark-on-dark text.)
 */
export default function StockSaathiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-stocksaathi flex min-h-screen flex-col bg-[var(--color-bg)] text-[var(--color-fg)]">
      {children}
    </div>
  );
}
