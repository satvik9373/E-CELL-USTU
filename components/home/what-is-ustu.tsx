"use client";

import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function WhatIsUSTU() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-8">
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

        {/* Simple Image Section */}
        <div className="mt-16 flex justify-center">
          <div className="relative w-full max-w-4xl">
            <Image
              src="/website-images/what-is-ecell.png"
              alt="What is E-Cell USTU"
              width={800}
              height={500}
              className="w-full h-auto rounded-2xl"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}