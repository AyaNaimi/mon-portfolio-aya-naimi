# Admin Authentication Setup Guide

## Overview
The admin interface uses Supabase Authentication for secure access. The system is now simplified and no longer uses JWT tokens.

## Database Setup

First, run the SQL script to create the admin_users table:

1. Go to your Supabase project
2. Navigate to SQL Editor
3. Create a new query and paste the content from `scripts/create-admin-table.sql`
4. Execute the query

This will create:
- `admin_users` table with user data
- Default admin user with username: `admin`
- Row Level Security policies

## Create Supabase Auth User

You need to create a corresponding auth user in Supabase:

1. Go to Supabase Dashboard > Authentication > Users
2. Click "Create new user"
3. Use email: `admin@example.com`
4. Set a strong password (this will be used in login form)
5. Click "Create user"

## Environment Variables

Make sure these environment variables are set in your Vercel project (Vars section):

\`\`\`
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-strong-password-here
\`\`\`

These are used as fallback credentials. The actual authentication happens through Supabase.

## Login Flow

1. User enters username and password in the login form
2. System looks up the username in `admin_users` table
3. Matches the email to the Supabase Auth account
4. Signs in using Supabase `signInWithPassword`
5. Session is established via Supabase's secure session management
6. User is redirected to `/admin` dashboard

## Testing

1. Navigate to `/admin`
2. You should see the login form
3. Enter:
   - Username: `admin`
   - Password: your-set-password
4. Click "Se connecter"
5. You should be redirected to the admin dashboard

## Troubleshooting

### Login button doesn't work
- Check browser console (F12) for errors
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Ensure Supabase auth user exists with email `admin@example.com`

### "Invalid credentials" error
- Verify the Supabase auth user password is set correctly
- Check that `admin_users` table has an entry with username "admin"
- Confirm email matches between auth user and admin_users table

### "No active session" message
- This means the login succeeded but session wasn't established
- Check Supabase project settings > Auth > Providers > Email is enabled
- Verify NEXT_PUBLIC_SUPABASE_ANON_KEY has correct permissions

## Security Notes

- Passwords are never stored in your code
- All credentials come from environment variables or Supabase Auth
- Session tokens are managed securely by Supabase
- Row Level Security prevents unauthorized database access
