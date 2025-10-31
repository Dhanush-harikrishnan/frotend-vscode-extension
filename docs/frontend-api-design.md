# Next.js Frontend Design & API Documentation for VS Code Typing Tracker

## 1. Project Overview
A Next.js web dashboard to visualize, manage, and analyze coding activity logs collected by the VS Code Typing Tracker extension.

### Key Features
- Dashboard: Charts for typed vs pasted lines, daily/weekly stats
- Activity Log List: Filter, search, sort logs
- User Summaries: Per-user, per-day stats
- CRUD Operations: Add, update, delete logs
- Health & status display

---

## 2. UI Design Description

### Pages & Components

#### Dashboard Page
- **Summary Cards**: Quick stats (total lines, files edited, active time, AI acceptance rate)
- **Activity Timeline**: Daily coding activity visualization
- **Charts**:
  - Typed vs Pasted Lines (Bar/Pie Chart)
  - Daily/Weekly Typing Speed (Line Chart)
  - AI Acceptance Rate Trend (Line Chart)
  - Focus Score & Active Time (Area Chart)
  - Terminal Success Rates (Bar Chart)
  - Version Control Activity (Multi-bar Chart)
  - Code Quality Score (Gauge/Radial Chart)
- **Quick Insights**: 
  - Most productive hours
  - Most used AI provider
  - Top commands executed
  - Peak commit hours
  - Collaboration score

#### Activity Logs Page
- **Table View**: Sortable columns (date, file, lines, AI usage, commands)
- **Filters**: 
  - Date range picker
  - User dropdown
  - File type filter
  - Action type (typing, paste)
  - Language filter
  - Has AI metrics toggle
  - Has Git activity toggle
- **Search**: Full-text search across files and paths
- **Actions**: Edit, Delete, View Details buttons per row

#### Detailed Metrics Page
- **Multi-Tab Layout**:
  - Text & Performance Metrics
  - AI & Extension Usage
  - System & Environment
  - Terminal Usage
  - Version Control & Git
- **Metric Cards**: Individual cards for each metric category with drill-down
- **Comparison View**: Compare metrics across dates
- **Export**: Download metrics as CSV/JSON

#### Add/Edit Activity Page
- **Multi-Step Form**:
  - Step 1: Basic Info (username, file, date, action type)
  - Step 2: Text Metrics (lines, words, characters)
  - Step 3: AI Metrics (suggestions, acceptance, provider)
  - Step 4: Terminal Metrics (commands, success rates)
  - Step 5: Version Control (commits, PRs, CI/CD)
- **Auto-complete**: File paths, usernames from existing data
- **Validation**: Real-time field validation

#### User Analytics Page
- **User Profile**: Total contributions, active days, streak
- **Per-User Stats**: 
  - Typing patterns
  - AI usage habits
  - Most productive times
  - Favorite languages
  - Git contribution graph
- **Leaderboards**: Top contributors, AI power users, commit champions

#### Settings Page
- **API Configuration**: Backend endpoint URL
- **User Preferences**: Theme, default date range, chart types
- **Data Management**: Export all data, clear cache
- **Notifications**: Set alerts for low AI acceptance, build failures

### Example Layout
- Sidebar: Navigation (Dashboard, Logs, Users, Settings)
- Main Area: Dynamic content (charts, tables, forms)
- Top Bar: Quick actions, user info

---

## 3. API Endpoints & JSON Contracts

