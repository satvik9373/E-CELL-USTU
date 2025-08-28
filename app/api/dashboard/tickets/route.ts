import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { ensureUser, getUserTickets } from '@/lib/database';

export async function GET(request: NextRequest) {
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

    // Get user tickets
    const tickets = await getUserTickets(clerkUserId);

    // Transform data for frontend
    const transformedTickets = tickets.map((ticket: any) => ({
      id: ticket.id,
      eventName: ticket.events?.title || 'Unknown Event',
      dateTime: ticket.events?.starts_at || 'TBA',
      venue: ticket.events?.venue || 'TBA',
      status: ticket.status,
      ticketType: ticket.ticket_type.charAt(0).toUpperCase() + ticket.ticket_type.slice(1),
      bookingId: ticket.booking_id,
      qrCode: ticket.qr_code
    }));

    return NextResponse.json({ tickets: transformedTickets });
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
