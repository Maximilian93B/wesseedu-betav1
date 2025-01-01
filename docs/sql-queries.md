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

CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Unique identifier for the company
    name TEXT NOT NULL,                            -- Name of the company
    street_address TEXT NOT NULL,                  -- Street address of the company
    city TEXT NOT NULL,                            -- City of the company
    state TEXT NOT NULL,                           -- State/Province of the company
    country TEXT NOT NULL,                         -- Country of the company
    postal_code TEXT NOT NULL,                     -- Postal code of the company
    industry TEXT NOT NULL,                        -- Industry of the company
    funding_goal NUMERIC(15, 2) NOT NULL,          -- Company's funding goal
    is_verified BOOLEAN DEFAULT FALSE,            -- Email verification status
    created_at TIMESTAMP DEFAULT NOW(),            -- When the company was created
    updated_at TIMESTAMP DEFAULT NOW(),            -- Last update time
    pitch_deck_url TEXT,                           -- URL to the company's pitch deck
    financial_statement_url TEXT,                 -- URL to the company's financial statement
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
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




