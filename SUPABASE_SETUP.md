# Supabase Integration Setup Guide

This portfolio has been fully integrated with Supabase for dynamic content management. Follow these steps to get started.

## Prerequisites

- Supabase project connected (verify in the "Connect" section of the sidebar)
- All environment variables set up in the "Vars" section

## Step 1: Create the Database Schema

The database schema has been created with the following tables:

- `projects` - Store your portfolio projects
- `skills` - Store your technical skills by category
- `about_info` - Store your biography and profile information
- `timeline` - Store your career/education timeline
- `contact_messages` - Store messages from the contact form

To set up the database:

1. Go to the "Vars" section in the sidebar
2. Ensure all Supabase environment variables are properly configured:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Other `SUPABASE_*` keys

3. Run the migration scripts in this order:
   - `scripts/001_create_tables.sql` - Creates all necessary tables
   - `scripts/002_seed_initial_data.sql` - Seeds with initial data

## Step 2: Run Database Migrations

Execute the SQL scripts to create tables and seed data:

1. Open each script file
2. Copy and paste the SQL into your Supabase SQL editor
3. Execute in order (001 before 002)

## Step 3: Verify the Integration

### Test Projects API
- Go to `/admin` page
- Log in with your admin credentials
- Try creating, editing, or deleting a project
- Changes should appear immediately on the homepage

### Test Contact Messages
- Go to the contact section on the homepage
- Submit a test message
- Check the admin panel under "Messages" tab
- The message should appear with read/unread toggle

### Test Skills Display
- Skills are automatically fetched from the database
- Any updates to the skills table appear immediately on the homepage

## Step 4: Admin Panel Setup

The admin dashboard (`/admin`) provides full CRUD operations for:

1. **Projects Management**
   - Create, read, update, delete projects
   - Toggle featured status
   - Add technologies

2. **Messages Management**
   - View all contact form submissions
   - Mark messages as read/unread
   - Delete messages

3. **Dashboard Statistics**
   - View analytics overview
   - See recent activity

## Environment Variables Required

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_URL=your_supabase_url
\`\`\`

All these should be automatically available from your Supabase integration.

## Real-time Features

The application automatically refreshes:
- Projects list every 30 seconds
- Messages every 30 seconds
- Skills and about info on page load

## Data Model

### Projects Table
\`\`\`
id: UUID (auto-generated)
title: Text
description: Text
image: Text (base64 or URL)
technologies: Array of strings
category: Text (Full-Stack, Frontend, Backend)
demo_url: Text
github_url: Text
featured: Boolean
created_at: Timestamp
updated_at: Timestamp
\`\`\`

### Skills Table
\`\`\`
id: UUID (auto-generated)
category: Text (Frontend, Backend, Database, DevOps & Cloud)
name: Text
level: Integer (0-100)
order: Integer (for sorting)
created_at: Timestamp
updated_at: Timestamp
\`\`\`

### About Info Table
\`\`\`
id: UUID (auto-generated)
bio: Text
location: Text
experience_years: Integer
projects_count: Integer
updated_at: Timestamp
\`\`\`

### Timeline Table
\`\`\`
id: UUID (auto-generated)
year: Text
title: Text
company: Text
description: Text
order: Integer (for sorting)
created_at: Timestamp
updated_at: Timestamp
\`\`\`

## Troubleshooting

### Messages/Projects not saving
- Check environment variables in "Vars" section
- Verify Supabase connection status in "Connect" section
- Check browser console for error messages

### Admin panel not loading
- Ensure you're authenticated
- Check that all Supabase tables were created properly
- Verify environment variables are set

### Real-time updates not working
- Data refreshes on a timer (30 seconds)
- For immediate updates, click the "Refresh" button in the admin panel
- Check that Row Level Security (RLS) policies are correct

## Support

For issues with:
- Supabase setup: Check your Supabase dashboard
- API routes: Look at `/app/api/*` files
- Components: Check client/server component files in `/components`

## Next Steps

1. Fill in your portfolio information:
   - Update About section: Edit `about_info` table
   - Add your skills: Insert into `skills` table
   - Add your projects: Use admin panel or `projects` table
   - Update timeline: Edit `timeline` table

2. Customize as needed:
   - Modify colors in `app/globals.css`
   - Update admin dashboard layout
   - Add more fields to any table as needed

3. Deploy:
   - Push to GitHub
   - Deploy to Vercel
   - Environment variables automatically synced from Supabase integration
