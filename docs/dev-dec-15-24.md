# **WeSeedU Development Recap**

## **Date:** December 15, 2024

---

## **Key Progress**

### **1. User Registration**
- Implemented secure user registration using Supabase Auth.
- Created the `users` table to store additional user information:
  - Fields: `id`, `email`, `phone`, `first_name`, `last_name`, `user_type`, `created_at`, `updated_at`.
- Added email validation and password requirements
- Implemented user type selection (investor/company)
- Added success notifications and error handling
- Set up email verification flow

### **2. Authentication & Authorization**
- Implemented protected routes using Next.js middleware
- Created authentication checks for sensitive routes:
  - `/dashboard/*`
  - `/company-registration/*`
  - `/investor-dashboard/*`
  - `/company-dashboard/*`
- Added user type-based redirects after login
- Implemented session management with Supabase

### **3. Company Registration Flow**
- Created company registration form with validation
- Implemented automatic redirect for company users after signup
- Added fields for:
  - Company name
  - Industry selection
  - Funding goal
  - Complete address information
- Integrated with Supabase database for company data storage

### **4. UI/UX Improvements**
- Added loading states for forms
- Implemented toast notifications for user feedback
- Created responsive layouts for forms
- Added form validation and error messages
- Improved navigation between signup, login, and registration flows

---

### **2. Company Registration**
- Built logic to register companies and link them to their respective users:
  - Inserted company details into the `companies` table.
  - Linked the `user_id` of the `company` user in the `users` table to the `companies` table.
- Example fields in `companies`:
  - `user_id`, `name`, `industry`, `funding_goal`, `street_address`, `city`, `state`, `country`, `postal_code`, `created_at`.
- Verified registration through Supabase REST API and SQL.

---

### **3. Row-Level Security (RLS) Policies**
#### **For `users` Table**
- Enabled RLS on the `users` table:
  ```sql
  ALTER TABLE users ENABLE ROW LEVEL SECURITY;
  ```
- Created policies to restrict access based on user type:
  - `company` users can only read and write to their own `companies` records.
  - `investor` users can only read and write to their own `investments` records.
- Tested RLS policies through Supabase SQL and REST API.


**Tier Middleware**
- Created middleware to check user's subscription tier.
- Implemented middleware to check user's subscription tier.
- Tested middleware through Supabase SQL and REST API.

---



