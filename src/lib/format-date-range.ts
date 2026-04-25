/**
 * formatDateRange — turns a (from, to?) pair of YYYY or YYYY-MM strings
 * into a compact human-readable range.
 *
 * Behaviour:
 *   - Both endpoints provided → "from–to" (e.g. "2024–2025")
 *   - Only `from` provided + `from` matches current year → bare year
 *   - Only `from` provided + `from` is past year → "from–present"
 *
 * Used by the resume embed (Activities & Leadership section). Pure
 * function — current-year detection uses `new Date()`, but at the
 * top of the call only; result is otherwise deterministic given the
 * inputs and clock.
 *
 * Extracted from src/components/resume/resume-embed.tsx so it can be
 * unit-tested independently.
 */
export function formatDateRange(from: string, to?: string): string {
  if (!to) {
    const currentYear = new Date().getFullYear().toString();
    return from === currentYear ? from : `${from}–present`;
  }
  return `${from}–${to}`;
}
