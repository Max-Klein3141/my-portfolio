import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt     = "Max Klein — Builder at the Intersection of AI & Finance";
export const size    = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width:           "100%",
          height:          "100%",
          display:         "flex",
          flexDirection:   "column",
          alignItems:      "flex-start",
          justifyContent:  "flex-end",
          backgroundColor: "#000000",
          padding:         "72px 80px",
          position:        "relative",
          overflow:        "hidden",
        }}
      >
        {/* Violet orb */}
        <div
          style={{
            position:        "absolute",
            top:             "-120px",
            right:           "-80px",
            width:           "600px",
            height:          "600px",
            borderRadius:    "50%",
            background:      "radial-gradient(circle, rgba(139,92,246,0.28) 0%, transparent 70%)",
          }}
        />

        {/* Indigo orb */}
        <div
          style={{
            position:        "absolute",
            bottom:          "-160px",
            left:            "-60px",
            width:           "500px",
            height:          "500px",
            borderRadius:    "50%",
            background:      "radial-gradient(circle, rgba(99,102,241,0.20) 0%, transparent 70%)",
          }}
        />

        {/* Dot grid */}
        <div
          style={{
            position:         "absolute",
            inset:            0,
            backgroundImage:  "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize:   "42px 42px",
            opacity:          0.4,
          }}
        />

        {/* Radial vignette */}
        <div
          style={{
            position:   "absolute",
            inset:      0,
            background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, #000 100%)",
          }}
        />

        {/* Ghost text */}
        <div
          style={{
            position:    "absolute",
            top:         "50px",
            right:       "60px",
            fontSize:    "160px",
            fontWeight:  200,
            color:       "rgba(255,255,255,0.04)",
            lineHeight:  1,
            letterSpacing: "-0.06em",
            userSelect:  "none",
          }}
        >
          MK
        </div>

        {/* Content */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "0" }}>
          {/* Label */}
          <div
            style={{
              fontSize:      "11px",
              fontWeight:    500,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color:         "rgba(255,255,255,0.25)",
              marginBottom:  "20px",
            }}
          >
            maxklein.xyz
          </div>

          {/* Name */}
          <div
            style={{
              fontSize:      "72px",
              fontWeight:    700,
              color:         "rgba(255,255,255,0.92)",
              lineHeight:    1.0,
              letterSpacing: "-0.03em",
              marginBottom:  "20px",
            }}
          >
            Max Klein
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize:      "22px",
              fontWeight:    300,
              color:         "rgba(255,255,255,0.40)",
              lineHeight:    1.5,
              letterSpacing: "-0.01em",
              maxWidth:      "620px",
            }}
          >
            Building at the intersection of AI, finance, and global entrepreneurship.
          </div>

          {/* Pills */}
          <div
            style={{
              display:    "flex",
              gap:        "10px",
              marginTop:  "36px",
            }}
          >
            {["AI Systems", "Financial Technology", "D·I Athlete"].map((tag) => (
              <div
                key={tag}
                style={{
                  padding:       "6px 14px",
                  borderRadius:  "9999px",
                  border:        "1px solid rgba(255,255,255,0.10)",
                  fontSize:      "11px",
                  fontWeight:    500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color:         "rgba(255,255,255,0.30)",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
