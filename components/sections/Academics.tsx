import { aboutContent, siteConfig } from "@/lib/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { BentoGrid, BentoItem } from "@/components/ui/BentoGrid";
import { GraduationCap, Building2, CalendarDays, MapPin } from "lucide-react";

export function Academics() {
  const [lead, ...rest] = aboutContent.paragraphs;

  return (
    <section
      id="about-section"
      data-section
      className="section-padding"
      aria-label="About"
    >
      <div className="section-container">
        <SectionHeading
          watermark="background"
          title="About me"
          description={aboutContent.intro}
        />

        <BentoGrid stagger className="grid-cols-1 lg:grid-cols-6">
          <BentoItem className="lg:col-span-4" depth={0.08}>
            <div className="h-full">
              <GlassCard className="relative h-full overflow-hidden p-6 sm:p-8 lg:p-10">
                {/* The decorative quote glyph is gone. It framed the opening
                    paragraph as a pull-quote of himself, which is the sort of
                    thing a template does and a person doesn't. */}
                <p className="relative text-lg font-medium leading-relaxed text-stone-100 sm:text-xl">
                  {lead}
                </p>

                {rest.map((p, i) => (
                  <p
                    key={i}
                    className="mt-4 text-base leading-relaxed text-stone-400"
                  >
                    {p}
                  </p>
                ))}

                <div className="mt-8 text-sm font-semibold uppercase tracking-wide text-[var(--color-accent-soft)]">
                  {aboutContent.highlightsTitle}
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {aboutContent.highlights.map(({ label, body }) => (
                    <div
                      key={label}
                      className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 text-sm leading-snug text-stone-300"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      <span>
                        <strong className="font-semibold text-white">
                          {label}:
                        </strong>{" "}
                        {body}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </BentoItem>

          <BentoItem className="lg:col-span-2" depth={0.06}>
            <div className="h-full">
              <GlassCard className="flex h-full flex-col p-6 text-white sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-600 to-amber-400">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  {/* Was a second <h3>About Me</h3> inside the About Me
                      section — a heading repeating its own parent. */}
                  <h3 className="text-lg font-semibold">Where I am now</h3>
                </div>

                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3 border-b border-white/10 pb-4">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-amber-300">
                      <GraduationCap className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs font-medium uppercase tracking-wide text-stone-400">
                        Degree
                      </span>
                      <span className="text-sm font-semibold leading-relaxed text-stone-100">
                        {aboutContent.education.degree}
                      </span>
                    </span>
                  </li>

                  <li className="flex items-start gap-3 border-b border-white/10 pb-4">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-amber-300">
                      <Building2 className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs font-medium uppercase tracking-wide text-stone-400">
                        Institution
                      </span>
                      <span className="text-sm leading-relaxed text-stone-100">
                        {aboutContent.education.institution}
                      </span>
                    </span>
                  </li>

                  <li className="flex items-start gap-3 border-b border-white/10 pb-4">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-amber-300">
                      <CalendarDays className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs font-medium uppercase tracking-wide text-stone-400">
                        Year
                      </span>
                      <span className="text-sm leading-relaxed text-stone-100">
                        {aboutContent.education.year}
                      </span>
                    </span>
                  </li>

                  {/* Added here so the home-town/study-city fact is stated once,
                      in one place, instead of contradicting itself between the
                      Contact section and the footer. */}
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-amber-300">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs font-medium uppercase tracking-wide text-stone-400">
                        Based in
                      </span>
                      <span className="text-sm leading-relaxed text-stone-100">
                        {siteConfig.location}
                      </span>
                    </span>
                  </li>
                </ul>
              </GlassCard>
            </div>
          </BentoItem>
        </BentoGrid>
      </div>
    </section>
  );
}