### 3.1 Add Activity Log
**POST** `/api/activity`
**Request:**
```json
{
  "username": "dhanu",
  "fileName": "index.ts",
  "filePath": "/src/index.ts",
  "date": "2025-10-31",
  "time": "09:00:00",
  "timestamp": "2025-10-31T09:00:00.000Z",
  "actionType": "typing",
  "typedLines": 10,
  "pastedLines": 2,
  "deletedLines": 1,
  "totalLines": 12,
  "wordsTyped": 50,
  "charactersTyped": 250,
  "contentSnippet": "console.log('Hello World');",
  "editorVersion": "1.85.0",
  
  // Enhanced Metrics (all optional)
  "typingMetrics": {
    "keystrokesPerMinute": 120,
    "wordsPerMinute": 45,
    "averageTypingBurst": 5,
    "typingSessionDuration": 300000
  },
  "fileOperations": {
    "filesOpened": 3,
    "filesClosed": 2,
    "filesSwitched": 5,
    "filesCreated": 1,
    "filesDeleted": 0,
    "filesRenamed": 0,
    "filesSaved": 4
  },
  "commands": {
    "totalCommandsExecuted": 15,
    "mostUsedCommand": "editor.action.formatDocument",
    "commandPaletteOpened": 3
  },
  
  // AI & Extension Usage Metrics (optional)
  "aiExtensionMetrics": {
    "aiSuggestionsShown": 20,
    "aiSuggestionsAccepted": 15,
    "aiSuggestionsRejected": 5,
    "aiProvider": "GitHub Copilot",
    "aiGeneratedLines": 25,
    "aiAssistanceUsed": true,
    "copilotChatInteractions": 3,
    "aiEditingSessions": 2,
    "inlineCompletionsShown": 18,
    "inlineCompletionsAccepted": 12,
    "aiTypingTime": 45000,
    "manualTypingTime": 255000,
    "extensionsActive": 12,
    "extensionsInstalled": 25,
    "themeUsed": "GitHub Dark"
  },
  
  // System & Environment Metrics (optional)
  "systemEnvironmentMetrics": {
    "idleTime": 5000,
    "activeCodingTime": 300000,
    "systemSleepTime": 0,
    "systemLockTime": 0,
    "systemWakeCount": 0,
    "workspaceSwitches": 2,
    "currentWorkspace": "/project",
    "previousWorkspace": "/old-project",
    "workspaceSwitchTimestamp": "2025-10-31T08:30:00.000Z",
    "operatingSystem": "Windows 11",
    "cpuUsage": 45.5,
    "memoryUsage": 62.3,
    "batteryLevel": 85,
    "isCharging": true
  },
  
  // Terminal Usage Metrics (optional)
  "terminalUsageMetrics": {
    "totalCommandsExecuted": 8,
    "commandHistory": ["npm install", "git status", "npm run dev"],
    "frequentCommands": { "git": 4, "npm": 3 },
    "gitCommands": 4,
    "npmCommands": 3,
    "buildCommands": 1,
    "testCommands": 0,
    "dockerCommands": 0,
    "customScripts": 0,
    "commandsWithErrors": 1,
    "commandsSuccessful": 7,
    "errorRate": 12.5,
    "buildFailures": 0,
    "buildSuccesses": 1,
    "testFailures": 0,
    "testSuccesses": 0,
    "buildSuccessRate": 100,
    "testSuccessRate": 0,
    "terminalSessions": 2,
    "averageCommandsPerSession": 4,
    "longestCommandExecutionTime": 15000,
    "totalTerminalTime": 60000
  },
  
  // Version Control (Git/GitHub) Metrics (optional)
  "versionControlMetrics": {
    "commitsCount": 3,
    "linesAdded": 245,
    "linesRemoved": 87,
    "codeChurn": 332,
    "filesModified": 8,
    "averageFilesPerCommit": 2.67,
    "commitsByHour": { "9": 1, "14": 2 },
    "lastCommitTimestamp": "2025-10-31T14:30:00.000Z",
    "commitFrequency": 0.5,
    "commitMessages": ["feat: add auth", "fix: login bug", "docs: update README"],
    "averageMessageLength": 25,
    "conventionalCommits": 3,
    "commitMessageQualityScore": 85,
    "prsCreated": 1,
    "prsReviewed": 2,
    "prCommentsMade": 5,
    "prCommentsReceived": 3,
    "averagePrMergeTime": 86400000,
    "prsMerged": 1,
    "prsClosed": 0,
    "issuesMentioned": 2,
    "issuesClosed": 1,
    "issuesCreated": 1,
    "issueCommentsAdded": 3,
    "branchesCreated": 2,
    "branchesDeleted": 1,
    "featureBranches": 1,
    "bugfixBranches": 0,
    "hotfixBranches": 0,
    "activeBranches": ["main", "feature/auth"],
    "currentBranch": "feature/auth",
    "mergesPerformed": 1,
    "conflictsEncountered": 2,
    "conflictsResolved": 2,
    "conflictRate": 0.67,
    "ciPipelineRuns": 3,
    "ciPipelineFailures": 0,
    "ciPipelineSuccesses": 3,
    "linterFailuresInPR": 0,
    "testFailuresInPR": 0,
    "ciSuccessRate": 100,
    "codeReviewsGiven": 2,
    "codeReviewsReceived": 1,
    "approvalRate": 100,
    "changesRequested": 0
  },
  
  // Session info
  "sessionDuration": 300000,
  "activeTypingTime": 255000,
  "language": "typescript",
  "projectPath": "/project",
  "gitBranch": "feature/auth"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Activity log created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "dhanu",
    "fileName": "index.ts",
    "date": "2025-10-31",
    "aiExtensionMetrics": { /* normalized with defaults */ },
    "systemEnvironmentMetrics": { /* normalized with defaults */ },
    "terminalUsageMetrics": { /* normalized with defaults */ },
    "versionControlMetrics": { /* normalized with defaults */ },
    "createdAt": "2025-10-31T09:00:00.000Z",
    "updatedAt": "2025-10-31T09:00:00.000Z"
  }
}
```

