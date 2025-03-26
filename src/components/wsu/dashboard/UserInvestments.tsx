import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LineChart, ArrowRight, AlertTriangle, Lightbulb } from "lucide-react";
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

  const navigateToInvestments = () => {
    router.push('/investments');
  };

  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 p-2 rounded-md shadow-sm text-slate-700">
          <p className="text-xs font-medium">{payload[0].payload.month}</p>
          <p className="text-emerald-600 font-medium text-xs">
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
      className="h-full flex flex-col"
    >
      <CardHeader className="px-4 pt-4 pb-2">
        <CardTitle className="text-base font-semibold text-slate-800 flex items-center">
          <LineChart className="h-4 w-4 mr-2 text-blue-500" />
          Investment Activity
        </CardTitle>
      </CardHeader>
      
      <CardContent className="px-4 py-2 flex-grow">
        {isLoading ? (
          <div className="space-y-4 h-full flex items-center justify-center">
            <Skeleton className="h-[160px] w-full bg-slate-100" />
          </div>
        ) : hasError ? (
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center justify-center h-full text-center space-y-3"
          >
            <AlertTriangle className="h-8 w-8 text-amber-400" />
            <p className="text-slate-500 max-w-[250px] text-sm">
              We couldn't load your investment data. Please try again later.
            </p>
          </motion.div>
        ) : chartData.length === 0 ? (
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center justify-center h-full text-center space-y-3"
          >
            <Lightbulb className="h-8 w-8 text-amber-400" />
            <p className="text-slate-500 max-w-[250px] text-sm">
              You haven't made any investments yet. Ready to start your impact journey?
            </p>
          </motion.div>
        ) : (
          <motion.div 
            variants={itemVariants}
            className="h-[160px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={chartData} margin={{ top: 5, right: 5, bottom: 20, left: 0 }}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 11 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  content={customTooltip}
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                />
                <Bar 
                  dataKey="amount" 
                  fill="url(#colorGradient)" 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={36}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.5}/>
                  </linearGradient>
                </defs>
              </RechartsBarChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </CardContent>
      
      <CardFooter className="px-4 py-2 border-t border-slate-100 mt-auto">
        <Button 
          variant="ghost" 
          className="ml-auto text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs px-2 py-1"
          onClick={navigateToInvestments}
        >
          View All
          <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </motion.div>
  );
};

export default UserInvestments; 