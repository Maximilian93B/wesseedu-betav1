'use client';

import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

interface UserTier {
  name: 'root' | 'thrive' | 'impact';
  description: string;
  features: string[];
}

const USER_TIERS: Record<string, UserTier> = {
  root: {
    name: 'root',
    description: 'Free, basic access for retail investors',
    features: ['Basic company profiles', 'Public marketplace access', 'Basic analytics']
  },
  thrive: {
    name: 'thrive',
    description: 'Paid annual membership with advanced features',
    features: ['In-depth company profiles', 'Advanced analytics', 'Priority access', 'Premium support']
  },
  impact: {
    name: 'impact',
    description: 'Exclusive tier for top contributors',
    features: ['All Thrive features', 'Exclusive investment opportunities', 'VIP events', 'Direct company access']
  }
};

export default function ProfileCreationPage() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [selectedTier, setSelectedTier] = useState<'root' | 'thrive'>('root');

  const availableTags = [
    'Renewable Energy',
    'Green Technology',
    'Sustainable Agriculture',
    'Socially Responsible Investing',
    'Impact Investing',
    'Clean Water',
    'Waste Reduction',
    'Carbon Neutral',
    'Biodiversity Conservation',
    'Ethical Supply Chain',
  ];

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        sessionStorage.setItem('redirectAfterLogin', '/auth/profile-create');
        router.push('/auth/login');
      }
    };
    checkSession();
  }, [supabase.auth, router]);

  const handleProfileCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMsg('Please fill in all required fields');
      return;
    }

    if (tags.length === 0) {
      setErrorMsg('Please select at least one investment tag');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setErrorMsg('You must be logged in to create a profile.');
        router.push('/auth/login');
        return;
      }

      const response = await fetch('/api/auth/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: user.id,
          email: user.email,
          name: `${firstName} ${lastName}`,
          user_type: 'investor',
          user_tier: selectedTier,
          sustainable_investment_tags: tags,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Profile creation failed');
      }

      setSuccessMsg(data.message);
      router.push('/dashboard'); // Redirect to the dashboard after successful profile creation
    } catch (err) {
      console.error('Profile creation error:', err);
      setErrorMsg('An unexpected error occurred. Please try again later.');
    }
  };

  const handleTagChange = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag)); // Remove tag if already selected
    } else {
      setTags([...tags, tag]); // Add tag if not selected
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Your Profile</h1>
      {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
      {successMsg && <p className="text-green-500 mb-4">{successMsg}</p>}
      
      <form onSubmit={handleProfileCreation} className="space-y-6">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Select Your Membership Tier</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['root', 'thrive'].map((tier) => (
              <div 
                key={tier}
                className={`p-4 border rounded-lg cursor-pointer ${
                  selectedTier === tier ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setSelectedTier(tier as 'root' | 'thrive')}
              >
                <h4 className="font-bold capitalize">{tier}</h4>
                <p className="text-sm text-gray-600">{USER_TIERS[tier].description}</p>
                <ul className="mt-2 text-sm">
                  {USER_TIERS[tier].features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <span className="mr-2">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                {tier === 'thrive' && (
                  <p className="mt-2 text-sm font-semibold text-blue-600">
                    Annual subscription required
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Note: Impact tier is awarded to top contributing investors and cannot be selected during registration.
          </p>
        </div>

        <div>
          <h3>Select Sustainable Investment Tags:</h3>
          {availableTags.map((tag) => (
            <label key={tag}>
              <input
                type="checkbox"
                checked={tags.includes(tag)}
                onChange={() => handleTagChange(tag)}
              />
              {tag}
            </label>
          ))}
        </div>
        
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
}