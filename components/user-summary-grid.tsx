"use client"

import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface UserStats {
  username: string
  totalTyped: number
  totalPasted: number
  totalLines: number
  filesEdited: number
  totalEntries: number
  avgTypedPerEntry: number
  pastedRatio: number
}

export function UserSummaryGrid() {
  const { data, isLoading } = useSWR("/api/activity", fetcher)

  if (isLoading) return <div className="text-muted-foreground">Loading user stats...</div>

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
        filesEdited: new Set(),
        totalEntries: 0,
        avgTypedPerEntry: 0,
        pastedRatio: 0,
      }
    }

    userStats[log.username].totalTyped += log.typedLines || 0
    userStats[log.username].totalPasted += log.pastedLines || 0
    userStats[log.username].totalLines += log.totalLines || 0
    ;(userStats[log.username].filesEdited as any).add(log.fileName)
    userStats[log.username].totalEntries += 1
  })

  // Convert to array and calculate derived stats
  const users = Object.values(userStats).map((user) => {
    const filesEditedCount = (user.filesEdited as any).size
    return {
      ...user,
      filesEdited: filesEditedCount,
      avgTypedPerEntry: user.totalEntries > 0 ? Math.round(user.totalTyped / user.totalEntries) : 0,
      pastedRatio: user.totalLines > 0 ? ((user.totalPasted / user.totalLines) * 100).toFixed(1) : "0",
    }
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.length === 0 ? (
          <p className="text-muted-foreground col-span-full">No user data available</p>
        ) : (
          users.map((user) => (
            <Card key={user.username}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{user.username}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Typed</p>
                    <p className="text-xl font-bold">{user.totalTyped.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Pasted</p>
                    <p className="text-xl font-bold">{user.totalPasted.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Files Edited</p>
                    <p className="text-xl font-bold">{user.filesEdited}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Entries</p>
                    <p className="text-xl font-bold">{user.totalEntries}</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Avg Typed/Entry</span>
                    <span className="font-semibold">{user.avgTypedPerEntry}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-muted-foreground">Pasted Ratio</span>
                    <span className="font-semibold">{user.pastedRatio}%</span>
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
