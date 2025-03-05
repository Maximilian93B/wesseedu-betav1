'use client';

import { useState, useContext, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { SavedCompaniesContext } from "@/context/SavedCompaniesContext";
import { cn } from "@/lib/utils";
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

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
  const [isSaved, setIsSaved] = useState(false);
  const { savedCompanyIds, addSavedCompany, removeSavedCompany } = useContext(SavedCompaniesContext);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Check if the company is saved on component mount and when savedCompanyIds changes
  useEffect(() => {
    // This effect should only run when the component mounts or when savedCompanyIds changes
    const saved = savedCompanyIds.includes(companyId);
    setIsSaved(saved);
    console.log(`SaveCompanyButton: Company ${companyId} is ${saved ? 'saved' : 'not saved'}`);
  }, [savedCompanyIds, companyId]);

  const handleToggleSave = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save companies",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    try {
      if (isSaved) {
        console.log(`SaveCompanyButton: Removing company ${companyId} from watchlist`);
        const response = await fetchWithAuth('/api/protected/watchlist/remove', {
          method: 'POST',
          body: JSON.stringify({ companyId }),
        });
        
        if (response.error) {
          throw new Error(response.error.toString());
        }
        
        removeSavedCompany(companyId);
        setIsSaved(false);
        toast({
          title: "Success",
          description: "Company removed from watchlist",
        });
      } else {
        console.log(`SaveCompanyButton: Adding company ${companyId} to watchlist`);
        const response = await fetchWithAuth('/api/protected/watchlist/add', {
          method: 'POST',
          body: JSON.stringify({ companyId }),
        });
        
        if (response.error) {
          throw new Error(response.error.toString());
        }
        
        addSavedCompany(companyId);
        setIsSaved(true);
        toast({
          title: "Success",
          description: "Company added to watchlist",
        });
      }
    } catch (error) {
      console.error('Error toggling save:', error);
      toast({
        title: "Error",
        description: "Failed to update watchlist. Please try again.",
        variant: "destructive"
      });
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