import { FileText, Mail } from "lucide-react";
import { resumeCtaContent, siteConfig } from "@/lib/data/site";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Resume() {
  return (
    <section
      id="resume-section"
      data-section
      className="resume-section section-padding"
      aria-label="Resume"
    >
      <div className="section-container">
        <div data-reveal className="mx-auto max-w-2xl">
          <GlassCard className="p-8 text-center sm:p-10" hover={false}>
            {/* "I'm Available for Internship or Job" read like a banner ad.
                Stating it as what he's doing, rather than what he is, is both
                more specific and less pleading. */}
            <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">
              Currently{" "}
              <span className="resume-highlight">looking</span> for an
              internship
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base">
              {resumeCtaContent.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton href={siteConfig.resumeUrl} variant="secondary" external>
                <FileText className="h-4 w-4" />
                Read my resume
              </MagneticButton>
              <MagneticButton href="#contact-section" variant="outline">
                <Mail className="h-4 w-4" />
                Email me
              </MagneticButton>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
