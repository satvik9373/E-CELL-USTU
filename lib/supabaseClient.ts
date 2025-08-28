import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bmfrpiqllxeqbggqrcyk.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtZnJwaXFsbHhlcWJnZ3FyY3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzNzY1NzYsImV4cCI6MjA3MTk1MjU3Nn0.wzm4wCsaZGBIstz14fYT80mQDKg8L9DzzyZ_Vl1Lxp0';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// ✅ Client-side Supabase client using only public anon key
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // We use Clerk for auth, not Supabase auth
    autoRefreshToken: false,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// ✅ Database types for type safety
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string; // Clerk user ID (text)
          email: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          created_at?: string;
        };
      };
      events: {
        Row: {
          id: string; // UUID
          image_url: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          image_url: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          image_url?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      tickets: {
        Row: {
          id: string; // UUID
          user_id: string; // Clerk user ID
          event_id: string; // UUID
          status: 'RESERVED' | 'CONFIRMED' | 'CANCELLED';
          qr_payload: string | null;
          pdf_path: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          event_id: string;
          status?: 'RESERVED' | 'CONFIRMED' | 'CANCELLED';
          qr_payload?: string | null;
          pdf_path?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          event_id?: string;
          status?: 'RESERVED' | 'CONFIRMED' | 'CANCELLED';
          qr_payload?: string | null;
          pdf_path?: string | null;
          created_at?: string;
        };
      };
    };
  };
}

// ✅ Export typed client
export type TypedSupabaseClient = typeof supabase;
