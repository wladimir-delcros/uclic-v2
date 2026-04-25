import type { Metadata } from 'next';
import { ArrowRight, Calculator, FlaskConical, Gauge, BarChart3 } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import SectionAmbience from '@/components/ui/SectionAmbience';
import MDECalculator from '@/components/tools/MDECalculator';
import { jsonLdString } from '@/lib/schema';

const SITE_URL = 'https://uclic.fr';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Calculateur MDE — Sample size A/B Test | Uclic',
  description:
    "Taille d'échantillon et MDE pour détecter un écart relatif donné entre contrôle et variante. Outil gratuit par les growth seniors Uclic.",
  alternates: { canonical: '/outils-gratuits/mde-calculator' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/outils-gratuits/mde-calculator`,
    title: 'Calculateur MDE — Sample size A/B Test | Uclic',
    description:
      "MDE, sample size et durée de test pour votre prochain A/B. Gratuit, par les growth seniors Uclic.",
    siteName: 'Uclic',
    locale: 'fr_FR',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MDE Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculateur MDE — Taille d\'échantillon',
    description: "MDE + sample size pour votre prochain A/B. Gratuit.",
    site: '@uclic_fr',
  },
};

const STEPS = [
  { n: '01', t: 'Renseignez le baseline', d: "Le taux de conversion actuel du contrôle (ex : 4%)." },
  { n: '02', t: 'Choisissez le MDE relatif', d: "Le plus petit écart relatif que vous voulez détecter (ex : 10%)." },
  { n: '03', t: 'Configurez alpha & puissance', d: "Standard : alpha 5% (confiance 95%), puissance 80%." },
  { n: '04', t: 'Estimez la durée', d: "Renseignez le trafic quotidien pour obtenir le nombre de jours de test." },
];

const USE_CASES = [
  { t: 'Avant chaque A/B', d: "Vérifier que le test peut atteindre la significativité dans un délai réaliste." },
  { t: 'Roadmap CRO', d: "Prioriser les tests faisables vs. tests qui demanderaient des mois de trafic." },
  { t: 'Brief équipe produit', d: "Aligner Product, Growth et Data sur les attentes en termes de durée et d'uplift." },
  { t: 'Argumentaire COPIL', d: "Justifier que tel uplift demande tel volume — ou inversement." },
];

const FAQ = [
  {
    q: "Qu'est-ce que le MDE (Minimum Detectable Effect) ?",
    a: "Le MDE est le plus petit écart entre votre contrôle et votre variante que votre test est statistiquement capable de détecter, étant donnés votre baseline, votre alpha et votre puissance. Plus votre échantillon est grand, plus le MDE détectable est petit.",
  },
  {
    q: "MDE absolu ou relatif : quelle différence ?",
    a: "Le MDE relatif est exprimé en pourcentage du baseline (ex : +10% sur un baseline de 4% = passer à 4,4%). Le MDE absolu est exprimé en points (ex : +0,4 pt = passer de 4% à 4,4%). Notre calculateur utilise le MDE relatif, plus intuitif pour piloter le ROI.",
  },
  {
    q: "Quelle puissance statistique choisir ?",
    a: "80% est le standard pour la majorité des tests A/B Growth. Cela signifie que si l'effet existe vraiment, vous avez 80% de chances de le détecter. Pour des décisions critiques (refonte, pricing), privilégiez 90%.",
  },
  {
    q: "Quel niveau de confiance (alpha) choisir ?",
    a: "Alpha 5% (= confiance 95%) est le standard. C'est le risque accepté de conclure à tort qu'il y a un effet alors qu'il n'y en a pas. Pour des tests Growth itératifs sans grosse conséquence, alpha 10% peut être acceptable.",
  },
  {
    q: "La durée estimée est très longue, que faire ?",
    a: "Trois leviers : (1) augmenter le trafic alloué au test (réduire le nombre de variantes), (2) cibler un MDE plus large (effets plus marqués), (3) accepter une puissance ou un alpha moins stricts. Si rien de tout ça n'est possible, le test n'est sans doute pas faisable et il faut reformuler l'hypothèse.",
  },
  {
    q: "Le calcul est-il valable pour des tests multi-variants ?",
    a: "Cet outil suppose 2 groupes (A vs B). Pour 3 variantes ou plus, divisez le trafic disponible par le nombre de variantes et appliquez une correction (Bonferroni : alpha / nombre de comparaisons).",
  },
];

export default function MDECalculatorPage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Outils gratuits', item: `${SITE_URL}/outils-gratuits` },
      { '@type': 'ListItem', position: 3, name: 'Calculateur MDE', item: `${SITE_URL}/outils-gratuits/mde-calculator` },
    ],
  };

  const software = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Calculateur MDE — Sample size A/B Test',
    operatingSystem: 'Any',
    applicationCategory: 'BusinessApplication',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    url: `${SITE_URL}/outils-gratuits/mde-calculator`,
    publisher: { '@type': 'Organization', name: 'Uclic', url: SITE_URL },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(software) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(faqSchema) }} />
      <Nav />
      <main className="relative bg-[color:var(--bg)]">
        {/* HERO + CALCULATOR */}
        <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-24 overflow-hidden">
          <SectionAmbience variant="medium" />
          <div className="relative z-10 max-w-[1080px] mx-auto px-5 lg:px-10">
            <a
              href="/outils-gratuits"
              className="text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors"
            >
              ← Tous les outils gratuits
            </a>
            <div className="mt-4 inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
              <span>Outil gratuit · A/B Test</span>
            </div>
            <h1 className="text-[40px] md:text-[52px] lg:text-[60px] leading-[1.05] font-medium text-[color:var(--ink)] tracking-tight max-w-[800px]">
              Calculateur MDE —{' '}
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                taille d&apos;échantillon
                <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl rounded-full" />
              </span>
            </h1>
            <p className="mt-5 text-[16px] lg:text-[17px] leading-relaxed text-[color:var(--ink-muted)] max-w-[680px]">
              Estimez le nombre de visiteurs nécessaires pour détecter un écart relatif donné
              (Minimum Detectable Effect) entre contrôle et variante. Test z bilatéral sur deux proportions.
            </p>

            <div className="mt-10">
              <MDECalculator />
            </div>

            <p className="mt-6 text-[12px] text-[color:var(--ink-muted)]/80 leading-relaxed">
              Formule : taille d&apos;échantillon par variante pour un test z bilatéral sur deux proportions,
              avec puissance 1−β et significativité α. L&apos;approximation normale est valide quand np ≥ 5 et n(1−p) ≥ 5.
            </p>
          </div>
        </section>

        {/* COMMENT ÇA MARCHE */}
        <section className="relative py-16 lg:py-24 border-t border-[color:var(--border-subtle)]">
          <div className="max-w-[1080px] mx-auto px-5 lg:px-10">
            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-3">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              Comment ça marche
            </span>
            <h2 className="text-[28px] md:text-[36px] font-display font-medium tracking-[-0.02em] text-[color:var(--ink)] max-w-[640px]">
              4 paramètres, une estimation fiable
            </h2>
            <p className="mt-4 text-[15px] text-[color:var(--ink-muted)] max-w-[620px] leading-relaxed">
              Le calculateur applique la formule classique de taille d&apos;échantillon pour deux proportions indépendantes,
              utilisée par tous les outils statistiques sérieux (Optimizely, AB Tasty, Evan Miller, etc.).
            </p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[color:var(--border-subtle)] border border-[color:var(--border-subtle)] !rounded-none">
              {STEPS.map((s) => (
                <div key={s.n} className="bg-[color:var(--card-elev-1)] light:bg-white p-6">
                  <div className="text-[12px] font-mono tracking-[0.18em] text-[color:var(--accent)]">{s.n}</div>
                  <div className="mt-3 text-[17px] font-display font-medium tracking-tight text-[color:var(--ink)]">{s.t}</div>
                  <p className="mt-2 text-[13.5px] text-[color:var(--ink-muted)] leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>

            {/* Formule */}
            <div className="mt-10 !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 lg:p-8">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-3">
                <Calculator size={12} /> Formule
              </div>
              <p className="text-[14px] text-[color:var(--ink)] leading-relaxed font-mono tabular-nums">
                n = (Z<sub>α/2</sub> · √(2 · p̄ · (1−p̄)) + Z<sub>β</sub> · √(p₁(1−p₁) + p₂(1−p₂)))² / (p₂ − p₁)²
              </p>
              <p className="mt-3 text-[13px] text-[color:var(--ink-muted)] leading-relaxed">
                Avec p₁ = baseline, p₂ = baseline · (1 + MDE relatif), p̄ = (p₁ + p₂) / 2.
                Z<sub>α/2</sub> et Z<sub>β</sub> issus de la loi normale standard.
              </p>
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section className="relative py-16 lg:py-24 border-t border-[color:var(--border-subtle)]">
          <div className="max-w-[1080px] mx-auto px-5 lg:px-10">
            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-3">
              <span className="w-6 h-px bg-[color:var(--accent)]" />
              Quand l&apos;utiliser
            </span>
            <h2 className="text-[28px] md:text-[36px] font-display font-medium tracking-[-0.02em] text-[color:var(--ink)] max-w-[640px]">
              4 moments-clé pour sortir le calculateur
            </h2>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-[color:var(--border-subtle)] border border-[color:var(--border-subtle)] !rounded-none">
              {USE_CASES.map((u, i) => {
                const icons = [FlaskConical, Gauge, BarChart3, Calculator];
                const Icon = icons[i] || FlaskConical;
                return (
                  <article key={u.t} className="bg-[color:var(--card-elev-1)] light:bg-white p-6 lg:p-8">
                    <div className="w-10 h-10 grid place-items-center border border-[color:var(--accent)]/30 bg-[color:var(--accent-soft)] text-[color:var(--accent)] mb-4">
                      <Icon size={18} strokeWidth={1.75} />
                    </div>
                    <h3 className="text-[18px] font-display font-medium text-[color:var(--ink)] tracking-tight">{u.t}</h3>
                    <p className="mt-2 text-[14px] text-[color:var(--ink-muted)] leading-relaxed">{u.d}</p>
                  </article>
                );
              })}
            </div>

            {/* Internal links */}
            <div className="mt-10 pt-8 border-t border-[color:var(--border-subtle)] flex flex-wrap gap-4">
              <a href="/outils-gratuits/ab-test-calculator" className="inline-flex items-center gap-1.5 text-[13.5px] text-[color:var(--accent)] hover:gap-2.5 transition-all">
                → Calculateur A/B Test (significativité)
              </a>
              <a href="/expertise/growth-marketing" className="inline-flex items-center gap-1.5 text-[13.5px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors">
                → Expertise Growth Marketing
              </a>
              <a href="/expertise/data-analytics" className="inline-flex items-center gap-1.5 text-[13.5px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors">
                → Expertise Data Analytics
              </a>
              <a href="/blog" className="inline-flex items-center gap-1.5 text-[13.5px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors">
                → Blog Growth & IA
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-16 lg:py-24 border-t border-[color:var(--border-subtle)]">
          <div className="max-w-[920px] mx-auto px-5 lg:px-10">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                <span className="w-6 h-px bg-[color:var(--accent)]" />
                FAQ
                <span className="w-6 h-px bg-[color:var(--accent)]" />
              </div>
            </div>
            <h2 className="mt-4 text-center text-[clamp(28px,3.6vw,40px)] font-display font-medium tracking-[-0.02em]">
              Questions{' '}
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                fréquentes
                <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl" />
              </span>
            </h2>

            <div className="mt-12 border border-[color:var(--border-subtle)] !rounded-none">
              {FAQ.map((f, i) => (
                <details key={f.q} className={`group bg-[color:var(--card-elev-1)] light:bg-white ${i < FAQ.length - 1 ? 'border-b border-[color:var(--border-subtle)]' : ''}`}>
                  <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none hover:bg-[color:var(--card)] transition-colors">
                    <h3 className="text-[16px] md:text-[17px] font-medium text-[color:var(--ink)] pr-4">{f.q}</h3>
                    <span className="shrink-0 w-7 h-7 grid place-items-center border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)] group-open:bg-[color:var(--accent)] group-open:text-black group-open:border-[color:var(--accent)] transition-colors">
                      <ArrowRight size={13} className="rotate-90 group-open:rotate-[-90deg] transition-transform" />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-[14.5px] leading-relaxed text-[color:var(--ink-muted)]">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA AUDIT */}
        <section className="relative py-16 lg:py-24 border-t border-[color:var(--border-subtle)]">
          <div className="max-w-[920px] mx-auto px-5 lg:px-10">
            <div className="!rounded-none border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/5 p-8 lg:p-12 text-center">
              <h2 className="text-[28px] md:text-[36px] font-display font-medium tracking-[-0.02em] text-[color:var(--ink)] max-w-[640px] mx-auto">
                Besoin d&apos;un avis senior sur votre roadmap CRO ?
              </h2>
              <p className="mt-4 text-[15px] text-[color:var(--ink-muted)] max-w-[560px] mx-auto leading-relaxed">
                On audite votre stack A/B, votre tracking et votre roadmap. 5 jours, 0 € pour les scale-ups B2B.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="/audit"
                  className="inline-flex items-center gap-2 px-6 h-12 rounded-md text-[14px] font-semibold text-black light:text-white hover:scale-[1.02] transition-transform"
                  style={{
                    background:
                      'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
                  }}
                >
                  Demander l&apos;audit gratuit
                  <ArrowRight size={14} />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 h-12 rounded-md border border-[color:var(--border-subtle)] text-[14px] font-medium text-[color:var(--ink)] hover:border-[color:var(--accent)]/40 transition-colors"
                >
                  Nous contacter
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
