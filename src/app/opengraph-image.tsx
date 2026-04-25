import { ImageResponse } from "next/og";

import { loadOgFonts } from "@/lib/og-fonts";

export const runtime = "edge";
export const alt = "Ali Arbab — Class XII, builds AI, voice, and IoT systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brutalist dark — site default. Mirrors :root @theme in globals.css.
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
      {/* 12-col faint vertical grid (matches .brutalist-grid) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(to right, rgba(240,240,234,0.06) 1px, transparent 1px)",
          backgroundSize: "calc(100% / 12) 100%",
        }}
      />

      {/* Top hairline rule */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          right: 80,
          height: 1,
          background: FG,
          opacity: 0.9,
        }}
      />

      {/* Top mono row — author / index */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 14,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: MUTED,
          fontFamily: "JetBrains Mono",
          marginTop: 24,
        }}
      >
        <span>aliarbab2009.com</span>
        <span>portfolio · 2026</span>
      </div>

      {/* Display heading */}
      <div
        style={{
          display: "flex",
          fontSize: 168,
          fontWeight: 500,
          letterSpacing: "-0.04em",
          lineHeight: 0.88,
          marginTop: 96,
        }}
      >
        Ali Arbab.
      </div>

      {/* Subheading */}
      <div
        style={{
          display: "flex",
          fontSize: 56,
          color: PRIMARY,
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
          marginTop: 28,
          maxWidth: 980,
        }}
      >
        Builds AI, voice, and IoT.
      </div>

      {/* Footer hairline rule */}
      <div
        style={{
          position: "absolute",
          bottom: 96,
          left: 80,
          right: 80,
          height: 1,
          background: FG,
          opacity: 0.9,
        }}
      />

      {/* Footer mono row — class · projects */}
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
