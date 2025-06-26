"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { generateChartData } from "@/lib/mock-data"

interface PortfolioChartProps {
  period: string
}

export function PortfolioChart({ period }: PortfolioChartProps) {
  const data = generateChartData(period)

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `₹${value.toLocaleString()}`}
          />
          <Tooltip
            formatter={(value: number) => [`₹${value.toLocaleString()}`, "Portfolio Value"]}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
