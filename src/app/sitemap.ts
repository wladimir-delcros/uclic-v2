import type { MetadataRoute } from 'next';
import { createClient as createAdminClient } from '@/lib/supabase/server-admin';
import {
  getAllBlogSlugs,
  getAllBlogCategories,
  getAllBlogAuthors,
  getLatestPosts,
} from '@/lib/blog';
import { getAllCasClientSlugs } from '@/lib/portfolio';
import { getAllLeveeSlugsForSitemap, getLeveesPaginated } from '@/lib/levee';
import { getAllToolboxSlugsForSitemap } from '@/lib/toolbox';
import { getAllTeamSlugsForSitemap } from '@/lib/team';
import { getAllWorkflowSlugsForSitemap } from '@/lib/workflows';
import { getExpertiseCategories, getAllExpertiseSlugsForSitemap } from '@/lib/expertise';
import { getAllLegalPageSlugs } from '@/lib/legal';
import { getAllMeilleureAgenceSlugs } from '@/lib/meilleure-agence';
import { getTopAgencePaths } from '@/lib/programmatic-pages';
import {
  getAllScrapingCategoriesForSitemap,
  getAllScrapingActivitiesForSitemap,
  getAllScrapingRegionsForSitemap,
  getAllScrapingDepartmentsForSitemap,
} from '@/lib/scraping';

const SITE_URL = 'https://uclic.fr';

export const revalidate = 3600;

