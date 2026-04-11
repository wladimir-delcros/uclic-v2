import CTA from '@/components/home/CTA';
import Feature from '@/components/home/Feature';
import FeatureV2 from '@/components/home/FeatureV2';
import Hero from '@/components/home/Hero';
import Integration from '@/components/home/Integration';
import Pricing from '@/components/home/Pricing';
import Publish from '@/components/home/Publish';
import Reviews from '@/components/home/Reviews';
import Steps from '@/components/home/Steps';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'App Builder - NextSaaS',
};
const page = () => {
  return (
    <main className="dark:bg-background-6">
      <Hero />
      <Integration />
      <Feature />
      <Steps />
      <FeatureV2 />
      <Reviews />
      <Pricing />
      <Publish />
      <CTA />
    </main>
  );
};

export default page;
