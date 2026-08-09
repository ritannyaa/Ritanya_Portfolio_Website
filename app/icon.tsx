import { ImageResponse } from "next/og";

/* Favicon generated at build time rather than checked in as a binary .ico —
   it stays in sync with the site's accent token, and there is no 15KB image
   in the repo that nobody can edit. */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
          color: "#ffffff",
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: -1,
          borderRadius: 7,
        }}
      >
        Y
      </div>
    ),
    size
  );
}
