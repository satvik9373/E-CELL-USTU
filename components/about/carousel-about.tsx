"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const slides = [
  {
    id: 1,
    stat: '50,000+',
    title: 'Students Empowered',
    subtitle: 'Transforming Lives Through Technology',
    description: 'From coding bootcamps to innovation summits, we\'ve empowered over 50,000 students across the globe to pursue their dreams in technology.',
    gradient: 'from-blue-500/20 via-purple-500/20 to-pink-500/20'
  },
  {
    id: 2,
    stat: '5',
    title: 'Innovation Labs',
    subtitle: 'Cutting-Edge Research Facilities',
    description: 'State-of-the-art innovation labs equipped with the latest technology, fostering hands-on learning and breakthrough research.',
    gradient: 'from-green-500/20 via-teal-500/20 to-blue-500/20'
  },
  {
    id: 3,
    stat: '500+',
    title: 'Industry Partners',
    subtitle: 'Global Network of Excellence',
    description: 'Strategic partnerships with leading tech companies, startups, and educational institutions worldwide.',
    gradient: 'from-orange-500/20 via-red-500/20 to-pink-500/20'
  },
  {
    id: 4,
    stat: '75+',
    title: 'Countries Reached',
    subtitle: 'Truly Global Impact',
    description: 'Our programs span across continents, creating a diverse and inclusive community of learners and innovators.',
    gradient: 'from-purple-500/20 via-indigo-500/20 to-blue-500/20'
  },
  {
    id: 5,
    stat: '95%',
    title: 'Success Rate',
    subtitle: 'Proven Track Record',
    description: 'Our graduates consistently achieve their career goals, with 95% securing positions at top tech companies or launching successful startups.',
    gradient: 'from-emerald-500/20 via-green-500/20 to-teal-500/20'
  }
];

export default function CarouselAbout() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              About USTU in Numbers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the impact we've made and the community we've built through 
              our innovative approach to technology education.
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className="w-full flex-shrink-0 relative min-h-[400px] flex items-center justify-center"
                >
                  {/* Background with Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-50`}></div>
                  
                  {/* Abstract Shapes */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
                    <div className="absolute bottom-10 right-10 w-48 h-48 bg-primary/5 rounded-full blur-2xl"></div>
                    <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary/15 rounded-full blur-lg"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center p-8 lg:p-12 max-w-3xl mx-auto">
                    <div 
                      className={`transition-all duration-700 ${
                        index === currentSlide 
                          ? 'opacity-100 scale-100 translate-y-0' 
                          : 'opacity-0 scale-95 translate-y-4'
                      }`}
                    >
                      {/* Main Stat */}
                      <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                        {slide.stat}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        {slide.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-lg text-primary font-medium mb-6">
                        {slide.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="absolute inset-y-0 left-4 flex items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>

            <div className="absolute inset-y-0 right-4 flex items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Auto-play Control */}
            <div className="absolute top-4 right-4">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleAutoPlay}
                className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              >
                {isAutoPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center space-x-2 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-primary w-8' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="w-full bg-muted-foreground/20 rounded-full h-1">
              <div 
                className="bg-primary h-1 rounded-full transition-all duration-300"
                style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}