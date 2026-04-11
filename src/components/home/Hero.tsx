import heroBg from '@public/images/ns-img-150.png';
import heroImage from '@public/images/ns-img-151.png';
import heroBgDark from '@public/images/ns-img-dark-104.png';
import heroImageDark from '@public/images/ns-img-dark-105.png';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/LinkButton';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-[150px] md:pt-[190px] lg:pt-[230px]">
      <RevealAnimation delay={0.3}>
        <div className="absolute top-20 left-1/2 -translate-x-1/2">
          <Image src={heroBg} alt="Hero background pattern" className="block object-cover dark:hidden" />
          <Image src={heroBgDark} alt="Hero background pattern" className="hidden object-cover dark:block" />
        </div>
      </RevealAnimation>
      <div className="main-container relative z-10">
        <div className="mb-14 flex flex-col items-center justify-center">
          <div className="mx-auto mb-14 w-full max-w-[1075px] space-y-4 text-center">
            <RevealAnimation delay={0.2}>
              <h1>
                Build <span className="text-primary-500">powerful apps</span> without writing a single line of code
              </h1>
            </RevealAnimation>
            <RevealAnimation delay={0.3}>
              <p className="mx-auto max-w-[650px]">
                Whether you&apos;re launching a new startup, digitizing internal workflows, or building an MVP, App
                Builder gives you all the tools you need—no developers required.
              </p>
            </RevealAnimation>
          </div>
          <ul className="flex w-[90%] flex-col gap-4 text-center max-md:items-center max-md:justify-center md:w-auto md:flex-row">
            <RevealAnimation delay={0.4}>
              <li className="w-full sm:w-auto">
                <LinkButton
                  href="/login-01"
                  className="btn btn-xl btn-secondary dark:btn-accent hover:btn-white dark:hover:btn-white-dark w-[90%] md:w-auto"
                  aria-label="Start building free">
                  Start building free
                </LinkButton>
              </li>
            </RevealAnimation>
            <RevealAnimation delay={0.5}>
              <li className="w-full sm:w-auto">
                <LinkButton
                  href="/homepage-02"
                  className="btn btn-xl dark:btn-white-dark hover:btn-secondary btn-white dark:hover:btn-accent w-[90%] md:w-auto"
                  aria-label="Watch demo video">
                  <span>Watch demo video</span>
                </LinkButton>
              </li>
            </RevealAnimation>
          </ul>
        </div>
        <RevealAnimation delay={0.6}>
          <figure className="w-full max-w-[1290px]">
            <Image
              src={heroImage}
              alt="hero-image"
              className="size-full scale-[150%] object-cover md:scale-100 dark:hidden"
            />
            <Image
              src={heroImageDark}
              alt="hero-image"
              className="hidden size-full scale-[150%] object-cover md:scale-100 dark:block"
            />
          </figure>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default Hero;
