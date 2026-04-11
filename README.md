# NextSaaS – AI Software Starter

Modern SaaS/AI marketing template built with **Next.js 15**, **React 19** and **TypeScript**. The repo ships with dozens of prebuilt pages, a polished component library and markdown-driven content so teams can launch marketing sites or landing flows quickly.

---

## Table of Contents

1. [Stack & Highlights](#stack--highlights)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Routes & Data Sources](#routes--data-sources)
5. [Development Scripts](#development-scripts)
6. [Customization Notes](#customization-notes)
7. [Maintenance Checklist](#maintenance-checklist)
8. [Deployment](#deployment)
9. [Support](#support)

---

## Stack & Highlights

| Layer      | Details                                                                   |
| ---------- | ------------------------------------------------------------------------- |
| Framework  | Next.js 15 (App Router + Turbopack)                                       |
| Language   | TypeScript 5                                                              |
| Styling    | Tailwind CSS 4 + custom tokens                                            |
| UI System  | 500+ components under `src/components` (hero, CTA, pricing, testimonials) |
| Content    | Markdown (blog, case study, services, customer, whitepaper, careers)      |
| Animations | GSAP + Lenis for smooth interactions                                      |
| Theming    | Light/Dark via `next-themes`                                              |
| Tooling    | ESLint, Prettier, lint-staged, Husky, Commitlint                          |

**Key capabilities**

- 20+ homepage layouts, 50+ inner pages (about, pricing, changelog, team, tutorials, etc.).
- Dynamic routes: `blog/[slug]`, `case-study/[slug]`, `customer/[slug]`, `services/[slug]`, `team/[slug]`, `career/[slug]`, `whitepaper/[slug]`, `glossary/[slug]`.
- SEO-ready metadata helpers (`generateMetadata`) with enforced `"<Page Name> - App Builder || NextSaaS"` convention.
- Global providers for smooth scrolling, modals, tab state and theme switching.

---

## Getting Started

```
# install dependencies
yarn install

# run locally (Turbopack)
yarn dev        # http://localhost:3000

# production build + preview
yarn build
yarn start
```

**Prerequisites**

- Node.js 18+
- Yarn 1.22+ (or npm/pnpm)

---

## Project Structure

```
ai-software/
├── public/
│   ├── images/              # marketing assets grouped by usage
│   └── video/               # bg loops
├── src/
│   ├── app/
│   │   ├── page.tsx         # home
│   │   ├── layout.tsx       # providers + navbar/footer
│   │   ├── globals.css      # base styles
│   │   └── <route>/page.tsx # every marketing page (about, pricing, etc.)
│   ├── components/
│   │   ├── shared/          # CTA, hero, navbar, footer, testimonials, ui primitives
│   │   ├── <feature>/       # sections for specific pages (career, customer, analytics...)
│   │   └── ui/              # base inputs, buttons, cards
│   ├── context/             # App, Modal, Mobile menu, Tab contexts
│   ├── data/
│   │   ├── blogs/*.md
│   │   ├── case-study/*.md
│   │   ├── customer/*.md
│   │   ├── services/*.md
│   │   ├── team/*.md
│   │   ├── whitepaper/*.md
│   │   └── json/*           # glossary, testimonials, toc, etc.
│   ├── hooks/               # animation + interaction hooks
│   ├── styles/              # Tailwind tokens + base CSS
│   ├── utils/               # metadata, markdown helpers, formatting
│   └── icons/               # SVG icon components
├── next.config.ts
├── eslint.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Routes & Data Sources

| Route(s)                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Description                                                              | Data Source                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------- |
| `/`                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Default homepage                                                         | static component data                  |
| `/about`, `/why-choose-us`, `/use-case`, `/features`, `/integration`, `/pricing`, `/testimonial`, `/success-stories`, `/support`, `/faq`, `/gdpr`, `/legal`, `/privacy-policy`, `/terms-conditions`, `/refund-policy`, `/security`, `/press`, `/brandkit`, `/our-manifesto`, `/download`, `/contact-us`, `/documentation`, `/tutorial`, `/referral-program`, `/affiliate-policy`, `/affiliates`, `/analytics`, `/services`, `/process`, `/changelog`, `/customer` | Marketing sections assembled from `src/components/<page>` + TS/JSON data | various `src/data/*.ts`/`.json`        |
| `/blog` & `/blog/[slug]`                                                                                                                                                                                                                                                                                                                                                                                                                                          | Blog index & markdown detail                                             | `src/data/blogs/*.md`                  |
| `/case-study` & `/case-study/[slug]`                                                                                                                                                                                                                                                                                                                                                                                                                              | Case studies                                                             | `src/data/case-study/*.md`             |
| `/customer/[slug]`                                                                                                                                                                                                                                                                                                                                                                                                                                                | Customer deep dives                                                      | `src/data/customer/*.md`               |
| `/services/[slug]`                                                                                                                                                                                                                                                                                                                                                                                                                                                | Service detail pages                                                     | `src/data/services/*.md`               |
| `/team` & `/team/[slug]`                                                                                                                                                                                                                                                                                                                                                                                                                                          | Team listing & bios                                                      | `src/data/team/*.md`                   |
| `/career` & `/career/[slug]`                                                                                                                                                                                                                                                                                                                                                                                                                                      | Careers + application instructions                                       | `src/data/career/*.md`                 |
| `/whitepaper` & `/whitepaper/[slug]`                                                                                                                                                                                                                                                                                                                                                                                                                              | Whitepaper hub                                                           | `src/data/whitepaper/*.md`             |
| `/glossary` & `/glossary/[slug]`                                                                                                                                                                                                                                                                                                                                                                                                                                  | Glossary cards                                                           | `src/data/json/glossary/glossary.json` |

> Dynamic pages rely on `generateStaticParams` to pre-render all markdown entries at build time.

---

## Development Scripts

```
yarn dev             # local dev
yarn build           # compile + generate static output
yarn start           # serve .next output

yarn lint            # ESLint flat config
yarn lint:fix        # ESLint with fixes
yarn format          # Prettier write
yarn format:check    # Prettier verify
```

Recommended workflow: run `yarn lint` + `yarn build` before pushing to catch bundle or type issues.

---

## Customization Notes

- **Branding**: update tokens in `src/styles/variables.css` and fonts in `src/utils/font.ts`.
- **Metadata**: use `generateMetadata(title, description)` to keep OpenGraph/Twitter tags in sync. Follow the `"<Page Name> - App Builder || NextSaaS"` naming format.
- **Assets**: add images under `public/images`. Leverage Next/Image for optimization.
- **Reusable layout**: `src/app/layout.tsx` wires SmoothScrollProvider, ThemeProvider, navbar and footer. Add new global providers there.
- **Markdown schema**: frontmatter fields such as `title`, `slug`, `author`, `thumbnail` are consumed by `getMarkDownData` and `getMarkDownContent` helpers.
- **Animation hooks**: utilities like `useProgressAnimation`, `useStackCards`, `useWordAnimation` live in `src/hooks`.

---

## Maintenance Checklist

Recent work (Nov 2025):

- Removed **606** unused images and **25** unused components → smaller bundle.
- Audited every `src/app/**/page.tsx` metadata block to ensure titles match the route.
- Verified production builds with `yarn build` after cleanups.

Going forward:

- When adding assets/components, delete stale ones and rerun `yarn build`.
- Keep markdown file names aligned with slug fields (e.g., `src/data/customer/asana.md`).
- For new routes, implement `generateStaticParams` so content stays statically generated.

---

## Deployment

```
yarn build
yarn start   # preview locally
```

Deploy to **Vercel** (recommended) or any Node-capable host. No runtime environment variables are required today. If you add integrations, document them here and in `.env.example`.

---

## Support

- Email: [hello@pixel71.com](mailto:hello@pixel71.com)
- Please include Node/Yarn versions plus `yarn build` output when filing issues.

Happy shipping! 🚀
