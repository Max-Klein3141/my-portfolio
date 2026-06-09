import { ImageResponse } from "next/og";

export const runtime     = "edge";
export const size        = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width:           "100%",
          height:          "100%",
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          backgroundColor: "#000000",
          borderRadius:    "6px",
        }}
      >
        {/* Violet glow */}
        <div
          style={{
            position:     "absolute",
            width:        "28px",
            height:       "28px",
            borderRadius: "50%",
            background:   "radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)",
          }}
        />
        {/* "M" lettermark */}
        <div
          style={{
            fontSize:      "18px",
            fontWeight:    700,
            color:         "rgba(255,255,255,0.90)",
            letterSpacing: "-0.04em",
            position:      "relative",
          }}
        >
          M
        </div>
      </div>
    ),
    { ...size }
  );
}
