/**
 * MagLock project layout — applies the neon-green-on-pure-black theme.
 *
 * Paints bg + fg explicitly via the project tokens (see BolHisaab layout
 * for the bug this avoids).
 */
export default function MagLockLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-maglock flex min-h-screen flex-col bg-[var(--color-bg)] text-[var(--color-fg)]">
      {children}
    </div>
  );
}
