import { ImageResponse } from "next/og";

import { loadOgFonts } from "@/lib/og-fonts";

export const runtime = "edge";
export const alt = "StockSaathi — AI-coached investment simulator for Indian teens";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// .theme-stocksaathi tokens
const BG = "#0a0b0f";
const FG = "#e8ecef";
const MUTED = "#8892a0";
const PRIMARY = "#00b386";
const BORDER = "#1f2430";

export default async function Image() {
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
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
        {/* Diagonal teal wash — Satori-safe linear-gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(0,179,134,0.18) 0%, rgba(0,179,134,0) 55%)",
          }}
        />

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
          <span>aliarbab2009.com / projects / 01</span>
          <span style={{ color: PRIMARY }}>● Live in production</span>
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
            marginTop: 72,
          }}
        >
          StockSaathi
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 44,
            letterSpacing: "-0.015em",
            lineHeight: 1.1,
            marginTop: 24,
            maxWidth: 1000,
          }}
        >
          AI-coached investment simulator for Indian teens.
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
          <span>3,000+ stocks · ₹1L virtual · live</span>
          <span>stocksaathi.co.in</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
