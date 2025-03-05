-- Check all admin users in the database
SELECT id, email, name, is_super_admin, created_at 
FROM public.admin_users; 