'use client';
import Image from 'next/image';
import SectionAmbience from '../ui/SectionAmbience';

const IconLinkedIn = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>);
const IconX = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>);
const IconGitHub = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.648.5.5 5.648.5 12c0 5.082 3.292 9.387 7.863 10.91.575.105.787-.25.787-.556 0-.274-.01-1.002-.016-1.967-3.197.695-3.873-1.542-3.873-1.542-.523-1.329-1.278-1.683-1.278-1.683-1.044-.714.079-.7.079-.7 1.155.082 1.763 1.186 1.763 1.186 1.026 1.759 2.693 1.251 3.35.957.104-.744.402-1.252.73-1.54-2.553-.291-5.238-1.276-5.238-5.683 0-1.255.449-2.28 1.185-3.084-.119-.291-.513-1.462.112-3.048 0 0 .966-.309 3.165 1.178A10.99 10.99 0 0112 6.844c.977.004 1.962.132 2.881.388 2.198-1.487 3.163-1.178 3.163-1.178.626 1.586.232 2.757.114 3.048.738.804 1.184 1.829 1.184 3.084 0 4.418-2.69 5.389-5.252 5.674.413.355.78 1.057.78 2.131 0 1.538-.013 2.778-.013 3.155 0 .308.208.667.791.554C20.21 21.383 23.5 17.08 23.5 12 23.5 5.648 18.352.5 12 .5z"/></svg>);
const IconStar = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.869 1.401-8.168L.132 9.21l8.2-1.192z"/></svg>);

const LogoGoogle = () => (
  <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
    <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/>
    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
  </svg>
);

const LogoTrustpilot = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#00B67A" d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.869 1.401-8.168L.132 9.21l8.2-1.192z"/>
  </svg>
);

const LogoSortlist = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <rect width="24" height="24" rx="5" fill="#FF5757"/>
    <path fill="#fff" d="M8.5 7h2.9v3.1h3.1v2.9h-3.1V16H8.5v-3h-3v-2.9h3z"/>
  </svg>
);

const serviceLinks = [
  { label: 'Branding', href: 'https://uclic.fr/expertise/agence-branding' },
  { label: 'CRM', href: 'https://uclic.fr/expertise/crm-gestion-de-la-relation-client' },
  { label: 'Data Analytics', href: 'https://uclic.fr/expertise/agence-data-analytics' },
  { label: 'Growth Marketing', href: 'https://uclic.fr/expertise/growth-marketing' },
  { label: 'Intelligence Artificielle', href: 'https://uclic.fr/expertise/agence-intelligence-artificielle' },
  { label: 'Paid Media', href: 'https://uclic.fr/expertise/agence-paid-media' },
  { label: 'SEO', href: 'https://uclic.fr/expertise/agence-seo' },
  { label: 'Social Ads', href: 'https://uclic.fr/expertise/agence-sma' },
  { label: 'Workflows n8n', href: 'https://uclic.fr/membres/workflows' },
];

const siteLinks = [
  { label: 'À propos', href: 'https://uclic.fr/a-propos' },
  { label: 'Notre équipe', href: 'https://uclic.fr/equipe' },
  { label: 'Levées de fonds', href: 'https://uclic.fr/levee-de-fonds' },
  { label: 'La charte du Freelance', href: 'https://uclic.fr/charte-freelance' },
  { label: 'Meilleures Agences', href: 'https://uclic.fr/meilleure-agence' },
  { label: 'Meilleure Agence Growth', href: 'https://uclic.fr/meilleure-agence-growth' },
  { label: 'Nous rejoindre', href: 'https://uclic.fr/contact' },
  { label: 'Toolbox', href: 'https://uclic.fr/toolbox' },
  { label: 'Services de Scraping', href: 'https://uclic.fr/scraping' },
];

const memberLinks = [
  { label: 'Se connecter', href: 'https://uclic.fr/login' },
  { label: "S'inscrire", href: 'https://uclic.fr/signup' },
];

const ratings = [
  { score: '4,9/5', count: '17 avis', label: 'Google', href: 'https://www.google.com/search?q=uclic+avis', Logo: LogoGoogle },
  { score: '4,3/5', count: '7 avis', label: 'Trustpilot', href: 'https://fr.trustpilot.com/review/uclic.fr', Logo: LogoTrustpilot },
  { score: '4,96/5', count: '6 avis', label: 'Sortlist', href: 'https://www.sortlist.fr/agency/uclic', Logo: LogoSortlist },
];

const legalLinks = [
  { label: 'Mentions légales', href: 'https://uclic.fr/legal/mentions-legales' },
  { label: 'Conditions Générales de Vente', href: 'https://uclic.fr/legal/conditions-generales-de-vente' },
  { label: 'RGPD', href: 'https://uclic.fr/legal/rgpd' },
];

const eyebrowClass =
  'flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4';
