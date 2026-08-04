export type ExperienceItem = {
  id: string;
  role: string;
  organization: string;
  duration: string;
  type: string;
  description: string;
  highlights?: string[];
  /** Path under /public, e.g. "/certificates/my-internship.jpg" */
  certificateImage?: string;
  /** External link to view/verify the certificate */
  certificateLink?: string;
};

export const experienceIntro =
  "Internships, training programs, and hands-on work that shaped my practical skills — each backed by a certificate.";

export const experience: ExperienceItem[] = [
  {
    id: "placeholder-experience",
    role: "Full Stack Developer",
    organization: "IDIVPL-Startup",
    duration: "26.12.2025 – 24.01.2026",
    type: "Internship",
    description:
      "Worked in a startup environment to develop and enhance full-stack web applications by building responsive user interfaces, integrating REST APIs, managing databases, and collaborating in Agile workflows. Gained hands-on experience with the complete software development lifecycle, including development, testing, debugging, version control, and deployment while delivering features for real-world business applications.",
    highlights: [
      "Debugged and resolved frontend and backend issues",
      "Learned industry-standard software development practices in a startup environment",
      "Documented APIs and technical implementation details.",
    ],
    certificateImage: "/certificates/placeholder-experience1.jpg",
    certificateLink: "https://example.com/replace-with-certificate-link",
  },
  {
    id: "placeholder-experience-2",
    role: "Networking",
    organization: "Cognizant",
    duration: "09.06.2026 – 23.06.2026",
    type: "Internship",
    description:
        "Worked with the Network Infrastructure team to gain hands-on exposure to enterprise networking operations. Assisted in monitoring network performance, troubleshooting connectivity issues, configuring VLANs and routing in lab environments, and understanding firewall, VPN, and cloud networking concepts. Gained experience with network monitoring tools, ITIL-based incident management, and enterprise infrastructure best practices while collaborating with experienced network engineers.",
    highlights: [
      "Explored Azure and AWS networking fundamentals for hybrid infrastructure",
      "Monitored enterprise network performance and system availability",
      "Configured VLANs, IP addressing, and basic routing protocols",
    ],
    certificateImage: "/certificates/placeholder-experience2.jpg",
    certificateLink: "https://example.com/replace-with-certificate-link",
  },
];
