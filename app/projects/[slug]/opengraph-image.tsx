import { ImageResponse } from "next/og";

import { getProject, projects } from "@/lib/projects";

export const alt = "Project case study by Aryan Saigal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

const ACCENT = "#d7ff66";
const INK = "#111111";
const PAPER = "#f7f4ec";

// Per-project social card, so a shared case-study link previews as that
// project rather than as the generic site card.
export default async function ProjectOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  const title = project?.title ?? "Project";
  const tagline = project?.tagline ?? "Case study";
  const domain = project?.domain ?? "";
  const tags = project?.stackList.slice(0, 5) ?? [];

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
          padding: "62px 70px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 14,
            height: "100%",
            background: ACCENT,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 54,
                height: 54,
                backgroundColor: INK,
                color: PAPER,
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: 1.5,
              }}
            >
              AS
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: 3.5,
                textTransform: "uppercase",
                color: "#5c5c55",
              }}
            >
              {domain ? `${domain} · Case study` : "Case study"}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 38,
              fontSize: title.length > 42 ? 54 : 64,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              color: INK,
              maxWidth: 940,
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 27,
              color: "#4a4a44",
              maxWidth: 900,
            }}
          >
            {tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${INK}`,
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  border: `1px solid ${INK}33`,
                  padding: "8px 14px",
                  fontSize: 19,
                  fontWeight: 600,
                  color: "#3d3d38",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 20, fontWeight: 600, color: "#5c5c55" }}>
            Aryan Saigal
          </div>
        </div>
      </div>
    ),
    size,
  );
}
