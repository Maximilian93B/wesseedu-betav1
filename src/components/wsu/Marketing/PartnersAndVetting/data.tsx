import { Shield, BarChart2, FileCheck, CheckCircle } from "lucide-react"
import { Partner, VettingStep, AccountingFirm } from "./types"
import React from 'react'

export const PARTNERS: Partner[] = [
  {
    name: "United Nations",
    logo: "/images/Flag_of_the_United_Nations.svg",
    description: "Working together for global sustainability goals",
    link: "/partners/united-nations"
  },
  {
    name: "Global Sustainability Fund",
    logo: "/images/logo-gsf.svg",
    description: "Pioneering sustainable investment strategies",
    link: "/partners/gsf"
  },
  {
    name: "World Bank",
    logo: "/images/logo-world-bank.svg",
    description: "Supporting economic development worldwide",
    link: "/partners/world-bank"
  }
];

export const ACCOUNTING_FIRMS: AccountingFirm[] = [
  {
    name: "Deloitte",
    logo: "/images/firms/deloitte-logo.svg",
    description: "Global leader in audit, consulting, and financial advisory services",
    iconType: "audit",
    specialties: ["Risk Assessment", "ESG Reporting", "Financial Verification"],
    stats: { companiesVetted: 320, approvalRate: "14%", avgTimeframe: "3 weeks" }
  },
  {
    name: "PwC",
    logo: "/images/firms/pwc-logo.svg",
    description: "Trusted worldwide for assurance, advisory and tax services",
    iconType: "finance",
    specialties: ["Sustainability Metrics", "Financial Due Diligence", "Market Analysis"],
    stats: { companiesVetted: 285, approvalRate: "12%", avgTimeframe: "4 weeks" }
  },
  {
    name: "EY",
    logo: "/images/firms/ey-logo.svg",
    description: "Building a better working world through sustainable business practices",
    iconType: "compliance",
    specialties: ["Regulatory Compliance", "Impact Assessment", "Corporate Governance"],
    stats: { companiesVetted: 260, approvalRate: "15%", avgTimeframe: "3.5 weeks" }
  },
  {
    name: "KPMG",
    logo: "/images/firms/kpmg-logo.svg",
    description: "Turning knowledge into value for sustainable business growth",
    iconType: "growth",
    specialties: ["Growth Potential", "Operational Excellence", "Investment Readiness"],
    stats: { companiesVetted: 295, approvalRate: "13%", avgTimeframe: "3 weeks" }
  }
];

export const VETTING_STEPS: VettingStep[] = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Initial Screening",
    description: "Companies are evaluated against our sustainability criteria and UN SDGs alignment."
  },
  {
    icon: <BarChart2 className="h-6 w-6" />,
    title: "Financial Analysis",
    description: "Our team conducts thorough financial assessment and growth potential evaluation."
  },
  {
    icon: <FileCheck className="h-6 w-6" />,
    title: "Due Diligence",
    description: "Comprehensive verification of business model, team, and sustainability claims."
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Final Approval",
    description: "Selected companies are approved by our investment committee for platform listing."
  }
]; 