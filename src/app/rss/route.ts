import { NextResponse } from 'next/server';
import { getLatestPosts } from '@/lib/blog';
import { generateRSSFeed } from '@/lib/rss';

export const revalidate = 3600;

export async function GET() {
  try {
    const { posts } = await getLatestPosts(20, 1);

    const rssXml = generateRSSFeed(posts, {
      title: 'Blog Uclic — Growth Marketing & IA',
      description:
        "Articles et conseils d'experts en Growth Marketing, Outbound, SEO, Ads, IA & Automation. Stratégies data-driven pour scale-ups B2B.",
      link: 'https://uclic.fr/blog',
      language: 'fr-FR',
      generator: 'Uclic Next.js',
    });

    return new NextResponse(rssXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('RSS generation error:', error);
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Blog Uclic — Growth Marketing &amp; IA</title>
    <description>Articles Growth Marketing et IA</description>
    <link>https://uclic.fr/blog</link>
    <language>fr-FR</language>
  </channel>
</rss>`;
    return new NextResponse(fallback, {
      status: 500,
      headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
    });
  }
}
