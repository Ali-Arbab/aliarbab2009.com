/**
 * Journey timeline — surfaced in /about § Journey.
 *
 * Each entry is a meaningful inflection point: when something started,
 * a milestone reached, a project shipped, a project shelved.
 *
 * Edit-flow: add entries to the TIMELINE array below, push. /about
 * renders on next deploy. Sorted descending by date at render time —
 * source order can be anything but newest-first reads cleanest.
 *
 * Privacy: no school name, no city, no specific clubs that identify
 * the institution. "Built first Arduino project" → fine.
 * "Built Arduino project for [school name] club" → BLOCKED.
 *
 * Currently empty — Ali to populate. § Journey on /about will render
 * an empty-state notice until at least one entry lands here.
 *
 * Example shape (delete this comment when adding the first real entry):
 *   {
 *     date: "2026-04",
 *     title: "Short noun-phrase title",
 *     kind: "build",     // or "milestone" | "learn" | "shelve"
 *     note: "1-2 sentence concrete description, ~40-100 words.",
 *   },
 */

export type TimelineEntry = {
  /** ISO date (YYYY-MM or YYYY-MM-DD). Sorted descending — newest first. */
  date: string;
  /** Short noun-phrase title (under 60 chars). */
  title: string;
  /** 1-2 sentence note. ~40-100 words. Concrete > abstract. */
  note: string;
  /** Optional category for visual grouping. */
  kind?: "build" | "milestone" | "learn" | "shelve";
};

export const TIMELINE: readonly TimelineEntry[] = [];
