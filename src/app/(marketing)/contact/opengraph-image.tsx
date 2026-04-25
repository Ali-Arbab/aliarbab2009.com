import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";
import { loadOgFonts } from "@/lib/og-fonts";

export const runtime = "edge";
export const alt = "Ali Arbab — Say hi";
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
        <span>aliarbab2009.com / contact</span>
        <span>response within 48 hours</span>
      </div>

      {/* Hairline */}
      <div style={{ marginTop: 24, height: 1, background: FG, opacity: 0.9, width: "100%" }} />

      {/* Headline */}
      <div
        style={{
          display: "flex",
          fontSize: 224,
          fontWeight: 500,
          letterSpacing: "-0.04em",
          lineHeight: 0.88,
          marginTop: 88,
        }}
      >
        Say <span style={{ color: PRIMARY }}>hi.</span>
      </div>

      {/* Channels row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 56,
          fontSize: 24,
          fontFamily: "JetBrains Mono",
          color: FG,
        }}
      >
        <span>{siteConfig.email}</span>
        <span style={{ color: PRIMARY }}>@{siteConfig.githubHandle}</span>
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
        <span>email · github · contact form (phase 3)</span>
        <span>aliarbab2009.com / contact</span>
      </div>
    </div>,
    { ...size, fonts },
  );
}
