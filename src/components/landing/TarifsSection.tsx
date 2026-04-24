'use client';
import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Sparkles, Info, Bot } from 'lucide-react';
import SectionAmbience from '../ui/SectionAmbience';
import CornerCross from '../ui/CornerCross';

/** A feature is either a single included line, or a group of mutually-exclusive options.
 *  Strings render plain; objects with `{ label, hint }` render with a tooltip trigger. */
type Hintable = string | { label: string; hint: string };
type OrOption = Hintable;
type IncludedFeature = Hintable;
type FeatureItem = IncludedFeature | { or: OrOption[]; label?: string };

/** Reusable CSS-only hover tooltip. Zero JS, zero lib, a11y-friendly. */
function HintIcon({ hint }: { hint: string }) {
  return (
    <span
      tabIndex={0}
      role="button"
      aria-label={hint}
      className="group/tip relative inline-flex cursor-help text-[color:var(--ink-dim)] hover:text-[color:var(--accent)] focus:text-[color:var(--accent)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--accent)]/40 transition-colors">
      <Info size={13} strokeWidth={1.75} />
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-[240px] -translate-x-1/2 translate-y-1 scale-[0.98] rounded-md border border-[color:var(--border-strong)] bg-[color:var(--surface-raised)] px-3 py-2 text-left text-[12px] leading-snug text-[color:var(--ink)] opacity-0 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition-all duration-150 ease-out group-hover/tip:translate-y-0 group-hover/tip:scale-100 group-hover/tip:opacity-100 group-focus-visible/tip:translate-y-0 group-focus-visible/tip:scale-100 group-focus-visible/tip:opacity-100">
        {hint}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-full -mt-[5px] h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-[color:var(--border-strong)] bg-[color:var(--surface-raised)]"
        />
      </span>
    </span>
  );
}

type Pilier = {
  name: string;
  badge: string;
  featured?: boolean;
  price: string;
  priceTop?: string;       // override default "à partir de"
  priceSuffix?: string | null; // set null to hide "/ mois"
  desc: string;
  features: FeatureItem[];
  /** Optional eye-catcher foot-in-the-door offer rendered between features and CTA. */
  starter?: { title: string; price: string };
};

const free = {
  name: 'Audit',
  badge: 'Diagnostic',
  desc: 'On audite vos 3 piliers — Inbound, Outbound, IA & Dev. Vision 360°, reco chiffrées.',
  features: [
    { label: 'Audit Inbound, Outbound, IA & Dev', hint: "Analyse de vos canaux d'acquisition (SEO, Ads, Content), de votre prospection outbound et de votre stack IA/automatisations en place." },
    { label: 'Score sur les 3 piliers', hint: 'Note /100 par pilier : Inbound (captation), Outbound (prospection) et IA & Dev (industrialisation).' },
    'Quick wins à fort impact',
    'Roadmap priorisée chiffrée',
  ] satisfies FeatureItem[],
};

