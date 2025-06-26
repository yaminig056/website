"use client"

import { useState } from "react"
import { ArrowUpIcon, ArrowDownIcon, TrendingUp, TrendingDown, DollarSign, PieChart, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PortfolioChart } from "@/components/portfolio-chart"
import { CompanyCard } from "@/components/company-card"
import { NewsSidebar } from "@/components/news-sidebar"
import { portfolioData, newsData } from "@/lib/mock-data"

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("1D")

  const totalValue = portfolioData.reduce((sum, company) => sum + company.currentValue, 0)
  const totalInvestment = portfolioData.reduce((sum, company) => sum + company.investment, 0)
  const totalGainLoss = totalValue - totalInvestment
  const totalGainLossPercent = (totalGainLoss / totalInvestment) * 100

  const topGainers = portfolioData
    .filter((company) => company.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 5)

  const topLosers = portfolioData
    .filter((company) => company.changePercent < 0)
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 5)

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center px-6">
            <div className="flex items-center space-x-4">
              <PieChart className="h-6 w-6" />
              <h1 className="text-xl font-semibold">Portfolio Tracker</h1>
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Today
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            {/* Portfolio Overview */}
            <div className="grid gap-6 md:grid-cols-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{totalValue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Investment: ₹{totalInvestment.toLocaleString()}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
                  {totalGainLoss >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${totalGainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {totalGainLoss >= 0 ? "+" : ""}₹{totalGainLoss.toLocaleString()}
                  </div>
                  <p className={`text-xs ${totalGainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {totalGainLoss >= 0 ? "+" : ""}
                    {totalGainLossPercent.toFixed(2)}%
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Gainer</CardTitle>
                  <ArrowUpIcon className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">{topGainers[0]?.symbol}</div>
                  <p className="text-xs text-green-600">+{topGainers[0]?.changePercent.toFixed(2)}%</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Loser</CardTitle>
                  <ArrowDownIcon className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">{topLosers[0]?.symbol}</div>
                  <p className="text-xs text-red-600">{topLosers[0]?.changePercent.toFixed(2)}%</p>
                </CardContent>
              </Card>
            </div>

            {/* Portfolio Chart */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Portfolio Performance</CardTitle>
                    <CardDescription>Track your portfolio value over time</CardDescription>
                  </div>
                  <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <TabsList>
                      <TabsTrigger value="1D">1D</TabsTrigger>
                      <TabsTrigger value="1W">1W</TabsTrigger>
                      <TabsTrigger value="1M">1M</TabsTrigger>
                      <TabsTrigger value="1Y">1Y</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <PortfolioChart period={selectedPeriod} />
              </CardContent>
            </Card>

            {/* Holdings Grid */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Your Holdings</h2>
                <Badge variant="secondary">{portfolioData.length} Companies</Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {portfolioData.map((company) => (
                  <CompanyCard key={company.symbol} company={company} />
                ))}
              </div>
            </div>

            {/* Market Movers */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Top Gainers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topGainers.map((company) => (
                      <div key={company.symbol} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{company.symbol}</div>
                          <div className="text-sm text-muted-foreground">₹{company.currentPrice}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-600 font-medium">+{company.changePercent.toFixed(2)}%</div>
                          <div className="text-sm text-green-600">+₹{company.change.toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Top Losers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topLosers.map((company) => (
                      <div key={company.symbol} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{company.symbol}</div>
                          <div className="text-sm text-muted-foreground">₹{company.currentPrice}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-red-600 font-medium">{company.changePercent.toFixed(2)}%</div>
                          <div className="text-sm text-red-600">₹{company.change.toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>

          {/* News Sidebar */}
          <NewsSidebar news={newsData} />
        </div>
      </div>
    </div>
  )
}
