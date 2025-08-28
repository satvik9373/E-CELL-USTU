"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Award, Download, Calendar, Trophy, Medal, HelpCircle } from 'lucide-react';

interface Certificate {
  id: string;
  eventName: string;
  certificateType: 'Winner' | 'Participation' | 'Runner Up';
  issuedDate: string;
  downloadUrl: string;
  certificateId?: string;
}

interface EligibleEvent {
  id: string;
  eventName: string;
  eventDate: string;
  canRequest: boolean;
}

interface CertificateRequest {
  id: string;
  eventName: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  reason: string | null;
}

const statusConfig = {
  pending: { label: 'Pending', variant: 'secondary' as const, color: 'bg-yellow-100 text-yellow-800' },
  approved: { label: 'Approved', variant: 'default' as const, color: 'bg-green-100 text-green-800' },
  rejected: { label: 'Rejected', variant: 'destructive' as const, color: 'bg-red-100 text-red-800' }
};

const certificateTypeConfig = {
  Winner: { icon: Trophy, variant: 'default' as const, color: 'bg-yellow-100 text-yellow-800' },
  Participation: { icon: Medal, variant: 'secondary' as const, color: 'bg-blue-100 text-blue-800' },
  'Runner Up': { icon: Trophy, variant: 'secondary' as const, color: 'bg-purple-100 text-purple-800' }
};

export default function CertificationsPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [eligibleEvents, setEligibleEvents] = useState<EligibleEvent[]>([]);
  const [requests, setRequests] = useState<CertificateRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/dashboard/certificates');
      
      if (!response.ok) {
        throw new Error('Failed to fetch certificates');
      }
      
      const data = await response.json();
      setCertificates(data.certificates || []);
      setEligibleEvents(data.eligibleEvents || []);
      setRequests(data.requests || []);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      toast({
        title: "Error",
        description: "Failed to load certificates. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDownloadCertificate = (certificate: Certificate) => {
    if (certificate.downloadUrl && certificate.downloadUrl !== '#') {
      window.open(certificate.downloadUrl, '_blank');
    } else {
      toast({
        title: "Download Started",
        description: "Your certificate download will begin shortly.",
      });
    }
  };

  const handleRequestCertificate = async (eventId: string) => {
    try {
      const response = await fetch('/api/dashboard/certificates/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId }),
      });

      if (!response.ok) {
        throw new Error('Failed to request certificate');
      }

      toast({
        title: "Request Submitted",
        description: "Your certificate request has been submitted successfully.",
      });

      // Refresh the data
      fetchCertificates();
    } catch (error) {
      console.error('Error requesting certificate:', error);
      toast({
        title: "Error",
        description: "Failed to submit certificate request. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="rounded-2xl shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Certifications</h1>
        <p className="text-muted-foreground">
          Manage your certificates and request new ones
        </p>
      </div>

      {/* Your Certificates Section */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-primary" />
            <span>Your Certificates</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {certificates.length === 0 ? (
            <Alert className="rounded-xl">
              <Award className="h-4 w-4" />
              <AlertDescription>
                No certificates yet. Complete events to earn your certificates.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certificates.map((certificate) => {
                const typeConfig = certificateTypeConfig[certificate.certificateType as keyof typeof certificateTypeConfig];
                const TypeIcon = typeConfig.icon;
                
                return (
                  <Card key={certificate.id} className="rounded-xl border hover:shadow-md transition-shadow">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <TypeIcon className="h-5 w-5 text-primary" />
                          <Badge variant={typeConfig.variant} className="rounded-full text-xs">
                            {certificate.certificateType}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-semibold text-foreground">
                          {certificate.eventName}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Issued: {formatDate(certificate.issuedDate)}</span>
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="w-full rounded-xl"
                        onClick={() => handleDownloadCertificate(certificate)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Certificate
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Request Certificate Section */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2">
            <Medal className="h-5 w-5 text-primary" />
            <span>Request a Certificate</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {eligibleEvents.length === 0 ? (
            <Alert className="rounded-xl">
              <Medal className="h-4 w-4" />
              <AlertDescription>
                You have no pending certificates to request. Complete more events to unlock certificates.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-3">
              {eligibleEvents.map((event) => (
                <div 
                  key={event.id} 
                  className="flex items-center justify-between p-4 border rounded-xl hover:bg-accent/50 transition-colors"
                >
                  <div className="space-y-1">
                    <h4 className="font-medium text-foreground">{event.eventName}</h4>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Completed: {formatDate(event.eventDate)}</span>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    className="rounded-full"
                    onClick={() => handleRequestCertificate(event.id)}
                  >
                    Request Certificate
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Request Status Section */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <span>Request Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <Alert className="rounded-xl">
              <HelpCircle className="h-4 w-4" />
              <AlertDescription>
                No requests found. Submit certificate requests above to track their status.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => {
                    const statusInfo = statusConfig[request.status];
                    
                    return (
                      <TableRow key={request.id} className="hover:bg-accent/50">
                        <TableCell>
                          <div className="font-medium text-foreground">
                            {request.eventName}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(request.requestDate)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={statusInfo.variant}
                              className="rounded-full"
                            >
                              {statusInfo.label}
                            </Badge>
                            {request.reason && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-xs">
                                    <p className="text-sm">{request.reason}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
