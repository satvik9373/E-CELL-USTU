"use client";

import { useEffect, useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useAuth, useClerk } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { supabase, Database } from '@/lib/supabaseClient';

type Event = Database['public']['Tables']['events']['Row'];
type EventWithBookingStatus = {
  id: string;
  image_url: string;
  ticket_count?: number;
  user_has_ticket?: boolean;
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventWithBookingStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingEventId, setBookingEventId] = useState<string | null>(null);
  const { isSignedIn, userId: clerkUserId } = useAuth();
  const { openSignIn } = useClerk();
  const { toast } = useToast();
  const router = useRouter();

  // Load events from Supabase
  useEffect(() => {
    async function loadEvents() {
      try {
        console.log('🔄 Loading events from Supabase...');
        
        // Fetch all events
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('id, image_url')
          .order('created_at', { ascending: false });

        if (eventsError) {
          console.error('Error fetching events:', eventsError);
          throw eventsError;
        }

        console.log('📅 Fetched events:', eventsData);

        if (!eventsData) {
          setEvents([]);
          return;
        }

        // If user is logged in, check which events they've booked and get ticket counts
        let eventsWithStatus: EventWithBookingStatus[] = eventsData;

        if (clerkUserId) {
          // Get user's tickets
          const { data: userTickets } = await supabase
            .from('tickets')
            .select('event_id')
            .eq('user_id', clerkUserId);

          const userEventIds = new Set(userTickets?.map(t => t.event_id) || []);

          // Get ticket counts for each event
          const eventsWithCounts = await Promise.all(
            eventsData.map(async (event) => {
              const { count } = await supabase
                .from('tickets')
                .select('*', { count: 'exact', head: true })
                .eq('event_id', event.id);

              return {
                ...event,
                ticket_count: count || 0,
                user_has_ticket: userEventIds.has(event.id),
              };
            })
          );

          eventsWithStatus = eventsWithCounts;
        } else {
          // Just get ticket counts without user status
          const eventsWithCounts = await Promise.all(
            eventsData.map(async (event) => {
              const { count } = await supabase
                .from('tickets')
                .select('*', { count: 'exact', head: true })
                .eq('event_id', event.id);

              return {
                ...event,
                ticket_count: count || 0,
                user_has_ticket: false,
              };
            })
          );

          eventsWithStatus = eventsWithCounts;
        }

        setEvents(eventsWithStatus);
        console.log('✅ Events loaded with status:', eventsWithStatus);
        
      } catch (error) {
        console.error('Error loading events:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load events. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, [clerkUserId, toast]);

  // Subscribe to real-time events updates
  useEffect(() => {
    console.log('🔄 Setting up real-time subscription for events...');
    
    const subscription = supabase
      .channel('events_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events'
        },
        (payload) => {
          console.log('🔄 Events table changed:', payload);
          // Refetch events when table changes
          window.location.reload(); // Simple approach for now
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Handle event booking
  const handleBookEvent = async (event: EventWithBookingStatus) => {
    if (!isSignedIn) {
      toast({
        variant: "destructive",
        title: "Login Required", 
        description: "Please sign in to book tickets for events.",
        action: (
          <Button
            size="sm"
            variant="outline"
            onClick={() => openSignIn()}
            className="bg-white text-red-600 border-white hover:bg-white/90"
          >
            Sign In
          </Button>
        ),
      });
      return;
    }

    if (!clerkUserId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Authentication error. Please try signing in again.",
      });
      return;
    }

    // Check if user already has a ticket
    if (event.user_has_ticket) {
      toast({
        variant: "destructive",
        title: "Already Booked",
        description: "You already have a ticket for this event.",
      });
      return;
    }

    // Start booking process
    setBookingEventId(event.id);

    try {
      console.log('🎫 Booking ticket for event:', event.id, 'user:', clerkUserId);

      // First ensure user exists in users table
      const { error: userError } = await supabase
        .from('users')
        .upsert({
          id: clerkUserId,
          email: null, // We'll get this from Clerk if needed
        }, {
          onConflict: 'id'
        });

      if (userError) {
        console.error('Error ensuring user exists:', userError);
      }

      // Insert ticket
      const { data: ticket, error: ticketError } = await supabase
        .from('tickets')
        .insert({
          user_id: clerkUserId,
          event_id: event.id,
          status: 'RESERVED',
        })
        .select()
        .single();

      if (ticketError) {
        console.error('Error booking ticket:', ticketError);
        
        // Handle duplicate booking
        if (ticketError.code === '23505') {
          toast({
            variant: "destructive",
            title: "Already Booked",
            description: "You already have a ticket for this event.",
          });
          return;
        }
        
        throw ticketError;
      }

      console.log('✅ Ticket booked successfully:', ticket);
      
      // Success - show toast and redirect
      toast({
        variant: "default",
        title: "Ticket Booked!",
        description: "Your ticket has been reserved successfully. Redirecting to download...",
      });

      // Store event data for success page (simplified)
      sessionStorage.setItem('selectedEvent', JSON.stringify({
        id: event.id,
        title: 'Event', // Default since we don't have title anymore
        venue: 'Venue TBA', // Default since we don't have venue anymore
        date: new Date().toISOString(), // Use current date as fallback
        ticketId: ticket.id,
      }));

      // Update events list to reflect booking
      setEvents(prev => prev.map(e => 
        e.id === event.id 
          ? { ...e, user_has_ticket: true, ticket_count: (e.ticket_count || 0) + 1 }
          : e
      ));

      // Redirect to success page
      setTimeout(() => {
        router.push('/success');
      }, 1500);

    } catch (error: any) {
      console.error('Booking error:', error);
      
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: "Failed to book ticket. Please try again.",
      });
    } finally {
      setBookingEventId(null);
    }
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
              Discover Amazing Events
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our vibrant community of entrepreneurs and innovators. Explore upcoming workshops, 
              competitions, and networking events designed to accelerate your startup journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-3">
                Browse Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              {!isSignedIn && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-3"
                  onClick={() => openSignIn()}
                >
                  Sign In to Book
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          {events.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-muted-foreground mb-4">
                No events found
              </h3>
              <p className="text-muted-foreground">
                Check back soon for upcoming events and workshops!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Event Image */}
                  {event.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={event.image_url}
                        alt="Event"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    {/* Booking Button */}
                    <div className="flex flex-col gap-2">
                      {event.user_has_ticket ? (
                        <Button
                          disabled
                          className="w-full bg-green-600 hover:bg-green-600"
                        >
                          ✓ Ticket Booked
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleBookEvent(event)}
                          disabled={bookingEventId === event.id}
                          className="w-full group-hover:bg-primary/90 transition-colors"
                        >
                          {bookingEventId === event.id ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Booking...
                            </div>
                          ) : (
                            <>
                              Book Free Ticket
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      )}
                      
                      {!isSignedIn && (
                        <p className="text-xs text-muted-foreground text-center">
                          Sign in required to book tickets
                        </p>
                      )}
                    </div>
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
