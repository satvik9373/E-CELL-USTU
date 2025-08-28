"use client";

import { useEffect, useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Download, Ticket, Users } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { supabase, Database } from '@/lib/supabaseClient';

type Ticket = Database['public']['Tables']['tickets']['Row'];
type Event = Database['public']['Tables']['events']['Row'];
type TicketWithEvent = Ticket & {
  event: Event;
};

export default function TicketDashboard() {
  const [tickets, setTickets] = useState<TicketWithEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { isSignedIn, userId: clerkUserId } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  // Redirect if not signed in
  useEffect(() => {
    if (!isSignedIn) {
      router.push('/');
      return;
    }
  }, [isSignedIn, router]);

  // Load user's tickets from Supabase
  useEffect(() => {
    async function loadUserTickets() {
      if (!clerkUserId) return;

      try {
        console.log('🔄 Loading user tickets from Supabase...');
        
        const { data: ticketsData, error: ticketsError } = await supabase
          .from('tickets')
          .select(`
            *,
            event:events(id, image_url)
          `)
          .eq('user_id', clerkUserId)
          .order('created_at', { ascending: false });

        if (ticketsError) {
          console.error('Error fetching tickets:', ticketsError);
          throw ticketsError;
        }

        console.log('🎫 Fetched user tickets:', ticketsData);
        setTickets(ticketsData || []);
        
      } catch (error) {
        console.error('Error loading tickets:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load your tickets. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    }

    if (clerkUserId) {
      loadUserTickets();
    }
  }, [clerkUserId, toast]);

  // Subscribe to real-time ticket updates
  useEffect(() => {
    if (!clerkUserId) return;

    console.log('🔄 Setting up real-time subscription for user tickets...');
    
    const subscription = supabase
      .channel('user_tickets_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tickets',
          filter: `user_id=eq.${clerkUserId}`
        },
        (payload) => {
          console.log('🔄 User tickets table changed:', payload);
          // Refetch tickets when user's tickets change
          window.location.reload(); // Simple approach for now
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [clerkUserId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RESERVED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownloadTicket = (ticket: TicketWithEvent) => {
    // Store ticket data and redirect to success page for download
    sessionStorage.setItem('selectedEvent', JSON.stringify({
      id: ticket.event.id,
      title: 'Event', // Default since we don't have title anymore
      venue: 'Venue TBA', // Default since we don't have venue anymore  
      date: ticket.created_at, // Use ticket creation date as fallback
      ticketId: ticket.id,
    }));
    
    router.push('/success');
  };

  const handleCancelTicket = async (ticketId: string) => {
    try {
      console.log('🗑️ Cancelling ticket:', ticketId);
      
      const { error } = await supabase
        .from('tickets')
        .update({ status: 'CANCELLED' })
        .eq('id', ticketId)
        .eq('user_id', clerkUserId);

      if (error) {
        console.error('Error cancelling ticket:', error);
        throw error;
      }

      // Update local state
      setTickets(prev => prev.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, status: 'CANCELLED' as any }
          : ticket
      ));

      toast({
        variant: "default",
        title: "Ticket Cancelled",
        description: "Your ticket has been cancelled successfully.",
      });

    } catch (error) {
      console.error('Error cancelling ticket:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to cancel ticket. Please try again.",
      });
    }
  };

  if (!isSignedIn) {
    return null; // Will redirect in useEffect
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-950 dark:to-neutral-900">
        <Header />
        <div className="pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#142257] mx-auto"></div>
              <p className="mt-4 text-lg text-muted-foreground">Loading your tickets...</p>
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
      
      {/* Header Section */}
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-24 bg-gradient-to-br from-primary/5 via-transparent to-primary/10">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="px-4 py-2 mb-6">
              <Ticket className="h-4 w-4 mr-2" />
              My Tickets
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Your Event Tickets
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Manage your reserved tickets, download them, and stay updated with your upcoming events.
            </p>
          </div>
        </div>
      </section>

      {/* Tickets Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          {tickets.length === 0 ? (
            <div className="text-center py-16">
              <Ticket className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-muted-foreground mb-4">
                No tickets yet
              </h3>
              <p className="text-muted-foreground mb-6">
                You haven&apos;t booked any events yet. Explore our upcoming events!
              </p>
              <Button onClick={() => router.push('/events')}>
                Browse Events
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tickets.map((ticket) => (
                <Card key={ticket.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                      <Badge variant="outline" className={getEventStatusColor(ticket.event.status)}>
                        {ticket.event.status}
                      </Badge>
                    </div>
                    
                    <CardTitle className="line-clamp-2">
                      Event Ticket
                    </CardTitle>
                    
                    <CardDescription className="line-clamp-2">
                      Your reserved ticket for this event
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Event Image */}
                    {ticket.event.image_url && (
                      <div className="aspect-video overflow-hidden rounded-lg mb-4">
                        <img
                          src={ticket.event.image_url}
                          alt="Event"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Ticket Info */}
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Ticket ID: <span className="font-mono">{ticket.id.slice(0, 8)}...</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Booked: {formatDate(ticket.created_at)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 pt-2">
                      {ticket.status === 'RESERVED' && (
                        <>
                          <Button
                            onClick={() => handleDownloadTicket(ticket)}
                            className="w-full"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Ticket
                          </Button>
                          
                          <Button
                            variant="outline"
                            onClick={() => handleCancelTicket(ticket.id)}
                            className="w-full text-red-600 border-red-200 hover:bg-red-50"
                          >
                            Cancel Ticket
                          </Button>
                        </>
                      )}
                      
                      {ticket.status === 'CANCELLED' && (
                        <Button disabled className="w-full">
                          Ticket Cancelled
                        </Button>
                      )}
                      
                      {ticket.status === 'CONFIRMED' && (
                        <Button disabled className="w-full bg-blue-600 hover:bg-blue-600">
                          ✓ Confirmed
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
