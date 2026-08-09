import type { NextConfig } from "next";

/* Response headers. Lighthouse's Best Practices audit checks for several of
   these directly, but the reason to set them is that this site embeds no
   third-party frames, loads no cross-origin scripts and posts only to EmailJS
   — so the strictest sensible values cost nothing here. */
const securityHeaders = [
  // Stops the page being framed anywhere — there is no legitimate embed.
  { key: "X-Frame-Options", value: "DENY" },
  // Blocks MIME sniffing, which is what turns an uploaded asset into script.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send the origin cross-site, the full URL same-site.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Nothing here uses these; deny by default rather than inherit.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Upgrade any stray http:// subresource rather than blocking it outright.
  {
    key: "Content-Security-Policy",
    value: "upgrade-insecure-requests",
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // The card images render at ~380-590px; the default 640-3840 ladder
    // generated sizes nothing on this site ever requests.
    imageSizes: [64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Certificate scans and project stills never change without also changing
    // filename, so they can be cached hard.
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },

  // Strips the `X-Powered-By: Next.js` fingerprint from every response.
  poweredByHeader: false,

  // Emits ./out-style trailing-slash-free URLs consistently, so /experience
  // and /experience/ don't become two canonical addresses.
  trailingSlash: false,

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
