import { ImageResponse } from "next/og";

import { loadOgFonts } from "@/lib/og-fonts";

export const runtime = "edge";
export const alt = "About Ali Arbab — Class XII, three projects";
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
        <span>aliarbab2009.com / about</span>
        <span>§ long version</span>
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
        § 01 · Hello
      </div>

      {/* Display heading */}
      <div
        style={{
          display: "flex",
          fontSize: 152,
          fontWeight: 500,
          letterSpacing: "-0.03em",
          lineHeight: 0.9,
          marginTop: 24,
        }}
      >
        Hi &mdash; I&apos;m Ali.
      </div>

      {/* Body */}
      <div
        style={{
          display: "flex",
          fontSize: 32,
          lineHeight: 1.3,
          marginTop: 28,
          maxWidth: 980,
          color: "rgba(240,240,234,0.85)",
        }}
      >
        The long version of who I am and what I&apos;ve built.
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
        <span>Class XII · three projects</span>
        <span>StockSaathi · BolHisaab · MagLock</span>
      </div>
    </div>,
    { ...size, fonts },
  );
}
