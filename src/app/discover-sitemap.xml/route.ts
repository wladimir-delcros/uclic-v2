import { NextResponse } from 'next/server';
import { getLatestPosts } from '@/lib/blog';
import { getLatestLevees } from '@/lib/levee';
import { escapeXml } from '@/lib/rss';

// Google Discover signals: URLs with large images + fresh editorial content.
// We prioritize featured_image_url, recent posts (30 days) + recent levées.

export const revalidate = 3600;

const SITE_URL = 'https://uclic.fr';

export async function GET() {
  try {
    const [{ posts }, levees] = await Promise.all([
      getLatestPosts(50, 1),
      getLatestLevees(50),
    ]);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentPosts = posts
      .filter((p) => p.date && new Date(p.date) > thirtyDaysAgo)
      .filter((p) => !!p.featured_image_url);

    const recentLevees = levees
      .filter((l) => l.date && new Date(l.date) > thirtyDaysAgo)
      .filter((l) => !!l.featuredImage?.node?.sourceUrl);

    const items = [
      ...recentPosts.map((post) => ({
        loc: `${SITE_URL}/blog/${post.slug}`,
        lastmod: new Date(post.modified ?? post.date).toISOString(),
        image: post.featured_image_url!,
        title: escapeXml(post.title ?? ''),
      })),
      ...recentLevees.map((levee) => ({
        loc: `${SITE_URL}/levee-de-fonds/${levee.slug}`,
        lastmod: new Date(levee.modified ?? levee.date).toISOString(),
        image: levee.featuredImage!.node.sourceUrl,
        title: escapeXml(levee.title ?? ''),
      })),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${items
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <image:image>
      <image:loc>${escapeXml(u.image)}</image:loc>
      <image:title>${u.title}</image:title>
    </image:image>
  </url>`,
  )
  .join('\n')}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('Discover sitemap generation error:', error);
    return new NextResponse('Error', { status: 500 });
  }
}
