-- **Users Table**

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique identifier for the user
    email TEXT NOT NULL UNIQUE,                    -- Email address of the user
    phone TEXT,                                    -- Phone number of the user (optional)
    first_name TEXT NOT NULL,                      -- User's first name
    last_name TEXT NOT NULL,                       -- User's last name
    user_type TEXT NOT NULL,                       -- Type of user (e.g., "Admin", "Regular")
    tier_id INTEGER DEFAULT 1,                     -- Tier linked to the user (default: Free)
    is_verified BOOLEAN DEFAULT FALSE,             -- Email verification status
    created_at TIMESTAMP DEFAULT NOW(),            -- When the user was created
    updated_at TIMESTAMP DEFAULT NOW(),            -- Last update time
    CONSTRAINT fk_tier_id FOREIGN KEY (tier_id) REFERENCES tiering(id) ON DELETE SET DEFAULT
);

-- **Companies Table**

-- Main Companies Table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic Info
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  industry TEXT NOT NULL,
  location TEXT NOT NULL,
  year_founded INTEGER NOT NULL,
  
  -- Company Content
  mission_statement TEXT NOT NULL,
  company_description TEXT NOT NULL,
  problem_statement TEXT NOT NULL,
  solution_description TEXT NOT NULL,
  target_market TEXT NOT NULL,
  competitive_advantage TEXT NOT NULL,
  
  -- Team
  team_members JSONB,
  
  -- Financial Summary
  funding_stage TEXT NOT NULL,
  funding_goal NUMERIC NOT NULL,
  current_funding NUMERIC DEFAULT 0,
  pre_money_valuation NUMERIC NOT NULL,
  equity_available NUMERIC NOT NULL,
  
  -- ESG & Impact
  esg_score NUMERIC(3,1),
  sdg_alignment TEXT[],
  sustainability_impact TEXT,
  
  -- Admin Fields
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  
  -- Constraints
  CONSTRAINT valid_funding_stage CHECK (
    funding_stage IN ('pre-seed', 'seed', 'series_a', 'series_b', 'series_c', 'growth')
  ),
  CONSTRAINT valid_equity CHECK (equity_available >= 0 AND equity_available <= 100),
  CONSTRAINT valid_year CHECK (year_founded >= 2000 AND year_founded <= EXTRACT(YEAR FROM CURRENT_DATE))
);

-- Company Documents
CREATE TABLE company_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  
  CONSTRAINT valid_document_type CHECK (
    document_type IN (
      'pitch_deck',
      'financial_report',
      'company_profile',
      'additional_documents'
    )
  )
);

-- Detailed Financials
CREATE TABLE company_financials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  
  -- Key Metrics
  revenue_ttm NUMERIC NOT NULL,
  revenue_growth NUMERIC NOT NULL,
  gross_margin NUMERIC NOT NULL,
  burn_rate NUMERIC NOT NULL,
  runway_months INTEGER NOT NULL,
  
  -- Market Data
  market_size NUMERIC NOT NULL,
  market_growth_rate NUMERIC NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- User Follows
CREATE TABLE user_follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  UNIQUE(user_id, company_id)
);


-- **Favorites Table**

CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique identifier for the favorite
    user_id UUID NOT NULL,                         -- Links the favorite to the user
    company_id UUID NOT NULL,                      -- Links the favorite to the company
    created_at TIMESTAMP DEFAULT NOW(),            -- Timestamp for when the favorite was added
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    CONSTRAINT unique_user_company UNIQUE (user_id, company_id) -- Ensure no duplicates
);


-- **Notifications Table**

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique identifier for the notification
    user_id UUID NOT NULL,                         -- Links the notification to the user
    company_id UUID,                               -- Links the notification to the company (optional)
    title TEXT NOT NULL,                           -- Title of the notification
    content TEXT NOT NULL,                         -- Detailed content of the notification
    type TEXT DEFAULT 'Info',                      -- Category/type of the notification
    read BOOLEAN DEFAULT FALSE,                    -- Indicates if the notification has been read
    created_at TIMESTAMP DEFAULT NOW(),            -- Timestamp for when the notification was created
    updated_at TIMESTAMP DEFAULT NOW(),            -- Last update time
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);


-- **Updates Table**

CREATE TABLE updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique identifier for the update
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE, -- Link to the company
    title TEXT NOT NULL,                            -- Title of the update
    description TEXT NOT NULL,                      -- Detailed description of the update
    created_at TIMESTAMP DEFAULT NOW()              -- When the update was created
);



id

No description

uuid	uuid	
company_id

No description

uuid	uuid	
title

No description

text	text	
content

No description

text	text	
created_at

No description

timestamp without time zone	timestamp




