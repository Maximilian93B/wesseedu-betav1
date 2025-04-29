'use client';

import { useState, useContext, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { SavedCompaniesContext } from "@/context/SavedCompaniesContext";
import { cn } from "@/lib/utils";
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useWatchlist } from "@/components/wsu/dashboard/WatchlistView";
import { useRouter } from "next/navigation";
import { invalidateProfileCache } from "@/lib/utils/cacheUtils";

// Define the cache key to match the one in DashboardView
const PROFILE_CACHE_KEY = 'dashboard_profile_data';

interface SaveCompanyButtonProps {
  companyId: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  onSaveChange?: (isSaved: boolean) => void;
}

export default function SaveCompanyButton({
  companyId,
  variant = "ghost",
  size = "icon",
  className,
  onSaveChange
}: SaveCompanyButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { savedCompanyIds, addSavedCompany, removeSavedCompany, refreshSavedCompanies } = useContext(SavedCompaniesContext);
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  // Create a new instance of useWatchlist to ensure we have access to the methods
  const { fetchWatchlistCompanies } = useWatchlist();
  
  // Check if the company is saved on component mount and when savedCompanyIds changes
  useEffect(() => {
    // This effect should only run when the component mounts or when savedCompanyIds changes
    const saved = savedCompanyIds.includes(companyId);
    setIsSaved(saved);
    console.log(`SaveCompanyButton: Company ${companyId} is ${saved ? 'saved' : 'not saved'} (savedCompanyIds: ${JSON.stringify(savedCompanyIds)})`);
  }, [savedCompanyIds, companyId]);

  // Function to invalidate the profile cache
  const invalidateProfileCache = () => {
    console.log("SaveCompanyButton: Invalidating profile cache");
    localStorage.removeItem(PROFILE_CACHE_KEY);
  };

  const handleToggleSave = async () => {
    // Don't allow saving if auth is still loading
    if (authLoading) {
      console.log("SaveCompanyButton: Auth is still loading, please wait");
      toast({
        title: "Please wait",
        description: "Authentication is still in progress",
        variant: "default"
      });
      return;
    }
    
    if (!user) {
      console.log("SaveCompanyButton: No user, redirecting to sign in");
      toast({
        title: "Authentication required",
        description: "Please sign in to save companies",
        variant: "destructive"
      });
      router.push("/auth/signin");
      return;
    }
    
    console.log(`SaveCompanyButton: Starting toggle save for company ${companyId}, current state: ${isSaved ? 'saved' : 'not saved'}`);
    setIsLoading(true);
    
    try {
      // Invalidate the profile cache before making any changes
      invalidateProfileCache();
      
      // Use the unified API with action parameter
      const action = isSaved ? 'remove' : 'add';
      console.log(`SaveCompanyButton: ${action === 'remove' ? 'Removing' : 'Adding'} company ${companyId} ${action === 'remove' ? 'from' : 'to'} watchlist`);
      
      const response = await fetchWithAuth('/api/watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify({ 
          company_id: companyId,
          action
        }),
      });
      
      console.log(`SaveCompanyButton: ${action} response:`, response);
      
      if (response.error) {
        throw new Error(response.error.toString());
      }
      
      if (action === 'remove') {
        removeSavedCompany(companyId);
        setIsSaved(false);
        
        // Notify parent component if callback provided
        if (onSaveChange) {
          onSaveChange(false);
        }
        
        toast({
          title: "Success",
          description: "Company removed from watchlist",
        });
      } else {
        console.log(`SaveCompanyButton: Successfully added company ${companyId} to watchlist`);
        addSavedCompany(companyId);
        setIsSaved(true);
        
        // Notify parent component if callback provided
        if (onSaveChange) {
          onSaveChange(true);
        }
        
        toast({
          title: "Success",
          description: "Company added to watchlist",
        });
      }
      
      // Always refresh both data sources after a successful operation
      console.log("SaveCompanyButton: Refreshing watchlist data");
      
      // Add a small delay to ensure the database has time to update
      setTimeout(async () => {
        try {
          console.log("SaveCompanyButton: Starting data refresh after delay");
          
          // First refresh the context data
          await refreshSavedCompanies();
          console.log("SaveCompanyButton: Context data refreshed");
          
          // Then refresh the watchlist data
          await fetchWatchlistCompanies();
          console.log("SaveCompanyButton: Watchlist data refreshed");
          
          // Force a refresh of the current page to ensure all components update
          router.refresh();
          console.log("SaveCompanyButton: Page refreshed");
          
          console.log("SaveCompanyButton: All data refreshed successfully");
        } catch (refreshError) {
          console.error("Error refreshing watchlist data:", refreshError);
        }
      }, 1000); // Increased delay to 1 second
      
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
      disabled={isLoading || authLoading}
      className={cn(
        "hover:bg-transparent transition-colors duration-300 font-helvetica",
        isSaved 
          ? "text-white hover:text-white/90" 
          : "text-white/80 hover:text-white",
        (isLoading || authLoading) && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <Heart 
        className={cn(
          "h-5 w-5 transition-all duration-300",
          isSaved && "fill-white scale-110"
        )} 
      />
    </Button>
  );
} 