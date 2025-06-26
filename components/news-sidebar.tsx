"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { NewsItem } from "@/lib/mock-data"

interface NewsSidebarProps {
  news: NewsItem[]
}

export function NewsSidebar({ news }: NewsSidebarProps) {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "negative":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "neutral":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="w-80 border-l bg-muted/10">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">Market News & Analysis</h2>
        <p className="text-sm text-muted-foreground">Latest updates affecting your portfolio</p>
      </div>
      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="p-4 space-y-4">
          {news.map((item, index) => (
            <Card key={index} className="hover:shadow-sm transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-sm leading-tight">{item.title}</CardTitle>
                  <Badge variant="secondary" className={getSentimentColor(item.sentiment)}>
                    {item.sentiment}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground mb-2">{item.summary}</p>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex flex-wrap gap-1">
                    {item.relatedCompanies.map((company) => (
                      <Badge key={company} variant="outline" className="text-xs">
                        {company}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-muted-foreground">{item.time}</span>
                </div>
                {item.impact && (
                  <div className="mt-2 p-2 bg-muted/50 rounded text-xs">
                    <strong>Impact:</strong> {item.impact}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
