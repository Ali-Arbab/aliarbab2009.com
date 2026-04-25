import { describe, expect, it } from "vitest";

import { formatTimelineDate } from "./format-timeline-date";

/**
 * formatTimelineDate is locale-independent (English month abbreviations
 * are baked in) so output is stable regardless of where the build runs
 * or where the visitor is. Tests cover the documented input shapes
 * + a few defensive cases.
 */

describe("formatTimelineDate", () => {
  it("formats YYYY-MM correctly", () => {
    expect(formatTimelineDate("2025-04")).toBe("Apr 2025");
  });

  it("formats YYYY-MM-DD by ignoring the day component", () => {
    expect(formatTimelineDate("2025-08-15")).toBe("Aug 2025");
  });

  it("handles January (month 01)", () => {
    expect(formatTimelineDate("2025-01")).toBe("Jan 2025");
  });

  it("handles December (month 12)", () => {
    expect(formatTimelineDate("2025-12")).toBe("Dec 2025");
  });

  it("falls back to Jan when month component is missing", () => {
    expect(formatTimelineDate("2025")).toBe("Jan 2025");
  });

  it("falls back to Jan when month component is out of range (defensive)", () => {
    // The clamp protects against malformed config entries
    expect(formatTimelineDate("2025-13")).toBe("Jan 2025");
    expect(formatTimelineDate("2025-00")).toBe("Jan 2025");
  });

  it("preserves four-digit year regardless of month input", () => {
    expect(formatTimelineDate("1999-06")).toBe("Jun 1999");
    expect(formatTimelineDate("2099-11")).toBe("Nov 2099");
  });
});
