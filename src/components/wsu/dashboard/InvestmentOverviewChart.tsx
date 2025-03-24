"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data - replace this with your actual data
const monthlyData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
  { name: "Jul", value: 7000 },
]

const yearlyData = [
  { name: "2019", value: 30000 },
  { name: "2020", value: 45000 },
  { name: "2021", value: 60000 },
  { name: "2022", value: 80000 },
  { name: "2023", value: 100000 },
]

export function InvestmentOverviewChart() {
  const [timeframe, setTimeframe] = useState<"monthly" | "yearly">("monthly")
  const [chartType, setChartType] = useState<"line" | "area">("area")

  const data = timeframe === "monthly" ? monthlyData : yearlyData

  return (
    <Card className="col-span-7 md:col-span-4 bg-black border-emerald-500/20 border shadow-lg">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between px-4 pt-4 pb-2">
        <CardTitle className="text-lg font-semibold text-white">Investment Overview</CardTitle>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 sm:mt-0">
          <div className="flex space-x-1">
            <Button
              variant={timeframe === "monthly" ? "secondary" : "ghost"}
              onClick={() => setTimeframe("monthly")}
              className="text-xs h-8 px-2"
              size="sm"
            >
              Monthly
            </Button>
            <Button
              variant={timeframe === "yearly" ? "secondary" : "ghost"}
              onClick={() => setTimeframe("yearly")}
              className="text-xs h-8 px-2"
              size="sm"
            >
              Yearly
            </Button>
          </div>
          <Tabs 
            value={chartType} 
            onValueChange={(value) => setChartType(value as "line" | "area")}
            className="w-[120px]"
          >
            <TabsList className="grid w-full grid-cols-2 bg-zinc-800/50 h-8">
              <TabsTrigger value="area" className="text-xs py-1 px-2">Area</TabsTrigger>
              <TabsTrigger value="line" className="text-xs py-1 px-2">Line</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:px-4 pt-2 pb-6">
        <div className="h-[250px] w-full">
          {chartType === "area" ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
              >
                <defs>
                  <linearGradient id="investmentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6b7280" 
                  tick={{ fill: '#6b7280', fontSize: 10 }} 
                  tickLine={{ stroke: '#6b7280', strokeWidth: 0.5 }}
                  axisLine={{ stroke: '#6b7280', strokeWidth: 0.5 }}
                />
                <YAxis 
                  stroke="#6b7280"
                  tick={{ fill: '#6b7280', fontSize: 10 }}
                  tickLine={{ stroke: '#6b7280', strokeWidth: 0.5 }}
                  axisLine={{ stroke: '#6b7280', strokeWidth: 0.5 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                    borderRadius: "8px",
                    fontSize: "12px",
                    padding: "8px"
                  }}
                  labelStyle={{ color: "#fff", fontSize: "12px" }}
                  itemStyle={{ color: "#10b981", fontSize: "12px" }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Investment']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#investmentGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6b7280" 
                  tick={{ fill: '#6b7280', fontSize: 10 }}
                  tickLine={{ stroke: '#6b7280', strokeWidth: 0.5 }}
                  axisLine={{ stroke: '#6b7280', strokeWidth: 0.5 }}
                />
                <YAxis 
                  stroke="#6b7280" 
                  tick={{ fill: '#6b7280', fontSize: 10 }}
                  tickLine={{ stroke: '#6b7280', strokeWidth: 0.5 }}
                  axisLine={{ stroke: '#6b7280', strokeWidth: 0.5 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                    borderRadius: "8px",
                    fontSize: "12px",
                    padding: "8px"
                  }}
                  labelStyle={{ color: "#fff", fontSize: "12px" }}
                  itemStyle={{ color: "#10b981", fontSize: "12px" }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Investment']}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", strokeWidth: 1, r: 4 }}
                  activeDot={{ r: 6, fill: "#10b981" }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

