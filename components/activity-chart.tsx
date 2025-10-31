"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function ActivityChart() {
  const { data, isLoading } = useSWR("/api/activity", fetcher)

  if (isLoading) return <div className="text-muted-foreground">Loading chart...</div>

  const logs = data?.data || []

  // Group by date
  const chartData: Record<string, { typed: number; pasted: number }> = {}
  logs.forEach((log: any) => {
    if (!chartData[log.date]) {
      chartData[log.date] = { typed: 0, pasted: 0 }
    }
    chartData[log.date].typed += log.typedLines || 0
    chartData[log.date].pasted += log.pastedLines || 0
  })

  const data2 = Object.entries(chartData)
    .map(([date, { typed, pasted }]) => ({
      date,
      typed,
      pasted,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7)

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Activity Trend (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data2}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="typed" stackId="a" fill="hsl(var(--chart-1))" name="Typed Lines" />
            <Bar dataKey="pasted" stackId="a" fill="hsl(var(--chart-2))" name="Pasted Lines" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
