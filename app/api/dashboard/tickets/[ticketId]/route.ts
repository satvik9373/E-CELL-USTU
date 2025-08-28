import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { ensureUser, getTicketWithQR } from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  try {
    // Check authentication
    const { userId: clerkUserId } = getAuth(request);
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get or create user in Supabase
    const user = await ensureUser(clerkUserId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get ticket with QR code
    const ticket = await getTicketWithQR(params.ticketId, clerkUserId);
    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    // Transform data for frontend
    const transformedTicket = {
      id: ticket.id,
      eventName: ticket.events?.title || 'Unknown Event',
      dateTime: ticket.events?.starts_at || 'TBA',
      venue: ticket.events?.venue || 'TBA',
      status: ticket.status,
      ticketType: ticket.ticket_type.charAt(0).toUpperCase() + ticket.ticket_type.slice(1),
      bookingId: ticket.booking_id,
      qrCode: ticket.qr_code
    };

    return NextResponse.json({ ticket: transformedTicket });
  } catch (error) {
    console.error('Error fetching ticket:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
