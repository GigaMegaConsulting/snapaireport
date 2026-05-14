import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SnapReport — AI Readiness Report for Lawyers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#FAF8F1";
const INK = "#0A0A0A";
const INK_2 = "#525252";
const INK_3 = "#A3A3A3";
const RULE = "rgba(10,10,10,0.18)";
const ACCENT = "#1A4D3A";
const STAMP = "#BF2127";

interface OgProps {
  params: { locale: string };
}

export default function OG({ params }: OgProps) {
  const fr = params.locale === "fr";

  const eyebrow = fr ? "Pour avocats · QC + ON" : "For lawyers · QC + ON";
  const title = fr ? "L'IA, pour la pratique du droit." : "AI, sized for legal practice.";
  const sub = fr
    ? "Un rapport d'aptitude IA gratuit, adapté à votre cabinet — confidentialité-safe, Bar-compliant, livré en PDF."
    : "A free AI readiness report tailored to your firm — privilege-safe, Bar-compliant, delivered as a PDF.";
  const cta = fr ? "snapaireport.com/fr/lawyers →" : "snapaireport.com/en/lawyers →";

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
            <span>{eyebrow}</span>
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
              fontSize: 92,
              fontWeight: 700,
              color: INK,
              lineHeight: 1.02,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: 26,
              color: INK_2,
              lineHeight: 1.4,
              marginTop: 18,
              maxWidth: 920,
            }}
          >
            {sub}
          </div>
        </div>

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
            ░ ▒ ▓ █  ·  Clio · Spellbook · Microsoft 365 Copilot  ·  █ ▓ ▒ ░
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
            <span>{fr ? "Fait à Montréal" : "Made in Montréal"}</span>
            <span style={{ color: ACCENT }}>{cta}</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
