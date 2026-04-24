import type { NextConfig } from 'next';

// HSTS + upgrade-insecure-requests ne doivent JAMAIS tourner en dev (HTTP) :
// ils forcent https:// alors que le dev server n'a pas de TLS → "blocked origin".
const isProd = process.env.NODE_ENV === 'production';

/**
 * Security headers (loose-but-defended baseline — aucun impact UI).
 * CSP est volontairement permissif pour les tiers légitimes :
 * - *.supabase.co (images stockées / CMS)
 * - media.licdn.com / *.linkedin.com (embeds LinkedIn)
 * - calendly.com (si CTA booking)
 * - fonts.googleapis.com / fonts.gstatic.com (next/font Google)
 * - static.uclic.fr (avatars LinkedIn reviews)
 */
const ContentSecurityPolicy = [
  "default-src 'self'",
  // 'unsafe-inline' pour JSON-LD + theme script next-themes + Next.js inline bootstrap
  // 'unsafe-eval' requis par Next.js dev + framer-motion / GSAP runtime
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com https://platform.linkedin.com",
  // Tailwind + next/font injectent des styles inline
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.calendly.com",
  "img-src 'self' data: blob: https://*.supabase.co https://media.licdn.com https://*.linkedin.com https://uclic.fr https://*.uclic.fr",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://*.supabase.co https://vitals.vercel-insights.com https://*.uclic.fr",
  "media-src 'self' blob: https://*.supabase.co",
  "frame-src 'self' https://calendly.com https://*.calendly.com https://www.linkedin.com https://platform.linkedin.com https://*.youtube.com https://www.google.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  // upgrade-insecure-requests uniquement en prod (casse le dev HTTP)
  ...(isProd ? ["upgrade-insecure-requests"] : []),
].join('; ');

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy,
  },
  // HSTS uniquement en prod (sinon browser force https:// sur dev HTTP pendant 2 ans)
  ...(isProd
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ]
    : []),
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ['161.97.109.93', '*.uclic.fr'],
  poweredByHeader: false,
  compress: true,
  turbopack: {
    resolveAlias: {
      '@': './src',
      '@public': './public',
    },
  },
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@radix-ui/react-accordion',
      '@radix-ui/react-slot',
    ],
  },
  images: {
    qualities: [25, 50, 60, 75, 85, 100],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mfpaumktscdkyqkbtgwc.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      },
      {
        protocol: 'https',
        hostname: 'static.uclic.fr',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      // Cache long pour assets immuables
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/hero/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/avatars/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/team/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/partners/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // robots.txt, sitemap, llms.txt — court TTL pour màj rapides
      {
        source: '/robots.txt',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' },
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' },
          { key: 'Content-Type', value: 'application/xml; charset=utf-8' },
        ],
      },
      {
        source: '/llms.txt',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' },
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Normalisation des slashes et legacy paths
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      // Legacy /services/* — les pages V1 etaient des placeholders vides.
      // On redirige vers les vraies pages categorie expertise V2.
      {
        source: '/services/seo',
        destination: '/expertise/agence-seo',
        permanent: true,
      },
      {
        source: '/services/sea',
        destination: '/expertise/agence-sma',
        permanent: true,
      },
      {
        source: '/services/crm',
        destination: '/expertise/crm-gestion-de-la-relation-client',
        permanent: true,
      },
      {
        source: '/services/data',
        destination: '/expertise/agence-data-analytics',
        permanent: true,
      },
      {
        source: '/services/automation',
        destination: '/expertise/agence-intelligence-artificielle',
        permanent: true,
      },
      // Legacy routes V1 renommées en FR en V2
      {
        source: '/about',
        destination: '/a-propos',
        permanent: true,
      },
      {
        source: '/reset-password',
        destination: '/auth/reset-password',
        permanent: true,
      },
      // Blog — variantes EN V1 vers routes FR V2
      {
        source: '/blog/author/:slug*',
        destination: '/blog/auteur/:slug*',
        permanent: true,
      },
      {
        source: '/blog/authors',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/category/:slug/page/:page*',
        destination: '/blog/categorie/:slug/page/:page*',
        permanent: true,
      },
      {
        source: '/blog/category/:slug*',
        destination: '/blog/categorie/:slug*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
