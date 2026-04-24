/**
 * Schema.org JSON-LD helpers for Uclic.
 *
 * All helpers return plain objects that must be serialized and injected via
 * `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }} />`.
 *
 * Design choices:
 * - @context uses https (not http)
 * - All URLs are absolute
 * - Dates are ISO 8601
 * - We deliberately do NOT emit FAQPage: FAQ rich results were restricted to
 *   government + healthcare authorities in August 2023, so they are not shown
 *   for marketing agencies. Emitting it risks spam/penalty signals with no
 *   upside.
 * - We deliberately do NOT emit HowTo (rich results removed Sept 2023).
 */

export const SITE_URL = 'https://uclic.fr';
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SERVICE_ID = `${SITE_URL}/#service`;
export const HOMEPAGE_ID = `${SITE_URL}/#webpage`;
export const PERSON_WLADIMIR_ID = `${SITE_URL}/#person-wladimir`;
export const PERSON_ALEXIS_ID = `${SITE_URL}/#person-alexis`;

/** Site-wide Organization / ProfessionalService node. */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: 'Uclic',
    legalName: 'Uclic',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.svg`,
      contentUrl: `${SITE_URL}/logo.svg`,
    },
    image: `${SITE_URL}/logo.svg`,
    description:
      'Agence Growth Marketing & IA. Pilotage senior, experts canaux, agents IA en production.',
    slogan: 'Trois piliers. Une seule équipe. Zéro silo.',
    priceRange: '€€€',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'FR',
      addressLocality: 'Paris',
      addressRegion: 'Île-de-France',
    },
    areaServed: [
      { '@type': 'Country', name: 'France' },
      { '@type': 'Place', name: 'Europe' },
    ],
    knowsAbout: [
      'Growth Marketing',
      'SEO',
      'Google Ads',
      'Meta Ads',
      'LinkedIn Ads',
      'Outbound Sales',
      'Cold Email',
      'LinkedIn Prospection',
      'IA générative',
      'Agents IA',
      'Automatisation n8n',
      'Next.js',
      'B2B SaaS',
    ],
    founder: [
      {
        '@type': 'Person',
        '@id': PERSON_WLADIMIR_ID,
        name: 'Wladimir Delcros',
        jobTitle: 'CEO & Growth Strategist',
        worksFor: { '@id': ORG_ID },
        description:
          'Expert Growth Marketing, 16 ans d\'expérience. Ex-Head of Growth Codingame & Muzzo.',
        sameAs: ['https://www.linkedin.com/in/wladimirdelcros/'],
      },
      {
        '@type': 'Person',
        '@id': PERSON_ALEXIS_ID,
        name: 'Alexis Christine-Amara',
        jobTitle: 'Cofondateur · Business Development',
        worksFor: { '@id': ORG_ID },
        description:
          'Expert Business Development. Ex-Head of Sales CodinGame.',
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: '+33-6-17-12-54-28',
        email: 'hello@uclic.fr',
        areaServed: ['FR', 'EU'],
        availableLanguage: ['French', 'English'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'hello@uclic.fr',
        availableLanguage: ['French', 'English'],
      },
    ],
    email: 'hello@uclic.fr',
    telephone: '+33-6-17-12-54-28',
    sameAs: [
      'https://www.linkedin.com/company/uclic/',
      'https://www.linkedin.com/in/wladimirdelcros/',
      'https://fr.sortlist.com/agency/uclic',
      'https://fr.trustpilot.com/review/uclic.fr',
    ],
    // aggregateRating est volontairement déplacé sur le node Service (eligible rich result).
    // Les review[] individuels ont été retirés : leurs author étaient des plateformes
    // (Google/Sortlist/Trustpilot) au lieu de Person — signal spam review aggregation.
    // Les plateformes restent sourcées via `sameAs` ci-dessus.
  } as const;
}

/**
 * LocalBusiness node — hyperlocal SEO signal (Paris).
 * Uses a real `aggregateRating` with the Google reviews count so stars are
 * eligible for rich results on brand queries ("uclic avis", "uclic paris").
 *
 * Note: we keep the Service-level aggregateRating (pondérée 3 plateformes)
 * on `serviceSchema()`. The LocalBusiness one is *only* the Google subset,
 * per Google's Rich Results Guidelines (LocalBusiness rating must come
 * from a single aggregator and be verifiable on-page).
 */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: 'Uclic — Agence Growth Marketing & IA',
    url: SITE_URL,
    image: `${SITE_URL}/logo.svg`,
    logo: `${SITE_URL}/logo.svg`,
    description:
      'Agence Growth Marketing & IA à Paris. Inbound, Outbound, IA & Développement pilotés par des experts seniors.',
    telephone: '+33-6-17-12-54-28',
    email: 'hello@uclic.fr',
    priceRange: '€€€',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Paris',
      addressRegion: 'Île-de-France',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.8566,
      longitude: 2.3522,
    },
    areaServed: [
      { '@type': 'Country', name: 'France' },
      { '@type': 'Place', name: 'Europe' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    // Real Google Business Profile rating (only Google, not pondérée)
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '17',
      reviewCount: '17',
    },
    sameAs: [
      'https://www.linkedin.com/company/uclic/',
      'https://fr.sortlist.com/agency/uclic',
      'https://fr.trustpilot.com/review/uclic.fr',
    ],
  } as const;
}

/**
 * SiteNavigationElement — helps Google understand site structure and
 * sitelinks for brand SERPs (rarely triggers rich results directly but
 * strong signal for "Sitelinks Searchbox" + main nav display).
 */
export function siteNavigationSchema() {
  const items = [
    { name: 'Expertises', url: `${SITE_URL}/expertise` },
    { name: 'Cas clients', url: `${SITE_URL}/cas-clients` },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: 'Toolbox', url: `${SITE_URL}/toolbox` },
    { name: 'Outils gratuits', url: `${SITE_URL}/outils-gratuits` },
    { name: 'Levées de fonds', url: `${SITE_URL}/levee-de-fonds` },
    { name: 'Équipe', url: `${SITE_URL}/equipe` },
    { name: 'À propos', url: `${SITE_URL}/a-propos` },
    { name: 'Contact', url: `${SITE_URL}/contact` },
    { name: 'Audit offert', url: `${SITE_URL}/audit` },
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Navigation principale Uclic',
    itemListElement: items.map((item, idx) => ({
      '@type': 'SiteNavigationElement',
      position: idx + 1,
      name: item.name,
      url: item.url,
    })),
  } as const;
}

/** Site-wide WebSite node with SearchAction. */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: 'Uclic',
    description:
      'Agence Growth Marketing & IA — Inbound, Outbound, IA & Développement.',
    inLanguage: 'fr-FR',
    publisher: { '@id': ORG_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  } as const;
}

/** Homepage WebPage node. `dateModified` est remis à jour à chaque build. */
export function webPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': HOMEPAGE_ID,
    url: SITE_URL,
    name: 'Uclic — Agence Growth Marketing & IA | Résultats en 90 jours',
    description:
      'Une équipe marketing complète, sans silos, avec un vrai pilotage. Acquisition, prospection, IA & Automation — activées selon vos priorités.',
    inLanguage: 'fr-FR',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.svg`,
    },
    datePublished: '2026-04-01T00:00:00+02:00',
    dateModified: new Date().toISOString(),
  } as const;
}

