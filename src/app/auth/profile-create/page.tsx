'use client';

import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

export default function ProfileCreationPage() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

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

  const handleProfileCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setErrorMsg('You must be logged in to create a profile.');
      return;
    }

    try {
      const response = await fetch('/api/auth/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          email: user.email || '',
          name: `${firstName} ${lastName}`,
          user_type: 'investor', // Default user type
          user_tier: 'root', // Default user tier
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
      console.error('Unexpected error:', err);
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
    <div>
      <h1>Create Your Profile</h1>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
      <form onSubmit={handleProfileCreation}>
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
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
}