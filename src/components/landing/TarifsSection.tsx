'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import SectionAmbience from '../ui/SectionAmbience';

type Tier = 'pro' | 'growth' | 'scale';
const tierLabels: Record<Tier, { name: string; desc: string }> = {
  pro:    { name: 'Pro',    desc: "L'essentiel" },
  growth: { name: 'Growth', desc: 'Accélérez' },
  scale:  { name: 'Scale',  desc: 'Performance max' },
};

type PilierTier = { price: string; desc: string; features: string[] };

type Pilier = {
  name: string;
  badge: string;
  featured?: boolean;
  tiers: Record<Tier, PilierTier>;
};

const free = {
  name: 'Audit',
  badge: 'Diagnostic',
  desc: 'On audite vos canaux et on identifie vos meilleurs leviers. Vision 360°, reco chiffrées.',
  features: [
    "Audit de vos canaux d'acquisition",
    'Score sur les 3 piliers',
    'Quick wins à fort impact',
    'Roadmap priorisée chiffrée',
  ],
};

const piliers: Pilier[] = [
  {
    name: 'Inbound',
    badge: 'Captez la demande',
    tiers: {
      pro:    { price: '1 490€', desc: 'SEO/GEO ou Google Ads — 1 canal au choix.',
               features: ['Audit + stratégie SEO/GEO', 'OU Google Ads (budget ≤ 2 500€)', 'Dashboard + reporting mensuel', 'Optimisations continues'] },
      growth: { price: '2 990€', desc: 'SEO/GEO + Google Ads combinés.',
               features: ['SEO/GEO + Google Ads (≤ 5 000€)', 'Landing pages + A/B testing', 'Contenu à forte intention', 'Attribution multicanal'] },
      scale:  { price: '4 990€', desc: 'Acquisition inbound complète, stratégiste dédié.',
               features: ['Budget Ads illimité', '8+ articles SEO / mois', 'Landing pages illimitées + CRO', 'Stratégiste + point hebdo'] },
    },
  },
  {
    name: 'Outbound',
    badge: 'Créez la demande',
    tiers: {
      pro:    { price: '1 490€', desc: 'Prospection multicanale automatisée.',
               features: ['ICP + scraping + enrichissement', '3 séquences email auto', '1 500 contacts / mois', 'Infra deliverability dédiée'] },
      growth: { price: '2 990€', desc: 'Email + LinkedIn avec scoring IA.',
               features: ['5 séquences email + LinkedIn', '3 000 contacts / mois', 'A/B test + scoring IA', 'CRM + reporting avancé'] },
      scale:  { price: '4 990€', desc: 'Machine outbound complète, AM dédié.',
               features: ['Email + LinkedIn + tel illimités', '5 000+ contacts / mois', "Intent data + signaux d'achat", 'Account manager dédié'] },
    },
  },
  {
    name: 'IA & Dev',
    badge: 'Industrialisez',
    featured: true,
    tiers: {
      pro:    { price: '1 490€', desc: '1 agent IA sur-mesure + intégration métier.',
               features: ['1 agent IA custom', 'Développement + déploiement', 'API + intégration CRM/outils', 'Maintenance + évolutions'] },
      growth: { price: '2 990€', desc: 'Plusieurs agents + app métier dédiée.',
               features: ['3 agents IA en production', 'App métier sur-mesure (Next.js)', 'Intégrations CRM + Analytics', 'Dashboard + itérations mensuelles'] },
      scale:  { price: '4 990€', desc: 'Architecture IA + produit complet, SLA prioritaire.',
               features: ['Agents IA illimités', 'Apps & APIs sur-mesure', 'Architecture cloud intégrée', 'Support SLA < 4h + formation équipe'] },
    },
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
  const [tier, setTier] = useState<Tier>('growth');

  // Cells : [Growth Scan, Inbound, Outbound, IA & Automation]
  const cells = [
    { kind: 'free' as const, data: free },
    ...piliers.map((p) => ({ kind: 'pilier' as const, data: p })),
  ];

  return (
    <section id="tarifs" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
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

        {/* Tier switcher (segmented control Pro/Growth/Scale) AU-DESSUS du bento */}
        <div className="mt-10 flex justify-center">
          <div className="pill !rounded-none !p-1.5">
            {(Object.keys(tierLabels) as Tier[]).map((k) => (
              <button
                key={k}
                onClick={() => setTier(k)}
                className={`px-5 py-2 text-[13px] font-medium transition-all border outline-none focus:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--accent)]/30 ${
                  tier === k
                    ? 'bg-[color:var(--surface-raised)] text-[color:var(--ink)] border-[color:var(--border-subtle)]'
                    : 'border-transparent text-[color:var(--ink-muted)] hover:text-[color:var(--ink)]'
                }`}>
                <span className="block leading-tight">{tierLabels[k].name}</span>
                <span className="block text-[10px] opacity-70 font-normal">{tierLabels[k].desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bento grid 4 colonnes — tight, no gaps, no rounding */}
        <div className="mt-14 grid md:grid-cols-4 items-stretch border border-[color:var(--border-subtle)] !rounded-none relative">
          {/* Decorative dots at card intersections (and outer corners) */}
          {bentoDots.map((pos, idx) => (
            <span
              key={idx}
              aria-hidden="true"
              className="hidden md:block pointer-events-none absolute w-[14px] h-[14px] rounded-full bg-[#201E1D] light:bg-[#E7E6E3] z-[2]"
              style={{ left: pos.left, top: pos.top, transform: 'translate(-50%, -50%)' }}
            />
          ))}

          {cells.map((cell, i) => {
            const isLastCol = i === cells.length - 1;
            const isLastRow = i === cells.length - 1; // single row en desktop
            const featured = cell.kind === 'pilier' && cell.data.featured;

            // Contenu par cell
            const badge = cell.kind === 'free' ? cell.data.badge : cell.data.badge;
            const name  = cell.kind === 'free' ? cell.data.name  : cell.data.name;
            const priceTop = cell.kind === 'free' ? 'Sans engagement' : 'à partir de';
            const price = cell.kind === 'free' ? '0€' : cell.data.tiers[tier].price;
            const priceSuffix = cell.kind === 'free' ? null : '/ mois';
            const desc  = cell.kind === 'free' ? cell.data.desc : cell.data.tiers[tier].desc;
            const features = cell.kind === 'free' ? cell.data.features : cell.data.tiers[tier].features;
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
                    {/* Dots accent aux 4 coins (signature featured) */}
                    {[
                      { left: '0%',   top: '0%'   },
                      { left: '100%', top: '0%'   },
                      { left: '0%',   top: '100%' },
                      { left: '100%', top: '100%' },
                    ].map((pos, idx) => (
                      <span
                        key={`feat-dot-${idx}`}
                        aria-hidden="true"
                        className="pointer-events-none absolute w-[14px] h-[14px] rounded-full bg-[color:var(--accent)] pulse-soft z-[4]"
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

                {/* Checks list */}
                <ul className="relative mt-5 space-y-2.5 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[14px] text-[color:var(--ink-muted)] leading-relaxed">
                      <CheckCircle2
                        size={14}
                        strokeWidth={2}
                        className={`mt-0.5 shrink-0 ${
                          featured ? 'text-[color:var(--accent)]' : 'text-[color:var(--ink-dim)]'
                        }`}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA bottom — primary (featured only) = accent, secondary = neutral */}
                {featured ? (
                  <a
                    href="#contact"
                    className="glass-pill group/cta relative mt-7 inline-flex items-center justify-center gap-2 h-[46px] px-5 text-[13.5px] font-semibold text-black light:text-white whitespace-nowrap hover:scale-[1.02] transition-transform"
                    style={{
                      background:
                        'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
                    }}>
                    {ctaLabel}
                    <ArrowRight size={14} className="text-black light:text-white transition-transform group-hover/cta:translate-x-0.5" />
                  </a>
                ) : (
                  <a
                    href="#contact"
                    className="glass-pill group/cta relative mt-7 inline-flex items-center justify-center gap-2 h-[46px] px-5 text-[13.5px] font-medium text-[color:var(--ink)] whitespace-nowrap hover:scale-[1.02] transition-transform"
                    style={{
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
          <a href="#contact" className="text-[color:var(--accent)] hover:underline">
            Duo : −10% · Growth Machine (les 3) : −20%
          </a>
        </p>

      </div>
    </section>
  );
}
