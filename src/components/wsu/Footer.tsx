'use client'

import Link from "next/link"
import { Facebook, X, Instagram, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// Footer component with consistent styling from Nav
export function Footer() {
  // State for mobile accordion sections
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Extracted common styles to match Nav with black and white scheme
  const styles = {
    container: "w-full bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-8px_25px_rgba(0,0,0,0.05)]",
    brandLink: "flex items-center group",
    brandIcon: "p-2 bg-gray-100 rounded-full transition-all duration-300 group-hover:scale-110",
    footerButton: "text-gray-500 hover:text-black relative transition-all duration-200 w-full justify-start p-2 group hover:translate-y-[-1px]",
    socialIcon: "h-8 w-8 sm:h-10 sm:w-10 p-2 rounded-full bg-gray-100 text-black hover:bg-gray-200 transition-all duration-300 hover:scale-110",
    footerHeading: "text-black text-xs font-medium uppercase tracking-wider mb-3",
    footerLink: "text-gray-600 hover:text-black text-sm transition-all duration-200 hover:translate-x-[2px]"
  }

  // Section title component for mobile accordion
  const SectionTitle = ({ title, section }: { title: string, section: string }) => (
    <button 
      onClick={() => toggleSection(section)}
      className="flex items-center justify-between w-full py-2 md:py-0 border-b md:border-b-0 border-gray-200 md:border-none"
    >
      <h3 className={styles.footerHeading}>{title}</h3>
      <span className="md:hidden">
        {openSection === section ? '−' : '+'}
      </span>
    </button>
  );

  return (
    <footer className={styles.container}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8">
          {/* Brand and Description */}
          <div className="md:col-span-2 mb-6 md:mb-0">
            <Link href="/" className={styles.brandLink}>
              <div className="text-xl font-bold flex">
                <span className="text-black">We</span>
                <span className="text-black">Seed</span>
                <span className="text-black">U</span>
              </div>
            </Link>
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              WeSeedU is dedicated to empowering startups and fostering sustainable growth
              through innovative funding solutions and expert guidance.
            </p>
            <div className="flex items-center space-x-2 sm:space-x-3 mt-4 sm:mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <Facebook className="h-4 w-4 sm:h-6 sm:w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <X className="h-4 w-4 sm:h-6 sm:w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <Instagram className="h-4 w-4 sm:h-6 sm:w-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <Linkedin className="h-4 w-4 sm:h-6 sm:w-6" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <Github className="h-4 w-4 sm:h-6 sm:w-6" />
              </a>
            </div>
          </div>

          {/* Platform Links - Mobile Accordion */}
          <div className="mb-1 md:mb-0">
            <SectionTitle title="Platform" section="platform" />
            <ul className={`space-y-2 mt-2 ${openSection === 'platform' ? 'block' : 'hidden md:block'}`}>
              <li>
                <Link href="/mobile-first-weSeedU" className={styles.footerLink}>
                  The Platform
                </Link>
              </li>
              <li>
                <Link href="/solutions" className={styles.footerLink}>
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.footerLink}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.footerLink}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources - Mobile Accordion */}
          <div className="mb-1 md:mb-0">
            <SectionTitle title="Resources" section="resources" />
            <ul className={`space-y-2 mt-2 ${openSection === 'resources' ? 'block' : 'hidden md:block'}`}>
              <li>
                <Link href="/blog" className={styles.footerLink}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faqs" className={styles.footerLink}>
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/support" className={styles.footerLink}>
                  Support
                </Link>
              </li>
              <li>
                <Link href="/investor-resources" className={styles.footerLink}>
                  Investor Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal - Mobile Accordion */}
          <div className="mb-1 md:mb-0">
            <SectionTitle title="Legal" section="legal" />
            <ul className={`space-y-2 mt-2 ${openSection === 'legal' ? 'block' : 'hidden md:block'}`}>
              <li>
                <Link href="/terms" className={styles.footerLink}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={styles.footerLink}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className={styles.footerLink}>
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/security" className={styles.footerLink}>
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Sign-up Call to Action */}
        <div className="mt-8 sm:mt-12 border-t border-gray-200 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <p className="text-gray-600 font-medium">Ready to grow with us?</p>
              <p className="text-sm text-gray-500">Join the WeSeedU ecosystem today.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button 
                className="bg-white hover:bg-gray-100 text-black font-semibold shadow-[0_4px_15px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] border border-gray-200 transition-all duration-300 hover:translate-y-[-2px] rounded-full py-2 px-6 hover:scale-105 w-full sm:w-auto"
                asChild
              >
                <Link href="/auth/signup">Get Started</Link>
              </Button>
              <Button 
                className="bg-black hover:bg-gray-800 text-white font-semibold shadow-[0_4px_15px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)] transition-all duration-300 hover:translate-y-[-2px] rounded-full py-2 px-6 hover:scale-105 w-full sm:w-auto"
                asChild
              >
                <Link href="/auth/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 sm:mt-8 border-t border-gray-200 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} WeSeedU. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap justify-center md:justify-start items-center gap-2 sm:gap-4">
            <select 
              className="bg-transparent border border-gray-300 rounded-md text-sm text-gray-600 py-1 px-2 w-[120px]"
              defaultValue="en"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
            <select 
              className="bg-transparent border border-gray-300 rounded-md text-sm text-gray-600 py-1 px-2 w-[120px]"
              defaultValue="usd"
            >
              <option value="usd">USD ($)</option>
              <option value="eur">EUR (€)</option>
              <option value="gbp">GBP (£)</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  )
} 