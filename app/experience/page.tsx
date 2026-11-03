import type { Metadata } from "next";
import { PageEntrance } from "@/components/effects/PageEntrance";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BentoGrid, BentoItem } from "@/components/ui/BentoGrid";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { experience, experienceIntro } from "@/lib/data/experience";

export const metadata: Metadata = {
  // The "— Ritanya B" suffix comes from the title template in app/layout.tsx.
  title: "Experience",
  description:
    "Two internships: full-stack development at a startup, and enterprise network infrastructure at Cognizant.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <PageEntrance>
      <section
        id="experience-section"
        data-section
        className="section-padding pt-32 sm:pt-36"
        aria-label="Experience"
      >
        <div className="section-container">
          <SectionHeading
            watermark="worked"
            title="Where I've worked"
            description={experienceIntro}
          />

          <BentoGrid stagger className="grid-cols-1 md:grid-cols-2">
            {experience.map((item) => (
              <BentoItem key={item.id}>
                <ExperienceCard item={item} />
              </BentoItem>
            ))}
          </BentoGrid>
        </div>
      </section>
    </PageEntrance>
  );
}
