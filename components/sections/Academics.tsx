import { academicsContent } from "@/lib/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { BentoGrid, BentoItem } from "@/components/ui/BentoGrid";
import { Quote, Sparkles, GraduationCap, Building2, CalendarDays } from "lucide-react";

export function Academics() {
  const [lead, ...rest] = academicsContent.paragraphs;

  return (
    <section
      id="about-me-extended"
      data-section
      className="section-padding"
      aria-label="About Me"
    >
      <div className="section-container">
        <SectionHeading
          watermark="About Me"
          title="About Me"
          description={academicsContent.intro}
        />

        <BentoGrid stagger className="grid-cols-1 lg:grid-cols-6">
          <BentoItem className="lg:col-span-4" depth={0.08}>
            <div className="h-full">
              <GlassCard className="relative h-full overflow-hidden p-6 sm:p-8 lg:p-10">
                <Quote
                  className="absolute right-6 top-6 h-16 w-16 text-blue-400/10"
                  aria-hidden
                  strokeWidth={1.5}
                />

                <p className="relative text-lg font-medium leading-relaxed text-slate-100 sm:text-xl">
                  {lead}
                </p>

                {rest.map((p, i) => (
                  <p
                    key={i}
                    className="mt-4 text-base leading-relaxed text-slate-400"
                  >
                    {p}
                  </p>
                ))}

                <div className="mt-8 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-accent-soft)]">
                  <Sparkles className="h-4 w-4" />
                  Academic Highlights
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {academicsContent.highlights.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 text-sm leading-snug text-slate-300 [&_strong]:font-semibold [&_strong]:text-white"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                      <span dangerouslySetInnerHTML={{ __html: item }} />
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
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-400">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">About Me</h3>
                    <p className="text-xs text-slate-400">Current standing</p>
                  </div>
                </div>

                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3 border-b border-white/10 pb-4">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-blue-300">
                      <GraduationCap className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs font-medium uppercase tracking-wide text-slate-400">
                        Degree
                      </span>
                      <span className="text-sm font-semibold leading-relaxed text-slate-100">
                        {academicsContent.education.degree}
                      </span>
                    </span>
                  </li>

                  <li className="flex items-start gap-3 border-b border-white/10 pb-4">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-blue-300">
                      <Building2 className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs font-medium uppercase tracking-wide text-slate-400">
                        Institution
                      </span>
                      <span className="text-sm leading-relaxed text-slate-100">
                        {academicsContent.education.institution}
                      </span>
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-blue-300">
                      <CalendarDays className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs font-medium uppercase tracking-wide text-slate-400">
                        Timeline
                      </span>
                      <span className="text-sm leading-relaxed text-slate-100">
                        {academicsContent.education.year}
                      </span>
                    </span>
                  </li>
                </ul>

                <div className="mt-6 flex items-center gap-2 text-xs font-medium text-blue-300">
                  <Sparkles className="h-4 w-4" />
                  Building industry-ready skills
                </div>
              </GlassCard>
            </div>
          </BentoItem>
        </BentoGrid>
      </div>
    </section>
  );
}
