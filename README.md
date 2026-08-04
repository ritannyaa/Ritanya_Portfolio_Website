# Yahesh M — Portfolio

Personal portfolio built with Next.js (App Router), React 19, Tailwind CSS v4,
and Framer Motion.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **Tailwind CSS v4** — CSS-first config, no `tailwind.config.js`
- **Framer Motion** — UI micro-interactions
- **GSAP + ScrollTrigger** — scroll reveals
- **Lenis** — smooth scrolling
- **lucide-react** — UI icons · **react-icons** (Simple Icons) — technology logos
- **EmailJS** — contact form

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint
```

> Don't run `npm run build` while `npm run dev` is running — they share the
> `.next` directory, and the dev server will start serving unstyled pages.

## Project structure

```
app/                    # App Router routes
  layout.tsx            # fonts, providers, navbar/footer shell
  page.tsx              # home — composes the sections below
  globals.css           # theme tokens, base layer, shared components
  experience/           # /experience
  certificates/         # /certificates
components/
  sections/             # one file per page section (Hero, Projects, …)
  layout/               # Navbar, Footer
  ui/                   # reusable presentational pieces
  effects/              # AmbientBackground, PageEntrance
  providers/            # SmoothScroll, ScrollReveal, Interaction
lib/
  data/                 # site copy and content (single source of truth)
  hooks/                # useActiveSection, useReducedMotion, …
  motion/ interaction/  # easing curves, cursor/scroll math
  utils/                # cn()
public/                 # static assets served from /
```

### Conventions

- **Content lives in `lib/data/`**, not in components. Edit copy there.
- **Sections are transparent.** The page has one continuous background:
  `body`'s `--color-surface` plus the fixed `AmbientBackground` layer. A section
  that sets its own opaque background will cut a visible seam into the page.
- **Colour comes from tokens** in `app/globals.css` (`--color-accent`,
  `--color-surface`, `--color-ink`, …). The palette is deliberately one accent
  blue varying in lightness.
- **`components/sections/Hero.css`** is the one hand-written stylesheet, scoped
  under `.mkt-hero`. It exists because the orbit visualisation needs transform
  chains and mask compositing that Tailwind has no vocabulary for.

## Configuration

The contact form uses EmailJS. Its IDs live in `lib/data/site.ts` under
`siteConfig.emailjs`. These are client-side values and ship inside the public
JavaScript bundle by design — protect the account with EmailJS's domain
allowlist rather than by hiding the keys.

## Deploy

Connect the repository to [Vercel](https://vercel.com) — no extra configuration
needed. `npm run build` must pass first.
