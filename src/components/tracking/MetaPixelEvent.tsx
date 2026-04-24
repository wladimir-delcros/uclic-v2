'use client';

import { useEffect } from 'react';

interface MetaPixelEventProps {
  event: string;
  params?: Record<string, string | number>;
}

/**
 * Fires a Meta Pixel event on mount.
 * Use on high-intent pages (audit, contact, expertise) to build
 * retargeting audiences and mid-funnel signals for campaign optimisation.
 */
export default function MetaPixelEvent({ event, params }: MetaPixelEventProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', event, params);
    }
  }, [event, params]);

  return null;
}
