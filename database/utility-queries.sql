-- Database utility queries for E-Cell Dashboard

-- 1. View all users with their basic info
SELECT 
    id,
    clerk_user_id,
    email,
    first_name,
    last_name,
    created_at
FROM users
ORDER BY created_at DESC;

-- 2. View all events with their details
SELECT 
    id,
    title,
    venue,
    event_date,
    event_time,
    event_type,
    status,
    capacity
FROM events
ORDER BY event_date DESC;

-- 3. View tickets with user and event details
SELECT 
    t.id,
    t.booking_id,
    u.email as user_email,
    e.title as event_title,
    t.ticket_type,
    t.status,
    t.payment_status,
    t.created_at
FROM tickets t
JOIN users u ON t.user_id = u.id
JOIN events e ON t.event_id = e.id
ORDER BY t.created_at DESC;

-- 4. View certificates with user and event details
SELECT 
    c.id,
    c.certificate_id,
    u.email as user_email,
    e.title as event_title,
    c.certificate_type,
    c.issued_date,
    c.pdf_url
FROM certificates c
JOIN users u ON c.user_id = u.id
JOIN events e ON c.event_id = e.id
ORDER BY c.issued_date DESC;

-- 5. View certificate requests with user and event details
SELECT 
    cr.id,
    u.email as user_email,
    e.title as event_title,
    cr.status,
    cr.requested_date,
    cr.processed_date,
    cr.rejection_reason
FROM certificate_requests cr
JOIN users u ON cr.user_id = u.id
JOIN events e ON cr.event_id = e.id
ORDER BY cr.requested_date DESC;

-- 6. Find user by email
-- SELECT * FROM users WHERE email = 'user@example.com';

-- 7. Get all data for a specific user (replace with actual user ID)
-- SELECT 'Tickets' as data_type, t.booking_id as identifier, e.title as event, t.status
-- FROM tickets t
-- JOIN events e ON t.event_id = e.id
-- WHERE t.user_id = 'YOUR_USER_ID_HERE'
-- UNION ALL
-- SELECT 'Certificates' as data_type, c.certificate_id as identifier, e.title as event, c.certificate_type as status
-- FROM certificates c
-- JOIN events e ON c.event_id = e.id
-- WHERE c.user_id = 'YOUR_USER_ID_HERE'
-- UNION ALL
-- SELECT 'Requests' as data_type, cr.id::text as identifier, e.title as event, cr.status
-- FROM certificate_requests cr
-- JOIN events e ON cr.event_id = e.id
-- WHERE cr.user_id = 'YOUR_USER_ID_HERE';

-- 8. Create sample data for a specific user (replace YOUR_USER_ID_HERE with actual UUID)
-- This is a comprehensive query to create test data for a user

/*
-- Get events IDs first
WITH event_ids AS (
    SELECT id, title FROM events WHERE title IN (
        'Innovation Summit 2024', 
        'Startup Pitch Competition', 
        'Tech Workshop Series',
        'AI Conference 2024',
        'Blockchain Workshop'
    )
)
-- Insert tickets
INSERT INTO tickets (user_id, event_id, booking_id, ticket_type, status, payment_status, qr_code)
SELECT 
    'YOUR_USER_ID_HERE'::UUID,
    e.id,
    'TKT-' || LPAD((EXTRACT(EPOCH FROM NOW())::BIGINT + row_number() OVER ())::TEXT, 6, '0') || '-2024',
    CASE 
        WHEN e.title LIKE '%Summit%' THEN 'vip'
        WHEN e.title LIKE '%Workshop%' THEN 'workshop'
        ELSE 'regular'
    END,
    CASE 
        WHEN e.title = 'Startup Pitch Competition' THEN 'pending'
        ELSE 'confirmed'
    END,
    'paid',
    NULL
FROM event_ids e
WHERE e.title IN ('Innovation Summit 2024', 'Startup Pitch Competition', 'Tech Workshop Series');

-- Insert certificates for completed events
INSERT INTO certificates (user_id, event_id, certificate_type, issued_date, certificate_id)
SELECT 
    'YOUR_USER_ID_HERE'::UUID,
    e.id,
    CASE 
        WHEN e.title = 'AI Conference 2024' THEN 'winner'
        ELSE 'participation'
    END,
    CURRENT_DATE - INTERVAL '5 days',
    'CERT-' || LPAD((EXTRACT(EPOCH FROM NOW())::BIGINT + row_number() OVER ())::TEXT, 6, '0') || '-2024'
FROM event_ids e
WHERE e.title IN ('AI Conference 2024', 'Blockchain Workshop');

-- Insert certificate request
INSERT INTO certificate_requests (user_id, event_id, status, requested_date, rejection_reason)
SELECT 
    'YOUR_USER_ID_HERE'::UUID,
    (SELECT id FROM events WHERE title = 'Design Thinking Session'),
    'rejected',
    CURRENT_DATE - INTERVAL '3 days',
    'Did not meet attendance requirements (minimum 80% required)';
*/

-- 9. Clean up data for a specific user (DANGER: This will delete all user data)
-- DELETE FROM certificate_requests WHERE user_id = 'YOUR_USER_ID_HERE';
-- DELETE FROM certificates WHERE user_id = 'YOUR_USER_ID_HERE';
-- DELETE FROM tickets WHERE user_id = 'YOUR_USER_ID_HERE';
-- DELETE FROM users WHERE id = 'YOUR_USER_ID_HERE';

-- 10. Count records by table
SELECT 
    'users' as table_name, 
    COUNT(*) as record_count 
FROM users
UNION ALL
SELECT 
    'events' as table_name, 
    COUNT(*) as record_count 
FROM events
UNION ALL
SELECT 
    'tickets' as table_name, 
    COUNT(*) as record_count 
FROM tickets
UNION ALL
SELECT 
    'certificates' as table_name, 
    COUNT(*) as record_count 
FROM certificates
UNION ALL
SELECT 
    'certificate_requests' as table_name, 
    COUNT(*) as record_count 
FROM certificate_requests;
