import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import { jsonLdString } from '@/lib/schema';
import {
  getAgencePageByPath,
  getTopAgencePaths,
  getOtherCityServices,
} from '@/lib/programmatic-pages';

const SITE_URL = 'https://uclic.fr';

export const revalidate = 3600;
export const dynamicParams = true;

// Cap at 500 pour rester compatible avec le budget build-time.
// Les pages hors-cap seront rendues a la demande (dynamicParams = true).
const STATIC_PARAMS_CAP = 500;

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const paths = await getTopAgencePaths(STATIC_PARAMS_CAP);
  return paths
    .map((p) => {
      // p = "/agence/xxx-yyy" -> slug = ["xxx-yyy"]
      const trimmed = p.startsWith('/agence/') ? p.slice('/agence/'.length) : p;
      if (!trimmed) {return null;}
      return { slug: trimmed.split('/').filter(Boolean) };
    })
    .filter((x): x is { slug: string[] } => x !== null && x.slug.length > 0);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!slug || slug.length === 0) {
    return { title: 'Page introuvable', robots: { index: false, follow: false } };
  }
  const pathSlug = `/agence/${slug.join('/')}`;
  const result = await getAgencePageByPath(pathSlug);
  if (!result) {
    return { title: 'Page introuvable', robots: { index: false, follow: false } };
  }

  const { fields, cityName, serviceName } = result;
  const canonical = pathSlug;

  const finalTitle =
    fields.metaTitle?.trim() ||
    (cityName ? `Agence ${serviceName} ${cityName}` : `Agence ${serviceName}`);

  let description = fields.metaDescription || '';
  if (cityName && description && !description.toLowerCase().includes(cityName.toLowerCase())) {
    const baseDescription = description.replace(/^Agence\s+[^:]+:\s*/i, '').trim();
    description = baseDescription
      ? `Agence ${serviceName} a ${cityName} : ${baseDescription}`
      : `Agence ${serviceName} a ${cityName}. ${fields.subtitle || ''}`.trim();
  }
  if (!description) {
    description =
      fields.subtitle ||
      (cityName
        ? `Agence ${serviceName} a ${cityName}. Pilotage senior, experts canaux, agents IA en production.`
        : `Agence ${serviceName}. Pilotage senior, experts canaux, agents IA en production.`);
  }
  if (description.length > 160) {description = description.substring(0, 157) + '...';}

  return {
    title: finalTitle,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}${canonical}`,
      title: finalTitle,
      description,
      siteName: 'Uclic',
      locale: 'fr_FR',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: finalTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description,
      site: '@uclic_fr',
    },
  };
}

export default async function AgenceProgrammaticPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug || slug.length === 0) {notFound();}

  const pathSlug = `/agence/${slug.join('/')}`;
  const result = await getAgencePageByPath(pathSlug);
  if (!result) {notFound();}

  const { fields: f, cityName, citySlug, serviceName, pageType } = result;

  const finalH1 =
    f.h1 ||
    (cityName ? `Agence ${serviceName} a ${cityName}` : `Agence ${serviceName}`);

  const canonicalUrl = `${SITE_URL}${pathSlug}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Agence', item: `${SITE_URL}/agence` },
      { '@type': 'ListItem', position: 3, name: finalH1, item: canonicalUrl },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: finalH1,
    description: f.metaDescription || f.subtitle || '',
    provider: {
      '@type': 'Organization',
      name: 'Uclic',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    serviceType: pageType === 'expertise' ? 'Expertise' : 'Categorie expertise',
    areaServed: cityName
      ? { '@type': 'City', name: cityName }
      : { '@type': 'Country', name: 'France' },
    availableLanguage: 'fr',
    url: canonicalUrl,
  };

  const faqItems = [
    { q: f.faqTitle1, a: f.faqDesc1 },
    { q: f.faqTitle2, a: f.faqDesc2 },
    { q: f.faqTitle3, a: f.faqDesc3 },
    { q: f.faqTitle4, a: f.faqDesc4 },
    { q: f.faqTitle5, a: f.faqDesc5 },
    { q: f.faqTitle6, a: f.faqDesc6 },
  ].filter((x) => x.q && x.a);

  const faqSchema =
    faqItems.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((fa) => ({
            '@type': 'Question',
            name: fa.q,
            acceptedAnswer: { '@type': 'Answer', text: fa.a },
          })),
        }
      : null;

  const boxes = [
    { t: f.titrebox1, d: f.description1 },
    { t: f.titrebox2, d: f.description2 },
    { t: f.titrebox3, d: f.description3 },
  ].filter((x) => x.t);

  const processItems = [
    { t: f.processTitre1, d: f.descriptionTitre1 },
    { t: f.processTitre2, d: f.descriptionTitre2 },
    { t: f.processTitre3, d: f.descriptionTitre3 },
  ].filter((x) => x.t);

  const otherServices = await getOtherCityServices(citySlug, pathSlug, 9);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(serviceSchema) }}
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
              <ArrowLeft size={14} /> Retour aux expertises
            </a>
            {f.tag ? (
              <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
                <span>{f.tag}</span>
              </div>
            ) : null}
            <h1 className="text-[44px] md:text-[56px] lg:text-[64px] leading-[1.05] font-medium text-[color:var(--ink)] tracking-tight max-w-[900px]">
              {finalH1}
            </h1>
            {f.subtitle ? (
              <p className="mt-6 text-[17px] lg:text-[18px] leading-relaxed text-[color:var(--ink-muted)] max-w-[720px]">
                {f.subtitle}
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

        {/* 3 boxes */}
        {(boxes.length > 0 || f.h21) && (
          <section className="relative py-16 lg:py-20">
            <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
              {f.h21 ? (
                <h2 className="text-[28px] md:text-[36px] lg:text-[44px] font-medium text-[color:var(--ink)] tracking-tight mb-10 max-w-[780px]">
                  {f.h21}
                </h2>
              ) : null}
              {boxes.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {boxes.map((b, i) => (
                    <div
                      key={i}
                      className="flex flex-col !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 lg:p-8"
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
        {(f.h22 || f.content2) && (
          <section className="relative py-16 lg:py-20">
            <div className="relative z-10 max-w-[900px] mx-auto px-5 lg:px-10">
              {f.h22 ? (
                <h2 className="text-[28px] md:text-[36px] font-medium text-[color:var(--ink)] tracking-tight mb-6">
                  {f.h22}
                </h2>
              ) : null}
              {f.content2 ? (
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: f.content2 }}
                />
              ) : null}
            </div>
          </section>
        )}

        {/* Process 3 etapes */}
        {processItems.length > 0 && (
          <section className="relative py-16 lg:py-20">
            <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
              {f.processLittleTitle ? (
                <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                  <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
                  <span>{f.processLittleTitle}</span>
                </div>
              ) : null}
              {f.processTitle ? (
                <h2 className="text-[28px] md:text-[36px] lg:text-[44px] font-medium text-[color:var(--ink)] tracking-tight mb-4 max-w-[780px]">
                  {f.processTitle}
                </h2>
              ) : null}
              {f.processDescription ? (
                <p className="text-[16px] leading-relaxed text-[color:var(--ink-muted)] max-w-[720px] mb-10">
                  {f.processDescription}
                </p>
              ) : null}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {processItems.map((p, i) => (
                  <div
                    key={i}
                    className="relative flex flex-col !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 lg:p-8"
                  >
                    <span className="absolute -top-3 left-6 bg-[color:var(--bg)] px-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--accent)]">
                      Etape {i + 1}
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

        {/* Autres services dans la meme ville */}
        {otherServices.length > 0 && (
          <section className="relative py-16 lg:py-20">
            <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
              <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
                <span>Autres expertises</span>
              </div>
              <h2 className="text-[28px] md:text-[36px] font-medium text-[color:var(--ink)] tracking-tight mb-10">
                {cityName ? `Nos autres services a ${cityName}` : 'Nos autres expertises'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {otherServices.map((s) => (
                  <a
                    key={s.path_slug}
                    href={s.path_slug}
                    className="group flex flex-col !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)] light:bg-white p-6 lg:p-8 hover:border-[color:var(--accent)]/40 transition-colors"
                  >
                    <h3 className="text-[18px] font-semibold text-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors line-clamp-2">
                      {s.title}
                    </h3>
                    {s.subtitle ? (
                      <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--ink-muted)] line-clamp-3">
                        {s.subtitle}
                      </p>
                    ) : null}
                    <span className="mt-auto pt-4 inline-flex items-center gap-1 text-[13px] font-medium text-[color:var(--accent)]">
                      Decouvrir <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
              {f.faqSubtitle ? (
                <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                  <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
                  <span>{f.faqSubtitle}</span>
                </div>
              ) : null}
              <h2 className="text-[28px] md:text-[36px] font-medium text-[color:var(--ink)] tracking-tight mb-10">
                Questions frequentes
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
        )}

        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
