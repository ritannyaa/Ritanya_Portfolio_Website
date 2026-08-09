import type { Metadata } from "next";
import { PageEntrance } from "@/components/effects/PageEntrance";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BentoGrid, BentoItem } from "@/components/ui/BentoGrid";
import { CertificateCard } from "@/components/ui/CertificateCard";
import { certificates, certificatesIntro } from "@/lib/data/certificates";

export const metadata: Metadata = {
  title: "Certificates",
  description:
    "Course certificates from IBM, HackerRank, Simplilearn and Great Learning — most with a verify link.",
  alternates: { canonical: "/certificates" },
};

export default function CertificatesPage() {
  return (
    <PageEntrance>
      <section
        id="certificates-section"
        data-section
        className="section-padding pt-32 sm:pt-36"
        aria-label="Certificates"
      >
        <div className="section-container">
          <SectionHeading
            watermark="learned"
            title="Courses & credentials"
            description={certificatesIntro}
          />

          <BentoGrid stagger className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate, i) => (
              <BentoItem key={certificate.id} depth={0.06 + (i % 3) * 0.02}>
                <CertificateCard certificate={certificate} />
              </BentoItem>
            ))}
          </BentoGrid>
        </div>
      </section>
    </PageEntrance>
  );
}
