"use client"

import React, { Suspense, useState, useEffect, useRef, useMemo } from 'react'
import { MainNav } from "@/components/wsu/Nav"
import { motion, useScroll, useTransform, useSpring, LazyMotion, domAnimation } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import dynamic from 'next/dynamic'
import SectionLoader from "@/components/wsu/SectionLoader"
import { AuthProvider, useAuth } from "@/context/AuthContext"
import { LoadingScreen } from "@/components/wsu/home"
import Head from "next/head"

// Dynamic imports only - remove the static imports
const HeroSection = dynamic(() => 
  import("@/components/wsu/Marketing/HeroSection").then(mod => mod.HeroSection), {
  loading: () => <SectionLoader />,
  ssr: true
})

const MobileHero = dynamic(() => 
  import("@/components/wsu/Marketing/MobileHero").then(mod => mod.MobileHero), {
  loading: () => <SectionLoader />,
  ssr: true
})

const CardSection = dynamic(() => 
  import("@/components/wsu/Marketing/CardSection").then(mod => mod.CardSection), {
  loading: () => <SectionLoader />,
  ssr: true
})

const PartnersAndVetting = dynamic(() => 
  import("@/components/wsu/Marketing/PartnersAndVetting/index").then(mod => mod.PartnersAndVetting), {
  loading: () => <SectionLoader />,
  ssr: true
})

const MoneyWorthSection = dynamic(() => 
  import("@/components/wsu/Marketing/MoneyWorthSection").then(mod => mod.MoneyWorthSection), {
  loading: () => <SectionLoader />,
  ssr: true
})

const EarnAsYouGrow = dynamic(() => 
  import("@/components/wsu/Marketing/EarnAsYouGrow").then(mod => mod.EarnAsYouGrow), {
  loading: () => <SectionLoader />,
  ssr: true
})

const SustainableImpactSection = dynamic(() => 
  import("@/components/wsu/Marketing/WsImact").then(mod => mod.SustainableImpactSection), {
  loading: () => <SectionLoader />,
  ssr: true
})

const StartupApplicationSection = dynamic(() => 
  import("@/components/wsu/Marketing/StartupApplicationSection").then(mod => mod.StartupApplicationSection), {
  loading: () => <SectionLoader />,
  ssr: true
})

function RootContent() {
  const { user, loading } = useAuth()
  const router = useRouter()
  
  // Redirect based on authentication
  useEffect(() => {
    if (!loading) {
      if (user) {
        // Authenticated users go to dashboard home
        router.replace('/dashboard/home')
      } else {
        // Non-authenticated users go to login
        router.replace('/auth/signin')
      }
    }
  }, [user, loading, router])
  
  // Show loading screen while checking auth and redirecting
  return <LoadingScreen />
}

export default function RootPage() {
  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <RootContent />
    </AuthProvider>
  )
}

// Helper function to detect mobile devices - enhanced version
function isMobile() {
  if (typeof window === 'undefined') return false;
  
  // Check for mobile user agent
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Check for mobile screen size
  const isMobileScreen = window.innerWidth < 768;
  
  // Check for touch capability
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Consider it mobile if either condition is true
  return isMobileUA || (isMobileScreen && isTouchDevice);
}