import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SnapReport — AI Business Assessment in 5 minutes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Paper / blueprint palette — mirrors app/globals.css
const PAPER = "#FAF8F1";
const INK = "#0A0A0A";
const INK_2 = "#525252";
const INK_3 = "#A3A3A3";
const RULE = "rgba(10,10,10,0.18)";
const ACCENT = "#1A4D3A";
const STAMP = "#BF2127";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          padding: "72px 80px",
          fontFamily: "serif",
        }}
      >
        {/* Top strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: 18,
            letterSpacing: 4,
            color: INK_2,
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span>SnapReport</span>
            <span style={{ color: INK_3 }}>·</span>
            <span>v1</span>
          </div>
          <div
            style={{
              display: "flex",
              border: `2px solid ${STAMP}`,
              color: STAMP,
              padding: "6px 16px",
              fontSize: 16,
              letterSpacing: 3,
            }}
          >
            FREE
          </div>
        </div>

        {/* Middle: hairline + serif title */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 18,
            }}
          >
            <div style={{ display: "flex", width: 56, height: 2, background: INK }} />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 16,
                letterSpacing: 3,
                color: INK_2,
                textTransform: "uppercase",
              }}
            >
              AI Readiness Report
            </span>
          </div>
          <div
            style={{
              fontFamily: "serif",
              fontSize: 96,
              fontWeight: 700,
              color: INK,
              lineHeight: 1.02,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            The map before the territory.
          </div>
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: 28,
              color: INK_2,
              lineHeight: 1.4,
              marginTop: 18,
              maxWidth: 880,
            }}
          >
            A free, custom AI assessment for small businesses. 5-minute form, paper-fresh PDF in your inbox.
          </div>
        </div>

        {/* Bottom: ASCII horizon strip + URL */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 22,
              color: INK,
              letterSpacing: 2,
              whiteSpace: "pre",
            }}
          >
            ░ ▒ ▓ █ ▓ ▒ ░  ·  snapaireport.com  ·  ░ ▒ ▓ █ ▓ ▒ ░
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 18,
              borderTop: `1px solid ${RULE}`,
              fontFamily: "monospace",
              fontSize: 16,
              letterSpacing: 2,
              color: INK_3,
              textTransform: "uppercase",
            }}
          >
            <span>Made in Montréal</span>
            <span style={{ color: ACCENT }}>snapaireport.com →</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
