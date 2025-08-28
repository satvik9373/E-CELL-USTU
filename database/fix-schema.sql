-- 🔧 ENSURE PROPER DATABASE SCHEMA FOR CLERK INTEGRATION
-- Run this in Supabase SQL Editor

-- Step 1: Make sure tickets.user_id can store TEXT (for Clerk user IDs)
ALTER TABLE tickets ALTER COLUMN user_id TYPE TEXT;

-- Step 2: Make sure users.id can store TEXT (for Clerk user IDs) 
ALTER TABLE users ALTER COLUMN id TYPE TEXT;

-- Step 3: Add missing columns to events if needed
ALTER TABLE events ADD COLUMN IF NOT EXISTS starts_at TIMESTAMP WITH TIME ZONE;

-- Step 4: Update starts_at from existing date/time columns
UPDATE events 
SET starts_at = (event_date::text || ' ' || COALESCE(event_time::text, '00:00:00'))::timestamp with time zone
WHERE starts_at IS NULL AND event_date IS NOT NULL;

-- Step 5: Add missing columns to tickets if needed
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS qr_payload TEXT;
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS pdf_path TEXT;
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS booking_id TEXT;
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS ticket_type TEXT DEFAULT 'regular';
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';

-- Step 6: Verify schema
SELECT 
    'Tables verified:' as status,
    'events' as table_name,
    (SELECT COUNT(*) FROM events) as row_count
UNION ALL
SELECT 
    'Tables verified:' as status,
    'tickets' as table_name,
    (SELECT COUNT(*) FROM tickets) as row_count
UNION ALL
SELECT 
    'Tables verified:' as status,
    'users' as table_name,
    (SELECT COUNT(*) FROM users) as row_count;
