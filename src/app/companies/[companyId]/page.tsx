'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import SaveCompanyButton from "@/components/SaveCompanyButton";

interface Company {
  id: string;
  name: string;
  description: string;
  mission_statement: string;
  financials: {
    annual_revenue: number;
    funding_raised: number;
    burn_rate: number;
  };
  pitch_deck_url: string;
  sustainability_data: {
    [key: string]: number;
  };
  score: number;
}

export default function CompanyDetailPage() {
  const params = useParams();
  const companyId = params?.companyId as string;
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state
        const response = await fetch(`/api/companies/${companyId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setCompany(data.company);
      } catch (err) {
        console.error('Error fetching company:', err);
        setError(err instanceof Error ? err.message : 'Failed to load company');
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      fetchCompany();
    }
  }, [companyId]);

  const handlePitchDeckDownload = async () => {
    if (!company) return;
    
    setIsDownloading(true);
    try {
      const response = await fetch(`/api/companies/${company.id}/pitch-deck`);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Failed to get download URL');
      }
      
      const data = await response.json();
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error during pitch deck download:', error);
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setIsDownloading(false);
    }
  };

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
            href="/companies"
            className="text-blue-600 hover:text-blue-500"
          >
            Return to Companies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Companies Link */}
        <Link 
          href="/companies"
          className="inline-flex items-center text-blue-600 mb-8 hover:text-blue-500"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Companies
        </Link>

        {/* Company Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-500">
                  {company.name.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
                <p className="text-gray-500 mt-2">Sustainability Score: {company.score}</p>
              </div>
            </div>
            <SaveCompanyButton 
              companyId={company.id}
              size="default"
              variant="default"
            />
          </div>
        </div>

        {/* Company Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-600 mb-4">{company.description}</p>
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Mission Statement</h3>
                <p className="text-gray-600">{company.mission_statement}</p>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Sustainability Metrics</h2>
              <div className="space-y-4">
                {Object.entries(company.sustainability_data).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-gray-600 capitalize">{key.replace(/_/g, ' ')}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Annual Revenue</span>
                  <span className="font-medium">${company.financials.annual_revenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Funding Raised</span>
                  <span className="font-medium">${company.financials.funding_raised.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Burn Rate</span>
                  <span className="font-medium">${company.financials.burn_rate.toLocaleString()}</span>
                </div>
              </div>
            </section>

            {company.pitch_deck_url && (
              <section className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Resources</h2>
                <button 
                  onClick={handlePitchDeckDownload}
                  disabled={isDownloading}
                  className={`text-blue-600 hover:text-blue-500 flex items-center ${
                    isDownloading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isDownloading ? (
                    <span>Downloading...</span>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                      Download Pitch Deck
                    </>
                  )}
                </button>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
