# Dashboard Enhancement SQL Queries

This document contains SQL queries for implementing two dashboard enhancement features:
1. Community Integration
2. Goal Tracking & Milestones

## 1. Community Integration

### Community Activity View
```sql
CREATE VIEW user_community_activity AS
SELECT 
    cp.id, 
    cp.title, 
    cp.content, 
    cp.created_at, 
    cc.id as community_id, 
    c.name as community_name,
    p.id as author_id, 
    p.username as author_name, 
    p.avatar_url
FROM community_posts cp
JOIN company_communities cc ON cp.community_id = cc.id
JOIN companies c ON cc.company_id = c.id
JOIN profiles p ON cp.author_id = p.id;
```

### User Communities Function
```sql
CREATE OR REPLACE FUNCTION get_user_communities(user_id UUID)
RETURNS TABLE (community_id UUID) AS $$
BEGIN
    RETURN QUERY 
    SELECT cm.community_id
    FROM community_members cm
    WHERE cm.user_id = user_id;
END;
$$ LANGUAGE plpgsql;
```

### Community Stats Function
```sql
CREATE OR REPLACE FUNCTION get_user_community_stats(user_id UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'communities_joined', (SELECT COUNT(*) FROM community_members WHERE user_id = $1),
        'posts_created', (SELECT COUNT(*) FROM community_posts WHERE author_id = $1),
        'comments_made', (SELECT COUNT(*) FROM community_post_comments WHERE user_id = $1)
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;
```

## 2. Goal Tracking & Milestones

### User Goals Table
```sql
CREATE TABLE user_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  target_amount DECIMAL NOT NULL,
  current_amount DECIMAL DEFAULT 0,
  category TEXT NOT NULL, -- 'environmental', 'social', 'governance'
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  target_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'active', -- 'active', 'completed', 'abandoned'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### User Milestones Table
```sql
CREATE TABLE user_milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  is_achieved BOOLEAN DEFAULT false,
  achievement_date TIMESTAMP WITH TIME ZONE,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Security Policies
```sql
-- Row-level security policies
ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_milestones ENABLE ROW LEVEL SECURITY;

-- Goals policies
CREATE POLICY "Users can only see their own goals" 
ON user_goals FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can only modify their own goals" 
ON user_goals FOR ALL USING (auth.uid() = user_id);

-- Milestones policies
CREATE POLICY "Users can only see their own milestones" 
ON user_milestones FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can only modify their own milestones" 
ON user_milestones FOR ALL USING (auth.uid() = user_id);
```

### Investment-to-Goal Tracking Function
```sql
CREATE OR REPLACE FUNCTION update_goals_on_investment()
RETURNS TRIGGER AS $$
BEGIN
    -- Update relevant goals when a new investment is made
    UPDATE user_goals
    SET current_amount = current_amount + NEW.amount,
        status = CASE 
            WHEN current_amount + NEW.amount >= target_amount THEN 'completed'
            ELSE status
        END,
        updated_at = NOW()
    WHERE user_id = NEW.user_id
    AND status = 'active'
    AND category = (
        SELECT CASE
            WHEN c.category ILIKE '%environment%' THEN 'environmental'
            WHEN c.category ILIKE '%social%' THEN 'social'
            WHEN c.category ILIKE '%governance%' THEN 'governance'
            ELSE 'environmental'
        END
        FROM companies c
        WHERE c.id = NEW.company_id
    );
    
    -- Create milestone when goal is completed
    INSERT INTO user_milestones (user_id, title, description, is_achieved, achievement_date)
    SELECT 
        g.user_id,
        'Goal Achieved: ' || g.title,
        'Congratulations on reaching your ' || g.category || ' investment goal of $' || g.target_amount || '.',
        true,
        NOW()
    FROM user_goals g
    WHERE g.user_id = NEW.user_id
    AND g.status = 'completed'
    AND g.updated_at > NOW() - INTERVAL '1 minute';
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Create Trigger for Investment-to-Goal Tracking
```sql
CREATE TRIGGER investment_goal_tracker
AFTER INSERT ON investments
FOR EACH ROW
EXECUTE FUNCTION update_goals_on_investment();
```

## Usage Notes

- The community integration view and functions provide efficient access to community activity and statistics
- The goal tracking system automatically updates when new investments are made
- Goals are categorized by ESG criteria (environmental, social, governance)
- When a goal is completed, a milestone is automatically created
- All data is protected by row-level security policies
