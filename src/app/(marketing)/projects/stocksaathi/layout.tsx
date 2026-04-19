/**
 * StockSaathi project layout — applies the teal theme-world
 * to every descendant. Shell (Nav/Footer) stays on site-default
 * because it lives in the marketing layout above.
 */
export default function StockSaathiLayout({ children }: { children: React.ReactNode }) {
  return <div className="theme-stocksaathi flex min-h-full flex-col">{children}</div>;
}
