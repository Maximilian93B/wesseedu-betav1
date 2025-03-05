import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  ArrowLeft, 
  Download, 
  Building2, 
  Users, 
  FileText 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SaveCompanyButton from "@/components/company/SaveCompanyButton";
import PitchDeckDownload from "@/components/company/PitchDeckDownload";

interface Company {
  id: string;
  name: string;
  description: string;
  mission_statement: string;
  image_url?: string;
  community_members: number;
  score: number;
  financials: Record<string, number>;
  sustainability_data: {
    social?: number;
    environmental?: number;
    governance?: number;
    construction?: string;
    features?: string[];
    materials?: string[];
    energy_surplus?: boolean;
    carbon_footprint?: string;
    [key: string]: number | string | string[] | boolean | undefined;
  };
  additional_images?: {
    team_image?: string;
    product_image?: string;
  };
}

interface CompanyDetailsViewProps {
  companyId: string;
  onClose: () => void;
}

export function CompanyDetailsView({ companyId, onClose }: CompanyDetailsViewProps) {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCompanyData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/companies/${companyId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch company data');
        }
        const data = await response.json();
        setCompany(data.company);
      } catch (err) {
        console.error('Error fetching company data:', err);
        setError('Failed to load company data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    if (companyId) {
      fetchCompanyData();
    }
  }, [companyId]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <p className="text-white text-xl">Loading company details...</p>
      </div>
    );
  }

  // Show error state
  if (error || !company) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <p className="text-white text-xl mb-4">{error || 'Company not found'}</p>
        <Button onClick={onClose} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Companies
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ type: "spring", stiffness: 80, damping: 17 }}
      className="absolute inset-0 bg-black overflow-y-auto"
    >
      <div className="min-h-screen bg-black">
        {/* Hero section with enhanced background */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-emerald-900/10 to-black z-0">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
            <div className="flex items-center justify-between mb-8">
              <Button
                onClick={() => onClose()}
                variant="ghost"
                className="hover:bg-white/5 text-zinc-400 hover:text-emerald-400 transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Companies
              </Button>
              <div className="flex gap-4">
                {company && company.id && (
                  <PitchDeckDownload 
                    companyId={company.id} 
                    companyName={company.name || 'company'} 
                    variant="outline"
                  />
                )}
                {company && company.id && (
                  <SaveCompanyButton companyId={company.id} size="default" variant="outline" />
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-12 mt-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden 
                  border-4 border-white/10 bg-[#0A0A0A] flex-shrink-0 shadow-xl shadow-emerald-900/20
                  group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 
                  group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                {company?.image_url ? (
                  <Image
                    src={company?.image_url || ''}
                    alt={`${company?.name || 'Company'} logo`}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 160px, 224px"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-emerald-400/10 
                    flex items-center justify-center">
                    <Building2 className="h-20 w-20 text-emerald-400" />
                  </div>
                )}
                <div className="absolute inset-0 ring-2 ring-white/5 rounded-2xl"></div>
              </motion.div>
              
              <div className="flex-grow min-w-0">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap gap-4 mb-6"
                >
                  <Badge variant="outline" 
                    className="px-4 py-1.5 border-emerald-400/20 bg-emerald-400/10 
                      text-emerald-400 hover:bg-emerald-400/20 transition-colors duration-200">
                    <Users className="h-4 w-4 mr-2" />
                    {company?.community_members?.toLocaleString() || '0'}
                  </Badge>
                  <Badge variant="outline" 
                    className="px-4 py-1.5 border-emerald-400/20 bg-emerald-400/10 
                      text-emerald-400 hover:bg-emerald-400/20 transition-colors duration-200">
                    Score: {company?.score || 0}/100
                  </Badge>
                  {company?.sustainability_data?.construction && (
                    <Badge variant="outline" 
                      className="px-4 py-1.5 border-emerald-400/20 bg-emerald-400/10 
                        text-emerald-400 hover:bg-emerald-400/20 transition-colors duration-200">
                      {company.sustainability_data.construction}
                    </Badge>
                  )}
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl lg:text-6xl font-bold bg-gradient-to-r 
                    from-emerald-300 via-white to-emerald-200 bg-clip-text text-transparent 
                    mb-6 leading-tight"
                >
                  {company?.name || 'Company'}
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-zinc-300 leading-relaxed max-w-3xl"
                >
                  {company?.description || 'No description available'}
                </motion.p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-24">
            {/* Mission Statement Card with enhanced styling */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gradient-to-br from-[#0A0A0A] to-[#111] border-0 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-transparent" />
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-emerald-600" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-emerald-400/50 via-emerald-400/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-emerald-400/50 via-emerald-400/10 to-transparent" />
                <CardContent className="p-10 relative z-10">
                  <div className="max-w-3xl mx-auto text-center">
                    <h3 className="text-2xl font-medium text-white mb-6">Our Mission</h3>
                    <p className="text-zinc-300 italic text-2xl leading-relaxed font-light">
                      "{company?.mission_statement || 'No mission statement available'}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* KPI Section with enhanced cards */}
            <section>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-white mb-10 border-l-4 border-emerald-400 pl-4"
              >
                Key Performance Indicators
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {Object.entries(company?.financials || {}).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-[#0A0A0A] to-[#111] border-2 border-white/5 
                      hover:border-emerald-500/30 transition-all duration-300 h-full
                      hover:shadow-lg hover:shadow-emerald-900/20 group relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 
                        group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-emerald-400/30 via-emerald-400/5 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <CardContent className="p-6 flex flex-col justify-between h-full relative z-10">
                        <p className="text-zinc-400 capitalize mb-2 truncate group-hover:text-emerald-300 transition-colors">
                          {key.replace(/_/g, " ")}
                        </p>
                        <div>
                          <p className="text-3xl md:text-4xl font-bold text-emerald-400 mb-1 group-hover:text-white transition-colors">
                            {key === 'profit_margin' 
                              ? `${(value * 100).toFixed(0)}%` 
                              : `$${value?.toLocaleString() || '0'}`}
                          </p>
                          <p className="text-sm text-zinc-500">
                            {key === 'funding' ? 'Total raised' : '+15% from previous year'}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Sustainability Section with enhanced visuals */}
            <section>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-white mb-10 border-l-4 border-emerald-400 pl-4"
              >
                Sustainability Impact
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {['social', 'environmental', 'governance'].map((key, index) => {
                  const value = company?.sustainability_data?.[key];
                  if (typeof value !== 'number') return null;
                  
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-gradient-to-br from-[#0A0A0A] to-[#111] border-2 border-white/5 
                        hover:border-emerald-500/30 transition-all duration-300 overflow-hidden relative">
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-900/30" />
                        <div 
                          className="absolute bottom-0 left-0 h-1 bg-emerald-400 transition-all duration-700" 
                          style={{ width: `${Math.min(value, 100)}%` }}
                        />
                        <CardContent className="p-8">
                          <div className="flex flex-col items-center text-center mb-6">
                            <span className="text-5xl font-bold text-emerald-400 mb-2">
                              {value}
                            </span>
                            <p className="text-zinc-400 capitalize text-lg">
                              {key.replace(/_/g, " ")} Score
                            </p>
                          </div>
                          <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${Math.min(value, 100)}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2.5 rounded-full" 
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Additional sustainability information with enhanced styling */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {company?.sustainability_data?.features && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-[#0A0A0A] to-[#111] border-2 border-white/5 h-full
                      hover:border-emerald-500/20 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-emerald-400/30 via-emerald-400/5 to-transparent"></div>
                      <CardHeader className="pb-2 border-b border-white/5">
                        <CardTitle className="text-xl text-emerald-300">Key Features</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <ul className="space-y-3">
                          {company?.sustainability_data?.features?.map((feature, index) => (
                            <motion.li 
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-3 p-4 
                              rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                            >
                              <div className="w-2 h-2 rounded-full bg-emerald-400 
                                flex-shrink-0" />
                              <span className="text-zinc-300 capitalize">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
                
                {company?.sustainability_data?.materials && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="bg-gradient-to-br from-[#0A0A0A] to-[#111] border-2 border-white/5 h-full
                      hover:border-emerald-500/20 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-emerald-400/30 via-emerald-400/5 to-transparent"></div>
                      <CardHeader className="pb-2 border-b border-white/5">
                        <CardTitle className="text-xl text-emerald-300">Materials Used</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <ul className="space-y-3">
                          {company?.sustainability_data?.materials?.map((material, index) => (
                            <motion.li 
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-3 p-4 
                              rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                            >
                              <div className="w-2 h-2 rounded-full bg-emerald-400 
                                flex-shrink-0" />
                              <span className="text-zinc-300">{material}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>
              
              {/* Additional sustainability highlights */}
              {(company?.sustainability_data?.energy_surplus !== undefined || 
                company?.sustainability_data?.carbon_footprint) && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {company?.sustainability_data?.energy_surplus !== undefined && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <Card className="bg-gradient-to-br from-[#0A0A0A] to-[#111] border-2 border-white/5
                        hover:border-emerald-500/20 transition-all duration-300 overflow-hidden">
                        <CardContent className="p-6 flex items-center gap-6">
                          <div className="w-16 h-16 rounded-full bg-emerald-400/10 flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-xl font-medium text-white mb-1">Energy Positive</h3>
                            <p className="text-zinc-400">
                              This company produces more energy than it consumes, contributing clean energy back to the grid.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                  
                  {company?.sustainability_data?.carbon_footprint && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      <Card className="bg-gradient-to-br from-[#0A0A0A] to-[#111] border-2 border-white/5
                        hover:border-emerald-500/20 transition-all duration-300 overflow-hidden">
                        <CardContent className="p-6 flex items-center gap-6">
                          <div className="w-16 h-16 rounded-full bg-emerald-400/10 flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-xl font-medium text-white mb-1">Carbon Footprint</h3>
                            <p className="text-zinc-400">
                              {company?.sustainability_data?.carbon_footprint ? 
                                `${company.sustainability_data.carbon_footprint.charAt(0).toUpperCase() + 
                                company.sustainability_data.carbon_footprint.slice(1)} carbon impact compared to industry standards.`
                                : 'Carbon footprint information not available.'}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </div>
              )}
            </section>

            {/* Market Analysis with enhanced visuals */}
            <section>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-white mb-10 border-l-4 border-emerald-400 pl-4"
              >
                Market Analysis
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-[#0A0A0A] to-[#111] border-2 border-white/5 h-full
                    hover:border-emerald-500/20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-emerald-400/30 via-emerald-400/5 to-transparent"></div>
                    <CardHeader className="pb-2 border-b border-white/5">
                      <CardTitle className="text-xl text-emerald-300">Market Position</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      {[
                        { label: "Market Share", value: "12%" },
                        { label: "Industry Ranking", value: "#3" },
                        { label: "Growth Rate", value: "+25% YoY" }
                      ].map((item, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between 
                          p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <span className="text-zinc-300">{item.label}</span>
                          <span className="text-emerald-400 font-medium text-lg">{item.value}</span>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="bg-gradient-to-br from-[#0A0A0A] to-[#111] border-2 border-white/5 h-full
                    hover:border-emerald-500/20 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-emerald-400/30 via-emerald-400/5 to-transparent"></div>
                    <CardHeader className="pb-2 border-b border-white/5">
                      <CardTitle className="text-xl text-emerald-300">Competitive Advantage</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ul className="space-y-3">
                        {[
                          "Proprietary Technology",
                          "Strong Patent Portfolio",
                          "Global Distribution Network"
                        ].map((item, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 p-4 
                            rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                          >
                            <div className="w-2 h-2 rounded-full bg-emerald-400 
                              flex-shrink-0" />
                            <span className="text-zinc-300">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </section>

            {/* Gallery with enhanced visuals */}
            {company?.additional_images && (
              <section>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold text-white mb-10 border-l-4 border-emerald-400 pl-4"
                >
                  Gallery
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {company?.additional_images?.team_image && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="bg-gradient-to-br from-[#0A0A0A] to-[#111] border-2 border-white/5 overflow-hidden
                        hover:border-emerald-500/20 transition-all duration-300 group">
                        <CardHeader className="pb-2 border-b border-white/5">
                          <CardTitle className="text-xl text-emerald-300">Our Team</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="relative w-full h-80 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 
                              group-hover:opacity-100 transition-opacity duration-500"></div>
                            <Image
                              src={company?.additional_images?.team_image || ''}
                              alt={`${company?.name || 'Company'} team`}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                  
                  {company?.additional_images?.product_image && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Card className="bg-gradient-to-br from-[#0A0A0A] to-[#111] border-2 border-white/5 overflow-hidden
                        hover:border-emerald-500/20 transition-all duration-300 group">
                        <CardHeader className="pb-2 border-b border-white/5">
                          <CardTitle className="text-xl text-emerald-300">Our Product</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="relative w-full h-80 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 
                              group-hover:opacity-100 transition-opacity duration-500"></div>
                            <Image
                              src={company?.additional_images?.product_image || ''}
                              alt={`${company?.name || 'Company'} product`}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </div>
              </section>
            )}
            
            {/* Call to action section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-24"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 to-black"></div>
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
                <div className="relative z-10 px-8 py-16 md:py-20">
                  <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                      Ready to Support {company?.name || 'this company'}?
                    </h2>
                    <p className="text-xl text-zinc-300 mb-10 leading-relaxed">
                      Join our community of investors and help fund sustainable innovation that makes a difference.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      {company && company.id && (
                        <PitchDeckDownload 
                          companyId={company.id} 
                          companyName={company.name || 'company'} 
                        />
                      )}
                      <Button
                        onClick={() => company && company.id ? window.location.href = `/admin/companies/${company.id}` : null}
                        variant="outline"
                        className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 px-8 py-6 text-lg h-auto"
                      >
                        <FileText className="h-5 w-5 mr-2" />
                        View Full Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Footer section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-24 border-t border-white/5 pt-8"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10">
                    {company?.image_url ? (
                      <Image
                        src={company?.image_url || ''}
                        alt={`${company?.name || 'Company'} logo`}
                        fill
                        className="object-contain p-2"
                        sizes="48px"
                      />
                    ) : (
                      <div className="w-full h-full bg-emerald-400/10 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-emerald-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">{company?.name || 'Company'}</p>
                    <p className="text-zinc-500 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button
                    onClick={() => onClose()}
                    variant="ghost"
                    className="hover:bg-white/5 text-zinc-400 hover:text-emerald-400"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Companies
                  </Button>
                  {company && company.id && (
                    <SaveCompanyButton companyId={company.id} size="default" variant="outline" />
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

