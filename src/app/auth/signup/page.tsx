'use client';

import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setInfoMsg('');

    try {
      // Attempt to sign up the user via Supabase Auth.
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        console.error('Signup error:', error);
        setErrorMsg(`Signup failed: ${error.message}`);
        return;
      }

      // If data.user exists, then signup was initiated.
      if (data && data.user) {
        // Redirect to profile creation page
        router.push('/auth/confirmation'); // Redirect to the profile creation page
      }


    } catch (err: any) {
      console.error('Unexpected signup error:', err);
      setErrorMsg('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      {infoMsg && <p style={{ color: 'green' }}>{infoMsg}</p>}
      <form onSubmit={handleSignup}>
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
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
