"use client";

import { projects, projectsIntro } from "@/lib/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { BentoGrid, BentoItem } from "@/components/ui/BentoGrid";

export function Projects() {
  return (
    <section
      id="blog-section"
      data-section
      className="section-padding relative overflow-hidden"
      aria-label="Projects"
    >
      <div className="section-container">
        <SectionHeading
          watermark="Projects"
          title="Projects"
          description={projectsIntro}
        />

        <BentoGrid stagger className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <BentoItem key={project.id} depth={0.06 + (i % 3) * 0.02}>
              <ProjectCard project={project} />
            </BentoItem>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
