import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import StaticVisualAbout from '@/components/about/static-visual-about';
import TimelineAbout from '@/components/about/timeline-about';
import VideoBackgroundAbout from '@/components/about/video-background-about';
import SplitScreenAbout from '@/components/about/split-screen-about';
import CarouselAbout from '@/components/about/carousel-about';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Section 1: Static Visual with Subtle Animation */}
      <StaticVisualAbout />
      
      {/* Section 2: Timeline-Style Storytelling */}
      <TimelineAbout />
      
      {/* Section 3: Video Background with Overlay */}
      <VideoBackgroundAbout />
      
      {/* Section 4: Split-Screen with Interactive Flip Cards */}
      <SplitScreenAbout />
      
      {/* Section 5: Carousel With Team Picks + Stats */}
      <CarouselAbout />
      
      <Footer />
    </main>
  );
}