export type ExperienceItem = {
  id: string;
  role: string;
  organization: string;
  duration: string;
  type: string;
  description: string;
  /** One line after the description — the thing that actually stuck. */
  takeaway?: string;
  highlights?: string[];
  /** Path under /public, e.g. "/certificates/my-internship.jpg" */
  certificateImage?: string;
  /** External verify link. Leave unset if there isn't one — the card drops
   *  the button rather than linking somewhere that isn't a certificate. */
  certificateLink?: string;
};

export const experienceIntro =
  "Two internships so far — one building product at a startup, one inside enterprise network infrastructure. Different worlds, and I'd have guessed wrong about which one I'd find interesting.";

export const experience: ExperienceItem[] = [
  {
    id: "idivpl-full-stack",
    role: "Full Stack Developer",
    organization: "IDIVPL",
    duration: "Dec 2025 – Jan 2026",
    type: "Internship",
    description:
      "A month at a small startup, working on the part of the codebase customers actually touch. I built responsive interfaces, wired them to REST APIs, worked against the database, and shipped inside their Agile cycle — development through testing, debugging, version control and deploy.",
    takeaway:
      "The lesson wasn't technical. It was that a feature isn't finished when it works on my machine.",
    highlights: [
      "Fixed bugs on both sides of the API — which is mostly how I learned to read code I didn't write",
      "Worked to their branching, review and deploy conventions instead of my own",
      "Wrote the API and implementation docs",
    ],
    // ?v=2 cache-busts the next/image optimizer and the browser: the file
    // was replaced in place, so the bare path kept serving the old optimized
    // blob from .next/cache/images. Bump the number whenever the file changes.
    certificateImage: "/certificates/idivpl-full-stack.jpg?v=2",
    // No external link yet — the card falls back to opening the certificate
    // image, which is honest. It used to link to example.com.
  },
];
