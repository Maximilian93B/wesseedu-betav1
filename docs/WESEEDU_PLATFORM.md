# WeSeedU Platform Documentation

## Mission & Overview
WeSeedU is a comprehensive sustainable investment platform that empowers retail and active investors to discover, evaluate, and invest in companies that are not only financially promising but also committed to sustainable development. Through a blend of public marketplace features, user-specific functionalities, and robust administrative oversight, the platform ensures a secure, data-driven, and user-friendly experience—all while fostering a community dedicated to sustainable innovation.

## Platform Differentiators
- Rigorous vetting process (WeSeedU, GSF, UN, KPMG, EY, PwC ,Deloitte)
- Focus on sustainable development
- Success-fee based model
- ESG-driven company scoring
- Pre-public investment opportunities


## Success Fee Structure
- 2% for funding < $500,000
- 3% for funding $500,000 – $1,000,000
- 5% for funding > $1,000,000
* Fees only charged upon successful funding

## Core Features 

### User Accounts & Tiering

#### Account Management & Authentication:
Secure user sign-up, login, and profile management using Supabase Auth and custom profiles.

#### User Tiers:
Three distinct tiers are available:

#### Root: Free, basic access for retail investors.

#### Thrive: Paid annual membership offering in-depth company profiles, advanced analytics, and priority features.

#### Impact: Awarded to top contributing investors with exclusive access and premium features.

### Company Listings & Marketplace

#### Public Directory:

A marketplace where all users can browse companies seeking funding, view basic financial and mission information, and see an ESG-driven sustainability score.

#### Company Detail Pages:
Each company has a dedicated page with:
Detailed financials and mission statements.
A downloadable pitch deck (stored and managed via Supabase Storage).
An overall sustainability score based on pre-defined criteria.

### Investment & Funding Applications

#### Pre-IPO Opportunities:
Investors can access exclusive pre-IPO investment opportunities in sustainable companies.

#### Funding Application:
Companies can apply for funding through WeSeedU. Investors can submit funding applications, and companies receive feedback through a tracked application process.

### User-Specific Actions

#### Saved Companies:
Users can bookmark or “save” companies for future reference. A dedicated feature lets users manage their saved companies through CRUD (create, read, update, delete) operations.

#### Personalized Dashboard:
Each user has a dashboard showing their profile, saved companies, and funding application statuses.

## User Profile

### User Profile:
name text,
  email text,
  user_type user_type_enum not null default 'investor',
  user_tier user_tier_enum not null default 'root',  -- Default tier can be set as needed
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
Users can update their profile information, including:

## Profile Features - TO DO's



### Administrative Tools

#### Admin Dashboard & Management:
An admin section empowers designated administrators to:
Manage user accounts and assign roles.
Oversee company listings, ensuring quality and compliance.
Review and process funding applications.

#### Admin Overrides in Policies:

Enhanced row-level security (RLS) policies ensure that admins can override standard restrictions for maintenance and oversight purposes.

### Security, Performance, and Scalability

#### Robust Security & RLS: 
Row-Level Security policies, along with middleware-based rate limiting and session management, ensure that data access is secure and only available to authorized users.

#### Scalable Architecture:
Built with Next.js, TypeScript, and Supabase, the platform is designed to scale—supporting future enhancements and additional features without compromising performance.



## Project Structure

