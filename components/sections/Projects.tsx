"use client";

import { ArrowRight } from "lucide-react";
import { projects, projectsIntro } from "@/lib/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { BentoGrid, BentoItem } from "@/components/ui/BentoGrid";
import { MagneticButton } from "@/components/ui/MagneticButton";

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

        {/* Same treatment Experience and Certificates use: an outline button
            centred under the grid, leading to that section's full page. Those
            two slice their home grid so the page behind the button holds more
            than the grid showed; this one doesn't — all three projects are on
            the home page, and /projects is the standalone, linkable version of
            the same set. Slice this grid if a fourth project lands. */}
        <div className="mt-10 flex justify-center" data-reveal>
          <MagneticButton href="/projects" variant="outline">
            All {projects.length} projects
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
