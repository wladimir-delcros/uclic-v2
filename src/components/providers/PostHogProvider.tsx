'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState, useRef } from 'react';

// PostHog loaded dynamically to reduce initial bundle

let posthogInstance: typeof import('posthog-js').default | null = null;

function PostHogPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && posthogInstance && (posthogInstance as unknown as { __loaded?: boolean }).__loaded) {
      let url = window.origin + pathname;
      if (searchParams?.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthogInstance.capture('$pageview', {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  const [isPostHogLoaded, setIsPostHogLoaded] = useState(false);
  const loadingRef = useRef(false);

  useEffect(() => {
    const loadPostHog = async () => {
      if (
        typeof window === 'undefined' ||
        loadingRef.current ||
        (posthogInstance && (posthogInstance as unknown as { __loaded?: boolean }).__loaded)
      )
        {return;}
      loadingRef.current = true;

      try {
        const posthog = (await import('posthog-js')).default;
        posthogInstance = posthog;

        posthog.init('phc_tgVMqLsXV5UAc3fluEFVXs5qrX0IaFJpBPUSyMeUaIN', {
          api_host: 'https://eu.i.posthog.com',
          person_profiles: 'identified_only',
          capture_pageview: false,
          disable_surveys: true,
          autocapture: false,
          disable_session_recording: false,
          loaded: () => {
            setIsPostHogLoaded(true);
          },
        });
      } catch {
        loadingRef.current = false;
      }
    };

    const events: Array<keyof WindowEventMap> = ['mousemove', 'click', 'scroll', 'touchstart', 'keydown'];
    const handleInteraction = () => {
      events.forEach((e) => window.removeEventListener(e, handleInteraction));
      loadPostHog();
    };

    events.forEach((event) => {
      window.addEventListener(event, handleInteraction, { once: true, passive: true });
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleInteraction);
      });
    };
  }, []);

  return (
    <>
      {isPostHogLoaded && (
        <Suspense fallback={null}>
          <PostHogPageViewTracker />
        </Suspense>
      )}
      {children}
    </>
  );
}
