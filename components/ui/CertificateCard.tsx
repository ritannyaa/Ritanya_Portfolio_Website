"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Certificate } from "@/lib/data/certificates";
import { TiltCard } from "@/components/ui/TiltCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { easeOutExpo } from "@/lib/motion/easing";

type CertificateCardProps = {
  certificate: Certificate;
};

/* Same 1 → 2 → 3 column grid as the project cards, in the same container. */
const IMAGE_SIZES =
  "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 380px";

export function CertificateCard({ certificate }: CertificateCardProps) {
  const preview = (
    <>
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.55, ease: easeOutExpo }}
      >
        <Image
          src={certificate.image}
          alt={`${certificate.title} certificate from ${certificate.issuer}`}
          fill
          sizes={IMAGE_SIZES}
          loading="lazy"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/10 to-transparent" />
    </>
  );

  return (
    <TiltCard className="group flex h-full flex-col overflow-hidden p-0" intensity={9}>
      {/* Only wrapped in an anchor when there's somewhere real to go. A
          certificate with no verify link shows the scan and says so, rather
          than offering a click that resolves nowhere. */}
      {certificate.link ? (
        <a
          href={certificate.link}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="button"
          className="relative block w-full overflow-hidden bg-slate-800 aspect-[4/3] transition-transform duration-150 active:scale-[0.98]"
          aria-label={`Verify ${certificate.title} on ${certificate.issuer}`}
        >
          {preview}
          <span className="absolute right-3 top-3 inline-flex items-center justify-center rounded-full bg-white/80 p-2 text-slate-700 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
            <ExternalLink className="h-3.5 w-3.5" />
          </span>
        </a>
      ) : (
        <div className="relative w-full overflow-hidden bg-slate-800 aspect-[4/3]">
          {preview}
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-accent-soft)]">
            {certificate.issuer}
          </p>
          <p className="shrink-0 text-xs tabular-nums text-slate-400">
            {certificate.date}
          </p>
        </div>

        <h3 className="mt-1.5 text-base font-semibold leading-snug text-slate-100 transition-colors group-hover:text-blue-400">
          {certificate.title}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
          {certificate.note}
        </p>

        <div className="mt-5">
          {certificate.link ? (
            <MagneticButton
              href={certificate.link}
              variant="outline"
              external
              className="!px-4 !py-2 text-xs"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Verify
            </MagneticButton>
          ) : (
            <p className="text-xs text-slate-400">Scan only — no verify link</p>
          )}
        </div>
      </div>
    </TiltCard>
  );
}
