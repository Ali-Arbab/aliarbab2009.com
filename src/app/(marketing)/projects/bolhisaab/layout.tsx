export default function BolHisaabLayout({ children }: { children: React.ReactNode }) {
  // The .theme-bolhisaab class re-binds --color-bg to cream (#fafaf9) and
  // --color-fg to near-black (#18181b). We MUST paint that background here
  // — otherwise the parent body's dark bg shows through and the dark
  // foreground text reads dark-on-dark (invisible). StockSaathi and
  // MagLock use dark backgrounds in both root and project tokens, so they
  // don't hit this. BolHisaab's cream-themed world is the only page that
  // needs the explicit bg+fg paint at the wrapper level.
  return (
    <div className="theme-bolhisaab flex min-h-screen flex-col bg-[var(--color-bg)] text-[var(--color-fg)]">
      {children}
    </div>
  );
}
