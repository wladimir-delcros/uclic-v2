import feature1 from '@public/images/ns-img-152.png';
import feature2 from '@public/images/ns-img-153.png';
import feature3 from '@public/images/ns-img-154.png';
import feature4 from '@public/images/ns-img-155.png';
import feature1Dark from '@public/images/ns-img-dark-106.png';
import feature2Dark from '@public/images/ns-img-dark-107.png';
import feature3Dark from '@public/images/ns-img-dark-108.png';
import feature4Dark from '@public/images/ns-img-dark-109.png';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/LinkButton';

const featureItems = [
  {
    title: 'Drag & drop builder',
    description: 'Build apps visually—no coding required',
    image: feature1,
    imageDark: feature1Dark,
  },
  {
    title: 'Real-time preview',
    description: 'See your app in action as you create it',
    image: feature2,
    imageDark: feature2Dark,
  },
  {
    title: 'Custom workflows & automation',
    description: 'Create conditional logic, form flows, and integrations',
    image: feature3,
    imageDark: feature3Dark,
  },
  {
    title: 'Secure data management',
    description: 'Connect to google sheets, airtable, or your own database',
    image: feature4,
    imageDark: feature4Dark,
  },
];
const Feature = () => {
  return (
    <section className="bg-background-3 dark:bg-background-7 pt-14 pb-14 md:pt-16 md:pb-16 lg:pt-[88px] lg:pb-[88px] xl:pt-[150px] xl:pb-[150px]">
      <div className="main-container">
        <div className="mx-auto mb-14 max-w-[650px] space-y-5 text-center">
          <RevealAnimation delay={0.2}>
            <span className="badge badge-green">Core features</span>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <h2>
              Everything you need to <span className="text-primary-500">build &amp; launch smarter</span>
            </h2>
          </RevealAnimation>
        </div>
        {/* feature Items */}
        <div className="mb-18 grid grid-cols-12 space-y-8 md:gap-8 md:space-y-0">
          {featureItems.map((feature, index) => (
            <RevealAnimation key={index} delay={0.3 + index * 0.1}>
              <div
                className={`${index === 0 || index === 3 ? 'col-span-12 md:col-span-6 lg:col-span-8' : 'col-span-12 md:col-span-6 lg:col-span-4'} dark:border-background-9 dark:bg-background-7 bg-background-3 space-y-6 rounded-[20px] border-8 border-white p-6`}>
                <div className={`space-y-1 ${featureItems.length - 1 ? 'max-w-[285px]' : ''}`}>
                  <h5>{feature.title}</h5>
                  <p>{feature.description}</p>
                </div>
                <figure className="h-auto w-full overflow-hidden rounded-2xl object-cover">
                  <Image
                    src={feature.image}
                    alt="feature image"
                    className="block h-full w-full object-cover dark:hidden"
                  />
                  <Image
                    src={feature.imageDark}
                    alt="feature image"
                    className="hidden h-full w-full object-cover dark:block"
                  />
                </figure>
              </div>
            </RevealAnimation>
          ))}
        </div>
        <RevealAnimation delay={0.8}>
          <div className="flex items-center justify-center">
            <LinkButton
              href="/features-01"
              className="btn btn-lg md:btn-xl btn-secondary hover:btn-white dark:hover:btn-accent dark:btn-transparent w-[85%] md:w-auto">
              Start building free
            </LinkButton>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default Feature;
