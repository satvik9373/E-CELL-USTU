"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Users, ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop"
          alt="E-Cell Team Group Photo"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-background/95"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight text-balance">
            Empowering{' '}
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Entrepreneurs
            </span>
          </h1>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">10,000+ Entrepreneurs</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border"></div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">500+ Startups Incubated</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border"></div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ArrowRight className="h-5 w-5" />
              <span className="text-sm font-medium">200+ Industry Mentors</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="px-8 py-3 text-base font-medium group" asChild>
              <Link href="/events">
                Get Event Passes
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" className="px-8 py-3 text-base font-medium group bg-background/80 backdrop-blur-sm" asChild>
              <Link href="/about">
                <Play className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                Watch Our Story (3min)
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 mb-4">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}