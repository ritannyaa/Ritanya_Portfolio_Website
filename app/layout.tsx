import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Urbanist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ScrollRevealProvider } from "@/components/providers/ScrollRevealProvider";
import { InteractionProvider } from "@/components/providers/InteractionProvider";
import { siteConfig } from "@/lib/data/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Heading font — applied narrowly (SectionHeading, Hero name, nav brand)
// via the --font-heading token, body copy stays on Inter throughout.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
});

// Display face for the hero headline and its stat counter only — see
// components/sections/Hero.css.
const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-urbanist",
  weight: ["500", "600", "700"],
});

/* Interpolated rather than spelled out, so the owner's name lives in exactly
   one place (lib/data/site.ts) and cannot drift out of sync with the page the
   crawler actually reads. */
const DESCRIPTION = `${siteConfig.name} — pre-final year B.Tech in AI & Data Science. I build backends and ML systems: a Terraform security scanner, an EV battery health platform, and a personal finance pipeline.`;

export const metadata: Metadata = {
  // Resolves every relative URL below (canonical, OG image) against the real
  // origin. Missing, Next emits a build warning and ships relative OG URLs,
  // which no social crawler can follow.
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    // Sub-pages set only their own name; this supplies the suffix once
    // instead of each page repeating the owner's name by hand.
    template: `%s — ${siteConfig.name}`,
  },
  description: DESCRIPTION,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    siteConfig.name,
    "AI and Data Science",
    "backend engineer",
    "machine learning",
    "FastAPI",
    "Python",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.title,
    title: siteConfig.title,
    description: DESCRIPTION,
    locale: "en_IN",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — AI & Data Science portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // No maximumScale/userScalable lock — pinch-zoom must stay available
  // (WCAG 1.4.4).
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
    { media: "(prefers-color-scheme: light)", color: "#0a0a0b" },
  ],
};

/* Schema.org Person. Without it a search engine reads this as an unlabelled
   page of text; with it, the name, role, education and profile links are
   explicit, which is what feeds knowledge panels and rich results. Every
   value is pulled from the same source of truth the page renders from, so
   the markup cannot drift from the visible content. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  jobTitle: "Software Engineer",
  description: DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Erode",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "KPR Institute of Engineering and Technology",
  },
  knowsAbout: [
    "Python",
    "FastAPI",
    "Machine Learning",
    "PostgreSQL",
    "Docker",
    "Cloud Security",
  ],
  sameAs: [siteConfig.github, siteConfig.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${urbanist.variable}`}
    >
      <body className="font-sans">
        <script
          type="application/ld+json"
          // Serialising a local object literal, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />

        {/* Bypass Blocks (WCAG 2.4.1): the fixed dock holds nine controls, and
            without this every keyboard visitor tabs through all of them before
            reaching content, on every page. Off-screen until focused. */}
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <InteractionProvider>
          <SmoothScroll>
            <ScrollRevealProvider />
            <Navbar />
            {/* tabIndex -1 makes the skip link's target programmatically
                focusable, so focus actually lands here rather than only the
                scroll position moving. */}
            <main id="main" tabIndex={-1} className="scroll-flow">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </InteractionProvider>
      </body>
    </html>
  );
}
