"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Download, Calendar, Clock, MapPin, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EventData {
  id: string;
  title: string;
  venue: string;
  date: string;
  ticketId: string;
}

export default function SuccessPage() {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Get event data from session storage
    const storedData = sessionStorage.getItem('selectedEvent');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setEventData(data);
      } catch (error) {
        console.error('Error parsing event data:', error);
        router.push('/events');
      }
    } else {
      // No event data, redirect to events page
      router.push('/events');
    }
  }, [router]);

  const generatePDF = (event: EventData) => {
    setIsDownloading(true);
    
    try {
      // Create a simple PDF-like content using HTML/CSS
      const ticketContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Event Ticket - ${event.title}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
            }
            .ticket {
              background: white;
              border-radius: 15px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.3);
              max-width: 600px;
              margin: 50px auto;
              overflow: hidden;
            }
            .ticket-header {
              background: linear-gradient(135deg, #142257 0%, #1e3a8a 100%);
              color: white;
              padding: 30px;
              text-align: center;
            }
            .ticket-body {
              padding: 30px;
            }
            .event-title {
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .event-subtitle {
              font-size: 16px;
              opacity: 0.9;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              margin: 15px 0;
              padding: 15px 0;
              border-bottom: 1px solid #eee;
            }
            .detail-label {
              font-weight: bold;
              color: #666;
            }
            .detail-value {
              color: #333;
            }
            .ticket-id {
              background: #f8f9fa;
              padding: 20px;
              margin: 20px 0;
              border-radius: 8px;
              text-align: center;
              border: 2px dashed #dee2e6;
            }
            .qr-placeholder {
              width: 150px;
              height: 150px;
              background: #f8f9fa;
              border: 2px dashed #dee2e6;
              border-radius: 8px;
              margin: 20px auto;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              color: #666;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              color: #666;
              font-size: 14px;
            }
            @media print {
              body { background: white; }
              .ticket { box-shadow: none; margin: 0; }
            }
          </style>
        </head>
        <body>
          <div class="ticket">
            <div class="ticket-header">
              <div class="event-title">${event.title}</div>
              <div class="event-subtitle">E-Cell USTU Event Ticket</div>
            </div>
            
            <div class="ticket-body">
              <div class="detail-row">
                <span class="detail-label">📅 Date:</span>
                <span class="detail-value">${new Date(event.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">🕒 Time:</span>
                <span class="detail-value">${new Date(event.date).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">📍 Venue:</span>
                <span class="detail-value">${event.venue || 'Venue TBA'}</span>
              </div>
              
              <div class="ticket-id">
                <strong>Ticket ID:</strong> ${event.ticketId}
              </div>
              
              <div class="qr-placeholder">
                QR Code
                <br/>
                (${event.ticketId.slice(0, 8)})
              </div>
              
              <div class="footer">
                <p><strong>Important:</strong> Please bring this ticket to the event venue.</p>
                <p>For questions, contact: events@ecustu.com</p>
                <p>Generated on ${new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

      // Create a blob and download
      const blob = new Blob([ticketContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ticket-${event.title.replace(/[^a-zA-Z0-9]/g, '-')}-${event.ticketId.slice(0, 8)}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        variant: "default",
        title: "Ticket Downloaded!",
        description: "Your ticket has been downloaded successfully.",
      });

    } catch (error) {
      console.error('Error generating ticket:', error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "Failed to download ticket. Please try again.",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadTicket = () => {
    if (eventData) {
      generatePDF(eventData);
    }
  };

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

  if (!eventData) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <Header />
        <div className="pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-4 text-lg text-muted-foreground">Loading...</p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Header />
      
      {/* Success Section */}
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Booking Successful!
              </h1>
              
              <p className="text-xl text-muted-foreground">
                Your ticket has been reserved successfully. You can download it below.
              </p>
            </div>

            {/* Event Details Card */}
            <Card className="mb-8 text-left">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Ticket Reserved
                  </Badge>
                </div>
                <CardTitle className="text-2xl">{eventData.title}</CardTitle>
                <CardDescription>
                  Your ticket is ready for download
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-5 w-5 mr-3 text-primary" />
                    <span>{formatDate(eventData.date)}</span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-5 w-5 mr-3 text-primary" />
                    <span>{formatTime(eventData.date)}</span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-5 w-5 mr-3 text-primary" />
                    <span>{eventData.venue || 'Venue TBA'}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Ticket ID:</strong> <span className="font-mono">{eventData.ticketId}</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleDownloadTicket}
                disabled={isDownloading}
                className="px-8 py-3"
              >
                {isDownloading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </div>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    Download Ticket
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push('/events')}
                className="px-8 py-3"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Events
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p>• Download and save your ticket</p>
                <p>• Bring your ticket to the event venue</p>
                <p>• Check your email for event updates</p>
                <p>• Visit your dashboard to manage all tickets</p>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/dashboard/tickets')}
                className="mt-4 border-blue-300 text-blue-700 hover:bg-blue-100"
              >
                View Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