---

### 3.2 Batch Add Activity Logs
**POST** `/api/activity/batch`
**Request:**
```json
{
  "logs": [ /* array of ActivityLog objects as above */ ]
}
```
**Response:**
```json
{
  "success": true,
  "message": "Batch logs created successfully",
  "data": [ /* array of created logs */ ]
}
```

---

### 3.3 Get All Activity Logs
**GET** `/api/activity`
**Response:**
```json
{
  "success": true,
  "data": [ /* array of ActivityLog objects */ ]
}
```

---

### 3.4 Delete Activity Log
**DELETE** `/api/activity/:id`
**Response:**
```json
{
  "success": true,
  "message": "Activity log deleted"
}
```

---

### 3.5 Update Activity Log
**PUT** `/api/activity/:id`
**Request:**
```json
{
  // fields to update, e.g.
  "typedLines": 15
}
```
**Response:**
```json
{
  "success": true,
  "message": "Activity log updated",
  "data": { /* updated ActivityLog object */ }
}
```

---

### 3.6 Get User Summary
**GET** `/api/summary/:username/:date`
**Response:**
```json
{
  "success": true,
  "data": {
    "username": "dhanu",
    "date": "2025-10-31",
    "typedLines": 100,
    "pastedLines": 20,
    "filesEdited": 5,
    "totalActivities": 25
  }
}
```

---

