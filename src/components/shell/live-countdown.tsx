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
 * - Initial render: shows the absolute date as text. Server and client
 *   both compute this from the static ISO string, so it's identical
 *   on both sides → no hydration text mismatch (which used to fire
 *   React error #418 because useState's initializer ran with
 *   different `new Date()` values on server vs. on client).
 * - On mount, swaps to the live ticker (1s interval, 60s under
 *   reduced-motion).
 * - On unmount, clears the interval.
 * - Past events render as "✓".
 * - Absolute date lives in a <time> tooltip so users can verify.
 */
export function LiveCountdown({ iso, label, seconds = true, className }: Props) {
  // Start with `null` so server and client render identically. The
  // useEffect below fills it in after hydration commits — no
  // hydration mismatch, no error #418.
  const [remaining, setRemaining] = useState<ReturnType<typeof timeUntil> | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const intervalMs = reducedMotion ? 60_000 : 1_000;

    const tick = () => setRemaining(timeUntil(iso));
    tick();
    const id = window.setInterval(tick, intervalMs);
    return () => window.clearInterval(id);
  }, [iso]);

  const absolute = formatAbsoluteDate(iso);
  // Pre-hydration / pre-mount: render the absolute date so server and
  // client always emit the same string. After mount, swap to the
  // ticking countdown.
  const formatted = remaining ? formatTimeRemaining(remaining, { seconds }) : absolute;

  return (
    <time
      dateTime={iso}
      title={absolute}
      className={cn(
        "inline-flex items-baseline gap-1.5 font-mono tabular-nums",
        remaining?.past && "text-[var(--color-success)]",
        className,
      )}
    >
      {label && <span className="text-[var(--color-muted)]">{label}</span>}
      <span>{formatted}</span>
    </time>
  );
}
