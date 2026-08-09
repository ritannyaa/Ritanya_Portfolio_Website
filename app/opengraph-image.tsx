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
          background: "#0b0f19",
          // Matches the hero's top-weighted radial wash.
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 15% 0%, rgba(59,130,246,0.30), transparent 60%), radial-gradient(ellipse 60% 50% at 95% 25%, rgba(96,165,250,0.18), transparent 60%)",
          color: "#f1f5f9",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#60a5fa",
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
            color: "#94a3b8",
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
                color: "#cbd5e1",
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
