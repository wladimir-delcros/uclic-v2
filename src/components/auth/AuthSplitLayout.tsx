'use client';

import { ReactNode } from 'react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import Planet from '@/components/ui/Planet';

interface Props {
  /** Eyebrow label above the h1 (ex: "Espace membre", "Mot de passe") */
  eyebrow?: string;
  /** H1 title ; le dernier mot est mis en italique accent (comme le canon home) */
  title: string;
  /** Sub-copy sous le h1, facultatif */
  lead?: string;
  /** Contenu du formulaire (déjà stylé, sans wrapper card) */
  children: ReactNode;
  /** Footer slot sous le formulaire (ex: "Pas de compte ?", back link) */
  footer?: ReactNode;
  /** Prefixe unique pour les `defs` de la planète (éviter collisions si plusieurs instances) */
  planetId: string;
}

/**
 * Layout split-screen pour pages auth (login / signup / reset / update-password).
 * Gauche : contenu éditorial + formulaire, centré verticalement, fond --bg.
 * Droite : planète SVG (même composant que Hero / CtaFinal), camée partiellement
 * derrière un dégradé pour préserver la lisibilité du bord droit.
 */
export default function AuthSplitLayout({ eyebrow, title, lead, children, footer, planetId }: Props) {
  // Split title into "prefix" + last word so the last word gets the italic accent,
  // matching the home canon.
  const words = title.trim().split(/\s+/);
  const lastWord = words[words.length - 1];
  const prefix = words.slice(0, -1).join(' ');

  return (
    <>
      <Nav />
      <main className="relative bg-[color:var(--bg)] text-[color:var(--ink)]">
        <section className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-64px)] overflow-hidden">
          {/* Colonne gauche — formulaire + éditorial */}
          <div className="relative z-10 flex items-center px-5 lg:px-10 pt-24 lg:pt-28 pb-16 lg:pb-20">
            <div className="w-full max-w-[480px] mx-auto lg:mx-0 lg:ml-auto lg:mr-10">
              {/* Tout dans la card bento canon : eyebrow + h1 + lead + children */}
              <div className="relative !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 lg:p-8">
                {eyebrow ? (
                  <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                    <span className="w-6 h-px bg-[color:var(--accent)]" />
                    {eyebrow}
                  </div>
                ) : null}
                <h1 className="text-[clamp(26px,3.4vw,40px)] font-display font-medium tracking-[-0.02em] leading-[1.15] mb-5">
                  {prefix ? <>{prefix}{' '}</> : null}
                  <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                    {lastWord}
                    <span
                      aria-hidden="true"
                      className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl rounded-full"
                    />
                  </span>
                </h1>
                {lead ? (
                  <p className="text-[14px] lg:text-[15px] leading-[1.55] text-[color:var(--ink-muted)] mb-6">
                    {lead}
                  </p>
                ) : null}
                {children}
              </div>
              {footer ? <div className="mt-5 text-[13px] text-[color:var(--ink-muted)]">{footer}</div> : null}
            </div>
          </div>

          {/* Colonne droite — planète décor. Cachée sous lg pour libérer l'espace mobile.
              En light mode : wash vert accent + ink-inverse pour faire ressortir la planète. */}
          <div className="relative hidden lg:block overflow-hidden bg-[color:var(--bg)] light:bg-[color:var(--surface)]">
            {/* Wash accent en light uniquement — donne une profondeur autour de la planète */}
            <div
              aria-hidden="true"
              className="hidden light:block pointer-events-none absolute inset-0 z-0"
              style={{
                background:
                  'radial-gradient(ellipse 80% 70% at 50% 95%, rgba(15,147,71,0.22) 0%, rgba(15,147,71,0.08) 45%, transparent 80%)',
              }}
            />
            {/* Subtle scrim au bord gauche pour flatter la transition formulaire → viz */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[color:var(--bg)] to-transparent z-[2] light:from-[color:var(--surface)]"
            />
            {/* Wrap la planète dans un conteneur à aspect 3:2 (viewBox natif 1200×800)
                pour préserver l'arc horizon + éviter le trait net de clipping en bas. */}
            <div className="absolute inset-x-0 top-[1vh] bottom-0 flex items-center justify-center pointer-events-none">
              <div className="relative h-full scale-[1.12] origin-center" style={{ aspectRatio: '1200 / 800' }}>
                <Planet idPrefix={planetId} />
                {/* Halo blanc/accent courbé au-dessus de l'horizon — DA canon home */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 1200 800"
                  preserveAspectRatio="xMidYMid meet"
                  className="pointer-events-none absolute inset-0 w-full h-full z-[1]"
                >
                  <defs>
                    <linearGradient id={`${planetId}-halo-dark`} gradientUnits="userSpaceOnUse" x1="200" y1="240" x2="1000" y2="240">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                      <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.45" />
                      <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.7" />
                      <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id={`${planetId}-halo-light`} gradientUnits="userSpaceOnUse" x1="200" y1="240" x2="1000" y2="240">
                      <stop offset="0%" stopColor="#0F9347" stopOpacity="0" />
                      <stop offset="30%" stopColor="#0F9347" stopOpacity="0.32" />
                      <stop offset="50%" stopColor="#0F9347" stopOpacity="0.52" />
                      <stop offset="70%" stopColor="#0F9347" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#0F9347" stopOpacity="0" />
                    </linearGradient>
                    <filter id={`${planetId}-halo-blur`} x="-10%" y="-150%" width="120%" height="400%">
                      <feGaussianBlur stdDeviation="18" />
                    </filter>
                  </defs>
                  <g className="light:hidden" filter={`url(#${planetId}-halo-blur)`}>
                    <path d="M 220 240 A 700 700 0 0 0 980 240"
                      fill="none" stroke={`url(#${planetId}-halo-dark)`} strokeWidth="80" strokeLinecap="round" />
                  </g>
                  <g className="hidden light:block" filter={`url(#${planetId}-halo-blur)`}>
                    <path d="M 220 240 A 700 700 0 0 0 980 240"
                      fill="none" stroke={`url(#${planetId}-halo-light)`} strokeWidth="50" strokeLinecap="round" opacity="0.7" />
                  </g>
                </svg>
              </div>
            </div>
            {/* Fade bas — évite la coupure nette de la planète */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[color:var(--bg)] z-[3]"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
