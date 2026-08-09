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

No `clsx` or `tailwind-merge`: `cn()` is a plain filter-and-join
(`lib/utils/cn.ts`). Nothing here depends on later Tailwind utilities
overriding earlier ones, so there was nothing for `twMerge` to do.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build      # production build
npm start          # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

> Don't run `npm run build` while `npm run dev` is running — they share the
> `.next` directory, and the dev server will start serving unstyled pages.

## Project structure

```
app/                    # App Router routes
  layout.tsx            # fonts, metadata, JSON-LD, providers, page shell
  page.tsx              # home — composes the sections below
  globals.css           # theme tokens, base layer, shared components
  experience/           # /experience
  certificates/         # /certificates
  icon.tsx              # favicon, generated at build time
  opengraph-image.tsx   # 1200x630 social card, generated at build time
  robots.ts             # /robots.txt
  sitemap.ts            # /sitemap.xml
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

- **Content lives in `lib/data/`**, not in components. Edit copy there —
  including the Hero's heading and availability line, which are
  `heroContent` in `lib/data/site.ts`.
- **Optional links are genuinely optional.** A project with no `github`, a
  certificate with no `link`, an internship with no `certificateLink` — each
  renders without that button rather than pointing somewhere broken. Don't
  reintroduce a placeholder URL to fill the slot; leave the field off.
- **Numbers must be checkable.** `statsContent` entries carry `exact: true`
  when the figure is something a visitor can verify by counting cards, which
  suppresses the `+`.
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

**`NEXT_PUBLIC_SITE_URL` — set this before deploying.** It is the origin used
for the canonical tag, `metadataBase`, `sitemap.xml` and every Open Graph URL.
`lib/data/site.ts` falls back to `https://yaheshm.vercel.app` if it is unset,
so a different domain will advertise the wrong canonical URL until it is
configured.

The contact form uses EmailJS. Its IDs live in `lib/data/site.ts` under
`siteConfig.emailjs`. These are client-side values and ship inside the public
JavaScript bundle by design — protect the account with EmailJS's domain
allowlist rather than by hiding the keys.

## Deploy

Connect the repository to [Vercel](https://vercel.com), set
`NEXT_PUBLIC_SITE_URL` in Project → Settings → Environment Variables, and
deploy. `npm run build`, `npm run lint` and `npm run typecheck` must all pass
first.

Security headers (`X-Frame-Options`, `X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy`) are set in `next.config.ts` and apply
to every route.
