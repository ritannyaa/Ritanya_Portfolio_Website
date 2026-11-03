import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/data/site";

/* The social preview card. Generated rather than designed in an image editor
   so it can never drift out of sync with the site's palette, and so there is
   no 1200x630 PNG in the repo to keep updated by hand. */
export const alt = `${siteConfig.name} — AI & Data Science portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background: "#0a0a0b",
          // Matches the hero's top-weighted radial wash.
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 15% 0%, rgba(245,158,11,0.30), transparent 60%), radial-gradient(ellipse 60% 50% at 95% 25%, rgba(251,191,36,0.18), transparent 60%)",
          color: "#fafaf9",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#fbbf24",
          }}
        >
          {siteConfig.name}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: -2,
            maxWidth: 940,
          }}
        >
          I build backends and ML systems.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: 30,
            lineHeight: 1.4,
            color: "#a8a29e",
            maxWidth: 900,
          }}
        >
          Pre-final year B.Tech, AI & Data Science — cloud security, battery
          telemetry, and personal finance.
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            marginTop: 46,
          }}
        >
          {["Python", "FastAPI", "PostgreSQL", "Docker"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.05)",
                fontSize: 24,
                color: "#d6d3d1",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
