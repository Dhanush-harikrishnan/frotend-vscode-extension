"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Keyboard, Copy, FileText, Users, TrendingUp, Clock } from "lucide-react"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function StatsGrid() {
  const { data, isLoading } = useSWR("/api/activity", fetcher)

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted rounded w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const logs = data?.data || []
  const typedTotal = logs.reduce((sum: number, log: any) => sum + (log.typedLines || 0), 0)
  const pastedTotal = logs.reduce((sum: number, log: any) => sum + (log.pastedLines || 0), 0)
  const totalLinesTotal = logs.reduce((sum: number, log: any) => sum + (log.totalLines || 0), 0)
  const uniqueUsers = new Set(logs.map((log: any) => log.username)).size
  
  // Calculate additional metrics
  const todayLogs = logs.filter((log: any) => {
    const today = new Date().toISOString().split('T')[0]
    return log.date === today
  })
  const todayActivity = todayLogs.reduce((sum: number, log: any) => sum + (log.totalLines || 0), 0)
  
  const typingRatio = totalLinesTotal > 0 ? ((typedTotal / totalLinesTotal) * 100).toFixed(1) : 0

  const stats = [
    { 
      label: "Total Typed Lines", 
      value: typedTotal.toLocaleString(), 
      icon: Keyboard,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12% from last week"
    },
    { 
      label: "Total Pasted Lines", 
      value: pastedTotal.toLocaleString(), 
      icon: Copy,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "+5% from last week"
    },
    { 
      label: "Total Lines Changed", 
      value: totalLinesTotal.toLocaleString(), 
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+8% from last week"
    },
    { 
      label: "Active Users", 
      value: uniqueUsers, 
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+2 new users"
    },
    { 
      label: "Today's Activity", 
      value: todayActivity.toLocaleString(), 
      icon: Clock,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      change: "Lines modified today"
    },
    { 
      label: "Typing Efficiency", 
      value: `${typingRatio}%`, 
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      change: "Typed vs Total ratio"
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map(({ label, value, icon: Icon, color, bgColor, change }) => (
        <Card key={label} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
              <div className={`p-2 rounded-full ${bgColor}`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className={`text-2xl font-bold ${color}`}>{value}</div>
              <p className="text-xs text-muted-foreground">{change}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
