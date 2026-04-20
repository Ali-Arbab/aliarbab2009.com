/**
 * ThemeScript — inline blocking script that sets data-theme on <html>
 * BEFORE any CSS paints. Prevents FOUC when user's preferred theme
 * differs from the server-rendered default.
 *
 * Order of preference, first match wins:
 *   1. localStorage.theme === "light" | "dark"
 *   2. window.matchMedia("(prefers-color-scheme: light)").matches → light
 *   3. default → dark
 *
 * Stringified + inlined so it runs synchronously. No network hop.
 */
const INLINE_SCRIPT = `
(() => {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      document.documentElement.dataset.theme = stored;
      return;
    }
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    document.documentElement.dataset.theme = prefersLight ? "light" : "dark";
  } catch (_) {
    document.documentElement.dataset.theme = "dark";
  }
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: INLINE_SCRIPT }} />;
}
