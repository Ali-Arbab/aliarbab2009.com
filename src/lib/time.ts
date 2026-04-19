/**
 * Pure time utilities — zero external input.
 *
 * All countdown math on aliarbab2009.com runs through these functions.
 * ISO dates live in src/config/milestones.ts and are baked into the
 * bundle at build time. The client ticks purely from `new Date()`
 * on a setInterval — no fetches, no server round-trips.
 */

export type TimeRemaining = {
  ms: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  past: boolean;
};

/**
 * Compute time remaining until an ISO date.
 * If `now` is omitted, uses the current wall clock.
 *
 * The returned `past` boolean flips true once the target is reached,
 * which components use to switch from countdown display to "✓ done".
 */
export function timeUntil(iso: string, now: Date = new Date()): TimeRemaining {
  const target = new Date(iso).getTime();
  const ms = target - now.getTime();
  const past = ms < 0;
  const absMs = Math.abs(ms);

  return {
    ms,
    days: Math.floor(absMs / 86_400_000),
    hours: Math.floor((absMs % 86_400_000) / 3_600_000),
    minutes: Math.floor((absMs % 3_600_000) / 60_000),
    seconds: Math.floor((absMs % 60_000) / 1000),
    past,
  };
}

/**
 * Format a TimeRemaining as a compact human string.
 *
 * Examples:
 *   { days: 21, hours: 4, minutes: 12, seconds: 7 } → "21d 4h 12m 07s"
 *   { days: 0, hours: 2, minutes: 15, seconds: 3 }  → "2h 15m 03s"
 *   { past: true }                                   → "✓"
 */
export function formatTimeRemaining(
  t: TimeRemaining,
  opts: { seconds?: boolean; compact?: boolean } = {},
): string {
  if (t.past) return "✓";
  const showSeconds = opts.seconds ?? true;
  const compact = opts.compact ?? false;

  const pad = (n: number) => n.toString().padStart(2, "0");

  const parts: string[] = [];
  if (t.days > 0) parts.push(`${t.days}d`);
  if (t.hours > 0 || t.days > 0) parts.push(`${t.hours}h`);
  if (t.minutes > 0 || t.hours > 0 || t.days > 0) {
    parts.push(compact ? `${pad(t.minutes)}m` : `${t.minutes}m`);
  }
  if (showSeconds) parts.push(`${pad(t.seconds)}s`);

  return parts.join(" ");
}

/**
 * Format an ISO string as a human-readable absolute date, locale-safe.
 * Used in <time datetime={...}> tooltips so users can verify the exact date.
 */
export function formatAbsoluteDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
