import { ArrowRight } from "lucide-react";
import { experience, experienceIntro } from "@/lib/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BentoGrid, BentoItem } from "@/components/ui/BentoGrid";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Experience() {
  return (
    <section
      id="experience-section"
      data-section
      className="section-padding"
      aria-label="Experience"
    >
      <div className="section-container">
        <SectionHeading
          watermark="Experience"
          title="Experience & Internships"
          description={experienceIntro}
        />

        <BentoGrid stagger className="grid-cols-1 md:grid-cols-2">
          {experience.slice(0, 2).map((item) => (
            <BentoItem key={item.id}>
              <ExperienceCard item={item} />
            </BentoItem>
          ))}
        </BentoGrid>

        <div className="mt-10 flex justify-center" data-reveal>
          <MagneticButton href="/experience" variant="outline">
            View All Experience
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
