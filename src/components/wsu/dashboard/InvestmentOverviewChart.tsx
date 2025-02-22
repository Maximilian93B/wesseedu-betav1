"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Sample data - replace this with your actual data
const monthlyData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
  { name: "Jul", value: 7000 },
  { name: "Aug", value: 8000 },
  { name: "Sep", value: 7500 },
  { name: "Oct", value: 9000 },
  { name: "Nov", value: 10000 },
  { name: "Dec", value: 12000 },
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

  const data = timeframe === "monthly" ? monthlyData : yearlyData

  return (
    <Card className="col-span-4 bg-black border-emerald-500/20 border-2 shadow-lg hover:border-emerald-400/40 transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-white">Investment Overview</CardTitle>
        <div className="space-x-2">
          <Button
            variant={timeframe === "monthly" ? "secondary" : "outline"}
            onClick={() => setTimeframe("monthly")}
            className="text-sm"
          >
            Monthly
          </Button>
          <Button
            variant={timeframe === "yearly" ? "secondary" : "outline"}
            onClick={() => setTimeframe("yearly")}
            className="text-sm"
          >
            Yearly
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "0.375rem",
                }}
                labelStyle={{ color: "#e5e7eb" }}
                itemStyle={{ color: "#10b981" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

