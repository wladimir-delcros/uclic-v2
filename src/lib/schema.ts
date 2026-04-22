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
        name: 'Wladimir Delcros',
        jobTitle: 'CEO & Growth Strategist',
        description:
          'Expert Growth Marketing, 16 ans d\'expérience. Ex-Head of Growth Codingame & Muzzo.',
        sameAs: ['https://www.linkedin.com/in/wladimirdelcros/'],
      },
      {
        '@type': 'Person',
        name: 'Alexis Christine-Amara',
        jobTitle: 'Cofondateur · Business Development',
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
    // Aggregate rating: weighted mean across Google (17), Sortlist (6), Trustpilot (7)
    // (4.9 × 17 + 4.96 × 6 + 4.3 × 7) / 30 = 4.76
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.76',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '30',
      reviewCount: '30',
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: '4.9', bestRating: '5' },
        author: { '@type': 'Organization', name: 'Google Business Profile' },
        reviewBody: 'Note moyenne 4,9/5 sur 17 avis Google.',
      },
      {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: '4.96', bestRating: '5' },
        author: { '@type': 'Organization', name: 'Sortlist' },
        reviewBody: 'Note moyenne 4,96/5 sur 6 avis Sortlist.',
      },
      {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: '4.3', bestRating: '5' },
        author: { '@type': 'Organization', name: 'Trustpilot' },
        reviewBody: 'Note moyenne 4,3/5 sur 7 avis Trustpilot.',
      },
    ],
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

/** Homepage WebPage node. */
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
  } as const;
}

/** Breadcrumb for the homepage. */
export function breadcrumbSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: SITE_URL,
      },
    ],
  } as const;
}

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
