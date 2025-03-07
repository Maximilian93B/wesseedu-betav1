-- First, delete all admin users (use with caution!)
DELETE FROM public.admin_users;

-- Then, insert a new admin user with the correct email
INSERT INTO public.admin_users (email, name, is_super_admin)
VALUES ('correct.email@example.com', 'Admin User', true);

-- Verify the new admin user was created
SELECT id, email, name, is_super_admin, created_at 
FROM public.admin_users; 