# System Architecture

## Overview

Your portfolio uses a modern three-tier architecture with server-side rendering and real-time database updates.

## Architecture Diagram

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                     BROWSER / CLIENT                         │
├─────────────────────────────────────────────────────────────┤
│ - React Components                                           │
│ - Client-side Supabase (Anon Key)                           │
│ - Admin Dashboard                                            │
│ - Contact Form                                               │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ↓ HTTP/REST
┌─────────────────────────────────────────────────────────────┐
│                   NEXT.JS SERVER                             │
├─────────────────────────────────────────────────────────────┤
│ - API Routes (/api/projects, /api/contact)                 │
│ - Middleware (Authentication)                               │
│ - Server Components (Data Fetching)                         │
│ - Server-side Supabase (Service Role Key)                  │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ↓ PostgreSQL Protocol
┌─────────────────────────────────────────────────────────────┐
│                   SUPABASE / POSTGRESQL                      │
├─────────────────────────────────────────────────────────────┤
│ - projects table                                             │
│ - skills table                                               │
│ - about_info table                                           │
│ - timeline table                                             │
│ - contact_messages table                                     │
│ - Row-Level Security Policies                               │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## Data Flow

### 1. Homepage Display (Initial Load)

\`\`\`
User visits homepage
         ↓
Next.js Server renders page
         ↓
Server Components fetch from Supabase:
  - AboutSectionServer → about_info + timeline
  - SkillsSectionServer → skills (by category)
         ↓
Client Components receive data
         ↓
Page rendered with dynamic content
         ↓
Periodically refetch (every 30 seconds)
\`\`\`

### 2. Admin Create Project

\`\`\`
Admin fills form in browser
         ↓
Form data sent to /api/projects (POST)
         ↓
Next.js API Route receives request
         ↓
Server creates Supabase client (Service Role)
         ↓
INSERT into projects table
         ↓
Response sent back to admin
         ↓
Admin Dashboard shows new project
         ↓
Homepage refreshes and shows new project
\`\`\`

### 3. Contact Form Submission

\`\`\`
Visitor fills contact form
         ↓
Form submitted to /api/contact (POST)
         ↓
Next.js API Route receives request
         ↓
INSERT into contact_messages table
         ↓
Success response to visitor
         ↓
Message appears in admin panel
         ↓
Admin can view, mark read, or delete
\`\`\`

## Component Architecture

### Server Components
- **AboutSectionServer**: Fetches about_info + timeline from DB
- **SkillsSectionServer**: Fetches skills grouped by category
- Render on server, send HTML to client
- Best for data that doesn't change frequently

### Client Components
- **AboutClient**: Receives data from server, renders with animations
- **SkillsClient**: Displays skills with progress bars and animations
- **ProjectsSection**: Fetches projects via API, handles filtering
- **ContactSection**: Collects visitor submissions
- **AdminDashboard**: Manages projects and messages

## Data Flow Patterns

### Pattern 1: Server-Side Data Fetch
\`\`\`
Page Component (async)
         ↓
Calls createClient() [Server]
         ↓
Fetches data from Supabase
         ↓
Passes to Client Component
         ↓
Client renders with animations
\`\`\`

### Pattern 2: API Route Data Fetch
\`\`\`
Client sends request to /api/*
         ↓
API Route receives (NextRequest)
         ↓
Creates Supabase client (Server)
         ↓
Queries database
         ↓
Returns JSON response
         ↓
Client processes response
\`\`\`

### Pattern 3: Direct Client Fetch
\`\`\`
Client Component
         ↓
useEffect calls fetch() to API
         ↓
API Route handles request
         ↓
Returns data
         ↓
setData() updates state
         ↓
Component re-renders
\`\`\`

## Authentication & Security

### Middleware Chain
\`\`\`
Request comes in
         ↓
middleware.ts checks auth
         ↓
If /admin → requires authentication
         ↓
If valid → continue
         ↓
If invalid → redirect to home
\`\`\`

### Database Access Levels

| Access Level | Keys Used | Tables | Operations |
|-------------|-----------|--------|-----------|
| Public Read | Anon Key | All | SELECT |
| Public Insert | Anon Key | contact_messages | INSERT |
| Admin Full | Service Role | All | SELECT, INSERT, UPDATE, DELETE |

### Row Level Security

\`\`\`
┌─ Table Row ─┐
│ [data]      │
└─────┬───────┘
      ↓
┌──── RLS Policy ────┐
│ Check: auth.uid()  │
│ or public read     │
└──────┬─────────────┘
       ↓
   ✓ Access Granted
   ✗ Access Denied
\`\`\`

## Real-Time Updates

### Auto-Refresh Strategy
\`\`\`
Component mounts
         ↓
fetchData()
         ↓
Set interval = 30 seconds
         ↓
Every 30 sec → fetchData()
         ↓
Update state with new data
         ↓
Component re-renders
         ↓
Component unmounts
         ↓
Clear interval
\`\`\`

## File Organization

### By Feature
\`\`\`
lib/supabase/          → Database access layer
  client.ts            → Client factory
  server.ts            → Server factory
  middleware.ts        → Auth middleware

app/api/               → Backend API endpoints
  projects/route.ts    → Project CRUD
  contact/route.ts     → Message CRUD

components/
  sections/            → Page sections
  admin/               → Admin features
  ui/                  → Reusable UI components
\`\`\`

### By Responsibility
\`\`\`
Data Layer          → lib/supabase/*
API Layer          → app/api/*
Presentation Layer → components/*
Business Logic     → Distributed across layers
\`\`\`

## Database Schema Relationships

\`\`\`
projects
  ├── id (Primary Key)
  ├── title
  ├── description
  ├── image
  ├── technologies[] (Array)
  ├── category
  ├── demo_url
  ├── github_url
  ├── featured
  └── timestamps

skills
  ├── id (Primary Key)
  ├── category (Foreign Key concept)
  ├── name
  ├── level (0-100)
  ├── order (sorting)
  └── timestamps

about_info
  ├── id (Primary Key)
  ├── bio
  ├── location
  ├── experience_years
  ├── projects_count
  └── updated_at

timeline
  ├── id (Primary Key)
  ├── year
  ├── title
  ├── company
  ├── description
  ├── order (sorting)
  └── timestamps

contact_messages
  ├── id (Primary Key)
  ├── name
  ├── email
  ├── subject
  ├── message
  ├── read (boolean)
  └── created_at
\`\`\`

## Performance Optimization

### Caching Strategy
\`\`\`
First Load
  ↓
Server fetches from Supabase
  ↓
Renders page
  ↓
Client caches in state
  ↓
Every 30 seconds → refetch
  ↓
Only send changed data
\`\`\`

### Image Handling
\`\`\`
User uploads image
  ↓
Convert to base64
  ↓
Save to database
  ↓
Next.js Image component
  ↓
Automatic optimization
  ↓
Fast delivery to user
\`\`\`

## Error Handling

### API Error Flow
\`\`\`
Request fails
  ↓
Catch error
  ↓
Log: console.error("[v0]", error)
  ↓
Return error response
  ↓
Client shows toast notification
  ↓
User sees friendly error message
\`\`\`

### Database Error Flow
\`\`\`
Query fails
  ↓
Check if (error)
  ↓
Throw error
  ↓
API Route catches
  ↓
Returns 500 with message
  ↓
Client displays error
\`\`\`

## Deployment Architecture

### Vercel
\`\`\`
GitHub Push
  ↓
Vercel Webhook triggers
  ↓
Build Next.js project
  ↓
Deploy to Edge Network
  ↓
Environment variables auto-sync
  ↓
Site live at vercel.app
\`\`\`

### Production Checklist
- [ ] All environment variables configured
- [ ] Database tables created
- [ ] Initial data seeded
- [ ] Admin credentials set
- [ ] CORS properly configured
- [ ] RLS policies active
- [ ] Error logging enabled
- [ ] Performance monitored

---

This architecture provides scalability, security, and performance for your dynamic portfolio platform.
