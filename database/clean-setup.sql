-- 🧹 COMPLETE CLEANUP AND FRESH SETUP
-- Run this script in Supabase SQL Editor to create a clean working environment

-- Step 1: Clean up all test data
DELETE FROM tickets WHERE user_id LIKE 'test_%' OR user_id LIKE 'user_test%';
DELETE FROM users WHERE id LIKE 'test_%' OR id LIKE 'user_test%';
DELETE FROM events WHERE title LIKE '%Test%' OR title LIKE '%test%' OR title LIKE '%Concert%';

-- Step 2: Update users table to use Clerk ID as primary key (if not already done)
-- First, ensure tickets.user_id can store TEXT (Clerk user IDs)
ALTER TABLE tickets ALTER COLUMN user_id TYPE TEXT;

-- Step 3: Create 3 clean events
INSERT INTO events (id, title, description, venue, event_date, event_time, starts_at, event_type, status, capacity, ticket_price) 
VALUES 
  (
    gen_random_uuid(),
    'PPT Workshop',
    'Learn advanced PowerPoint techniques and presentation skills for entrepreneurship',
    'E-Cell Conference Room A',
    '2025-09-15',
    '14:00:00',
    '2025-09-15 14:00:00+00',
    'workshop',
    'upcoming',
    50,
    0.00
  ),
  (
    gen_random_uuid(),
    'Pitching Event',
    'Startup pitch competition with industry experts and investors',
    'Main Auditorium',
    '2025-09-20',
    '18:00:00',
    '2025-09-20 18:00:00+00',
    'competition',
    'upcoming',
    100,
    100.00
  ),
  (
    gen_random_uuid(),
    'Innovation Summit',
    'Annual innovation summit featuring keynote speakers and networking',
    'University Convention Center',
    '2025-09-25',
    '09:00:00',
    '2025-09-25 09:00:00+00',
    'summit',
    'upcoming',
    200,
    250.00
  )
ON CONFLICT (id) DO NOTHING;

-- Step 4: Display the created events for reference
SELECT 
  id,
  title,
  venue,
  starts_at,
  event_type,
  status
FROM events 
WHERE title IN ('PPT Workshop', 'Pitching Event', 'Innovation Summit')
ORDER BY starts_at;

-- Step 5: Instructions for manual ticket insertion
SELECT 
  '🎫 NEXT STEP: Insert tickets manually in Supabase Table Editor' as instruction,
  'Use the event IDs shown above' as note,
  'Replace YOUR_CLERK_USER_ID with your actual Clerk user ID' as important;

-- Step 6: Template for manual ticket insertion (copy these values)
-- For PPT Workshop:
-- user_id: YOUR_CLERK_USER_ID (e.g., user_abc123)
-- event_id: [Copy from PPT Workshop row above]
-- status: RESERVED
-- ticket_type: regular
-- booking_id: BOOK001
-- qr_payload: dummy-qr-ppt

-- For Pitching Event:
-- user_id: YOUR_CLERK_USER_ID
-- event_id: [Copy from Pitching Event row above]
-- status: RESERVED
-- ticket_type: vip
-- booking_id: BOOK002
-- qr_payload: dummy-qr-pitch

-- For Innovation Summit:
-- user_id: YOUR_CLERK_USER_ID
-- event_id: [Copy from Innovation Summit row above]
-- status: CONFIRMED
-- ticket_type: regular
-- booking_id: BOOK003
-- qr_payload: dummy-qr-summit
