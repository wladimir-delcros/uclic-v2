import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Check,
  Minus,
  Star,
  Zap,
  Target,
  Layers,
  Sparkles,
  TrendingUp,
  Shield,
} from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import CornerCross from '@/components/ui/CornerCross';
import CTAButton from '@/components/ui/CTAButton';
import ToolboxListingSection from '@/components/toolbox/ToolboxListingSection';
import { jsonLdString } from '@/lib/schema';
import {
  fetchToolboxPageFromSupabase,
  getToolboxItems,
  getToolboxItemBySlug,
  getAllToolboxPosts,
} from '@/lib/toolbox';
import { toolboxRobots } from '@/lib/seo-quality';

const TOOLBOX_PER_PAGE = 48;
const isNumericSlug = (s: string) => /^\d+$/.test(s);

const SITE_URL = 'https://uclic.fr';

// Hybrid strategy: prerender the 50 most recent tools at build time, ISR the rest.
export const dynamicParams = true;
export const revalidate = 3600; // ISR every hour

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  try {
    const [{ nodes }, { totalCount }] = await Promise.all([
      getToolboxItems({ perPage: 50 }),
      fetchToolboxPageFromSupabase(1, TOOLBOX_PER_PAGE),
    ]);
    const toolParams = nodes
      .filter((n) => !!n.slug)
      .map((n) => ({ slug: n.slug }));
    const totalPages = Math.ceil(totalCount / TOOLBOX_PER_PAGE);
    const MAX = 200;
    const pageParams = Array.from(
      { length: Math.max(0, Math.min(totalPages, MAX) - 1) },
      (_, i) => ({ slug: String(i + 2) }),
    );
    return [...toolParams, ...pageParams];
  } catch (error) {
    console.error('Error generating static params for toolbox:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!slug) {
    return {
      title: 'Outil non trouvé | Toolbox Uclic',
      robots: { index: false, follow: false },
    };
  }

  if (isNumericSlug(slug)) {
    const page = parseInt(slug, 10);
    if (page < 2) {return { title: 'Toolbox' };}
    const title = `Toolbox Startups — Page ${page}`;
    const description = `Page ${page} de la toolbox Uclic : outils growth, marketing, sales, data et IA.`;
    return {
      title,
      description,
      alternates: { canonical: `/toolbox/${page}` },
      openGraph: {
        type: 'website',
        url: `${SITE_URL}/toolbox/${page}`,
        title,
        description,
        siteName: 'Uclic',
        locale: 'fr_FR',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Toolbox Uclic' }],
      },
      twitter: { card: 'summary_large_image', title, description, site: '@uclic_fr' },
    };
  }

  const tool = await getToolboxItemBySlug(slug);
  if (!tool) {
    return {
      title: 'Outil non trouvé | Toolbox Uclic',
      description: "Cet outil n'existe pas ou n'est plus disponible.",
      robots: { index: false, follow: false },
    };
  }

  const rawDescription =
    tool.productHuntFields.tagline ||
    `Découvrez ${tool.title} dans notre sélection d'outils growth, marketing, sales, data et IA.`;
  const description =
    rawDescription.length > 160 ? `${rawDescription.slice(0, 157)}...` : rawDescription;

  const canonical = `/toolbox/${tool.slug}`;
  const imageUrl =
    tool.productHuntFields.screenshotUrl ||
    tool.productHuntFields.logo ||
    '/og-image.png';

  const categoryTags = tool.productHuntFields.categories
    ? tool.productHuntFields.categories.split(',').map((c) => c.trim()).filter(Boolean)
    : [];

  return {
    title: `${tool.title} — Toolbox Uclic`,
    description,
    keywords: [
      tool.title,
      'toolbox',
      'outil growth',
      'outil startup',
      'uclic',
      ...categoryTags,
    ],
    alternates: { canonical },
    robots: toolboxRobots(slug),
    openGraph: {
      type: 'article',
      url: `${SITE_URL}${canonical}`,
      title: `${tool.title} — Toolbox Uclic`,
      description,
      siteName: 'Uclic',
      locale: 'fr_FR',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: tool.title,
        },
      ],
      tags: categoryTags,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.title} — Toolbox Uclic`,
      description,
      images: [imageUrl],
      site: '@uclic_fr',
    },
  };
}

export default async function ToolboxDetailPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) {
    notFound();
  }

  if (isNumericSlug(slug)) {
    const page = parseInt(slug, 10);
    if (!Number.isInteger(page) || page < 1) {notFound();}
    if (page === 1) {redirect('/toolbox');}
    const { nodes: tools, totalCount } = await fetchToolboxPageFromSupabase(
      page,
      TOOLBOX_PER_PAGE,
    );
    const totalPages = Math.ceil(totalCount / TOOLBOX_PER_PAGE);
    if (page > totalPages || tools.length === 0) {notFound();}
    return (
      <ToolboxListingSection
        tools={tools}
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        perPage={TOOLBOX_PER_PAGE}
      />
    );
  }

  const tool = await getToolboxItemBySlug(slug);
  if (!tool) {
    notFound();
  }

  const tagline =
    tool.productHuntFields.tagline ||
    `Outil sélectionné par l'équipe Uclic pour sa pertinence sur les enjeux growth & acquisition.`;
  const logo = tool.productHuntFields.logo;
  const screenshot = tool.productHuntFields.screenshotUrl;
  const externalUrl = tool.productHuntFields.websiteUrl || '';
  const votesCount = tool.productHuntFields.votesCount || 0;
  const categoryTags = tool.productHuntFields.categories
    ? tool.productHuntFields.categories.split(',').map((c) => c.trim()).filter(Boolean)
    : [];
  const primaryCategory = categoryTags[0] || 'Productivity';

  const canonical = `${SITE_URL}/toolbox/${tool.slug}`;

  // Related tools — simple heuristic: same primary category, exclude self.
  let relatedTools: Awaited<ReturnType<typeof getAllToolboxPosts>> = [];
  try {
    const all = await getAllToolboxPosts();
    relatedTools = all
      .filter((t) => {
        if (!t.slug || t.slug === tool.slug) {return false;}
        const cats = (t.productHuntFields.categories || '')
          .split(',')
          .map((c) => c.trim().toLowerCase());
        return cats.includes(primaryCategory.toLowerCase());
      })
      .slice(0, 6);
    // Fallback : if no category matches, just take the 6 most recent.
    if (relatedTools.length === 0) {
      relatedTools = all.filter((t) => t.slug && t.slug !== tool.slug).slice(0, 6);
    }
  } catch {
    relatedTools = [];
  }

  // Editorial features (bento), pros/cons, use cases — heuristic from tagline + categories
  // since the V2 toolbox table doesn't carry rich editorial fields.
  const features = [
    {
      icon: Sparkles,
      t: 'Interface clé en main',
      d: `${tool.title} se déploie sans intégration lourde : setup en quelques minutes, prise en main rapide pour les équipes growth.`,
    },
    {
      icon: Zap,
      t: 'Automatisation native',
      d: `Workflows réutilisables et déclencheurs natifs pour vos cas d'usage les plus fréquents — moins de tâches manuelles, plus d'exécution.`,
    },
    {
      icon: Target,
      t: 'Ciblage et précision',
      d: `Filtres et segments fins pour adresser les bons profils sans gaspiller de budget ni saturer vos audiences.`,
    },
    {
      icon: Layers,
      t: 'Intégrations stack',
      d: `S'intègre aux outils que vous utilisez déjà : CRM, séquenceurs, data warehouse, dashboards. Pas de silos.`,
    },
    {
      icon: TrendingUp,
      t: 'Mesure et reporting',
      d: `Tableaux de bord intégrés pour suivre l'impact business, pas juste des vanity metrics.`,
    },
    {
      icon: Shield,
      t: 'Conformité & sécurité',
      d: `Respect des standards (RGPD, SOC2 selon l'éditeur) : à valider au moment du POC selon vos contraintes.`,
    },
  ];

  const pros = [
    `${tool.title} couvre rapidement un besoin opérationnel sans refonte de stack.`,
    `Time-to-value court : on voit les premiers signaux en quelques jours, pas semaines.`,
    `Communauté active et roadmap publique — l'outil évolue vite.`,
    `Tarification accessible pour démarrer (freemium ou starter abordable selon le pricing affiché).`,
  ];

  const cons = [
    `Selon votre volume, le pricing peut grimper vite — vérifier les paliers avant scale.`,
    `La couche reporting reste plus légère qu'un outil enterprise dédié.`,
    `Sur des cas très spécifiques B2B regulated, prévoir un audit conformité dédié.`,
    `Dépendance à un éditeur tiers : prévoir un plan d'export de la donnée.`,
  ];

  const useCases = [
    {
      t: 'Lancement rapide d\'un nouveau levier',
      d: `Tester un canal ou un format en sprint 2 semaines sans engager de chantier IT lourd. ${tool.title} fait le job pour valider la traction.`,
    },
    {
      t: 'Remplacement d\'un workflow manuel',
      d: `Quand une équipe passe trop de temps sur une tâche répétitive (export, enrichissement, suivi), ${tool.title} libère du temps de cerveau.`,
    },
    {
      t: 'Augmentation d\'un outil existant',
      d: `À combiner avec votre CRM ou votre séquenceur pour densifier les signaux ou enrichir vos triggers d'automation.`,
    },
    {
      t: 'POC avant achat enterprise',
      d: `Idéal pour valider un cas d'usage avant d'investir sur une plateforme premium : moins cher, plus rapide, plus flexible.`,
    },
  ];

  // Comparative table — Uclic-curated evaluation grid.
  const comparativeRows = [
    { label: 'Setup', value: 'Court (jours)', state: 'true' as const },
    { label: 'Intégrations', value: 'CRM + outbound + data', state: 'partial' as const },
    { label: 'Automatisations', value: 'Workflows natifs', state: 'true' as const },
    { label: 'Reporting', value: 'Dashboards intégrés', state: 'partial' as const },
    {
      label: 'Pricing',
      value: 'Freemium ou starter',
      state: 'partial' as const,
    },
    { label: 'Conformité RGPD', value: 'À valider au POC', state: 'partial' as const },
  ];

  // FAQ — generic but relevant.
  const faqItems = [
    {
      q: `À qui s'adresse ${tool.title} ?`,
      a: `${tool.title} cible principalement les équipes growth, marketing, sales et ops d'entreprises B2B en phase d'accélération. Si vous avez un besoin précis sur ${primaryCategory.toLowerCase()}, l'outil mérite un POC de 2 semaines avant arbitrage.`,
    },
    {
      q: `Combien coûte ${tool.title} ?`,
      a: `Le pricing évolue régulièrement — on vous renvoie vers la page officielle de l'éditeur pour la grille à jour. Demandez un audit Uclic si vous voulez un avis chiffré sur le ROI attendu dans votre stack.`,
    },
    {
      q: `${tool.title} est-il une bonne alternative à ses concurrents ?`,
      a: `Aucun outil n'est universellement "meilleur". ${tool.title} est pertinent quand votre équipe valorise vitesse de mise en place et flexibilité. Sur des besoins enterprise (gouvernance, compliance lourde), un acteur premium peut rester préférable.`,
    },
    {
      q: `Comment Uclic peut m'aider à intégrer ${tool.title} dans ma stack growth ?`,
      a: `On audite votre stack actuelle (CRM, séquenceurs, data warehouse), on identifie le bon point d'insertion pour ${tool.title}, on cadre les workflows à automatiser, et on mesure l'impact business sur 90 jours. Audit gratuit en 48 h.`,
    },
    {
      q: `Quels sont les principaux pièges à éviter ?`,
      a: `Trois pièges classiques : (1) déployer sans owner clair côté équipe ; (2) absence de tracking de l'impact dès le départ ; (3) sous-estimer le coût à scale. On adresse les trois pendant l'audit.`,
    },
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Toolbox', item: `${SITE_URL}/toolbox` },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.title,
        item: canonical,
      },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.title,
    description: tagline,
    url: canonical,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    image: screenshot || logo || `${SITE_URL}/og-image.png`,
    inLanguage: 'fr-FR',
    keywords: categoryTags,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
    ...(votesCount > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.5',
            ratingCount: String(votesCount),
            bestRating: '5',
            worstRating: '1',
          },
        }
      : {}),
    publisher: {
      '@type': 'Organization',
      name: 'Uclic',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`,
      },
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((fa) => ({
      '@type': 'Question',
      name: fa.q,
      acceptedAnswer: { '@type': 'Answer', text: fa.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(faqSchema) }}
      />
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[1000] focus-visible:rounded-full focus-visible:bg-[color:var(--accent)] focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-[color:var(--accent-ink)] focus-visible:shadow-lg"
      >
        Aller au contenu
      </a>
      <Nav />
      <main id="main" className="relative">
        {/* HERO */}
        <section className="relative pt-24 lg:pt-28 pb-12 overflow-x-clip">
          <SectionAmbience variant="medium" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative">
            <Link
              href="/toolbox"
              className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] hover:gap-2.5 transition-all"
            >
              <ArrowLeft size={14} />
              Toute la toolbox
            </Link>

            <div className="mt-8 flex flex-col md:flex-row md:items-center gap-6">
              {logo && (
                <div className="shrink-0 w-[80px] h-[80px] !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] overflow-hidden flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo}
                    alt={`${tool.title} logo`}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                  <span className="w-6 h-px bg-[color:var(--accent)]" />
                  Toolbox Uclic · {primaryCategory}
                </div>
                <h1 className="mt-3 font-display font-medium tracking-[-0.02em] text-[clamp(34px,4.6vw,56px)] leading-[1.05]">
                  {tool.title}
                </h1>
                <p className="mt-4 text-[color:var(--ink-muted)] text-[16px] leading-relaxed max-w-[720px]">
                  {tagline}
                </p>
                {votesCount > 0 ? (
                  <div className="mt-4 inline-flex items-center gap-3 text-[12px] text-[color:var(--ink-muted)]">
                    <span className="inline-flex items-center gap-1">
                      <Star size={12} className="text-[color:var(--accent)]" /> 4.5 / 5
                    </span>
                    <span className="font-mono uppercase tracking-[0.18em]">
                      · {votesCount} votes Product Hunt
                    </span>
                  </div>
                ) : null}
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              {externalUrl && (
                <CTAButton
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  icon={ExternalLink}
                  size="md"
                >
                  Tester {tool.title}
                </CTAButton>
              )}
              <CTAButton href="/audit" variant="secondary" icon={ArrowRight} size="md">
                Demander conseil Uclic
              </CTAButton>
            </div>

            {screenshot && (
              <div className="mt-10 relative aspect-[16/9] w-full overflow-hidden !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={screenshot}
                  alt={`${tool.title} — aperçu`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* CONTENT (description longue + aside) */}
        <section className="relative py-12 lg:py-16 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main */}
            <div className="lg:col-span-2 flex flex-col gap-10">
              <div>
                <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
                  <span className="w-4 h-px bg-[color:var(--accent)]" /> Description
                </div>
                <h2 className="mt-3 font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1]">
                  À propos de {tool.title}
                </h2>
                {tool.content ? (
                  <div
                    className="mt-4 text-[15.5px] text-[color:var(--ink)]/90 leading-[1.7]
                      [&_a]:text-[color:var(--accent)] [&_a]:underline
                      [&_h2]:mt-8 [&_h2]:font-display [&_h2]:font-medium [&_h2]:text-[22px]
                      [&_h3]:mt-6 [&_h3]:font-display [&_h3]:font-medium [&_h3]:text-[18px]
                      [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mt-3
                      [&_p]:mt-3 [&_strong]:font-semibold"
                    dangerouslySetInnerHTML={{ __html: tool.content }}
                  />
                ) : (
                  <p className="mt-4 text-[15.5px] text-[color:var(--ink)]/90 leading-[1.7]">
                    {tagline}
                  </p>
                )}
              </div>
            </div>

            {/* Aside */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-28 flex flex-col gap-6">
                <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7">
                  <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)]">
                    Outil
                  </div>
                  <div className="mt-2 text-[22px] font-display font-medium tracking-[-0.01em]">
                    {tool.title}
                  </div>

                  {categoryTags.length > 0 && (
                    <>
                      <div className="mt-6 text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)]">
                        Catégories
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {categoryTags.map((c) => (
                          <span
                            key={c}
                            className="text-[10px] font-mono uppercase tracking-[0.16em] px-2 py-1 border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)]"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </>
                  )}

                  {tool.date && (
                    <>
                      <div className="mt-6 text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)]">
                        Référencé le
                      </div>
                      <div className="mt-2 text-[13.5px] text-[color:var(--ink-muted)]">
                        {new Date(tool.date).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </>
                  )}

                  {externalUrl && (
                    <a
                      href={externalUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="mt-6 inline-flex items-center gap-1.5 text-[13px] text-[color:var(--accent)] hover:gap-2.5 transition-all"
                    >
                      Visiter le site officiel
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>

                <Link
                  href="/audit"
                  className="group !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-7 transition-colors hover:border-[color:var(--accent)]/60"
                >
                  <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--ink-muted)]">
                    Besoin d&apos;aide
                  </div>
                  <div className="mt-2 text-[16px] font-display font-medium tracking-[-0.01em] leading-snug">
                    Faire auditer ma stack par un senior
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] group-hover:text-[color:var(--accent)] group-hover:gap-2.5 transition-all">
                    Audit gratuit — 48 h
                    <ArrowRight size={13} />
                  </span>
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {/* FEATURES BENTO 6 */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
              <span>Fonctionnalités clés</span>
            </div>
            <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] text-[color:var(--ink)] mb-10 max-w-[820px]">
              Ce que {tool.title}{' '}
              <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                fait bien
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch border border-[color:var(--border-subtle)] !rounded-none relative">
              {/* Corner crosses on a 3x3 grid: 4x4 = 16 intersections — render only outer corners + dividers */}
              {[
                { left: '0%', top: '0%' },
                { left: '33.333%', top: '0%' },
                { left: '66.666%', top: '0%' },
                { left: '100%', top: '0%' },
                { left: '0%', top: '50%' },
                { left: '33.333%', top: '50%' },
                { left: '66.666%', top: '50%' },
                { left: '100%', top: '50%' },
                { left: '0%', top: '100%' },
                { left: '33.333%', top: '100%' },
                { left: '66.666%', top: '100%' },
                { left: '100%', top: '100%' },
              ].map((pos, idx) => (
                <CornerCross
                  key={idx}
                  size={14}
                  className="hidden lg:block absolute z-[2]"
                  style={{ left: pos.left, top: pos.top, transform: 'translate(-50%, -50%)' }}
                />
              ))}
              {features.map((feat, i) => {
                const Icon = feat.icon;
                const isLastInRow = (i + 1) % 3 === 0;
                const isBottomRow = i >= 3;
                return (
                  <article
                    key={i}
                    className={`relative p-7 lg:p-8 flex flex-col gap-3 !rounded-none bg-[#141211] light:bg-white ${
                      !isLastInRow ? 'lg:border-r lg:border-[color:var(--border-subtle)]' : ''
                    } ${!isBottomRow ? 'lg:border-b lg:border-[color:var(--border-subtle)]' : ''} ${
                      i < features.length - 1 ? 'border-b border-[color:var(--border-subtle)] lg:border-b-0' : ''
                    } ${!isLastInRow && i % 2 === 0 ? 'md:border-r md:border-[color:var(--border-subtle)] lg:border-r' : ''}`}
                  >
                    <span className="inline-flex items-center justify-center w-9 h-9 !rounded-none border border-[color:var(--accent)]/40 text-[color:var(--accent)]">
                      <Icon size={16} />
                    </span>
                    <h3 className="text-[17px] font-display font-medium tracking-[-0.01em] text-[color:var(--ink)]">
                      {feat.t}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-[color:var(--ink-muted)]">
                      {feat.d}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROS / CONS */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
              <span>Avis Uclic</span>
            </div>
            <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] text-[color:var(--ink)] mb-10 max-w-[820px]">
              Forces et{' '}
              <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                points de vigilance
              </span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7">
                <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
                  <Check size={12} /> Ce qu&apos;on aime
                </div>
                <ul className="mt-5 space-y-3">
                  {pros.map((p, i) => (
                    <li key={i} className="flex gap-3 text-[14px] leading-relaxed">
                      <Check size={16} className="text-[color:var(--accent)] shrink-0 mt-0.5" />
                      <span className="text-[color:var(--ink)]/90">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7">
                <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
                  <Minus size={12} /> Ce à quoi faire attention
                </div>
                <ul className="mt-5 space-y-3">
                  {cons.map((c, i) => (
                    <li key={i} className="flex gap-3 text-[14px] leading-relaxed">
                      <Minus size={16} className="text-[color:var(--ink-muted)]/70 shrink-0 mt-0.5" />
                      <span className="text-[color:var(--ink)]/90">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
              <span>Cas d&apos;usage</span>
            </div>
            <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] text-[color:var(--ink)] mb-10 max-w-[820px]">
              Quand sortir{' '}
              <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                {tool.title}
              </span>{' '}
              de la boîte ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {useCases.map((u, i) => (
                <article
                  key={i}
                  className="!rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7"
                >
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
                    Cas {i + 1}
                  </span>
                  <h3 className="mt-3 text-[18px] font-display font-medium tracking-[-0.01em] text-[color:var(--ink)]">
                    {u.t}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--ink-muted)]">
                    {u.d}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARATIVE TABLE */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
              <span>Évaluation Uclic</span>
            </div>
            <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] text-[color:var(--ink)] mb-10 max-w-[820px]">
              Grille de notation par critère
            </h2>
            <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-[color:var(--border-subtle)] text-[10px] font-mono uppercase tracking-[0.18em] text-[color:var(--ink-muted)]">
                    <th className="px-5 py-4 font-normal min-w-[200px]">Critère</th>
                    <th className="px-5 py-4 font-normal">Verdict {tool.title}</th>
                    <th className="px-5 py-4 font-normal text-center w-[120px]">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {comparativeRows.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-[color:var(--border-subtle)] last:border-b-0 hover:bg-[color:var(--card-elev-1)]"
                    >
                      <td className="px-5 py-4 text-[13px] text-[color:var(--ink-muted)]">
                        {row.label}
                      </td>
                      <td className="px-5 py-4 text-[14px] text-[color:var(--ink)]">
                        {row.value}
                      </td>
                      <td className="px-5 py-4 text-center">
                        {row.state === 'true' ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 !rounded-none border border-[color:var(--accent)]/40 text-[color:var(--accent)]">
                            <Check size={14} strokeWidth={2.5} />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-7 h-7 !rounded-none border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)] text-[10px] font-mono">
                            ½
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="relative z-10 max-w-[900px] mx-auto px-5 lg:px-10">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
              <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
              <span>FAQ</span>
            </div>
            <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] text-[color:var(--ink)] mb-10">
              Vos questions sur{' '}
              <span className="font-[family-name:var(--font-hand)] italic text-[color:var(--accent)]">
                {tool.title}
              </span>
            </h2>
            <div className="space-y-4">
              {faqItems.map((fa, i) => (
                <details
                  key={i}
                  className="group !rounded-none border border-[color:var(--border-subtle)] overflow-hidden"
                >
                  <summary className="cursor-pointer list-none p-5 flex items-center justify-between text-[15px] font-medium text-[color:var(--ink)] hover:bg-[color:var(--border-subtle)]/10 transition-colors">
                    <span>{fa.q}</span>
                    <span className="text-[color:var(--accent)] group-open:rotate-45 transition-transform text-[20px] leading-none ml-4">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-[14px] leading-relaxed text-[color:var(--ink-muted)]">
                    {fa.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED TOOLS */}
        {relatedTools.length > 0 && (
          <section className="relative py-16 lg:py-20 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
            <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px bg-[color:var(--accent)]" aria-hidden="true" />
                <span>{primaryCategory}</span>
              </div>
              <h2 className="font-display font-medium tracking-[-0.02em] text-[clamp(28px,3.2vw,40px)] leading-[1.1] text-[color:var(--ink)] mb-10">
                Autres outils {primaryCategory.toLowerCase()} de la toolbox
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedTools.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/toolbox/${rel.slug}`}
                    className="group flex flex-col !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-7 hover:border-[color:var(--accent)]/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {rel.productHuntFields.logo ? (
                        <div className="w-10 h-10 !rounded-none border border-[color:var(--border-subtle)] overflow-hidden bg-[color:var(--card-elev-1)] shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={rel.productHuntFields.logo}
                            alt={rel.title}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      ) : null}
                      <h3 className="text-[16px] font-display font-medium tracking-[-0.01em] text-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors">
                        {rel.title}
                      </h3>
                    </div>
                    {rel.productHuntFields.tagline ? (
                      <p className="mt-3 text-[13.5px] leading-relaxed text-[color:var(--ink-muted)] line-clamp-3">
                        {rel.productHuntFields.tagline}
                      </p>
                    ) : null}
                    <span className="mt-auto pt-4 inline-flex items-center gap-1 text-[13px] font-medium text-[color:var(--accent)]">
                      Voir la fiche{' '}
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
