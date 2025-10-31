"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function StatsGrid() {
  const { data, isLoading } = useSWR("/api/activity", fetcher)

  if (isLoading) return <div className="text-muted-foreground">Loading...</div>

  const logs = data?.data || []
  const typedTotal = logs.reduce((sum: number, log: any) => sum + (log.typedLines || 0), 0)
  const pastedTotal = logs.reduce((sum: number, log: any) => sum + (log.pastedLines || 0), 0)
  const totalLinesTotal = logs.reduce((sum: number, log: any) => sum + (log.totalLines || 0), 0)
  const uniqueUsers = new Set(logs.map((log: any) => log.username)).size

  const stats = [
    { label: "Total Typed Lines", value: typedTotal.toLocaleString() },
    { label: "Total Pasted Lines", value: pastedTotal.toLocaleString() },
    { label: "Total Lines Changed", value: totalLinesTotal.toLocaleString() },
    { label: "Active Users", value: uniqueUsers },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ label, value }) => (
        <Card key={label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
