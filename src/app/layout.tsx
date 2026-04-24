import { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import { Inter, Instrument_Serif } from 'next/font/google';
import Script from 'next/script';
import { LenisProvider } from '@/components/shared/LenisProvider';
import { jsonLdString, organizationSchema, websiteSchema } from '@/lib/schema';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  weight: '400',
  style: ['normal','italic'],
  display: 'swap',
});

const SITE_URL = 'https://uclic.fr';
const SITE_NAME = 'Uclic';
const DEFAULT_TITLE = 'Uclic — Agence Growth Marketing & IA | Résultats en 90 jours';
const DEFAULT_DESCRIPTION =
  'Pilotage senior + experts canaux + agents IA. Growth industrialisé pour scale-ups B2B. Acquisition, prospection, IA & Automation activées selon vos priorités.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | Uclic',
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'agence growth marketing',
    'agence growth France',
    'agents IA marketing',
    'Head of Growth externalisé',
    'growth B2B',
    'marketing automation',
    'acquisition B2B',
    'prospection IA',
    'agence IA marketing',
    'growth hacking',
    'SaaS growth',
    'Uclic',
  ],
  authors: [
    { name: 'Wladimir Delcros', url: 'https://www.linkedin.com/in/wladimirdelcros/' },
    { name: 'Alexis Christine-Amara' },
  ],
  creator: 'Wladimir Delcros',
  publisher: 'Uclic',
  category: 'Marketing',
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Uclic — Agence Growth Marketing & IA',
      },
      {
        url: '/logo.svg',
        width: 512,
        height: 512,
        alt: 'Uclic',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    creator: '@wladimirdelcros',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/logo.svg',
  },
  manifest: '/manifest.webmanifest',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // maximumScale retiré pour laisser le pinch-zoom (WCAG 1.4.4)
  viewportFit: 'cover',
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr-FR" suppressHydrationWarning className={`${inter.variable} ${instrumentSerif.variable}`}>
      <head>
        {/* Preload LCP-critical hero texture (self-hosted, WebP) */}
        <link rel="preload" href="/hero/textures/mercury.webp" as="image" type="image/webp" fetchPriority="high" />
        {/* Preconnect to Google Fonts CDN (used by next/font) */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preconnect only to hosts still used externally (Supabase CMS, uclic static) */}
        <link rel="preconnect" href="https://mfpaumktscdkyqkbtgwc.supabase.co" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://mfpaumktscdkyqkbtgwc.supabase.co" />
        <link rel="preconnect" href="https://static.uclic.fr" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://static.uclic.fr" />
        {/* Site-wide JSON-LD: Organization (with aggregateRating + founders + contactPoint) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(organizationSchema()) }}
        />
        {/* Site-wide JSON-LD: WebSite (with SearchAction) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(websiteSchema()) }}
        />
        {/* External theme init — anti-FOUC, loaded via next/script to avoid the
            React "script tag inside component" dev warning while still being
            emitted into the initial HTML <head>. */}
        <Script id="theme-init" src="/theme-init.js" strategy="beforeInteractive" />
        {/* No-JS fallback : force-reveal any element hidden by framer-motion initial props */}
        <noscript>
          <style>{`
            [style*="opacity:0"], [style*="opacity: 0"],
            [style*="transform:translateY"], [style*="transform: translateY"],
            [style*="filter:blur"], [style*="filter: blur"] {
              opacity: 1 !important;
              transform: none !important;
              filter: none !important;
            }
          `}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
