'use client';

import { useState, useContext } from 'react';
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { SavedCompaniesContext } from "@/context/SavedCompaniesContext";

interface SaveCompanyButtonProps {
  companyId: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export default function SaveCompanyButton({
  companyId,
  variant = "outline",
  size = "default"
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
      className="gap-2"
    >
      {isSaved ? (
        <>
          <Heart className="h-4 w-4 fill-current" />
          {size !== "icon" && "Saved"}
        </>
      ) : (
        <>
          <Heart className="h-4 w-4" />
          {size !== "icon" && "Save"}
        </>
      )}
    </Button>
  );
} 