my-project/
├── app/
│   ├── layout.tsx                   // Global layout, wraps the entire application (includes providers, Navbar, Footer, etc.)
│   ├── page.tsx                     // Home page (public)
│   ├── auth/                        // Authentication pages and endpoints
│   │   ├── login/
│   │   │   └── page.tsx             // Login page (public)
│   │   ├── signup/
│   │   │   └── page.tsx             // Sign-up page (public)
│   │   ├── callback/
│   │   │   └── route.ts             // OAuth callback (if using external providers)
│   │   └── auth-error/
│   │       └── page.tsx             // Auth error page
│   ├── dashboard/                   // Protected user dashboard area
│   │   ├── layout.tsx               // Dashboard layout, enforces auth for logged-in users
│   │   ├── page.tsx                 // Main dashboard overview (saved companies, funding application statuses, etc.)
│   │   └── profile/
│   │       └── page.tsx             // User profile management (CRUD 
│   ├── companies/                   // Public company listings (marketplace)
│   │   ├── page.tsx                 // Marketplace page: list all companies with scores, etc.
│   │   └── [companyId]/            // Dynamic route for each company’s detail page
│   │       ├── page.tsx             // Detailed company page (financials, mission, pitch deck download, score)
│   │       └── pitch-deck/
│   │           └── route.ts         // API route for serving/downloading the pitch deck file
│   ├── apply/                       // Funding application routes
│   │   └── [companyId]/            // Funding application page per company
│   │       └── page.tsx             // Form to apply for funding
│   ├── admin/                       // **Admin area (restricted to admin users)**
│   │   ├── layout.tsx               // Admin layout: includes authentication checks and admin sidebar
│   │   ├── page.tsx                 // Main admin dashboard overview (stats, notifications, etc.)
│   │   ├── users/                   // Admin management for users
│   │   │   ├── page.tsx             // List and manage users (view, edit roles, etc.)
│   │   │   └── [userId]/            // Detailed admin view for a specific user
│   │   │       └── page.tsx         // User details and administrative actions
│   │   ├── companies/               // Admin management for companies
│   │   │   ├── page.tsx             // List and manage companies (update details, remove inappropriate listings, etc.)
│   │   │   └── [companyId]/         // Detailed admin view for a specific company
│   │   │       └── page.tsx         // Company details with admin controls
│   │   └── funding/                 // Admin management for funding applications
│   │       ├── page.tsx             // List all funding applications, with filtering and bulk actions
│   │       └── [applicationId]/     // Detailed admin view for a specific funding application
│   │           └── page.tsx         // Funding application details and admin actions (approve, reject, etc.)
│   └── api/                         // Backend API routes
│       ├── auth/                    // Auth-related endpoints (signup, login, etc.)
│       │   ├── signup/
│       │   │   └── route.ts         // Server-side sign-up endpoint
│       │   └── profile/
│       │       └── route.ts         // CRUD operations for user profiles
│       ├── companies/               // API endpoints for company data (public and admin actions)
│       │   └── route.ts             // Fetch companies, create/update companies (with RLS and admin overrides)
│       ├── apply/                   // API endpoints for funding applications
│    ss   │   └── [companyId]/         // Funding application endpoint for a company
│       │       └── route.ts         // Submit/update funding application
│       └── admin/                   // **Admin-specific API endpoints**
│           ├── users/
│           │   └── route.ts         // Bulk or administrative actions on users
│           ├── companies/
│           │   └── route.ts         // Administrative operations on companies (bypass certain restrictions)
│           └── funding/
│               └── route.ts         // Administrative operations on funding applications
├── components/                      // Reusable UI components
│   ├── Navbar.tsx                   // Navigation bar component (visible on public and protected pages)
│   ├── Footer.tsx                   // Footer component
│   ├── CompanyCard.tsx              // Component for company listing cards
│   ├── CompanyDetail.tsx            // Component to display company details
│   ├── UserProfileForm.tsx          // Form for user profile management
│   ├── FundingApplicationForm.tsx   // Form for funding applications
│   └── AdminSidebar.tsx             // **Admin sidebar** navigation component (used in admin layout)
├── lib/                             // Library utilities and helper functionsw
│   ├── supabaseClient.ts            // Client-side Supabase client initialization
│   ├── cookieManager.ts             // Helpers to create/update cookies/sessions
│   └── apiHelpers.ts               // Shared functions for API requests, error handling, etc.
├── config/                          // Configuration files
│   ├── auth.config.ts               // Authentication configuration (flags, dev bypass, etc.)
│   └── supabase.config.ts           // Additional Supabase configuration settings (if needed)
├── middleware.ts                    // Global middleware (rate limiting, session checks, route protection, etc.)
├── .env.local                       // Environment variables (Supabase URL, keys, etc.)
├── package.json                     // Project dependencies and scripts
├── tsconfig.json                    // TypeScript configuration
└── vercel.json                      // (Optional) Vercel deployment configuration

