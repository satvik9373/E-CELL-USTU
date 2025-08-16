"use client";

import { useUser, useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Download, CheckCircle, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Install canvas-confetti: npm install canvas-confetti @types/canvas-confetti
import confetti from 'canvas-confetti';
import { TicketGenerator } from '@/lib/ticket-generator';

export default function SuccessPage() {
  const { user } = useUser();
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(true);
  const [ticketId, setTicketId] = useState('');
  const [eventName, setEventName] = useState('Event');

  // Generate consistent ticket ID function
  const generateConsistentTicketId = (userId: string, eventName: string) => {
    const str = userId + eventName;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return 'TKT-' + Math.abs(hash).toString(36).toUpperCase().substr(0, 8);
  };

  useEffect(() => {
    // Redirect if not signed in
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
      return;
    }

    if (isSignedIn && user) {
      // Get event name from URL
      const urlParams = new URLSearchParams(window.location.search);
      const event = urlParams.get('event') || 'Event';
      setEventName(event);

      // Generate consistent ticket ID
      const consistentTicketId = generateConsistentTicketId(user.id, event);
      setTicketId(consistentTicketId);
    }

    // Trigger confetti animation
    const triggerConfetti = () => {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 }
      };

      function fire(particleRatio: number, opts: any) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ['#142257', '#F5E9D7', '#FFD700']
      });

      fire(0.2, {
        spread: 60,
        colors: ['#142257', '#F5E9D7', '#FFD700']
      });

      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        colors: ['#142257', '#F5E9D7', '#FFD700']
      });

      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
        colors: ['#142257', '#F5E9D7', '#FFD700']
      });

      fire(0.1, {
        spread: 120,
        startVelocity: 45,
        colors: ['#142257', '#F5E9D7', '#FFD700']
      });
    };

    // Trigger confetti after component mounts
    if (isSignedIn) {
      setTimeout(triggerConfetti, 500);
      setTimeout(() => setIsAnimating(false), 3000);
    }

    // Auto-download ticket PDF
    const downloadTicket = () => {
      if (!user || !ticketId) return;

      try {
        const ticketGenerator = new TicketGenerator(eventName);
        
        const ticketData = {
          ticketId,
          eventName,
          attendeeName: `${user.firstName} ${user.lastName}`,
          attendeeEmail: user.emailAddresses[0]?.emailAddress || '',
          eventDate: 'Coming Soon',
          eventVenue: 'USTU Campus'
        };
        
        ticketGenerator.downloadTicket(ticketData);
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    };

    if (isSignedIn && user) {
      // Don't auto-download here, we'll do it in a separate useEffect
    }
  }, [isSignedIn, isLoaded, user, router, generateConsistentTicketId]);

  // Separate useEffect for auto-download when ticket ID is ready
  useEffect(() => {
    if (isSignedIn && user && ticketId) {
      setTimeout(() => {
        const autoDownloadTicket = () => {
          try {
            const ticketGenerator = new TicketGenerator(eventName);
            
            const ticketData = {
              ticketId,
              eventName,
              attendeeName: `${user.firstName} ${user.lastName}`,
              attendeeEmail: user.emailAddresses[0]?.emailAddress || '',
              eventDate: 'TBD',
              eventVenue: 'USTU Campus'
            };
            
            ticketGenerator.downloadTicket(ticketData);
          } catch (error) {
            console.error('Error auto-downloading ticket:', error);
          }
        };
        
        autoDownloadTicket();
      }, 1000);
    }
  }, [ticketId, isSignedIn, user, eventName]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#142257]"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return null; // Will redirect
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-950 dark:to-neutral-900">
      <Header />
      
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Success Animation */}
            <div className={`mb-8 transition-all duration-1000 ${isAnimating ? 'scale-110 opacity-80' : 'scale-100 opacity-100'}`}>
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6 animate-bounce" />
            </div>

            {/* Main Heading */}
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up"
              style={{ color: '#142257' }}
            >
              Congratulations, {user?.firstName || 'Guest'}!
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-12 animate-fade-in-up animation-delay-200">
              Your tickets for the event have been booked successfully. Mark the dates on your calendar.
            </p>

            {/* Ticket Preview Box */}
            <Card className="max-w-2xl mx-auto mb-8 shadow-2xl border-2 border-[#142257]/20 animate-fade-in-up animation-delay-400">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Ticket className="h-8 w-8 text-[#142257]" />
                    <div>
                      <h3 className="text-xl font-bold text-[#142257]">E-Cell Event Ticket</h3>
                      <p className="text-sm text-gray-600">Premium Access</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Ticket ID</p>
                    <p className="font-mono text-sm font-bold text-[#142257]">
                      #{ticketId}
                    </p>
                  </div>
                </div>

                <div className="border-t-2 border-dashed border-gray-300 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Attendee</p>
                      <p className="font-semibold text-[#142257]">
                        {user?.firstName} {user?.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Event Date</p>
                      <p className="font-semibold text-[#142257]">Coming Soon</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Venue</p>
                      <p className="font-semibold text-[#142257]">USTU Campus</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-[#142257]/10 rounded-lg">
                  <div className="flex items-center justify-center space-x-2">
                    <Download className="h-5 w-5 text-[#142257]" />
                    <span className="text-sm font-medium text-[#142257]">
                      Ticket PDF downloaded automatically
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-600">
              <Button 
                onClick={() => {
                  const event = new Date();
                  event.setDate(event.getDate() + 30); // 30 days from now
                  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=E-Cell%20Event&dates=${event.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${event.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=E-Cell%20Event%20Ticket&location=USTU%20Campus`;
                  window.open(googleCalendarUrl, '_blank');
                }}
                className="bg-[#142257] hover:bg-[#142257]/90 text-white px-8 py-3"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Add to Calendar
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => router.push('/events')}
                className="border-[#142257] text-[#142257] hover:bg-[#142257] hover:text-white px-8 py-3"
              >
                Back to Events
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
      `}</style>
    </main>
  );
}
