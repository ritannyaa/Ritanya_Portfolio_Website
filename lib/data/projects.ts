export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  github: string;
  live?: string;
  tech: string[];
  featured?: boolean;
};

export const projectsIntro =
  "Each project reflects my strength in combining data, logic, and innovation to build solutions that solve challenges and create measurable value.";

export const projects: Project[] = [
  {
    id: "internship-analyzer",
    title: "AI-Assisted Cloud Security & Compliance Scanner",
    description:
        'VERDICT is a full-stack AI-powered Infrastructure-as-Code (IaC) security scanner that analyzes AWS, Azure, GCP, and AliCloud Terraform repositories for security misconfigurations and compliance risks. It combines a deterministic rule engine with RAG-grounded LLM reasoning to detect vulnerabilities, explain attack paths, verify CVEs against the National Vulnerability Database (NVD), and generate AI-powered step-by-step remediation guidance. Built with Python, FastAPI, PostgreSQL, Redis, ChromaDB, Docker, and LLaMA 3, it delivers precise, explainable security analysis while maintaining a zero-false-positive deterministic detection pipeline.',
    image: "/images/image_1.jpg",
    github: "https://github.com/yaheshmaheshwaran/Internship-analyzer.git",
    tech: ["CloudSecurity","DevSecOps","AI","LLM","RAG","MachineLearning","CyberSecurity"]
  },
  {
    id: "air-pollution",
    title: "Al Finance Assistant (APP)",
    description:
      'SAVVY is an AI-powered personal finance platform designed to transform raw financial data into actionable insights through intelligent analytics. The project follows a modular architecture spanning data ingestion, feature engineering, machine learning, backend services, and a mobile application. It is currently in its foundational development phase, with a working CSV transaction ingestion pipeline and a structured, scalable codebase prepared for future AI, analytics, and application development. The long-term vision is to deliver automated expense analysis, spending intelligence, budgeting, and financial decision support for users.',
    image: "/images/image_2.jpg",
    github:
      "https://github.com/yaheshmaheshwaran/Air-Pollution-Early-Warning-System.git",
    tech: [

    "AI Engineering",

    "Machine Learning",

    "Backend Development",

    "Cloud Computing",

    "System Design",

    "Python",

    "React",

    "API Development",

    "Scalable Systems",

    "Software Engineering"

],
  },
  {
    id: "class-management",
    title: "AI-powered EV battery health intelligence platform",
    description:
      "VOLTIQ v3.0 is an AI-powered EV battery health intelligence platform that processes live battery telemetry to estimate State of Health (SoH), predict Remaining Useful Life (RUL), detect anomalies, and generate driver coaching insights. It combines Extended Kalman Filter and Arrhenius-based battery physics with ML models including XGBoost, LightGBM, LSTM, and Isolation Forest, delivered through a FastAPI backend with Redis caching and Android Automotive support. The platform features a real-time LFP battery simulator, live telemetry pipeline, REST APIs, interactive dashboard, and comprehensive testing for scalable battery analytics.",
    image: "/images/image_3.jpg",
    github: "https://github.com/yaheshmaheshwaran/VendingMachine",
    tech: ["EV", "ElectricVehicles","Python", "IoT","CleanTech","BatteryTechnology", "BatteryHealth", "ArtificialIntelligence", "MachineLearning","FastAPI", "IoT"],
  },
];
