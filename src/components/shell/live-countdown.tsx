"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { formatAbsoluteDate, formatTimeRemaining, timeUntil } from "@/lib/time";

type Props = {
  iso: string;
  label?: string;
  seconds?: boolean;
  className?: string;
};

/**
 * LiveCountdown — ticks purely from the client's local clock against
 * the ISO string baked into the bundle. No fetches, ever.
 *
 * - On mount, starts a 1s setInterval (60s under reduced-motion).
 * - On unmount, clears the interval.
 * - Past events render as "✓".
 * - Absolute date lives in a <time> tooltip so users can verify.
 */
export function LiveCountdown({ iso, label, seconds = true, className }: Props) {
  const [remaining, setRemaining] = useState(() => timeUntil(iso));

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const intervalMs = reducedMotion ? 60_000 : 1_000;

    const tick = () => setRemaining(timeUntil(iso));
    tick();
    const id = window.setInterval(tick, intervalMs);
    return () => window.clearInterval(id);
  }, [iso]);

  const absolute = formatAbsoluteDate(iso);
  const formatted = formatTimeRemaining(remaining, { seconds });

  return (
    <time
      dateTime={iso}
      title={absolute}
      className={cn(
        "inline-flex items-baseline gap-1.5 font-mono tabular-nums",
        remaining.past && "text-[var(--color-success)]",
        className,
      )}
    >
      {label && <span className="text-[var(--color-muted)]">{label}</span>}
      <span>{formatted}</span>
    </time>
  );
}
