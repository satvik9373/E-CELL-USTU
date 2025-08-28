import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';

// Create Supabase admin client with service key (bypasses RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export async function POST(request: NextRequest) {
  try {
    // Verify the user is authenticated with Clerk
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { eventId } = body;

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    console.log('🎫 Booking ticket server-side:', {
      userId,
      eventId,
      timestamp: new Date().toISOString()
    });

    // First, ensure the user exists in our users table
    const { error: userError } = await supabaseAdmin
      .from('users')
      .upsert({
        id: userId,
        email: null, // We can get this from Clerk if needed later
      }, {
        onConflict: 'id'
      });

    if (userError) {
      console.error('Error ensuring user exists:', userError);
      return NextResponse.json(
        { error: 'Failed to create user record' },
        { status: 500 }
      );
    }

    // Check if user already has a ticket for this event
    const { data: existingTicket } = await supabaseAdmin
      .from('tickets')
      .select('id')
      .eq('user_id', userId)
      .eq('event_id', eventId)
      .single();

    if (existingTicket) {
      return NextResponse.json(
        { error: 'You already have a ticket for this event' },
        { status: 409 }
      );
    }

    // Insert the ticket using admin client (bypasses RLS)
    const { data: ticket, error: ticketError } = await supabaseAdmin
      .from('tickets')
      .insert([{
        user_id: userId,
        event_id: eventId,
        status: 'RESERVED',
      }])
      .select()
      .single();

    if (ticketError) {
      console.error('Error booking ticket:', ticketError);
      
      // Handle duplicate booking (in case of race condition)
      if (ticketError.code === '23505') {
        return NextResponse.json(
          { error: 'You already have a ticket for this event' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to book ticket' },
        { status: 500 }
      );
    }

    console.log('✅ Ticket booked successfully:', ticket);

    return NextResponse.json({
      success: true,
      ticket: {
        id: ticket.id,
        event_id: ticket.event_id,
        status: ticket.status,
        created_at: ticket.created_at
      }
    });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
