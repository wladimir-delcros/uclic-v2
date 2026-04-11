import CTA from '@/components/about/CTA';
import FinanceIntro from '@/components/about/FinanceIntro';
import OurMission from '@/components/about/OurMission';
import Reviews from '@/components/about/Reviews';
import TrustedByUsers from '@/components/about/TrustedByUsers';
import VisionStatement from '@/components/about/VisionStatement';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'About - App Builder || NextSaaS',
};

const page = () => {
  return (
    <main className="dark:bg-background-8 bg-white">
      <VisionStatement />
      <TrustedByUsers />
      <OurMission />
      <FinanceIntro />
      <Reviews />
      <CTA />
    </main>
  );
};

export default page;
