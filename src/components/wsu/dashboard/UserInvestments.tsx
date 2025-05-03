import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { PlusCircle, BadgeInfo, LineChart, ArrowRight, AlertTriangle, Lightbulb } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { fetchWithAuth } from '@/lib/utils/fetchWithAuth';
import { motion } from 'framer-motion';
import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

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

interface ChartData {
  month: string;
  amount: number;
}

const formSchema = z.object({
  company_id: z.string().min(1, "Company is required"),
  amount: z.string().min(1, "Amount is required"),
  notes: z.string().optional(),
});

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

const UserInvestments = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalInvested, setTotalInvested] = useState(0);
  const [open, setOpen] = useState(false);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [hasError, setHasError] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const fetchInProgress = useRef(false);
  const effectRan = useRef(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_id: "",
      amount: "",
      notes: "",
    },
  });

  const fetchInvestments = useCallback(async () => {
    // Prevent concurrent fetch operations
    if (fetchInProgress.current) {
      console.log("Fetch already in progress, skipping duplicate call");
      return;
    }

    if (!user?.id) {
      setIsLoading(false);
      setInvestments([]);
      setTotalInvested(0);
      return;
    }
    
    try {
      console.log("UserInvestments: Starting fetchInvestments call");
      fetchInProgress.current = true;
      setIsLoading(true);
      setHasError(false);
      
      const response = await fetchWithAuth('/api/protected/investments');
      
      if (response.error) {
        throw new Error(response.error.toString());
      }
      
      // Handle both response formats for backward compatibility
      const investmentData = (response.data && Array.isArray(response.data)) ? response.data : [];
      console.log(`UserInvestments: Got ${investmentData.length} investments`);
      setInvestments(investmentData);
      
      // Process data for chart
      const groupedByMonth: Record<string, number> = {};
      
      investmentData.forEach((inv: Investment) => {
        const date = new Date(inv.investment_date);
        const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        
        if (!groupedByMonth[monthYear]) {
          groupedByMonth[monthYear] = 0;
        }
        
        groupedByMonth[monthYear] += inv.amount;
      });
      
      // Convert to array format for recharts
      const chartDataArray = Object.entries(groupedByMonth).map(([month, amount]) => ({
        month,
        amount
      }));
      
      // Sort by date
      chartDataArray.sort((a, b) => {
        const dateA = new Date(a.month);
        const dateB = new Date(b.month);
        return dateA.getTime() - dateB.getTime();
      });
      
      setChartData(chartDataArray);
      
      // Calculate total invested
      const total = chartDataArray.reduce((sum: number, investment: any) => {
        return sum + investment.amount;
      }, 0) || 0;
      
      setTotalInvested(total);
      console.log("UserInvestments: Finished fetchInvestments call");
    } catch (error) {
      console.error('Error fetching investments:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
      fetchInProgress.current = false;
    }
  }, [user?.id]);

  const fetchCompanies = useCallback(async () => {
    try {
      console.log("UserInvestments: Starting fetchCompanies call");
      const response = await fetchWithAuth('/api/companies');
      
      if (response.error) {
        throw new Error(response.error.toString());
      }
      
      // Handle both response formats for backward compatibility
      const companiesData = response.data?.data || response.data || [];
      
      if (!companiesData || companiesData.length === 0) {
        setCompanies([]);
        return;
      }
      
      console.log(`UserInvestments: Got ${companiesData.length} companies`);
      setCompanies(companiesData);
    } catch (error) {
      console.error('Error fetching companies:', error);
      toast({
        title: "Error",
        description: "Failed to load companies. Please try again.",
        variant: "destructive"
      });
    }
  }, [toast]);

  useEffect(() => {
    // Add a guard to prevent useEffect from running more than once
    if (effectRan.current) {
      return; // Only run once
    }
    
    if (!authLoading && user) {
      console.log("UserInvestments: Auth loaded and user found, fetching data");
      effectRan.current = true;
      fetchInvestments();
      fetchCompanies();
      
      // Set a timeout to exit loading state after 5 seconds
      const timeoutId = setTimeout(() => {
        setIsLoading(currentIsLoading => {
          if (currentIsLoading) {
            console.log("UserInvestments: Loading timeout reached");
            setHasError(true);
            return false;
          }
          return currentIsLoading;
        });
      }, 5000);
      
      return () => clearTimeout(timeoutId);
    } else if (!authLoading && !user) {
      effectRan.current = true;
      setIsLoading(false);
      setInvestments([]);
      setTotalInvested(0);
      // Don't redirect - this causes auth token loss
      console.log("UserInvestments: No authenticated user found");
      setHasError(true);
    }
    
    return () => {
      // No need to set effectRan.current = true here as it's already set above
    };
  }, [authLoading, user, router, fetchInvestments, fetchCompanies]);

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
      
      // Emit investment_made event to trigger goal updates
      // This custom event will be caught by GoalTracker component
      const event = new CustomEvent('investment_made', {
        detail: {
          amount: parseFloat(values.amount),
          company_id: values.company_id
        }
      });
      window.dispatchEvent(event);
      
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

  const navigateToInvestments = () => {
    router.push('/investments');
  };

  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-green-100 p-2 rounded-lg 
          shadow-[0_8px_30px_rgba(0,0,0,0.08)] text-black">
          <p className="text-sm font-medium font-display">{payload[0].payload.month}</p>
          <p className="text-green-700 font-semibold font-helvetica">
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        {/* Simple white background */}
        <div className="absolute inset-0 bg-white"></div>
        
        {/* Card content */}
        <div className="relative z-5 h-full">
          <div className="p-6 pb-4 border-b border-slate-100">
            <h3 className="text-xl font-extrabold text-black leading-tight tracking-tight font-display flex items-center">
              <LineChart className="h-5 w-5 mr-2.5 text-green-600" />
              Investment Activity
            </h3>
          </div>
          
          <div className="p-6">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-[180px] w-full bg-green-50" />
              </div>
            ) : hasError ? (
              <motion.div 
                variants={itemVariants}
                className="flex flex-col items-center justify-center h-[180px] text-center space-y-3"
              >
                <AlertTriangle className="h-12 w-12 text-green-200" />
                <p className="text-black/70 max-w-[250px] font-body">
                  We couldn&apos;t load your investment data. Please try again later.
                </p>
              </motion.div>
            ) : chartData.length === 0 ? (
              <motion.div 
                variants={itemVariants}
                className="flex flex-col items-center justify-center h-[180px] text-center space-y-3"
              >
                <Lightbulb className="h-12 w-12 text-green-200" />
                <p className="text-black/70 max-w-[250px] font-body">
                  You haven&apos;t made any investments yet. Ready to start your impact journey?
                </p>
              </motion.div>
            ) : (
              <motion.div 
                variants={itemVariants}
                className="h-[180px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={chartData} margin={{ top: 5, right: 5, bottom: 20, left: 0 }}>
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#3a6d2e', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#3a6d2e', fontSize: 12 }}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      content={customTooltip}
                      cursor={{ fill: 'rgba(112, 245, 112, 0.05)' }}
                    />
                    <Bar 
                      dataKey="amount" 
                      fill="url(#colorGradient)" 
                      radius={[4, 4, 0, 0]}
                      maxBarSize={50}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#70f570" stopOpacity={0.9}/>
                        <stop offset="100%" stopColor="#49c628" stopOpacity={0.7}/>
                      </linearGradient>
                    </defs>
                  </RechartsBarChart>
                </ResponsiveContainer>
              </motion.div>
            )}
          </div>
          
          <div className="px-6 py-5 border-t border-slate-100 flex justify-end">
            <Button 
              className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white font-semibold
                        shadow-sm hover:shadow transition-all duration-300 
                        rounded-lg py-2 px-4 text-sm font-helvetica"
              onClick={navigateToInvestments}
            >
              <span className="flex items-center justify-center">
                View All Investments
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserInvestments; 