import { ImageResponse } from "next/og";

import { loadOgFonts } from "@/lib/og-fonts";

export const runtime = "edge";
export const alt = "BolHisaab — Voice-first Hindi ledger for shopkeepers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// .theme-bolhisaab tokens
const BG = "#fafaf9";
const FG = "#18181b";
const MUTED = "#71717a";
const PRIMARY = "#4f46e5";
const BORDER = "#e7e5e0";

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
        <span>aliarbab2009.com / projects / 02</span>
        <span style={{ color: PRIMARY }}>◐ Pre-launch</span>
      </div>

      {/* Hairline */}
      <div style={{ marginTop: 24, height: 1, background: BORDER, width: "100%" }} />

      {/* Display name in primary */}
      <div
        style={{
          display: "flex",
          fontSize: 152,
          fontWeight: 500,
          letterSpacing: "-0.04em",
          lineHeight: 0.88,
          color: PRIMARY,
          marginTop: 64,
        }}
      >
        BolHisaab
      </div>

      {/* Tagline */}
      <div
        style={{
          display: "flex",
          fontSize: 40,
          letterSpacing: "-0.015em",
          lineHeight: 1.1,
          marginTop: 20,
          maxWidth: 1000,
        }}
      >
        Voice-first Hindi ledger for shopkeepers.
      </div>

      {/* Pull-quote — italic display, indigo left bar */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          marginTop: 32,
          maxWidth: 900,
        }}
      >
        <div style={{ width: 4, alignSelf: "stretch", background: PRIMARY, marginRight: 20 }} />
        <div
          style={{
            fontSize: 30,
            fontStyle: "italic",
            lineHeight: 1.25,
            color: "#3f3f46",
          }}
        >
          &ldquo;Ram ne 500 udhaar liya.&rdquo; &mdash; and the ledger writes itself.
        </div>
      </div>

      {/* Footer stat row */}
      <div
        style={{
          position: "absolute",
          bottom: 56,
          left: 80,
          right: 80,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 16,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: MUTED,
          fontFamily: "JetBrains Mono",
        }}
      >
        <span>Hindi/Hinglish · sub-2s latency · pre-launch</span>
        <span>bolhisaab.in</span>
      </div>
    </div>,
    { ...size, fonts },
  );
}
