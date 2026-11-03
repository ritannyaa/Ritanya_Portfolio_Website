import { Mail, MapPin, Phone, Linkedin, Github } from "lucide-react";
import { footerContent, siteConfig } from "@/lib/data/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-[var(--color-surface-elevated)]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-accent-soft), var(--color-accent), transparent)",
        }}
        aria-hidden
      />

      <div className="section-container px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div data-reveal-stagger className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="mb-3 text-lg font-semibold text-stone-100">About</h2>
            <p className="text-sm leading-relaxed text-stone-400">
              {footerContent.about}
            </p>
            <ul className="mt-5 flex gap-3">
              <li>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="button"
                  data-magnetic
                  data-magnetic-strength="0.26"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-stone-300 transition duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-amber-400/50 hover:bg-white/10 hover:text-[var(--color-accent-soft)] hover:shadow-md hover:shadow-amber-500/15"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="button"
                  data-magnetic
                  data-magnetic-strength="0.26"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-stone-300 transition duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-amber-400/50 hover:bg-white/10 hover:text-[var(--color-accent-soft)] hover:shadow-md hover:shadow-amber-500/15"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  data-cursor="button"
                  data-magnetic
                  data-magnetic-strength="0.26"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-stone-300 transition duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-amber-400/50 hover:bg-white/10 hover:text-[var(--color-accent-soft)] hover:shadow-md hover:shadow-amber-500/15"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-stone-100">
              {footerContent.rolesTitle}
            </h2>
            <ul className="space-y-2 text-sm text-stone-400">
              {footerContent.roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </div>

          <div>
            {/* Was "Have a Questions?" — a grammatical error sitting in a
                heading, which is the kind of thing a reader notices and
                silently downgrades you for. */}
            <h2 className="mb-3 text-lg font-semibold text-stone-100">
              {footerContent.contactTitle}
            </h2>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex gap-2">
                {/* Short form here on purpose — the full "studying in
                    Coimbatore" phrasing already appears in About and in
                    Contact, and a third verbatim repeat reads as one variable
                    wired into three slots. */}
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" />
                <span>{siteConfig.home}</span>
              </li>
              <li className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" />
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="transition-colors duration-200 hover:text-[var(--color-accent-soft)]"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors duration-200 hover:text-[var(--color-accent-soft)]"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* A colophon rather than "Thank You for visiting site". The source
            link is the point: anyone who wants to know how this was built can
            go read it. */}
        <p
          data-reveal
          className="mt-12 border-t border-white/8 pt-8 text-center text-sm text-stone-400"
        >
          © {new Date().getFullYear()} {siteConfig.name} · Built with Next.js
          and too many small revisions ·{" "}
          <a
            href={siteConfig.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors duration-200 hover:text-[var(--color-accent-soft)]"
          >
            source
          </a>
        </p>
      </div>
    </footer>
  );
}
