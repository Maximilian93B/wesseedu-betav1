"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Partner } from "./types"

// Partner card component using Green Apple styling
export function PartnerCard({ partner, index }: { 
  partner: Partner; 
  index: number; 
}) {
  return (
    <div className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-xl p-5 border border-white/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300">
      {/* Logo */}
      <div className="flex justify-center mb-5">
        <div className="h-16 w-16 relative">
          <Image
            src={partner.logo}
            alt={partner.name}
            fill
            className="object-contain"
            sizes="64px"
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="text-center">
        <h3 className="text-green-800 font-medium mb-2">
          {partner.name}
        </h3>
        
        <p className="text-sm text-green-700/80 mb-4 min-h-[40px]">
          {partner.description}
        </p>
        
        {partner.link && (
          <Link
            href={partner.link}
            className="inline-flex items-center text-xs font-medium text-green-700 hover:text-green-600 group"
          >
            LEARN MORE 
            <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        )}
      </div>
    </div>
  );
} 