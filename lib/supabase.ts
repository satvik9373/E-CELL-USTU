import { createClient } from '@supabase/supabase-js';

// Create Supabase client for client-side operations (with anon key)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Create Supabase client for server-side operations (with service role key)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Database types based on our schema
export interface DatabaseTypes {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          clerk_user_id: string;
          email: string;
          first_name: string | null;
          last_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          clerk_user_id: string;
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          clerk_user_id?: string;
          email?: string;
          first_name?: string | null;
          last_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          venue: string;
          starts_at: string;
          event_time: string;
          capacity: number;
          ticket_price: number;
          event_type: 'summit' | 'workshop' | 'competition' | 'networking';
          status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          venue: string;
          starts_at: string;
          event_time: string;
          capacity: number;
          ticket_price: number;
          event_type: 'summit' | 'workshop' | 'competition' | 'networking';
          status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          venue?: string;
          starts_at?: string;
          event_time?: string;
          capacity?: number;
          ticket_price?: number;
          event_type?: 'summit' | 'workshop' | 'competition' | 'networking';
          status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      tickets: {
        Row: {
          id: string;
          user_id: string;
          event_id: string;
          booking_id: string;
          ticket_type: 'vip' | 'regular' | 'workshop';
          status: 'confirmed' | 'pending' | 'cancelled';
          payment_status: 'paid' | 'pending' | 'failed';
          qr_code: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          event_id: string;
          booking_id: string;
          ticket_type: 'vip' | 'regular' | 'workshop';
          status?: 'confirmed' | 'pending' | 'cancelled';
          payment_status?: 'paid' | 'pending' | 'failed';
          qr_code?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          event_id?: string;
          booking_id?: string;
          ticket_type?: 'vip' | 'regular' | 'workshop';
          status?: 'confirmed' | 'pending' | 'cancelled';
          payment_status?: 'paid' | 'pending' | 'failed';
          qr_code?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      certificates: {
        Row: {
          id: string;
          user_id: string;
          event_id: string;
          certificate_type: 'participation' | 'winner' | 'runner_up';
          issued_date: string;
          pdf_url: string | null;
          certificate_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          event_id: string;
          certificate_type: 'participation' | 'winner' | 'runner_up';
          issued_date: string;
          pdf_url?: string | null;
          certificate_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          event_id?: string;
          certificate_type?: 'participation' | 'winner' | 'runner_up';
          issued_date?: string;
          pdf_url?: string | null;
          certificate_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      certificate_requests: {
        Row: {
          id: string;
          user_id: string;
          event_id: string;
          status: 'pending' | 'approved' | 'rejected';
          rejection_reason: string | null;
          requested_date: string;
          processed_date: string | null;
          processed_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          event_id: string;
          status?: 'pending' | 'approved' | 'rejected';
          rejection_reason?: string | null;
          requested_date: string;
          processed_date?: string | null;
          processed_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          event_id?: string;
          status?: 'pending' | 'approved' | 'rejected';
          rejection_reason?: string | null;
          requested_date?: string;
          processed_date?: string | null;
          processed_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
