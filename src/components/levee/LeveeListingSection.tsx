import { ArrowRight, TrendingUp } from 'lucide-react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import Pagination from '@/components/blog/Pagination';
import { jsonLdString } from '@/lib/schema';
import type { WordPressLevee } from '@/lib/levee';

interface Props {
  levees: WordPressLevee[];
  page: number;
  totalPages: number;
  total: number;
  perPage: number;
}

export default function LeveeListingSection({
  levees,
  page,
  totalPages,
  total,
  perPage,
}: Props) {
  const SITE_URL = 'https://uclic.fr';
  const firstIndex = (page - 1) * perPage + 1;
  const lastIndex = Math.min(page * perPage, total);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Levées de fonds',
        item: `${SITE_URL}/levee-de-fonds`,
      },
      ...(page > 1
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: `Page ${page}`,
              item: `${SITE_URL}/levee-de-fonds/${page}`,
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
                <span>{page > 1 ? `Levées · Page ${page}` : 'Veille levées'}</span>
              </div>
              <h1 className="text-[44px] md:text-[56px] lg:text-[64px] leading-[1.05] font-semibold text-[color:var(--ink)] tracking-tight">
                Les levées qui comptent.
              </h1>
              <p className="mt-6 text-[17px] lg:text-[18px] leading-relaxed text-[color:var(--ink-muted)] max-w-[640px]">
                {page > 1
                  ? `Levées ${firstIndex}–${lastIndex} sur ${total}.`
                  : `${total} levées de fonds analysées.`}
              </p>
              {page > 1 ? (
                <div className="mt-6">
                  <a
                    href="/levee-de-fonds"
                    className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] hover:text-[color:var(--accent)] transition-colors"
                  >
                    ← Retour à la veille
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </section>
        <section className="relative pb-24 lg:pb-32">
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {levees.map((l) => {
                const img = l.featuredImage?.node.sourceUrl;
                return (
                  <a
                    key={l.slug}
                    href={`/levee-de-fonds/${l.slug}`}
                    className="group relative flex flex-col !rounded-none border border-[color:var(--border-subtle)] bg-[#141211] light:bg-white overflow-hidden transition-colors hover:border-[color:var(--accent)]/60"
                  >
                    {img && (
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[color:var(--card-elev-1)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img}
                          alt={l.company || l.title}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                    )}
                    <div className="p-7 flex flex-col gap-3 flex-1">
                      <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--accent)] self-start">
                        <TrendingUp size={12} />
                        Levée de fonds
                      </div>
                      <h2 className="text-[22px] lg:text-[24px] font-display font-medium leading-tight tracking-[-0.01em]">
                        {l.company || l.title}
                      </h2>
                      <div className="flex flex-wrap gap-2 text-[12px] font-mono uppercase tracking-[0.16em] text-[color:var(--ink-muted)]">
                        {l.amountText && (
                          <span className="px-2 py-1 border border-[color:var(--border-subtle)] text-[color:var(--accent)]">
                            {l.amountText}
                          </span>
                        )}
                        {l.dateText && (
                          <span className="px-2 py-1 border border-[color:var(--border-subtle)]">
                            {l.dateText}
                          </span>
                        )}
                        {l.dealType && (
                          <span className="px-2 py-1 border border-[color:var(--border-subtle)]">
                            {l.dealType}
                          </span>
                        )}
                      </div>
                      {l.excerpt && (
                        <p className="text-[14px] text-[color:var(--ink-muted)] leading-relaxed line-clamp-3">
                          {l.excerpt.replace(/<[^>]+>/g, '').trim()}
                        </p>
                      )}
                      <span className="mt-auto pt-2 inline-flex items-center gap-1.5 text-[13px] text-[color:var(--ink-muted)] group-hover:text-[color:var(--accent)] group-hover:gap-2.5 transition-all self-start">
                        Lire l&apos;analyse
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} basePath="/levee-de-fonds" />
          </div>
        </section>
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
