'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

export default function MarketplacePage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      
      const response = await fetch(`/api/companies?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setCompanies(data.companies || []);
    } catch (error) {
      console.error('Error fetching companies:', error);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCompanies();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchCompanies]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              WeSeedU Marketplace
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Discover and invest in promising startups and growing businesses
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <input
              type="search"
              placeholder="Search companies..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-500">
                          {company.name.charAt(0)}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {company.name}
                      </h3>
                    </div>
                    <div className="mb-2 flex items-center">
                      <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full">
                        Score: {company.score}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {company.description}
                    </p>
                    <p className="text-sm text-gray-500 mb-4 italic">
                      "{company.mission_statement}"
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-600">
                        Funding Raised: ${company.financials.funding_raised.toLocaleString()}
                      </span>
                      <Link
                        href={`/companies/${company.id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
