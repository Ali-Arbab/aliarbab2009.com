import { safeStringify } from "@/lib/safe-json";

/**
 * JsonLd — server-rendered <script type="application/ld+json"> tag.
 *
 * Inline-only (no client hydration cost). Delegates the XSS-safe
 * serialization to src/lib/safe-json.ts so that helper can be
 * unit-tested independently (Vitest can't parse JSX without an
 * extra plugin; pure-TS modules import cleanly).
 *
 * Per P4.02.
 */

type Payload = Record<string, unknown> | { "@graph": unknown[]; [key: string]: unknown };

export function JsonLd({ data }: { data: Payload }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeStringify(data) }} />
  );
}
