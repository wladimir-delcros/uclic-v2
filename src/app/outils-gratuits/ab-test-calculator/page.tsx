import type { Metadata } from 'next';
import { ArrowRight, Calculator, FlaskConical, Gauge, BarChart3 } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import SectionAmbience from '@/components/ui/SectionAmbience';
import ABTestCalculator from '@/components/tools/ABTestCalculator';
import { jsonLdString } from '@/lib/schema';

const SITE_URL = 'https://uclic.fr';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Calculateur A/B Test — Significativité | Uclic',
  description:
    "Significativité statistique, p-value, z-score, uplift et intervalle de confiance pour vos A/B tests. Outil gratuit par les growth seniors Uclic.",
  alternates: { canonical: '/outils-gratuits/ab-test-calculator' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/outils-gratuits/ab-test-calculator`,
    title: 'Calculateur A/B Test — Significativité | Uclic',
    description:
      "Test z sur deux proportions, p-value, intervalle de confiance. Outil gratuit par les growth seniors Uclic.",
    siteName: 'Uclic',
    locale: 'fr_FR',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'A/B Test Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculateur A/B Test — Significativité',
    description:
      "Test z sur deux proportions, p-value, intervalle de confiance. Gratuit, par Uclic.",
    site: '@uclic_fr',
  },
};

const STEPS = [
  { n: '01', t: 'Saisissez le contrôle (A)', d: "Visiteurs et conversions du groupe contrôle observés sur la période du test." },
  { n: '02', t: 'Saisissez la variante (B)', d: "Visiteurs et conversions du groupe variante exposés au changement testé." },
  { n: '03', t: 'Choisissez l\'alpha', d: "5% est le standard. 1% pour des décisions très critiques. 10% pour des tests itératifs." },
  { n: '04', t: 'Lisez le verdict', d: "Si p-value < alpha, l'écart est statistiquement significatif. Sinon, continuez à collecter." },
];

const USE_CASES = [
  { t: 'Conclusion d\'un A/B test', d: "Statuer si l'écart observé est significatif ou peut relever du hasard." },
  { t: 'Reporting CRO mensuel', d: "Documenter la p-value, l'uplift et l'IC pour chaque test publié au COPIL." },
  { t: 'Audit de tests passés', d: "Vérifier la robustesse statistique de tests réalisés en interne." },
  { t: 'Décision pricing / refonte', d: "Avant de pousser une variante en prod, valider qu'elle bat le contrôle." },
];

const FAQ = [
  {
    q: "Qu'est-ce que la signification statistique ?",
    a: "Elle indique si l'écart observé entre vos variantes est probablement réel ou peut être dû au hasard. Un résultat est considéré significatif lorsque la p-value est inférieure au seuil alpha choisi (5% par défaut).",
  },
  {
    q: "Comment interpréter la p-value ?",
    a: "La p-value représente la probabilité d'observer un écart au moins aussi grand que celui observé, dans l'hypothèse où il n'y a en réalité aucune différence. Plus elle est petite, plus le résultat est statistiquement significatif. Une p-value de 0,03 signifie 3% de chances de faux positif.",
  },
  {
    q: "Test bilatéral ou unilatéral ?",
    a: "Bilatéral est le standard recommandé : on cherche à savoir si la variante est différente du contrôle (mieux ou moins bien). Unilatéral suppose qu'on s'attend uniquement à une amélioration et ne détecte pas une dégradation. Risque : sous-estimer un effet négatif.",
  },
  {
    q: "Que signifie l'intervalle de confiance (IC) ?",
    a: "L'IC à 95% donne la plage dans laquelle se trouve très probablement le vrai taux de conversion de la variante. S'il ne chevauche pas le taux du contrôle, c'est un signal fort de significativité.",
  },
  {
    q: "Mon résultat n'est pas significatif, que faire ?",
    a: "Trois options : (1) continuer à collecter du trafic si la durée prévue n'est pas atteinte, (2) accepter que l'écart est faible et arrêter le test, (3) re-formuler une hypothèse plus ambitieuse pour viser un MDE plus large. Notre calculateur MDE complète bien cette analyse.",
  },
  {
    q: "Le calculateur gère-t-il plusieurs variantes ?",
    a: "Cet outil compare 2 groupes (A vs B). Pour 3+ variantes, il faut appliquer une correction de Bonferroni (alpha / nombre de comparaisons) et traiter chaque paire séparément.",
  },
  {
    q: "Puis-je arrêter le test dès que c'est significatif ?",
    a: "Non, c'est le piège du peeking : regarder les résultats trop tôt augmente le taux de faux positifs. Définissez une durée et un sample size en amont (avec notre calculateur MDE) et tenez-vous-y.",
  },
];

export default function ABTestCalculatorPage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Outils gratuits', item: `${SITE_URL}/outils-gratuits` },
      { '@type': 'ListItem', position: 3, name: 'Calculateur A/B Test', item: `${SITE_URL}/outils-gratuits/ab-test-calculator` },
    ],
  };

  const software = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Calculateur A/B Test — Significativité',
    operatingSystem: 'Any',
    applicationCategory: 'BusinessApplication',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    url: `${SITE_URL}/outils-gratuits/ab-test-calculator`,
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
            <h1 className="text-[40px] md:text-[52px] lg:text-[60px] leading-[1.05] font-medium text-[color:var(--ink)] tracking-tight max-w-[820px]">
              Calculateur A/B Test —{' '}
              <span className="relative inline-block isolate font-[family-name:var(--font-hand)] italic text-[color:var(--accent)] tracking-[0.005em]">
                significativité
                <span className="absolute -inset-x-4 -inset-y-2 -z-10 bg-[color:var(--accent)]/10 blur-2xl rounded-full" />
              </span>
            </h1>
            <p className="mt-5 text-[16px] lg:text-[17px] leading-relaxed text-[color:var(--ink-muted)] max-w-[680px]">
              Vérifiez si l&apos;écart entre votre contrôle et votre variante est statistiquement
              significatif. Test z sur deux proportions, p-value, z-score, uplift et intervalle de confiance.
            </p>

            <div className="mt-10">
              <ABTestCalculator />
            </div>

            <p className="mt-6 text-[12px] text-[color:var(--ink-muted)]/80 leading-relaxed">
              Test z bilatéral (ou unilatéral) sur deux proportions indépendantes. Ne remplace pas une
              analyse approfondie ni un test bayésien pour des A/B longs ou multi-variants.
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
              Test z sur deux proportions, en 4 étapes
            </h2>
            <p className="mt-4 text-[15px] text-[color:var(--ink-muted)] max-w-[620px] leading-relaxed">
              Le calculateur compare deux taux de conversion observés et calcule la probabilité que
              l&apos;écart soit dû au hasard.
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
                z = (p<sub>v</sub> − p<sub>c</sub>) / √(p̄ · (1−p̄) · (1/n<sub>c</sub> + 1/n<sub>v</sub>))
              </p>
              <p className="mt-3 text-[13px] text-[color:var(--ink-muted)] leading-relaxed">
                Avec p<sub>c</sub>, p<sub>v</sub> les taux observés, p̄ le taux poolé, n<sub>c</sub> et n<sub>v</sub> les visiteurs.
                p-value = 2 · (1 − Φ(|z|)) en bilatéral. IC variante : p<sub>v</sub> ± Z<sub>α/2</sub> · √(p<sub>v</sub>(1−p<sub>v</sub>)/n<sub>v</sub>).
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
              4 cas d&apos;usage typiques
            </h2>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-[color:var(--border-subtle)] border border-[color:var(--border-subtle)] !rounded-none">
              {USE_CASES.map((u, i) => {
                const icons = [FlaskConical, BarChart3, Gauge, Calculator];
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
              <a href="/outils-gratuits/mde-calculator" className="inline-flex items-center gap-1.5 text-[13.5px] text-[color:var(--accent)] hover:gap-2.5 transition-all">
                → Calculateur MDE (taille d&apos;échantillon)
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
                Besoin d&apos;un avis senior sur vos A/B tests ?
              </h2>
              <p className="mt-4 text-[15px] text-[color:var(--ink-muted)] max-w-[560px] mx-auto leading-relaxed">
                Audit CRO complet : roadmap, hypothèses, tracking et exécution. 5 jours, 0 € pour les scale-ups B2B.
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
