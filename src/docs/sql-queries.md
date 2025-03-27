User profile Table

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  user_type user_type_enum not null default 'investor',
  user_tier user_tier_enum not null default 'root',
  total_investments numeric(15,2) default 0.00,  -- For tracking total investment amount
  previous_month_investments numeric(15,2) default 0.00,  -- For calculating month-over-month change
  impact_score numeric(3,1) default 0.0,  -- For storing impact score (e.g., 8.7)
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
  community_members integer default 0,  -- New column for tracking community members
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


// Community Table
create table public.company_communities (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid not null references public.companies(id) on delete cascade,
  description text,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

// Community Ambassadors Table
create table public.community_ambassadors (
  id uuid primary key default uuid_generate_v4(),
  community_id uuid not null references public.company_communities(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

// Community Members Table
create table public.community_members (
  id uuid primary key default uuid_generate_v4(),
  community_id uuid not null references public.company_communities(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc', now())
);

// Community Posts Table
create table public.community_posts (
  id uuid primary key default uuid_generate_v4(),
  community_id uuid not null references public.company_communities(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  content text not null,
  is_company_update boolean default false,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

// Unique constraints to prevent duplicate entries
create unique index unique_community_ambassador on public.community_ambassadors 
(community_id, user_id);

create unique index unique_community_member on public.community_members 
(community_id, user_id);

// RLS Policies for Company Communities
alter table public.company_communities enable row level security;

create policy "Public select on company_communities" on public.company_communities
for select
using ( true );

create policy "Allow company owners to insert communities" on public.company_communities
for insert
with check (
  exists (
    select 1 from public.companies
    where id = company_id and created_by = auth.uid()
  )
);

create policy "Allow company owners to update their communities" on public.company_communities
for update
using (
  exists (
    select 1 from public.companies
    where id = company_id and created_by = auth.uid()
  )
);

create policy "Allow company owners to delete their communities" on public.company_communities
for delete
using (
  exists (
    select 1 from public.companies
    where id = company_id and created_by = auth.uid()
  )
);

// RLS Policies for Community Ambassadors
alter table public.community_ambassadors enable row level security;

create policy "Public select on community_ambassadors" on public.community_ambassadors
for select
using ( true );

create policy "Allow company owners to manage ambassadors" on public.community_ambassadors
for all
using (
  exists (
    select 1 from public.company_communities cc
    join public.companies c on cc.company_id = c.id
    where cc.id = community_id and c.created_by = auth.uid()
  )
);

// RLS Policies for Community Members
alter table public.community_members enable row level security;

create policy "Public select on community_members" on public.community_members
for select
using ( true );

create policy "Allow users to join communities" on public.community_members
for insert
with check ( user_id = auth.uid() );

create policy "Allow users to leave communities" on public.community_members
for delete
using ( user_id = auth.uid() );

// RLS Policies for Community Posts
alter table public.community_posts enable row level security;

create policy "Public select on community_posts" on public.community_posts
for select
using ( true );

create policy "Allow company and ambassadors to create posts" on public.community_posts
for insert
with check (
  author_id = auth.uid() and (
    exists (
      select 1 from public.company_communities cc
      join public.companies c on cc.company_id = c.id
      where cc.id = community_id and c.created_by = auth.uid()
    ) or exists (
      select 1 from public.community_ambassadors ca
      where ca.community_id = community_id and ca.user_id = auth.uid()
    )
  )
);

create policy "Allow post authors to update posts" on public.community_posts
for update
using ( author_id = auth.uid() );

create policy "Allow post authors to delete posts" on public.community_posts
for delete
using ( author_id = auth.uid() );

// Trigger to update the community_members count in companies table
create or replace function public.update_company_community_count()
returns trigger as $$
begin
  if (TG_OP = 'INSERT') then
    update public.companies
    set community_members = community_members + 1
    from public.company_communities
    where companies.id = company_communities.company_id and company_communities.id = NEW.community_id;
  elsif (TG_OP = 'DELETE') then
    update public.companies
    set community_members = community_members - 1
    from public.company_communities
    where companies.id = company_communities.company_id and company_communities.id = OLD.community_id;
  end if;
  return null;
end;
$$ language plpgsql;

create trigger community_members_count_trigger
after insert or delete on public.community_members
for each row execute procedure public.update_company_community_count();

// Trigger to automatically create a community when a company is created
create or replace function public.create_company_community()
returns trigger as $$
begin
  insert into public.company_communities (company_id, description)
  values (NEW.id, 'Official community for ' || NEW.name);
  return NEW;
end;
$$ language plpgsql;

create trigger company_community_trigger
after insert on public.companies
for each row execute procedure public.create_company_community();

