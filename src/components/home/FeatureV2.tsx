import cursor from '@public/images/ns-img-156.svg';
import transactionChart from '@public/images/ns-img-157.png';
import featureImage1 from '@public/images/ns-img-158.png';
import profitChart from '@public/images/ns-img-159.png';
import cursorDark from '@public/images/ns-img-dark-110.svg';
import transactionChartDark from '@public/images/ns-img-dark-111.png';
import featureImage1Dark from '@public/images/ns-img-dark-112.png';
import profitChartDark from '@public/images/ns-img-dark-113.png';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';

const featureList = [
  {
    icon: 'ns-shape-8',
    text: 'No coding or technical skills required',
  },
  {
    icon: 'ns-shape-9',
    text: 'Intuitive interface built for speed',
  },
  {
    icon: 'ns-shape-12',
    text: 'Affordable plans for every stage',
  },
  {
    icon: 'ns-shape-21',
    text: 'Built-in hosting and app publishing',
  },
];

const FeatureV2 = () => {
  return (
    <section className="dark:bg-background-7 pt-14 pb-14 md:pt-16 md:pb-16 lg:pt-[88px] lg:pb-[88px] xl:pt-[100px] xl:pb-[100px]">
      <div className="main-container">
        <div className="grid grid-cols-12 items-center md:gap-y-18 lg:gap-x-[60px] xl:gap-x-[100px]">
          <div className="col-span-12 max-md:mb-18 lg:col-span-7">
            <div>
              <div className="relative w-full max-w-[300px] md:ms-16 md:max-w-[400px] lg:ms-0 lg:max-w-[500px]">
                <RevealAnimation delay={0.5} duration={1.5} useSpring>
                  <figure className="absolute top-[12%] -right-[20px] w-[100px] md:top-[20%] md:-right-[130px] lg:top-[17%] lg:-right-[15px] xl:top-[20%] xl:-right-[130px]">
                    <Image src={cursor} alt="features" className="h-full w-full dark:hidden" />
                    <Image src={cursorDark} alt="features" className="hidden h-full w-full dark:block" />
                  </figure>
                </RevealAnimation>
                <RevealAnimation delay={0.5} duration={1.5} useSpring>
                  <figure className="absolute top-[40%] left-[60%] z-10 w-full max-w-[140px] rotate-[8deg] overflow-hidden rounded-[20px] md:top-[32%] md:left-[82%] md:max-w-[208px] lg:left-[63%] lg:max-w-[200px] xl:left-[82%] xl:max-w-[253px]">
                    <Image src={transactionChart} alt="features" className="h-full w-full dark:hidden" />
                    <Image src={transactionChartDark} alt="features" className="hidden h-full w-full dark:block" />
                  </figure>
                </RevealAnimation>
                <RevealAnimation delay={0.6}>
                  <figure className="w-full md:max-w-[500px] lg:max-w-[400px] xl:max-w-[500px]">
                    <Image src={featureImage1} alt="features" className="w-full dark:hidden" />
                    <Image src={featureImage1Dark} alt="features" className="hidden w-full dark:block" />
                  </figure>
                </RevealAnimation>
                <RevealAnimation delay={0.7} duration={1.5} useSpring>
                  <figure className="absolute bottom-0 left-[40%] w-full max-w-[200px] overflow-hidden rounded-[10px] md:bottom-1/12 md:left-[62%] md:max-w-[265px] lg:max-w-[250px] xl:max-w-[333px]">
                    <Image src={profitChart} alt="features" className="size-full dark:hidden" />
                    <Image src={profitChartDark} alt="features" className="hidden size-full dark:block" />
                  </figure>
                </RevealAnimation>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="space-y-8">
              <div className="space-y-5">
                <RevealAnimation delay={0.2}>
                  <span className="badge badge-green">Reasons to select us</span>
                </RevealAnimation>
                <RevealAnimation delay={0.3}>
                  <div className="space-y-3">
                    <h2>
                      Why <span className="text-primary-500">thousands trust </span> us to build their apps
                    </h2>
                  </div>
                </RevealAnimation>
              </div>
              <div>
                <ul className="space-y-2">
                  {featureList.map((feature, index) => (
                    <RevealAnimation key={index} delay={0.4 + index * 0.1}>
                      <li className="flex items-center gap-4 p-2">
                        <span className={`${feature.icon} text-secondary dark:text-accent text-[36px]`} />
                        <span className="text-tagline-1 text-secondary dark:text-accent font-medium">
                          {feature.text}
                        </span>
                      </li>
                    </RevealAnimation>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureV2;
