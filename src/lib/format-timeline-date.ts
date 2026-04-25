/**
 * formatTimelineDate — turns an ISO date string ("YYYY-MM" or
 * "YYYY-MM-DD") into a compact "Mon YYYY" label for the journey
 * timeline.
 *
 * Pure function. Independent of locale (English month abbreviations
 * are baked in) so output is stable regardless of where the build
 * runs or where the visitor is.
 *
 * Extracted from src/components/about/journey-section.tsx so it can
 * be unit-tested independently.
 */

const MONTH_ABBR = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export function formatTimelineDate(iso: string): string {
  const [year, month] = iso.split("-");
  const monthIndex = month ? parseInt(month, 10) - 1 : 0;
  const safeIndex = Number.isFinite(monthIndex) && monthIndex >= 0 && monthIndex <= 11 ? monthIndex : 0;
  return `${MONTH_ABBR[safeIndex]} ${year}`;
}
