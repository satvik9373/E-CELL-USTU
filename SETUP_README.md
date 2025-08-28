# E-CELL USTU - Event Booking System

A full-stack Next.js application with Clerk authentication and Supabase database for event booking and ticket management.

## 🚀 Features

- **Event Listing**: Real-time event display with live updates
- **User Authentication**: Secure login/signup with Clerk
- **Ticket Booking**: One-click event booking with duplicate prevention
- **Dashboard**: User ticket management with PDF downloads
- **Real-time Updates**: Live synchronization using Supabase real-time subscriptions
- **Capacity Management**: Automatic sold-out detection and booking prevention
- **PDF Generation**: Downloadable event tickets with QR codes

## 🛠️ Tech Stack

- **Frontend**: Next.js 13, TypeScript, Tailwind CSS
- **Authentication**: Clerk
- **Database**: Supabase (PostgreSQL)
- **UI Components**: shadcn/ui
- **PDF Generation**: jsPDF
- **Real-time**: Supabase Realtime

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Clerk account

## ⚙️ Environment Setup

Create a `.env.local` file in the root directory:

```bash
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase Configuration  
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## 🗄️ Database Schema

The application uses three main tables:

### `users`
```sql
CREATE TABLE users (
  id text PRIMARY KEY,              -- Clerk user ID
  email text,
  created_at timestamp DEFAULT now()
);
```

### `events`
```sql
CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  venue text,
  starts_at timestamptz NOT NULL,
  event_time text,
  capacity integer,
  ticket_price numeric,
  event_type text CHECK (event_type IN ('summit', 'workshop', 'competition', 'networking')),
  status text DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  image_url text,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);
```

### `tickets`
```sql
CREATE TABLE tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL REFERENCES users(id),
  event_id uuid NOT NULL REFERENCES events(id),
  status text DEFAULT 'RESERVED' CHECK (status IN ('RESERVED', 'CONFIRMED', 'CANCELLED')),
  qr_payload text,
  pdf_path text,
  created_at timestamp DEFAULT now(),
  UNIQUE(user_id, event_id)  -- Prevent duplicate bookings
);
```

## 🔐 Row Level Security (RLS)

The database uses RLS policies for security:

- **Users**: Can only access their own profile data
- **Events**: Public read access, admin-only write
- **Tickets**: Users can only see/modify their own tickets

## 🌱 Database Seeding

1. Open Supabase SQL Editor
2. Run the provided `seed_events.sql` script to create sample events:

```sql
-- The script creates 5 sample events:
-- 1. IIT Innovation Summit 2025
-- 2. AI & Machine Learning Workshop  
-- 3. Startup Pitch Competition
-- 4. Networking Night: Future Entrepreneurs
-- 5. Web Development Bootcamp
```

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-cell-ustu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Fill in your Clerk and Supabase credentials

4. **Set up Supabase database**
   - Create tables using the schema above
   - Enable RLS and create policies
   - Run the seed script for sample data

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the application**
   - Visit `http://localhost:3000`
   - Sign up/login to test booking flow

## 🧪 Testing the Application

### User Flow Testing

1. **Events Page** (`/events`)
   - View events without login
   - Try booking without authentication (should prompt login)
   - Sign in and book an event
   - Verify real-time updates when events are added in Supabase

2. **Dashboard** (`/dashboard/tickets`)
   - View booked tickets
   - Download PDF tickets
   - Verify real-time updates when tickets are modified

3. **Duplicate Booking Prevention**
   - Try booking the same event twice
   - Should show "Already Booked" message

4. **Capacity Management**
   - Book all available spots for an event
   - Verify "Sold Out" state appears

### Database Testing

1. **Add Event in Supabase**
   ```sql
   INSERT INTO events (title, venue, starts_at, capacity, event_type) 
   VALUES ('Test Event', 'Test Venue', '2025-12-01T10:00:00+05:30', 10, 'workshop');
   ```
   - Event should appear immediately on frontend

2. **RLS Policy Testing**
   - Try accessing another user's tickets (should fail)
   - Verify users can only book tickets for themselves

## 📁 Project Structure

```
src/
├── app/
│   ├── events/page.tsx              # Events listing page
│   ├── (protected)/dashboard/
│   │   └── tickets/page.tsx         # User tickets dashboard
│   └── success/page.tsx             # Ticket download page
├── lib/
│   ├── supabaseClient.ts            # Supabase client configuration
│   ├── authHelpers.ts               # Clerk authentication helpers
│   └── database.ts                  # Database operations
├── components/
│   ├── ui/                          # shadcn/ui components
│   └── layout/                      # Layout components
└── hooks/
    └── use-toast.ts                 # Toast notification hook
```

## 🔧 Key Components

### Database Operations (`lib/database.ts`)
- `getEventsWithTicketInfo()` - Fetch events with booking status
- `bookTicket()` - Create ticket with duplicate prevention
- `getUserTickets()` - Get user's tickets with event details
- `subscribeToEvents()` - Real-time event updates
- `subscribeToUserTickets()` - Real-time ticket updates

### Authentication (`lib/authHelpers.ts`)
- `useAuthUser()` - Hook for Clerk user data and Supabase sync
- Automatic user creation in Supabase on first login

### Events Page Features
- Real-time event loading
- Capacity checking
- User booking status
- Loading states and error handling
- Toast notifications for all actions

### Dashboard Features
- Real-time ticket updates
- PDF ticket downloads
- Ticket status management
- Event details with booking history

## 🎯 Error Handling

The application handles various error scenarios:

- **Duplicate Bookings**: Unique constraint violations
- **Capacity Full**: Event sold out scenarios  
- **Authentication Errors**: Invalid or expired tokens
- **Network Failures**: Connection timeouts and retries
- **Permission Errors**: RLS policy violations

## 🔄 Real-time Updates

The app uses Supabase real-time subscriptions for:

1. **Events table**: New events appear immediately
2. **Tickets table**: Booking updates reflect instantly
3. **Capacity changes**: Sold-out states update in real-time

## 📱 Responsive Design

- Mobile-first responsive design
- Touch-friendly interfaces
- Optimized for all screen sizes
- Progressive web app capabilities

## 🚀 Deployment

The application can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**  
- **AWS Amplify**
- Any platform supporting Next.js

### Environment Variables for Production

Ensure all environment variables are set in your deployment platform:
- Clerk keys for authentication
- Supabase URL and anon key (public)
- Service role key should only be used server-side

## 🛡️ Security Best Practices

1. **Never expose service role key** in client code
2. **Use RLS policies** for all database access
3. **Validate user inputs** on both client and server
4. **Use HTTPS** in production
5. **Regular security audits** of dependencies

## 🐛 Troubleshooting

### Common Issues

1. **Events not loading**
   - Check Supabase connection
   - Verify RLS policies are correct
   - Check browser console for errors

2. **Authentication errors**  
   - Verify Clerk keys are correct
   - Check user exists in Supabase users table
   - Verify RLS policies allow user operations

3. **Real-time not working**
   - Check Supabase real-time is enabled
   - Verify subscription channels are unique
   - Check network connectivity

4. **Booking failures**
   - Check unique constraint on tickets table
   - Verify event capacity settings
   - Check user authentication status

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support, please contact the E-Cell USTU team or create an issue in the repository.
