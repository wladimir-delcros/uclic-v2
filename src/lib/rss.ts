import type { BlogPost } from './blog';

/**
 * Format a date to RFC 822 (RSS standard): "Mon, 01 Jan 2024 12:00:00 +0000"
 */
export function formatDateToRFC822(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) {return formatDateToRFC822(new Date());}

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = days[d.getUTCDay()];
  const dateNum = d.getUTCDate().toString().padStart(2, '0');
  const month = months[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  const hh = d.getUTCHours().toString().padStart(2, '0');
  const mm = d.getUTCMinutes().toString().padStart(2, '0');
  const ss = d.getUTCSeconds().toString().padStart(2, '0');
  return `${day}, ${dateNum} ${month} ${year} ${hh}:${mm}:${ss} +0000`;
}

/** Strip HTML tags, decode common entities, trim. */
export function stripHtml(html: string): string {
  if (!html) {return '';}
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/** Escape XML entities. */
export function escapeXml(text: string): string {
  if (!text) {return '';}
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Clean HTML body for inclusion in RSS description (strip + escape). */
export function cleanHtmlForRSS(html: string): string {
  return escapeXml(stripHtml(html));
}

export interface RSSFeedOptions {
  title: string;
  description: string;
  link: string;
  language?: string;
  generator?: string;
  siteUrl?: string;
}

/**
 * Generate RSS 2.0 XML feed from blog posts (V2 BlogPost type).
 */
export function generateRSSFeed(posts: BlogPost[], options: RSSFeedOptions): string {
  const {
    title,
    description,
    link,
    language = 'fr-FR',
    generator = 'Uclic Next.js',
    siteUrl = 'https://uclic.fr',
  } = options;

  const lastBuildDate = posts.length > 0 ? formatDateToRFC822(posts[0].date) : formatDateToRFC822(new Date());

  const items = posts
    .map((post) => {
      const postTitle = escapeXml(stripHtml(post.title || ''));
      const postExcerpt = cleanHtmlForRSS(post.excerpt || '');
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const postDate = formatDateToRFC822(post.date);
      const authorName = post.author || 'Uclic';
      const categoryName = post.category || 'Blog';
      const featured = post.featured_image_url;

      let itemXml = `    <item>
      <title>${postTitle}</title>
      <description>${postExcerpt}</description>
      <link>${escapeXml(postUrl)}</link>
      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
      <pubDate>${postDate}</pubDate>
      <author>hello@uclic.fr (${escapeXml(authorName)})</author>
      <category>${escapeXml(categoryName)}</category>`;

      if (featured) {
        const ext = featured.split('.').pop()?.toLowerCase() ?? 'jpeg';
        const mime =
          ({
            jpg: 'image/jpeg',
            jpeg: 'image/jpeg',
            png: 'image/png',
            gif: 'image/gif',
            webp: 'image/webp',
            svg: 'image/svg+xml',
          } as Record<string, string>)[ext] ?? 'image/jpeg';
        itemXml += `\n      <enclosure url="${escapeXml(featured)}" type="${mime}" />`;
      }

      itemXml += `\n    </item>`;
      return itemXml;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <description>${escapeXml(description)}</description>
    <link>${escapeXml(link)}</link>
    <atom:link href="${escapeXml(siteUrl)}/rss" rel="self" type="application/rss+xml" />
    <language>${language}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <generator>${escapeXml(generator)}</generator>
${items}
  </channel>
</rss>`;
}
