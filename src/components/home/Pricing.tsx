'use client';

import Link from 'next/link';
import { useState } from 'react';
import RevealAnimation from '../animation/RevealAnimation';

const pricingPlans = [
  {
    id: '1',
    name: 'Free Plan',
    description: 'Start building with core features',
    monthlyPrice: 40,
    yearlyPrice: 90,
    features: ['2 Worksapces', '10 collaborators', 'Unlimited Data', 'Unlimited analytics'],
    buttonVariant: 'btn-white dark:btn-white-dark hover:btn-secondary dark:hover:btn-accent',
    isSpecial: false,
  },
  {
    id: '2',
    name: 'Pro Plan',
    description: 'Advanced features + app publishing',
    monthlyPrice: 19,
    yearlyPrice: 79,
    features: [
      '2 Workspaces',
      '10 collaborators',
      'Unlimited Data',
      'Unlimited analytics',
      '24 hours support',
      'Powerful integration',
    ],
    buttonVariant: 'btn-secondary dark:btn-accent hover:btn-white dark:hover:btn-accent',
    isSpecial: true,
  },
  {
    id: '3',
    name: 'Team Plan',
    description: 'Collaboration, integrations & support',
    monthlyPrice: 49,
    yearlyPrice: 99,
    features: ['2 Worksapces', '10 collaborators', 'Unlimited Data', 'Unlimited analytics'],
    buttonVariant: 'btn-white dark:btn-white-dark hover:btn-secondary dark:hover:btn-accent',
    isSpecial: false,
  },
  {
    id: '4',
    name: 'Enterprise Plan',
    description: 'Custom pricing – API access, white-label, and more',
    monthlyPrice: 60,
    yearlyPrice: 120,
    features: ['2 Worksapces', '10 collaborators', 'Unlimited Data', 'Unlimited analytics'],
    buttonVariant: 'btn-white dark:btn-white-dark hover:btn-secondary dark:hover:btn-accent',
    isSpecial: false,
  },
];

const CheckIcon = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width={20} height={20} rx={10} fill="" className="fill-secondary/40 dark:fill-accent/40" />
    <path
      d="M9.31661 13.7561L14.7491 8.42144C15.0836 8.0959 15.0836 7.5697 14.7491 7.24416C14.4145 6.91861 13.8736 6.91861 13.539 7.24416L8.7116 11.9901L6.46096 9.78807C6.12636 9.46253 5.58554 9.46253 5.25095 9.78807C4.91635 10.1136 4.91635 10.6398 5.25095 10.9654L8.1066 13.7561C8.27347 13.9184 8.49253 14 8.7116 14C8.93067 14 9.14974 13.9184 9.31661 13.7561Z"
      fill=""
      className="dark:fill-accent fill-white"
    />
  </svg>
);

