import { supabase, Database } from './supabaseClient';

// Type aliases for cleaner code
type Event = Database['public']['Tables']['events']['Row'];
type EventWithTicketCount = Event & { ticket_count?: number; user_has_ticket?: boolean };
type Ticket = Database['public']['Tables']['tickets']['Row'];
type TicketWithEvent = Ticket & { event: Event };

/**
 * Fetch all events with real-time subscription
 */
export async function getEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('starts_at', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events');
  }

  return data || [];
}

/**
 * Get events with ticket count and user booking status
 */
export async function getEventsWithTicketInfo(clerkUserId?: string): Promise<EventWithTicketCount[]> {
  // First get all events
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .order('starts_at', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events');
  }

  if (!events) return [];

  // Get ticket counts for each event
  const eventsWithCounts = await Promise.all(
    events.map(async (event) => {
      const { count } = await supabase
        .from('tickets')
        .select('*', { count: 'exact', head: true })
        .eq('event_id', event.id);

      return {
        ...event,
        ticket_count: count || 0,
      };
    })
  );

  // If user is authenticated, check which events they've booked
  if (clerkUserId) {
    const { data: userTickets } = await supabase
      .from('tickets')
      .select('event_id')
      .eq('user_id', clerkUserId);

    const userEventIds = new Set(userTickets?.map(t => t.event_id) || []);

    return eventsWithCounts.map(event => ({
      ...event,
      user_has_ticket: userEventIds.has(event.id),
    }));
  }

  return eventsWithCounts;
}

/**
 * Book a ticket for an event
 */
export async function bookTicket(clerkUserId: string, eventId: string): Promise<Ticket> {
  // First check if user already has a ticket
  const { data: existingTicket } = await supabase
    .from('tickets')
    .select('id')
    .eq('user_id', clerkUserId)
    .eq('event_id', eventId)
    .single();

  if (existingTicket) {
    throw new Error('DUPLICATE_BOOKING');
  }

  // Check event capacity
  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('capacity, title')
    .eq('id', eventId)
    .single();

  if (eventError) {
    throw new Error('Event not found');
  }

  if (event.capacity) {
    // Count existing tickets for this event
    const { count: ticketCount, error: countError } = await supabase
      .from('tickets')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', eventId);

    if (countError) {
      throw new Error('Failed to check capacity');
    }

    if (ticketCount && ticketCount >= event.capacity) {
      throw new Error('EVENT_FULL');
    }
  }

  // Insert the ticket
  const { data, error } = await supabase
    .from('tickets')
    .insert({
      user_id: clerkUserId,
      event_id: eventId,
      status: 'RESERVED',
    })
    .select()
    .single();

  if (error) {
    console.error('Error booking ticket:', error);
    
    // Handle specific error types
    if (error.code === '23505') { // Unique constraint violation
      throw new Error('DUPLICATE_BOOKING');
    }
    
    throw new Error('Failed to book ticket');
  }

  return data;
}

/**
 * Get user's tickets with event details
 */
export async function getUserTickets(clerkUserId: string): Promise<TicketWithEvent[]> {
  const { data, error } = await supabase
    .from('tickets')
    .select(`
      *,
      event:events(*)
    `)
    .eq('user_id', clerkUserId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user tickets:', error);
    throw new Error('Failed to fetch tickets');
  }

  return (data || []) as TicketWithEvent[];
}

/**
 * Subscribe to events table changes
 */
export function subscribeToEvents(callback: (payload: any) => void) {
  const subscription = supabase
    .channel('events_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'events'
      },
      callback
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}

/**
 * Subscribe to tickets table changes for a specific user
 */
export function subscribeToUserTickets(clerkUserId: string, callback: (payload: any) => void) {
  const subscription = supabase
    .channel(`user_tickets_${clerkUserId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'tickets',
        filter: `user_id=eq.${clerkUserId}`
      },
      callback
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}

/**
 * Get ticket count for a specific event
 */
export async function getEventTicketCount(eventId: string): Promise<number> {
  const { count, error } = await supabase
    .from('tickets')
    .select('*', { count: 'exact', head: true })
    .eq('event_id', eventId);

  if (error) {
    console.error('Error getting ticket count:', error);
    return 0;
  }

  return count || 0;
}