const linkClass =
  'text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[color:var(--border-subtle)] bg-[color:var(--bg)] pt-20 pb-10">
      {/* Filet top cohérent avec les sections standard */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />

      {/* Ambiance cohérente avec les sections finalisées */}
      <SectionAmbience variant="medium" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
        {/* Header: logo + baseline + socials */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-[color:var(--border-subtle)]">
          <div>
            <a href="/" className="flex items-center shrink-0" aria-label="uclic.fr">
              <Image src="/logo.svg" alt="uclic" width={132} height={38} className="h-9 w-auto logo-themed" />
            </a>
            <p className="mt-4 text-[14px] text-[color:var(--ink-muted)] max-w-[320px] leading-relaxed">
              Agence Growth Marketing & IA. Pilotage senior, experts canaux, agents IA en production.
            </p>
            <div className="mt-4 flex items-center gap-3 text-[14px] text-[color:var(--ink-muted)]">
              <a href="tel:+33617125428" className={linkClass}>
                +33 6 17 12 54 28
              </a>
              <span className="w-1 h-1 rounded-full bg-[color:var(--border-subtle)]" />
              <a
                href="https://uclic.fr/audit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/10 px-3 py-1 text-[12px] font-medium text-[color:var(--accent)] hover:bg-[color:var(--accent)]/15 transition-colors">
                Audit Gratuit
              </a>
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/company/uclic-growth-marketing/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full grid place-items-center border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)]/30 transition-colors">
              <IconLinkedIn />
            </a>
            <a
              href="https://x.com/delcros_w"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="w-9 h-9 rounded-full grid place-items-center border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)]/30 transition-colors">
              <IconX />
            </a>
            <a
              href="https://github.com/wladimir-delcros"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 rounded-full grid place-items-center border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)]/30 transition-colors">
              <IconGitHub />
            </a>
          </div>
        </div>

        {/* Grid: 4 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
          <div>
            <div className={eyebrowClass}>
              <span className="w-6 h-px bg-[color:var(--accent)]" /> Nos services
            </div>
            <ul className="space-y-2 text-[14px]">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className={eyebrowClass}>
              <span className="w-6 h-px bg-[color:var(--accent)]" /> Plan du site
            </div>
            <ul className="space-y-2 text-[14px]">
              {siteLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className={eyebrowClass}>
              <span className="w-6 h-px bg-[color:var(--accent)]" /> Espace membre
            </div>
            <ul className="space-y-2 text-[14px]">
              {memberLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 pill !text-[11px] !py-1 !px-3">
              🇫🇷 La French Tech
            </div>
          </div>

          <div>
            <div className={eyebrowClass}>
              <span className="w-6 h-px bg-[color:var(--accent)]" /> Abonnez-vous
            </div>
            <p className="text-[13px] text-[color:var(--ink)] font-medium">
              Profitez de conseil d&apos;experts dans votre boîte mail
            </p>
            <p className="mt-2 text-[12px] text-[color:var(--ink-muted)] leading-relaxed">
              En vous inscrivant, vous acceptez de recevoir des emails marketing de notre part.
            </p>
            <form
              action="#"
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex flex-col sm:flex-row gap-2">
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Adresse email
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                required
                placeholder="vous@exemple.com"
                className="flex-1 min-w-0 rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--bg)] px-4 py-2 text-[13px] text-[color:var(--ink)] placeholder:text-[color:var(--ink-muted)] focus:outline-none focus:border-[color:var(--accent)]/50 focus:ring-1 focus:ring-[color:var(--accent)]/30 transition-colors"
              />
              <button
                type="submit"
                className="rounded-full bg-[color:var(--accent)] px-4 py-2 text-[13px] font-medium text-[color:var(--accent-ink,#0b0b0c)] hover:opacity-90 transition-opacity">
                S&apos;abonner
              </button>
            </form>
          </div>
        </div>

        {/* Block ratings */}
        <div className="mt-12 pt-8 border-t border-[color:var(--border-subtle)]">
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-8">
            {ratings.map((r) => (
              <a
                key={r.label}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--ink)] transition-colors">
                <span className="flex items-center shrink-0">
                  <r.Logo />
                </span>
                <span className="text-[color:var(--accent)] flex items-center">
                  <IconStar />
                </span>
                <span className="text-[color:var(--ink)] font-medium">{r.score}</span>
                <span className="text-[color:var(--ink-muted)]">· {r.count} ·</span>
                <span className="underline-offset-2 group-hover:underline">{r.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom: copyright + legal links */}
        <div className="mt-10 pt-8 border-t border-[color:var(--border-subtle)] flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[12px] text-[color:var(--ink-muted)]">
          <span>
            © 2026 Uclic. Tous droits réservés. · Fait par{' '}
            <a
              href="https://uclic.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--ink)] hover:text-[color:var(--accent)] transition-colors underline-offset-2 hover:underline">
              uclic.fr
            </a>
          </span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}>
                {l.label}
              </a>
            ))}
            <a href="#top" className={linkClass}>
              Retour en haut
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
