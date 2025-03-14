import { Shield, BarChart2, FileCheck, CheckCircle } from "lucide-react"
import { Partner, VettingStep } from "./types"

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