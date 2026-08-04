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

export const metadata: Metadata = {
  title: siteConfig.title,
  description:
    "Portfolio of Yahesh M — B.Tech AI & Data Science student building data-driven applications.",
  openGraph: {
    title: siteConfig.title,
    description:
      "AI & Data Science portfolio — projects, skills, and contact.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0f19",
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
        <InteractionProvider>
          <SmoothScroll>
            <ScrollRevealProvider />
            <Navbar />
            <main className="scroll-flow">{children}</main>
            <Footer />
          </SmoothScroll>
        </InteractionProvider>
      </body>
    </html>
  );
}
