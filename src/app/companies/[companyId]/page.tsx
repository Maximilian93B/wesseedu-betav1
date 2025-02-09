'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Company {
  id: string;
  name: string;
  logo_url: string;
  website_url: string;
  industry: string;
  location: string;
  year_founded: number;
  mission_statement: string;
  company_description: string;
  problem_statement: string;
  solution_description: string;
  target_market: string;
  competitive_advantage: string;
  funding_stage: string;
  funding_goal: number;
  current_funding: number;
  pre_money_valuation: number;
  equity_available: number;
  team_members: Array<{
    name: string;
    role: string;
    bio: string;
  }>;
}

export default function CompanyPage() {
  const params = useParams();
  const companyId = params?.id as string;
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCompany = async () => {
      try {
        if (!companyId) {
          throw new Error('Company ID is required');
        }

        setLoading(true);
        const response = await fetch(`/api/marketing/companies/${companyId}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to load company');
        }

        const data = await response.json();

        // Only update state if component is still mounted
        if (isMounted) {
          setCompany(data.company);
          setError(null);
        }
      } catch (err) {
        // Only update state if component is still mounted
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load company');
          setCompany(null);
        }
      } finally {
        // Only update state if component is still mounted
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCompany();

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, [companyId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading company details...</div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">{error || 'Company not found'}</div>
          <Link 
            href="/marketing/marketplace"
            className="text-blue-600 hover:text-blue-500"
          >
            Return to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Marketplace Link */}
        <Link 
          href="/marketing/marketplace"
          className="inline-flex items-center text-blue-600 mb-8 hover:text-blue-500"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Marketplace
        </Link>

        {/* Company Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-6">
            <Image
              src={company.logo_url}
              alt={`${company.name} logo`}
              width={100}
              height={100}
              className="rounded-full"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
              <p className="text-gray-500">{company.industry} • {company.location}</p>
              {company.website_url && (
                <a 
                  href={company.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-500 mt-2 inline-block"
                >
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Company Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-600 mb-4">{company.company_description}</p>
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Mission Statement</h3>
                <p className="text-gray-600">{company.mission_statement}</p>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Problem & Solution</h2>
              <div className="mb-4">
                <h3 className="font-medium mb-2">Problem</h3>
                <p className="text-gray-600">{company.problem_statement}</p>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Solution</h3>
                <p className="text-gray-600">{company.solution_description}</p>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Market & Advantage</h2>
              <div className="mb-4">
                <h3 className="font-medium mb-2">Target Market</h3>
                <p className="text-gray-600">{company.target_market}</p>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Competitive Advantage</h3>
                <p className="text-gray-600">{company.competitive_advantage}</p>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Investment Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm text-gray-500">Funding Stage</h3>
                  <p className="font-medium">{company.funding_stage}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Funding Goal</h3>
                  <p className="font-medium">${company.funding_goal.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Current Funding</h3>
                  <p className="font-medium">${company.current_funding.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Equity Available</h3>
                  <p className="font-medium">{company.equity_available}%</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Pre-money Valuation</h3>
                  <p className="font-medium">${company.pre_money_valuation.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Year Founded</h3>
                  <p className="font-medium">{company.year_founded}</p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Team</h2>
              <div className="space-y-4">
                {company.team_members.map((member, index) => (
                  <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-gray-500 text-sm">{member.role}</p>
                    <p className="text-gray-600 mt-1">{member.bio}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 