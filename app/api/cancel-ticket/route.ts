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

export async function PATCH(request: NextRequest) {
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
    const { ticketId } = body;

    if (!ticketId) {
      return NextResponse.json(
        { error: 'Ticket ID is required' },
        { status: 400 }
      );
    }

    console.log('🗑️ Cancelling ticket server-side:', {
      userId,
      ticketId,
      timestamp: new Date().toISOString()
    });

    // Verify the ticket belongs to the user before cancelling
    const { data: ticket, error: checkError } = await supabaseAdmin
      .from('tickets')
      .select('id, user_id, status')
      .eq('id', ticketId)
      .eq('user_id', userId)
      .single();

    if (checkError || !ticket) {
      return NextResponse.json(
        { error: 'Ticket not found or you do not have permission to cancel it' },
        { status: 404 }
      );
    }

    if (ticket.status === 'CANCELLED') {
      return NextResponse.json(
        { error: 'Ticket is already cancelled' },
        { status: 409 }
      );
    }

    // Update ticket status to CANCELLED using admin client (bypasses RLS)
    const { data: updatedTicket, error: updateError } = await supabaseAdmin
      .from('tickets')
      .update({ status: 'CANCELLED' })
      .eq('id', ticketId)
      .eq('user_id', userId)
      .select()
      .single();

    if (updateError) {
      console.error('Error cancelling ticket:', updateError);
      return NextResponse.json(
        { error: 'Failed to cancel ticket' },
        { status: 500 }
      );
    }

    console.log('✅ Ticket cancelled successfully:', updatedTicket);

    return NextResponse.json({
      success: true,
      ticket: updatedTicket
    });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
