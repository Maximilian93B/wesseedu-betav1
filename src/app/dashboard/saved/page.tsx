'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, ExternalLink } from "lucide-react";

export const dynamic = 'force-dynamic'

interface SavedCompany {
  id: string;
  companies: {
    id: string;
    name: string;
    description: string;
    mission_statement: string;
    score: number;
    pitch_deck_url: string;
    sustainability_data: any;
  };
}

export default function SavedCompaniesPage() {
  const [savedCompanies, setSavedCompanies] = useState<SavedCompany[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedCompanies();
  }, []);

  const fetchSavedCompanies = async () => {
    try {
      const response = await fetch('/api/companies/savedCompanies');
      const data = await response.json();
      if (data.success) {
        setSavedCompanies(data.savedCompanies);
      }
    } catch (error) {
      console.error('Error fetching saved companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsave = async (companyId: string) => {
    try {
      const response = await fetch(`/api/companies/saveCompany?companyId=${companyId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        // Refresh the saved companies list
        fetchSavedCompanies();
      }
    } catch (error) {
      console.error('Error unsaving company:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Saved Companies</h2>
        <p className="text-muted-foreground">
          View and manage your saved companies.
        </p>
      </div>

      {savedCompanies.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-48">
            <Building2 className="h-8 w-8 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              You haven't saved any companies yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {savedCompanies.map((saved) => (
            <Card key={saved.id}>
              <CardHeader>
                <CardTitle>{saved.companies.name}</CardTitle>
                <CardDescription>
                  Score: {saved.companies.score}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {saved.companies.description?.substring(0, 150)}...
                </p>
                <div className="flex justify-between items-center">
                  <Button
                    variant="destructive"
                    onClick={() => handleUnsave(saved.companies.id)}
                  >
                    Unsave
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open(`/companies/${saved.companies.id}`, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 