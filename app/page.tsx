import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/home/hero-section';
import WhatIsUSTU from '@/components/home/what-is-ustu';
import InitiativesShowcase from '@/components/home/initiatives-showcase';
import TeamSection from '@/components/home/team-section';
import Testimonials from '@/components/home/testimonials';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <WhatIsUSTU />
      <InitiativesShowcase />
      <TeamSection />
      <Testimonials />
      <Footer />
    </main>
  );
}