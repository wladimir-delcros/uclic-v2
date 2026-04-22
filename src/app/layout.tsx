import { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import { Inter, Instrument_Sans, Instrument_Serif } from 'next/font/google';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { LenisProvider } from '@/components/shared/LenisProvider';
import { jsonLdString, organizationSchema, websiteSchema } from '@/lib/schema';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const instrumentSans = Instrument_Sans({ subsets: ['latin'], variable: '--font-instrument', display: 'swap' });
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
  other: {
    'format-detection': 'telephone=no',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${inter.variable} ${instrumentSans.variable} ${instrumentSerif.variable}`}>
      <head>
        {/* Preconnect to external image hosts used in the hero/proof sections */}
        <link rel="preconnect" href="https://randomuser.me" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://randomuser.me" />
        <link rel="preconnect" href="https://mfpaumktscdkyqkbtgwc.supabase.co" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://mfpaumktscdkyqkbtgwc.supabase.co" />
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
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <LenisProvider>{children}</LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
