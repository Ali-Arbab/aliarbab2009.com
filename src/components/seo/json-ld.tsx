/**
 * JsonLd — server-rendered <script type="application/ld+json"> tag.
 *
 * Inline-only (no client hydration cost). Uses JSON.stringify with a
 * replacer that escapes the only sequences that can break out of a
 * <script> context: `</script>` and the U+2028 / U+2029 line separators.
 * The line-separator regexes are constructed via String.fromCharCode +
 * RegExp() so the bare characters never appear in the source file
 * (would otherwise terminate the regex literal at parse time).
 *
 * Per P4.02.
 */

type Payload = Record<string, unknown> | { "@graph": unknown[]; [key: string]: unknown };

const LS_2028 = new RegExp(String.fromCharCode(0x2028), "g");
const LS_2029 = new RegExp(String.fromCharCode(0x2029), "g");

function safeStringify(value: unknown): string {
  return JSON.stringify(value)
    .replace(/<\/script/gi, "<\\/script")
    .replace(LS_2028, "\\u2028")
    .replace(LS_2029, "\\u2029");
}

export function JsonLd({ data }: { data: Payload }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- server-rendered known-shape JSON
      dangerouslySetInnerHTML={{ __html: safeStringify(data) }}
    />
  );
}
