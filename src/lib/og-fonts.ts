import type { ImageResponse } from "next/og";

type SatoriFont = NonNullable<ConstructorParameters<typeof ImageResponse>[1]>["fonts"];

/**
 * Shared font loader for next/og ImageResponse calls.
 *
 * Both fonts are inlined into public/fonts/ and read at edge-render
 * time. We only ship the weights we actually use in OG output:
 *   - Space Grotesk Medium 500 (display headings)
 *   - JetBrains Mono Regular 400 (mono kicker + footer rows)
 *
 * Memoized per-process so repeated OG renders within a single edge
 * worker don't re-fetch.
 *
 * Per P4.04.
 */

let cached: SatoriFont | null = null;

export async function loadOgFonts(): Promise<NonNullable<SatoriFont>> {
  if (cached) return cached;

  const [spaceGrotesk, jetBrains] = await Promise.all([
    fetch(new URL("../../public/fonts/SpaceGrotesk-Medium.woff2", import.meta.url)).then((r) =>
      r.arrayBuffer(),
    ),
    fetch(new URL("../../public/fonts/JetBrainsMono-Regular.woff2", import.meta.url)).then((r) =>
      r.arrayBuffer(),
    ),
  ]);

  cached = [
    { name: "Space Grotesk", data: spaceGrotesk, weight: 500, style: "normal" },
    { name: "JetBrains Mono", data: jetBrains, weight: 400, style: "normal" },
  ];
  return cached;
}
