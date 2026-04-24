'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initAutoTracking, initScrollDepthTracking, trackPageData } from '@/lib/datalayer';

let autoTrackingInitialised = false;

export default function DataLayerInit() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageData(pathname);
  }, [pathname]);

  useEffect(() => {
    if (!autoTrackingInitialised) {
      initAutoTracking();
      initScrollDepthTracking();
      autoTrackingInitialised = true;
    }
  }, []);

  return null;
}