// breadcrumbSchema retiré : une homepage n'a pas de breadcrumb valide (≥2 items
// requis par Google). Un seul ListItem = bloc ignoré sans bénéfice.

/** Main Service node with an OfferCatalog of the 3 pillars + pricing tiers. */
export function serviceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': SERVICE_ID,
    serviceType: 'Growth Marketing & IA',
    name: 'Accompagnement Growth Marketing & IA',
    description:
      'Équipe marketing complète sans silos : Inbound (SEO, Ads), Outbound (prospection multicanale), IA & Développement (agents IA, apps métier). Pilotage senior + experts canaux.',
    provider: { '@id': ORG_ID },
    areaServed: [
      { '@type': 'Country', name: 'France' },
      { '@type': 'Place', name: 'Europe' },
    ],
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'PME, scale-ups, ETI, grands comptes B2B',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: '0',
      highPrice: '3570',
      offerCount: '4',
      availability: 'https://schema.org/InStock',
    },
    // aggregateRating rattaché au Service (éligible rich result étoiles).
    // Calcul pondéré : Google 4,9/17 + Sortlist 4,96/6 + Trustpilot 4,3/7 = 4,76/30
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.76',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '30',
      reviewCount: '30',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Offres Uclic',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Growth Scan',
          description: 'Audit offert : diagnostic complet de votre acquisition et plan 90 jours.',
          price: '0',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}/#tarifs`,
        },
        {
          '@type': 'Offer',
          name: '1 Pilier',
          description: 'Activation d\'un pilier unique (Inbound, Outbound ou IA & Dev).',
          price: '1490',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}/#tarifs`,
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '1490',
            priceCurrency: 'EUR',
            unitText: 'MONTH',
            billingIncrement: 1,
          },
          eligibleDuration: {
            '@type': 'QuantitativeValue',
            value: 3,
            unitCode: 'MON',
          },
        },
        {
          '@type': 'Offer',
          name: 'Duo',
          description: 'Deux piliers activés simultanément avec un Growth Strategist dédié.',
          price: '2680',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}/#tarifs`,
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '2680',
            priceCurrency: 'EUR',
            unitText: 'MONTH',
            billingIncrement: 1,
          },
          eligibleDuration: {
            '@type': 'QuantitativeValue',
            value: 3,
            unitCode: 'MON',
          },
        },
        {
          '@type': 'Offer',
          name: 'Growth Machine',
          description: 'Les 3 piliers activés. Équipe marketing complète opérée par Uclic.',
          price: '3570',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}/#tarifs`,
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '3570',
            priceCurrency: 'EUR',
            unitText: 'MONTH',
            billingIncrement: 1,
          },
          eligibleDuration: {
            '@type': 'QuantitativeValue',
            value: 3,
            unitCode: 'MON',
          },
        },
      ],
    },
  } as const;
}

