-- Create the admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR NOT NULL UNIQUE,
    name VARCHAR,
    is_super_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Policy for reading admin users (only authenticated users)
CREATE POLICY "Only authenticated users can read admin users"
    ON public.admin_users
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Policy for modifying admin users (only super admins)
-- Note: You'll need to manually add the first super admin via SQL
CREATE POLICY "Only super admins can modify admin users"
    ON public.admin_users
    FOR ALL
    USING (auth.role() = 'authenticated' AND auth.email() IN (SELECT email FROM public.admin_users WHERE is_super_admin = true));

-- Insert your first admin user (replace with your email)
INSERT INTO public.admin_users (email, name, is_super_admin)
VALUES ('your.email@example.com', 'Admin User', true)
ON CONFLICT (email) DO NOTHING;

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_admin_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER set_admin_timestamp
BEFORE UPDATE ON public.admin_users
FOR EACH ROW
EXECUTE FUNCTION update_admin_modified_column(); 