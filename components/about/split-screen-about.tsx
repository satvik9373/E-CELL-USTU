"use client";

import { useState } from 'react';
import { Lightbulb, Users, Trophy, Rocket, Globe, Heart } from 'lucide-react';

const flipCards = [
  {
    id: 1,
    front: {
      icon: Lightbulb,
      title: 'Innovation'
    },
    back: {
      title: 'Innovation First',
      description: 'We pioneer cutting-edge educational methodologies and embrace emerging technologies to create transformative learning experiences.'
    }
  },
  {
    id: 2,
    front: {
      icon: Users,
      title: 'Impact'
    },
    back: {
      title: 'Global Impact',
      description: 'Our programs have empowered over 50,000 students across 75 countries, creating a ripple effect of positive change worldwide.'
    }
  },
  {
    id: 3,
    front: {
      icon: Trophy,
      title: 'Excellence'
    },
    back: {
      title: 'Pursuit of Excellence',
      description: 'We maintain the highest standards in education, partnerships, and student outcomes, ensuring world-class quality in everything we do.'
    }
  },
  {
    id: 4,
    front: {
      icon: Heart,
      title: 'Community'
    },
    back: {
      title: 'Vibrant Community',
      description: 'We foster meaningful connections between students, educators, and industry professionals, building lifelong networks of support and collaboration.'
    }
  }
];

export default function SplitScreenAbout() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const handleCardFlip = (cardId: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Mission Statement */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                  About Universal Skill Tech University
                </h2>
                
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    We are more than an educational institution—we are a catalyst for 
                    transformation in the technology landscape. Our mission is to democratize 
                    access to world-class tech education and create pathways for innovation 
                    that transcend traditional boundaries.
                  </p>
                  
                  <p>
                    Through our comprehensive ecosystem of programs, summits, and partnerships, 
                    we empower students to become the leaders, innovators, and changemakers 
                    that our rapidly evolving world needs.
                  </p>
                  
                  <p>
                    From virtual classrooms connecting global minds to hands-on innovation 
                    labs fostering practical skills, we bridge the gap between academic 
                    learning and real-world application.
                  </p>
                </div>
              </div>

              {/* Mission Highlights */}
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-muted/50 border">
                  <div className="text-2xl font-bold text-primary mb-1">50K+</div>
                  <div className="text-sm text-muted-foreground">Students Empowered</div>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border">
                  <div className="text-2xl font-bold text-primary mb-1">75+</div>
                  <div className="text-sm text-muted-foreground">Countries Reached</div>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border">
                  <div className="text-2xl font-bold text-primary mb-1">500+</div>
                  <div className="text-sm text-muted-foreground">Industry Partners</div>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border">
                  <div className="text-2xl font-bold text-primary mb-1">95%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Right Side - Flip Cards Grid */}
            <div className="grid grid-cols-2 gap-6">
              {flipCards.map((card) => {
                const Icon = card.front.icon;
                const isFlipped = flippedCards.has(card.id);
                
                return (
                  <div
                    key={card.id}
                    className="relative h-48 cursor-pointer group perspective-1000"
                    onClick={() => handleCardFlip(card.id)}
                  >
                    <div 
                      className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                        isFlipped ? 'rotate-y-180' : ''
                      }`}
                    >
                      {/* Front of Card */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-background border shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center p-6 group-hover:scale-105">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground text-center">
                          {card.front.title}
                        </h3>
                        <div className="mt-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                          Click to learn more
                        </div>
                      </div>

                      {/* Back of Card */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg flex flex-col justify-center p-6 text-white">
                        <h4 className="text-lg font-semibold mb-3 text-center">
                          {card.back.title}
                        </h4>
                        <p className="text-sm leading-relaxed text-center text-white/90">
                          {card.back.description}
                        </p>
                        <div className="mt-3 text-xs text-white/70 text-center">
                          Click to flip back
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
    </section>
  );
}