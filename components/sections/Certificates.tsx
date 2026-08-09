import { ArrowRight } from "lucide-react";
import { certificates, certificatesIntro } from "@/lib/data/certificates";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BentoGrid, BentoItem } from "@/components/ui/BentoGrid";
import { CertificateCard } from "@/components/ui/CertificateCard";
import { MagneticButton } from "@/components/ui/MagneticButton";

/** Shown on the home page; the full set lives on /certificates. */
const SHOWN = 3;

export function Certificates() {
  return (
    <section
      id="certificates-section"
      data-section
      className="section-padding"
      aria-label="Certificates"
    >
      <div className="section-container">
        <SectionHeading
          watermark="learned"
          title="Courses & credentials"
          description={certificatesIntro}
        />

        <BentoGrid stagger className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {certificates.slice(0, SHOWN).map((certificate, i) => (
            <BentoItem key={certificate.id} depth={0.06 + (i % 3) * 0.02}>
              <CertificateCard certificate={certificate} />
            </BentoItem>
          ))}
        </BentoGrid>

        {certificates.length > SHOWN && (
          <div className="mt-10 flex justify-center" data-reveal>
            <MagneticButton href="/certificates" variant="more">
              View more certificates
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        )}
      </div>
    </section>
  );
}
