import type { Metadata } from "next";
import { PageEntrance } from "@/components/effects/PageEntrance";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BentoGrid, BentoItem } from "@/components/ui/BentoGrid";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { experience, experienceIntro } from "@/lib/data/experience";
import { cn } from "@/lib/utils/cn";

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

          {/* One entry in a two-column grid parks the card on the left half;
              with a single entry the grid centers at a readable width instead.
              A second entry flips it back to two columns automatically. */}
          <BentoGrid
            stagger
            className={cn(
              "grid-cols-1",
              experience.length > 1
                ? "md:grid-cols-2"
                : "md:mx-auto md:max-w-2xl"
            )}
          >
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
