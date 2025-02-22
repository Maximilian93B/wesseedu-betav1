'use client';

import { useState, useContext } from 'react';
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { SavedCompaniesContext } from "@/context/SavedCompaniesContext";
import { cn } from "@/lib/utils";

interface SaveCompanyButtonProps {
  companyId: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export default function SaveCompanyButton({
  companyId,
  variant = "ghost",
  size = "icon",
  className
}: SaveCompanyButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { savedCompanyIds, addSavedCompany, removeSavedCompany } = useContext(SavedCompaniesContext);
  
  const isSaved = savedCompanyIds.includes(companyId);

  const handleToggleSave = async () => {
    setIsLoading(true);
    try {
      if (isSaved) {
        const response = await fetch(`/api/companies/saveCompany?companyId=${companyId}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        
        if (data.success) {
          removeSavedCompany(companyId);
        }
      } else {
        const response = await fetch('/api/companies/saveCompany', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ companyId }),
        });
        const data = await response.json();

        if (data.success) {
          addSavedCompany(companyId);
        }
      }
    } catch (error) {
      console.error('Error toggling save:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggleSave}
      disabled={isLoading}
      className={cn(
        "hover:bg-transparent transition-colors duration-200",
        isSaved ? "text-emerald-400" : "text-gray-500 hover:text-emerald-400",
        isLoading && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <Heart 
        className={cn(
          "h-5 w-5 transition-all duration-300",
          isSaved && "fill-emerald-400 scale-110"
        )} 
      />
    </Button>
  );
} 