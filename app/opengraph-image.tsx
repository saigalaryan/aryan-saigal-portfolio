import { ImageResponse } from "next/og";

// Rendered at build time into a real 1200x630 PNG, so link previews on
// LinkedIn, Slack, WhatsApp and X get a proper card instead of a small icon.
export const alt = "Aryan Saigal - AI/ML Engineer and Solutions Architect";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#d7ff66";
const INK = "#111111";
const PAPER = "#f7f4ec";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: PAPER,
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Accent orb, mirrors the hero treatment on the site. */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: ACCENT,
            opacity: 0.35,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 68,
                height: 68,
                backgroundColor: INK,
                color: PAPER,
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              AS
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#5c5c55",
              }}
            >
              Aryan Saigal
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 40,
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: -1.5,
              color: INK,
              maxWidth: 900,
            }}
          >
            AI/ML Engineer · Solutions Architect · Full-Stack Developer
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 27,
              lineHeight: 1.45,
              color: "#4a4a44",
              maxWidth: 880,
            }}
          >
            Shipping production AI systems end to end — RAG pipelines, document
            intelligence, real-time voice AI, and Text-to-SQL.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${INK}`,
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex", gap: 14 }}>
            {["LangChain", "FastAPI", "Next.js", "GCP Cloud Run", "MCP"].map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  border: `1px solid ${INK}33`,
                  padding: "9px 16px",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#3d3d38",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 21, fontWeight: 600, color: "#5c5c55" }}>
            AWS Certified
          </div>
        </div>
      </div>
    ),
    size,
  );
}
