import Navbar from '@/components/home/Navbar';
import HeroSection from '@/components/home/HeroSection';
import LogoBar from '@/components/home/LogoBar';
import ProblemSolution from '@/components/home/ProblemSolution';
import ProcessSection from '@/components/home/ProcessSection';
import ExpertsSection from '@/components/home/ExpertsSection';
import ResultsSection from '@/components/home/ResultsSection';
import PricingSection from '@/components/home/PricingSection';
import FAQSection from '@/components/home/FAQSection';
import CTAFinal from '@/components/home/CTAFinal';
import Footer from '@/components/home/Footer';

export default function Home() {
  return (
    <main className="bg-black text-[#F5F5F1]">
      <Navbar />
      <HeroSection />
      <LogoBar />
      <ProblemSolution />
      <ProcessSection />
      <ExpertsSection />
      <ResultsSection />
      <PricingSection />
      <FAQSection />
      <CTAFinal />
      <Footer />
    </main>
  );
}