/** ItemList of the 3 pillars (Inbound / Outbound / IA & Dev). */
export function pillarsItemListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Les 3 piliers Uclic',
    description:
      'Trois piliers complémentaires activés par une seule équipe senior pilotée.',
    numberOfItems: 3,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Service',
          name: 'Inbound — Captez la demande',
          description:
            'SEO, Google & Meta Ads, pages de conversion et contenu à forte intention. On va chercher ceux qui vous cherchent déjà.',
          serviceType: 'Inbound Marketing',
          provider: { '@id': ORG_ID },
          areaServed: { '@type': 'Country', name: 'France' },
          category: ['SEO', 'Google Ads', 'Meta Ads', 'LinkedIn Ads', 'Contenu', 'Conversion'],
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Service',
          name: 'Outbound — Créez la demande',
          description:
            "Signaux d'achat, ciblage précis, séquences email + LinkedIn, appels à froid. On va chercher ceux qui ne vous connaissent pas encore.",
          serviceType: 'Outbound Sales',
          provider: { '@id': ORG_ID },
          areaServed: { '@type': 'Country', name: 'France' },
          category: ["Signaux d'achat", 'Ciblage', 'Cold Email', 'LinkedIn', 'Appels', 'SDR'],
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'Service',
          name: 'IA & Développement — Industrialisez sur-mesure',
          description:
            "Agents IA en production, applications métier déployées, workflows n8n, scripts sur-mesure. Ce que vos concurrents n'ont pas encore industrialisé.",
          serviceType: 'IA & Développement',
          provider: { '@id': ORG_ID },
          areaServed: { '@type': 'Country', name: 'France' },
          category: ['Agents IA', 'Apps custom', 'n8n', 'Next.js', 'Scoring', 'APIs'],
        },
      },
    ],
  } as const;
}

/**
 * Serialize a JSON-LD object safely for inlining in a <script> tag.
 * Escapes `</script` so an attacker-controlled string in the payload
 * cannot break out of the script context.
 */
export function jsonLdString(schema: unknown): string {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}
