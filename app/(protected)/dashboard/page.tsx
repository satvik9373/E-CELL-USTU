"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Ticket, Calendar, User, TrendingUp } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

type Ticket = {
  id: string;
  status: string;
  created_at: string;
  event: {
    id: string;
    image_url: string;
  };
};

export default function DashboardPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [mounted, setMounted] = useState(false);
  const { isSignedIn, userId: clerkUserId } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isSignedIn) {
      router.push('/');
      return;
    }
  }, [mounted, isSignedIn, router]);

  useEffect(() => {
    if (mounted && clerkUserId) {
      loadUserTickets();
    }
  }, [mounted, clerkUserId]);

  const loadUserTickets = async () => {
    try {
      const response = await fetch('/api/get-tickets');
      
      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }

      const ticketsData = await response.json();
      setTickets(ticketsData || []);
      
    } catch (error) {
      console.error('Error loading tickets:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load your tickets.",
      });
    }
  };

  if (!mounted || !isSignedIn) {
    return null;
  }

  const reservedTickets = tickets.filter(ticket => ticket.status === 'RESERVED');
  const totalTickets = tickets.length;

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your ticket overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Tickets */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTickets}</div>
            <p className="text-xs text-muted-foreground">
              All time bookings
            </p>
          </CardContent>
        </Card>

        {/* Reserved Tickets */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reserved Tickets</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{reservedTickets.length}</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={() => router.push('/events')} className="w-full" size="sm">
              Book New Event
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tickets */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Tickets</CardTitle>
          <CardDescription>
            Your latest ticket bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          {tickets.length === 0 ? (
            <div className="text-center py-8">
              <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No tickets found</p>
              <Button onClick={() => router.push('/events')}>
                Book Your First Event
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.slice(0, 3).map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    {ticket.event?.image_url && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img
                          src={ticket.event.image_url}
                          alt="Event"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">Event Ticket</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(ticket.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant={ticket.status === 'RESERVED' ? 'default' : 'secondary'}>
                    {ticket.status}
                  </Badge>
                </div>
              ))}
              
              {tickets.length > 3 && (
                <div className="text-center pt-4">
                  <Button variant="outline" onClick={() => router.push('/dashboard/tickets')}>
                    View All Tickets
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
