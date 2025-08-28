"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import useSWR from 'swr';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Ticket, Download, Eye, Calendar, MapPin, Clock } from 'lucide-react';

interface TicketData {
  id: string;
  status: string;
  qr_payload: string | null;
  pdf_path: string | null;
  created_at: string;
  ticket_type?: string;
  booking_id?: string;
  events: {
    id: string;
    title: string;
    starts_at: string;
    venue: string;
  } | null;
}

const statusConfig = {
  RESERVED: { label: 'Reserved', variant: 'default' as const, color: 'bg-green-100 text-green-800' },
  CONFIRMED: { label: 'Confirmed', variant: 'default' as const, color: 'bg-green-100 text-green-800' },
  PENDING: { label: 'Pending', variant: 'secondary' as const, color: 'bg-yellow-100 text-yellow-800' },
  CANCELLED: { label: 'Cancelled', variant: 'destructive' as const, color: 'bg-red-100 text-red-800' }
};

const fetcher = (url: string) => fetch(url).then(r => {
  console.log('API Response Status:', r.status);
  return r.json().then(data => {
    console.log('API Response Data:', data);
    return data;
  });
});

export default function TicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);
  const { toast } = useToast();

  const { data, error, isLoading } = useSWR('/api/tickets', fetcher);
  const tickets: TicketData[] = data?.tickets ?? [];

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  const handleViewTicket = (ticket: TicketData) => {
    setSelectedTicket(ticket);
  };

  const handleDownloadPDF = async (ticketId: string) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}/download`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to download');
      }
      
      if (data.url) {
        window.location.href = data.url;
        toast({
          title: "Download Started",
          description: "Your ticket PDF download will begin shortly.",
        });
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast({
        title: "Download Failed",
        description: "Unable to download PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">Reserved Tickets</h1>
          <p className="text-muted-foreground">Manage your event tickets and reservations</p>
        </div>
        <Alert className="rounded-2xl" variant="destructive">
          <Ticket className="h-4 w-4" />
          <AlertDescription>
            Failed to load tickets. Please refresh the page or try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Reserved Tickets</h1>
        <p className="text-muted-foreground">
          Manage your event tickets and reservations
        </p>
      </div>

      {/* Content */}
      {tickets.length === 0 ? (
        <Alert className="rounded-2xl">
          <Ticket className="h-4 w-4" />
          <AlertDescription>
            No tickets found. Try booking an event from our events page.
          </AlertDescription>
        </Alert>
      ) : (
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Ticket className="h-5 w-5 text-primary" />
              <span>Your Tickets</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Venue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket) => {
                    const { date, time } = ticket.events?.starts_at 
                      ? formatDateTime(ticket.events.starts_at) 
                      : { date: 'TBA', time: 'TBA' };
                    const statusInfo = statusConfig[ticket.status as keyof typeof statusConfig] || statusConfig.PENDING;
                    
                    return (
                      <TableRow key={ticket.id} className="hover:bg-accent/50">
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium text-foreground">
                              {ticket.events?.title || 'Unknown Event'}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Ticket ID: {ticket.id.slice(0, 8)}...
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{date}</div>
                              <div className="text-muted-foreground flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{time}</span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{ticket.events?.venue || 'TBA'}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={statusInfo.variant}
                            className="rounded-full"
                          >
                            {statusInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="rounded-full"
                                  onClick={() => handleViewTicket(ticket)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="rounded-2xl">
                                <DialogHeader>
                                  <DialogTitle>Ticket Details</DialogTitle>
                                </DialogHeader>
                                {selectedTicket && (
                                  <div className="space-y-4">
                                    <div className="bg-accent/50 p-4 rounded-xl space-y-3">
                                      <div className="text-center">
                                        <h3 className="font-semibold text-lg">{selectedTicket.events?.title || 'Unknown Event'}</h3>
                                        <p className="text-muted-foreground">Event Ticket</p>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                          <p className="text-muted-foreground">Date</p>
                                          <p className="font-medium">{selectedTicket.events?.starts_at ? formatDateTime(selectedTicket.events.starts_at).date : 'TBA'}</p>
                                        </div>
                                        <div>
                                          <p className="text-muted-foreground">Time</p>
                                          <p className="font-medium">{selectedTicket.events?.starts_at ? formatDateTime(selectedTicket.events.starts_at).time : 'TBA'}</p>
                                        </div>
                                        <div>
                                          <p className="text-muted-foreground">Venue</p>
                                          <p className="font-medium">{selectedTicket.events?.venue || 'TBA'}</p>
                                        </div>
                                        <div>
                                          <p className="text-muted-foreground">Status</p>
                                          <p className="font-medium">{selectedTicket.status}</p>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    {/* QR Code */}
                                    <div className="flex justify-center">
                                      <div className="w-32 h-32 bg-accent/50 rounded-xl flex items-center justify-center">
                                        {selectedTicket.qr_payload ? (
                                          <div className="text-center text-muted-foreground">
                                            <div className="w-16 h-16 bg-primary/20 rounded mb-2 mx-auto flex items-center justify-center text-xs p-2 break-all">
                                              {selectedTicket.qr_payload.slice(0, 10)}...
                                            </div>
                                            <p className="text-xs">QR Data</p>
                                          </div>
                                        ) : (
                                          <div className="text-center text-muted-foreground">
                                            <div className="w-16 h-16 bg-muted rounded mb-2 mx-auto"></div>
                                            <p className="text-xs">No QR Code</p>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            
                            {ticket.pdf_path && (
                              <Button 
                                variant="default" 
                                size="sm" 
                                className="rounded-full"
                                onClick={() => handleDownloadPDF(ticket.id)}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                PDF
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
