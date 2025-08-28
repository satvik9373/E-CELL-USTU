-- Migration script to fix Clerk integration issues
-- Run this in your Supabase SQL editor

-- Step 1: Check current users table structure
-- SELECT * FROM users LIMIT 5;

-- Step 2: Remove any test users if they exist
DELETE FROM users WHERE clerk_user_id LIKE 'test_user_%';

-- Step 3: Check for orphaned tickets (tickets without valid user references)
-- SELECT t.*, u.clerk_user_id 
-- FROM tickets t 
-- LEFT JOIN users u ON t.user_id = u.id 
-- WHERE u.id IS NULL;

-- Step 4: Remove orphaned tickets (optional - uncomment if needed)
-- DELETE FROM tickets WHERE user_id NOT IN (SELECT id FROM users);

-- Step 5: Update events table to use starts_at for consistency
-- Check if starts_at column exists, if not, create it from event_date and event_time
ALTER TABLE events ADD COLUMN IF NOT EXISTS starts_at TIMESTAMP WITH TIME ZONE;

-- Update starts_at from existing event_date and event_time
UPDATE events 
SET starts_at = (event_date::text || ' ' || event_time::text)::timestamp with time zone
WHERE starts_at IS NULL AND event_date IS NOT NULL AND event_time IS NOT NULL;

-- Step 6: Update tickets table to ensure proper status values
-- Check current status values
-- SELECT DISTINCT status FROM tickets;

-- Update any invalid status values to proper ones
UPDATE tickets SET status = 'pending' WHERE status NOT IN ('confirmed', 'pending', 'cancelled');

-- Step 7: Add indexes if they don't exist (for performance)
CREATE INDEX IF NOT EXISTS idx_tickets_user_id ON tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_tickets_event_id ON tickets(event_id);
CREATE INDEX IF NOT EXISTS idx_users_clerk_user_id ON users(clerk_user_id);

-- Step 8: Verify the migration
-- Check users table
SELECT 'Users count:' as info, COUNT(*) as count FROM users
UNION ALL
SELECT 'Tickets count:' as info, COUNT(*) as count FROM tickets
UNION ALL
SELECT 'Events count:' as info, COUNT(*) as count FROM events;

-- Check for any remaining issues
SELECT 
  'Tickets without users:' as issue,
  COUNT(*) as count
FROM tickets t 
LEFT JOIN users u ON t.user_id = u.id 
WHERE u.id IS NULL
UNION ALL
SELECT 
  'Users without clerk_user_id:' as issue,
  COUNT(*) as count
FROM users 
WHERE clerk_user_id IS NULL OR clerk_user_id = '';

-- Sample query to check ticket-event relationships
SELECT 
  t.id as ticket_id,
  t.status,
  u.clerk_user_id,
  e.title as event_title,
  e.starts_at
FROM tickets t
JOIN users u ON t.user_id = u.id
JOIN events e ON t.event_id = e.id
LIMIT 5;
