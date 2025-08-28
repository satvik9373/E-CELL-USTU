import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { 
  getOrCreateUser, 
  getUserCertificates, 
  getEligibleCertificateEvents, 
  getUserCertificateRequests 
} from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const { userId: clerkUserId } = getAuth(request);
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get or create user in Supabase
    const user = await getOrCreateUser();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get all certificate-related data
    const [certificates, eligibleEvents, requests] = await Promise.all([
      getUserCertificates(user.id),
      getEligibleCertificateEvents(user.id),
      getUserCertificateRequests(user.id)
    ]);

    // Transform certificates data
    const transformedCertificates = certificates.map((cert: any) => ({
      id: cert.id,
      eventName: cert.events?.title || 'Unknown Event',
      certificateType: cert.certificate_type === 'participation' ? 'Participation' : 
                      cert.certificate_type === 'winner' ? 'Winner' : 'Runner Up',
      issuedDate: cert.issued_date,
      downloadUrl: cert.pdf_url || '#',
      certificateId: cert.certificate_id
    }));

    // Transform eligible events data
    const transformedEligibleEvents = eligibleEvents.map((event: any) => ({
      id: event.id,
      eventName: event.title,
      eventDate: event.starts_at,
      canRequest: true
    }));

    // Transform requests data
    const transformedRequests = requests.map((request: any) => ({
      id: request.id,
      eventName: request.events?.title || 'Unknown Event',
      status: request.status,
      requestDate: request.requested_date,
      reason: request.rejection_reason
    }));

    return NextResponse.json({
      certificates: transformedCertificates,
      eligibleEvents: transformedEligibleEvents,
      requests: transformedRequests
    });
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
