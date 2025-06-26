"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"
import type { Company } from "@/lib/mock-data"

interface CompanyCardProps {
  company: Company
}

export function CompanyCard({ company }: CompanyCardProps) {
  const router = useRouter()
  const isPositive = company.changePercent >= 0

  const handleClick = () => {
    router.push(`/portfolio/${company.symbol.toLowerCase()}`)
  }

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleClick}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{company.symbol}</CardTitle>
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-green-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600" />
          )}
        </div>
        <p className="text-sm text-muted-foreground">{company.name}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Current Price</span>
            <span className="font-medium">₹{company.currentPrice}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Quantity</span>
            <span className="font-medium">{company.quantity}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Current Value</span>
            <span className="font-medium">₹{company.currentValue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">P&L</span>
            <div className="text-right">
              <div className={`font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
                {isPositive ? "+" : ""}₹{company.pnl.toLocaleString()}
              </div>
              <div className={`text-xs ${isPositive ? "text-green-600" : "text-red-600"}`}>
                {isPositive ? "+" : ""}
                {company.changePercent.toFixed(2)}%
              </div>
            </div>
          </div>
          <div className="pt-2">
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
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
