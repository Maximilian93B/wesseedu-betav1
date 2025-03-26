"use client"

import { useState, useEffect } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip,
  Sector 
} from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from '@/hooks/use-auth';
import { fetchWithAuth } from '@/lib/utils/fetchWithAuth';
import { motion } from 'framer-motion';
import { PieChart as PieChartIcon, Database, Loader2 } from 'lucide-react';

interface ChartData {
  name: string;
  value: number;
  color: string;
}

const COLORS = ['#10b981', '#0ea5e9', '#8b5cf6', '#f59e0b', '#ec4899'];
const DEFAULT_DATA: ChartData[] = [
  { name: 'Renewable Energy', value: 0, color: COLORS[0] },
  { name: 'Sustainable Ag', value: 0, color: COLORS[1] },
  { name: 'Clean Water', value: 0, color: COLORS[2] },
  { name: 'Education', value: 0, color: COLORS[3] },
  { name: 'Healthcare', value: 0, color: COLORS[4] }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

const InvestmentOverviewChart = () => {
  const [data, setData] = useState<ChartData[]>(DEFAULT_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const { user, loading: authLoading } = useAuth();
  
  useEffect(() => {
    if (!authLoading && user) {
      fetchChartData();
      
      // Set a timeout to exit loading state after 5 seconds
      const timeoutId = setTimeout(() => {
        if (isLoading) {
          setIsLoading(false);
        }
      }, 5000);
      
      return () => clearTimeout(timeoutId);
    } else if (!authLoading && !user) {
      setIsLoading(false);
    }
  }, [authLoading, user]);
  
  const fetchChartData = async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      
      const response = await fetchWithAuth('/api/protected/investments/categories');
      
      if (response.error) {
        throw new Error(response.error.toString());
      }
      
      if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
        // If no data, use default with zero values but keep the categories
        setData(DEFAULT_DATA);
        return;
      }
      
      // Map the data to include colors
      const chartData = response.data.map((item, index) => ({
        name: item.category,
        value: item.amount,
        color: COLORS[index % COLORS.length]
      }));
      
      setData(chartData);
    } catch (error) {
      console.error('Error fetching investment categories:', error);
      // On error, use default with zero values
      setData(DEFAULT_DATA);
    } finally {
      setIsLoading(false);
    }
  };
  
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const onPieLeave = () => {
    setActiveIndex(undefined);
  };
  
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 4}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.8}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 5}
          outerRadius={outerRadius + 6}
          fill={fill}
        />
      </g>
    );
  };
  
  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 p-2 rounded-md shadow-sm text-slate-700">
          <p className="text-xs font-medium">{payload[0].name}</p>
          <p className="font-semibold text-xs" style={{ color: payload[0].payload.color }}>
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };
  
  const customLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-col gap-1.5 text-xs text-slate-600">
        {payload.map((entry: any, index: number) => (
          <motion.div 
            key={`item-${index}`}
            className="flex items-center"
            variants={itemVariants}
          >
            <div 
              className="w-2.5 h-2.5 rounded-sm mr-2" 
              style={{ backgroundColor: entry.color }} 
            />
            <div className="flex justify-between w-full">
              <span className="font-medium">{entry.value}</span>
              <span className="text-slate-500 ml-3">
                ${data[index]?.value.toLocaleString()}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };
  
  const sumTotal = data.reduce((acc, item) => acc + item.value, 0);
  const hasData = sumTotal > 0;
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="h-full"
    >
      <div className="h-full p-5">
        <div className="flex items-center mb-4">
          <PieChartIcon className="h-4 w-4 mr-2 text-blue-500" />
          <h3 className="text-base font-semibold text-slate-800">Investment Breakdown</h3>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-[180px]">
            <Loader2 className="h-5 w-5 text-slate-400 animate-spin" />
          </div>
        ) : !hasData ? (
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center justify-center h-[180px] text-center p-4"
          >
            <Database className="h-8 w-8 text-slate-300 mb-2" />
            <p className="text-slate-500 max-w-[250px] text-sm">
              Add investments to see your portfolio breakdown here.
            </p>
          </motion.div>
        ) : (
          <motion.div 
            variants={itemVariants}
            className="h-[180px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  innerRadius={55}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                  animationBegin={200}
                  animationDuration={800}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      stroke="rgba(255,255,255,0.8)" 
                      strokeWidth={1}
                    />
                  ))}
                </Pie>
                <Tooltip content={customTooltip} />
                <Legend
                  content={customLegend}
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{ paddingLeft: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default InvestmentOverviewChart;