/**
 * Sitemap dynamique.
 * Statique : pages piliers et légales.
 * Dynamique : blog, cas-clients, levées, toolbox, équipe, workflows, expertises,
 * auteurs, scraping services (depuis Supabase).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const nowIso = now.toISOString();

  const highPriority: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = [
    { path: '/', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/expertise', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/audit', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/a-propos', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/equipe', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/tarifs', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/presse', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/rejoindre', changeFrequency: 'monthly', priority: 0.7 },
  ];

  const mediumPriority: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = [
    { path: '/meilleure-agence', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/meilleure-agence-growth', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/charte-freelance', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/outils-gratuits', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/outils-gratuits/ab-test-calculator', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/outils-gratuits/mde-calculator', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/simulation', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/toolbox', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/scraping', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/levee-de-fonds', changeFrequency: 'daily', priority: 0.6 },
    { path: '/membres/workflows', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/cas-clients', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/blog', changeFrequency: 'daily', priority: 0.8 },
  ];

  const legal: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = [
    { path: '/legal', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/legal/mentions-legales', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/legal/conditions-generales-de-vente', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/legal/rgpd', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/legal/politique-de-confidentialite', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/legal/cookies', changeFrequency: 'yearly', priority: 0.3 },
  ];

  const staticEntries: MetadataRoute.Sitemap = [...highPriority, ...mediumPriority, ...legal].map((entry) => ({
    url: `${SITE_URL}${entry.path}`,
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));

  const settled = await Promise.allSettled([
    getAllBlogSlugs(),
    getAllCasClientSlugs(),
    getAllLeveeSlugsForSitemap(),
    getAllToolboxSlugsForSitemap(),
    getAllTeamSlugsForSitemap(),
    getAllWorkflowSlugsForSitemap(),
    getExpertiseCategories(),
    getScrapingServices(),
    getBlogAuthorSlugs(),
    getAllExpertiseSlugsForSitemap(),
    getAllBlogCategories(),
    getAllBlogAuthors(),
    getLatestPosts(24, 1),
    getAllLegalPageSlugs(),
    getAllMeilleureAgenceSlugs(),
    getTopAgencePaths(500),
    getAllScrapingCategoriesForSitemap(),
    getAllScrapingActivitiesForSitemap(),
    getAllScrapingRegionsForSitemap(),
    getAllScrapingDepartmentsForSitemap(),
    getLeveesPaginated(1, 30),
  ]);

  const pick = <T,>(idx: number, fallback: T): T => {
    const r = settled[idx];
    return r.status === 'fulfilled' ? (r.value as T) : fallback;
  };

  const blog = pick<Array<{ slug: string; lastmod: string }>>(0, []);
  const casClients = pick<string[]>(1, []);
  const levees = pick<Array<{ slug: string; lastmod: string }>>(2, []);
  const toolbox = pick<Array<{ slug: string; lastmod: string }>>(3, []);
  const team = pick<Array<{ slug: string; lastmod: string }>>(4, []);
  const workflows = pick<Array<{ slug: string; lastmod: string }>>(5, []);
  const categories = pick<Array<{ slug: string }>>(6, []);
  const scraping = pick<string[]>(7, []);
  const authors = pick<string[]>(8, []);
  const expertises = pick<Array<{ slug: string; lastmod: string; categorySlug?: string }>>(9, []);
  const blogCategories = pick<Array<{ slug: string; count?: number }>>(10, []);
  const blogAuthors = pick<Array<{ slug: string; count?: number }>>(11, []);
  const blogPageInfo = pick<{ totalPages: number }>(12, { totalPages: 1 });
  const legalSlugs = pick<string[]>(13, []);
  const meilleureAgenceSlugs = pick<Array<{ slug: string }>>(14, []);
  const agencePaths = pick<string[]>(15, []);
  const scrapCats = pick<Array<{ service: string; category: string; lastmod: string }>>(16, []);
  const scrapActs = pick<Array<{ service: string; category: string; activity: string; lastmod: string }>>(17, []);
  const scrapRegs = pick<Array<{ service: string; category: string; activity: string; region: string; lastmod: string }>>(18, []);
  const scrapDeps = pick<Array<{ service: string; category: string; activity: string; region: string; department: string; lastmod: string }>>(19, []);
  const leveeInfo = pick<{ totalPages: number }>(20, { totalPages: 1 });

  const blogEntries: MetadataRoute.Sitemap = blog.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.lastmod || nowIso,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const casClientsEntries: MetadataRoute.Sitemap = casClients.map((slug) => ({
    url: `${SITE_URL}/cas-clients/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const leveeEntries: MetadataRoute.Sitemap = levees.map((p) => ({
    url: `${SITE_URL}/levee-de-fonds/${p.slug}`,
    lastModified: p.lastmod || nowIso,
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  const toolboxEntries: MetadataRoute.Sitemap = toolbox.map((p) => ({
    url: `${SITE_URL}/toolbox/${p.slug}`,
    lastModified: p.lastmod || nowIso,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  const teamEntries: MetadataRoute.Sitemap = team.map((p) => ({
    url: `${SITE_URL}/equipe/${p.slug}`,
    lastModified: p.lastmod || nowIso,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  const workflowEntries: MetadataRoute.Sitemap = workflows.map((p) => ({
    url: `${SITE_URL}/membres/workflows/${p.slug}`,
    lastModified: p.lastmod || nowIso,
    changeFrequency: 'monthly',
    priority: 0.4,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE_URL}/expertise/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const scrapingEntries: MetadataRoute.Sitemap = scraping.map((slug) => ({
    url: `${SITE_URL}/scraping/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  const authorEntries: MetadataRoute.Sitemap = authors.map((slug) => ({
    url: `${SITE_URL}/auteur/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.4,
  }));

  const expertiseEntries: MetadataRoute.Sitemap = expertises
    .filter((e) => e.categorySlug)
    .map((e) => ({
      url: `${SITE_URL}/expertise/${e.categorySlug}/${e.slug}`,
      lastModified: e.lastmod || nowIso,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  const blogCategoryEntries: MetadataRoute.Sitemap = blogCategories
    .filter((c) => (c.count || 0) > 0)
    .map((c) => ({
      url: `${SITE_URL}/blog/categorie/${c.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

  const blogAuthorEntries: MetadataRoute.Sitemap = blogAuthors
    .filter((a) => (a.count || 0) > 0)
    .map((a) => ({
      url: `${SITE_URL}/blog/auteur/${a.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    }));

  const blogPageEntries: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, (blogPageInfo.totalPages || 1) - 1) },
    (_, i) => ({
      url: `${SITE_URL}/blog/page/${i + 2}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.4,
    }),
  );

  const meilleureAgenceEntries: MetadataRoute.Sitemap = meilleureAgenceSlugs.map((s) => ({
    url: `${SITE_URL}/meilleure-agence/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const agenceEntries: MetadataRoute.Sitemap = agencePaths.map((p) => ({
    url: `${SITE_URL}${p.startsWith('/') ? p : `/${p}`}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  const scrapingCategoryEntries: MetadataRoute.Sitemap = scrapCats.map((e) => ({
    url: `${SITE_URL}/scraping/${e.service}/${e.category}`,
    lastModified: e.lastmod || nowIso,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  const scrapingActivityEntries: MetadataRoute.Sitemap = scrapActs.map((e) => ({
    url: `${SITE_URL}/scraping/${e.service}/${e.category}/${e.activity}`,
    lastModified: e.lastmod || nowIso,
    changeFrequency: 'monthly',
    priority: 0.4,
  }));

  const scrapingRegionEntries: MetadataRoute.Sitemap = scrapRegs.map((e) => ({
    url: `${SITE_URL}/scraping/${e.service}/${e.category}/${e.activity}/${e.region}`,
    lastModified: e.lastmod || nowIso,
    changeFrequency: 'monthly',
    priority: 0.4,
  }));

  const scrapingDepartmentEntries: MetadataRoute.Sitemap = scrapDeps.map((e) => ({
    url: `${SITE_URL}/scraping/${e.service}/${e.category}/${e.activity}/${e.region}/${e.department}`,
    lastModified: e.lastmod || nowIso,
    changeFrequency: 'monthly',
    priority: 0.3,
  }));

  // Toolbox pagination: derive total pages from fetched slugs (PER_PAGE = 48 in route).
  const TOOLBOX_PER_PAGE = 48;
  const toolboxTotalPages = Math.ceil(toolbox.length / TOOLBOX_PER_PAGE);
  const toolboxPageEntries: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, toolboxTotalPages - 1) },
    (_, i) => ({
      url: `${SITE_URL}/toolbox/page/${i + 2}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.4,
    }),
  );

  const leveePageEntries: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, (leveeInfo.totalPages || 1) - 1) },
    (_, i) => ({
      url: `${SITE_URL}/levee-de-fonds/page/${i + 2}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.4,
    }),
  );

  const hardcodedLegal = new Set([
    'mentions-legales',
    'conditions-generales-de-vente',
    'rgpd',
    'cookies',
    'politique-de-confidentialite',
  ]);
  const legalDynamicEntries: MetadataRoute.Sitemap = legalSlugs
    .filter((s) => !hardcodedLegal.has(s))
    .map((slug) => ({
      url: `${SITE_URL}/legal/${slug}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    }));

  return [
    ...staticEntries,
    ...blogEntries,
    ...casClientsEntries,
    ...leveeEntries,
    ...toolboxEntries,
    ...teamEntries,
    ...workflowEntries,
    ...categoryEntries,
    ...expertiseEntries,
    ...scrapingEntries,
    ...authorEntries,
    ...blogCategoryEntries,
    ...blogAuthorEntries,
    ...blogPageEntries,
    ...legalDynamicEntries,
    ...meilleureAgenceEntries,
    ...agenceEntries,
    ...scrapingCategoryEntries,
    ...scrapingActivityEntries,
    ...scrapingRegionEntries,
    ...scrapingDepartmentEntries,
    ...toolboxPageEntries,
    ...leveePageEntries,
  ];
}

async function getScrapingServices(): Promise<string[]> {
  try {
    const supa = createAdminClient();
    const { data } = await supa.from('scraping_services').select('slug');
    return (data || []).map((r) => r.slug as string).filter(Boolean);
  } catch {
    return [];
  }
}

async function getBlogAuthorSlugs(): Promise<string[]> {
  try {
    const supa = createAdminClient();
    const { data } = await supa.from('authors').select('slug');
    return (data || []).map((r) => r.slug as string).filter(Boolean);
  } catch {
    return [];
  }
}
