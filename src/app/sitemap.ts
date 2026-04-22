import type { MetadataRoute } from 'next';

const SITE_URL = 'https://uclic.fr';

/**
 * Sitemap généré dynamiquement.
 * Scope : pages publiques découvrables (exclut auth & admin).
 * Priorités : home=1.0, piliers/tarifs=0.9, contenu=0.7, légal=0.3.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const highPriority: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = [
    { path: '/', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/services', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/pricing', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/features', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/use-case', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/case-study', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/success-stories', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/process', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/why-choose-us', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/team', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/our-manifesto', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/contact-us', changeFrequency: 'monthly', priority: 0.8 },
  ];

  const mediumPriority: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = [
    { path: '/blog', changeFrequency: 'daily', priority: 0.8 },
    { path: '/testimonial', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/faq', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/glossary', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/documentation', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/tutorial', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/whitepaper', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/integration', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/changelog', changeFrequency: 'weekly', priority: 0.5 },
    { path: '/press', changeFrequency: 'monthly', priority: 0.4 },
    { path: '/career', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/customer', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/analytics', changeFrequency: 'monthly', priority: 0.4 },
    { path: '/brandkit', changeFrequency: 'monthly', priority: 0.3 },
    { path: '/support', changeFrequency: 'monthly', priority: 0.4 },
    { path: '/download', changeFrequency: 'monthly', priority: 0.4 },
    { path: '/affiliates', changeFrequency: 'monthly', priority: 0.4 },
    { path: '/referral-program', changeFrequency: 'monthly', priority: 0.4 },
    { path: '/security', changeFrequency: 'monthly', priority: 0.4 },
  ];

  const legal: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = [
    { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/terms-conditions', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/refund-policy', changeFrequency: 'yearly', priority: 0.2 },
    { path: '/affiliate-policy', changeFrequency: 'yearly', priority: 0.2 },
    { path: '/legal', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/gdpr', changeFrequency: 'yearly', priority: 0.3 },
  ];

  return [...highPriority, ...mediumPriority, ...legal].map((entry) => ({
    url: `${SITE_URL}${entry.path}`,
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
