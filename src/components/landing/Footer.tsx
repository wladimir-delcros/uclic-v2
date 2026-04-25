'use client';
import { useState } from 'react';
import SectionAmbience from '../ui/SectionAmbience';
import FooterPartnersMarquee from './FooterPartnersMarquee';

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
  { label: 'Branding', href: '/expertise/agence-branding' },
  { label: 'CRM', href: '/expertise/crm-gestion-de-la-relation-client' },
  { label: 'Data Analytics', href: '/expertise/agence-data-analytics' },
  { label: 'Growth Marketing', href: '/expertise/growth-marketing' },
  { label: 'Intelligence Artificielle', href: '/expertise/agence-intelligence-artificielle' },
  { label: 'Paid Media', href: '/expertise/agence-paid-media' },
  { label: 'SEO', href: '/expertise/agence-seo' },
  { label: 'Social Ads', href: '/expertise/agence-sma' },
  { label: 'Workflows n8n', href: '/membres/workflows' },
];

const siteLinks = [
  { label: 'À propos', href: '/a-propos' },
  { label: 'Notre équipe', href: '/equipe' },
  { label: 'Levées de fonds', href: '/levee-de-fonds' },
  { label: 'Collectif Freelance', href: '/charte-freelance' },
  { label: 'Meilleures Agences', href: '/meilleure-agence' },
  { label: 'Meilleure Agence Growth', href: '/meilleure-agence-growth' },
  { label: 'Nous rejoindre', href: '/contact' },
  { label: 'Toolbox', href: '/toolbox' },
  { label: 'Services de Scraping', href: '/scraping' },
];

const memberLinks = [
  { label: 'Se connecter', href: '/login' },
  { label: "S'inscrire", href: '/signup' },
];

const ratings = [
  { score: '4,9/5', count: '17 avis', label: 'Google', href: 'https://www.google.com/search?q=uclic+avis', Logo: LogoGoogle },
  { score: '4,3/5', count: '7 avis', label: 'Trustpilot', href: 'https://fr.trustpilot.com/review/uclic.fr', Logo: LogoTrustpilot },
  { score: '4,96/5', count: '6 avis', label: 'Sortlist', href: 'https://www.sortlist.fr/agency/uclic', Logo: LogoSortlist },
];

const legalLinks = [
  { label: 'Mentions légales', href: '/legal/mentions-legales' },
  { label: 'Conditions Générales de Vente', href: '/legal/conditions-generales-de-vente' },
  { label: 'RGPD', href: '/legal/rgpd' },
];

const eyebrowClass =
  'flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4';
const linkClass =
  'text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors';

