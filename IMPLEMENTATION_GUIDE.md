# Supabase Integration - Complete Implementation Guide

Your portfolio has been fully integrated with Supabase for dynamic, real-time content management. This guide explains everything you need to know to get started.

## What's New

### Dynamic Content Management
- **Projects**: Add, edit, and delete projects from the admin panel. Changes appear instantly on your homepage.
- **Skills**: Manage your technical skills by category with proficiency levels.
- **About Section**: Keep your bio, location, and experience information up-to-date.
- **Timeline**: Track your career and education journey.
- **Contact Messages**: Receive and manage visitor messages with read/unread status.

### Key Features
- Real-time data updates on the homepage
- Admin dashboard with full CRUD capabilities
- Auto-refresh functionality for fresh data
- Responsive design that works on all devices
- Secure data management with Supabase authentication

## Getting Started

### 1. Verify Supabase Connection

1. Click the **Connect** button in the left sidebar
2. Ensure **Supabase** shows as "Connected"
3. Check that you see the Supabase integration with a green checkmark

### 2. Set Up Database Schema

1. Go to the **Vars** section in the left sidebar
2. Confirm all these environment variables are present:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

3. Run the database setup scripts:
   - Open `scripts/001_create_tables.sql`
   - Copy the SQL code
   - Go to your Supabase dashboard → SQL Editor
   - Paste and execute the code
   - Repeat with `scripts/002_seed_initial_data.sql`

### 3. Access the Admin Panel

1. Navigate to `/admin` on your site
2. You'll be greeted with a login page
3. Use your admin credentials to sign in

### 4. Start Managing Content

#### Adding Projects
1. In the admin panel, go to the **Projects** tab
2. Click **"Nouveau projet"** (New Project)
3. Fill in the project details:
   - **Titre** (Title)
   - **Description**
   - **Image** (upload a screenshot)
   - **Technologies** (comma-separated)
   - **Catégorie** (Full-Stack, Frontend, Backend)
   - **URL de démo** & **URL GitHub**
   - Check **Projet phare** to feature it
4. Click **Créer** to save

#### Managing Messages
1. Go to the **Messages** tab
2. View all contact form submissions
3. Click the circle icon to mark messages as read/unread
4. Use the trash icon to delete messages

#### Managing Skills
Currently, skills are managed directly in the database. To update:
1. Go to your Supabase dashboard
2. Navigate to the `skills` table
3. Edit, add, or delete skill entries

## Data Structure

### Projects
Stored in the `projects` table. Each project includes:
- Title, description, and image
- Technologies used
- Demo and GitHub links
- Featured status (for highlighting on homepage)

### Skills
Organized by category (Frontend, Backend, Database, DevOps & Cloud):
- Category name
- Skill name
- Proficiency level (0-100)
- Sort order

### About Info
Your professional profile:
- Biography
- Location
- Years of experience
- Total projects completed

### Timeline
Your career progression:
- Year
- Position title
- Company name
- Description

### Contact Messages
Form submissions from visitors:
- Name, email, subject, message
- Read/unread status
- Timestamp

## Homepage Integration

The homepage automatically displays:

1. **Skills Section** - Fetches from the `skills` table, organized by category
2. **About Section** - Shows your bio, timeline, and professional info
3. **Projects Section** - Displays all projects with filtering by category
4. **Contact Form** - Submissions save directly to Supabase

## Customization

### Change Admin Credentials
The admin system uses a simple username/password system. To modify:
1. Update credentials in `components/admin/login-form.tsx`
2. Or implement Supabase Auth integration

### Add More Fields
To extend the data model:
1. Create a migration in the `scripts/` folder
2. Update the corresponding components
3. Modify the API routes if needed

### Styling
- Colors and fonts defined in `app/globals.css`
- Components use Tailwind CSS utility classes
- Modify as needed for your brand

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel automatically syncs environment variables from your Supabase integration
4. Your site is live immediately!

### Keep Data Fresh

- Supabase handles all data persistence
- Changes made in admin panel appear instantly
- Real-time refreshes every 30 seconds for data consistency

## Troubleshooting

### Admin Panel Shows Login Page
- Check your admin credentials
- Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set

### Projects/Skills Not Displaying
- Ensure database tables were created (`scripts/001_*.sql`)
- Check that initial data was seeded (`scripts/002_*.sql`)
- Verify environment variables in "Vars" section

### Contact Messages Not Saving
- Check network tab in browser dev tools
- Verify `SUPABASE_SERVICE_ROLE_KEY` is configured
- Ensure `contact_messages` table exists

### Changes Not Appearing
- Wait 30 seconds for auto-refresh
- Click "Actualiser" (Refresh) button in admin panel
- Clear browser cache if needed

## File Structure

\`\`\`
app/
  api/
    projects/route.ts       # Project CRUD endpoints
    contact/route.ts        # Contact message endpoints
  page.tsx                  # Homepage with server components
  
components/
  sections/
    projects-section.tsx    # Projects display
    about-section-server.tsx # About section (server)
    skills-section-server.tsx # Skills section (server)
  admin/
    admin-dashboard.tsx     # Admin interface
    projects-manager.tsx    # Project management
    messages-manager.tsx    # Message management

lib/supabase/
  client.ts                 # Browser client
  server.ts                 # Server client
  middleware.ts             # Auth middleware

scripts/
  001_create_tables.sql    # Database schema
  002_seed_initial_data.sql # Initial data
\`\`\`

## Performance Considerations

- **Data Caching**: Supabase caches frequently accessed data
- **Auto-refresh**: Set to 30 seconds to balance freshness and performance
- **Image Optimization**: Use Next.js Image component for fast loading
- **API Routes**: Serverless functions for efficient data operations

## Security

- Row-Level Security (RLS) policies protect data
- Admin credentials required for modifications
- Public read access for homepage content
- Environment variables never exposed to client

## Next Steps

1. **Populate Your Data**
   - Add your projects
   - Update your skills
   - Fill in your about information
   - Create your career timeline

2. **Customize the Design**
   - Adjust colors and fonts
   - Modify component layouts
   - Add your own branding

3. **Deploy**
   - Push to GitHub
   - Deploy to Vercel
   - Share your portfolio!

4. **Monitor Analytics**
   - Use Supabase dashboard for insights
   - Check admin panel statistics
   - Track contact submissions

## Support & Resources

- **Supabase Documentation**: https://supabase.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Admin Panel**: `/admin` for content management
- **Database**: Check Supabase dashboard for direct access

---

Enjoy your new dynamic portfolio! Update content anytime from the admin panel and see changes instantly on your homepage.
