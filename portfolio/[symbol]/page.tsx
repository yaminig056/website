"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, TrendingUp, TrendingDown, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { portfolioData, generateCompanyChartData, getCompanyNews } from "@/lib/mock-data"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useState } from "react"

export default function CompanyPortfolio() {
  const params = useParams()
  const router = useRouter()
  const [selectedPeriod, setSelectedPeriod] = useState("1D")

  const symbol = (params.symbol as string)?.toUpperCase()
  const company = portfolioData.find((c) => c.symbol === symbol)

  if (!company) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Company Not Found</h1>
          <Button onClick={() => router.push("/")}>Back to Dashboard</Button>
        </div>
      </div>
    )
  }

  const chartData = generateCompanyChartData(symbol, selectedPeriod)
  const companyNews = getCompanyNews(symbol)
  const isPositive = company.changePercent >= 0

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-6">
          <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="ml-4 flex items-center space-x-4">
            <BarChart3 className="h-6 w-6" />
            <div>
              <h1 className="text-xl font-semibold">{company.symbol}</h1>
              <p className="text-sm text-muted-foreground">{company.name}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Company Overview */}
        <div className="grid gap-6 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Price</CardTitle>
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{company.currentPrice}</div>
              <p className={`text-xs ${isPositive ? "text-green-600" : "text-red-600"}`}>
                {isPositive ? "+" : ""}₹{company.change.toFixed(2)} ({isPositive ? "+" : ""}
                {company.changePercent.toFixed(2)}%)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{company.quantity}</div>
              <p className="text-xs text-muted-foreground">Avg Price: ₹{company.avgPrice}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{company.currentValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Investment: ₹{company.investment.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">P&L</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}>
                {isPositive ? "+" : ""}₹{company.pnl.toLocaleString()}
              </div>
              <p className={`text-xs ${isPositive ? "text-green-600" : "text-red-600"}`}>
                {isPositive ? "+" : ""}
                {company.changePercent.toFixed(2)}%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Price Chart */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{company.symbol} Price Chart</CardTitle>
                <CardDescription>Track price movements over time</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    company.sentiment === "positive"
                      ? "default"
                      : company.sentiment === "negative"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {company.sentiment}
                </Badge>
                <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <TabsList>
                    <TabsTrigger value="1D">1D</TabsTrigger>
                    <TabsTrigger value="1W">1W</TabsTrigger>
                    <TabsTrigger value="1M">1M</TabsTrigger>
                    <TabsTrigger value="1Y">1Y</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <Tooltip
                    formatter={(value: number) => [`₹${value}`, "Price"]}
                    labelFormatter={(label) => `Time: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={isPositive ? "#16a34a" : "#dc2626"}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Company News */}
        <Card>
          <CardHeader>
            <CardTitle>Related News & Analysis</CardTitle>
            <CardDescription>Latest news affecting {company.symbol}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {companyNews.map((news, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium">{news.title}</h4>
                    <Badge
                      variant={
                        news.sentiment === "positive"
                          ? "default"
                          : news.sentiment === "negative"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {news.sentiment}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{news.summary}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex gap-1">
                      {news.relatedCompanies.map((relatedCompany) => (
                        <Badge key={relatedCompany} variant="outline" className="text-xs">
                          {relatedCompany}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{news.time}</span>
                  </div>
                  {news.impact && (
                    <div className="mt-2 p-2 bg-muted/50 rounded text-sm">
                      <strong>Impact:</strong> {news.impact}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
