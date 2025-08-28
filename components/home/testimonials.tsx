"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Kim',
    role: 'Software Engineer at Google',
    company: 'Google',
    image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    content: 'USTU completely transformed my career trajectory. The Summit opened doors I never knew existed, and the Campus Ambassador program taught me leadership skills that I use every day at Google.',
    rating: 5,
    program: 'Campus Ambassador'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    role: 'Professor of Computer Science',
    company: 'Stanford University',
    image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    content: 'As an educator, I\'ve seen firsthand how USTU bridges the gap between academia and industry. Their approach to experiential learning is revolutionary and desperately needed in our field.',
    rating: 5,
    program: 'Faculty Partner'
  },
  {
    id: 3,
    name: 'Raj Patel',
    role: 'Founder & CEO',
    company: 'TechStart Inc.',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    content: 'The Innovation Summit was where I met my co-founder and got the idea for my startup. Three years later, we\'ve raised $10M and are changing how people interact with AI. USTU made it possible.',
    rating: 5,
    program: 'Summit Attendee'
  },
  {
    id: 4,
    name: 'Emily Rodriguez',
    role: 'Data Scientist',
    company: 'Microsoft',
    image: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    content: 'The mentorship I received through USTU\'s programs was invaluable. The connections I made during the Summit led directly to my dream job at Microsoft. I can\'t recommend it enough.',
    rating: 5,
    program: 'Mentorship Program'
  },
  {
    id: 5,
    name: 'James Wilson',
    role: 'VP of Engineering',
    company: 'Stripe',
    image: 'https://images.pexels.com/photos/3777953/pexels-photo-3777953.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    content: 'USTU students consistently stand out in our hiring process. Their combination of technical skills and real-world experience is exactly what we look for. We\'re proud to partner with them.',
    rating: 5,
    program: 'Industry Partner'
  },
  {
    id: 6,
    name: 'Lisa Zhang',
    role: 'UX Designer',
    company: 'Airbnb',
    image: 'https://images.pexels.com/photos/3775087/pexels-photo-3775087.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    content: 'The design workshops at the Summit completely changed how I approach user experience. The hands-on learning and expert feedback helped me land my dream role at Airbnb.',
    rating: 5,
    program: 'Workshop Participant'
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalPages]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    setIsAutoPlaying(false);
  };

  const getCurrentTestimonials = () => {
    const startIndex = currentIndex * itemsPerPage;
    return testimonials.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="px-4 py-2 mb-6">
            Success Stories
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Innovators Worldwide
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed text-balance">
            Don't just take our word for it. Here's what students, educators, and industry 
            professionals say about their USTU experience.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalPages }, (_, pageIndex) => (
                <div key={pageIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
                    {testimonials
                      .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                      .map((testimonial) => (
                        <Card key={testimonial.id} className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
                          <CardContent className="p-6">
                            {/* Quote Icon */}
                            <div className="absolute top-4 right-4 opacity-10">
                              <Quote className="h-8 w-8" />
                            </div>

                            {/* Rating */}
                            <div className="flex items-center space-x-1 mb-4">
                              {Array.from({ length: testimonial.rating }, (_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>

                            {/* Content */}
                            <p className="text-muted-foreground italic mb-6 leading-relaxed">
                              "{testimonial.content}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center space-x-3">
                              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                <Image
                                  src={testimonial.image}
                                  alt={testimonial.name}
                                  fill
                                  className="object-cover"
                                  sizes="48px"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-foreground text-sm">
                                  {testimonial.name}
                                </h4>
                                <p className="text-muted-foreground text-xs">
                                  {testimonial.role} • {testimonial.company}
                                </p>
                                <Badge variant="secondary" className="text-xs mt-1">
                                  {testimonial.program}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dots */}
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentIndex(i);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={currentIndex === totalPages - 1}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}