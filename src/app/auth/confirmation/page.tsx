'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function ConfirmationPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [message, setMessage] = useState('Please check your email to verify your account.');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Get session using async cookie handling
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        // Check URL parameters for errors
        const urlParams = new URLSearchParams(window.location.search);
        const urlError = urlParams.get('error');
        const errorDescription = urlParams.get('error_description');

        if (urlError) {
          if (urlError === 'access_denied' && 
             (errorDescription?.includes('expired') || urlParams.get('error_code') === 'otp_expired')) {
            setError('Your verification link has expired. Please request a new verification email.');
            // Optional: Add a button or link to request new verification email
            return;
          }
          setError(`Authentication error: ${errorDescription || urlError}`);
          return;
        }

        if (sessionError) {
          console.error('Session error:', sessionError);
          setError('Failed to verify your email. Please try again.');
          return;
        }

        if (session) {
          setMessage('Email verified successfully! Redirecting...');
          // Check for profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          // Redirect based on profile existence
          if (!profile) {
            router.push('/auth/profile-create');
          } else {
            router.push('/dashboard');
          }
        }
      } catch (err) {
        console.error('Verification error:', err);
        setError('An unexpected error occurred during verification.');
      }
    };

    checkAuthStatus();
  }, [router, supabase.auth]);

  const handleResendVerification = async () => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/profile-create`
        }
      });
      if (error) throw error;
      setMessage('New verification email sent! Please check your inbox.');
      setError('');
    } catch (err) {
      setError('Failed to resend verification email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-2xl font-bold">Email Verification</h1>
        {error ? (
          <div className="text-red-600">
            <p>{error}</p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-4 px-4 py-2 border rounded"
            />
            <button
              onClick={handleResendVerification}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Resend Verification Email
            </button>
          </div>
        ) : (
          <p className="mt-2 text-gray-600">{message}</p>
        )}
        <p className="text-sm text-gray-500">
          If you don't see the email, please check your spam folder.
        </p>
      </div>
    </div>
  );
}