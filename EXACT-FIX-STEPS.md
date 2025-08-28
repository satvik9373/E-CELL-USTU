# 🎯 EXACT STEPS TO FIX YOUR DASHBOARD 

Based on your Supabase screenshots, here's exactly what you need to do:

## Step 1: Get Your Clerk User ID

1. Open your browser Developer Tools (F12)
2. Go to your dashboard page while logged in
3. Look in the Console tab for a log like:
   ```
   🎫 Fetching tickets for Clerk user: user_xxxxxxxxxxxxx
   ```
4. Copy that `user_xxxxxxxxxxxxx` - this is your actual Clerk user ID

**Alternative method:**
1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Click on **Users** 
3. Find your user account
4. Copy the **User ID**

## Step 2: Fix Database Schema (Run in Supabase SQL Editor)

```sql
-- Make sure columns can store Clerk user IDs (text format)
ALTER TABLE tickets ALTER COLUMN user_id TYPE TEXT;
ALTER TABLE users ALTER COLUMN id TYPE TEXT;

-- Add missing columns if they don't exist
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS qr_payload TEXT;
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS pdf_path TEXT;
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS booking_id TEXT;
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS ticket_type TEXT DEFAULT 'regular';
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';

-- Update events to have starts_at column for consistency
ALTER TABLE events ADD COLUMN IF NOT EXISTS starts_at TIMESTAMP WITH TIME ZONE;
UPDATE events 
SET starts_at = (event_date::text || ' ' || COALESCE(event_time::text, '18:00:00'))::timestamp with time zone
WHERE starts_at IS NULL AND event_date IS NOT NULL;
```

## Step 3: Create Tickets for Your Events

**Using the event IDs from your screenshot:**
- Concert Night 2025: `7e04d4fb-2ef4-4140-e92c-b8080e4e497c`
- Tech Fest 2025: `9ffce851-fabf-493b-85ae-6e896122b80c`

```sql
-- Replace YOUR_CLERK_USER_ID with your actual Clerk user ID from Step 1
INSERT INTO tickets (
    id,
    user_id, 
    event_id, 
    booking_id, 
    ticket_type, 
    status, 
    payment_status,
    qr_payload,
    created_at
) VALUES 
-- Ticket for Concert Night 2025
(
    gen_random_uuid(),
    'YOUR_CLERK_USER_ID',  -- Replace this!
    '7e04d4fb-2ef4-4140-e92c-b8080e4e497c',
    'BOOK_CONCERT_001',
    'vip',
    'CONFIRMED',
    'paid',
    'QR_CONCERT_001',
    NOW()
),
-- Ticket for Tech Fest 2025
(
    gen_random_uuid(),
    'YOUR_CLERK_USER_ID',  -- Replace this!
    '9ffce851-fabf-493b-85ae-6e896122b80c',
    'BOOK_TECH_002',
    'regular',
    'RESERVED',
    'pending',
    'QR_TECH_002',
    NOW()
)
ON CONFLICT (id) DO NOTHING;
```

## Step 4: Verify Your Setup

```sql
-- Check if tickets were created correctly
SELECT 
    t.id,
    t.user_id,
    t.status,
    t.ticket_type,
    e.title as event_title,
    e.venue
FROM tickets t
JOIN events e ON t.event_id = e.id
WHERE t.user_id = 'YOUR_CLERK_USER_ID'  -- Replace with your actual ID
ORDER BY t.created_at DESC;
```

## Step 5: Test Your Dashboard

1. Go to your dashboard: `localhost:3000/dashboard/tickets`
2. You should now see:
   - **Concert Night 2025** (VIP, CONFIRMED)
   - **Tech Fest 2025** (Regular, RESERVED)

## Step 6: Check Browser Console

Open Developer Tools → Console and look for:
```
🎫 Fetching tickets for Clerk user: user_xxxxxxxxxxxxx
✅ Found 2 tickets for user user_xxxxxxxxxxxxx
API Response Status: 200
API Response Data: {tickets: Array(2)}
```

## Troubleshooting

### If you still see "No tickets found":

1. **Check user ID match:**
   ```sql
   SELECT user_id FROM tickets;
   ```
   Make sure it matches your Clerk user ID exactly.

2. **Check API response:**
   - Open Network tab in Developer Tools
   - Refresh dashboard
   - Click on `/api/tickets` request
   - Check the response

3. **Check server logs:**
   - Look at your terminal/console where your Next.js app is running
   - Should see the log messages

### If API returns error:

1. Check your Supabase connection
2. Verify environment variables
3. Make sure you're signed in to Clerk

## Expected Result

Your dashboard should display a table with:
- ✅ 2 tickets 
- ✅ Event names (Concert Night 2025, Tech Fest 2025)
- ✅ Status badges (CONFIRMED, RESERVED)
- ✅ Venue information
- ✅ View/Download buttons

That's it! Your dashboard should now work perfectly! 🎉
