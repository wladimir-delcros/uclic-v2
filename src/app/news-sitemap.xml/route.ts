import { NextResponse } from 'next/server';
import { getLatestPosts } from '@/lib/blog';
import { getLatestLevees } from '@/lib/levee';
import { escapeXml } from '@/lib/rss';

// Google News sitemap: only URLs published within the last 48 hours.
// https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap

export const revalidate = 1800;

const SITE_URL = 'https://uclic.fr';

export async function GET() {
  try {
    const [{ posts }, levees] = await Promise.all([
      getLatestPosts(100, 1),
      getLatestLevees(100),
    ]);

    const twoDaysAgo = new Date();
    twoDaysAgo.setHours(twoDaysAgo.getHours() - 48);

    const recentPosts = posts.filter((p) => p.date && new Date(p.date) > twoDaysAgo);
    const recentLevees = levees.filter((l) => l.date && new Date(l.date) > twoDaysAgo);

    const urls = [
      ...recentPosts.map((post) => ({
        loc: `${SITE_URL}/blog/${post.slug}`,
        date: new Date(post.date).toISOString(),
        title: escapeXml(post.title ?? ''),
      })),
      ...recentLevees.map((levee) => ({
        loc: `${SITE_URL}/levee-de-fonds/${levee.slug}`,
        date: new Date(levee.date).toISOString(),
        title: escapeXml(levee.title ?? ''),
      })),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <news:news>
      <news:publication>
        <news:name>Uclic</news:name>
        <news:language>fr</news:language>
      </news:publication>
      <news:publication_date>${u.date}</news:publication_date>
      <news:title>${u.title}</news:title>
    </news:news>
  </url>`,
  )
  .join('\n')}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('News sitemap generation error:', error);
    return new NextResponse('Error', { status: 500 });
  }
}
