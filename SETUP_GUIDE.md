# Database & Email Setup Guide

## Step 1: Set up Supabase (Free Database)

1. Go to https://supabase.com and create a free account
2. Click "New Project"
3. Fill in project details:
   - Name: `ikram-portfolio` (or any name)
   - Database Password: Create a strong password (save it!)
   - Region: Choose closest to Bangladesh (e.g., Singapore)
4. Wait for the project to be created (2-3 minutes)
5. Go to **Project Settings** → **API**
6. Copy these values:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` (click "reveal" to see it) → `SUPABASE_SERVICE_ROLE_KEY`

### Run the Database Migration

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the contents of `supabase/migrations/001_create_enrollments.sql`
4. Paste it into the SQL Editor
5. Click **Run** to execute

This creates the `enrollments` table with all necessary columns and security policies.

## Step 2: Set up Resend (Free Email Service)

1. Go to https://resend.com and create a free account
2. Verify your email address
3. Go to **API Keys** in the dashboard
4. Click **Create API Key**
   - Name: `ikram-portfolio`
   - Permissions: `Full Access`
5. Copy the API key → `RESEND_API_KEY`

### Configure From Email

- By default, you can use `onboarding@resend.dev` (works immediately)
- To use your own domain:
  1. Go to **Domains** in Resend
  2. Add your domain and follow the DNS verification steps
  3. Once verified, update `RESEND_FROM_EMAIL` to `noreply@yourdomain.com`

## Step 3: Create .env.local File

1. Copy `.env.local.example` to `.env.local`:
   ```
   cp .env.local.example .env.local
   ```

2. Fill in your actual values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   RESEND_API_KEY=re_your_api_key_here
   RESEND_FROM_EMAIL=onboarding@resend.dev
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

## Step 4: Test It

1. Run the dev server: `npm run dev`
2. Go to a course page and click "Enroll Now"
3. Fill in the checkout form and submit
4. Check:
   - User receives confirmation email
   - You (admin) receive notification email
   - Enrollment appears in `/admin/enrollments`
   - Data persists after server restart

## What Happens Now

### When a user enrolls:
1. Data is saved to Supabase database (persistent)
2. User receives a confirmation email
3. You receive a notification email with all details

### In the admin dashboard (`/admin/enrollments`):
1. View all enrollments with search and filters
2. Click on any enrollment to see full details
3. Click "Verify" to approve payment → user gets verification email
4. Click "Reject" to decline an enrollment
