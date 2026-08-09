"use client";

import { projects, projectsIntro } from "@/lib/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { BentoGrid, BentoItem } from "@/components/ui/BentoGrid";

export function Projects() {
  return (
    <section
      id="projects-section"
      data-section
      className="section-padding relative overflow-hidden"
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
              {/* The first card is the earliest image a visitor scrolls to and
                  is often already in the viewport on tall desktops, so it is
                  fetched eagerly; the rest stay lazy. */}
              <ProjectCard project={project} priority={i === 0} />
            </BentoItem>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
