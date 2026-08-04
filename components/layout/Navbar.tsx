"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems, siteConfig } from "@/lib/data/site";
import { useActiveSection } from "@/lib/hooks/useActiveSection";
import { cn } from "@/lib/utils/cn";
import { easeOutExpo } from "@/lib/motion/easing";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const activeId = useActiveSection(
    navItems.filter((n) => n.href.includes("#")).map((n) => n.href)
  );

  const isItemActive = (href: string) =>
    href.includes("#")
      ? pathname === "/" && href.endsWith(`#${activeId}`)
      : pathname === href;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-4 sm:px-6"
      initial={false}
      animate={{
        paddingTop: scrolled ? 8 : 16,
      }}
      transition={{ duration: 0.35, ease: easeOutExpo }}
    >
      <motion.nav
        // No Tailwind `shadow-*` here and no animated backgroundColor: both
        // would land in the utilities layer / inline styles and win over
        // .glass-nav, flattening the liquid-glass material back into an opaque
        // slab. The bar's depth and its scrolled state are both owned by CSS.
        // w-fit + mx-auto is what makes this a dock rather than a bar: the pill
        // hugs its contents and floats centred, instead of stretching to a
        // fixed max-width and pushing the name and links to opposite edges.
        // max-w-full keeps it from overflowing once the links no longer fit.
        className={cn(
          "glass-nav relative mx-auto flex w-fit max-w-full items-center gap-2 overflow-hidden rounded-full px-3.5",
          scrolled ? "glass-nav--dense py-1.5" : "py-2"
        )}
        animate={{ scale: scrolled ? 0.98 : 1 }}
        transition={{ duration: 0.4, ease: easeOutExpo }}
        aria-label="Main navigation"
      >
        <Link
          href="/#home-section"
          data-cursor="button"
          data-magnetic
          data-magnetic-strength="0.2"
          className="font-heading relative shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold tracking-wide text-slate-100 transition-[opacity,transform] duration-150 hover:opacity-80 active:scale-95"
        >
          {siteConfig.name.toUpperCase()}
        </Link>

        {/* Hairline between the wordmark and the links. In a dock there is no
            justify-between gap doing that separation any more. */}
        <span
          aria-hidden
          className="hidden h-4 w-px shrink-0 bg-white/15 lg:block"
        />

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => {
            const isActive = isItemActive(item.href);
            return (
              <li key={item.href} className="relative">
                <a
                  href={item.href}
                  data-cursor="button"
                  data-magnetic
                  data-magnetic-strength="0.24"
                  className={cn(
                    "group relative z-10 block whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13px] font-medium transition-[color,transform] duration-200 active:scale-90 lg:px-3",
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:text-slate-100"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-[var(--color-accent)] shadow-md shadow-blue-500/30"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                  {!isActive && (
                    <span className="absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-blue-400/70 transition-all duration-300 group-hover:w-3/4" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          data-cursor="button"
          data-magnetic
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-200 transition-[background-color,transform] duration-150 hover:bg-white/10 active:scale-90 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <motion.span
            key={open ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.span>
          Menu
        </button>

        <span className="scroll-progress-bar" aria-hidden />
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0, y: -12 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -12 }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
            className="glass-nav mx-auto mt-2 max-w-sm overflow-hidden rounded-3xl p-3 lg:hidden"
          >
            <motion.ul
              className="flex flex-col gap-1"
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
                closed: {},
              }}
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.href}
                  variants={{
                    closed: { opacity: 0, x: -12 },
                    open: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.3, ease: easeOutExpo }}
                >
                  <a
                    href={item.href}
                    data-cursor="button"
                    data-magnetic
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-sm font-medium transition-[background-color,color,transform] duration-150 active:scale-95",
                      isItemActive(item.href)
                        ? "bg-[var(--color-accent)] text-white"
                        : "text-slate-300 hover:bg-white/10 hover:text-slate-100"
                    )}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