const ProCheckIcon = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width={20} height={20} rx={10} fill="" className="fill-secondary dark:fill-accent" />
    <path
      d="M9.31661 13.7561L14.7491 8.42144C15.0836 8.0959 15.0836 7.5697 14.7491 7.24416C14.4145 6.91861 13.8736 6.91861 13.539 7.24416L8.7116 11.9901L6.46096 9.78807C6.12636 9.46253 5.58554 9.46253 5.25095 9.78807C4.91635 10.1136 4.91635 10.6398 5.25095 10.9654L8.1066 13.7561C8.27347 13.9184 8.49253 14 8.7116 14C8.93067 14 9.14974 13.9184 9.31661 13.7561Z"
      fill=""
      className="fill-white dark:fill-black"
    />
  </svg>
);

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <section className="relative overflow-hidden pt-14 pb-14 md:pt-16 md:pb-16 lg:pt-[88px] lg:pb-[88px] xl:pt-[150px] xl:pb-[150px]">
      <div className="main-container flex flex-col gap-[70px]">
        <div className="flex flex-col items-center text-center">
          <RevealAnimation delay={0.2}>
            <span className="badge badge-green mb-5">Pricing plans</span>
          </RevealAnimation>
          <RevealAnimation delay={0.3}>
            <h2 className="mb-8">
              Flexible plans that <span className="text-primary-500">grow with you</span>
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={0.4}>
            <div className="relative z-0">
              <RevealAnimation delay={1} duration={2.5} useSpring direction="up" offset={200}>
                <span className="bg-secondary dark:bg-accent text-accent dark:text-secondary text-tagline-2 absolute -top-2.5 -right-6 z-11 inline-block w-[90px] rotate-[20deg] rounded-[36px] px-3.5 py-1.5 font-normal capitalize shadow-xs">
                  save 40%
                </span>
              </RevealAnimation>
              <label className="shadow-1 dark:bg-background-9 relative z-[10] inline-flex cursor-pointer items-center rounded-full bg-white px-[57px] py-6">
                <span className="text-secondary dark:text-accent mr-2.5 text-base font-normal">Monthly</span>
                <input
                  type="checkbox"
                  id="priceCheck"
                  onChange={() => setIsMonthly(!isMonthly)}
                  checked={isMonthly}
                  className="peer sr-only"
                  aria-label="Toggle between monthly and yearly pricing"
                />
                <span className="border-primary-400 dark:border-stroke-8 after:bg-accent after:border-primary-500 dark:after:border-stroke-8 before:bg-primary-500 dark:before:bg-stroke-7 relative h-[28px] w-13 rounded-[34px] border bg-transparent before:absolute before:-top-[5px] before:-left-[6px] before:-z-10 before:h-[36px] before:w-[62px] before:rounded-[34px] before:p-[5px] before:transition-all before:content-[''] after:absolute after:start-[2px] after:top-1/2 after:size-6 after:-translate-y-1/2 after:rounded-full after:transition-all after:content-[''] peer-checked:after:start-[2px] peer-checked:after:translate-x-[94%]" />
                <span className="text-secondary dark:text-accent ms-2.5 text-base font-normal">Yearly</span>
              </label>
            </div>
          </RevealAnimation>
        </div>
        <div className="relative">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:grid-cols-4">
            {pricingPlans.map((plan, index) => (
              <RevealAnimation key={plan.id} delay={0.4 + index * 0.1}>
                {plan.isSpecial ? (
                  <div className="flex h-full flex-col rounded-[20px] bg-[url('/images/ns-img-160.png')] bg-cover bg-center bg-no-repeat p-2.5 max-lg:w-full">
                    <div className="flex h-full flex-col gap-6 rounded-[20px] bg-white p-8 dark:bg-black">
                      <div className="mb-6">
                        <h3 className="text-heading-5 mb-2.5 font-normal">{plan.name}</h3>
                        <p className="text-secondary dark:text-accent mb-6 max-w-[250px]">{plan.description}</p>
                        <ul className="relative list-none space-y-4">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2.5">
                              <ProCheckIcon />
                              <span className="text-secondary dark:text-accent text-tagline-1 font-normal">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="border-stroke-2 dark:border-stroke-6 mt-auto border-t pt-6">
                        {!isMonthly ? (
                          <div className="price-month mb-7">
                            <h4 className="text-heading-4 font-normal">
                              $<span>{plan.monthlyPrice}</span>
                              <span className="text-tagline-2">/Month</span>
                            </h4>
                          </div>
                        ) : (
                          <div className="price-year mb-7">
                            <h4 className="text-heading-4 font-normal">
                              $<span>{plan.yearlyPrice}</span>
                              <span className="text-tagline-2">/Year</span>
                            </h4>
                          </div>
                        )}
                        <Link
                          href="/contact-us"
                          className={`btn btn-md ${plan.buttonVariant} block w-full text-center first-letter:uppercase before:content-none`}>
                          Get started
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-background-2 dark:bg-background-5 flex h-full flex-col gap-6 rounded-[20px] p-8 max-lg:w-full">
                    <div className="mb-6">
                      <h3 className="text-heading-5 mb-2 font-normal">{plan.name}</h3>
                      <p className="mb-6 max-w-[250px]">{plan.description}</p>
                      <ul className="relative list-none space-y-4">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2.5">
                            <CheckIcon />
                            <span className="text-secondary dark:text-accent text-tagline-1 font-normal">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-stroke-2 dark:border-stroke-6 mt-auto border-t pt-6">
                      {!isMonthly ? (
                        <div className="price-year mb-6">
                          <h4 className="text-heading-4 font-normal">
                            $<span>{plan.yearlyPrice}</span>
                            <span className="text-tagline-2">/Year</span>
                          </h4>
                        </div>
                      ) : (
                        <div className="price-month mb-6">
                          <h4 className="text-heading-4 font-normal">
                            $<span>{plan.monthlyPrice}</span>
                            <span className="text-tagline-2">/Month</span>
                          </h4>
                        </div>
                      )}
                      <Link
                        href="/contact-us"
                        className={`btn btn-md ${plan.buttonVariant} block w-full text-center first-letter:uppercase before:content-none`}>
                        Get started
                      </Link>
                    </div>
                  </div>
                )}
              </RevealAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
