-- 🎫 CREATE TICKETS FOR YOUR ACTUAL CLERK USER ID
-- Run this in Supabase SQL Editor

-- Step 1: First, let's see what's currently in your tables
SELECT 'Current Events:' as info;
SELECT id, title, venue, starts_at FROM events;

SELECT 'Current Tickets:' as info;
SELECT id, user_id, event_id, status FROM tickets;

SELECT 'Current Users:' as info;
SELECT id, email FROM users;

-- Step 2: Clean up any test tickets that might be interfering
DELETE FROM tickets WHERE user_id LIKE 'test_%' OR user_id LIKE 'user_test%';

-- Step 3: Get your events (we'll use these IDs for tickets)
-- Copy the event IDs from the query above to use in the INSERT statements below

-- Step 4: Insert tickets for YOUR ACTUAL CLERK USER ID
-- IMPORTANT: Replace 'YOUR_ACTUAL_CLERK_USER_ID' with your real Clerk user ID
-- You can find this in Clerk Dashboard → Users → Your User → Copy User ID

-- Example tickets (update the user_id and event_id values):
INSERT INTO tickets (
    id,
    user_id, 
    event_id, 
    booking_id, 
    ticket_type, 
    status, 
    payment_status,
    qr_code,
    created_at
) VALUES 
-- Ticket 1: For Concert Night 2025
(
    gen_random_uuid(),
    'YOUR_ACTUAL_CLERK_USER_ID',  -- Replace with your Clerk user ID
    '7e04d4fb-2ef4-4140-e92c-b8080e4e497c',  -- Concert Night event ID from your screenshot
    'BOOK_CONCERT_001',
    'vip',
    'CONFIRMED',
    'paid',
    'QR_CONCERT_001',
    NOW()
),
-- Ticket 2: For Tech Fest 2025  
(
    gen_random_uuid(),
    'YOUR_ACTUAL_CLERK_USER_ID',  -- Replace with your Clerk user ID  
    '9ffce851-fabf-493b-85ae-6e896122b80c',  -- Tech Fest event ID from your screenshot
    'BOOK_TECH_002',
    'regular',
    'RESERVED',
    'pending',
    'QR_TECH_002',
    NOW()
)
ON CONFLICT (id) DO NOTHING;

-- Step 5: Verify the tickets were created
SELECT 
    t.id,
    t.user_id,
    t.status,
    t.ticket_type,
    e.title as event_title,
    e.venue,
    e.starts_at
FROM tickets t
JOIN events e ON t.event_id = e.id
WHERE t.user_id = 'YOUR_ACTUAL_CLERK_USER_ID'  -- Replace with your Clerk user ID
ORDER BY t.created_at DESC;
