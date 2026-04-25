import { describe, expect, it } from "vitest";

import { safeStringify } from "./safe-json";

/**
 * safeStringify is a security-load-bearing function: its output is
 * inlined into a <script> tag via dangerouslySetInnerHTML. Any value
 * that can break out of <script> context becomes an XSS vector.
 *
 * The three known break-out sequences:
 *   1. Literal "</script>" anywhere in the JSON → terminates the tag
 *   2. U+2028 LINE SEPARATOR → JS-source-level newline pre-2019, can
 *      break older parsers and offends some linters
 *   3. U+2029 PARAGRAPH SEPARATOR → same problem
 *
 * Tests verify each is escaped exactly once and no others.
 */

describe("safeStringify", () => {
  it("escapes </script> case-insensitively", () => {
    const out = safeStringify({ malicious: "</script>" });
    expect(out).not.toContain("</script>");
    expect(out).toContain("<\\/script>");
  });

  it("escapes </SCRIPT> upper-case variant (case-normalized)", () => {
    // The regex is case-insensitive (/gi) but the replacement is a
    // fixed lowercase string, so all variants normalize to '<\/script'.
    // Original case is lost — that's fine for XSS safety; any escape works.
    const out = safeStringify({ malicious: "</SCRIPT>" });
    expect(out).not.toMatch(/<\/script/i); // no unescaped </script of any case
    expect(out).toContain("<\\/script>"); // lowercase replacement
  });

  it("escapes </script with no closing bracket too (defensive)", () => {
    const out = safeStringify({ malicious: "</scriptfoo" });
    // The regex matches </script anywhere, including without a > —
    // some attack vectors abuse partial tag termination.
    expect(out).toContain("<\\/scriptfoo");
  });

  it("escapes U+2028 LINE SEPARATOR", () => {
    const ls = String.fromCharCode(0x2028);
    const out = safeStringify({ x: `before${ls}after` });
    expect(out).not.toContain(ls);
    expect(out).toContain("\\u2028");
  });

  it("escapes U+2029 PARAGRAPH SEPARATOR", () => {
    const ps = String.fromCharCode(0x2029);
    const out = safeStringify({ x: `before${ps}after` });
    expect(out).not.toContain(ps);
    expect(out).toContain("\\u2029");
  });

  it("preserves valid JSON for ordinary input", () => {
    const obj = { a: 1, b: "hello", c: [1, 2, 3] };
    const out = safeStringify(obj);
    expect(JSON.parse(out)).toEqual(obj);
  });

  it("preserves nested objects", () => {
    const obj = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Ali Arbab",
      url: "https://aliarbab2009.com",
      sameAs: ["https://github.com/aliarbab2009"],
    };
    const out = safeStringify(obj);
    expect(JSON.parse(out)).toEqual(obj);
  });

  it("does not over-escape — round-trip identity for safe input", () => {
    const safe = { hello: "world", n: 42 };
    expect(JSON.parse(safeStringify(safe))).toEqual(safe);
  });

  it("handles a payload that combines all three break-out sequences", () => {
    const ls = String.fromCharCode(0x2028);
    const ps = String.fromCharCode(0x2029);
    const obj = { hostile: `</script>${ls}${ps}` };
    const out = safeStringify(obj);

    expect(out).not.toContain("</script>");
    expect(out).not.toContain(ls);
    expect(out).not.toContain(ps);
    expect(out).toContain("<\\/script>");
    expect(out).toContain("\\u2028");
    expect(out).toContain("\\u2029");
  });
});
