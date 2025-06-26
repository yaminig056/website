export interface Company {
    symbol: string
    name: string
    currentPrice: number
    avgPrice: number
    quantity: number
    investment: number
    currentValue: number
    pnl: number
    change: number
    changePercent: number
    sentiment: "positive" | "negative" | "neutral"
  }
  
  export interface NewsItem {
    title: string
    summary: string
    sentiment: "positive" | "negative" | "neutral"
    relatedCompanies: string[]
    time: string
    impact?: string
  }
  
  export const portfolioData: Company[] = [
    {
      symbol: "RELIANCE",
      name: "Reliance Industries Ltd",
      currentPrice: 2456.75,
      avgPrice: 2200.0,
      quantity: 50,
      investment: 110000,
      currentValue: 122837.5,
      pnl: 12837.5,
      change: 45.25,
      changePercent: 1.88,
      sentiment: "positive",
    },
    {
      symbol: "TCS",
      name: "Tata Consultancy Services",
      currentPrice: 3542.3,
      avgPrice: 3400.0,
      quantity: 30,
      investment: 102000,
      currentValue: 106269,
      pnl: 4269,
      change: 28.5,
      changePercent: 0.81,
      sentiment: "positive",
    },
    {
      symbol: "INFY",
      name: "Infosys Limited",
      currentPrice: 1456.8,
      avgPrice: 1520.0,
      quantity: 40,
      investment: 60800,
      currentValue: 58272,
      pnl: -2528,
      change: -18.2,
      changePercent: -1.23,
      sentiment: "negative",
    },
    {
      symbol: "HDFCBANK",
      name: "HDFC Bank Limited",
      currentPrice: 1678.45,
      avgPrice: 1600.0,
      quantity: 60,
      investment: 96000,
      currentValue: 100707,
      pnl: 4707,
      change: 12.35,
      changePercent: 0.74,
      sentiment: "positive",
    },
    {
      symbol: "ICICIBANK",
      name: "ICICI Bank Limited",
      currentPrice: 945.6,
      avgPrice: 980.0,
      quantity: 80,
      investment: 78400,
      currentValue: 75648,
      pnl: -2752,
      change: -8.4,
      changePercent: -0.88,
      sentiment: "negative",
    },
    {
      symbol: "HINDUNILVR",
      name: "Hindustan Unilever Ltd",
      currentPrice: 2234.75,
      avgPrice: 2100.0,
      quantity: 25,
      investment: 52500,
      currentValue: 55868.75,
      pnl: 3368.75,
      change: 34.5,
      changePercent: 1.57,
      sentiment: "positive",
    },
    {
      symbol: "ITC",
      name: "ITC Limited",
      currentPrice: 456.3,
      avgPrice: 420.0,
      quantity: 100,
      investment: 42000,
      currentValue: 45630,
      pnl: 3630,
      change: 6.8,
      changePercent: 1.51,
      sentiment: "positive",
    },
    {
      symbol: "SBIN",
      name: "State Bank of India",
      currentPrice: 567.85,
      avgPrice: 590.0,
      quantity: 70,
      investment: 41300,
      currentValue: 39749.5,
      pnl: -1550.5,
      change: -4.25,
      changePercent: -0.74,
      sentiment: "negative",
    },
    {
      symbol: "BHARTIARTL",
      name: "Bharti Airtel Limited",
      currentPrice: 1234.6,
      avgPrice: 1180.0,
      quantity: 45,
      investment: 53100,
      currentValue: 55557,
      pnl: 2457,
      change: 18.9,
      changePercent: 1.55,
      sentiment: "positive",
    },
    {
      symbol: "ASIANPAINT",
      name: "Asian Paints Limited",
      currentPrice: 2987.4,
      avgPrice: 3100.0,
      quantity: 20,
      investment: 62000,
      currentValue: 59748,
      pnl: -2252,
      change: -32.6,
      changePercent: -1.08,
      sentiment: "negative",
    },
    {
      symbol: "MARUTI",
      name: "Maruti Suzuki India Ltd",
      currentPrice: 9876.5,
      avgPrice: 9500.0,
      quantity: 10,
      investment: 95000,
      currentValue: 98765,
      pnl: 3765,
      change: 125.3,
      changePercent: 1.29,
      sentiment: "positive",
    },
    {
      symbol: "KOTAKBANK",
      name: "Kotak Mahindra Bank Ltd",
      currentPrice: 1789.25,
      avgPrice: 1850.0,
      quantity: 35,
      investment: 64750,
      currentValue: 62623.75,
      pnl: -2126.25,
      change: -15.75,
      changePercent: -0.87,
      sentiment: "negative",
    },
    {
      symbol: "LT",
      name: "Larsen & Toubro Limited",
      currentPrice: 2456.8,
      avgPrice: 2300.0,
      quantity: 25,
      investment: 57500,
      currentValue: 61420,
      pnl: 3920,
      change: 42.3,
      changePercent: 1.75,
      sentiment: "positive",
    },
    {
      symbol: "HCLTECH",
      name: "HCL Technologies Limited",
      currentPrice: 1234.9,
      avgPrice: 1280.0,
      quantity: 40,
      investment: 51200,
      currentValue: 49396,
      pnl: -1804,
      change: -12.1,
      changePercent: -0.97,
      sentiment: "negative",
    },
    {
      symbol: "WIPRO",
      name: "Wipro Limited",
      currentPrice: 456.75,
      avgPrice: 480.0,
      quantity: 80,
      investment: 38400,
      currentValue: 36540,
      pnl: -1860,
      change: -5.25,
      changePercent: -1.14,
      sentiment: "negative",
    },
    {
      symbol: "AXISBANK",
      name: "Axis Bank Limited",
      currentPrice: 1098.6,
      avgPrice: 1050.0,
      quantity: 50,
      investment: 52500,
      currentValue: 54930,
      pnl: 2430,
      change: 15.4,
      changePercent: 1.42,
      sentiment: "positive",
    },
    {
      symbol: "ULTRACEMCO",
      name: "UltraTech Cement Limited",
      currentPrice: 7654.3,
      avgPrice: 7800.0,
      quantity: 8,
      investment: 62400,
      currentValue: 61234.4,
      pnl: -1165.6,
      change: -89.7,
      changePercent: -1.16,
      sentiment: "negative",
    },
    {
      symbol: "NESTLEIND",
      name: "Nestle India Limited",
      currentPrice: 18765.4,
      avgPrice: 18000.0,
      quantity: 5,
      investment: 90000,
      currentValue: 93827,
      pnl: 3827,
      change: 234.6,
      changePercent: 1.27,
      sentiment: "positive",
    },
    {
      symbol: "POWERGRID",
      name: "Power Grid Corporation",
      currentPrice: 234.75,
      avgPrice: 240.0,
      quantity: 200,
      investment: 48000,
      currentValue: 46950,
      pnl: -1050,
      change: -2.25,
      changePercent: -0.95,
      sentiment: "negative",
    },
    {
      symbol: "NTPC",
      name: "NTPC Limited",
      currentPrice: 345.6,
      avgPrice: 330.0,
      quantity: 150,
      investment: 49500,
      currentValue: 51840,
      pnl: 2340,
      change: 8.4,
      changePercent: 2.49,
      sentiment: "positive",
    },
    {
      symbol: "ONGC",
      name: "Oil & Natural Gas Corp",
      currentPrice: 189.45,
      avgPrice: 195.0,
      quantity: 250,
      investment: 48750,
      currentValue: 47362.5,
      pnl: -1387.5,
      change: -1.85,
      changePercent: -0.97,
      sentiment: "negative",
    },
    {
      symbol: "COALINDIA",
      name: "Coal India Limited",
      currentPrice: 456.8,
      avgPrice: 440.0,
      quantity: 100,
      investment: 44000,
      currentValue: 45680,
      pnl: 1680,
      change: 7.2,
      changePercent: 1.6,
      sentiment: "positive",
    },
    {
      symbol: "BAJFINANCE",
      name: "Bajaj Finance Limited",
      currentPrice: 6789.3,
      avgPrice: 7000.0,
      quantity: 12,
      investment: 84000,
      currentValue: 81471.6,
      pnl: -2528.4,
      change: -98.7,
      changePercent: -1.43,
      sentiment: "negative",
    },
    {
      symbol: "SUNPHARMA",
      name: "Sun Pharmaceutical Ind",
      currentPrice: 1123.45,
      avgPrice: 1080.0,
      quantity: 60,
      investment: 64800,
      currentValue: 67407,
      pnl: 2607,
      change: 18.25,
      changePercent: 1.65,
      sentiment: "positive",
    },
    {
      symbol: "DRREDDY",
      name: "Dr Reddy's Laboratories",
      currentPrice: 4567.8,
      avgPrice: 4700.0,
      quantity: 15,
      investment: 70500,
      currentValue: 68517,
      pnl: -1983,
      change: -67.2,
      changePercent: -1.45,
      sentiment: "negative",
    },
  ]
  
  export const newsData: NewsItem[] = [
    {
      title: "Reliance Industries announces major expansion in renewable energy sector",
      summary: "RIL plans to invest ₹75,000 crores in green energy projects over next 3 years",
      sentiment: "positive",
      relatedCompanies: ["RELIANCE", "NTPC", "POWERGRID"],
      time: "2 hours ago",
      impact: "Positive impact on renewable energy stocks and related infrastructure companies",
    },
    {
      title: "IT sector faces headwinds as global recession fears mount",
      summary: "Major IT companies may see reduced demand from US and European clients",
      sentiment: "negative",
      relatedCompanies: ["TCS", "INFY", "HCLTECH", "WIPRO"],
      time: "4 hours ago",
      impact: "Negative sentiment across IT sector, potential earnings downgrades expected",
    },
    {
      title: "RBI maintains repo rate, signals dovish stance on inflation",
      summary: "Central bank keeps key rates unchanged, positive for banking sector liquidity",
      sentiment: "positive",
      relatedCompanies: ["HDFCBANK", "ICICIBANK", "SBIN", "KOTAKBANK", "AXISBANK"],
      time: "6 hours ago",
      impact: "Banking stocks likely to benefit from stable interest rate environment",
    },
    {
      title: "Auto sector recovery gains momentum with festive season demand",
      summary: "Strong booking numbers reported across passenger and commercial vehicles",
      sentiment: "positive",
      relatedCompanies: ["MARUTI", "BAJFINANCE"],
      time: "8 hours ago",
      impact: "Auto and auto financing companies expected to report strong quarterly numbers",
    },
    {
      title: "Pharma exports face regulatory challenges in key markets",
      summary: "US FDA raises concerns over manufacturing practices at several Indian facilities",
      sentiment: "negative",
      relatedCompanies: ["SUNPHARMA", "DRREDDY"],
      time: "12 hours ago",
      impact: "Pharma stocks under pressure, potential impact on export revenues",
    },
    {
      title: "Telecom sector consolidation accelerates with new spectrum auction",
      summary: "Major players gear up for 5G spectrum bidding, capex concerns rise",
      sentiment: "neutral",
      relatedCompanies: ["BHARTIARTL"],
      time: "1 day ago",
      impact: "Mixed impact - growth potential vs increased capital expenditure",
    },
    {
      title: "FMCG companies report margin pressure due to commodity inflation",
      summary: "Raw material costs continue to impact profitability across consumer goods sector",
      sentiment: "negative",
      relatedCompanies: ["HINDUNILVR", "ITC", "NESTLEIND"],
      time: "1 day ago",
      impact: "FMCG margins under pressure, price hikes may affect demand",
    },
    {
      title: "Infrastructure spending boost announced in Union Budget",
      summary: "Government allocates record ₹10 lakh crores for infrastructure development",
      sentiment: "positive",
      relatedCompanies: ["LT", "ULTRACEMCO", "COALINDIA"],
      time: "2 days ago",
      impact: "Infrastructure and cement companies to benefit from increased government spending",
    },
  ]
  
  export function generateChartData(period: string) {
    const baseValue = 1500000
    const dataPoints = period === "1D" ? 24 : period === "1W" ? 7 : period === "1M" ? 30 : 365
  
    return Array.from({ length: dataPoints }, (_, i) => {
      const variation = (Math.random() - 0.5) * 0.02
      const value = baseValue * (1 + (variation * (i + 1)) / dataPoints)
  
      return {
        time:
          period === "1D"
            ? `${i}:00`
            : period === "1W"
              ? `Day ${i + 1}`
              : period === "1M"
                ? `${i + 1}`
                : `Month ${Math.floor(i / 30) + 1}`,
        value: Math.round(value),
      }
    })
  }
  
  export function generateCompanyChartData(symbol: string, period: string) {
    const company = portfolioData.find((c) => c.symbol === symbol)
    if (!company) return []
  
    const basePrice = company.currentPrice
    const dataPoints = period === "1D" ? 24 : period === "1W" ? 7 : period === "1M" ? 30 : 365
  
    return Array.from({ length: dataPoints }, (_, i) => {
      const variation = (Math.random() - 0.5) * 0.03
      const price = basePrice * (1 + (variation * (i + 1)) / dataPoints)
  
      return {
        time:
          period === "1D"
            ? `${i}:00`
            : period === "1W"
              ? `Day ${i + 1}`
              : period === "1M"
                ? `${i + 1}`
                : `Month ${Math.floor(i / 30) + 1}`,
        price: Math.round(price * 100) / 100,
      }
    })
  }
  
  export function getCompanyNews(symbol: string): NewsItem[] {
    return newsData.filter((news) => news.relatedCompanies.includes(symbol)).slice(0, 5)
  }
  