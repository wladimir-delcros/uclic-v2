# Build Report — uclic V2 (final)

## Lint (npm run lint)
- Errors: 9 -> **3 fixed in app code**, 6 remaining in `scripts/clean-levee-spam.ts` only (curly-braces style, NOT in build path)
- Warnings: 92 (cosmetic: unused eslint-disable directives for img-element, console statements in lib/scripts, a few `any` in expertise.ts)
- Top issues fixed:
  - `src/app/meilleure-agence/[slug]/page.tsx` -> removed unused `MapPin`, `Phone` imports
  - `src/components/nav/navData.ts` -> removed unused `BookOpen` import
- Remaining lint errors are limited to a maintenance script (`clean-levee-spam.ts`) and don't block production.

## Typecheck (tsc --noEmit)
- Errors before: 8
- Errors after: **0**
- Fixes:
  - `src/components/ui/SectionAmbience.tsx` -> added `'soft'` to `Variant` union (was used in 6 sites in audit + charte-freelance)
  - `src/app/layout.tsx` -> added `template: '%s'` to satisfy `DefaultTemplateString`
  - `src/app/expertise/page.tsx` -> removed obsolete `@ts-expect-error` directive (line 396)

## Smoke test dev server (31 routes)
| HTTP | Route |
|------|-------|
| 200 | / /a-propos /audit /blog /cas-clients /charte-freelance /contact /equipe /expertise /expertise/agence-seo /legal /legal/rgpd /legal/mentions-legales /levee-de-fonds /login /meilleure-agence /meilleure-agence-growth /membres/workflows /merci /outils-gratuits /outils-gratuits/mde-calculator /outils-gratuits/ab-test-calculator /presse /rejoindre /scraping /signup /simulation /tarifs /toolbox |
| 307 | /membres/profil (auth redirect, expected) |
| 404 | /not-found-test-1234 (expected) |
- Tous OK : **oui**
- Erreurs 5xx : aucune

## Build production
- Status: **success**
- Compile: 16.1s
- TypeScript: 23.9s
- Static generation: 59s for **2353 pages** (7 workers)
- Total wall-clock: ~100s
- Routes: 40 static (○) + 23 SSG (●) + 2 dynamic (ƒ = /membres/profil, /membres/workflows)
- Pages générées : 2353 (scraping, expertise, meilleure-agence, levee-de-fonds, blog, etc.)
- Warnings:
  - "Custom Cache-Control headers detected for /_next/static/:path*" (intentional via next.config — non bloquant)
  - Bundle size table non émis par Turbopack en Next 16 (note infra)

## VERDICT FINAL
- **READY TO COMMIT : OUI**
- Issues bloquantes restantes : aucune
- Lint errors résiduels : uniquement script CLI hors build path (`scripts/clean-levee-spam.ts`)
- Recommandation : commit OK. Optionnel post-commit : nettoyer les `eslint-disable next/next/no-img-element` désormais inutiles (~30 occurrences) et corriger curly braces dans le script de nettoyage levee.
