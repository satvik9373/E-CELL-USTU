# E-Cell Dashboard - Supabase Integration

This guide will help you set up the E-Cell Dashboard with Supabase integration for real data.

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install @supabase/supabase-js
```

### 2. Environment Variables

Your `.env.local` file should already contain:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://nwabsrocviupmoobkmsc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Database Setup

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard
2. **Open SQL Editor** in your project
3. **Run the schema creation script**:
   - Copy the contents of `database/schema.sql`
   - Paste and execute in the SQL Editor

### 4. Test the Integration

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Sign in to your app** to create a user record

3. **Add sample data** (optional):
   - Go to Supabase SQL Editor
   - Run: `SELECT id, email FROM users;` to get your user ID
   - Copy the user ID
   - Open `database/sample-data.sql`
   - Replace `'YOUR_USER_ID_HERE'` with your actual user ID
   - Uncomment and run the INSERT statements

## 📊 Database Schema

### Tables Created:
- **users**: Stores user data synced from Clerk
- **events**: E-Cell events and workshops
- **tickets**: User ticket reservations
- **certificates**: Issued certificates
- **certificate_requests**: Certificate request tracking

### Key Features:
- ✅ **Automatic user creation** when logging in via Clerk
- ✅ **Real-time data** from Supabase
- ✅ **Server-side API routes** for secure data access
- ✅ **Type-safe** database operations with TypeScript
- ✅ **No RLS complexity** - uses service role for simplicity

## 🔧 API Endpoints

The following API routes are created:

- `GET /api/dashboard/tickets` - Get user tickets
- `GET /api/dashboard/tickets/[ticketId]` - Get specific ticket with QR
- `GET /api/dashboard/certificates` - Get certificates, eligible events, and requests
- `POST /api/dashboard/certificates/request` - Create certificate request

## 🧪 Testing

1. **View your data** in Supabase Dashboard:
   - Go to Table Editor
   - Check the `users`, `events`, `tickets`, `certificates` tables

2. **Use utility queries**:
   - Open `database/utility-queries.sql`
   - Run the queries to view and manage your data

3. **Test the dashboard**:
   - Navigate to `/dashboard` in your app
   - Check that real data loads (or empty states if no data)

## 🐛 Troubleshooting

### Common Issues:

1. **"Module not found" error for @supabase/supabase-js**:
   ```bash
   npm install @supabase/supabase-js
   # or
   npm install --force
   ```

2. **"User not found" in API**:
   - Make sure you've logged in at least once
   - Check if user record exists: `SELECT * FROM users;`

3. **Empty dashboard**:
   - Add sample data using `database/sample-data.sql`
   - Check API responses in browser DevTools

4. **Authentication errors**:
   - Verify Clerk configuration
   - Check middleware.ts protects dashboard routes

## 📝 Data Flow

1. **User logs in** → Clerk handles authentication
2. **Dashboard loads** → API routes check Clerk auth
3. **User record created** → First time users are added to Supabase
4. **Data fetched** → Server-side queries with service role
5. **UI updates** → Real data displays in dashboard

## 🔄 Making Changes

### Adding New Data:
1. Use Supabase Dashboard Table Editor
2. Or run SQL queries in SQL Editor
3. Data will automatically appear in dashboard

### Modifying Schema:
1. Update `lib/supabase.ts` types
2. Update `lib/database.ts` functions
3. Run migration SQL in Supabase

### Adding Features:
1. Create new API routes in `app/api/dashboard/`
2. Update frontend components to use new endpoints
3. Add necessary database tables/columns

## 📚 File Structure

```
lib/
├── supabase.ts          # Supabase client & types
└── database.ts          # Database helper functions

app/api/dashboard/
├── tickets/route.ts     # Tickets API
├── certificates/route.ts # Certificates API
└── certificates/request/route.ts # Request API

database/
├── schema.sql           # Database schema
├── sample-data.sql      # Sample data
└── utility-queries.sql  # Helpful queries
```

## 🎯 Next Steps

- [ ] Add real QR code generation for tickets
- [ ] Implement PDF certificate generation
- [ ] Add email notifications for certificate requests
- [ ] Create admin dashboard for certificate approval
- [ ] Add event registration functionality
- [ ] Implement file upload for certificate PDFs
