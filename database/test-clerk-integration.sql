-- Test script to verify Clerk integration is working
-- Run this in Supabase SQL Editor to create test data

-- Step 1: Create a test user with a Clerk-like ID
INSERT INTO users (id, email, first_name, last_name) 
VALUES ('user_test123456789', 'test@example.com', 'Test', 'User')
ON CONFLICT (id) DO NOTHING;

-- Step 2: Create a test event
INSERT INTO events (id, title, venue, event_date, event_time, starts_at, event_type, status) 
VALUES (
  'event_test123', 
  'Test Event', 
  'Test Venue', 
  '2025-09-01', 
  '18:00:00', 
  '2025-09-01 18:00:00+00',
  'workshop',
  'upcoming'
) ON CONFLICT (id) DO NOTHING;

-- Step 3: Create a test ticket
INSERT INTO tickets (id, user_id, event_id, booking_id, ticket_type, status) 
VALUES (
  'ticket_test123',
  'user_test123456789',  -- This should match the Clerk user ID
  'event_test123',
  'booking_test123',
  'regular',
  'confirmed'
) ON CONFLICT (id) DO NOTHING;

-- Step 4: Verify the test data
SELECT 
  'Test Data Created' as status,
  (SELECT COUNT(*) FROM users WHERE id = 'user_test123456789') as users_count,
  (SELECT COUNT(*) FROM events WHERE id = 'event_test123') as events_count,
  (SELECT COUNT(*) FROM tickets WHERE id = 'ticket_test123') as tickets_count;

-- Step 5: Test the relationship query (simulates what the API does)
SELECT 
  t.id as ticket_id,
  t.status as ticket_status,
  t.user_id,
  u.email,
  e.title as event_title,
  e.venue,
  e.starts_at
FROM tickets t
JOIN users u ON t.user_id = u.id
JOIN events e ON t.event_id = e.id
WHERE t.user_id = 'user_test123456789';

-- Step 6: Clean up test data (uncomment to remove test data)
-- DELETE FROM tickets WHERE id = 'ticket_test123';
-- DELETE FROM events WHERE id = 'event_test123'; 
-- DELETE FROM users WHERE id = 'user_test123456789';
