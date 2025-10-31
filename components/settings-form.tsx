"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  Check, 
  Server, 
  Database, 
  Shield, 
  Bell, 
  Palette, 
  Download,
  Upload,
  AlertCircle,
  Info
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function SettingsForm() {
  const [apiEndpoint, setApiEndpoint] = useState("")
  const [refreshInterval, setRefreshInterval] = useState("30")
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [dataRetention, setDataRetention] = useState("90")
  const [saved, setSaved] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  // Load settings on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setApiEndpoint(localStorage.getItem("apiEndpoint") || window.location.origin)
      setRefreshInterval(localStorage.getItem("refreshInterval") || "30")
      setNotifications(localStorage.getItem("notifications") === "true")
      setDarkMode(localStorage.getItem("darkMode") === "true")
      setAutoRefresh(localStorage.getItem("autoRefresh") !== "false")
      setDataRetention(localStorage.getItem("dataRetention") || "90")
      
      // Check API connectivity
      checkConnectivity()
    }
  }, [])

  const checkConnectivity = async () => {
    try {
      const response = await fetch("/api/health")
      setIsOnline(response.ok)
    } catch {
      setIsOnline(false)
    }
  }

  const handleSave = () => {
    // Save all settings to localStorage
    localStorage.setItem("apiEndpoint", apiEndpoint)
    localStorage.setItem("refreshInterval", refreshInterval)
    localStorage.setItem("notifications", notifications.toString())
    localStorage.setItem("darkMode", darkMode.toString())
    localStorage.setItem("autoRefresh", autoRefresh.toString())
    localStorage.setItem("dataRetention", dataRetention)
    
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    
    // Apply theme changes immediately
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const resetSettings = () => {
    setApiEndpoint(window.location.origin)
    setRefreshInterval("30")
    setNotifications(true)
    setDarkMode(false)
    setAutoRefresh(true)
    setDataRetention("90")
  }

  const exportSettings = () => {
    const settings = {
      apiEndpoint,
      refreshInterval,
      notifications,
      darkMode,
      autoRefresh,
      dataRetention,
      exportDate: new Date().toISOString(),
    }
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "typing-tracker-settings.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const settings = JSON.parse(e.target?.result as string)
        setApiEndpoint(settings.apiEndpoint || window.location.origin)
        setRefreshInterval(settings.refreshInterval || "30")
        setNotifications(settings.notifications ?? true)
        setDarkMode(settings.darkMode ?? false)
        setAutoRefresh(settings.autoRefresh ?? true)
        setDataRetention(settings.dataRetention || "90")
      } catch {
        alert("Invalid settings file")
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Status Alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="flex items-center gap-2">
          API Status: 
          <Badge variant={isOnline ? "default" : "destructive"}>
            {isOnline ? "Online" : "Offline"}
          </Badge>
          {!isOnline && (
            <Button variant="outline" size="sm" onClick={checkConnectivity}>
              Retry Connection
            </Button>
          )}
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="api" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="api">API & Data</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* API & Data Settings */}
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5" />
                API Configuration
              </CardTitle>
              <CardDescription>
                Configure the API endpoint and data refresh settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-endpoint">API Endpoint</Label>
                <Input
                  id="api-endpoint"
                  value={apiEndpoint}
                  onChange={(e) => setApiEndpoint(e.target.value)}
                  placeholder="http://localhost:3000"
                  type="url"
                />
                <p className="text-xs text-muted-foreground">
                  The base URL for your typing tracker API. The VS Code extension should point here.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="refresh-interval">Refresh Interval (seconds)</Label>
                <Select value={refreshInterval} onValueChange={setRefreshInterval}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 seconds</SelectItem>
                    <SelectItem value="30">30 seconds</SelectItem>
                    <SelectItem value="60">1 minute</SelectItem>
                    <SelectItem value="300">5 minutes</SelectItem>
                    <SelectItem value="0">Manual only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="auto-refresh"
                  checked={autoRefresh}
                  onCheckedChange={setAutoRefresh}
                />
                <Label htmlFor="auto-refresh">Enable auto-refresh</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="data-retention">Data Retention (days)</Label>
                <Select value={dataRetention} onValueChange={setDataRetention}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">6 months</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="0">Forever</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  How long to keep activity data before automatic cleanup
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Display Settings */}
        <TabsContent value="display" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
                <Label htmlFor="dark-mode">Dark mode</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
                <Label htmlFor="notifications">Enable notifications</Label>
              </div>
              <p className="text-xs text-muted-foreground">
                Receive notifications for important events and updates
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Import/Export & Reset
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button variant="outline" onClick={exportSettings} className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Settings
                </Button>
                
                <div className="relative">
                  <input
                    type="file"
                    accept=".json"
                    onChange={importSettings}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Import Settings
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <Button variant="destructive" onClick={resetSettings}>
                  Reset to Defaults
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  This will reset all settings to their default values
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-foreground">Version</p>
                  <p className="text-muted-foreground">1.2.0</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Build</p>
                  <p className="text-muted-foreground">2024.10.31</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Status</p>
                  <Badge variant={isOnline ? "default" : "destructive"}>
                    {isOnline ? "Running" : "Offline"}
                  </Badge>
                </div>
                <div>
                  <p className="font-medium text-foreground">Environment</p>
                  <p className="text-muted-foreground">Production</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="font-medium text-foreground mb-2">Features</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-muted-foreground">Real-time tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-muted-foreground">Advanced analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-muted-foreground">User management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-muted-foreground">Data export</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-muted-foreground">Dark mode</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-muted-foreground">Customizable dashboard</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex items-center justify-between pt-4">
        <Alert className="flex-1 mr-4">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Settings are saved locally in your browser and will persist across sessions.
          </AlertDescription>
        </Alert>
        
        <Button onClick={handleSave} className="flex items-center gap-2 min-w-[140px]">
          {saved && <Check className="w-4 h-4" />}
          {saved ? "Settings Saved!" : "Save All Settings"}
        </Button>
      </div>
    </div>
  )
}
