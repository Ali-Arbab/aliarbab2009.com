# Font loading strategy

Two font families. Both self-hosted via `next/font/google`. Both load with `display: swap` so text is readable immediately and the swap is non-blocking.

## Loaded

| Family             | Use                          | Source                |
| ------------------ | ---------------------------- | --------------------- |
| Space Grotesk      | Body, headings               | `next/font/google`    |
| JetBrains Mono     | Code, numerics, ID-style UI  | `next/font/google`    |

## NOT loaded

The earlier neon-minimal aesthetic also imported Fraunces, Instrument Serif, Orbitron, Rajdhani, and Inter. When brutalist became the default, those `next/font/google` calls were removed. The archived aesthetic CSS in `_archive/` still references them in comments — those references are dead and don't trigger any actual loads.

If a future PR adds back any of those families, that's a regression worth catching. (No automated guard yet — manual review of `package.json` + `src/app/layout.tsx`.)

## Why two families is the right number

- One sans-serif for hierarchy, one mono for technical/numeric clarity. The brutalist aesthetic relies on the mono–prop contrast.
- Each additional family adds ~30 KB woff2 + a render-blocking flash window. Above two, the tradeoff stops paying off for a portfolio.

## Subsetting

`next/font/google` automatically subsets to Latin glyphs we need. If we ever add languages (Hindi, etc.) or special chars (mathematical, music), reconfigure the `subsets` option and re-measure bundle delta.

## Fallback chain

`font-family` declarations always end with: `'<custom>', system-ui, sans-serif` (or `monospace`). If the custom font fails to load, system-ui takes over without layout shift — sizes were tuned to match.
