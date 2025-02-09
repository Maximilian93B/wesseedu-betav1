User profile Table

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  user_type user_type_enum not null default 'investor',
  user_tier user_tier_enum not null default 'root',  -- Default tier can be set as needed
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

create type user_tier_enum as enum ('root', 'thrive', 'impact');
create type user_type_enum as enum ('admin', 'investor', 'company');


Company Table

create table public.companies (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  mission_statement text,
  financials jsonb,
  pitch_deck_url text,
  sustainability_data jsonb,
  score numeric(5,2) default 0.00,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now()),
  created_by uuid references public.profiles(id) on delete set null
);


Company Saved Table

create table public.company_saves (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete set null,
  company_id uuid references public.companies(id) on delete set null,
  created_at timestamp with time zone default timezone('utc', now())
);


create unique index unique_saved_company on public.company_saves 
(user_id, company_id);


// Funding Applications Table

create table public.funding_applications (
  id uuid primary key default uuid_generate_v4(),
  applicant_id uuid not null references public.profiles(id) on delete cascade,
  company_id uuid not null references public.companies(id) on delete cascade,
  funding_amount numeric not null,
  status application_status not null default 'pending',
  message text,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

create type application_status as enum ('pending', 'approved', 'rejected');


Policies 

// Profiles Table Policies

alter table public.profiles enable row level security;

create policy "Allow users to view their own profile" on public.profiles
for select
using ( id = auth.uid() );

create policy "Allow users to insert their own profile" on public.profiles
for insert
with check ( id = auth.uid() );

create policy "Allow user or admin to update profile" on public.profiles
for update
using (
  id = auth.uid() OR
  current_setting('request.jwt.claims.user_type', true) = 'admin'
)
with check (
  id = auth.uid() OR
  current_setting('request.jwt.claims.user_type', true) = 'admin'
);


create policy "Allow users to delete their own profile" on public.profiles
for delete
using ( id = auth.uid() );


// Companies Table Policies

alter table public.companies enable row level security;

create policy "Public select on companies" on public.companies
for select
using ( true );

create policy "Allow company owners to insert companies" on public.companies
for insert
with check ( created_by = auth.uid() );


create policy "Allow company owners to delete their own companies" on public.companies
for delete
using ( created_by = auth.uid() );


// Company Saves Table Policies

alter table public.company_saves enable row level security;

create policy "Allow user to select their saved companies" on public.company_saves
for select
using ( user_id = auth.uid() );


create policy "Allow user to insert their saved companies" on public.company_saves
for insert
with check ( user_id = auth.uid() );


create policy "Allow user to delete their saved companies" on public.company_saves
for delete
using ( user_id = auth.uid() );


// Funding Applications Table Policies

alter table public.funding_applications enable row level security;

create policy "Allow user to select their funding applications" on public.funding_applications
for select
using ( applicant_id = auth.uid() );

create policy "Allow user to insert funding applications" on public.funding_applications
for insert
with check ( applicant_id = auth.uid() );


create policy "Allow user or admin to delete saved companies" on public.company_saves
for delete
using (
  user_id = auth.uid() OR
  current_setting('request.jwt.claims.user_type', true) = 'admin'
);


create policy "Allow applicant to delete their pending funding application" on public.funding_applications
for delete
using ( applicant_id = auth.uid() and status = 'pending' );
  

// Admin 

( <ownership_condition> OR current_setting('request.jwt.claims.user_type', true) = 'admin' )

