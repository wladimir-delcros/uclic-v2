import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import CtaFinal from '@/components/landing/CtaFinal';
import SectionAmbience from '@/components/ui/SectionAmbience';
import BlogGrid from '@/components/blog/BlogGrid';
import Pagination from '@/components/blog/Pagination';
import { jsonLdString } from '@/lib/schema';
import type { BlogPost } from '@/lib/blog';

interface Props {
  posts: BlogPost[];
  page: number;
  totalPages: number;
  total: number;
  perPage: number;
  /** Listing base path without trailing slash, e.g. "/blog". Used by Pagination links. */
  basePath: string;
  /** Eyebrow label shown in hero. Defaults to "Blog". */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs: Array<{ name: string; item: string }>;
}

export default function BlogListingSection({
  posts,
  page,
  totalPages,
  total,
  perPage,
  basePath,
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
}: Props) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: b.item,
    })),
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
                <span>{eyebrow || (page > 1 ? `Blog · Page ${page}` : 'Blog')}</span>
              </div>
              <h1 className="text-[44px] md:text-[56px] lg:text-[64px] leading-[1.05] font-semibold text-[color:var(--ink)] tracking-tight">
                {title}
              </h1>
              {subtitle ? (
                <p className="mt-6 text-[17px] lg:text-[18px] leading-relaxed text-[color:var(--ink-muted)] max-w-[640px]">
                  {subtitle}
                </p>
              ) : null}
              <p className="mt-4 text-[13px] text-[color:var(--ink-muted)]/80">
                {page > 1
                  ? `Articles ${(page - 1) * perPage + 1}–${Math.min(page * perPage, total)} sur ${total}.`
                  : `${total} article${total > 1 ? 's' : ''} publié${total > 1 ? 's' : ''}.`}
              </p>
            </div>
          </div>
        </section>
        <section className="relative pb-24 lg:pb-32">
          <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-10">
            <BlogGrid posts={posts} />
            <Pagination currentPage={page} totalPages={totalPages} basePath={basePath} />
          </div>
        </section>
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
