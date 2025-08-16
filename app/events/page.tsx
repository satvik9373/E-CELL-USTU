"use client";

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth, useClerk } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const upcomingEvents = [
  {
    id: 1,
    title: 'Startup Pitch Competition',
    description: 'Present your innovative ideas to industry experts and win funding opportunities.',
    date: 'March 15, 2024',
    time: '10:00 AM - 6:00 PM',
    location: 'Main Auditorium',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Competition',
    registrationOpen: true,
    price: 'Free',
    maxParticipants: 50
  },
  {
    id: 2,
    title: 'Entrepreneurship Workshop',
    description: 'Learn the fundamentals of starting and scaling a successful business.',
    date: 'March 22, 2024',
    time: '2:00 PM - 5:00 PM',
    location: 'Conference Hall A',
    image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Workshop',
    registrationOpen: true,
    price: '₹500',
    maxParticipants: 100
  },
  {
    id: 3,
    title: 'Investor Connect Meetup',
    description: 'Network with angel investors and venture capitalists looking for promising startups.',
    date: 'April 5, 2024',
    time: '6:00 PM - 9:00 PM',
    location: 'Innovation Hub',
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'Networking',
    registrationOpen: true,
    price: '₹1000',
    maxParticipants: 75
  }
];

const pastEvents = [
  {
    id: 4,
    title: 'Annual Innovation Summit 2023',
    description: 'Our flagship event featuring keynote speakers, startup exhibitions, and networking.',
    date: 'November 18-19, 2023',
    attendees: 500,
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
  },
  {
    id: 5,
    title: 'Tech Startup Bootcamp',
    description: 'Intensive 3-day program covering product development, marketing, and funding.',
    date: 'October 10-12, 2023',
    attendees: 150,
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
  }
];

export default function EventsPage() {
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();
  const { toast } = useToast();
  const router = useRouter();

  const handleEventClick = (eventTitle: string) => {
    if (isSignedIn) {
      // User is signed in - show eligible toast and redirect to success page
      toast({
        variant: "eligible" as any,
        title: "Eligible",
        description: "Wooho!! - You're eligible to get the passes",
      });
      
      // Redirect to success page after a short delay
      setTimeout(() => {
        router.push('/success');
      }, 1500);
    } else {
      // User is not signed in - show not eligible toast with login action
      toast({
        variant: "notEligible" as any,
        title: "Not Eligible", 
        description: "You're not eligible to book tickets. Kindly login and try again.",
        action: (
          <Button
            size="sm"
            variant="outline"
            onClick={() => openSignIn()}
            className="bg-white text-red-600 border-white hover:bg-white/90"
          >
            Login
          </Button>
        ),
      });
    }
  };
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-24 bg-gradient-to-br from-primary/5 via-transparent to-primary/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="px-4 py-2 mb-6">
              Events & Programs
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Join Our{' '}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Events
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance max-w-3xl mx-auto">
              Discover opportunities to learn, network, and grow through our carefully curated 
              events designed for aspiring entrepreneurs and innovators.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#142257' }}>
              Upcoming Events
            </h2>
            <p className="text-lg text-muted-foreground">
              Don't miss these exciting opportunities to connect, learn, and grow.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-0 lg:py-0">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* PPT Workshop */}
            <div 
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer"
              onClick={() => handleEventClick('PPT Workshop')}
            >
              <div className="aspect-[3/4] relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
                <img
                  src="/Images/about-us.png"
                  alt="PPT Workshop"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    PPT Workshop
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-white/90 text-sm">Learn presentation skills</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-white/90 text-sm">Get Passes</span>
                      <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pitching Event */}
            <div 
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer"
              onClick={() => handleEventClick('Pitching Event')}
            >
              <div className="aspect-[3/4] relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
                <img
                  src="/Images/e-cell-logo.jpeg"
                  alt="Pitching Event"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Pitching Event
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-white/90 text-sm">Present your ideas</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-white/90 text-sm">Get Passes</span>
                      <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Innovation Summit */}
            <div 
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer"
              onClick={() => handleEventClick('Innovation Summit')}
            >
              <div className="aspect-[3/4] relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
                <img
                  src="/Images/Aarush.png"
                  alt="Innovation Summit"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Innovation Summit
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-white/90 text-sm">Annual flagship event</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-white/90 text-sm">Get Passes</span>
                      <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Want to Host an Event?
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Have an idea for an event that could benefit our entrepreneurship community? 
              We'd love to hear from you and help make it happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/contact">
                  Propose an Event
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/programs">
                  View All Programs
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}