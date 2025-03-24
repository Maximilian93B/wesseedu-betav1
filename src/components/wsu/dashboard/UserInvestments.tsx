import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PlusCircle, BadgeInfo } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { fetchWithAuth } from '@/lib/utils/fetchWithAuth';

interface Company {
  id: string;
  name: string;
}

interface Investment {
  id: string;
  amount: number;
  investment_date: string;
  notes?: string;
  companies: {
    id: string;
    name: string;
  };
}

const formSchema = z.object({
  company_id: z.string().min(1, "Company is required"),
  amount: z.string().min(1, "Amount is required"),
  notes: z.string().optional(),
});

const UserInvestments = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalInvested, setTotalInvested] = useState(0);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_id: "",
      amount: "",
      notes: "",
    },
  });

  useEffect(() => {
    // Only fetch data when authentication is confirmed
    if (!authLoading) {
      if (user) {
        fetchInvestments();
        fetchCompanies();
      } else {
        // Set not loading and empty data when no user
        setIsLoading(false);
        setInvestments([]);
        setTotalInvested(0);
        // Redirect to login if not authenticated
        router.push('/auth/signin');
      }
    }
  }, [authLoading, user, router]);

  const fetchInvestments = async () => {
    if (!user?.id) {
      setIsLoading(false);
      setInvestments([]);
      setTotalInvested(0);
      return;
    }
    
    try {
      setIsLoading(true);
      
      const response = await fetchWithAuth('/api/auth/profile');
      
      if (!response.data) {
        setInvestments([]);
        setTotalInvested(0);
        return;
      }
      
      // Extract investments from the profile response
      const investmentsData = response.data.investments || [];
      
      // Transform the data to match your interface if needed
      const formattedData = investmentsData.map((item: any) => ({
        ...item,
        companies: item.companies as { id: string; name: string }
      }));

      setInvestments(formattedData);
      
      // Calculate total invested
      const total = formattedData.reduce((sum: number, investment: any) => {
        return sum + parseFloat(investment.amount.toString());
      }, 0) || 0;
      
      setTotalInvested(total);
    } catch (error) {
      console.error('Error fetching investments:', error);
      toast({
        title: "Error",
        description: "Failed to load investments. Please try again.",
        variant: "destructive"
      });
      // Set empty data on error
      setInvestments([]);
      setTotalInvested(0);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await fetchWithAuth('/api/companies');
      
      if (response.error) {
        throw new Error(response.error.toString());
      }
      
      if (!response.data) {
        setCompanies([]);
        return;
      }
      
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
      toast({
        title: "Error",
        description: "Failed to load companies. Please try again.",
        variant: "destructive"
      });
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to add investments",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const response = await fetchWithAuth('/api/protected/investments/add', {
        method: 'POST',
        body: JSON.stringify({
          company_id: values.company_id,
          amount: parseFloat(values.amount),
          notes: values.notes || null,
        }),
      });
      
      if (response.error) {
        throw new Error(response.error.toString());
      }

      toast({
        title: "Success",
        description: "Investment added successfully",
      });

      form.reset();
      setOpen(false);
      fetchInvestments();
    } catch (error) {
      console.error('Error adding investment:', error);
      toast({
        title: "Error",
        description: "Failed to add investment. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Function to format date in a more readable format
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Card className="bg-black border-emerald-500/20 border shadow-lg overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between px-4 pt-4 pb-0">
        <CardTitle className="text-lg font-semibold text-white">Your Investments</CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="bg-emerald-500 hover:bg-emerald-400 text-white h-8 px-3"
            >
              <PlusCircle className="mr-1 h-3 w-3" />
              <span className="text-xs">Add</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 border-zinc-700 text-white">
            <DialogHeader>
              <DialogTitle>Add Investment</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Record a new investment in a sustainable company.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="company_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a company" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {companies.map(company => (
                            <SelectItem key={company.id} value={company.id}>
                              {company.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount ($)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter amount" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Optional notes" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-white">Save</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent className="px-4 py-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-pulse text-emerald-400/50">Loading investments...</div>
          </div>
        ) : investments.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="rounded-lg border border-zinc-800/50 overflow-hidden">
              <Table>
                <TableHeader className="bg-zinc-900/30">
                  <TableRow className="hover:bg-zinc-900/80 border-zinc-800/50">
                    <TableHead className="text-zinc-400 text-xs">Company</TableHead>
                    <TableHead className="text-zinc-400 text-right text-xs">Amount</TableHead>
                    <TableHead className="text-zinc-400 text-xs hidden sm:table-cell">Date</TableHead>
                    <TableHead className="text-zinc-400 text-xs hidden md:table-cell">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {investments.map(investment => (
                    <TableRow key={investment.id} className="hover:bg-zinc-900/30 border-zinc-800/50">
                      <TableCell className="font-medium text-xs sm:text-sm">{investment.companies.name}</TableCell>
                      <TableCell className="text-right text-emerald-400 font-semibold text-xs sm:text-sm">
                        ${parseFloat(investment.amount.toString()).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-zinc-400 text-xs hidden sm:table-cell">
                        {formatDate(investment.investment_date)}
                      </TableCell>
                      <TableCell className="text-zinc-400 text-xs hidden md:table-cell">{investment.notes || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-between items-center mt-3 text-xs text-zinc-500">
              <span>Total amount: <span className="text-emerald-400">${totalInvested.toLocaleString()}</span></span>
              <span>{investments.length} investment{investments.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center space-y-4 bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-6">
            <BadgeInfo className="h-8 w-8 text-zinc-500" />
            <p className="text-zinc-400 text-sm">No investments found. Start investing to track your portfolio!</p>
            <Button 
              className="bg-emerald-500 hover:bg-emerald-400 text-white text-xs"
              onClick={() => setOpen(true)}
            >
              <PlusCircle className="mr-1 h-3 w-3" />
              Add Your First Investment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserInvestments; 