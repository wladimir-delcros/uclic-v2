'use client';
import RevealAnimation from '@/components/animation/RevealAnimation';
import { MobileMenuProvider } from '@/context/MobileMenuContext';
import { mobileMenuData } from '@/data/navbar-data';
import { useNavbarScroll } from '@/hooks/useScrollHeader';
import { cn } from '@/utils/cn';
import logoDark from '@public/images/shared/logo-dark.svg';
import logo from '@public/images/shared/logo.svg';
import mainLogo from '@public/images/shared/main-logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import MobileMenu from '../mobile-menu/MobileMenu';
import CompanyMenu from './CompanyMenu';
import MobileMenuButton from './MobileMenuButton';
import PlanAndSupportMenu from './PlanAndSupportMenu';
import PlatformMenu from './PlatformMenu';
import ResourcesMenu from './ResourcesMenu';

const Navbar = () => {
  const { isScrolled } = useNavbarScroll(150);

  const [menuDropdownId, setMenuDropdownId] = useState<string | null>(null);

  const handleMenuHover = (dropdownId?: string | null) => {
    setMenuDropdownId(dropdownId || null);
  };
  return (
    <MobileMenuProvider>
      <header
        onMouseLeave={() => handleMenuHover(null)}
        className={cn(
          'lp:!max-w-[1290px] fixed top-5 left-1/2 z-50 mx-auto w-full max-w-[350px] -translate-x-1/2 transition-all duration-500 ease-in-out max-[400px]:max-w-[350px] min-[425px]:max-w-[375px] min-[500px]:max-w-[450px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]',
          isScrolled && 'top-2',
        )}>
        <RevealAnimation direction="up" offset={100} delay={0.1} instant>
          <div className="dark:bg-background-7 flex items-center justify-between rounded-full bg-white/60 px-2.5 py-2.5 backdrop-blur-[25px] xl:py-0">
            <div>
              <Link href="/">
                <span className="sr-only">Home</span>
                <figure className="hidden lg:block lg:max-w-[198px]">
                  <Image src={mainLogo} alt="NextSaaS" className="dark:invert" />
                </figure>
                <figure className="block max-w-[44px] lg:hidden">
                  <Image src={logo} alt="NextSaaS" className="block w-full dark:hidden" />
                  <Image src={logoDark} alt="NextSaaS" className="hidden w-full dark:block" />
                </figure>
              </Link>
            </div>
            <nav className="hidden items-center xl:flex">
              <ul className="flex items-center">
                <li
                  className="nav-item relative cursor-pointer py-2.5"
                  data-menu="company-mega-menu"
                  onMouseEnter={() => handleMenuHover('company-mega-menu')}>
                  <a
                    href="/"
                    className="hover:border-stroke-2 dark:hover:border-stroke-7 text-tagline-1 text-secondary/60 hover:text-secondary dark:text-accent/60 dark:hover:text-accent flex items-center gap-1 rounded-full border border-transparent px-4 py-2 font-normal transition-all duration-200">
                    <span>Company</span>
                    <span className="nav-arrow block origin-center translate-y-px transition-all duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </a>
                  <CompanyMenu menuDropdownId={menuDropdownId} setMenuDropdownId={setMenuDropdownId} />
                </li>
                <li
                  className="nav-item relative cursor-pointer py-2.5"
                  data-menu="platform-mega-menu"
                  onMouseEnter={() => handleMenuHover('platform-mega-menu')}
                  onMouseLeave={() => handleMenuHover(null)}>
                  <a
                    href="/"
                    className="hover:border-stroke-2 dark:hover:border-stroke-7 text-tagline-1 text-secondary/60 hover:text-secondary dark:text-accent/60 dark:hover:text-accent flex items-center gap-1 rounded-full border border-transparent px-4 py-2 font-normal transition-all duration-200">
                    <span>Platform</span>
                    <span className="nav-arrow block origin-center translate-y-px transition-all duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </a>
                  <PlatformMenu menuDropdownId={menuDropdownId} setMenuDropdownId={setMenuDropdownId} />
                </li>
                <li
                  className="nav-item relative cursor-pointer py-2.5"
                  data-menu="resources-dropdown-menu"
                  onMouseEnter={() => handleMenuHover('resources-dropdown-menu')}
                  onMouseLeave={() => handleMenuHover(null)}>
                  <a
                    href="/"
                    className="hover:border-stroke-2 dark:hover:border-stroke-7 text-tagline-1 text-secondary/60 hover:text-secondary dark:text-accent/60 dark:hover:text-accent flex items-center gap-1 rounded-full border border-transparent px-4 py-2 font-normal transition-all duration-200">
                    <span>Resources</span>
                    <span className="nav-arrow block origin-center translate-y-px transition-all duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </a>
                  <ResourcesMenu menuDropdownId={menuDropdownId} setMenuDropdownId={setMenuDropdownId} />
                </li>
                <li
                  className="nav-item relative cursor-pointer py-2.5"
                  data-menu="plan-and-support-mega-menu"
                  onMouseEnter={() => handleMenuHover('plan-and-support-mega-menu')}
                  onMouseLeave={() => handleMenuHover(null)}>
                  <a
                    href="/"
                    className="hover:border-stroke-2 dark:hover:border-stroke-7 text-tagline-1 text-secondary/60 hover:text-secondary dark:text-accent/60 dark:hover:text-accent flex items-center gap-1 rounded-full border border-transparent px-4 py-2 font-normal transition-all duration-200">
                    <span>Plans &amp; Support</span>
                    <span className="nav-arrow block origin-center translate-y-px transition-all duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </a>
                  <PlanAndSupportMenu menuDropdownId={menuDropdownId} setMenuDropdownId={setMenuDropdownId} />
                </li>
                <li className="nav-item relative cursor-pointer py-2.5">
                  <a
                    href="/pricing"
                    className="hover:border-stroke-2 dark:hover:border-stroke-7 text-tagline-1 text-secondary/60 hover:text-secondary dark:text-accent/60 dark:hover:text-accent flex items-center gap-1 rounded-full border border-transparent px-4 py-2 font-normal transition-all duration-200">
                    <span>Pricing</span>
                  </a>
                </li>
              </ul>
            </nav>
            <div className="hidden items-center justify-center xl:flex">
              <a
                href="/signup"
                className="btn btn-md hover:btn-white dark:hover:btn-white-dark btn-white-dark dark:btn-white">
                <span>Get started</span>
              </a>
            </div>
            <MobileMenuButton />
          </div>
        </RevealAnimation>
      </header>
      <MobileMenu menuData={mobileMenuData} />
    </MobileMenuProvider>
  );
};

Navbar.displayName = 'Navbar';
export default Navbar;
