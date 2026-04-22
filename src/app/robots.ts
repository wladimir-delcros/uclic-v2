import type { MetadataRoute } from 'next';

const SITE_URL = 'https://uclic.fr';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Default — tous les crawlers autorisés y compris AI (GPTBot, ClaudeBot,
        // PerplexityBot, Google-Extended, etc.). Uclic capitalise sur AI search.
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/login',
          '/signup',
          '/*?*utm_',
          '/*?*fbclid',
          '/*?*gclid',
        ],
      },
      // Googlebot (reference rule for explicit allow of JS/CSS assets)
      {
        userAgent: 'Googlebot',
        allow: ['/', '/_next/static/', '/_next/image'],
        disallow: ['/api/', '/admin/'],
      },
      // AI crawlers — explicitement autorisés (content à valeur pour LLMs)
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'Meta-ExternalAgent', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
