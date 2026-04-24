/**
 * GA4 Data Layer – centralised tracking for uclic.fr
 *
 * Pushes events to window.dataLayer so they are picked up by both
 * the GA4 property (G-92TBJMXN72) and Google Ads (AW-637970941),
 * with mirrored events sent to Meta Pixel (892479800144291) when
 * relevant (lead, schedule, scroll depth engagement).
 */

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
    gtag: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function gtag(command: string, eventName: string, params?: object) {
  if (typeof window === 'undefined') {return;}
  window.dataLayer = window.dataLayer || [];
  if (command === 'event') {
    window.dataLayer.push({ event: eventName, ...params });
  }
  if (typeof window.gtag === 'function') {
    window.gtag(command, eventName, params);
  }
}

/** Generic event push – use the specialised helpers below when possible. */
export function trackEvent(eventName: string, params?: GtagParams) {
  gtag('event', eventName, params);
}

/**
 * Push page metadata into the dataLayer on every navigation.
 */
export function trackPageData(pathname: string) {
  if (typeof window === 'undefined') {return;}

  const pageType = getPageType(pathname);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'page_data',
    page_type: pageType,
    page_path: pathname,
  });
}

function getPageType(pathname: string): string {
  if (pathname === '/') {return 'homepage';}
  if (pathname.startsWith('/audit')) {return 'audit';}
  if (pathname.startsWith('/contact')) {return 'contact';}
  if (pathname.startsWith('/expertise')) {return 'expertise';}
  if (pathname.startsWith('/cas-clients')) {return 'case_study';}
  if (pathname.startsWith('/blog')) {return 'blog';}
  if (pathname.startsWith('/toolbox')) {return 'toolbox';}
  if (pathname.startsWith('/scraping')) {return 'scraping';}
  if (pathname.startsWith('/levee-de-fonds')) {return 'fundraising';}
  if (pathname.startsWith('/meilleure-agence')) {return 'best_agency';}
  if (pathname === '/merci') {return 'thank_you';}
  if (pathname.startsWith('/outils-gratuits')) {return 'free_tools';}
  if (pathname.startsWith('/simulation')) {return 'simulation';}
  return 'other';
}

/**
 * generate_lead – fires on /merci after a form submission or booking.
 */
export function trackGenerateLead(params: { source: string; email?: string }) {
  if (typeof window === 'undefined') {return;}

  // GA4
  if (window.gtag) {
    window.gtag('event', 'generate_lead', {
      event_category: 'Form',
      event_label: params.source,
      value: 1,
    });
  }

  // Google Ads conversion — Lead - Formulaire Audit (legacy)
  if (window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: 'AW-637970941/9QEoCNnc1Y4cEP3TmrAC',
      value: 300,
      currency: 'EUR',
    });
  }

  // Google Ads conversion — Lead /merci (created 2026-04-09)
  if (window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: 'AW-637970941/3yQ_CLyB5ZgcEP3TmrAC',
      value: 300,
      currency: 'EUR',
    });
  }

  // Meta Pixel
  if (window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: params.source,
      content_category: 'Form Submission',
      value: 300,
      currency: 'EUR',
    });
  }
}

/**
 * cta_click – fires when a user clicks any CTA button.
 */
export function trackCtaClick(params: {
  cta_name: string;
  cta_location: string;
  destination?: string;
}) {
  if (typeof window === 'undefined' || !window.gtag) {return;}

  window.gtag('event', 'cta_click', {
    cta_name: params.cta_name,
    cta_location: params.cta_location,
    destination: params.destination ?? '',
  });
}

/**
 * contact_click – fires when a user clicks a phone number or email link.
 */
export function trackContactClick(params: {
  method: 'phone' | 'email' | 'whatsapp';
  location: string;
}) {
  if (typeof window === 'undefined' || !window.gtag) {return;}

  window.gtag('event', 'contact_click', {
    method: params.method,
    location: params.location,
  });
}

