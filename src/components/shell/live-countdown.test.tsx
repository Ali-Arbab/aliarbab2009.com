// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render, screen } from "@testing-library/react";

import { LiveCountdown } from "./live-countdown";

afterEach(() => {
  cleanup();
});

/**
 * <LiveCountdown> ticks every 1000ms (or 60000ms under reduced-motion)
 * via setInterval. Tests use fake timers + vi.advanceTimersByTime to
 * verify both the initial render and the ticking behavior without
 * actual wall-clock waits.
 *
 * The component renders a <time datetime> element so screen readers
 * (and search crawlers) can read the absolute date — tested below.
 */

describe("<LiveCountdown />", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders a <time> element with datetime attribute", () => {
    vi.setSystemTime(new Date("2026-04-25T08:00:00"));
    const { container } = render(<LiveCountdown iso="2026-05-11T08:00:00" />);
    const time = container.querySelector("time");
    expect(time).not.toBeNull();
    expect(time).toHaveAttribute("datetime", "2026-05-11T08:00:00");
  });

  it("renders the formatted countdown string on initial mount", () => {
    vi.setSystemTime(new Date("2026-04-25T08:00:00"));
    render(<LiveCountdown iso="2026-04-26T08:00:00" />);
    // Exactly 1 day away → "1d 0h 0m 00s"
    expect(screen.getByText(/^1d 0h 0m 00s$/)).toBeInTheDocument();
  });

  it("renders ✓ when the target is in the past", () => {
    vi.setSystemTime(new Date("2026-05-12T00:00:00")); // after May 11
    render(<LiveCountdown iso="2026-05-11T08:00:00" />);
    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  it("ticks down — display updates after setInterval fires", () => {
    vi.setSystemTime(new Date("2026-04-25T08:00:00"));
    render(<LiveCountdown iso="2026-04-25T08:00:30" />);
    // Initial: 30 seconds away
    expect(screen.getByText(/30s/)).toBeInTheDocument();

    // Advance 5 seconds — countdown should now read 25s
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByText(/25s/)).toBeInTheDocument();
  });

  it("respects seconds={false} — no seconds field rendered", () => {
    vi.setSystemTime(new Date("2026-04-25T08:00:00"));
    render(<LiveCountdown iso="2026-04-26T08:00:00" seconds={false} />);
    // 1d 0h 0m, no s
    expect(screen.getByText(/^1d 0h 0m$/)).toBeInTheDocument();
  });

  it("renders an absolute-date title attribute for hover/screen-reader verification", () => {
    vi.setSystemTime(new Date("2026-04-25T08:00:00"));
    const { container } = render(<LiveCountdown iso="2026-05-11T08:00:00" />);
    const time = container.querySelector("time");
    // formatAbsoluteDate produces something like "Mon, May 11, 2026"
    expect(time?.getAttribute("title")).toMatch(/2026/);
    expect(time?.getAttribute("title")).toMatch(/May/);
  });
});
