-- Fix the users table schema to match Clerk integration
-- This script updates the database to use Clerk user IDs directly as primary keys

-- Step 1: Create a new users table with the correct structure
CREATE TABLE IF NOT EXISTS users_new (
    id TEXT PRIMARY KEY, -- This will be the Clerk user ID directly
    email TEXT,
    first_name TEXT,
    last_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Migrate existing data if any
-- INSERT INTO users_new (id, email, first_name, last_name, created_at, updated_at)
-- SELECT clerk_user_id, email, first_name, last_name, created_at, updated_at
-- FROM users
-- WHERE clerk_user_id IS NOT NULL;

-- Step 3: Drop old users table (BE CAREFUL - backup first!)
-- DROP TABLE IF EXISTS users CASCADE;

-- Step 4: Rename new table
-- ALTER TABLE users_new RENAME TO users;

-- Step 5: Update tickets table to reference the new users structure
-- The tickets.user_id should now directly reference Clerk user IDs (TEXT)
ALTER TABLE tickets ALTER COLUMN user_id TYPE TEXT;

-- Step 6: Clean up any test data
DELETE FROM tickets WHERE user_id LIKE 'test_user_%';

-- Step 7: Create indexes
CREATE INDEX IF NOT EXISTS idx_users_id ON users(id);
CREATE INDEX IF NOT EXISTS idx_tickets_user_id ON tickets(user_id);

-- Step 8: Verify the structure
\d users;
\d tickets;

-- Alternative: If you want to keep existing structure and just fix the data
-- UPDATE users SET id = clerk_user_id WHERE clerk_user_id IS NOT NULL;
-- ALTER TABLE users DROP COLUMN clerk_user_id;
