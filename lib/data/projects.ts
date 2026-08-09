export type Project = {
  id: string;
  /** Short codename shown as the card title. */
  name: string;
  /** One line, lowercase-ish: what the thing actually is. */
  kicker: string;
  /** What it does and why it exists. Two sentences, no more. */
  blurb: string;
  /** The engineering decision or constraint that shaped it. */
  hardPart: string;
  /** Set only where the honest answer is "not finished" — renders as a chip. */
  status?: string;
  image: string;
  /** Optional. Every card shows a GitHub button either way; without this the
   *  button falls back to the profile and is labelled as such, rather than
   *  pointing "View code" at a URL that 404s. */
  github?: string;
  live?: string;
  tech: string[];
};

export const projectsIntro =
  "Three systems, each still in progress in one way or another. What follows is why I started them and which part turned out to be the actual problem.";

export const projects: Project[] = [
  {
    id: "verdict",
    name: "VERDICT",
    kicker: "IaC security scanner for Terraform",
    blurb:
      "Point it at a Terraform repo — AWS, Azure, GCP or AliCloud — and it reports the misconfigurations, traces the attack path each one opens up, and checks any CVE it surfaces against the National Vulnerability Database. I built it because the scanners I tried either buried you in findings or handed you a rule ID with no explanation of why it mattered.",
    hardPart:
      "Keeping the model out of the detection path. One hallucinated vulnerability makes the entire report untrustworthy, so detection is a deterministic rule engine and LLaMA 3 only explains what the engine found and drafts the remediation steps, grounded in retrieved docs through ChromaDB. FastAPI, PostgreSQL and Redis behind it, the whole thing in Docker.",
    image: "/images/verdict.jpg",
    /* Corrected 2026-08-05. This pointed at `Internship-analyzer`, which holds
       a single file called "Internship Market Analyzer.py" — a different
       project entirely. `Security-System-Checker` is this one: its README
       describes an IaC scanner over Terraform, Kubernetes and IAM built on
       FastAPI, PostgreSQL, Redis, ChromaDB and LLaMA 3, which is every
       technology listed on this card.

       NOTE: that repo calls the project SentinelIQ, not VERDICT. Pick one
       name and use it in both places. */
    github: "https://github.com/yaheshmaheshwaran/Security-System-Checker",
    tech: ["Python", "FastAPI", "PostgreSQL", "Redis", "ChromaDB", "Docker", "LLaMA 3"],
  },
  {
    id: "finora",
    name: "FINORA",
    kicker: "personal finance, built from the bottom up",
    blurb:
      "An attempt at software that reads a bank CSV and tells you something about your spending you didn't already know. The transaction ingestion pipeline works end to end; feature engineering, the models and the mobile app are scaffolded and not yet built.",
    hardPart:
      "Starting at the boring layer on purpose. I've begun projects at the model before and watched them stall the moment real data didn't line up with what I'd assumed, so this one starts at ingestion — one schema every stage above it can rely on, decided before any of those stages exist.",
    status: "Early — ingestion works, the rest is scaffolding",
    image: "/images/finora.jpg",
    // No `github` on purpose: the URL previously here
    // (Air-Pollution-Early-Warning-System) returns 404, so the card's button
    // falls back to the profile. Add the real repo here once it's public and
    // the button becomes a direct "View code" link on its own.
    tech: ["Python", "pandas", "React", "REST APIs"],
  },
  {
    id: "voltiq",
    name: "VOLTIQ v3.0",
    kicker: "EV battery health from live telemetry",
    blurb:
      "Reads live battery telemetry to estimate State of Health, predict Remaining Useful Life, flag anomalies, and turn all of that into coaching a driver can act on. It runs against a real-time LFP battery simulator I wrote first, so the pipeline could be tested without access to a car.",
    hardPart:
      "Not letting the models answer on their own. Battery degradation has real physics under it, so an Extended Kalman Filter and an Arrhenius model carry the state estimate, and XGBoost, LightGBM, LSTM and Isolation Forest sit on top for prediction and anomaly detection. FastAPI with Redis caching serves it; Android Automotive was the target surface.",
    image: "/images/voltiq.jpg",
    /* No `github` — this pointed at the `VendingMachine` repo, which contains
       exactly one file, `vending_machine.py`. Anyone clicking through would
       have concluded the card was fabricated, so the button falls back to the
       profile instead. Add the real URL here when the repo is public and it
       becomes a direct "View code" link on its own. */
    tech: ["Python", "FastAPI", "Redis", "XGBoost", "LightGBM", "LSTM", "Android Automotive"],
  },
];
