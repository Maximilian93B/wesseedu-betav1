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

-- Add RLS policies
ALTER TABLE public.sponsored_ads ENABLE ROW LEVEL SECURITY;

-- Policy for reading sponsored ads (anyone can read)
CREATE POLICY "Anyone can read sponsored ads"
    ON public.sponsored_ads
    FOR SELECT
    USING (true);

-- First, check if admin_users table exists
DO $$
BEGIN
    -- Check if the admin_users table exists
    IF EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'admin_users'
    ) THEN
        -- Policy for inserting/updating/deleting (only authenticated users with admin role)
        DROP POLICY IF EXISTS "Only admins can modify sponsored ads" ON public.sponsored_ads;
        
        CREATE POLICY "Only admins can modify sponsored ads"
            ON public.sponsored_ads
            FOR ALL
            USING (
                auth.role() = 'authenticated' AND (
                    -- Allow if admin_users table has entries and user is an admin
                    EXISTS (SELECT 1 FROM public.admin_users) AND 
                    auth.email() IN (SELECT email FROM public.admin_users)
                    OR
                    -- Allow if admin_users table is empty (first setup)
                    NOT EXISTS (SELECT 1 FROM public.admin_users)
                )
            );
    ELSE
        -- If admin_users table doesn't exist yet, create a temporary policy that allows authenticated users
        DROP POLICY IF EXISTS "Only admins can modify sponsored ads" ON public.sponsored_ads;
        
        CREATE POLICY "Only admins can modify sponsored ads"
            ON public.sponsored_ads
            FOR ALL
            USING (auth.role() = 'authenticated');
    END IF;
END
$$;

-- Sample data
INSERT INTO public.sponsored_ads (name, logo, description, impact_score, cta, url, company_id, active, priority)
VALUES
    ('EcoTech Solutions', '/sponsors/ecotech.png', 'Pioneering sustainable technology solutions for a greener future. Our innovative products help reduce carbon footprints while maintaining efficiency.', 85, 'Learn More', 'https://example.com/ecotech', (SELECT id FROM public.companies WHERE name = 'EcoTech Solutions' LIMIT 1), true, 100),
    
    ('Green Energy Fund', '/sponsors/greenenergy.png', 'Investing in renewable energy projects worldwide. Join us in accelerating the transition to clean energy and combating climate change.', 92, 'Invest Now', 'https://example.com/greenenergy', (SELECT id FROM public.companies WHERE name = 'Green Energy Fund' LIMIT 1), true, 90),
    
    ('Sustainable Agriculture', '/sponsors/susag.png', 'Transforming farming practices to be more sustainable and environmentally friendly. Our methods increase yields while preserving natural resources.', 78, 'Explore Solutions', 'https://example.com/susag', (SELECT id FROM public.companies WHERE name = 'Sustainable Agriculture' LIMIT 1), true, 80),
    
    ('Ocean Cleanup Initiative', '/sponsors/oceancleanup.png', 'Dedicated to removing plastic pollution from our oceans and developing technologies to prevent future contamination.', 95, 'Join the Cause', 'https://example.com/oceancleanup', (SELECT id FROM public.companies WHERE name = 'Ocean Cleanup Initiative' LIMIT 1), true, 85),
    
    ('Carbon Capture Tech', '/sponsors/carbontech.png', 'Revolutionary carbon capture technology that removes CO2 directly from the atmosphere, helping to reverse climate change.', 88, 'See the Technology', 'https://example.com/carbontech', (SELECT id FROM public.companies WHERE name = 'Carbon Capture Tech' LIMIT 1), false, 75);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.sponsored_ads
FOR EACH ROW
EXECUTE FUNCTION update_modified_column(); 