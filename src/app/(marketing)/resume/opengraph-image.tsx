import { ImageResponse } from "next/og";

import { loadOgFonts } from "@/lib/og-fonts";

export const runtime = "edge";
export const alt = "Ali Arbab — Resume (PDF, single page)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0a0a0a";
const FG = "#f0f0ea";
const MUTED = "#8a8a8a";
const PRIMARY = "#6b82ff";

export default async function Image() {
  const fonts = await loadOgFonts();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: BG,
        color: FG,
        fontFamily: "Space Grotesk",
        display: "flex",
        flexDirection: "column",
        padding: "72px 80px",
        position: "relative",
      }}
    >
      {/* Top mono row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 14,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: MUTED,
          fontFamily: "JetBrains Mono",
        }}
      >
        <span>aliarbab2009.com / resume</span>
        <span>PDF · single page</span>
      </div>

      {/* Hairline */}
      <div style={{ marginTop: 24, height: 1, background: FG, opacity: 0.9, width: "100%" }} />

      {/* Section label */}
      <div
        style={{
          display: "flex",
          marginTop: 64,
          fontSize: 18,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: PRIMARY,
          fontFamily: "JetBrains Mono",
        }}
      >
        § CV
      </div>

      {/* Heading */}
      <div
        style={{
          display: "flex",
          fontSize: 200,
          fontWeight: 500,
          letterSpacing: "-0.04em",
          lineHeight: 0.88,
          marginTop: 16,
        }}
      >
        Resume.
      </div>

      {/* Subheading */}
      <div
        style={{
          display: "flex",
          fontSize: 36,
          color: PRIMARY,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          marginTop: 16,
        }}
      >
        Ali Arbab &mdash; Class XII.
      </div>

      {/* Footer mono row */}
      <div
        style={{
          position: "absolute",
          bottom: 56,
          left: 80,
          right: 80,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 14,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: MUTED,
          fontFamily: "JetBrains Mono",
        }}
      >
        <span>format · pdf · single page</span>
        <span>aliarbab2009.com / resume</span>
      </div>
    </div>,
    { ...size, fonts },
  );
}
