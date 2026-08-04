"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";

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
    value: "Yahesh M",
    href: siteConfig.linkedin,
  },
  {
    label: "GitHub",
    icon: Github,
    value: "Yahesh M",
    href: siteConfig.github,
  },
  {
    label: "Location",
    icon: MapPin,
    value: "Erode, Tamil Nadu, India (Open to work anywhere)",
  },
];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  useEffect(() => {
    emailjs.init(siteConfig.emailjs.publicKey);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          watermark="Contact"
          title="Get In Touch"
          description="Let's connect! Whether it's internships, collaborations, or sharing ideas in AI & Data Science — feel free to reach out."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2" data-reveal-stagger>
          <div className="glass-card flex h-full flex-col p-6 text-white sm:p-8">
            <div className="relative z-10 flex h-full flex-col">
              <h3 className="text-lg font-semibold">Contact Details</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                I&apos;m always open to exploring opportunities, collaborating
                on projects, or discussing ideas.
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
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="user_name" className="mb-1.5 block text-sm font-medium text-slate-300">
                  Your Name
                </label>
                <input
                  id="user_name"
                  name="user_name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label htmlFor="user_email" className="mb-1.5 block text-sm font-medium text-slate-300">
                  Your Email
                </label>
                <input
                  id="user_email"
                  name="user_email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-slate-300">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="Enter subject"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Write your message"
                  className="w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <input type="hidden" name="to_email" value={siteConfig.email} />

              <MagneticButton
                type="submit"
                variant="primary"
                className="w-full"
              >
                <Send className="h-4 w-4" />
                {status === "loading" ? "Sending..." : "Send Mail"}
              </MagneticButton>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.p
                    key="success"
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center text-sm text-emerald-600"
                    role="status"
                  >
                    Message sent successfully!
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center text-sm text-red-600"
                    role="alert"
                  >
                    Failed to send message. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
