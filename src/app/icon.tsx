import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #00B386 0%, #4F46E5 50%, #00FF9D 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#0b0b0f",
          fontSize: 38,
          fontWeight: 900,
          borderRadius: 14,
          letterSpacing: -2,
        }}
      >
        a
      </div>
    ),
    size,
  );
}
