# Sponsored Ads Feature

This document provides instructions for setting up and using the sponsored ads feature in the WeSSEEdu platform.

## Database Setup

1. Run the SQL script in `admin_users_table.sql` in your Supabase SQL Editor to create the admin users table:

```sql
-- Create the admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR NOT NULL UNIQUE,
    name VARCHAR,
    is_super_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies and other setup as provided in the SQL file
```

2. Run the SQL script in `sponsored_ads_table.sql` in your Supabase SQL Editor to create the sponsored ads table and sample data:

```sql
-- Create the sponsored_ads table
CREATE TABLE IF NOT EXISTS public.sponsored_ads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    logo VARCHAR NOT NULL,
    description TEXT NOT NULL,
    impact_score INT NOT NULL,
    cta VARCHAR NOT NULL,
    url VARCHAR NOT NULL,
    company_id UUID REFERENCES public.companies(id),
    active BOOLEAN DEFAULT true,
    priority INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies and sample data as provided in the SQL file
```

3. Make sure your Supabase environment variables are set up correctly in your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Admin Access Setup

1. After running the `admin_users_table.sql` script, update the initial admin user with your email:

```sql
-- Replace with your actual email
UPDATE public.admin_users 
SET email = 'your.actual.email@example.com', is_super_admin = true
WHERE email = 'your.email@example.com';
```

2. To add additional admin users:

```sql
INSERT INTO public.admin_users (email, name, is_super_admin)
VALUES 
('admin1@example.com', 'Admin One', false),
('admin2@example.com', 'Admin Two', false);
```

3. Only users with their email in the `admin_users` table will be able to modify sponsored ads.

## API Route

The API route for sponsored ads is located at `src/app/api/sponsored-ads/route.ts`. This route:

1. Fetches active sponsored ads from the database
2. Orders them by priority (highest first)
3. Returns the data in the format expected by the SidebarAds component

## SidebarAds Component

The SidebarAds component in `src/components/advertising/SidebarAds.tsx`:

1. Fetches sponsored ads from the API route on component mount
2. Displays loading, error, and empty states as needed
3. Renders the ads in order of priority
4. Includes a newsletter signup form and footer

## Adding New Sponsored Ads

To add new sponsored ads:

1. Insert a new row into the `sponsored_ads` table in your Supabase database:

```sql
INSERT INTO public.sponsored_ads (
    name, 
    logo, 
    description, 
    impact_score, 
    cta, 
    url, 
    company_id, 
    active, 
    priority
) VALUES (
    'Company Name',
    '/sponsors/company-logo.png',
    'Description of the company and their sustainable initiatives.',
    80,
    'Call to Action Text',
    'https://example.com/company',
    'company-uuid',
    true,
    50
);
```

2. Upload the company logo to your public assets folder (e.g., `/public/sponsors/`)

## Managing Sponsored Ads

- **Priority**: Higher priority ads (larger numbers) will be displayed first
- **Active**: Set to `false` to temporarily hide an ad without deleting it
- **Impact Score**: Should be between 0-100, representing the company's sustainability impact

## Row Level Security (RLS)

The sponsored_ads table uses Row Level Security to control access:

1. **Reading**: Anyone can read the sponsored ads data (for display purposes)
2. **Modifying**: Only authenticated users whose emails are in the `admin_users` table can add, update, or delete ads

This ensures that only authorized administrators can manage the sponsored content.

## Troubleshooting

If ads are not displaying:

1. Check the browser console for errors
2. Verify that the API route is returning data correctly
3. Ensure the database table exists and contains active ads
4. Check that the logo paths are correct and the images exist in your public folder

If you're having issues with admin access:

1. Verify your email is correctly added to the `admin_users` table
2. Check that you're properly authenticated when making requests
3. Look at the Supabase logs for any RLS policy errors 