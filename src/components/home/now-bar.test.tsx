// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

import { NowBar } from "./now-bar";

afterEach(() => {
  cleanup();
});

/**
 * NowBar is a server component that calls getNextMilestone() at render
 * time. Tests freeze the clock so we can assert the rendered state for
 * specific calendar moments without flake.
 *
 * The "Next AP" branch and the "all four sat" fallback are exercised by
 * setting the system clock before/after the May 2026 AP window.
 */

describe("<NowBar />", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the school-year label", () => {
    vi.setSystemTime(new Date("2026-04-25T08:00:00"));
    render(<NowBar />);
    expect(screen.getByText(/Class XII · final year/)).toBeInTheDocument();
  });

  it("renders 'Now' / 'Live' chrome labels", () => {
    vi.setSystemTime(new Date("2026-04-25T08:00:00"));
    render(<NowBar />);
    expect(screen.getByText(/^Now$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Live$/i)).toBeInTheDocument();
  });

  it("shows the Next AP block when there's an upcoming exam", () => {
    vi.setSystemTime(new Date("2026-04-25T08:00:00"));
    render(<NowBar />);
    // Soonest milestone is AP Calculus BC (May 11)
    expect(screen.getByText(/^Next AP$/i)).toBeInTheDocument();
    expect(screen.getByText(/AP Calculus BC/)).toBeInTheDocument();
  });

  it("walks to the next exam after one passes", () => {
    vi.setSystemTime(new Date("2026-05-12T08:00:00")); // after Calc BC
    render(<NowBar />);
    expect(screen.getByText(/AP Physics C: Mechanics/)).toBeInTheDocument();
  });

  it("flips to '✓ all four sat' after the last exam", () => {
    vi.setSystemTime(new Date("2026-05-16T00:00:00")); // day after CSA
    render(<NowBar />);
    expect(screen.getByText(/✓ all four sat/i)).toBeInTheDocument();
    // Should NOT contain the Next AP chrome anymore
    expect(screen.queryByText(/^Next AP$/i)).toBeNull();
  });

  it("uses semantic <aside> with aria-label", () => {
    vi.setSystemTime(new Date("2026-04-25T08:00:00"));
    const { container } = render(<NowBar />);
    const aside = container.querySelector("aside");
    expect(aside).not.toBeNull();
    expect(aside).toHaveAttribute("aria-label", "Current status");
  });
});
