'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ConfirmationPage() {
  const router = useRouter();

  useEffect(() => {
    // Optionally, you can redirect users after a certain time
    const timer = setTimeout(() => {
      router.push('/'); // Redirect to home or another page after 5 seconds
    }, 5000); // Redirect after 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [router]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>
        A confirmation email has been sent to your email address. Please check your inbox and confirm your email address to complete the signup process.
      </p>
      <p>If you don't see the email, please check your spam folder.</p>
      <p>You will be redirected to the homepage shortly.</p>
    </div>
  );
} 