### 3.8 Get Detailed Metrics (NEW - Comprehensive)
**GET** `/api/metrics/:username/:date`
**Response:**
```json
{
  "success": true,
  "data": {
    "username": "dhanu",
    "date": "2025-10-31",
    
    // Text Metrics
    "textMetrics": {
      "totalLinesTyped": 245,
      "totalLinesPasted": 32,
      "totalLinesDeleted": 18,
      "totalWords": 1250,
      "totalCharacters": 6890,
      "typingVsPastingRatio": 7.66
    },
    
    // File Metrics
    "fileMetrics": {
      "totalFilesEdited": 12,
      "uniqueFiles": 8,
      "mostEditedFile": "src/app.ts",
      "filesOpened": 15,
      "filesClosed": 14,
      "filesSwitched": 23,
      "filesCreated": 2,
      "filesDeleted": 1,
      "filesRenamed": 0,
      "filesSaved": 18
    },
    
    // Performance Metrics
    "performanceMetrics": {
      "totalKeystrokesPerMinute": 3600,
      "averageKeystrokesPerMinute": 120,
      "totalWordsPerMinute": 1350,
      "averageWordsPerMinute": 45,
      "totalTypingBursts": 150,
      "averageTypingBurst": 5,
      "totalTypingSessionDuration": 9000000
    },
    
    // Command Metrics
    "commandMetrics": {
      "totalCommandsExecuted": 450,
      "mostUsedCommand": "editor.action.formatDocument",
      "commandPaletteOpened": 25
    },
    
    // AI & Extension Usage Metrics (NEW)
    "aiExtensionMetrics": {
      "totalAISuggestionsShown": 320,
      "totalAISuggestionsAccepted": 245,
      "totalAISuggestionsRejected": 75,
      "acceptanceRate": 76.56,
      "totalAIGeneratedLines": 412,
      "aiAssistanceUsed": true,
      "totalCopilotChatInteractions": 15,
      "totalAIEditingSessions": 8,
      "totalInlineCompletionsShown": 298,
      "totalInlineCompletionsAccepted": 201,
      "totalAITypingTime": 1350000,
      "totalManualTypingTime": 7650000,
      "aiTypingRatio": 0.15,
      "mostUsedAIProvider": "GitHub Copilot",
      "totalExtensionsActive": 12,
      "totalExtensionsInstalled": 25,
      "themeUsed": "GitHub Dark"
    },
    
    // System & Environment Metrics (NEW)
    "systemEnvironmentMetrics": {
      "totalIdleTime": 150000,
      "totalActiveCodingTime": 8850000,
      "firstActivityTime": "2025-10-31T08:00:00.000Z",
      "lastActivityTime": "2025-10-31T17:30:00.000Z",
      "workDayDuration": 34200000,
      "totalSystemSleepTime": 0,
      "totalSystemLockTime": 0,
      "totalSystemWakeCount": 0,
      "totalWorkspaceSwitches": 5,
      "uniqueWorkspaces": ["/project", "/other-project"],
      "primaryWorkspace": "/project",
      "averageCpuUsage": 42.5,
      "averageMemoryUsage": 58.3,
      "averageBatteryLevel": 75,
      "activeTimePercentage": 98.31,
      "focusScore": 95.89
    },
    
    // Terminal Usage Metrics (NEW)
    "terminalUsageMetrics": {
      "totalCommandsExecuted": 89,
      "totalGitCommands": 45,
      "totalNpmCommands": 28,
      "totalBuildCommands": 8,
      "totalTestCommands": 5,
      "totalDockerCommands": 2,
      "totalCustomScripts": 1,
      "commandsWithErrors": 7,
      "commandsSuccessful": 82,
      "overallErrorRate": 7.87,
      "buildFailures": 1,
      "buildSuccesses": 7,
      "buildSuccessRate": 87.5,
      "testFailures": 0,
      "testSuccesses": 5,
      "testSuccessRate": 100,
      "totalTerminalSessions": 12,
      "totalTerminalTime": 720000,
      "longestCommandExecutionTime": 45000,
      "topCommands": ["git status", "npm run dev", "git commit", "npm install"],
      "commandDiversity": 32
    },
    
    // Version Control Metrics (NEW)
    "versionControlMetrics": {
      "totalCommits": 15,
      "totalLinesAdded": 1245,
      "totalLinesRemoved": 387,
      "netLinesChanged": 858,
      "totalCodeChurn": 1632,
      "totalFilesModified": 42,
      "averageLinesPerCommit": 108.8,
      "averageFilesPerCommit": 2.8,
      "pullRequestsCreated": 3,
      "pullRequestsMerged": 2,
      "pullRequestsReviewed": 5,
      "prMergeRate": 66.67,
      "prCommentsMade": 18,
      "averageReviewCommentsPerPR": 3.6,
      "conflictsEncountered": 4,
      "conflictsResolved": 4,
      "conflictResolutionRate": 100,
      "ciPipelineRuns": 15,
      "ciPipelineSuccesses": 14,
      "ciPipelineFailures": 1,
      "ciSuccessRate": 93.33,
      "branchesCreated": 4,
      "branchesDeleted": 2,
      "mergesPerformed": 3,
      "peakCommitHour": 14,
      "collaborationScore": 26.0,
      "codeQualityScore": 87.56,
      "issuesCreated": 2,
      "issuesClosed": 3,
      "codeReviewsGiven": 5,
      "codeReviewsReceived": 3
    },
    
    // Summary Statistics
    "activityCount": 125,
    "sessionCount": 8,
    "totalSessionTime": 9000000
  }
}
```
**Notes:**
- All metric categories include comprehensive aggregated data
- Calculated fields include rates, percentages, scores, and averages
- AI metrics show acceptance rates and typing time ratios
- System metrics include focus scores and active time percentages
- Terminal metrics show success rates and command diversity
- Version Control metrics include collaboration and code quality scores

