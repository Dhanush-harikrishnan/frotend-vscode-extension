"use client"

import { useState } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Trash2, Edit2, Search, User, FileText, Calendar, Code, Copy, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function LogsTable() {
  const { data, isLoading, mutate } = useSWR("/api/activity", fetcher)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterUser, setFilterUser] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading activity logs...</p>
        </div>
      </div>
    )
  }

  const logs = data?.data || []

  const filtered = logs.filter((log: any) => {
    const matchesSearch =
      log.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.filePath.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesUser = !filterUser || log.username === filterUser

    return matchesSearch && matchesUser
  })

  const uniqueUsers: string[] = [...new Set(logs.map((log: any) => log.username as string))]

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this log?")) return

    setDeletingId(id)
    try {
      const response = await fetch(`/api/activity/\${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        mutate()
      }
    } catch (error) {
      console.error("Error deleting log:", error)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-4 bg-card/50 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search files or paths..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative min-w-[200px]">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <select
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md bg-background appearance-none cursor-pointer hover:bg-accent/50 transition-colors"
            >
              <option value="">All Users</option>
              {uniqueUsers.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden shadow-lg border-border/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-muted/80 to-muted/40 border-b-2 border-border sticky top-0 z-10 backdrop-blur-sm">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-foreground">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    User
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-foreground">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    File
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <Code className="w-4 h-4" />
                    Typed
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <Copy className="w-4 h-4" />
                    Pasted
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-foreground">
                  Total
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-foreground">
                  Type
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <FileText className="w-12 h-12 text-muted-foreground/50" />
                      <p className="text-sm font-medium text-muted-foreground">No logs found</p>
                      <p className="text-xs text-muted-foreground/70">Try adjusting your filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((log: any, index: number) => (
                  <tr 
                    key={log._id} 
                    className={`transition-all duration-150 hover:bg-accent/50 \${
                      index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">{log.username}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="font-medium text-foreground truncate">{log.fileName}</p>
                        <p className="text-xs text-muted-foreground truncate" title={log.filePath}>
                          {log.filePath}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">{log.date}</span>
                        <span className="text-xs text-muted-foreground">{log.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
                        {log.typedLines}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant="outline" className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20">
                        {log.pastedLines}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-lg font-bold text-foreground">{log.totalLines}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge 
                        variant={log.actionType === "typing" ? "default" : "secondary"}
                        className={`\${
                          log.actionType === "typing" 
                            ? "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30 hover:bg-green-500/30" 
                            : "bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-500/30 hover:bg-orange-500/30"
                        }`}
                      >
                        {log.actionType === "typing" ? (
                          <><Code className="w-3 h-3 mr-1" /> Typing</>
                        ) : (
                          <><Copy className="w-3 h-3 mr-1" /> Paste</>
                        )}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 justify-center">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => setEditingId(log._id)}
                          className="hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          title="Edit log"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleDelete(log._id)}
                          disabled={deletingId === log._id}
                          className="hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-50"
                          title="Delete log"
                        >
                          {deletingId === log._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium">
            <FileText className="w-4 h-4 text-primary" />
            <span>
              Showing <span className="font-bold text-primary">{filtered.length}</span> of{" "}
              <span className="font-bold">{logs.length}</span> logs
            </span>
          </div>
          {searchTerm || filterUser ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setFilterUser("")
              }}
              className="text-xs"
            >
              Clear Filters
            </Button>
          ) : null}
        </div>
      </Card>
    </div>
  )
}
