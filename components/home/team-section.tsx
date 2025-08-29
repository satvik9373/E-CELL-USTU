"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Linkedin, Twitter, Mail, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const teamMembers = [
  {
    id: 1,
    name: 'Pradyut',
    role: 'President',
    image: '/Images/Pradyut.png',
    social: {
      linkedin: 'https://www.linkedin.com/in/prxdyut/',
      email: 'daspradyut516@gmail.com'
    }
  },
  {
    id: 2,
    name: 'Satvik',
    role: 'Secretary',
    image: '/Images/Satvik.png',
    social: {
      linkedin: 'https://www.linkedin.com/in/satviik',
      email: 'satvikchaturvedi8989@gmail.com'
    }
  },
  {
    id: 3,
    name: 'Aarush',
    role: 'Technical Head',
    image: '/Images/Aarush.png',
    social: {
      linkedin: 'https://www.linkedin.com/in/aarush-yadav-59868b32a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      email: 'aarushdineshyadav@gmail.com'
    }
  },
  {
    id: 4,
    name: 'Pratham',
    role: 'Media Head',
    image: '/Images/Pratham.png',
    social: {
      linkedin: 'http://www.linkedin.com/in/pratham-kulkarni-a68870326',
      email: 'shlokkulkarni06@hmail.com'
    }
  },
  {
    id: 5,
    name: 'Sowptick',
    role: 'Creative Head',
    image: '/Images/Sowptick.png',
    social: {
      linkedin: 'https://www.linkedin.com/in/sowptick-debnath-368541275?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      email: 'sowptick02@gmail.com'
    }
  },
  {
    id: 6,
    name: 'Divyanshu',
    role: 'Design Head',
    image: '/Images/Divyanshu.png',
    social: {
      linkedin: 'https://www.linkedin.com/in/divyanshu-upadhyay-190ab4324?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      email: 'divyanshu51015@gmail.com'
    }
  },
  {
    id: 7,
    name: 'Rohan',
    role: 'Overall Coordinator',
    image: '/Images/Rohan.png',
    social: {
      linkedin: 'https://www.linkedin.com/in/rohan-ram-prasad?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      email: 'rohan.prasad@ustu.edu.in'
    }
  },
  {
    id: 8,
    name: 'Swara',
    role: 'Operations Head',
    image: '/Images/Swara.png',
    social: {
      linkedin: 'https://www.linkedin.com/in/swara-lakade%E2%9C%A8-4ba941337?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      email: 'swara.lakade@gmail.com'
    }
  }
];

export default function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Create continuous loop by duplicating items
  const extendedMembers = [...teamMembers, ...teamMembers, ...teamMembers];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="px-4 py-2 mb-6">
            Our Team
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Meet The{' '}
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Visionaries
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed text-balance">
            Our diverse team of educators, technologists, and innovators is dedicated to 
            transforming how the world learns and builds technology.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full overflow-hidden py-8">
          {/* Fade overlays - Hidden on mobile */}
          <div className="hidden md:block absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none"></div>
          <div className="hidden md:block absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none"></div>
          
          {/* Carousel Track */}
          <div 
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex + teamMembers.length) * 320}px)`,
              width: `${extendedMembers.length * 320}px`
            }}
          >
            {extendedMembers.map((member, index) => (
              <div
                key={`${member.id}-${Math.floor(index / teamMembers.length)}`}
                className="flex-shrink-0 w-80 mx-4"
              >
                {/* Team Card */}
                <div className="group relative overflow-hidden rounded-3xl h-[320px] my-4">
                  {/* Image */}
                  <div className="relative h-full overflow-hidden flex items-center justify-center">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                    
                    {/* Social Links - Always visible on card */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
                      <a
                        href={member.social.linkedin}
                        className="p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-primary hover:text-white transition-all shadow-md"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                      <a
                        href={`mailto:${member.social.email}`}
                        className="p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-primary hover:text-white transition-all shadow-md"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsor CTA */}
        <div className="max-w-2xl mx-auto text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border mt-16">
          <h3 className="text-xl font-semibold text-foreground mb-3">
            Want to Become Our Sponsor?
          </h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Partner with us to empower the next generation of entrepreneurs and innovators. 
            Join leading companies in supporting cutting-edge education and startup development.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/sponsors">
                Explore More
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}