import { ImageResponse } from "next/og";

import { loadOgFonts } from "@/lib/og-fonts";

export const runtime = "edge";
export const alt = "MagLock Protocol — dual-door smart lock with live camera and voice AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// .theme-maglock tokens
const BG = "#030306";
const FG = "#b8c4d8";
const MUTED = "#7080a0";
const PRIMARY = "#00ff9d";
const BORDER = "#1e1e36";

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
        {/* Neon scanline glow — vertical linear-gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,255,157,0.10) 0%, rgba(0,255,157,0) 28%, rgba(0,255,157,0) 72%, rgba(0,255,157,0.08) 100%)",
          }}
        />

        {/* Top mono row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 14,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: MUTED,
            fontFamily: "JetBrains Mono",
          }}
        >
          <span>aliarbab2009.com / projects / 03</span>
          <span style={{ color: PRIMARY }}>◆ Hardware-dependent</span>
        </div>

        {/* Hairline */}
        <div style={{ marginTop: 24, height: 1, background: BORDER, width: "100%" }} />

        {/* Display name in neon green, tight tracking for cyberpunk feel */}
        <div
          style={{
            display: "flex",
            fontSize: 132,
            fontWeight: 500,
            letterSpacing: "-0.05em",
            lineHeight: 0.9,
            color: PRIMARY,
            marginTop: 80,
            textTransform: "uppercase",
          }}
        >
          MagLock
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 500,
            letterSpacing: "0.4em",
            lineHeight: 1,
            color: FG,
            marginTop: 8,
            textTransform: "uppercase",
            fontFamily: "JetBrains Mono",
          }}
        >
          Protocol
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 32,
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
            marginTop: 28,
            maxWidth: 1000,
          }}
        >
          Dual-door smart lock with live camera and voice AI.
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
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: MUTED,
            fontFamily: "JetBrains Mono",
          }}
        >
          <span>dual-relay · esp32 · mjpeg cam</span>
          <span>local-network only</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
