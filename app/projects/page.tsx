import type { Metadata } from "next";
import { PageEntrance } from "@/components/effects/PageEntrance";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BentoGrid, BentoItem } from "@/components/ui/BentoGrid";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects, projectsIntro } from "@/lib/data/projects";

export const metadata: Metadata = {
  // The "— Yahesh M" suffix comes from the title template in app/layout.tsx.
  title: "Projects",
  description:
    "Three systems: an IaC security scanner, an EV battery health platform, and a personal finance pipeline — what each one is and which part was the hard problem.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <PageEntrance>
      <section
        id="projects-section"
        data-section
        className="section-padding pt-32 sm:pt-36"
        aria-label="Projects"
      >
        <div className="section-container">
          <SectionHeading
            watermark="built"
            title="Things I've built"
            description={projectsIntro}
          />

          <BentoGrid stagger className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <BentoItem key={project.id} depth={0.06 + (i % 3) * 0.02}>
                {/* Unlike the home page this grid is the first thing below the
                    fold, so the top row is above the fold on most desktops —
                    all three of them, not just the first card. */}
                <ProjectCard project={project} priority={i < 3} />
              </BentoItem>
            ))}
          </BentoGrid>
        </div>
      </section>
    </PageEntrance>
  );
}
