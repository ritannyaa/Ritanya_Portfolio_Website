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
    certificateImage: "/certificates/idivpl-full-stack.jpg",
    // No external link yet — the card falls back to opening the certificate
    // image, which is honest. It used to link to example.com.
  },
  {
    id: "cognizant-networking",
    role: "Networking",
    organization: "Cognizant",
    duration: "Jun 2026",
    type: "Internship",
    description:
      "Two weeks with the Network Infrastructure team — the layer everything else quietly depends on. I monitored network performance, worked connectivity issues, and configured VLANs and routing in a lab environment, while getting a look at how firewalls, VPNs and cloud networking fit together at enterprise scale.",
    takeaway:
      "The part I didn't expect to care about was ITIL incident management. How an org routes and closes an incident is its own kind of system design.",
    highlights: [
      "Configured VLANs, IP addressing and basic routing protocols in a lab",
      "Monitored performance and availability with the team's tooling",
      "Built a working picture of hybrid networking across Azure and AWS",
    ],
    certificateImage: "/certificates/cognizant-networking.jpg",
  },
];
