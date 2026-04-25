// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";

import { ResumeActions } from "./resume-actions";

afterEach(() => {
  cleanup();
});

/**
 * ResumeActions is a client component with two buttons:
 *   - Print · Save as PDF (always visible)
 *   - Download PDF (gated on RESUME.hasPDF)
 *
 * RESUME.hasPDF is currently false (PDF not finalized), so we test the
 * fallback: print button works, "PDF coming soon" notice is visible,
 * download button is NOT rendered.
 */

describe("<ResumeActions />", () => {
  it("renders the Print · Save as PDF button", () => {
    render(<ResumeActions />);
    expect(screen.getByRole("button", { name: /print/i })).toBeInTheDocument();
  });

  it("calls window.print() when the Print button is clicked", () => {
    // happy-dom doesn't define window.print by default — stub it.
    const printMock = vi.fn();
    Object.defineProperty(window, "print", { value: printMock, configurable: true });

    render(<ResumeActions />);
    fireEvent.click(screen.getByRole("button", { name: /print/i }));
    expect(printMock).toHaveBeenCalledTimes(1);
  });

  it("shows the 'PDF download — coming soon' fallback when RESUME.hasPDF is false", () => {
    render(<ResumeActions />);
    expect(screen.getByText(/PDF download — coming soon/i)).toBeInTheDocument();
  });

  it("does NOT render a Download PDF link when RESUME.hasPDF is false", () => {
    render(<ResumeActions />);
    expect(screen.queryByRole("link", { name: /download pdf/i })).toBeNull();
  });

  it("Print button has type=button so it can't accidentally submit a form", () => {
    render(<ResumeActions />);
    const btn = screen.getByRole("button", { name: /print/i });
    expect(btn).toHaveAttribute("type", "button");
  });
});
