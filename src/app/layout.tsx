import SmoothScrollProvider from '@/components/shared/SmoothScroll';
import { AppContextProvider } from '@/context/AppContext';
import { interTight } from '@/utils/font';
import { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Uclic — Growth Marketing Squad | Résultats en 48h',
  description:
    'Pas une agence classique. Une squad d\'experts growth (SEO, Ads, Outbound, Data & IA) activée en 48h. Des résultats mesurables dès le premier mois. +50 startups accompagnées.',
  openGraph: {
    title: 'Uclic — Growth Marketing Squad | Résultats en 48h',
    description:
      'Pas une agence classique. Une squad d\'experts growth activée en 48h. Des résultats mesurables dès le premier mois.',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className="dark">
      <body className={`${interTight.variable} antialiased bg-black text-[#F5F5F1]`}>
        <AppContextProvider>
          <Suspense>
            <SmoothScrollProvider>
              {children}
            </SmoothScrollProvider>
          </Suspense>
        </AppContextProvider>
      </body>
    </html>
  );
}
