"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { easeOutExpo } from "@/lib/motion/easing";

type ContactRow = {
  label: string;
  icon: typeof Mail;
  value: string;
  href?: string;
};

const contactRows: ContactRow[] = [
  { label: "Email", icon: Mail, value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  {
    label: "LinkedIn",
    icon: Linkedin,
    value: "in/yahesh-m",
    href: siteConfig.linkedin,
  },
  {
    label: "GitHub",
    icon: Github,
    value: "@yaheshmaheshwaran",
    href: siteConfig.github,
  },
  {
    label: "Based in",
    icon: MapPin,
    value: siteConfig.location,
  },
];

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20";

const labelClass = "mb-1.5 block text-sm font-medium text-slate-300";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  useEffect(() => {
    emailjs.init(siteConfig.emailjs.publicKey);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Guard against a second submit while the first is still in flight —
    // the button is disabled too, but a stray Enter keypress can still fire.
    if (status === "loading") return;
    setStatus("loading");
    const form = e.currentTarget;

    try {
      await emailjs.sendForm(
        siteConfig.emailjs.serviceId,
        siteConfig.emailjs.templateId,
        form,
        siteConfig.emailjs.publicKey
      );
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact-section"
      data-section
      className="section-padding"
      aria-label="Contact"
    >
      <div className="section-container">
        <SectionHeading
          watermark="hello"
          title="Say hello"
          description="Internship leads, a question about anything above, or a reason one of these projects is wrong — all welcome. I read everything that arrives here."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2" data-reveal-stagger>
          <div className="glass-card flex h-full flex-col p-6 text-white sm:p-8">
            <div className="relative z-10 flex h-full flex-col">
              <h3 className="text-lg font-semibold">Where to find me</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Email is fastest. LinkedIn works too.
              </p>

              <ul className="mt-6 space-y-4">
                {contactRows.map(({ label, icon: Icon, value, href }) => {
                  const content = (
                    <>
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[var(--color-accent-soft)]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-xs font-medium uppercase tracking-wide text-slate-400">
                          {label}
                        </span>
                        <span className="text-sm leading-relaxed text-slate-100">
                          {value}
                        </span>
                      </span>
                    </>
                  );
                  return (
                    <li
                      key={label}
                      className="flex items-start gap-3 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                    >
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("mailto:") ? undefined : "_blank"}
                          rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                          className="flex items-start gap-3 transition-opacity hover:opacity-80"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-start gap-3">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2 pt-2">
                <MagneticButton href={siteConfig.resumeUrl} variant="secondary" external>
                  Resume
                </MagneticButton>
                <MagneticButton href={siteConfig.linkedin} variant="outline" external>
                  LinkedIn
                </MagneticButton>
                <MagneticButton href={siteConfig.github} variant="outline" external>
                  GitHub
                </MagneticButton>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 sm:p-8">
            <h3 className="mb-5 text-lg font-semibold text-slate-100">
              Or send it from here
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="user_name" className={labelClass}>
                  Name
                </label>
                {/* Placeholders describe what to put in the field rather than
                    restating the label. "Enter your name" under a label that
                    already says Name is placeholder text about placeholder
                    text. */}
                <input
                  id="user_name"
                  name="user_name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Who's writing"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="user_email" className={labelClass}>
                  Email
                </label>
                <input
                  id="user_email"
                  name="user_email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Where I should reply"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="subject" className={labelClass}>
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="What it's about"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="As much or as little detail as you like."
                  className={`${fieldClass} resize-y`}
                />
              </div>

              <input type="hidden" name="to_email" value={siteConfig.email} />

              <MagneticButton
                type="submit"
                variant="primary"
                className="w-full"
                disabled={status === "loading"}
              >
                <Send className="h-4 w-4" />
                {status === "loading" ? "Sending…" : "Send message"}
              </MagneticButton>

              {/* The live region is mounted from first render and stays
                  mounted — only its contents change. role="status" applied to
                  a node that is itself inserted on submit is unreliable:
                  several screen reader and browser pairs only announce
                  mutations within a region that already existed, so the
                  result of the submission was silently lost. */}
              <div
                aria-live="polite"
                aria-atomic="true"
                className="min-h-[1.25rem]"
              >
                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.p
                      key="success"
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: easeOutExpo }}
                      // Was emerald-600 / red-600 — both are dark enough on
                      // this near-black card to sit under the contrast floor.
                      className="text-center text-sm text-emerald-400"
                    >
                      That&apos;s with me. I&apos;ll reply as soon as I see it.
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: easeOutExpo }}
                      className="text-center text-sm text-red-400"
                    >
                      That didn&apos;t go through. Try again, or mail me
                      directly at{" "}
                      {/* An error state that only says "failed" leaves the
                          visitor with nothing. This hands them the fallback. */}
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="underline underline-offset-2 hover:text-red-300"
                      >
                        {siteConfig.email}
                      </a>
                      .
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
