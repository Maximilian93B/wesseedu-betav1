import { Shield, BarChart2, FileCheck, CheckCircle } from "lucide-react"
import React, { ReactNode } from 'react'

export interface VettingStep {
  icon: ReactNode;
  title: string;
  description: string;
}

export const iconMap = {
  audit: <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />,
  finance: <BarChart2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />,
  compliance: <FileCheck className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />,
  growth: <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
};

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