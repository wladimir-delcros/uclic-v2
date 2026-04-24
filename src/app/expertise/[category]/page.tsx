import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';
import {
  getExpertiseCategories,
  getExpertiseCategoryBySlug,
  getExpertisesByCategory,
} from '@/lib/expertise';
import { getCityPagesForCategory } from '@/lib/programmatic-pages';
import CityLinksGrid from '@/components/expertise/CityLinksGrid';

const SITE_URL = 'https://uclic.fr';

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const cats = await getExpertiseCategories();
  return cats.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const data = await getExpertiseCategoryBySlug(category);
  if (!data) {
    return { title: 'Expertise introuvable | Uclic', robots: { index: false, follow: false } };
  }
  const fields = data.expertiseFields;
  const title = fields.metaTitle || `${data.name} | Expertise Uclic`;
  const description =
    fields.metaDescription || data.description || `Expertise ${data.name} : stratégies et accompagnement par Uclic.`;
  const canonical = `/expertise/${data.slug}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}${canonical}`,
      title,
      description,
      siteName: 'Uclic',
      locale: 'fr_FR',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: data.name }],
    },
    twitter: { card: 'summary_large_image', title, description, site: '@uclic_fr' },
  };
}

export default async function ExpertiseCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const data = await getExpertiseCategoryBySlug(category);
  if (!data) notFound();
  const fields = data.expertiseFields;
  const [posts, cities] = await Promise.all([
    getExpertisesByCategory(data.slug),
    getCityPagesForCategory(data.slug),
  ]);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Expertises', item: `${SITE_URL}/expertise` },
      { '@type': 'ListItem', position: 3, name: data.name, item: `${SITE_URL}/expertise/${data.slug}` },
    ],
  };

  const faqItems = [
    { q: fields.faqTitle1, a: fields.faqDesc1 },
    { q: fields.faqTitle2, a: fields.faqDesc2 },
    { q: fields.faqTitle3, a: fields.faqDesc3 },
    { q: fields.faqTitle4, a: fields.faqDesc4 },
    { q: fields.faqTitle5, a: fields.faqDesc5 },
    { q: fields.faqTitle6, a: fields.faqDesc6 },
  ].filter((x) => x.q && x.a);

  const faqSchema = faqItems.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  const processItems = [
    { t: fields.processTitre1, d: fields.descriptionTitre1 },
    { t: fields.processTitre2, d: fields.descriptionTitre2 },
    { t: fields.processTitre3, d: fields.descriptionTitre3 },
  ].filter((x) => x.t);

  const boxes = [
    { t: fields.titrebox1, d: fields.description1 },
    { t: fields.titrebox2, d: fields.description2 },
    { t: fields.titrebox3, d: fields.description3 },
  ].filter((x) => x.t);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(faqSchema) }}
        />
      ) : null}
      <Nav />
      <main className="relative bg-[color:var(--bg)]">
        {/* HERO */}
        <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-20 overflow-hidden">
          <SectionAmbience variant="medium" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <a
              href="/expertise"
              className="inline-flex items-center gap-2 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors mb-6"
            >
              <ArrowLeft size={14} /> Toutes les expertises
            </a>
            {fields.tag ? (
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px bg-[color:var(--accent)]" />
                {fields.tag}
              </span>
            ) : null}
            <h1 className="text-[44px] md:text-[56px] lg:text-[64px] leading-[1.05] font-medium text-[color:var(--ink)] tracking-tight max-w-[900px]">
              {fields.h1 || data.name}
            </h1>
            {fields.subtitle ? (
              <p className="mt-6 text-[17px] lg:text-[18px] leading-relaxed text-[color:var(--ink-muted)] max-w-[720px]">
                {fields.subtitle}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/audit"
                className="inline-flex items-center gap-2 px-5 h-11 rounded-md text-[13px] font-semibold text-black light:text-white hover:scale-[1.02] transition-transform"
                style={{
                  background:
                    'radial-gradient(ellipse 140% 120% at 50% -20%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 35%, rgba(255,255,255,0.08) 65%, transparent 100%), var(--accent)',
                }}
              >
                Audit offert
                <ArrowRight size={14} className="text-black light:text-white" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-5 h-11 rounded-md border border-[color:var(--border-subtle)] text-[13px] font-medium text-[color:var(--ink)] hover:border-[color:var(--accent)]/40 transition-colors"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </section>

        {/* Section "3 boxes" */}
        {(boxes.length > 0 || fields.h21) && (
          <section className="relative py-16 lg:py-20">
            <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
              {fields.h21 ? (
                <h2 className="text-[28px] md:text-[36px] lg:text-[44px] font-medium text-[color:var(--ink)] tracking-tight mb-10 max-w-[780px]">
                  {fields.h21}
                </h2>
              ) : null}
              {boxes.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {boxes.map((b, i) => (
                    <div
                      key={i}
                      className="flex flex-col p-6 lg:p-7 rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--bg)]"
                    >
                      <h3 className="text-[18px] font-semibold text-[color:var(--ink)]">{b.t}</h3>
                      {b.d ? (
                        <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--ink-muted)]">
                          {b.d}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Content 2 */}
        {(fields.h22 || fields.content2) && (
          <section className="relative py-16 lg:py-20">
            <div className="relative z-10 max-w-[900px] mx-auto px-5 lg:px-10">
              {fields.h22 ? (
                <h2 className="text-[28px] md:text-[36px] font-medium text-[color:var(--ink)] tracking-tight mb-6">
                  {fields.h22}
                </h2>
              ) : null}
              {fields.content2 ? (
                <div
                  className="prose prose-lg max-w-none
                    prose-headings:text-[color:var(--ink)] prose-headings:font-semibold
                    prose-p:text-[color:var(--ink)] prose-p:leading-relaxed
                    prose-a:text-[color:var(--accent)] prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-[color:var(--ink)]
                    prose-li:text-[color:var(--ink)]"
                  dangerouslySetInnerHTML={{ __html: fields.content2 }}
                />
              ) : null}
            </div>
          </section>
        )}

        {/* Process 3 steps */}
        {processItems.length > 0 && (
          <section className="relative py-16 lg:py-20">
            <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
              {fields.processLittleTitle ? (
                <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                  <span className="w-6 h-px bg-[color:var(--accent)]" />
                  {fields.processLittleTitle}
                </span>
              ) : null}
              {fields.processTitle ? (
                <h2 className="text-[28px] md:text-[36px] lg:text-[44px] font-medium text-[color:var(--ink)] tracking-tight mb-4 max-w-[780px]">
                  {fields.processTitle}
                </h2>
              ) : null}
              {fields.processDescription ? (
                <p className="text-[16px] leading-relaxed text-[color:var(--ink-muted)] max-w-[720px] mb-10">
                  {fields.processDescription}
                </p>
              ) : null}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {processItems.map((p, i) => (
                  <div
                    key={i}
                    className="relative flex flex-col p-6 lg:p-7 rounded-xl border border-[color:var(--border-subtle)]"
                  >
                    <span className="absolute -top-3 left-6 bg-[color:var(--bg)] px-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                      Étape {i + 1}
                    </span>
                    <h3 className="mt-2 text-[18px] font-semibold text-[color:var(--ink)]">{p.t}</h3>
                    {p.d ? (
                      <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--ink-muted)]">
                        {p.d}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Liste des expertises (posts) liées */}
        {posts.length > 0 && (
          <section className="relative py-16 lg:py-20">
            <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
              <h2 className="text-[28px] md:text-[36px] font-medium text-[color:var(--ink)] tracking-tight mb-10">
                Dernières expertises {data.name.toLowerCase()}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {posts.slice(0, 12).map((p) => (
                  <a
                    key={p.slug}
                    href={p.uri || `/expertise/${data.slug}/${p.slug}`}
                    className="group flex flex-col p-6 rounded-xl border border-[color:var(--border-subtle)] hover:border-[color:var(--accent)]/40 transition-colors"
                  >
                    <h3 className="text-[18px] font-semibold text-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                    <span className="mt-auto pt-4 inline-flex items-center gap-1 text-[13px] font-medium text-[color:var(--accent)]">
                      Lire <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqItems.length > 0 && (
          <section className="relative py-16 lg:py-20">
            <div className="relative z-10 max-w-[900px] mx-auto px-5 lg:px-10">
              {fields.faqSubtitle ? (
                <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                  <span className="w-6 h-px bg-[color:var(--accent)]" />
                  {fields.faqSubtitle}
                </span>
              ) : null}
              <h2 className="text-[28px] md:text-[36px] font-medium text-[color:var(--ink)] tracking-tight mb-10">
                Questions fréquentes
              </h2>
              <div className="space-y-4">
                {faqItems.map((f, i) => (
                  <details
                    key={i}
                    className="group rounded-xl border border-[color:var(--border-subtle)] overflow-hidden"
                  >
                    <summary className="cursor-pointer list-none p-5 flex items-center justify-between text-[15px] font-medium text-[color:var(--ink)] hover:bg-[color:var(--border-subtle)]/10 transition-colors">
                      <span>{f.q}</span>
                      <span className="text-[color:var(--accent)] group-open:rotate-45 transition-transform text-[20px] leading-none ml-4">
                        +
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-[14px] leading-relaxed text-[color:var(--ink-muted)]">
                      {f.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        <CityLinksGrid cities={cities} label={data.name} />

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