export function trackBookingAbandon(location: string, timeSpentSeconds: number) {
  if (typeof window === 'undefined') {return;}

  if (window.gtag) {
    window.gtag('event', 'booking_abandon', {
      event_category: 'Engagement',
      event_label: location,
      time_spent_seconds: timeSpentSeconds,
    });
  }

  if (window.fbq) {
    window.fbq('trackCustom', 'BookingAbandon', {
      location,
      time_spent_seconds: timeSpentSeconds,
    });
  }
}

/**
 * booking_click – fires when a user opens the HubSpot/Calendly iframe.
 * Sends to GA4, Google Ads, AND Meta Pixel for full attribution.
 */
export function trackBookingClick(location: string) {
  if (typeof window === 'undefined') {return;}

  // GA4
  if (window.gtag) {
    window.gtag('event', 'booking_click', {
      event_category: 'Engagement',
      event_label: location,
    });
  }

  // Google Ads conversion — Booking Confirmed Audit
  if (window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: 'AW-637970941/DFrOCP-cxo8cEP3TmrAC',
      value: 120,
      currency: 'EUR',
    });
  }

  // Google Ads conversion proxy — Booking Click (mid-funnel signal)
  if (window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: 'AW-637970941/7568493019',
      value: 50,
      currency: 'EUR',
    });
  }

  // Meta Pixel – Schedule event (mid-funnel signal)
  if (window.fbq) {
    window.fbq('track', 'Schedule', {
      content_name: location,
      content_category: 'Booking',
    });
  }
}

/**
 * Track scroll depth at 25%, 50%, 75%, 100% thresholds.
 * Fires once per threshold per page. Sends to GA4 + Meta Pixel + Google Ads proxy.
 */
export function initScrollDepthTracking() {
  if (typeof window === 'undefined') {return;}

  const thresholds = [25, 50, 75, 100];
  const fired = new Set<number>();

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) {return;}

    const percent = Math.round((scrollTop / docHeight) * 100);

    for (const t of thresholds) {
      if (percent >= t && !fired.has(t)) {
        fired.add(t);

        if (window.gtag) {
          window.gtag('event', 'scroll_depth', {
            percent_scrolled: t,
            page_path: window.location.pathname,
          });
        }

        // Google Ads conversion proxy — Scroll 75% (engagement signal)
        if (t >= 75 && window.gtag) {
          window.gtag('event', 'conversion', {
            send_to: 'AW-637970941/7568600874',
            value: 10,
            currency: 'EUR',
          });
        }

        // Meta Pixel — custom engagement signal
        if (t >= 50 && window.fbq) {
          window.fbq('trackCustom', 'ScrollDepth', {
            percent_scrolled: t,
            page_path: window.location.pathname,
          });
        }
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Delegated click listener on document.body for any element with `data-ga-event`.
 *
 * Supported attributes:
 *   data-ga-event="cta_click"
 *   data-ga-cta-name="Audit Gratuit"
 *   data-ga-cta-location="header"
 *   data-ga-destination="/audit"
 *
 *   data-ga-event="contact_click"
 *   data-ga-method="phone" | "email" | "whatsapp"
 *   data-ga-location="footer"
 *
 *   data-ga-event="booking_click"
 *   data-ga-location="audit-hero"
 */
export function initAutoTracking() {
  if (typeof window === 'undefined') {return;}

  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-ga-event]');
    if (!el) {return;}

    const event = el.dataset.gaEvent;

    if (event === 'cta_click') {
      trackCtaClick({
        cta_name: el.dataset.gaCtaName ?? '',
        cta_location: el.dataset.gaCtaLocation ?? '',
        destination: el.dataset.gaDestination,
      });
    } else if (event === 'contact_click') {
      trackContactClick({
        method: (el.dataset.gaMethod as 'phone' | 'email' | 'whatsapp') ?? 'phone',
        location: el.dataset.gaLocation ?? '',
      });
    } else if (event === 'booking_click') {
      trackBookingClick(el.dataset.gaLocation ?? '');
    }
  });
}
