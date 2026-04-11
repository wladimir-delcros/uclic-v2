import Integration from '@/components/integration/Integration';
import Process from '@/components/integration/Process';
import CTA from '@/components/shared/cta/CTA';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Integration - App Builder || NextSaaS',
};

const Integration02 = () => {
  return (
    <main className="bg-background-1 dark:bg-background-6">
      <Integration />
      <Process />
      <CTA
        className="dark:bg-background-8 bg-white"
        badgeText="Get started"
        badgeClass="!badge-green"
        ctaHeading="Build a complete website using the assistance"
        description="Start your free trial today and see your ideas come to life easily and creatively."
        ctaBtnText="Get started"
        btnClass="hover:btn-secondary dark:hover:btn-accent"
      />
    </main>
  );
};

Integration02.displayName = 'Integration02';
export default Integration02;
