# Typing Tracker API Usage Guide

This guide shows how to use the updated Typing Tracker APIs with all the new metric categories.

## Quick Start

### Import Types and Hooks

```typescript
import { useActivities, useMetrics, createActivity } from "@/hooks/use-activity"
import type { ActivityLog, DetailedMetrics } from "@/lib/types/activity"
```

## Common Use Cases

### 1. Fetch All Activities

```typescript
function MyComponent() {
  const { activities, isLoading, mutate } = useActivities()

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      {activities.map((activity) => (
        <div key={activity._id}>{activity.fileName}</div>
      ))}
    </div>
  )
}
```

### 2. Fetch Detailed Metrics for a User

```typescript
function DashboardPage() {
  const username = "dhanu"
  const date = "2025-10-31"
  const { metrics, isLoading } = useMetrics(username, date)

  if (isLoading) return <div>Loading metrics...</div>
  if (!metrics) return <div>No data</div>

  return (
    <div>
      <h2>Text Metrics</h2>
      <p>Lines Typed: {metrics.textMetrics.totalLinesTyped}</p>
      <p>Lines Pasted: {metrics.textMetrics.totalLinesPasted}</p>

      <h2>AI Metrics</h2>
      <p>AI Acceptance Rate: {metrics.aiExtensionMetrics.acceptanceRate}%</p>
      <p>AI Generated Lines: {metrics.aiExtensionMetrics.totalAIGeneratedLines}</p>

      <h2>System Metrics</h2>
      <p>Focus Score: {metrics.systemEnvironmentMetrics.focusScore}</p>
      <p>Active Time: {metrics.systemEnvironmentMetrics.activeTimePercentage}%</p>

      <h2>Terminal Metrics</h2>
      <p>Build Success Rate: {metrics.terminalUsageMetrics.buildSuccessRate}%</p>
      <p>Commands Executed: {metrics.terminalUsageMetrics.totalCommandsExecuted}</p>

      <h2>Version Control</h2>
      <p>Commits: {metrics.versionControlMetrics.totalCommits}</p>
      <p>Code Quality Score: {metrics.versionControlMetrics.codeQualityScore}</p>
    </div>
  )
}
```

### 3. Create Activity with All Metrics

```typescript
async function logActivity() {
  const activity: ActivityLog = {
    username: "dhanu",
    fileName: "app.ts",
    filePath: "/src/app.ts",
    date: "2025-10-31",
    actionType: "typing",
    typedLines: 10,
    pastedLines: 2,
    totalLines: 12,

    // AI Metrics
    aiExtensionMetrics: {
      aiSuggestionsShown: 20,
      aiSuggestionsAccepted: 15,
      aiSuggestionsRejected: 5,
      aiProvider: "GitHub Copilot",
      aiGeneratedLines: 25,
      aiAssistanceUsed: true,
    },

    // System Metrics
    systemEnvironmentMetrics: {
      activeCodingTime: 300000,
      cpuUsage: 45.5,
      memoryUsage: 62.3,
      batteryLevel: 85,
      isCharging: true,
      operatingSystem: "Windows 11",
    },

    // Terminal Metrics
    terminalUsageMetrics: {
      totalCommandsExecuted: 8,
      gitCommands: 4,
      npmCommands: 3,
      buildCommands: 1,
      commandsSuccessful: 7,
      commandsWithErrors: 1,
      buildSuccesses: 1,
    },

    // Version Control Metrics
    versionControlMetrics: {
      commitsCount: 3,
      linesAdded: 245,
      linesRemoved: 87,
      filesModified: 8,
      prsCreated: 1,
      branchesCreated: 2,
    },
  }

  const result = await createActivity(activity)

  if (result.success) {
    console.log("Activity created:", result.data)
  } else {
    console.error("Error:", result.error)
  }
}
```

### 4. Fetch Filtered Activities

```typescript
function FilteredActivities() {
  const username = "dhanu"
  const date = "2025-10-31"

  const { activities, pagination, isLoading } = useFilteredActivities(username, date, {
    language: "typescript",
    actionType: "typing",
    limit: 50,
    skip: 0,
  })

  return (
    <div>
      {activities.map((activity) => (
        <div key={activity._id}>{activity.fileName}</div>
      ))}

      <div>
        Total: {pagination?.total}, Page: {(pagination?.skip || 0) / (pagination?.limit || 50) + 1}
      </div>
    </div>
  )
}
```

### 5. Fetch Batch Metrics (Weekly View)

```typescript
import { useBatchMetrics } from "@/hooks/use-activity"

function WeeklyAnalytics() {
  const username = "dhanu"
  const dates = [
    "2025-10-31",
    "2025-10-30",
    "2025-10-29",
    "2025-10-28",
    "2025-10-27",
    "2025-10-26",
    "2025-10-25",
  ]

  const { metricsData, isLoading } = useBatchMetrics(username, dates)

  if (isLoading) return <div>Loading...</div>

  // Create chart data
  const aiAcceptanceRates = metricsData.map((day) => ({
    date: day.date,
    rate: day.aiExtensionMetrics.acceptanceRate,
  }))

  const focusScores = metricsData.map((day) => ({
    date: day.date,
    score: day.systemEnvironmentMetrics.focusScore,
  }))

  return (
    <div>
      <h2>AI Acceptance Rate Trend</h2>
      {/* Use with chart library like Recharts */}
      
      <h2>Focus Score Trend</h2>
      {/* Use with chart library */}
    </div>
  )
}
```

