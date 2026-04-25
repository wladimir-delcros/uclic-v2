'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { trackGenerateLead } from '@/lib/datalayer';

/**
 * Client-only conversion tracking on /merci.
 * Fires GA4 generate_lead, Google Ads conversion, Meta Pixel Lead, LinkedIn Insight,
 * plus a PostHog `form_submission_success` event with source + email.
 *
 * Source comes from the query string (?source=audit|contact|expertise|simulation|...).
 * Email if passed (?email=...) is forwarded so attribution platforms can match it.
 */
export default function MerciTracking() {
  const params = useSearchParams();
  const source = params?.get('source') ?? 'unknown';
  const email = params?.get('email') ?? undefined;

  useEffect(() => {
    // Centralised GA4 + Google Ads + Meta Pixel + LinkedIn Insight
    trackGenerateLead({ source, email });

    // PostHog product analytics
    if (typeof window !== 'undefined') {
      const ph = (window as unknown as { posthog?: { capture: (e: string, p?: Record<string, unknown>) => void } }).posthog;
      if (ph?.capture) {
        ph.capture('form_submission_success', {
          source,
          email: email ?? 'unknown',
          timestamp: new Date().toISOString(),
        });
      }
    }
  }, [source, email]);

  return null;
}
