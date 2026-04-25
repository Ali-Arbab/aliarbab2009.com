import { describe, expect, it } from "vitest";

import { cn } from "./utils";

/**
 * cn() composes clsx + tailwind-merge. Tests verify the conflict-
 * resolution semantics (later class wins for the same property) plus
 * the conditional / falsy / array inputs that clsx normalizes.
 */

describe("cn", () => {
  it("joins simple class strings with spaces", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("resolves Tailwind conflicts — later padding wins", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("preserves non-conflicting Tailwind classes", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("drops falsy conditional values", () => {
    const isHidden = false;
    const isVisible = true;
    expect(cn("foo", isHidden && "hidden", isVisible && "block")).toBe("foo block");
  });

  it("accepts arrays and flattens them", () => {
    expect(cn(["foo", "bar"], "baz")).toBe("foo bar baz");
  });

  it("accepts an object form (clsx convention)", () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz");
  });

  it("handles undefined / null / empty inputs gracefully", () => {
    expect(cn(undefined, null, "", "foo")).toBe("foo");
  });

  it("resolves conflicting Tailwind colors — later one wins", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("preserves Tailwind variant prefixes (hover/focus/etc.)", () => {
    expect(cn("hover:bg-red-500", "hover:bg-blue-500")).toBe("hover:bg-blue-500");
    expect(cn("hover:bg-red-500", "focus:bg-blue-500")).toBe(
      "hover:bg-red-500 focus:bg-blue-500",
    );
  });
});