---

### 3.9 Get Activities by User and Date (with filters)
**GET** `/api/activities/:username/:date?language=typescript&actionType=typing&limit=50&skip=0`
**Query Parameters:**
- `language` (optional): Filter by programming language
- `actionType` (optional): Filter by action type (typing, paste, etc.)
- `limit` (optional): Number of results per page (default: 100)
- `skip` (optional): Number of results to skip (default: 0)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "username": "dhanu",
      "fileName": "app.ts",
      "date": "2025-10-31",
      "actionType": "typing",
      "aiExtensionMetrics": { /* ... */ },
      "systemEnvironmentMetrics": { /* ... */ },
      "terminalUsageMetrics": { /* ... */ },
      "versionControlMetrics": { /* ... */ }
    }
  ],
  "pagination": {
    "total": 125,
    "limit": 50,
    "skip": 0,
    "hasMore": true
  }
}
```

---

### 3.10 Batch Get Metrics (Multiple Dates)
**POST** `/api/metrics/batch`
**Request:**
```json
{
  "username": "dhanu",
  "dates": ["2025-10-31", "2025-10-30", "2025-10-29"]
}
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "date": "2025-10-31",
      "textMetrics": { /* ... */ },
      "aiExtensionMetrics": { /* ... */ },
      "systemEnvironmentMetrics": { /* ... */ },
      "terminalUsageMetrics": { /* ... */ },
      "versionControlMetrics": { /* ... */ }
    },
    {
      "date": "2025-10-30",
      /* ... */
    }
  ]
}
```

---

## 7. Metric Categories Reference

### Available Metric Categories
1. **Text Metrics**: Lines typed/pasted/deleted, words, characters
2. **File Metrics**: Files edited, opened, closed, created, deleted
3. **Performance Metrics**: Typing speed (KPM, WPM), bursts, session duration
4. **Command Metrics**: Commands executed, most used commands
5. **AI Extension Metrics**: AI suggestions, acceptance rates, providers, extensions
6. **System Environment Metrics**: Idle/active time, CPU/memory usage, workspaces, focus score
7. **Terminal Usage Metrics**: Commands executed, success rates, build/test metrics
8. **Version Control Metrics**: Commits, PRs, code churn, CI/CD, collaboration scores

### Key Calculated Fields

**AI Metrics:**
- `acceptanceRate`: (accepted / shown) * 100
- `aiTypingRatio`: aiTypingTime / totalTypingTime

**System Metrics:**
- `activeTimePercentage`: (activeTime / totalTime) * 100
- `focusScore`: activeTimePercentage * (1 - min(switches / 100, 0.5))

**Terminal Metrics:**
- `overallErrorRate`: (errored / total) * 100
- `buildSuccessRate`: (successes / total) * 100
- `commandDiversity`: Unique command count

**Version Control Metrics:**
- `codeChurn`: linesAdded + linesRemoved
- `prMergeRate`: (merged / created) * 100
- `ciSuccessRate`: (passed / total) * 100
- `conflictResolutionRate`: (resolved / encountered) * 100
- `collaborationScore`: PRs + reviews + (comments * 0.5)
- `codeQualityScore`: Weighted score based on CI, conflicts, PRs, reviews

---

## 8. Error Responses

All endpoints may return error responses in this format:
```json
{
  "success": false,
  "message": "Error description",
  "errorCode": "ERROR_CODE",
  "error": "Detailed error message"
}
```

**Common Error Codes:**
- `VALIDATION_ERROR`: Invalid request data
- `NOT_FOUND`: Resource not found
- `METRICS_FETCH_ERROR`: Error fetching metrics
- `DATABASE_ERROR`: Database operation failed

---

## 9. Frontend Integration Examples

### Fetch Daily Metrics with All Categories
```typescript
async function getDailyMetrics(username: string, date: string) {
  const response = await fetch(`http://localhost:3000/api/metrics/${username}/${date}`);
  const data = await response.json();
  
  if (data.success) {
    console.log('Text Metrics:', data.data.textMetrics);
    console.log('AI Metrics:', data.data.aiExtensionMetrics);
    console.log('System Metrics:', data.data.systemEnvironmentMetrics);
    console.log('Terminal Metrics:', data.data.terminalUsageMetrics);
    console.log('Version Control:', data.data.versionControlMetrics);
  }
}
```

### Create Activity with All Metrics
```typescript
async function createActivity(activityData: any) {
  const response = await fetch('http://localhost:3000/api/activity', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'dhanu',
      fileName: 'app.ts',
      date: '2025-10-31',
      // ... basic fields
      aiExtensionMetrics: {
        aiSuggestionsShown: 10,
        aiSuggestionsAccepted: 8,
        // ... other AI fields
      },
      systemEnvironmentMetrics: {
        activeCodingTime: 300000,
        cpuUsage: 45.5,
        // ... other system fields
      },
      terminalUsageMetrics: {
        totalCommandsExecuted: 5,
        gitCommands: 3,
        // ... other terminal fields
      },
      versionControlMetrics: {
        commitsCount: 2,
        linesAdded: 150,
        // ... other VC fields
      }
    })
  });
  
  return await response.json();
}
```

### Batch Fetch Metrics for Charts
```typescript
async function getWeeklyMetrics(username: string, dates: string[]) {
  const response = await fetch('http://localhost:3000/api/metrics/batch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, dates })
  });
  
  const data = await response.json();
  
  // Use for charts
  const aiAcceptanceRates = data.data.map((day: any) => ({
    date: day.date,
    rate: day.aiExtensionMetrics?.acceptanceRate || 0
  }));
  
  const focusScores = data.data.map((day: any) => ({
    date: day.date,
    score: day.systemEnvironmentMetrics?.focusScore || 0
  }));
  
  return { aiAcceptanceRates, focusScores };
}
```

---

### 3.7 Health Check
**GET** `/`
**Response:**
```json
{
  "success": true,
  "message": "VS Code Typing Tracker API",
  "version": "1.0.0",
  "status": "running"
}
```

---

## 4. Required Actions (CRUD)
- **Create**: POST `/api/activity` (single), POST `/api/activity/batch` (multiple)
- **Read**: 
  - GET `/api/activity` (all activities)
  - GET `/api/metrics/:username/:date` (detailed metrics with all categories)
  - POST `/api/metrics/batch` (multiple dates)
  - GET `/api/activities/:username/:date` (filtered activities)
  - GET `/api/summary/:username/:date` (user summary)
- **Update**: PUT `/api/activity/:id`
- **Delete**: DELETE `/api/activity/:id`
- **Health Check**: GET `/` or GET `/api/health`

### Recommended Frontend Workflows

1. **Dashboard Load**:
   - Fetch today's metrics: `GET /api/metrics/:username/2025-10-31`
   - Display all 7 metric categories in separate widgets
   - Show calculated scores (focus score, code quality, etc.)

2. **Weekly View**:
   - Batch fetch: `POST /api/metrics/batch` with 7 dates
   - Create trend charts for all metric categories
   - Compare AI acceptance rates, focus scores across days

3. **Activity Creation** (from VS Code Extension):
   - POST `/api/activity` with all available metrics
   - Backend normalizes missing fields with defaults
   - Real-time dashboard updates

4. **Detailed Analysis**:
   - GET `/api/activities/:username/:date` with filters
   - Drill down into specific metric categories
   - Export filtered data

## 5. Chart & Visualization Recommendations

### Dashboard Charts

1. **AI Assistance Overview**
   - Type: Donut Chart
   - Data: AI-generated lines vs manual lines
   - Metric: `aiExtensionMetrics.aiTypingRatio`

2. **Focus & Productivity**
   - Type: Multi-line Chart
   - Data: Active time %, Focus score over time
   - Metrics: `systemEnvironmentMetrics.activeTimePercentage`, `focusScore`

3. **Terminal Activity**
   - Type: Stacked Bar Chart
   - Data: Successful vs Failed commands by type
   - Metrics: `terminalUsageMetrics.buildSuccessRate`, `testSuccessRate`

4. **Code Quality Trends**
   - Type: Radial/Gauge Chart
   - Data: Code quality score
   - Metric: `versionControlMetrics.codeQualityScore`

5. **Collaboration Heat Map**
   - Type: Heat Map
   - Data: Commits by hour of day
   - Metric: `versionControlMetrics.peakCommitHour`

6. **CI/CD Pipeline Health**
   - Type: Progress Bar / Success Rate
   - Data: CI success rate
   - Metric: `versionControlMetrics.ciSuccessRate`

### Recommended Chart Libraries
- **Recharts**: React-friendly, great for line/bar/area charts
- **Chart.js**: Versatile, supports all chart types
- **Victory**: Native support for complex data visualizations
- **Nivo**: Beautiful, responsive charts

---

## 6. Real-Time Updates & WebSocket Integration

For real-time dashboard updates when activities are logged:

```typescript
// Server-side (optional enhancement)
import { Server } from 'socket.io';

