"use client";

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Trophy, Rocket, Calendar, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const initiatives = [
  {
    id: 1,
    title: 'PPT Workshop',
    description: 'Master the art of creating compelling presentations. Learn advanced techniques, design principles, and storytelling methods.',
    image: 'https://images.pexels.com/photos/7688344/pexels-photo-7688344.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    icon: Users,
    stats: 'Available Now',
    badge: 'Workshop',
    href: '/workshops/ppt',
    features: ['Presentation Design', 'Storytelling Techniques', 'Professional Templates', 'Interactive Sessions'],
    isAvailable: true
  },
  {
    id: 2,
    title: 'Web Development Workshop',
    description: 'Coming Soon - Learn modern web development with React, Next.js, and cutting-edge technologies.',
    image: '/website-images/Coming-Soon.png',
    icon: Rocket,
    stats: 'Coming Soon',
    badge: 'Workshop',
    href: '#',
    features: ['Coming Soon', 'Stay Tuned', 'Exciting Content', 'Amazing Experience'],
    isAvailable: false
  },
  {
    id: 3,
    title: 'AI/ML Workshop',
    description: 'Coming Soon - Dive into artificial intelligence and machine learning fundamentals and applications.',
    image: '/website-images/Coming-Soon.png',
    icon: MapPin,
    stats: 'Coming Soon',
    badge: 'Workshop',
    href: '#',
    features: ['Coming Soon', 'Stay Tuned', 'Exciting Content', 'Amazing Experience'],
    isAvailable: false
  },
  {
    id: 4,
    title: 'Entrepreneurship Workshop',
    description: 'Coming Soon - Build your startup from idea to execution with expert guidance and mentorship.',
    image: '/website-images/Coming-Soon.png',
    icon: Trophy,
    stats: 'Coming Soon',
    badge: 'Workshop',
    href: '#',
    features: ['Coming Soon', 'Stay Tuned', 'Exciting Content', 'Amazing Experience'],
    isAvailable: false
  }
];

export default function InitiativesShowcase() {
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();
  const router = useRouter();

  const handleWorkshopClick = (initiative: any) => {
    if (initiative.isAvailable) {
      if (isSignedIn) {
        // Redirect to workshop page (will be built later)
        router.push(initiative.href);
      } else {
        // Open sign-in modal
        openSignIn();
      }
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="px-4 py-2 mb-6">
            Our Workshops
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Initiatives That{' '}
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Transform Lives
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed text-balance">
            Discover our flagship programs designed to empower students, foster innovation, 
            and build the next generation of technology leaders.
          </p>
        </div>

        {/* Workshop Cards - Full Image Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {initiatives.map((initiative) => (
            <div
              key={initiative.id}
              className="relative h-96 rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => handleWorkshopClick(initiative)}
            >
              {/* Full Background Image */}
              <Image
                src={initiative.image}
                alt={initiative.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Content Overlay - Only Button */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                {/* Button */}
                {initiative.isAvailable ? (
                  <Button 
                    className="w-full bg-white text-black hover:bg-white/90 font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWorkshopClick(initiative);
                    }}
                  >
                    Learn
                  </Button>
                ) : (
                  <Button 
                    disabled
                    className="w-full bg-white/20 text-white border border-white/30 hover:bg-white/20 font-medium cursor-not-allowed"
                  >
                    Coming Soon
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Events - Carousel Style */}
        <div className="max-w-7xl mx-auto mt-32">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Our Event Diaries</h3>
            <p className="text-muted-foreground text-lg">Experience our vibrant community through events and moments.</p>
          </div>

          {/* Event Media Carousel */}
          <div className="relative overflow-hidden">
            {/* Fade Effects */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none"></div>
            
            {/* Scrolling Container */}
            <div className="flex gap-6 animate-scroll">
              {/* First set of media */}
              <div className="flex gap-6 min-w-max">
                <div className="w-64 h-64 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src="/Event-images/img-1.jpeg"
                    alt="Event 1"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-64 h-64 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src="/Event-images/img-2.jpeg"
                    alt="Event 2"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-64 h-64 rounded-xl overflow-hidden flex-shrink-0">
                  <video
                    src="/Event-images/vid-1.mp4"
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-64 h-64 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src="/Event-images/img-3.jpeg"
                    alt="Event 3"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-64 h-64 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src="/Event-images/img-4.jpeg"
                    alt="Event 4"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-64 h-64 rounded-xl overflow-hidden flex-shrink-0">
                  <video
                    src="/Event-images/vid-2.mp4"
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-64 h-64 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src="/Event-images/img-5.jpg"
                    alt="Event 5"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-64 h-64 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src="/Event-images/img-6.JPG"
                    alt="Event 6"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-64 h-64 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src="/Event-images/img-7.jpg"
                    alt="Event 7"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="flex gap-6 min-w-max">
                <div className="w-64 h-64 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src="/Event-images/img-1.jpeg"
                    alt="Event 1"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-64 h-64 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src="/Event-images/img-2.jpeg"
                    alt="Event 2"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-64 h-64 rounded-xl overflow-hidden flex-shrink-0">
                  <video
                    src="/Event-images/vid-1.mp4"
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-64 h-64 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src="/Event-images/img-3.jpeg"
                    alt="Event 3"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-64 h-64 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src="/Event-images/img-4.jpeg"
                    alt="Event 4"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-64 h-64 rounded-xl overflow-hidden flex-shrink-0">
                  <video
                    src="/Event-images/vid-2.mp4"
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-64 h-64 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src="/Event-images/img-5.HEIC"
                    alt="Event 5"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-64 h-64 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src="/Event-images/img-6.JPG"
                    alt="Event 6"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-64 h-64 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src="/Event-images/img-7.HEIC"
                    alt="Event 7"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}