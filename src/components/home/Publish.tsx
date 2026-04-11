import appleLogo from '@public/images/icons/apple-dark.svg';
import googlePlayLogo from '@public/images/icons/google-playstore.svg';
import qrCode from '@public/images/ns-img-191.svg';
import gradient49 from '@public/images/ns-img-537.png';
import qrCodeDark from '@public/images/ns-img-dark-130.svg';
import heroDotBg from '@public/images/ns-img-hero-dot-bg.png';
import Image from 'next/image';
import Link from 'next/link';
import RevealAnimation from '../animation/RevealAnimation';
const storeButtons = [
  {
    href: '#',
    logo: appleLogo,
    alt: 'Apple logo',
    text: 'Apple Store',
  },
  {
    href: '#',
    logo: googlePlayLogo,
    alt: 'Google Play logo',
    text: 'Google Play',
  },
];

const Publish = () => {
  return (
    <section className="bg-background-3 dark:bg-background-7 pt-14 pb-14 md:pt-16 md:pb-16 lg:pt-[88px] lg:pb-[88px] xl:pt-[150px] xl:pb-[150px]">
      <div className="main-container">
        <RevealAnimation delay={0.2}>
          <div className="bg-secondary dark:bg-background-8 relative overflow-hidden rounded-[32px] py-[100px]">
            {/* publish section bg  */}
            <RevealAnimation delay={0.9}>
              <figure className="pointer-events-none absolute -bottom-[350px] left-1/2 h-full max-h-[1137px] w-full max-w-[1290px] -translate-x-1/2 select-none max-lg:h-[600px] max-lg:w-[600px] md:-bottom-[80px] lg:-bottom-[720px] xl:-bottom-[620px]">
                <Image src={gradient49} alt="publish gradient" className="size-full object-cover" />
              </figure>
            </RevealAnimation>
            <div className="relative z-0 mx-5 mb-[70px] max-w-[900px] text-center sm:mx-auto">
              <figure className="absolute -top-5 left-1/2 -z-1 -translate-x-1/2 animate-pulse">
                <Image src={heroDotBg} alt="bg star" />
              </figure>
              <RevealAnimation delay={0.2}>
                <span className="badge badge-blur text-ns-yellow mb-5">Publish</span>
              </RevealAnimation>
              <RevealAnimation delay={0.3}>
                <h2 className="mb-3 text-white">
                  <span className="text-primary-500">Publish your app </span> to any platform
                </h2>
              </RevealAnimation>
              <RevealAnimation delay={0.4}>
                <p className="text-accent/60 mb-6">
                  &nbsp;Join thousands of creators using App Builder to launch their ideas.
                </p>
              </RevealAnimation>
            </div>
            <div className="relative z-0 mx-auto flex max-w-[900px] items-center justify-center overflow-hidden py-[100px]">
              <RevealAnimation delay={0.4}>
                <div className="flex max-w-[310px] flex-col items-center justify-center space-y-6 rounded-[20px] bg-white p-4 md:p-8">
                  <div className="space-y-2 text-center">
                    <figure className="w-full max-w-[246px] overflow-hidden rounded-2xl">
                      <Image src={qrCode} alt="qr-code" className="size-full object-cover dark:hidden" />
                      <Image src={qrCodeDark} alt="qr-code" className="hidden size-full object-cover dark:block" />
                    </figure>
                    <p className="text-secondary/60">Scan the QR code to start!</p>
                  </div>
                  <div className="w-full space-y-3 md:w-auto">
                    {storeButtons.map((button, index) => (
                      <Link
                        key={index}
                        href={button.href}
                        className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 lg:rounded-2xl lg:px-8 lg:py-4">
                        <figure className="size-8 lg:size-12">
                          <Image className="h-full w-full object-contain" src={button.logo} alt={button.alt} />
                        </figure>
                        <span className="text-background-3 lg:text-heading-5 text-tagline-1 mt-1 font-normal">
                          {button.text}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </RevealAnimation>
              <RevealAnimation delay={0.6}>
                <div className="absolute top-0 left-1/2 -z-1 w-fit -translate-x-1/2 opacity-20">
                  <div className="border-primary-200/60 bg-primary-100/10 rounded-full border p-[83px] opacity-60">
                    <div className="border-primary-200/60 bg-primary-100/10 rounded-full border p-17 opacity-60">
                      <div className="border-primary-200/60 bg-primary-100/10 rounded-full border p-[75px] opacity-60">
                        <div className="border-primary-200/60 bg-primary-100/10 h-[150px] w-[150px] rounded-full border opacity-60 md:h-[200px] md:w-[200px] lg:h-[266px] lg:w-[266px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </RevealAnimation>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default Publish;
