"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))']

export function ActivityChart() {
  const { data, isLoading } = useSWR("/api/activity", fetcher)

  if (isLoading) {
    return (
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Activity Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center">
            <div className="text-muted-foreground">Loading charts...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const logs = data?.data || []

  // Group by date for trend analysis
  const chartData: Record<string, { typed: number; pasted: number; total: number }> = {}
  logs.forEach((log: any) => {
    if (!chartData[log.date]) {
      chartData[log.date] = { typed: 0, pasted: 0, total: 0 }
    }
    chartData[log.date].typed += log.typedLines || 0
    chartData[log.date].pasted += log.pastedLines || 0
    chartData[log.date].total += log.totalLines || 0
  })

  const trendData = Object.entries(chartData)
    .map(([date, { typed, pasted, total }]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      typed,
      pasted,
      total,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-14) // Last 14 days

  // User activity distribution
  const userActivity: Record<string, number> = {}
  logs.forEach((log: any) => {
    if (!userActivity[log.username]) {
      userActivity[log.username] = 0
    }
    userActivity[log.username] += log.totalLines || 0
  })

  const userDistribution = Object.entries(userActivity)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6) // Top 6 users

  // Activity type distribution
  const totalTyped = logs.reduce((sum: number, log: any) => sum + (log.typedLines || 0), 0)
  const totalPasted = logs.reduce((sum: number, log: any) => sum + (log.pastedLines || 0), 0)
  
  const activityDistribution = [
    { name: 'Typed Lines', value: totalTyped },
    { name: 'Pasted Lines', value: totalPasted },
  ]

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Activity Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="trend" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trend">Trend Analysis</TabsTrigger>
            <TabsTrigger value="users">User Distribution</TabsTrigger>
            <TabsTrigger value="types">Activity Types</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trend" className="mt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Daily Activity (Last 14 Days)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="typed" stackId="a" fill={COLORS[0]} name="Typed Lines" />
                      <Bar dataKey="pasted" stackId="a" fill={COLORS[1]} name="Pasted Lines" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Activity Trend Line</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="total" stroke={COLORS[2]} strokeWidth={2} name="Total Lines" />
                      <Line type="monotone" dataKey="typed" stroke={COLORS[0]} strokeWidth={2} name="Typed Lines" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Top Contributors</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={userDistribution} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="value" fill={COLORS[0]} name="Total Lines" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="types" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Activity Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={activityDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }: any) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {activityDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Activity Summary</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Typed Lines</span>
                      <span className="text-lg font-bold text-blue-600">{totalTyped.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Pasted Lines</span>
                      <span className="text-lg font-bold text-orange-600">{totalPasted.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Typing Efficiency</span>
                      <span className="text-lg font-bold text-green-600">
                        {totalTyped + totalPasted > 0 ? 
                          ((totalTyped / (totalTyped + totalPasted)) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
