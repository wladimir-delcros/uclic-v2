import { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import { Inter, Instrument_Serif } from 'next/font/google';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { LenisProvider } from '@/components/shared/LenisProvider';
import { PHProvider } from '@/components/providers/PostHogProvider';
import { jsonLdString, organizationSchema, websiteSchema } from '@/lib/schema';
import './globals.css';

// Lazy client tracker — pushes page_data, attaches auto-tracking + scroll depth
const DataLayerInit = dynamic(() => import('@/components/tracking/DataLayerInit'));

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
        {/* DNS prefetch for deferred third-party trackers */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://snap.licdn.com" />
        <link rel="dns-prefetch" href="https://eu.i.posthog.com" />
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
        {/* Meta Pixel noscript — ad traffic attribution when JS is disabled */}
        <noscript>
          <img
            height="1"
            width="1"
            src="https://www.facebook.com/tr?id=892479800144291&ev=PageView&noscript=1"
            alt=""
            style={{ display: 'none' }}
          />
        </noscript>
        {/* LinkedIn Insight noscript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=525902400&fmt=gif"
          />
        </noscript>

        <PHProvider>
          <DataLayerInit />
          <LenisProvider>{children}</LenisProvider>
        </PHProvider>

        {/* Google Analytics 4 + Google Ads */}
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-92TBJMXN72"
        />
        <Script
          id="gtag-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', 'G-92TBJMXN72');
              gtag('config', 'AW-637970941');
            `,
          }}
        />

        {/* Meta Pixel — loaded after interactive for ad attribution */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '892479800144291');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* LinkedIn Insight Tag */}
        <Script
          id="linkedin-insight"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              _linkedin_partner_id = "525902400";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              (function(l) {
                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[]}
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript";b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);})(window.lintrk);
            `,
          }}
        />
      </body>
    </html>
  );
}
