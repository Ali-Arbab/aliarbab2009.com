import { MILESTONES, getNextMilestone } from "@/config/milestones";
import { LiveCountdown } from "@/components/shell/live-countdown";

/**
 * NowBar — a live status strip on the home hero.
 *
 * Shows:
 *   • Class XII marker
 *   • Next AP exam with a live countdown (ticks every second on the client)
 *
 * No college milestones, no application timelines. Purely academic
 * neutral information. Reads from `milestones.ts`, no external fetch.
 */
export function NowBar() {
  const nextMilestone = getNextMilestone();
  const allAPsPassed = MILESTONES.every((m) => new Date(m.at).getTime() < Date.now());

  return (
    <div className="flex flex-wrap items-center gap-3 text-xs">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-1 font-mono text-[var(--color-muted)]">
        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-primary)]" />
        class XII
      </span>

      {nextMilestone && (
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-1">
          <span className="font-mono text-[var(--color-muted)]">next AP:</span>
          <span className="font-mono font-medium">{nextMilestone.label}</span>
          <span className="text-[var(--color-muted)]">in</span>
          <LiveCountdown
            iso={nextMilestone.at}
            seconds
            className="text-[var(--color-primary)]"
          />
        </span>
      )}

      {allAPsPassed && (
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-success)]/40 bg-[var(--color-success)]/10 px-3 py-1 text-[var(--color-success)]">
          <span className="font-mono">APs done ✓</span>
        </span>
      )}
    </div>
  );
}
