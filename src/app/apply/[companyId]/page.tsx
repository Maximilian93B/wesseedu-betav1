// app/apply/[companyId]/page.tsx
'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useUser } from '@supabase/auth-helpers-react';

export default function FundingApplicationPage() {
  const params = useParams();
  const { companyId } = params as { companyId: string };
  const user = useUser();
  const router = useRouter();
  const [fundingAmount, setFundingAmount] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const res = await fetch(`/api/apply/${companyId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        funding_amount: fundingAmount,
        message,
        applicant_id: user.id,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setErrorMsg(data.error);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div>
      <h1>Apply for Funding</h1>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Funding Amount:
          <input
            type="number"
            value={fundingAmount}
            onChange={(e) => setFundingAmount(e.target.value)}
            required
          />
        </label>
        <label>
          Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}
