import { certificates } from "./certificates";

export const siteConfig = {
  name: "Ritanya B",
  title: "Ritanya B — AI & Data Science",
  /* Absolute origin. Next needs this to resolve Open Graph and canonical URLs;
     without it every social preview URL is emitted relative and breaks the
     moment the page is shared anywhere. Set NEXT_PUBLIC_SITE_URL in the host
     environment (Vercel: Project → Settings → Environment Variables) and this
     follows automatically. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yaheshm.vercel.app",
  email: "ritanyabtm@gmail.com",
  phone: "+91 70105 81634",
  // One home town, one place of study. These used to disagree with each other
  // (Contact said Erode, the footer said Coimbatore) because they were two
  // separate strings; they're one fact now, phrased once.
  home: "Erode, Tamil Nadu",
  studyingIn: "Coimbatore",
  location: "Erode, Tamil Nadu — studying in Coimbatore",
  dob: "December 20, 2006",
  linkedin: "https://www.linkedin.com/in/ritanya-balamurugan-a1a5403b7",
  github: "https://github.com/ritannyaa",
  repo: "https://github.com/yaheshmaheshwaran/Yahesh_Portfolio",
  resumeUrl:
    "https://drive.google.com/file/d/1lRq4DURBk0uSGj-DQ2bSbTGvIulCVm_U/view?usp=share_link",
  emailjs: {
    publicKey: "pOGDSOwUFPiIxrTC1",
    serviceId: "service_chb4oni",
    templateId: "template_tmx3j6h",
  },
} as const;

export const navItems = [
  { label: "Home", href: "/#home-section" },
  { label: "About", href: "/#about-section" },
  { label: "Projects", href: "/#projects-section" },
  { label: "Experience", href: "/#experience-section" },
  { label: "Certificates", href: "/#certificates-section" },
  { label: "Skills", href: "/#skills-section" },
  { label: "Resume", href: "/#resume-section" },
  { label: "Contact", href: "/#contact-section" },
  // No link to a section that isn't rendered — Certificates hides itself when empty.
].filter(
  (item) => item.href !== "/#certificates-section" || certificates.length > 0
);

/* Hero copy lives here rather than inside Hero.tsx, same as every other
   section — the component owns the typewriter, not the words. */
export const heroContent = {
  /* Line breaks are authored, not wrapped: the typewriter replays them, and
     the accent treatment is applied to whatever follows the last one — here
     that puts the specialisation in the accent gradient. */
  heading:
    "Hi!\nI am Ritanya B\na pre-final year B.Tech student, specializing in\nAI and Data Science",
  name: "Ritanya B",
  availability: "Looking for an internship or job",
  /* The ring shows the technologies; the number in the middle counts them.
     It used to read "20+ DSA Problems", which had nothing to do with the
     visualisation it sat inside and put a weak number in the largest type on
     the page. */
  counterLabel: "tools I reach for",
} as const;

export const aboutContent = {
  intro:
    "Third year, Coimbatore. Most of my time goes to the unglamorous half of AI — the ingestion, the APIs, the part that has to still be running tomorrow.",
  paragraphs: [
    "I'm in my third year of a B.Tech in AI & Data Science at KPR Institute of Engineering and Technology. Coursework covers machine learning, deep learning, data structures, databases, cloud and software engineering — but most of what I actually know came from building something badly first and then having to fix it.",
    "The projects I keep coming back to are the ones with a hard correctness requirement. VERDICT can't report a vulnerability that isn't there. VOLTIQ can't tell a driver the battery is fine when it isn't. That constraint is what pushed me toward deterministic rule engines and physics models, and toward treating an LLM as the layer that explains a result rather than the layer that decides it.",
  ],
  /* Each of these names something that appears in a project further down the
     page. They used to be four parallel "Strong foundation in X" lines, which
     say the same thing four times and prove none of it.

     Structured as {label, body} rather than a string with <strong> in it —
     the label is data, so the component can render it as a heading instead of
     the section having to inject raw HTML to make four words bold. */
  highlightsTitle: "What that looks like in practice",
  highlights: [
    {
      label: "Backend",
      body: "FastAPI services on PostgreSQL and Redis, containerised with Docker.",
    },
    {
      label: "Machine learning",
      body: "scikit-learn, XGBoost, LightGBM, LSTM — and the slower part, checking whether any of them beat a baseline.",
    },
    {
      label: "Retrieval & LLMs",
      body: "ChromaDB and RAG grounding over LLaMA 3, used to explain findings rather than produce them.",
    },
    {
      label: "Data",
      body: "pandas and NumPy for the ingestion and feature work that has to happen before any of the above is worth writing.",
    },
  ],
  education: {
    degree: "B.Tech, AI & Data Science",
    institution: "KPR Institute of Engineering and Technology",
    year: "Third year — pre-final",
  },
} as const;

/* Every number here is one a visitor can verify by scrolling: three project
   cards, two internships, and the certificates (counted from the data, so the
   figure can't drift from the grid). The set used to claim four projects next
   to a grid of three, and animated "20+ DSA" in 48px type. */
export const statsContent = [
  { value: 3, label: "Projects built", exact: true },
  { value: 2, label: "Internships", exact: true },
  { value: certificates.length, label: "Certifications", exact: true },
  { value: 100, label: "Practice problems solved", exact: false },
  // A zero isn't worth a slot; it drops out until there's something to count.
].filter((stat) => stat.value > 0);

export const resumeCtaContent = {
  title: "Currently looking for an internship",
  description:
    "Backend, ML, or anything close to the data layer. Based in Coimbatore, happy to relocate or work remote.",
} as const;

export const footerContent = {
  about:
    "Third-year B.Tech student in AI & Data Science. I mostly build backend services and the data pipelines underneath them, and I'm looking for an internship where I can do that alongside people who've been at it longer.",
  rolesTitle: "What I work on",
  roles: [
    "Backend services & REST APIs",
    "Data pipelines and feature work",
    "Applied ML — training, evaluation, deployment",
    "SQL and database design",
    "Python automation",
  ],
  contactTitle: "Get in touch",
} as const;
