import { ReactNode } from "react"

export interface Partner {
  name: string;
  logo: string;
  description: string;
  link?: string;
}

export interface VettingStep {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface AccountingFirm {
  name: string;
  logo: string;
  description: string;
  iconType: "audit" | "finance" | "compliance" | "growth";
  specialties: string[];
  stats: {
    companiesVetted: number;
    approvalRate: string;
    avgTimeframe: string;
  };
} 