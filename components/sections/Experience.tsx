import { ArrowRight } from "lucide-react";
import { experience, experienceIntro } from "@/lib/data/experience";
import { cn } from "@/lib/utils/cn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BentoGrid, BentoItem } from "@/components/ui/BentoGrid";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { MagneticButton } from "@/components/ui/MagneticButton";

/** Entries shown on the home page; the rest live on /experience. */
const SHOWN = 2;

export function Experience() {
  const shown = experience.slice(0, SHOWN);
  return (
    <section
      id="experience-section"
      data-section
      className="section-padding"
      aria-label="Experience"
    >
      <div className="section-container">
        <SectionHeading
          watermark="worked"
          title="Where I've worked"
          description={experienceIntro}
        />

        {/* Same single-entry centering as /experience — one card in a
            two-column grid would sit on the left. */}
        <BentoGrid
          stagger
          className={cn(
            "grid-cols-1",
            shown.length > 1 ? "md:grid-cols-2" : "md:mx-auto md:max-w-2xl"
          )}
        >
          {shown.map((item) => (
            <BentoItem key={item.id}>
              <ExperienceCard item={item} />
            </BentoItem>
          ))}
        </BentoGrid>

        {/* Only worth a click when the page behind it holds something this
            grid didn't already show. With two entries and two slots, it used
            to lead to an identical page. */}
        {experience.length > SHOWN && (
          <div className="mt-10 flex justify-center" data-reveal>
            <MagneticButton href="/experience" variant="more">
              View more roles
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        )}
      </div>
    </section>
  );
}
