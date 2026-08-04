import type { Metadata } from "next";
import { PageEntrance } from "@/components/effects/PageEntrance";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BentoGrid, BentoItem } from "@/components/ui/BentoGrid";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { experience, experienceIntro } from "@/lib/data/experience";

export const metadata: Metadata = {
  title: "Experience — Yahesh M",
  description:
    "Internships, training, and hands-on experience with certificates.",
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
            watermark="Experience"
            title="Internships & Hands-on Experience"
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
