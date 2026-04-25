/**
 * safeStringify — JSON.stringify with the three sequences that can
 * break out of an inline <script> tag escaped:
 *
 *   1. Literal "</script>" → terminates the script tag
 *   2. U+2028 LINE SEPARATOR → JS-source-level newline pre-2019
 *   3. U+2029 PARAGRAPH SEPARATOR → same problem
 *
 * Used by <JsonLd /> to safely inline structured data via
 * dangerouslySetInnerHTML. Pure function, easily unit-tested.
 *
 * The line-separator regexes are constructed via String.fromCharCode
 * + RegExp() so the bare characters never appear in this file's
 * source — otherwise they'd terminate the regex literal at parse time
 * and look indistinguishable from a regular newline in the editor.
 */

const LS_2028 = new RegExp(String.fromCharCode(0x2028), "g");
const LS_2029 = new RegExp(String.fromCharCode(0x2029), "g");

export function safeStringify(value: unknown): string {
  return JSON.stringify(value)
    .replace(/<\/script/gi, "<\\/script")
    .replace(LS_2028, "\\u2028")
    .replace(LS_2029, "\\u2029");
}
