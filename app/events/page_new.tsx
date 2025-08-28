"use client";

import { useEffect, useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { useAuth, useClerk } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface DatabaseEvent {
  id: string;
  title: string;
  description: string | null;
  venue: string | null;
  starts_at: string | null;
  created_at: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<DatabaseEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();
  const { toast } = useToast();
  const router = useRouter();

  // Fetch events from database
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        
        if (data.events) {
          setEvents(data.events);
          console.log('📅 Loaded events from database:', data.events);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event: DatabaseEvent) => {
    if (isSignedIn) {
      // User is signed in - show eligible toast and redirect to success page
      toast({
        variant: "eligible" as any,
        title: "Eligible",
        description: "Wooho!! - You're eligible to get the passes",
      });
      
      // Store the selected event in sessionStorage for the success page
      sessionStorage.setItem('selectedEvent', JSON.stringify({
        id: event.id,
        title: event.title,
        venue: event.venue,
        date: event.starts_at
      }));
      
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string | null) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-950 dark:to-neutral-900">
        <Header />
        <div className="pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#142257] mx-auto"></div>
              <p className="mt-4 text-lg text-muted-foreground">Loading events...</p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

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
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
              Discover opportunities to learn, network, and grow through our carefully 
              curated events designed for aspiring entrepreneurs and innovators.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-muted-foreground">
              Don't miss these exciting opportunities to connect, learn, and grow.
            </p>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Events Available</h3>
              <p className="text-muted-foreground">Check back soon for exciting upcoming events!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="group bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">
                        Event
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {event.description || 'Join us for this exciting event!'}
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(event.starts_at)}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        {formatTime(event.starts_at)}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.venue || 'USTU Campus'}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full group-hover:bg-primary/90 transition-colors"
                      onClick={() => handleEventClick(event)}
                    >
                      Get Passes
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
