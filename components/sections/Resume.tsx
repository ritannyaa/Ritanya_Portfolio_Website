import { FileText, Mail } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Resume() {
  return (
    <section
      id="hireme-section"
      data-section
      className="resume-section section-padding"
      aria-label="Resume"
    >
      <div className="section-container">
        <div data-reveal className="mx-auto max-w-2xl">
          <GlassCard className="p-8 text-center sm:p-10" hover={false}>
            <h2 className="text-2xl font-bold text-slate-100 sm:text-3xl">
              I&apos;m <span className="resume-highlight">Available</span> for
              Internship or Job
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base">
              Seeking opportunities to apply my skills in{" "}
              <strong className="text-slate-200">AI & Data Science</strong>,
              build impactful solutions, and gain hands-on industry
              experience.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton href={siteConfig.resumeUrl} variant="secondary" external>
                <FileText className="h-4 w-4" />
                View Resume
              </MagneticButton>
              <MagneticButton href="#contact-section" variant="outline">
                <Mail className="h-4 w-4" />
                Contact Me
              </MagneticButton>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
