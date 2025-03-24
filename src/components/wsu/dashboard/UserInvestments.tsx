import React, { useEffect, useState } from 'react';
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
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_id: "",
      amount: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (!authLoading && user) {
      fetchInvestments();
      fetchCompanies();
      
      // Set a timeout to exit loading state after 5 seconds
      const timeoutId = setTimeout(() => {
        if (isLoading) {
          setIsLoading(false);
          setHasError(true);
        }
      }, 5000);
      
      return () => clearTimeout(timeoutId);
    } else if (!authLoading && !user) {
      setIsLoading(false);
      setInvestments([]);
      setTotalInvested(0);
      // Redirect to login if not authenticated
      router.push('/auth/signin');
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
      setHasError(false);
      
      const response = await fetchWithAuth('/api/protected/investments');
      
      if (response.error) {
        throw new Error(response.error.toString());
      }
      
      // Transform data for the chart - group by month
      const investmentData = response.data || [];
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
    } catch (error) {
      console.error('Error fetching investments:', error);
      setHasError(true);
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

  const navigateToInvestments = () => {
    router.push('/investments');
  };

  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 border border-zinc-700/50 backdrop-blur-sm p-2 rounded-lg shadow-xl text-white">
          <p className="text-sm font-medium">{payload[0].payload.month}</p>
          <p className="text-emerald-400 font-semibold">
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
      <Card className="bg-black/60 backdrop-blur-sm border border-zinc-800/50 shadow-lg overflow-hidden rounded-xl hover:border-zinc-700/50 transition-all duration-200">
        <CardHeader className="px-5 pt-5 pb-0">
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <LineChart className="h-5 w-5 mr-2 text-blue-400" />
            Investment Activity
          </CardTitle>
        </CardHeader>
        
        <CardContent className="px-5 py-5">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-[180px] w-full bg-zinc-900/40" />
            </div>
          ) : hasError ? (
            <motion.div 
              variants={itemVariants}
              className="flex flex-col items-center justify-center h-[180px] text-center space-y-3"
            >
              <AlertTriangle className="h-12 w-12 text-amber-500/70" />
              <p className="text-zinc-400 max-w-[250px]">
                We couldn't load your investment data. Please try again later.
              </p>
            </motion.div>
          ) : chartData.length === 0 ? (
            <motion.div 
              variants={itemVariants}
              className="flex flex-col items-center justify-center h-[180px] text-center space-y-3"
            >
              <Lightbulb className="h-12 w-12 text-amber-500/70" />
              <p className="text-zinc-400 max-w-[250px]">
                You haven't made any investments yet. Ready to start your impact journey?
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
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    content={customTooltip}
                    cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  />
                  <Bar 
                    dataKey="amount" 
                    fill="url(#colorGradient)" 
                    radius={[4, 4, 0, 0]}
                    maxBarSize={50}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#15803d" stopOpacity={0.6}/>
                    </linearGradient>
                  </defs>
                </RechartsBarChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </CardContent>
        
        <CardFooter className="px-5 py-4 border-t border-zinc-800/40 bg-black/30">
          <Button 
            variant="ghost" 
            className="ml-auto text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30"
            onClick={navigateToInvestments}
          >
            View All Investments
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default UserInvestments; 