export default function Footer() {
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const onNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = (e.currentTarget.elements.namedItem('email') as HTMLInputElement) ?? null;
    if (!input || !input.value || !/.+@.+\..+/.test(input.value)) {
      setNewsletterStatus('error');
      return;
    }
    // TODO: wire to real endpoint — stub success for now so the UX is accessible
    setNewsletterStatus('success');
    input.value = '';
  };
  return (
    <footer className="relative overflow-hidden border-t border-[color:var(--border-subtle)] bg-[color:var(--bg)] pb-10">
      {/* Filet top cohérent avec les sections standard */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />

      {/* Stack partenaires + clients supplémentaires — même UI/UX
          que le marquee sous le Hero, avec les logos non exposés là-haut. */}
      <FooterPartnersMarquee />

      {/* Spacer visuel après le marquee */}
      <div className="pt-16 lg:pt-20">

      {/* Ambiance cohérente avec les sections finalisées */}
      <SectionAmbience variant="medium" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
        {/* Header: 2 colonnes (logo+desc | badges) puis row phone | socials */}
        <div className="pb-10 border-b border-[color:var(--border-subtle)]">
          {/* Row 1 : logo + description à gauche, 3 badges à droite */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1 min-w-0">
              <a href="/" className="flex items-center shrink-0" aria-label="uclic.fr">
                <img src="/logo.svg" alt="uclic" width={132} height={38} loading="lazy" decoding="async" className="h-9 w-auto logo-themed" />
              </a>
              <p className="mt-4 text-[14px] text-[color:var(--ink-muted)] max-w-[440px] leading-relaxed">
                Uclic est une agence d&apos;experts en Intelligence Artificielle et Growth Marketing.
                Notre automatisation IA transforme vos campagnes en générateurs de revenus,
                multipliant vos résultats par 3x grâce à l&apos;automatisation complète de votre
                funnel marketing.
              </p>
            </div>
            <div className="flex flex-row flex-wrap md:flex-nowrap items-stretch gap-2 md:justify-end shrink-0">
              {/* Activateur France Num */}
              <a
                href="https://www.francenum.gouv.fr/activateurs/uclic"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Uclic — Activateur France Num (fiche officielle)"
                className="inline-flex items-center gap-2 rounded-md border border-[color:var(--border-subtle)] bg-[color:var(--card)] px-2.5 py-1 hover:border-[color:var(--accent)]/30 hover:bg-[color:var(--card-elev-1)] transition-colors"
              >
                <img
                  src="/france-num.jpeg"
                  alt="Marque Activateur France Num"
                  width={24}
                  height={24}
                  loading="lazy"
                  decoding="async"
                  className="h-6 w-6 object-contain rounded-sm shrink-0"
                />
                <span className="text-[12px] font-medium text-[color:var(--ink)] whitespace-nowrap">
                  Activateur France Num
                </span>
              </a>
              {/* RGPD & CNIL */}
              <a
                href="/legal/rgpd"
                aria-label="Uclic conforme RGPD — voir la politique"
                className="inline-flex items-center gap-2 rounded-md border border-[color:var(--border-subtle)] bg-[color:var(--card)] px-2.5 py-1 hover:border-[color:var(--accent)]/30 hover:bg-[color:var(--card-elev-1)] transition-colors"
              >
                <span
                  aria-hidden="true"
                  className="h-6 w-6 rounded-sm bg-[color:var(--accent)]/10 text-[color:var(--accent)] grid place-items-center shrink-0"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l8 3v6c0 4.97-3.58 9-8 10-4.42-1-8-5.03-8-10V6l8-3z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </span>
                <span className="text-[12px] font-medium text-[color:var(--ink)] whitespace-nowrap">
                  RGPD &amp; CNIL
                </span>
              </a>
              {/* IA Responsable — AI Act */}
              <a
                href="https://artificialintelligenceact.eu/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Uclic — IA responsable, aligné AI Act"
                className="inline-flex items-center gap-2 rounded-md border border-[color:var(--border-subtle)] bg-[color:var(--card)] px-2.5 py-1 hover:border-[color:var(--accent)]/30 hover:bg-[color:var(--card-elev-1)] transition-colors"
              >
                <span
                  aria-hidden="true"
                  className="h-6 w-6 rounded-sm bg-[color:var(--accent)]/10 text-[color:var(--accent)] grid place-items-center shrink-0"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l1.8 4.5L18 8l-4.2 1.5L12 14l-1.8-4.5L6 8l4.2-1.5L12 2z" />
                    <circle cx="18" cy="16" r="3" />
                    <path d="M16.3 16.5l1.2 1.2 2.2-2.2" />
                  </svg>
                </span>
                <span className="text-[12px] font-medium text-[color:var(--ink)] whitespace-nowrap">
                  IA responsable · AI Act
                </span>
              </a>
            </div>
          </div>

          {/* Row 2 : phone + audit à gauche, socials à droite */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3 text-[14px] text-[color:var(--ink-muted)]">
              <a href="tel:+33617125428" className={linkClass}>
                +33 6 17 12 54 28
              </a>
              <span className="w-1 h-1 rounded-full bg-[color:var(--border-subtle)]" />
              <a
                href="/audit"
                className="inline-flex items-center gap-1 rounded-full border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/10 px-3 py-1 text-[12px] font-medium text-[color:var(--accent)] hover:bg-[color:var(--accent)]/15 transition-colors">
                Audit Gratuit
              </a>
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
                  <a href={l.href} className={linkClass}>
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
                  <a href={l.href} className={linkClass}>
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
                  <a href={l.href} className={linkClass}>
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
              onSubmit={onNewsletterSubmit}
              className="mt-4 flex flex-col sm:flex-row gap-2"
              noValidate
              suppressHydrationWarning>
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Adresse email
              </label>
              <input
                id="footer-newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                placeholder="vous@exemple.com"
                aria-describedby="footer-newsletter-status"
                aria-invalid={newsletterStatus === 'error' || undefined}
                suppressHydrationWarning
                className="flex-1 min-w-0 rounded-md border border-[color:var(--border-subtle)] bg-[color:var(--bg)] px-4 py-2.5 text-[13px] text-[color:var(--ink)] placeholder:text-[color:var(--ink-muted)] focus:outline-none focus:border-[color:var(--accent)]/50 focus:ring-1 focus:ring-[color:var(--accent)]/30 transition-colors"
              />
              <button
                type="submit"
                suppressHydrationWarning
                className="rounded-md bg-[color:var(--accent)] px-4 py-2.5 min-h-[44px] text-[13px] font-medium text-[color:var(--accent-ink,#0b0b0c)] hover:opacity-90 transition-opacity">
                S&apos;abonner
              </button>
            </form>
            <p
              id="footer-newsletter-status"
              role="status"
              aria-live="polite"
              className={`mt-2 text-[12px] min-h-[1em] ${
                newsletterStatus === 'success'
                  ? 'text-[color:var(--accent)]'
                  : newsletterStatus === 'error'
                  ? 'text-red-400'
                  : 'sr-only'
              }`}>
              {newsletterStatus === 'success'
                ? 'Merci, votre inscription est prise en compte.'
                : newsletterStatus === 'error'
                ? 'Merci de saisir une adresse email valide.'
                : ''}
            </p>
          </div>
        </div>

        {/* Block ratings */}
        <div className="mt-12 pt-12 pb-12 border-t border-b border-[color:var(--border-subtle)]">
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

        {/* Fullwidth uclic logo — édito mark, accent vert. Marges haut/bas
            symétriques au `mt-12` de la section avis ci-dessus. */}
        <div className="mt-12 mb-12">
          <a
            href="/"
            aria-label="Uclic — accueil"
            className="block w-full text-[color:var(--accent)] opacity-90 hover:opacity-100 transition-opacity"
          >
            <svg
              viewBox="0 0 162 44"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="block w-full h-auto"
              preserveAspectRatio="xMidYMid meet"
            >
              <path d="M71.1029 31.3496L71.2626 15.6737L75.128 15.7126L74.8545 42.5557L70.989 42.5167L71.0377 37.6847C69.3926 41.0507 66.3653 43.1134 61.8555 43.0677C55.6275 43.0044 52.1242 39.0494 52.1904 32.6073L52.3646 15.4819L56.2836 15.5218L56.1162 31.9493C56.0617 37.2641 58.9868 40.0325 63.1209 40.0744C67.6308 40.1201 70.6688 37.0373 71.102 31.3496H71.1029Z" />
              <path d="M95.2322 39.8111C99.6885 39.8569 103.147 37.6365 104.805 33.0361L106.904 37.8361C104.669 41.1418 100.298 43.2453 95.0366 43.1918C86.3936 43.1042 81.1907 37.252 81.2724 29.1999C81.3542 21.1468 86.6749 15.4026 95.3179 15.4902C100.579 15.5438 104.906 17.735 107.073 21.0864L104.877 25.8426C103.314 21.2091 99.9007 18.9196 95.4444 18.8739C89.1094 18.8096 85.3569 23.4966 85.2985 29.2408C85.2401 34.9849 88.8962 39.7469 95.2313 39.8111H95.2322Z" />
              <path d="M113.837 0L117.703 0.0389391L117.266 42.9872L113.4 42.9482L113.837 0Z" />
              <path d="M127.691 5.07999C129.262 5.09557 130.524 6.38243 130.507 7.95451C130.492 9.5256 129.205 10.7871 127.633 10.7706C126.062 10.755 124.8 9.46817 124.817 7.8961C124.832 6.325 126.119 5.06345 127.691 5.07999ZM125.645 16.2276L129.51 16.2665L129.238 43.1095L125.372 43.0706L125.645 16.2276Z" />
              <path d="M149.613 40.3639C154.069 40.4096 157.528 38.1892 159.186 33.5889L161.284 38.3888C159.049 41.6945 154.679 43.7981 149.417 43.7446C140.774 43.6569 135.572 37.8047 135.653 29.7526C135.735 21.6995 141.056 15.9554 149.699 16.043C154.96 16.0965 159.287 18.2877 161.454 21.6392L159.258 26.3953C157.694 21.7618 154.282 19.4723 149.825 19.4266C143.49 19.3623 139.738 24.0494 139.679 29.7935C139.621 35.5377 143.277 40.2996 149.612 40.3639H149.613Z" />
              <path d="M37.2543 33.4178C37.2465 33.2182 37.2329 33.0187 37.2173 32.8181L37.2115 32.7549C37.1949 32.5544 37.1755 32.3538 37.1531 32.1543L35.803 18.2159C35.7494 17.6182 35.6988 17.0205 35.6569 16.4219C35.5791 15.3278 35.4564 14.2151 35.0661 13.1823C34.9385 12.8436 34.7789 12.5233 34.5998 12.2099C33.7237 10.74 32.3123 9.61865 30.6789 9.10566C30.0004 8.89248 29.2908 8.7854 28.5792 8.7854C26.3345 8.7854 24.4548 10.0713 22.8175 11.4808C20.8746 13.1522 18.92 14.8109 16.9663 16.4706C14.5201 18.5488 12.1995 20.5229 9.7338 22.6352C8.4411 23.743 7.08318 24.8575 5.74278 25.9059C4.53964 26.8472 3.12915 27.9063 2.12945 29.0773C0.836749 30.591 0.0424403 32.5436 0.00155668 34.6813C-0.0899447 39.5873 3.86409 43.6786 8.77013 43.7458C13.7404 43.8149 17.7918 39.8054 17.7918 34.8506C17.7918 33.3526 17.4229 31.8447 16.6675 30.5238C16.3073 29.894 15.5442 29.0053 14.9864 28.5419C14.4296 28.0786 13.8747 27.6211 13.4873 26.9942C12.914 26.0665 12.6103 24.986 12.6103 23.8958C12.6103 20.6319 15.256 17.9871 18.5189 17.9871C21.1082 17.9871 23.314 19.5991 24.6378 21.7406C26.1496 24.1859 26.169 26.8277 26.169 29.6098C26.169 31.211 26.169 32.8133 26.169 34.4155C26.169 37.4818 28.6551 39.9669 31.7204 39.9669C33.8639 39.9669 35.7981 38.682 36.7073 36.7527C37.193 35.7219 37.301 34.582 37.2553 33.4188L37.2543 33.4178Z" />
            </svg>
          </a>
        </div>

        {/* Bottom: copyright + legal links — border-t collé au bas du logo */}
        <div className="pt-8 border-t border-[color:var(--border-subtle)] flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[12px] text-[color:var(--ink-muted)]">
          <span>
            © 2026 Uclic. Tous droits réservés. · Fait par{' '}
            <a
              href="/"
              className="text-[color:var(--ink)] underline underline-offset-2 decoration-[color:var(--border-subtle)] hover:text-[color:var(--accent)] hover:decoration-[color:var(--accent)] transition-colors">
              uclic.fr
            </a>
          </span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
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
      </div>
    </footer>
  );
}
