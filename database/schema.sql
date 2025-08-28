-- Database schema for E-Cell Dashboard
-- Run these commands in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table to store user data from Clerk
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clerk_user_id TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    venue TEXT NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    capacity INTEGER NOT NULL DEFAULT 100,
    ticket_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    event_type TEXT CHECK (event_type IN ('summit', 'workshop', 'competition', 'networking')) NOT NULL,
    status TEXT CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')) DEFAULT 'upcoming',
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tickets table
CREATE TABLE IF NOT EXISTS tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    booking_id TEXT UNIQUE NOT NULL,
    ticket_type TEXT CHECK (ticket_type IN ('vip', 'regular', 'workshop')) NOT NULL,
    status TEXT CHECK (status IN ('confirmed', 'pending', 'cancelled')) DEFAULT 'pending',
    payment_status TEXT CHECK (payment_status IN ('paid', 'pending', 'failed')) DEFAULT 'pending',
    qr_code TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certificates table
CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    certificate_type TEXT CHECK (certificate_type IN ('participation', 'winner', 'runner_up')) NOT NULL,
    issued_date DATE NOT NULL,
    pdf_url TEXT,
    certificate_id TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certificate requests table
CREATE TABLE IF NOT EXISTS certificate_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    rejection_reason TEXT,
    requested_date DATE NOT NULL,
    processed_date DATE,
    processed_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_tickets_user_id ON tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_tickets_event_id ON tickets(event_id);
CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_event_id ON certificates(event_id);
CREATE INDEX IF NOT EXISTS idx_certificate_requests_user_id ON certificate_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_certificate_requests_event_id ON certificate_requests(event_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON tickets FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_certificates_updated_at BEFORE UPDATE ON certificates FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_certificate_requests_updated_at BEFORE UPDATE ON certificate_requests FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Insert sample data for testing
INSERT INTO events (title, description, venue, event_date, event_time, capacity, ticket_price, event_type, status) VALUES
('Innovation Summit 2024', 'Annual innovation summit showcasing latest technologies', 'Main Auditorium', '2024-08-30', '10:00:00', 500, 0.00, 'summit', 'upcoming'),
('Startup Pitch Competition', 'Entrepreneurs pitch their innovative startup ideas', 'Conference Hall A', '2024-09-15', '14:00:00', 200, 25.00, 'competition', 'upcoming'),
('Tech Workshop Series', 'Hands-on workshop on emerging technologies', 'Lab Building', '2024-09-20', '09:00:00', 50, 15.00, 'workshop', 'upcoming'),
('AI Conference 2024', 'Conference on Artificial Intelligence and Machine Learning', 'Tech Center', '2024-08-10', '11:00:00', 300, 0.00, 'summit', 'completed'),
('Blockchain Workshop', 'Introduction to Blockchain and Web3', 'Innovation Lab', '2024-08-05', '15:00:00', 40, 20.00, 'workshop', 'completed'),
('Design Thinking Session', 'Creative problem solving workshop', 'Design Studio', '2024-07-25', '13:00:00', 60, 10.00, 'workshop', 'completed');

-- Sample booking ID generator function
CREATE OR REPLACE FUNCTION generate_booking_id()
RETURNS TEXT AS $$
BEGIN
    RETURN 'TKT-' || LPAD((EXTRACT(EPOCH FROM NOW())::BIGINT % 1000000)::TEXT, 6, '0') || '-2024';
END;
$$ LANGUAGE plpgsql;

-- Sample certificate ID generator function
CREATE OR REPLACE FUNCTION generate_certificate_id()
RETURNS TEXT AS $$
BEGIN
    RETURN 'CERT-' || LPAD((EXTRACT(EPOCH FROM NOW())::BIGINT % 1000000)::TEXT, 6, '0') || '-2024';
END;
$$ LANGUAGE plpgsql;

-- You can insert sample tickets and certificates after users are created through the app
-- The app will automatically create user records when they first log in through Clerk
