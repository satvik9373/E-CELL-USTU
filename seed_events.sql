-- Seed script for sample events
-- Run this in the Supabase SQL Editor to create test events

-- First ensure the tables exist with proper RLS policies
-- (This should already be done, but included for completeness)

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Users policies (users can only see/modify their own data)
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid()::text = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid()::text = id);

-- Events policies (public read, admin-only write)
CREATE POLICY "Events are publicly readable" ON events
  FOR SELECT USING (true);

-- Tickets policies (users can only see/modify their own tickets)
CREATE POLICY "Users can view own tickets" ON tickets
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own tickets" ON tickets
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own tickets" ON tickets
  FOR UPDATE USING (auth.uid()::text = user_id);

-- Insert sample events
INSERT INTO events (
  id,
  title,
  description,
  venue,
  starts_at,
  event_time,
  capacity,
  ticket_price,
  event_type,
  status,
  image_url,
  created_at,
  updated_at
) VALUES 
(
  gen_random_uuid(),
  'IIT Innovation Summit 2025',
  'Join us for the most anticipated innovation summit of the year! Connect with industry leaders, showcase your ideas, and discover the future of technology. This flagship event brings together entrepreneurs, investors, and innovators from across the country.',
  'USTU Main Auditorium',
  '2025-10-15T10:00:00+05:30',
  '10:00 AM - 6:00 PM',
  500,
  499,
  'summit',
  'upcoming',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
  now(),
  now()
),
(
  gen_random_uuid(),
  'AI & Machine Learning Workshop',
  'Hands-on workshop covering the latest in artificial intelligence and machine learning. Learn practical skills from industry experts and work on real-world projects. Perfect for students and professionals looking to upskill.',
  'Computer Science Lab - USTU',
  '2025-09-20T14:00:00+05:30',
  '2:00 PM - 5:00 PM',
  50,
  299,
  'workshop',
  'upcoming',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
  now(),
  now()
),
(
  gen_random_uuid(),
  'Startup Pitch Competition',
  'The ultimate platform for budding entrepreneurs to showcase their innovative ideas! Compete for funding opportunities, mentorship, and a chance to launch your startup. Open to all students and early-stage entrepreneurs.',
  'Seminar Hall A - USTU',
  '2025-09-30T11:00:00+05:30',
  '11:00 AM - 4:00 PM',
  100,
  199,
  'competition',
  'upcoming',
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop',
  now(),
  now()
),
(
  gen_random_uuid(),
  'Networking Night: Future Entrepreneurs',
  'An exclusive networking evening for aspiring entrepreneurs, industry mentors, and investors. Build meaningful connections, share ideas, and discover collaboration opportunities in a relaxed, professional environment.',
  'E-Cell Lounge - USTU',
  '2025-10-05T18:00:00+05:30',
  '6:00 PM - 9:00 PM',
  75,
  149,
  'networking',
  'upcoming',
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop',
  now(),
  now()
),
(
  gen_random_uuid(),
  'Web Development Bootcamp',
  'Intensive 3-day bootcamp covering modern web development technologies including React, Node.js, and database integration. From basics to deployment - learn to build full-stack applications.',
  'Tech Hub - USTU',
  '2025-11-10T09:00:00+05:30',
  '9:00 AM - 6:00 PM (3 days)',
  30,
  799,
  'workshop',
  'upcoming',
  'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop',
  now(),
  now()
);

-- Verify the data was inserted
SELECT 
  title,
  venue,
  starts_at,
  event_type,
  capacity,
  ticket_price,
  status
FROM events 
ORDER BY starts_at;
