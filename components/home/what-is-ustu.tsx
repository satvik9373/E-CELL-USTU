"use client";

import { Badge } from '@/components/ui/badge';
import { useEffect, useRef, useState } from 'react';

// Custom hook for counting animation
const useCountUp = (target: number, duration: number = 2000, suffix: string = '') => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * target);
      
      setCount(currentCount);

      if (progress === 1) {
        clearInterval(timer);
        setCount(target); // Ensure we end at exact target
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return { count, ref, suffix };
};

export default function WhatIsUSTU() {
  const stats = [
    { target: 50, suffix: 'K+', label: 'Active Students' },
    { target: 500, suffix: '+', label: 'Industry Partners' },
    { target: 100, suffix: '+', label: 'Countries Reached' },
    { target: 95, suffix: '%', label: 'Success Rate' }
  ];

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="outline" className="px-4 py-2 mb-6">
            About E-Cell
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            What is {' '}
            <span className="bg-gradient-to-r from-blue-900 to-blue-800 bg-clip-text text-transparent">
              E-cell USTU
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            E-Cell USTU is the entrepreneurship cell of Universal Skill Tech University, dedicated to 
            fostering innovation and entrepreneurial spirit among students and the broader community.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => {
              const { count, ref, suffix } = useCountUp(stat.target, 2000 + index * 200);
              
              return (
                <div key={index} ref={ref}>
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2 transition-all duration-300">
                    {count}{stat.suffix}
                  </div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}