const piliers: Pilier[] = [
  {
    name: 'Inbound',
    badge: 'Captez la demande',
    price: '1 490€',
    desc: "1 canal d'acquisition au choix, opéré de bout en bout.",
    features: [
      {
        label: 'Un canal au choix',
        or: [
          { label: 'SEO / GEO',          hint: 'Audit technique + stratégie SEO et GEO (Generative Engine Optimization)' },
          { label: 'Content marketing',  hint: 'Blog piliers, lead magnets, newsletter et posts organiques LinkedIn / Facebook / Instagram / TikTok' },
          { label: 'Google Ads',         hint: 'Budget média ≤ 2 500 € / mois inclus' },
          { label: 'Meta Ads',           hint: 'Budget média ≤ 2 500 € / mois inclus' },
          { label: 'TikTok Ads',         hint: 'Budget média ≤ 2 500 € / mois inclus' },
          { label: 'LinkedIn Ads',       hint: 'Budget média ≤ 2 500 € / mois inclus' },
        ],
      },
      'Dashboard + reporting mensuel',
      { label: 'Optimisations continues', hint: 'A/B tests sur les landing pages, créas et audiences. Itérations hebdomadaires en fonction des données.' },
    ],
  },
  {
    name: 'Outbound',
    badge: 'Créez la demande',
    price: '1 490€',
    desc: 'Prospection multicanale automatisée.',
    features: [
      {
        label: 'Un service au choix',
        or: [
          {
            label: 'ICP + scraping custom',
            hint: 'Data scraping sur-mesure avec intent marketing — jusqu\'à plusieurs centaines de points de données par prospect pour détecter les signaux d\'achat et trouver les insights qui déclenchent la conversation',
          },
          'ICP + scraping LinkedIn',
          'ICP + scraping Google Maps',
        ],
      },
      { label: 'Enrichissement', hint: "Ajout de données complémentaires sur chaque prospect : email pro, poste exact, stack tech, levées de fonds, signaux d'actualité — pour personnaliser les séquences." },
      { label: '3 séquences email automatisées', hint: 'Séquences relance multi-touch avec A/B testing copywriting, arrêt auto sur réponse, synchronisation CRM.' },
      '1 500 contacts / mois',
      { label: 'Infra deliverability dédiée', hint: 'IPs warmup-ées, SPF/DKIM/DMARC configurés, monitoring bounce/spam pour garantir >95% d\'inbox rate.' },
    ],
  },
  {
    name: 'IA & Dev',
    badge: 'Industrialisez',
    featured: true,
    price: 'Sur devis',
    priceTop: 'Projet sur-mesure',
    priceSuffix: null,
    desc: 'Site web, application, agents IA ou automatisations — chiffré au projet.',
    features: [
      {
        label: 'Un livrable au choix',
        or: [
          { label: 'Site ou app web', hint: 'Site WordPress optimisé SEO, site custom Next.js / Astro, ou application web full-stack (Next.js + Supabase / Postgres). On choisit la stack selon votre besoin et votre équipe.' },
          { label: 'Agents IA custom', hint: 'Agents propriétaires via Claude Code, ou agents 100 % sur-mesure (Python/TypeScript). Option LLM souverain hébergé sur votre machine ou serveur (Mistral, Llama, Qwen) pour traitement de données sensibles sans fuite externe.' },
          { label: 'Workflows & automations', hint: 'n8n (self-hosted, illimité), Make, Zapier ou intégration 100 % custom en code selon la complexité et le volume. Connecteurs sur-mesure quand l\'outil no-code ne suffit plus.' },
          { label: 'Intégration CRM & outils', hint: 'API custom, webhooks et synchros bi-directionnelles avec HubSpot, Pipedrive, Salesforce, Notion, Airtable, Slack, etc.' },
          { label: 'Tracking & analytics', hint: 'Mise en place GA4, Google Tag Manager, server-side tracking (sGTM), Meta CAPI, tracking de conversions Google/Meta/LinkedIn Ads et events custom Mixpanel / PostHog / Amplitude.' },
          { label: 'Data & dashboards', hint: 'Centralisation data (BigQuery, Snowflake, Supabase), connecteurs d\'ingestion (Fivetran, n8n, custom), dashboards BI sur-mesure (Looker Studio, Metabase, Preset) pour piloter vos KPIs.' },
        ],
      },
      { label: 'Spec + design + dev + déploiement', hint: 'Cadrage produit, wireframes & maquettes UX/UI (Figma), développement (Next.js, Python, Postgres, Supabase, WordPress selon stack), mise en prod sur votre infra ou la nôtre.' },
      { label: 'Maintenance + évolutions', hint: 'Monitoring, corrections de bugs et ajouts de features mensuels sur retainer — pas d\'abandon post-livraison.' },
    ],
    starter: { title: 'Site, app ou agent IA clé-en-main', price: '990€' },
  },
];

// 4 colonnes bento → 2 × (4+1) = 10 dots (5 top + 5 bottom)
const bentoDots = [
  { left: '0%',   top: '0%'   },
  { left: '25%',  top: '0%'   },
  { left: '50%',  top: '0%'   },
  { left: '75%',  top: '0%'   },
  { left: '100%', top: '0%'   },
  { left: '0%',   top: '100%' },
  { left: '25%',  top: '100%' },
  { left: '50%',  top: '100%' },
  { left: '75%',  top: '100%' },
  { left: '100%', top: '100%' },
];

