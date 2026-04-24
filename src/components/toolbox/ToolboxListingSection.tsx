import { ArrowRight, Wrench } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import Pagination from '@/components/blog/Pagination';
import { jsonLdString } from '@/lib/schema';

interface Tool {
  title: string;
  slug: string;
  productHuntFields: {
    logo?: string | null;
    tagline?: string | null;
    categories?: string | null;
  };
}

interface Props {
  tools: Tool[];
  page: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
}

export default function ToolboxListingSection({
  tools,
  page,
  totalPages,
  totalCount,
  perPage,
}: Props) {
  const firstIndex = (page - 1) * perPage + 1;
  const lastIndex = Math.min(page * perPage, totalCount);
  const SITE_URL = 'https://uclic.fr';

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Toolbox', item: `${SITE_URL}/toolbox` },
      ...(page > 1
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: `Page ${page}`,
              item: `${SITE_URL}/toolbox/${page}`,
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }}
      />
      <Nav />
      <main className="relative bg-[color:var(--bg)]">
        <section className="relative pt-24 lg:pt-28 pb-16 lg:pb-20 overflow-hidden">
          <SectionAmbience variant="medium" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="max-w-[800px]">
              <div className="inline-flex items-center gap-2 text-[11px] leading-none tracking-[0.25em] uppercase text-[color:var(--accent)] mb-4">
                <span className="w-6 h-px shrink-0 bg-[color:var(--accent)]" aria-hidden="true" />
                <span>{page > 1 ? `Toolbox · Page ${page}` : 'Toolbox'}</span>
              </div>
              <h1 className="text-[44px] md:text-[56px] lg:text-[64px] leading-[1.05] font-semibold text-[color:var(--ink)] tracking-tight">
                La stack que nous utilisons.
              </h1>
              <p className="mt-6 text-[17px] lg:text-[18px] leading-relaxed text-[color:var(--ink-muted)] max-w-[640px]">
                {page > 1
                  ? `Outils ${firstIndex}–${lastIndex} sur ${totalCount}.`
                  : `${totalCount} outils sélectionnés pour scale-ups B2B.`}
              </p>
              {page > 1 ? (
                <div className="mt-6">
                  <a
                    href="/toolbox"
                    className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors"
                  >
                    ← Retour à la toolbox
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </section>
        <section className="relative pb-24 lg:pb-32">
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {tools.map((t) => {
                const logo = t.productHuntFields.logo;
                const categories = t.productHuntFields.categories
                  ?.split(',')
                  .map((c) => c.trim())
                  .filter(Boolean)
                  .slice(0, 3);
                return (
                  <a
                    key={t.slug}
                    href={`/toolbox/${t.slug}`}
                    className="group relative flex flex-col !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white p-6 transition-colors hover:border-[color:var(--accent)]/60"
                  >
                    <div className="flex items-center gap-3">
                      {logo ? (
                        <div className="relative w-12 h-12 shrink-0 overflow-hidden !rounded-none border border-[color:var(--border-subtle)] bg-[color:var(--card-elev-1)]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={logo}
                            alt={t.title}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 shrink-0 inline-flex items-center justify-center !rounded-none border border-[color:var(--border-subtle)] text-[color:var(--accent)]">
                          <Wrench size={18} />
                        </div>
                      )}
                      <h2 className="text-[18px] font-display font-medium leading-tight tracking-[-0.01em]">
                        {t.title}
                      </h2>
                    </div>
                    {t.productHuntFields.tagline && (
                      <p className="mt-4 text-[14px] text-[color:var(--ink-muted)] leading-relaxed line-clamp-3">
                        {t.productHuntFields.tagline}
                      </p>
                    )}
                    {categories && categories.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {categories.map((c) => (
                          <span
                            key={c}
                            className="text-[10px] font-mono uppercase tracking-[0.16em] px-2 py-1 border border-[color:var(--border-subtle)] text-[color:var(--ink-muted)]"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] group-hover:text-[color:var(--accent)] group-hover:gap-2.5 transition-all self-start">
                      Voir la fiche
                      <ArrowRight size={14} />
                    </span>
                  </a>
                );
              })}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} basePath="/toolbox" />
          </div>
        </section>
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
