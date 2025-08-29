"use client";

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Kim',
    role: 'Software Engineer at Google',
    company: 'Google',
    content: 'USTU completely transformed my career trajectory. The Summit opened doors I never knew existed, and the Campus Ambassador program taught me leadership skills that I use every day at Google.',
    rating: 5,
    program: 'Campus Ambassador'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    role: 'Professor of Computer Science',
    company: 'Stanford University',
    content: 'As an educator, I\'ve seen firsthand how USTU bridges the gap between academia and industry. Their approach to experiential learning is revolutionary and desperately needed in our field.',
    rating: 5,
    program: 'Faculty Partner'
  },
  {
    id: 3,
    name: 'Raj Patel',
    role: 'Founder & CEO',
    company: 'TechStart Inc.',
    content: 'The Innovation Summit was where I met my co-founder and got the idea for my startup. Three years later, we\'ve raised $10M and are changing how people interact with AI. USTU made it possible.',
    rating: 5,
    program: 'Summit Attendee'
  },
  {
    id: 4,
    name: 'Emily Rodriguez',
    role: 'Data Scientist',
    company: 'Microsoft',
    content: 'The mentorship I received through USTU\'s programs was invaluable. The connections I made during the Summit led directly to my dream job at Microsoft. I can\'t recommend it enough.',
    rating: 5,
    program: 'Mentorship Program'
  },
  {
    id: 5,
    name: 'James Wilson',
    role: 'VP of Engineering',
    company: 'Stripe',
    content: 'USTU students consistently stand out in our hiring process. Their combination of technical skills and real-world experience is exactly what we look for. We\'re proud to partner with them.',
    rating: 5,
    program: 'Industry Partner'
  },
  {
    id: 6,
    name: 'Lisa Zhang',
    role: 'UX Designer',
    company: 'Airbnb',
    content: 'The design workshops at the Summit completely changed how I approach user experience. The hands-on learning and expert feedback helped me land my dream role at Airbnb.',
    rating: 5,
    program: 'Workshop Participant'
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({
        ...testimonials[index],
        position: i
      });
    }
    return visible;
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30 overflow-hidden">
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

        {/* Auto-scrolling Testimonials */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getVisibleTestimonials().map((testimonial, idx) => (
              <Card 
                key={`${testimonial.id}-${currentIndex}`}
                className={`relative overflow-hidden border-0 transition-all duration-1000 ease-in-out ${
                  idx === 0 ? 'opacity-30 scale-95' :
                  idx === 1 ? 'opacity-100 scale-100' :
                  'opacity-30 scale-95'
                } ${
                  idx === 1 ? 'md:translate-y-0' : 'md:translate-y-4'
                }`}
                style={{
                  animationDelay: `${idx * 200}ms`
                }}
              >
                <CardContent className="p-6 bg-background/80 backdrop-blur-sm">
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

                  {/* Author - No Image */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-muted-foreground text-xs">
                      {testimonial.role} • {testimonial.company}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {testimonial.program}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Infinite scroll animation effect */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-muted/30 to-transparent pointer-events-none z-10"></div>
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-muted/30 to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
}