export default function TarifsSection() {
  // Cells : [Diagnostic, Inbound, Outbound, IA & Dev]
  const cells = [
    { kind: 'free' as const, data: free },
    ...piliers.map((p) => ({ kind: 'pilier' as const, data: p })),
  ];

  return (
    <section id="tarifs" className="relative pt-24 lg:pt-32 pb-10 lg:pb-12 overflow-hidden">
      <SectionAmbience variant="medium" />
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
            <span className="w-6 h-px bg-[color:var(--accent)]" /> Tarifs <span className="w-6 h-px bg-[color:var(--accent)]" />
          </div>
          <h2 className="mt-4 text-[clamp(32px,4.2vw,52px)] font-display font-medium tracking-[-0.02em]">
            Commencez gratuitement.
            <br />
            <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
              Scalez à votre rythme.
              <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
            </span>
          </h2>
          <p className="mt-5 text-[16px] text-[color:var(--ink-muted)] max-w-[640px] mx-auto leading-relaxed">
            Un diagnostic offert, puis activez les piliers qui comptent pour vous. Choisissez votre intensité.
          </p>
        </div>

        {/* Bento grid 4 colonnes — tight, no gaps, no rounding */}
        <div className="mt-14 grid md:grid-cols-4 items-stretch border border-[color:var(--border-subtle)] !rounded-none relative">
          {/* Decorative crosses at card intersections (and outer corners) */}
          {bentoDots.map((pos, idx) => (
            <CornerCross
              key={idx}
              size={14}
              className="hidden md:block absolute z-[2]"
              style={{ left: pos.left, top: pos.top, transform: 'translate(-50%, -50%)' }}
            />
          ))}

          {cells.map((cell, i) => {
            const isLastCol = i === cells.length - 1;
            const isLastRow = i === cells.length - 1; // single row en desktop
            const featured = cell.kind === 'pilier' && cell.data.featured;

            // Contenu par cell
            const badge = cell.data.badge;
            const name  = cell.data.name;
            const priceTop =
              cell.kind === 'free' ? 'Sans engagement' : cell.data.priceTop ?? 'à partir de';
            const price = cell.kind === 'free' ? '0€' : cell.data.price;
            const priceSuffix =
              cell.kind === 'free'
                ? null
                : cell.data.priceSuffix === null
                ? null
                : cell.data.priceSuffix ?? '/ mois';
            const desc  = cell.data.desc;
            const features: FeatureItem[] = cell.data.features;
            const ctaLabel = cell.kind === 'free' ? 'Obtenir mon diagnostic' : `Activer ${name}`;

            return (
              <motion.article
                key={name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`group p-8 flex flex-col relative transition-colors duration-300 !rounded-none bg-[color:var(--card-elev-1)] light:bg-white ${
                  !isLastCol ? 'md:border-r' : ''
                } ${!isLastRow ? 'border-b md:border-b-0' : ''} ${
                  featured
                    ? '!border-[color:var(--accent)]/60'
                    : 'border-[color:var(--border-subtle)]'
                }`}>

                {/* Featured badge — à l'intérieur de la cell, top-center, PAS de translate-y sur la cell */}
                {featured && (
                  <>
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-[color:var(--accent)] text-black light:text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 whitespace-nowrap z-[3]">
                      <Sparkles size={11} strokeWidth={2.5} />
                      Plus choisi
                    </span>
                    {/* Crosses accent aux 4 coins (signature featured) */}
                    {[
                      { left: '0%',   top: '0%'   },
                      { left: '100%', top: '0%'   },
                      { left: '0%',   top: '100%' },
                      { left: '100%', top: '100%' },
                    ].map((pos, idx) => (
                      <CornerCross
                        key={`feat-cross-${idx}`}
                        size={14}
                        accent
                        className="absolute pulse-soft z-[4]"
                        style={{ left: pos.left, top: pos.top, transform: 'translate(-50%, -50%)' }}
                      />
                    ))}
                  </>
                )}

                {/* Label diagnostic/pilier */}
                <span className="relative pill !rounded-none !text-[11px] !py-1 !px-3 self-start">{badge}</span>

                {/* Titre */}
                <h3 className="relative mt-4 text-2xl font-display font-medium">{name}</h3>

                {/* Prix */}
                <div className="relative mt-4 min-h-[70px]">
                  <div className="text-[11px] text-[color:var(--ink-muted)]">{priceTop}</div>
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className={`font-display font-medium text-[36px] leading-none ${
                        cell.kind === 'free' || featured
                          ? 'text-[color:var(--accent)]'
                          : 'text-[color:var(--ink)]'
                      }`}>
                      {price}
                    </span>
                    {priceSuffix && (
                      <span className="text-[13px] text-[color:var(--ink-muted)]">{priceSuffix}</span>
                    )}
                  </div>
                </div>

                {/* Desc */}
                <p className="relative mt-3 text-[14px] text-[color:var(--ink-muted)] leading-relaxed min-h-[60px]">
                  {desc}
                </p>

                {/* Checks list — support plain strings, hintable strings, and OR groups */}
                <ul className="relative mt-5 space-y-2.5 flex-1">
                  {features.map((f, fi) => {
                    // Plain included feature (string or {label, hint})
                    if (typeof f === 'string' || 'label' in f && !('or' in f)) {
                      const label = typeof f === 'string' ? f : f.label;
                      const hint  = typeof f === 'string' ? null : f.hint;
                      return (
                        <li key={fi} className="flex items-start gap-2 text-[14px] text-[color:var(--ink-muted)] leading-relaxed">
                          <CheckCircle2
                            size={14}
                            strokeWidth={2}
                            className={`mt-0.5 shrink-0 ${featured ? 'text-[color:var(--accent)]' : 'text-[color:var(--ink-dim)]'}`}
                          />
                          <span className="inline-flex items-center gap-1.5">
                            <span>{label}</span>
                            {hint && <HintIcon hint={hint} />}
                          </span>
                        </li>
                      );
                    }
                    // OR-group: visually grouped, explicit "OU" separators
                    return (
                      <li key={fi}>
                        <div className="relative border-l-2 border-[color:var(--accent)]/40 pl-3 py-1.5">
                          {f.label && (
                            <div className="text-[10.5px] font-mono uppercase tracking-[0.18em] text-[color:var(--accent)] mb-2">
                              {f.label}
                            </div>
                          )}
                          {f.or.map((opt, oi) => {
                            const label = typeof opt === 'string' ? opt : opt.label;
                            const hint  = typeof opt === 'string' ? null : opt.hint;
                            return (
                              <Fragment key={label}>
                                {oi > 0 && (
                                  <div
                                    aria-hidden="true"
                                    className="flex items-center gap-2 my-1 text-[10px] font-mono uppercase tracking-[0.18em] text-[color:var(--ink-dim)]">
                                    <span className="h-px w-4 bg-[color:var(--border-subtle)]" />
                                    ou
                                  </div>
                                )}
                                <div className="flex items-center gap-1.5 text-[14px] text-[color:var(--ink)] leading-relaxed">
                                  <span>{label}</span>
                                  {hint && <HintIcon hint={hint} />}
                                </div>
                              </Fragment>
                            );
                          })}
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* Optional foot-in-the-door offer — no "offre d'appel" framing,
                    just a price anchor for prospects worried about cost. */}
                {cell.kind === 'pilier' && cell.data.starter && (
                  <div className="relative mt-5 flex items-start gap-2.5 border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/[0.07] px-4 py-3">
                    <Bot size={20} strokeWidth={2} className="text-[color:var(--accent)] shrink-0 mt-0.5" />
                    <div className="text-[15px] leading-snug text-[color:var(--ink)]">
                      {cell.data.starter.title}{' '}
                      <span className="text-[color:var(--ink-muted)]">dès</span>{' '}
                      <span className="font-semibold text-[color:var(--accent)]">
                        {cell.data.starter.price}
                      </span>
                    </div>
                  </div>
                )}

                {/* CTA bottom — primary (featured only) = accent, secondary = neutral */}
                {featured ? (
                  <a
                    href="/audit"
                    className="glass-pill group/cta relative mt-7 inline-flex items-center justify-center gap-2 h-[46px] px-5 text-[13.5px] font-semibold text-black light:text-white whitespace-nowrap hover:scale-[1.02] transition-transform"
                    style={{
                      borderRadius: '6px',
                      background:
                        'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
                    }}>
                    {ctaLabel}
                    <ArrowRight size={14} className="text-black light:text-white transition-transform group-hover/cta:translate-x-0.5" />
                  </a>
                ) : (
                  <a
                    href="/audit"
                    className="glass-pill group/cta relative mt-7 inline-flex items-center justify-center gap-2 h-[46px] px-5 text-[13.5px] font-medium text-[color:var(--ink)] whitespace-nowrap hover:scale-[1.02] transition-transform"
                    style={{
                      borderRadius: '6px',
                      background:
                        'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0.02) 65%, transparent 100%), var(--surface-raised)',
                    }}>
                    {ctaLabel}
                    <ArrowRight size={14} className="transition-transform group-hover/cta:translate-x-0.5" />
                  </a>
                )}
              </motion.article>
            );
          })}
        </div>

        {/* Upsell combos en ligne */}
        <p className="mt-10 text-center text-[14px] text-[color:var(--ink-muted)]">
          Besoin de combiner plusieurs piliers ?{' '}
          <a href="/audit" className="text-[color:var(--accent)] hover:underline">
            Duo : −10% · Growth Machine (les 3) : −20%
          </a>
        </p>

      </div>
    </section>
  );
}
