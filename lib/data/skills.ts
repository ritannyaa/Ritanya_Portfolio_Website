/* Three honest tiers instead of a percentage. A bar labelled "49%" claims a
   precision nobody has about their own ability, and everyone reading a
   portfolio knows that number was typed rather than measured. The bar and its
   animation are unchanged — only what drives its width, and what's printed
   next to it. */
export const levels = {
  daily: { label: "Daily", value: 100 },
  comfortable: { label: "Comfortable", value: 68 },
  learning: { label: "Learning", value: 38 },
} as const;

export type Level = keyof typeof levels;

export type SkillCategory = {
  id: string;
  title: string;
  /** One line under the title — stops four identical cards reading as a loop. */
  note: string;
  icon: "code" | "brain" | "wrench" | "users";
  skills?: { name: string; level: Level }[];
  /** Alternative body for a category a meter can't honestly describe. */
  points?: string[];
};

export const skillsIntro =
  "Grouped by how much real use each one has had, rather than by a number I'd have made up.";

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages & data",
    note: "What I'm quickest in.",
    icon: "code",
    skills: [
      { name: "Python", level: "daily" },
      { name: "pandas / NumPy", level: "daily" },
      { name: "SQL & PostgreSQL", level: "comfortable" },
      { name: "Data collection (APIs, scraping)", level: "comfortable" },
    ],
  },
  {
    id: "ml",
    title: "Machine learning",
    note: "Enough to build with. Still very much reading.",
    icon: "brain",
    skills: [
      { name: "scikit-learn", level: "comfortable" },
      { name: "XGBoost / LightGBM", level: "learning" },
      { name: "PyTorch / TensorFlow", level: "learning" },
    ],
  },
  {
    id: "backend",
    title: "Backend & infra",
    note: "Picked up because a project needed it, not from a syllabus.",
    icon: "wrench",
    skills: [
      { name: "FastAPI", level: "comfortable" },
      { name: "Redis & caching", level: "learning" },
      { name: "Docker", level: "learning" },
    ],
  },
  {
    id: "how-i-work",
    title: "How I work",
    note: "The parts a meter can't hold.",
    icon: "users",
    points: [
      "Start at the data, finish at the model — not the other way round.",
      "Git and GitHub daily, including the branching I still get wrong.",
      "I read more code than I write, and most of it isn't mine.",
      "Comfortable presenting work and running a small project end to end.",
    ],
  },
];
