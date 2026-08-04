export const skillsIntro =
  "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia";

export const skillCategories = [
  {
    id: "programming",
    title: "Programming & Data",
    icon: "code" as const,
    skills: [
      { name: "Python (Pandas, NumPy, Matplotlib, etc)", level: 95 },
      { name: "SQL", level: 70 },
      { name: "Data Science (API Integration, Scraping)", level: 80 },
    ],
  },
  {
    id: "ml",
    title: "Machine Learning",
    icon: "brain" as const,
    skills: [
      { name: "Machine Learning (ML)", level: 49 },
      { name: "Scikit-learn", level: 60 },
    ],
  },
  {
    id: "tools",
    title: "Tools & Workflow",
    icon: "wrench" as const,
    skills: [{ name: "Git & GitHub, etc.", level: 80 }],
  },
  {
    id: "soft",
    title: "Professional Skills",
    icon: "users" as const,
    skills: [
      { name: "Problem-solving", level: 83 },
      { name: "Communication & Project Management", level: 85 },
    ],
  },
];
