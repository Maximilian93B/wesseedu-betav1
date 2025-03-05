-- Update the admin user's email address
-- Replace 'your.email@example.com' with the current email that was entered incorrectly
-- Replace 'correct.email@example.com' with your actual email address

UPDATE public.admin_users 
SET email = 'correct.email@example.com' 
WHERE email = 'your.email@example.com';

-- Verify the update was successful
SELECT id, email, name, is_super_admin, created_at 
FROM public.admin_users; 