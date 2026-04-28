/**
 * Inline-script body for the ThemeToggle button.
 *
 * Plain string at module scope so <ThemeToggleScript /> below can stamp
 * it inside <script dangerouslySetInnerHTML> with a per-request CSP
 * nonce. Keeping the actual click-flip logic as a string makes it easy
 * to grep + audit independently of the component plumbing.
 *
 * What the script does at runtime:
 *   1. Locates the button via document.currentScript.previousElementSibling
 *      — the button is rendered immediately before this <script> tag, and
 *      currentScript is non-null while the inline script is executing
 *      synchronously during HTML parse.
 *   2. Binds a click handler that reads :root[data-theme] live, flips,
 *      writes back via setAttribute, forces a synchronous style recalc
 *      via `void document.body.offsetHeight`, persists to localStorage,
 *      and dispatches a "themechange" CustomEvent so the command palette
 *      stays in sync.
 *   3. Subscribes to "themechange" + "storage" events so palette-driven
 *      flips and cross-tab flips both keep this button's aria-label fresh.
 *   4. Calls syncLabel() once on bind so the aria-label specialises
 *      ("Switch to dark mode" / "Switch to light mode") immediately.
 *
 * The whole thing runs the moment the parser reaches the script — no
 * React, no hydration window, no first-click race.
 */
export const THEME_TOGGLE_SCRIPT = `(function(){
  var btn = document.currentScript && document.currentScript.previousElementSibling;
  if (!btn || !btn.matches || !btn.matches('[data-theme-toggle]')) return;
  function label(t) {
    return t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  }
  function syncLabel() {
    var t = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    btn.setAttribute('aria-label', label(t));
    btn.setAttribute('title', label(t));
  }
  function flip() {
    var root = document.documentElement;
    var current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    var next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    // Force synchronous style recalc — defeats any browser recalc-skip
    // when only an attribute on <html> changes and consumers read via
    // var() inside arbitrary-value Tailwind classes.
    void document.body.offsetHeight;
    try { localStorage.setItem('theme', next); } catch (e) {}
    window.dispatchEvent(new Event('themechange'));
    syncLabel();
  }
  btn.addEventListener('click', flip);
  window.addEventListener('themechange', syncLabel);
  window.addEventListener('storage', function(e){
    if (e.key === 'theme') syncLabel();
  });
  syncLabel();
})();`;

/**
 * <ThemeToggleScript /> — synchronous server component that emits the
 * inline <script> tag stamped with the per-request CSP nonce.
 *
 * The nonce is passed in as a prop instead of awaited via headers()
 * inside this component. Reason: async server components in Next 15 /
 * React 19 stream their output via RSC (`self.__next_f.push(...)`),
 * which encodes the script content as JSON inside an RSC payload
 * instead of rendering a real executable <script> tag pre-paint. The
 * earlier async version meant the toggle's click handler only got
 * bound AFTER hydration — first clicks during the cold-load hydration
 * window silently no-op'd. The nonce comes from the topmost layout
 * (root or marketing) which awaits headers() once and passes the
 * value down through props.
 *
 * Must be rendered IMMEDIATELY AFTER a <button data-theme-toggle> in
 * the DOM tree — the inline script binds via currentScript's
 * previousElementSibling. Don't interleave anything between them.
 */
export function ThemeToggleScript({ nonce }: { nonce?: string }) {
  return <script nonce={nonce} dangerouslySetInnerHTML={{ __html: THEME_TOGGLE_SCRIPT }} />;
}
