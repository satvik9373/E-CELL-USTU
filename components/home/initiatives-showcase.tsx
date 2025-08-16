"use client";

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Trophy, Rocket, Calendar, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const initiatives = [
  {
    id: 1,
    title: 'Campus Ambassadors',
    description: 'Lead tech innovation at your university. Build communities, organize events, and connect with like-minded peers across the globe.',
    image: 'https://images.pexels.com/photos/7688344/pexels-photo-7688344.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    icon: Users,
    stats: '2,500+ Ambassadors',
    badge: 'Leadership Program',
    href: '/programs/ambassadors',
    features: ['Monthly Workshops', 'Networking Events', 'Certification Program', 'Mentorship Access']
  },
  {
    id: 2,
    title: 'Innovation Summit',
    description: 'The flagship event bringing together visionary speakers, cutting-edge workshops, and the next generation of tech innovators.',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    icon: Rocket,
    stats: '25,000+ Attendees',
    badge: 'Annual Event',
    href: '/summit',
    features: ['World-Class Speakers', 'Tech Exhibitions', 'Startup Pitches', 'Networking Sessions']
  },
  {
    id: 3,
    title: 'Summit Chapters',
    description: 'Local communities driving tech education forward. Experience hands-on learning through regional events and collaborative projects.',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    icon: MapPin,
    stats: '150+ Chapters',
    badge: 'Community Initiative',
    href: '/programs/chapters',
    features: ['Local Meetups', 'Skill Development', 'Project Collaborations', 'Industry Connections']
  },
  {
    id: 4,
    title: 'Tech Competitions',
    description: 'Showcase your skills and compete with the best minds in technology. From hackathons to innovation challenges.',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    icon: Trophy,
    stats: '$100K+ Prizes',
    badge: 'Competitions',
    href: '/programs/competitions',
    features: ['Hackathons', 'Innovation Challenges', 'Startup Competitions', 'Skill Contests']
  }
];

const upcomingEvents = [
  {
    title: 'AI Workshop Series',
    date: 'Jan 25, 2024',
    time: '2:00 PM IST',
    type: 'Workshop'
  },
  {
    title: 'Startup Pitch Night',
    date: 'Feb 10, 2024',
    time: '6:00 PM IST',
    type: 'Competition'
  },
  {
    title: 'Innovation Summit 2024',
    date: 'Mar 15-17, 2024',
    time: 'All Day',
    type: 'Summit'
  }
];

export default function InitiativesShowcase() {
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

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {initiatives.map((initiative) => {
            const Icon = initiative.icon;
            return (
              <div
                key={initiative.id}
                className="group bg-background rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 overflow-hidden"
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={initiative.image}
                    alt={initiative.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Icon */}
                  <div className="absolute bottom-4 left-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1">
                    {initiative.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                    {initiative.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-1 mb-4">
                    {initiative.features.slice(0, 2).map((feature) => (
                      <div key={feature} className="flex items-center text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button asChild size="sm" className="w-full text-xs group/btn">
                    <Link href={initiative.href}>
                      Explore More
                      <ArrowRight className="h-3 w-3 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Upcoming Events - Ticket Style */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Upcoming Events</h3>
            <p className="text-muted-foreground text-lg">Don't miss these exciting opportunities to connect and learn.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="group bg-background border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300 relative"
              >
                {/* Left semi-circular cutouts */}
                <div className="hidden md:block absolute left-0 top-2 w-4 h-8 bg-background rounded-r-full border border-border border-l-0 z-10"></div>
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-background rounded-r-full border border-border border-l-0 z-10"></div>
                <div className="hidden md:block absolute left-0 bottom-2 w-4 h-8 bg-background rounded-r-full border border-border border-l-0 z-10"></div>
                {/* Right triangular cutouts */}
                <div className="hidden md:block absolute right-0 top-4 w-0 h-0 border-l-[8px] border-l-background border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent z-10"></div>
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[8px] border-l-background border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent z-10"></div>
                <div className="hidden md:block absolute right-0 bottom-4 w-0 h-0 border-l-[8px] border-l-background border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent z-10"></div>
                {/* Additional smaller triangular cutouts for more detail */}
                <div className="hidden md:block absolute right-0 top-8 w-0 h-0 border-l-[6px] border-l-background border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent z-10"></div>
                <div className="hidden md:block absolute right-0 bottom-8 w-0 h-0 border-l-[6px] border-l-background border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent z-10"></div>

                {/* Mobile: Stacked Layout */}
                <div className="block md:hidden">
                  {/* Image Section - Mobile */}
                  <div className="relative h-36 bg-gradient-to-br from-primary/10 to-primary/5">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Calendar className="h-12 w-12 text-primary/30" />
                    </div>
                    {/* Event Type Badge */}
                    <div className="absolute top-3 right-3">
                      <div className="px-2 py-1 bg-primary/10 rounded-md">
                        <span className="text-xs font-medium text-primary">{event.type}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section - Mobile */}
                  <div className="p-5">
                    <h4 className="font-bold text-foreground mb-2 text-base leading-tight">
                      {event.title}
                    </h4>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2 text-primary" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop: Ticket Layout */}
                <div className="hidden md:flex h-28">
                  {/* Left Section - Image Area (40%) */}
                  <div className="relative w-2/5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-l-2xl flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-primary/40" />
                    {/* Event Type Badge */}
                    <div className="absolute top-2 right-2">
                      <div className="px-2 py-1 bg-primary/15 rounded text-xs font-medium text-primary">
                        {event.type}
                      </div>
                    </div>
                  </div>

                  {/* Dotted Tear Line */}
                  <div className="relative w-px">
                    <div className="absolute inset-0 border-l-2 border-dotted border-border"></div>
                    {/* Ticket holes */}
                    <div className="absolute -top-2 -left-1 w-2 h-2 bg-muted/30 rounded-full"></div>
                    <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-2 h-2 bg-muted/30 rounded-full"></div>
                    <div className="absolute -bottom-2 -left-1 w-2 h-2 bg-muted/30 rounded-full"></div>
                  </div>

                  {/* Right Section - Event Details (60%) */}
                  <div className="flex-1 p-5 rounded-r-2xl flex flex-col justify-center">
                    <h4 className="font-bold text-foreground mb-2 text-base leading-tight line-clamp-1">
                      {event.title}
                    </h4>
                    
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                        <span className="truncate">{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                        <span className="truncate">{event.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" asChild className="px-6 py-3">
              <Link href="/events">
                View All Events
                <Calendar className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}