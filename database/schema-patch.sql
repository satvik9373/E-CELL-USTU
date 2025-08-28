-- SQL patch to ensure proper schema for tickets table
-- Run this in your Supabase SQL editor

-- First, let's check current schema
-- SELECT column_name, data_type, is_nullable 
-- FROM information_schema.columns 
-- WHERE table_name = 'tickets' AND table_schema = 'public';

-- Ensure user_id is TEXT and properly references users table
ALTER TABLE tickets
  ALTER COLUMN user_id TYPE text USING user_id::text,
  ALTER COLUMN user_id SET NOT NULL;

-- Drop existing foreign key if it exists and recreate it
ALTER TABLE tickets
  DROP CONSTRAINT IF EXISTS tickets_user_id_fkey;

ALTER TABLE tickets
  ADD CONSTRAINT tickets_user_id_fkey 
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Create unique index to prevent duplicate tickets for same user/event
CREATE UNIQUE INDEX IF NOT EXISTS ux_ticket_user_event 
ON tickets(user_id, event_id);

-- Ensure we have the necessary columns with proper types
DO $$
BEGIN
    -- Add status column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='tickets' AND column_name='status') THEN
        ALTER TABLE tickets ADD COLUMN status TEXT DEFAULT 'PENDING';
    END IF;
    
    -- Add qr_payload column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='tickets' AND column_name='qr_payload') THEN
        ALTER TABLE tickets ADD COLUMN qr_payload TEXT;
    END IF;
    
    -- Add pdf_path column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='tickets' AND column_name='pdf_path') THEN
        ALTER TABLE tickets ADD COLUMN pdf_path TEXT;
    END IF;
END $$;

-- Ensure events table has the necessary columns
DO $$
BEGIN
    -- Add starts_at column if it doesn't exist (combining date/time)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='events' AND column_name='starts_at') THEN
        ALTER TABLE events ADD COLUMN starts_at TIMESTAMP WITH TIME ZONE;
        
        -- If you have separate date/time columns, combine them
        -- UPDATE events SET starts_at = (event_date + event_time) WHERE event_date IS NOT NULL AND event_time IS NOT NULL;
    END IF;
    
    -- Add venue column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='events' AND column_name='venue') THEN
        ALTER TABLE events ADD COLUMN venue TEXT;
    END IF;
END $$;

-- Create storage bucket for tickets if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('tickets', 'tickets', false)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for the tickets bucket
CREATE POLICY "Users can upload their own tickets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'tickets' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can view their own tickets"
ON storage.objects FOR SELECT
USING (bucket_id = 'tickets' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Sample events data (uncomment to add sample events)
/*
INSERT INTO events (id, title, starts_at, venue) VALUES
('550e8400-e29b-41d4-a716-446655440001'::uuid, 'Innovation Summit 2024', '2024-09-15 10:00:00+00', 'Main Auditorium'),
('550e8400-e29b-41d4-a716-446655440002'::uuid, 'Startup Pitch Competition', '2024-09-20 14:00:00+00', 'Conference Hall A'),
('550e8400-e29b-41d4-a716-446655440003'::uuid, 'Tech Workshop Series', '2024-09-25 09:00:00+00', 'Lab Building')
ON CONFLICT (id) DO NOTHING;
*/

-- Verify the schema
SELECT 
    t.table_name,
    t.column_name,
    t.data_type,
    t.is_nullable,
    tc.constraint_type
FROM information_schema.columns t
LEFT JOIN information_schema.key_column_usage kcu 
    ON t.table_name = kcu.table_name AND t.column_name = kcu.column_name
LEFT JOIN information_schema.table_constraints tc 
    ON kcu.constraint_name = tc.constraint_name
WHERE t.table_name IN ('users', 'events', 'tickets') 
    AND t.table_schema = 'public'
ORDER BY t.table_name, t.ordinal_position;
