"use client";

import { useState, useEffect, useRef } from 'react';
import { Calendar, Users, Trophy, Rocket, Globe, Award } from 'lucide-react';

const milestones = [
  {
    year: '2019',
    title: 'Foundation',
    description: 'USTU was founded with a vision to democratize tech education globally.',
    icon: Rocket,
    details: 'Started with a small team of passionate educators and technologists committed to bridging the gap between traditional education and industry needs.'
  },
  {
    year: '2020',
    title: 'First Summit',
    description: 'Launched our inaugural Innovation Summit with 5,000 participants.',
    icon: Calendar,
    details: 'Despite global challenges, we successfully hosted our first virtual summit, connecting students and industry leaders from 50+ countries.'
  },
  {
    year: '2021',
    title: 'Campus Program',
    description: 'Introduced Campus Ambassador program across 100+ universities.',
    icon: Users,
    details: 'Expanded our reach through student ambassadors, creating local communities and fostering peer-to-peer learning experiences.'
  },
  {
    year: '2022',
    title: 'Global Expansion',
    description: 'Reached 50,000+ students across 75 countries worldwide.',
    icon: Globe,
    details: 'Established partnerships with leading universities and tech companies, creating a truly global ecosystem for innovation and learning.'
  },
  {
    year: '2023',
    title: 'Major Launch',
    description: 'Launched comprehensive certification programs and industry partnerships.',
    icon: Award,
    details: 'Introduced industry-recognized certifications and secured partnerships with Fortune 500 companies for internships and placements.'
  },
  {
    year: '2024',
    title: 'Innovation Hub',
    description: 'Opening state-of-the-art innovation labs and research centers.',
    icon: Trophy,
    details: 'Establishing physical innovation hubs in major tech cities, providing hands-on access to cutting-edge technology and research facilities.'
  }
];

export default function TimelineAbout() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-muted/20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Left Side - Intro */}
            <div className="lg:col-span-1">
              <div 
                className={`sticky top-24 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Our Journey
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  From a small team with big dreams to a global platform empowering 
                  thousands of students worldwide. Here's how we've grown and evolved 
                  to become a leading force in technology education.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">50,000+ Students Empowered</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">75+ Countries Reached</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">500+ Industry Partners</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Timeline */}
            <div className="lg:col-span-2">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20"></div>

                {/* Timeline Items */}
                <div className="space-y-12">
                  {milestones.map((milestone, index) => {
                    const Icon = milestone.icon;
                    return (
                      <div
                        key={milestone.year}
                        className={`relative flex items-start space-x-6 transition-all duration-700 ${
                          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                        }`}
                        style={{ transitionDelay: `${index * 200}ms` }}
                        onMouseEnter={() => setHoveredMilestone(index)}
                        onMouseLeave={() => setHoveredMilestone(null)}
                      >
                        {/* Timeline Marker */}
                        <div className="relative z-10 flex-shrink-0">
                          <div 
                            className={`w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center transition-all duration-300 ${
                              hoveredMilestone === index ? 'scale-110 shadow-lg' : 'scale-100'
                            }`}
                          >
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div 
                            className={`bg-background rounded-2xl border p-6 transition-all duration-300 ${
                              hoveredMilestone === index 
                                ? 'border-primary/30 shadow-lg scale-105' 
                                : 'border-border hover:border-primary/20'
                            }`}
                          >
                            <div className="flex items-center space-x-3 mb-3">
                              <span className="text-2xl font-bold text-primary">
                                {milestone.year}
                              </span>
                              <h3 className="text-xl font-semibold text-foreground">
                                {milestone.title}
                              </h3>
                            </div>
                            
                            <p className="text-muted-foreground mb-3 leading-relaxed">
                              {milestone.description}
                            </p>

                            {/* Tooltip Details */}
                            <div 
                              className={`overflow-hidden transition-all duration-300 ${
                                hoveredMilestone === index 
                                  ? 'max-h-32 opacity-100' 
                                  : 'max-h-0 opacity-0'
                              }`}
                            >
                              <div className="pt-3 border-t border-border/50">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {milestone.details}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}