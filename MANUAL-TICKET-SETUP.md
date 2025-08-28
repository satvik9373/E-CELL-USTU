# 🎫 Manual Ticket Setup Guide

Follow these steps to manually create tickets that will show up in your dashboard.

## Step 1: Get Your Clerk User ID

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to **Users** section
3. Find your test user account
4. Copy the **User ID** (looks like `user_abc123...`)

## Step 2: Run the Cleanup Script

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Paste and run the contents of `database/clean-setup.sql`
3. This will create 3 clean events and show their IDs

## Step 3: Insert Tickets Manually

Go to **Supabase Dashboard** → **Table Editor** → **tickets**

Click **Insert Row** and create these 3 tickets:

### Ticket 1 - PPT Workshop
```
id: [leave blank - auto-generated]
user_id: YOUR_CLERK_USER_ID (paste here)
event_id: [copy PPT Workshop event ID from Step 2]
booking_id: BOOK001
ticket_type: regular
status: RESERVED
qr_payload: dummy-qr-ppt
pdf_path: [leave blank]
created_at: [leave blank - auto-generated]
updated_at: [leave blank]
```

### Ticket 2 - Pitching Event
```
id: [leave blank - auto-generated]
user_id: YOUR_CLERK_USER_ID (same as above)
event_id: [copy Pitching Event event ID from Step 2]
booking_id: BOOK002
ticket_type: vip
status: RESERVED
qr_payload: dummy-qr-pitch
pdf_path: [leave blank]
created_at: [leave blank - auto-generated]
updated_at: [leave blank]
```

### Ticket 3 - Innovation Summit
```
id: [leave blank - auto-generated]
user_id: YOUR_CLERK_USER_ID (same as above)
event_id: [copy Innovation Summit event ID from Step 2]
booking_id: BOOK003
ticket_type: regular
status: CONFIRMED
qr_payload: dummy-qr-summit
pdf_path: [leave blank]
created_at: [leave blank - auto-generated]
updated_at: [leave blank]
```

## Step 4: Verify Setup

Run this query in **Supabase SQL Editor**:

```sql
-- Check your tickets
SELECT 
  t.id,
  t.status,
  t.ticket_type,
  t.user_id,
  e.title as event_title,
  e.venue,
  e.starts_at
FROM tickets t
JOIN events e ON t.event_id = e.id
WHERE t.user_id = 'YOUR_CLERK_USER_ID'; -- Replace with your actual Clerk ID
```

You should see 3 rows with your tickets.

## Step 5: Test Dashboard

1. Sign in to your app with the same user account
2. Go to `/dashboard/tickets`
3. You should see:
   - **PPT Workshop** (RESERVED, regular)
   - **Pitching Event** (RESERVED, vip)
   - **Innovation Summit** (CONFIRMED, regular)

## Step 6: Check Logs

Open browser **Developer Tools** → **Console** and look for:

```
🎫 Fetching tickets for Clerk user: user_abc123...
✅ Found 3 tickets for user user_abc123...
```

## Troubleshooting

### No tickets showing?
1. Check your Clerk user ID matches exactly
2. Verify you're signed in as the correct user
3. Check browser console for errors

### API errors?
1. Check server logs for detailed errors
2. Verify database connection
3. Ensure all event IDs are valid UUIDs

### Database errors?
1. Make sure `tickets.user_id` is type TEXT
2. Verify foreign key constraints are satisfied
3. Check that events exist before creating tickets

## Expected Result

Your dashboard should display a clean table with 3 tickets, complete with:
- ✅ Event names and details
- ✅ Proper status badges
- ✅ Venue and date information
- ✅ Action buttons (View/Download)

🎉 **Success!** Your Clerk integration is now working properly.
