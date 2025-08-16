"use client";

import { useState, useEffect } from 'react';
import { Lightbulb, Users, Award, Globe, Rocket, Heart } from 'lucide-react';
import Image from 'next/image';

const coreValues = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Pioneering the future of education'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building global connections'
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Striving for the highest standards'
  },
  {
    icon: Globe,
    title: 'Impact',
    description: 'Creating meaningful change'
  },
  {
    icon: Rocket,
    title: 'Growth',
    description: 'Continuous learning and development'
  },
  {
    icon: Heart,
    title: 'Purpose',
    description: 'Driven by meaningful mission'
  }
];

export default function StaticVisualAbout() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop"
          alt="University Campus"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/90"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Translucent Card */}
          <div className="backdrop-blur-md bg-background/80 rounded-3xl border border-white/20 shadow-2xl p-8 lg:p-12">
            {/* Headline with Animation */}
            <div className="text-center mb-12">
              <h1 
                className={`text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
              >
                About Universal Skill Tech University
              </h1>
              
              <p 
                className={`text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                We are a global platform dedicated to transforming technology education through 
                innovative programs, world-class summits, and meaningful connections that empower 
                the next generation of innovators and leaders.
              </p>
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className={`group text-center p-6 rounded-2xl bg-background/50 border border-white/10 hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-lg ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ 
                      transitionDelay: `${600 + index * 100}ms`,
                      animationDelay: `${600 + index * 100}ms`
                    }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}