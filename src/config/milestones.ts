/**
 * Public academic milestones — single source of truth.
 *
 * These ISO strings are baked into the JavaScript bundle at build time.
 * The <LiveCountdown> component reads them and ticks purely from
 * new Date() on a client-side setInterval. No API calls, ever.
 *
 * Adding or moving a date here cascades to every countdown on the site
 * on the next deploy.
 *
 * HARD RULE: only neutral academic milestones appear here. No
 * application deadlines, no college-specific dates, no decision dates.
 * Private deadlines live in PRIVATE_CALENDAR.md (gitignored).
 */

export type Milestone = {
  id: string;
  label: string;
  at: string; // ISO string, offset-naive — browser renders as local time
  subLabel?: string;
};

export const MILESTONES: readonly Milestone[] = [
  {
    id: "ap-calc-bc",
    label: "AP Calculus BC",
    at: "2026-05-11T08:00:00",
    subLabel: "Morning session",
  },
  {
    id: "ap-phys-c-mech",
    label: "AP Physics C: Mechanics",
    at: "2026-05-13T08:00:00",
    subLabel: "Morning session",
  },
  {
    id: "ap-eng-lang",
    label: "AP English Language",
    at: "2026-05-13T12:00:00",
    subLabel: "Afternoon session",
  },
  {
    id: "ap-csa",
    label: "AP Computer Science A",
    at: "2026-05-15T12:00:00",
    subLabel: "Afternoon session",
  },
] as const;

/**
 * Find the next upcoming milestone (for the NowBar).
 * If all are in the past, returns null.
 */
export function getNextMilestone(now: Date = new Date()): Milestone | null {
  const future = MILESTONES.filter((m) => new Date(m.at).getTime() > now.getTime());
  if (future.length === 0) return null;
  return future.reduce((soonest, m) =>
    new Date(m.at).getTime() < new Date(soonest.at).getTime() ? m : soonest,
  );
}
