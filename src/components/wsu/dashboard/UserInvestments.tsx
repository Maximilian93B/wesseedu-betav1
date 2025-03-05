import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
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
import { PlusCircle } from "lucide-react";
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
      } else if (!user) {
        // Redirect to login if not authenticated
        router.push('/auth/signin');
      }
    }
  }, [authLoading, user, router]);

  const fetchInvestments = async () => {
    if (!user?.id) return;
    
    try {
      setIsLoading(true);
      console.log("UserInvestments: Fetching investment data from API");
      
      const response = await fetchWithAuth('/api/auth/profile');
      
      if (!response.data) {
        throw new Error("Failed to fetch profile data");
      }
      
      console.log("UserInvestments: Profile data fetched successfully", response.data);
      
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
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCompanies = async () => {
    try {
      console.log("UserInvestments: Fetching companies data");
      const response = await fetchWithAuth('/api/companies');
      
      if (response.error) {
        console.error("Error in companies response:", response.error);
        throw new Error(response.error.toString());
      }
      
      if (!response.data) {
        console.warn("No companies data returned from API");
        setCompanies([]);
        return;
      }
      
      console.log(`UserInvestments: Successfully fetched ${response.data.length} companies`);
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

  return (
    <Card className="bg-[#0A0A0A] border-2 border-white/5 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-1 bg-gradient-to-b from-emerald-400 to-teal-600 rounded-full"></div>
            <h3 className="text-xl font-semibold">Your Investments</h3>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Investment
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
                    <Button type="submit">Save</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-pulse text-zinc-500">Loading investments...</div>
          </div>
        ) : investments.length > 0 ? (
          <div className="rounded-lg border border-zinc-800 overflow-hidden">
            <Table>
              <TableHeader className="bg-zinc-900">
                <TableRow className="hover:bg-zinc-900/80 border-zinc-800">
                  <TableHead className="text-zinc-400">Company</TableHead>
                  <TableHead className="text-zinc-400 text-right">Amount</TableHead>
                  <TableHead className="text-zinc-400">Date</TableHead>
                  <TableHead className="text-zinc-400">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investments.map(investment => (
                  <TableRow key={investment.id} className="hover:bg-zinc-900/50 border-zinc-800">
                    <TableCell className="font-medium">{investment.companies.name}</TableCell>
                    <TableCell className="text-right text-emerald-400 font-semibold">
                      ${parseFloat(investment.amount.toString()).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-zinc-400">
                      {new Date(investment.investment_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-zinc-400">{investment.notes || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center space-y-4 bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
            <p className="text-zinc-400">No investments found. Start investing to track your portfolio!</p>
            <Button 
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
              onClick={() => setOpen(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Your First Investment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserInvestments; 