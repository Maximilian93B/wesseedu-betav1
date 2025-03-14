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