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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/hooks/use-auth';
import { fetchWithAuth } from '@/lib/utils/fetchWithAuth';
import { motion } from 'framer-motion';
import { PieChart as PieChartIcon, Database, Loader2 } from 'lucide-react';

interface ChartData {
  name: string;
  value: number;
  color: string;
}

// Monochromatic palette of increasing darkness - updated to follow slate palette
const MONOCHROME_COLORS = [
  '#f1f5f9', // slate-100
  '#cbd5e1', // slate-300
  '#94a3b8', // slate-400
  '#64748b', // slate-500
  '#334155'  // slate-700
];

const DEFAULT_DATA: ChartData[] = [
  { name: 'Renewable Energy', value: 0, color: MONOCHROME_COLORS[0] },
  { name: 'Sustainable Ag', value: 0, color: MONOCHROME_COLORS[1] },
  { name: 'Clean Water', value: 0, color: MONOCHROME_COLORS[2] },
  { name: 'Education', value: 0, color: MONOCHROME_COLORS[3] },
  { name: 'Healthcare', value: 0, color: MONOCHROME_COLORS[4] }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1
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
        color: MONOCHROME_COLORS[index % MONOCHROME_COLORS.length]
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
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.95}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 12}
          outerRadius={outerRadius + 14}
          fill="#000000"
          opacity={0.3}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 15}
          outerRadius={outerRadius + 16}
          fill="#ffffff"
          opacity={0.3}
        />
      </g>
    );
  };
  
  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 backdrop-blur-sm p-3 rounded-lg 
          shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-slate-800">
          <p className="text-sm font-semibold tracking-tight mb-1">{payload[0].name}</p>
          <p className="font-bold text-lg" style={{ color: '#334155' }}>
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };
  
  const customLegend = ({ payload }: any) => {
    return (
      <ul className="flex flex-col gap-2 text-xs text-slate-700">
        {payload.map((entry: any, index: number) => (
          <motion.li 
            key={`item-${index}`}
            className="flex items-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05, x: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="w-3 h-3 rounded-sm mr-2 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]" 
              style={{ backgroundColor: entry.color }} />
            <span className="font-medium uppercase tracking-wide">
              {entry.value}{' '}
              <span className="ml-1 font-normal text-slate-500">
                ${data[index]?.value.toLocaleString()}
              </span>
            </span>
          </motion.li>
        ))}
      </ul>
    );
  };
  
  const sumTotal = data.reduce((acc, item) => acc + item.value, 0);
  const hasData = sumTotal > 0;
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card 
        className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]
          hover:shadow-[0_10px_30px_rgb(0,0,0,0.06)] transition-shadow duration-500"
        style={{ 
          backgroundImage: "linear-gradient(to right top, #ffffff, #f6f6ff, #eaefff, #dae8ff, #c8e2ff)" 
        }}
      >
        {/* Subtle texture pattern for depth */}
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 20px 20px, black 1px, transparent 0)`,
            backgroundSize: "40px 40px"
          }} 
        />
        
        {/* Top edge shadow line for definition */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-slate-300/30 via-slate-400/20 to-slate-300/30"></div>
        
        {/* Inner shadow effects for depth */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50/50 to-transparent"></div>
        
        <CardHeader className="relative z-10 px-6 pt-6 pb-0">
          <CardTitle className="text-lg font-medium text-slate-800 flex items-center">
            <PieChartIcon className="h-5 w-5 mr-2 text-slate-600" />
            Investment Breakdown
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10 px-6 py-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-[260px]">
              <Loader2 className="h-8 w-8 text-slate-600 animate-spin" />
            </div>
          ) : !hasData ? (
            <motion.div 
              variants={itemVariants}
              className="flex flex-col items-center justify-center h-[260px] text-center space-y-4"
            >
              <Database className="h-12 w-12 text-slate-300" />
              <div>
                <p className="text-slate-800 font-semibold mb-1">No Investment Data</p>
                <p className="text-slate-500 max-w-[250px] text-sm">
                  As you invest, your portfolio breakdown will appear here.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              variants={itemVariants}
              className="h-[260px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <filter id="dropShadow" filterUnits="userSpaceOnUse" width="200%" height="200%">
                      <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.1"/>
                    </filter>
                  </defs>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                    animationBegin={200}
                    animationDuration={1000}
                    filter="url(#dropShadow)"
                  >
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        stroke="#FFFFFF" 
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={customTooltip} />
                  <Legend
                    content={customLegend}
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ paddingLeft: '20px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InvestmentOverviewChart;

