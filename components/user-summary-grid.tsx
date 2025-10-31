"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  User, 
  FileText, 
  Keyboard, 
  Copy, 
  TrendingUp, 
  Calendar,
  Target,
  Award,
  Activity
} from "lucide-react"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface UserStats {
  username: string
  totalTyped: number
  totalPasted: number
  totalLines: number
  filesEdited: Set<string>
  totalEntries: number
  avgTypedPerEntry: number
  pastedRatio: number
  recentActivity: number
  productivity: string
  streak: number
}

export function UserSummaryGrid() {
  const { data, isLoading } = useSWR("/api/activity", fetcher)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-3">
                <div className="h-6 bg-muted rounded w-1/2" />
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j}>
                      <div className="h-3 bg-muted rounded w-full mb-1" />
                      <div className="h-6 bg-muted rounded w-3/4" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const logs = data?.data || []

  // Calculate per-user stats
  const userStats: Record<string, UserStats> = {}

  logs.forEach((log: any) => {
    if (!userStats[log.username]) {
      userStats[log.username] = {
        username: log.username,
        totalTyped: 0,
        totalPasted: 0,
        totalLines: 0,
        filesEdited: new Set<string>(),
        totalEntries: 0,
        avgTypedPerEntry: 0,
        pastedRatio: 0,
        recentActivity: 0,
        productivity: 'Medium',
        streak: 0,
      }
    }

    userStats[log.username].totalTyped += log.typedLines || 0
    userStats[log.username].totalPasted += log.pastedLines || 0
    userStats[log.username].totalLines += log.totalLines || 0
    userStats[log.username].filesEdited.add(log.fileName)
    userStats[log.username].totalEntries += 1
  })

  // Convert to array and calculate derived stats
  const users = Object.values(userStats).map((user) => {
    const filesEditedCount = user.filesEdited.size
    const pastedRatio = user.totalLines > 0 ? ((user.totalPasted / user.totalLines) * 100) : 0
    
    // Calculate recent activity (last 7 days)
    const recentLogs = logs.filter((log: any) => {
      const logDate = new Date(log.date)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return log.username === user.username && logDate >= weekAgo
    })
    const recentActivity = recentLogs.reduce((sum: number, log: any) => sum + (log.totalLines || 0), 0)
    
    // Determine productivity level
    let productivity = 'Low'
    if (user.totalTyped > 5000) productivity = 'High'
    else if (user.totalTyped > 1000) productivity = 'Medium'
    
    // Calculate streak (consecutive days with activity)
    const userDates = [...new Set(logs
      .filter((log: any) => log.username === user.username)
      .map((log: any) => log.date)
    )].sort()
    
    let streak = 0
    const today = new Date()
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today)
      checkDate.setDate(today.getDate() - i)
      const dateStr = checkDate.toISOString().split('T')[0]
      if (userDates.includes(dateStr)) {
        streak++
      } else {
        break
      }
    }

    return {
      ...user,
      filesEdited: filesEditedCount,
      avgTypedPerEntry: user.totalEntries > 0 ? Math.round(user.totalTyped / user.totalEntries) : 0,
      pastedRatio: pastedRatio.toFixed(1),
      recentActivity,
      productivity,
      streak,
    }
  }).sort((a, b) => b.totalLines - a.totalLines) // Sort by total activity

  const getProductivityColor = (productivity: string) => {
    switch (productivity) {
      case 'High': return 'bg-green-500'
      case 'Medium': return 'bg-yellow-500'
      default: return 'bg-red-500'
    }
  }

  const getProductivityBadgeVariant = (productivity: string) => {
    switch (productivity) {
      case 'High': return 'default'
      case 'Medium': return 'secondary'
      default: return 'destructive'
    }
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Most Active</p>
                <p className="text-lg font-bold">{users[0]?.username || 'N/A'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">High Performers</p>
                <p className="text-2xl font-bold">{users.filter(u => u.productivity === 'High').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Daily Activity</p>
                <p className="text-2xl font-bold">
                  {users.length > 0 ? Math.round(users.reduce((sum, u) => sum + u.recentActivity, 0) / users.length / 7) : 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="p-6 text-center">
              <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No user data available</p>
              <p className="text-sm text-muted-foreground mt-2">
                Start using the VS Code extension to see user statistics
              </p>
            </CardContent>
          </Card>
        ) : (
          users.map((user, index) => (
            <Card key={user.username} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>
                        {user.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{user.username}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={getProductivityBadgeVariant(user.productivity) as any}>
                          {user.productivity}
                        </Badge>
                        {index === 0 && <Badge variant="outline">🏆 Top Performer</Badge>}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Main Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <Keyboard className="w-3 h-3 text-blue-600" />
                      <p className="text-xs text-muted-foreground">Typed</p>
                    </div>
                    <p className="text-lg font-bold text-blue-600">{user.totalTyped.toLocaleString()}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <Copy className="w-3 h-3 text-orange-600" />
                      <p className="text-xs text-muted-foreground">Pasted</p>
                    </div>
                    <p className="text-lg font-bold text-orange-600">{user.totalPasted.toLocaleString()}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <FileText className="w-3 h-3 text-green-600" />
                      <p className="text-xs text-muted-foreground">Files</p>
                    </div>
                    <p className="text-lg font-bold text-green-600">{user.filesEdited}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-purple-600" />
                      <p className="text-xs text-muted-foreground">Streak</p>
                    </div>
                    <p className="text-lg font-bold text-purple-600">{user.streak}d</p>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Typing Efficiency</span>
                      <span className="font-semibold">{(100 - parseFloat(user.pastedRatio)).toFixed(1)}%</span>
                    </div>
                    <Progress value={100 - parseFloat(user.pastedRatio)} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Recent Activity</span>
                      <span className="font-semibold">{user.recentActivity.toLocaleString()}</span>
                    </div>
                    <Progress value={Math.min((user.recentActivity / 1000) * 100, 100)} className="h-2" />
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="pt-3 border-t border-border space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Avg per Session</span>
                    <span className="font-semibold">{user.avgTypedPerEntry}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Sessions</span>
                    <span className="font-semibold">{user.totalEntries}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Lines</span>
                    <span className="font-semibold">{user.totalLines.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
