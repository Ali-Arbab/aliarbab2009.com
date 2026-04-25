// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";

import { CommandPaletteTrigger } from "./command-palette-trigger";

afterEach(() => {
  cleanup();
});

/**
 * CommandPaletteTrigger:
 *   - Opens the palette by dispatching an "open-command-palette" custom
 *     event on window (decoupled — palette listens for it).
 *   - Renders a kbd hint that's '⌘K' on Mac, 'Ctrl+K' elsewhere.
 *     During SSR (isMac === null) it renders 'K' alone to avoid layout
 *     shift on hydrate.
 */

describe("<CommandPaletteTrigger />", () => {
  it("renders a button labelled 'Open command palette'", () => {
    render(<CommandPaletteTrigger />);
    expect(screen.getByRole("button", { name: /open command palette/i })).toBeInTheDocument();
  });

  it("dispatches 'open-command-palette' on the window when clicked", () => {
    const listener = vi.fn();
    window.addEventListener("open-command-palette", listener);

    render(<CommandPaletteTrigger />);
    fireEvent.click(screen.getByRole("button", { name: /open command palette/i }));

    expect(listener).toHaveBeenCalledTimes(1);
    window.removeEventListener("open-command-palette", listener);
  });

  it("renders a <kbd> hint inside the button", () => {
    render(<CommandPaletteTrigger />);
    const btn = screen.getByRole("button", { name: /open command palette/i });
    expect(btn.querySelector("kbd")).not.toBeNull();
  });

  it("kbd hint shows '⌘K' on a Mac platform", () => {
    Object.defineProperty(window.navigator, "platform", {
      value: "MacIntel",
      configurable: true,
    });
    render(<CommandPaletteTrigger />);
    const kbd = screen.getByRole("button", { name: /open command palette/i }).querySelector("kbd");
    expect(kbd?.textContent).toBe("⌘K");
  });

  it("kbd hint shows 'Ctrl+K' on non-Mac platforms", () => {
    Object.defineProperty(window.navigator, "platform", {
      value: "Win32",
      configurable: true,
    });
    render(<CommandPaletteTrigger />);
    const kbd = screen.getByRole("button", { name: /open command palette/i }).querySelector("kbd");
    expect(kbd?.textContent).toBe("Ctrl+K");
  });

  it("button has type=button so it can't accidentally submit a form", () => {
    render(<CommandPaletteTrigger />);
    expect(screen.getByRole("button", { name: /open command palette/i })).toHaveAttribute(
      "type",
      "button",
    );
  });
});
