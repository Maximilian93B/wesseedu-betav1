"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { AccountingFirm } from "./types"
import { Shield, TrendingUp, FileCheck, BarChart3 } from "lucide-react"

export function VettingFirmCard({ 
  firm, 
  index 
}: { 
  firm: AccountingFirm; 
  index: number; 
}) {
  // Icon mapping based on firm's iconType
  const iconMap = {
    audit: <Shield className="h-6 w-6 text-green-600" />,
    finance: <BarChart3 className="h-6 w-6 text-green-600" />,
    compliance: <FileCheck className="h-6 w-6 text-green-600" />,
    growth: <TrendingUp className="h-6 w-6 text-green-600" />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group"
    >
      <div className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-xl p-6 border border-white/20 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition-all duration-300 h-full flex flex-col">
        {/* Top border accent */}
        <div className="absolute inset-x-0 top-0 h-1 rounded-t-xl bg-gradient-to-r from-green-400 via-green-300 to-green-400/20"></div>
        
        {/* Logo and 3D Icon */}
        <div className="flex justify-between items-start mb-5">
          <div className="h-12 w-32 relative">
            <Image
              src={firm.logo}
              alt={firm.name}
              fill
              className="object-contain"
              sizes="128px"
            />
          </div>
          
          {/* 3D Icon container - Replace with actual Icon Scout import when available */}
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center shadow-md border border-green-100/50 text-green-600 group-hover:bg-green-100 transition-colors duration-300"
          >
            {iconMap[firm.iconType]}
          </motion.div>
        </div>
        
        {/* Firm details */}
        <div>
          <h3 className="text-green-800 font-medium text-lg mb-2">
            {firm.name}
          </h3>
          
          <p className="text-sm text-green-700/80 mb-4">
            {firm.description}
          </p>
          
          {/* Specialties */}
          <div className="mb-4">
            <h4 className="text-xs font-medium text-green-800 uppercase tracking-wider mb-2">
              Specialties
            </h4>
            <div className="flex flex-wrap gap-2">
              {firm.specialties.map((specialty, idx) => (
                <span 
                  key={idx}
                  className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-auto pt-4 border-t border-green-100">
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <p className="text-green-800 font-semibold text-lg">
                  {firm.stats.companiesVetted}
                </p>
                <p className="text-xs text-green-700/70">
                  Companies Vetted
                </p>
              </div>
              <div className="text-center">
                <p className="text-green-800 font-semibold text-lg">
                  {firm.stats.approvalRate}
                </p>
                <p className="text-xs text-green-700/70">
                  Approval Rate
                </p>
              </div>
              <div className="text-center">
                <p className="text-green-800 font-semibold text-lg">
                  {firm.stats.avgTimeframe}
                </p>
                <p className="text-xs text-green-700/70">
                  Avg. Timeframe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 