io.on('connection', (socket) => {
  socket.on('subscribe', ({ username, date }) => {
    socket.join(`${username}:${date}`);
  });
});

// Emit after POST /api/activity
io.to(`${username}:${date}`).emit('activity-updated', metrics);
```

```typescript
// Client-side
import io from 'socket.io-client';

const socket = io('http://localhost:3000');
socket.emit('subscribe', { username: 'dhanu', date: '2025-10-31' });

socket.on('activity-updated', (metrics) => {
  updateDashboard(metrics);
});
```

---

## 10. Best Practices & Implementation Notes

### Data Flow
- All requests/responses use JSON format
- Standard HTTP status codes (200, 201, 400, 404, 500)
- All metric fields are optional - backend normalizes with defaults
- Timestamps in ISO 8601 format
- MongoDB ObjectId for document IDs

### Validation
- Required fields: username, fileName, date, actionType
- All metric objects are optional
- Backend validates ranges (percentages 0-100, non-negative numbers)
- 100+ validation rules ensure data integrity

### Performance Optimization
- Use batch endpoints for multiple dates to reduce requests
- Implement pagination for large activity lists
- Cache frequently accessed metrics
- Use indexes on username, date fields for faster queries
- Lazy load metric categories on demand

### Security Considerations
- Implement authentication/authorization
- Validate user permissions before showing data
- Sanitize user inputs
- Rate limit API endpoints
- Use HTTPS in production

### Extension Compatibility
- All new metric fields are backward compatible
- Missing metrics default to 0 or empty values
- Older extension versions will work (missing new fields)
- Frontend should gracefully handle missing metric categories

---

## 11. Example Next.js Usage
```typescript
// Simple fetch example
fetch('http://localhost:3000/api/activity')
  .then(res => res.json())
  .then(data => console.log(data));

// Fetch with all metrics
async function getDailyDashboard() {
  const response = await fetch('http://localhost:3000/api/metrics/dhanu/2025-10-31');
  const { data } = await response.json();
  
  return {
    textMetrics: data.textMetrics,
    aiMetrics: data.aiExtensionMetrics,
    systemMetrics: data.systemEnvironmentMetrics,
    terminalMetrics: data.terminalUsageMetrics,
    vcMetrics: data.versionControlMetrics
  };
}
```

---

This document can be used as a reference for frontend/backend integration and UI design.
All 7 metric categories are now fully supported with comprehensive aggregation and calculated fields.
