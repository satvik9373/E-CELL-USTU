import { supabaseAdmin } from './supabaseAdmin';
import type { DatabaseTypes } from './supabase';

type User = DatabaseTypes['public']['Tables']['users']['Row'];
type Event = DatabaseTypes['public']['Tables']['events']['Row'];
type Ticket = DatabaseTypes['public']['Tables']['tickets']['Row'];
type Certificate = DatabaseTypes['public']['Tables']['certificates']['Row'];
type CertificateRequest = DatabaseTypes['public']['Tables']['certificate_requests']['Row'];

// Simple function to ensure user exists in database
export async function ensureUser(clerkUserId: string): Promise<User | null> {
  if (!clerkUserId) {
    console.error('Clerk user ID is required');
    return null;
  }

  const sb = supabaseAdmin();

  // Check if user exists
  const { data: existingUser } = await sb
    .from('users')
    .select('*')
    .eq('id', clerkUserId)
    .single();

  if (existingUser) {
    return existingUser;
  }

  // Create user if doesn't exist
  const { data: newUser, error } = await sb
    .from('users')
    .insert({ 
      id: clerkUserId,
      email: '',
      created_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    return null;
  }

  console.log('Created new user:', clerkUserId);
  return newUser;
}

// Get user tickets with event details - SIMPLIFIED
export async function getUserTickets(clerkUserId: string) {
  if (!clerkUserId) {
    console.error('Clerk user ID is required');
    return [];
  }

  try {
    // Ensure user exists
    await ensureUser(clerkUserId);

    const sb = supabaseAdmin();
    const { data, error } = await sb
      .from('tickets')
      .select(`
        id,
        status,
        ticket_type,
        booking_id,
        qr_code,
        qr_payload,
        pdf_path,
        created_at,
        events (
          id,
          title,
          venue,
          event_date
        )
      `)
      .eq('user_id', clerkUserId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tickets:', error);
      return [];
    }

    console.log(`✅ Found ${data?.length || 0} tickets for user ${clerkUserId}`);
    return data || [];
  } catch (error) {
    console.error('Error in getUserTickets:', error);
    return [];
  }
}

// Get user certificates with event details
export async function getUserCertificates(clerkUserId: string) {
  if (!clerkUserId) {
    console.error('clerkUserId is required');
    return [];
  }

  try {
    const sb = supabaseAdmin();
    const { data, error } = await sb
      .from('certificates')
      .select(`
        *,
        events (
          id,
          title,
          event_date
        )
      `)
      .eq('user_id', clerkUserId)
      .order('issued_date', { ascending: false });

    if (error) {
      console.error('Error fetching certificates:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getUserCertificates:', error);
    return [];
  }
}

// Get events user can request certificates for
export async function getEligibleCertificateEvents(clerkUserId: string) {
  if (!clerkUserId) {
    console.error('clerkUserId is required');
    return [];
  }

  try {
    const sb = supabaseAdmin();
    // Get events user attended (has tickets) but doesn't have certificates for
    const { data, error } = await sb
      .from('events')
      .select(`
        id,
        title,
        event_date
        status
      `)
      .eq('status', 'completed')
      .not('id', 'in', `(
        SELECT event_id FROM certificates WHERE user_id = '${clerkUserId}'
        UNION
        SELECT event_id FROM certificate_requests WHERE user_id = '${clerkUserId}' AND status != 'rejected'
      )`);

    if (error) {
      console.error('Error fetching eligible events:', error);
      return [];
    }

    // Filter events where user has tickets
    const eventsWithTickets = [];
    for (const event of data || []) {
      const { data: tickets } = await sb
        .from('tickets')
        .select('id')
        .eq('user_id', clerkUserId)
        .eq('event_id', event.id)
        .eq('status', 'confirmed');

      if (tickets && tickets.length > 0) {
        eventsWithTickets.push(event);
      }
    }

    return eventsWithTickets;
  } catch (error) {
    console.error('Error in getEligibleCertificateEvents:', error);
    return [];
  }
}

// Get user certificate requests with event details
export async function getUserCertificateRequests(clerkUserId: string) {
  if (!clerkUserId) {
    console.error('clerkUserId is required');
    return [];
  }

  try {
    const sb = supabaseAdmin();
    const { data, error } = await sb
      .from('certificate_requests')
      .select(`
        *,
        events (
          id,
          title,
          event_date
        )
      `)
      .eq('user_id', clerkUserId)
      .order('requested_date', { ascending: false });

    if (error) {
      console.error('Error fetching certificate requests:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getUserCertificateRequests:', error);
    return [];
  }
}

// Create certificate request
export async function createCertificateRequest(clerkUserId: string, eventId: string) {
  if (!clerkUserId) {
    console.error('clerkUserId is required');
    return null;
  }

  try {
    const sb = supabaseAdmin();
    const { data, error } = await sb
      .from('certificate_requests')
      .insert({
        user_id: clerkUserId,
        event_id: eventId,
        requested_date: new Date().toISOString().split('T')[0],
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating certificate request:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in createCertificateRequest:', error);
    return null;
  }
}

// Get single ticket with QR code
export async function getTicketWithQR(ticketId: string, clerkUserId: string) {
  if (!clerkUserId) {
    console.error('clerkUserId is required');
    return null;
  }

  try {
    const sb = supabaseAdmin();
    const { data, error } = await sb
      .from('tickets')
      .select(`
        *,
        events (
          id,
          title,
          venue,
          event_type,
          event_date
        )
      `)
      .eq('id', ticketId)
      .eq('user_id', clerkUserId)
      .single();

    if (error) {
      console.error('Error fetching ticket:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getTicketWithQR:', error);
    return null;
  }
}
