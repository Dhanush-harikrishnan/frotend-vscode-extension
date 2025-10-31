"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"

export function SettingsForm() {
  const [apiEndpoint, setApiEndpoint] = useState(
    typeof window !== "undefined" ? localStorage.getItem("apiEndpoint") || window.location.origin : "",
  )
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    localStorage.setItem("apiEndpoint", apiEndpoint)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Configure the API endpoint for activity tracking</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">API Endpoint</label>
            <Input
              value={apiEndpoint}
              onChange={(e) => setApiEndpoint(e.target.value)}
              placeholder="http://localhost:3000"
              type="url"
            />
            <p className="text-xs text-muted-foreground mt-1">
              The base URL for your typing tracker API (e.g., the VS Code extension should point here)
            </p>
          </div>
          <Button onClick={handleSave} className="flex items-center gap-2">
            {saved && <Check className="w-4 h-4" />}
            {saved ? "Saved!" : "Save Configuration"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
          <CardDescription>VS Code Typing Tracker Dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-foreground">Version</p>
              <p className="text-muted-foreground">1.0.0</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Status</p>
              <p className="text-green-600">Running</p>
            </div>
          </div>
          <div className="pt-2 border-t border-border">
            <p className="font-medium text-foreground mb-1">Features</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Real-time activity tracking</li>
              <li>Advanced filtering and search</li>
              <li>User statistics and summaries</li>
              <li>Daily and weekly activity trends</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
