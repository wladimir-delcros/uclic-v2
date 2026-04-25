import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';
import {
  getWorkflowBySlug,
  getRelatedWorkflows,
  getWorkflowNodes,
} from '@/lib/workflows';
import WorkflowGraph from '@/components/workflows/WorkflowGraph.client';

const SITE_URL = 'https://uclic.fr';

// ISR: revalidate every hour; allow on-demand generation of the 1899 slugs
export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Empty array => every slug is rendered on-demand (ISR), avoiding a
// multi-thousand-page SSG build. Pages are cached for 1h thanks to `revalidate`.
export function generateStaticParams() {
  return [];
}

function truncate(str: string, max: number): string {
  if (!str) {return '';}
  if (str.length <= max) {return str;}
  return str.slice(0, max - 3).trim() + '...';
}

function stripTagsSuffix(text: string): string {
  return text.replace(/\s*Tags clés\s*:\s*.+$/i, '').trim();
}

/** Render a paragraph, or a bullet list if the text contains "Étape N :" markers or line breaks. */
function TextBlock({ text }: { text: string }) {
  const trimmed = (text || '').trim();
  if (!trimmed) {return null;}

  const stepRegex = /\s+Étape\s*\d+\s*:\s*/i;
  const parts = trimmed.split(stepRegex);

  if (parts.length <= 1) {
    const lines = trimmed
      .split(/\n+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (lines.length <= 1) {
      return (
        <p className="text-[15.5px] text-[color:var(--ink)]/90 leading-[1.7] whitespace-pre-wrap">
          {trimmed}
        </p>
      );
    }
    return (
      <ul className="flex flex-col gap-2.5">
        {lines.map((line, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-[15px] text-[color:var(--ink)]/90 leading-[1.6]"
          >
            <span className="mt-0.5 inline-flex shrink-0 items-center justify-center w-5 h-5 !rounded-none bg-[color:var(--accent)]/15 text-[color:var(--accent)]">
              <Check size={12} strokeWidth={2.6} />
            </span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    );
  }

  const intro = parts[0].trim();
  const stepContents = parts.slice(1);

  return (
    <>
      {intro && (
        <p className="mb-4 text-[15.5px] text-[color:var(--ink)]/90 leading-[1.7] whitespace-pre-wrap">
          {intro}
        </p>
      )}
      <ul className="flex flex-col gap-3">
        {stepContents.map((content, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-[15px] text-[color:var(--ink)]/90 leading-[1.6]"
          >
            <span className="mt-0.5 inline-flex shrink-0 items-center justify-center w-6 h-6 !rounded-none bg-[color:var(--accent)]/15 text-[color:var(--accent)] text-[11px] font-mono">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span>
              <strong className="text-[color:var(--ink)]">Étape {i + 1} :</strong>{' '}
              {content.trim()}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!slug) {
    return {
      title: 'Workflow introuvable | Uclic',
      robots: { index: false, follow: false },
    };
  }
  const wf = await getWorkflowBySlug(slug);
  if (!wf) {
    return {
      title: 'Workflow introuvable | Uclic',
      robots: { index: false, follow: false },
    };
  }
  const title = `${wf.title} | Workflow n8n | Uclic`;
  const baseDescription =
    wf.summary ||
    `Workflow n8n : ${wf.title}. Automatisez vos processus et vos intégrations avec n8n.`;
  const tagSnippet =
    wf.tags && wf.tags.length > 0
      ? ` Tags principaux : ${wf.tags.slice(0, 4).join(', ')}.`
      : '';
  const description = truncate(stripTagsSuffix(baseDescription) + tagSnippet, 160);
  const keywords = [
    'workflow n8n',
    'agence n8n',
    'agence automatisation',
    'n8n',
    wf.category,
    ...(wf.tags || []),
  ]
    .filter(Boolean)
    .slice(0, 12)
    .join(', ');
  const canonical = `/membres/workflows/${slug}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    // Workflows individuels = semi-privé (cible membres). Désindexés pour
    // éviter d'alimenter l'index bloat — le hub /membres/workflows reste
    // indexable et fait figure de catalogue public.
    robots: { index: false, follow: true },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}${canonical}`,
      title,
      description,
      siteName: 'Uclic',
      locale: 'fr_FR',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: wf.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@uclic_fr',
    },
  };
}

export default async function WorkflowDetailPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) {
    notFound();
  }

  const wf = await getWorkflowBySlug(slug);
  if (!wf) {
    notFound();
  }

  const [related, workflowNodes] = await Promise.all([
    getRelatedWorkflows(wf.id, wf.tags, 5),
    getWorkflowNodes(wf.id),
  ]);

  const nodesWithDescription = workflowNodes.filter((n) => n.description);
  const summaryClean = stripTagsSuffix(wf.summary || '');
  const displayTags = (wf.tags || []).slice(0, 6);

  const hasDetailedMeta = !!(
    wf.target_audience ||
    wf.problem_solved ||
    wf.flow_steps ||
    wf.customization_guide
  );

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Membres', item: `${SITE_URL}/membres` },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Workflows n8n',
        item: `${SITE_URL}/membres/workflows`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: wf.title,
        item: `${SITE_URL}/membres/workflows/${wf.slug}`,
      },
    ],
  };

  const stepRegex = /\s+Étape\s*\d+\s*:\s*/i;
  const flowStepParts = (wf.flow_steps || '').trim().split(stepRegex);
  const howToSteps =
    flowStepParts.length > 1
      ? flowStepParts.slice(1).map((text, i) => ({
          '@type': 'HowToStep' as const,
          position: i + 1,
          name: `Étape ${i + 1}`,
          text: text.trim().replace(/\s+/g, ' ').slice(0, 500),
        }))
      : [];

  const howToSchema =
    howToSteps.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: wf.title,
          description:
            truncate(stripTagsSuffix(wf.summary || ''), 500) ||
            `Workflow n8n : ${wf.title}. Automatisation et intégrations.`,
          step: howToSteps,
          ...(wf.tags?.length && { keywords: wf.tags.slice(0, 8).join(', ') }),
        }
      : null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: wf.title,
    description: truncate(
      stripTagsSuffix(wf.summary || '') ||
        `Workflow n8n : ${wf.title}.`,
      160
    ),
    author: { '@type': 'Organization', name: 'Uclic', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Uclic', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/membres/workflows/${wf.slug}`,
    datePublished: wf.created_at,
    dateModified: wf.created_at,
    ...(wf.tags?.length && { keywords: wf.tags.join(', ') }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(articleSchema) }}
      />
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(howToSchema) }}
        />
      )}
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
            <a
              href="/membres/workflows"
              className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] hover:gap-2.5 transition-all"
            >
              <ArrowLeft size={14} />
              Tous les workflows
            </a>

            <div className="mt-8 inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
              <span className="w-6 h-px bg-[color:var(--accent)] shrink-0" aria-hidden="true" />
              <span>Workflow n8n</span>
              {wf.category ? (
                <>
                  <span className="text-[color:var(--ink-muted)]/70" aria-hidden="true">·</span>
                  <span>{wf.category}</span>
                </>
              ) : null}
            </div>

            <h1 className="mt-4 text-[clamp(28px,4vw,48px)] font-display font-medium tracking-[-0.02em] leading-[1.1] max-w-[900px]">
              {wf.title}
            </h1>

            {summaryClean && (
              <p className="mt-5 text-[color:var(--ink-muted)] max-w-[780px] text-[16px] leading-relaxed">
                {summaryClean}
              </p>
            )}

            {displayTags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {displayTags.map((tag) => (
                  <a
                    key={tag}
                    href={`/membres/workflows?tag=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center px-3 py-1 text-[12px] font-mono uppercase tracking-[0.1em] text-[color:var(--ink-muted)] border border-[color:var(--border-subtle)] !rounded-none hover:text-[color:var(--accent)] hover:border-[color:var(--accent)]/60 transition-colors"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CONTENT */}
        <section className="relative py-12 lg:py-16 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--border-subtle)] to-transparent" />
          <div className="max-w-[1200px] mx-auto px-5 lg:px-10 relative grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 flex flex-col gap-12">
              {wf.target_audience && (
                <div id="target-audience">
                  <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
                    <span className="w-4 h-px bg-[color:var(--accent)]" /> Pour qui
                  </div>
                  <h2 className="mt-3 text-[clamp(22px,2.6vw,30px)] font-display font-medium tracking-[-0.01em]">
                    À qui s&apos;adresse ce workflow&nbsp;?
                  </h2>
                  <div className="mt-4">
                    <TextBlock text={wf.target_audience} />
                  </div>
                </div>
              )}

              {wf.problem_solved && (
                <div id="problem-solved">
                  <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
                    <span className="w-4 h-px bg-[color:var(--accent)]" /> Le problème
                  </div>
                  <h2 className="mt-3 text-[clamp(22px,2.6vw,30px)] font-display font-medium tracking-[-0.01em]">
                    Ce que ce workflow résout
                  </h2>
                  <div className="mt-4">
                    <TextBlock text={wf.problem_solved} />
                  </div>
                </div>
              )}

              {wf.flow_steps && (
                <div id="flow-steps">
                  <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
                    <span className="w-4 h-px bg-[color:var(--accent)]" /> Les étapes
                  </div>
                  <h2 className="mt-3 text-[clamp(22px,2.6vw,30px)] font-display font-medium tracking-[-0.01em]">
                    Comment ça fonctionne
                  </h2>
                  <div className="mt-5">
                    <TextBlock text={wf.flow_steps} />
                  </div>
                </div>
              )}

              {wf.n8n_json ? (
                <div id="n8n-graph">
                  <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
                    <span className="w-4 h-px bg-[color:var(--accent)]" /> Schéma visuel
                  </div>
                  <h2 className="mt-3 text-[clamp(22px,2.6vw,30px)] font-display font-medium tracking-[-0.01em]">
                    Visualisation du workflow n8n
                  </h2>
                  <p className="mt-3 text-[15px] text-[color:var(--ink-muted)] leading-relaxed max-w-[720px]">
                    Schéma des nœuds et connexions de ce workflow n8n, généré à partir du JSON n8n.
                  </p>
                  <div className="mt-5">
                    <WorkflowGraph
                      n8nJson={wf.n8n_json}
                      nodeDescriptions={Object.fromEntries(
                        (workflowNodes || [])
                          .filter((n) => n.description && (n.node_name || n.node_id))
                          .map((n) => [n.node_name || n.node_id, n.description as string]),
                      )}
                    />
                  </div>
                </div>
              ) : null}

              {wf.customization_guide && (
                <div id="customization-guide">
                  <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
                    <span className="w-4 h-px bg-[color:var(--accent)]" /> Guide
                  </div>
                  <h2 className="mt-3 text-[clamp(22px,2.6vw,30px)] font-display font-medium tracking-[-0.01em]">
                    Personnaliser ce workflow
                  </h2>
                  <div className="mt-5">
                    <TextBlock text={wf.customization_guide} />
                  </div>
                </div>
              )}

              {nodesWithDescription.length > 0 && (
                <div id="n8n-nodes">
                  <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
                    <span className="w-4 h-px bg-[color:var(--accent)]" /> Les nœuds
                  </div>
                  <h2 className="mt-3 text-[clamp(22px,2.6vw,30px)] font-display font-medium tracking-[-0.01em]">
                    Détail des nœuds n8n
                  </h2>
                  <ul className="mt-5 flex flex-col gap-0 border border-[color:var(--border-subtle)] !rounded-none bg-[color:var(--card-elev-1)] divide-y divide-[color:var(--border-subtle)]">
                    {nodesWithDescription.map((n, i) => (
                      <li key={n.node_id || i} className="px-5 py-4">
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex shrink-0 items-center justify-center w-7 h-7 !rounded-none bg-[color:var(--accent)]/15 text-[color:var(--accent)] text-[11px] font-mono">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <div className="min-w-0">
                            <div className="text-[14px] font-display font-medium tracking-[-0.01em] text-[color:var(--ink)]">
                              {n.node_name || `Nœud ${i + 1}`}
                            </div>
                            <p className="mt-1 text-[14px] text-[color:var(--ink-muted)] leading-relaxed whitespace-pre-wrap">
                              {n.description}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!hasDetailedMeta && !nodesWithDescription.length && summaryClean && (
                <div>
                  <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)]">
                    <span className="w-4 h-px bg-[color:var(--accent)]" /> À propos
                  </div>
                  <h2 className="mt-3 text-[clamp(22px,2.6vw,30px)] font-display font-medium tracking-[-0.01em]">
                    Présentation du workflow
                  </h2>
                  <div className="mt-4">
                    <TextBlock text={summaryClean} />
                  </div>
                </div>
              )}
            </div>

            {/* Aside */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-28 flex flex-col gap-6">
                <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-6">
                  <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)]">
                    Workflow n8n
                  </div>
                  <div className="mt-2 text-[18px] font-display font-medium tracking-[-0.01em] leading-snug">
                    {wf.title}
                  </div>
                  {wf.category && (
                    <>
                      <div className="mt-5 text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)]">
                        Catégorie
                      </div>
                      <div className="mt-2 text-[13.5px] text-[color:var(--ink-muted)] leading-relaxed">
                        {wf.category}
                      </div>
                    </>
                  )}
                  {wf.tags && wf.tags.length > 0 && (
                    <>
                      <div className="mt-5 text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)]">
                        Tags
                      </div>
                      <div className="mt-2 text-[13.5px] text-[color:var(--ink-muted)] leading-relaxed">
                        {wf.tags.slice(0, 8).join(' · ')}
                      </div>
                    </>
                  )}
                  <a
                    href="/audit"
                    className="mt-6 inline-flex items-center gap-1.5 text-[13px] text-[color:var(--accent)] hover:gap-2.5 transition-all"
                  >
                    Demander un audit gratuit
                    <ArrowRight size={14} />
                  </a>
                </div>

                {related.length > 0 && (
                  <div className="!rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6">
                    <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)]">
                      Workflows proches
                    </div>
                    <ul className="mt-4 flex flex-col gap-4">
                      {related.map((rw) => (
                        <li key={rw.id}>
                          <a
                            href={`/membres/workflows/${rw.slug}`}
                            className="group block"
                          >
                            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[color:var(--ink-muted)]">
                              {rw.category || 'Général'}
                            </div>
                            <div className="mt-1 text-[14.5px] font-display font-medium tracking-[-0.01em] leading-snug text-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors">
                              {rw.title}
                            </div>
                            {rw.tags && rw.tags.length > 0 && (
                              <div className="mt-1 text-[12px] text-[color:var(--ink-muted)] line-clamp-1">
                                {rw.tags.slice(0, 3).join(' · ')}
                              </div>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="!rounded-none border border-[color:var(--accent)]/50 bg-[color:var(--accent)]/10 p-6">
                  <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-[color:var(--accent)]">
                    Sur mesure
                  </div>
                  <div className="mt-2 text-[16px] font-display font-medium tracking-[-0.01em] leading-snug text-[color:var(--ink)]">
                    Un workflow n8n custom&nbsp;?
                  </div>
                  <p className="mt-2 text-[13.5px] text-[color:var(--ink-muted)] leading-relaxed">
                    On conçoit pour vous des automatisations n8n adaptées à vos process.
                  </p>
                  <a
                    href="/audit"
                    className="mt-4 inline-flex items-center gap-1.5 text-[13px] text-[color:var(--accent)] hover:gap-2.5 transition-all"
                  >
                    Demander un audit
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
