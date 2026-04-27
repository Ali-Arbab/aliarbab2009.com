import { describe, expect, it } from "vitest";

import { THEME_TOGGLE_SCRIPT } from "./theme-toggle-script";

/**
 * Pure-string tests for the v3 inline ThemeToggle script.
 *
 * The script itself runs in the browser at HTML-parse time and is hard
 * to fully exercise in jsdom because it depends on
 * document.currentScript.previousElementSibling — a runtime-only
 * relationship between the <script> tag and the preceding <button>.
 *
 * These tests instead lock in the *shape* of the script: the key
 * behaviours users (and the command-palette contract) depend on. Any
 * regression that drops one of these markers — e.g. someone "cleans up"
 * the offsetHeight reflow, or removes the storage listener for cross-tab
 * sync — gets caught by CI before deploy. The actual click flow is
 * verified end-to-end in production via Chrome MCP smoke tests.
 */
describe("THEME_TOGGLE_SCRIPT", () => {
  it("binds via document.currentScript.previousElementSibling so it's interactive at parse time", () => {
    expect(THEME_TOGGLE_SCRIPT).toContain("document.currentScript");
    expect(THEME_TOGGLE_SCRIPT).toContain("previousElementSibling");
  });

  it("guards against binding to the wrong element if the contract is broken", () => {
    expect(THEME_TOGGLE_SCRIPT).toContain("[data-theme-toggle]");
    expect(THEME_TOGGLE_SCRIPT).toContain("matches");
  });

  it("reads :root[data-theme] live at click time (no stale closure)", () => {
    expect(THEME_TOGGLE_SCRIPT).toContain("getAttribute('data-theme')");
  });

  it("flips dark <-> light, not just one direction", () => {
    expect(THEME_TOGGLE_SCRIPT).toContain("'dark'");
    expect(THEME_TOGGLE_SCRIPT).toContain("'light'");
  });

  it("writes back via setAttribute on documentElement", () => {
    expect(THEME_TOGGLE_SCRIPT).toContain("setAttribute('data-theme'");
  });

  it("forces a synchronous style recalc after flipping", () => {
    expect(THEME_TOGGLE_SCRIPT).toContain("offsetHeight");
  });

  it("persists to localStorage with a try/catch (handles privacy-mode disable)", () => {
    expect(THEME_TOGGLE_SCRIPT).toContain("localStorage.setItem('theme'");
    expect(THEME_TOGGLE_SCRIPT).toContain("try");
    expect(THEME_TOGGLE_SCRIPT).toContain("catch");
  });

  it("dispatches 'themechange' so <CommandPalette> stays in sync", () => {
    expect(THEME_TOGGLE_SCRIPT).toContain("dispatchEvent");
    expect(THEME_TOGGLE_SCRIPT).toContain("'themechange'");
  });

  it("listens for 'themechange' from sibling toggles", () => {
    expect(THEME_TOGGLE_SCRIPT).toContain("addEventListener('themechange'");
  });

  it("listens for cross-tab 'storage' events", () => {
    expect(THEME_TOGGLE_SCRIPT).toContain("addEventListener('storage'");
    expect(THEME_TOGGLE_SCRIPT).toContain("e.key === 'theme'");
  });

  it("specialises both aria-label and title for screen readers + tooltip", () => {
    expect(THEME_TOGGLE_SCRIPT).toContain("aria-label");
    expect(THEME_TOGGLE_SCRIPT).toContain("title");
    expect(THEME_TOGGLE_SCRIPT).toContain("Switch to light mode");
    expect(THEME_TOGGLE_SCRIPT).toContain("Switch to dark mode");
  });

  it("is a self-invoking IIFE so it doesn't pollute window", () => {
    expect(THEME_TOGGLE_SCRIPT.trim().startsWith("(function()")).toBe(true);
    expect(THEME_TOGGLE_SCRIPT.trim().endsWith("})();")).toBe(true);
  });
});