### 6. Batch Create Activities

```typescript
import { createActivitiesBatch } from "@/hooks/use-activity"

async function batchLogActivities() {
  const logs: ActivityLog[] = [
    {
      username: "dhanu",
      fileName: "app.ts",
      date: "2025-10-31",
      actionType: "typing",
      typedLines: 10,
      // ... other fields
    },
    {
      username: "dhanu",
      fileName: "utils.ts",
      date: "2025-10-31",
      actionType: "paste",
      pastedLines: 5,
      // ... other fields
    },
  ]

  const result = await createActivitiesBatch({ logs })

  if (result.success) {
    console.log(`Created ${result.data?.length} activities`)
  }
}
```

### 7. Update Activity

```typescript
import { updateActivity } from "@/hooks/use-activity"

async function updateLog(id: string) {
  const result = await updateActivity(id, {
    typedLines: 15,
    aiExtensionMetrics: {
      aiSuggestionsAccepted: 20,
    },
  })

  if (result.success) {
    console.log("Updated:", result.data)
  }
}
```

### 8. Delete Activity

```typescript
import { deleteActivity } from "@/hooks/use-activity"

async function removeLog(id: string) {
  const result = await deleteActivity(id)

  if (result.success) {
    console.log("Deleted successfully")
  }
}
```

## API Endpoints Reference

### Activity Endpoints

- `GET /api/activity` - Get all activities
- `POST /api/activity` - Create a single activity
- `POST /api/activity/batch` - Create multiple activities
- `PUT /api/activity/:id` - Update an activity
- `DELETE /api/activity/:id` - Delete an activity

### Metrics Endpoints

- `GET /api/metrics/:username/:date` - Get detailed metrics for a user and date
- `POST /api/metrics/batch` - Get metrics for multiple dates

### Other Endpoints

- `GET /api/summary/:username/:date` - Get user summary
- `GET /api/activities/:username/:date?language=typescript&actionType=typing` - Get filtered activities
- `GET /api/health` - Health check

## Metric Categories

All metrics endpoints return data organized into these categories:

1. **Text Metrics** - Lines typed/pasted/deleted, words, characters
2. **File Metrics** - Files edited, opened, closed, created
3. **Performance Metrics** - Typing speed, bursts, session duration
4. **Command Metrics** - Commands executed, most used commands
5. **AI Extension Metrics** - AI suggestions, acceptance rates, providers
6. **System Environment Metrics** - Active time, CPU/memory usage, focus score
7. **Terminal Usage Metrics** - Command execution, success rates, build/test metrics
8. **Version Control Metrics** - Commits, PRs, code churn, CI/CD, collaboration scores

## Error Handling

All API responses follow this format:

```typescript
{
  success: boolean
  message?: string
  data?: T
  error?: string
  errorCode?: string  // "VALIDATION_ERROR" | "NOT_FOUND" | "DATABASE_ERROR" | "METRICS_FETCH_ERROR"
}
```

Example error handling:

```typescript
const result = await createActivity(activity)

if (!result.success) {
  switch (result.errorCode) {
    case "VALIDATION_ERROR":
      console.error("Invalid data:", result.error)
      break
    case "DATABASE_ERROR":
      console.error("Server error:", result.error)
      break
    default:
      console.error("Unknown error:", result.error)
  }
}
```

## Best Practices

1. **Use TypeScript types** - Import types from `@/lib/types/activity` for type safety
2. **Use hooks for data fetching** - Use the provided hooks (`useActivities`, `useMetrics`, etc.)
3. **Handle loading states** - Always check `isLoading` before rendering
4. **Handle errors** - Check `isError` and display appropriate messages
5. **Use batch endpoints** - When fetching multiple dates, use batch endpoints to reduce requests
6. **Implement pagination** - Use `limit` and `skip` for large datasets
7. **Cache with SWR** - The hooks use SWR for automatic caching and revalidation

## Chart Integration Example

```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

function AIAcceptanceChart() {
  const { metricsData } = useBatchMetrics("dhanu", last7Days)

  const chartData = metricsData.map((day) => ({
    date: day.date,
    acceptance: day.aiExtensionMetrics.acceptanceRate,
    focusScore: day.systemEnvironmentMetrics.focusScore,
  }))

  return (
    <LineChart data={chartData} width={600} height={300}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="acceptance" stroke="#8884d8" name="AI Acceptance %" />
      <Line type="monotone" dataKey="focusScore" stroke="#82ca9d" name="Focus Score" />
    </LineChart>
  )
}
```

For more details, see [frontend-api-design.md](../docs/frontend-api-design.md).
