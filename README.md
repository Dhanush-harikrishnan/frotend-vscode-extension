# VS Code Typing Tracker Dashboard

A comprehensive Next.js web dashboard to visualize, manage, and analyze coding activity logs collected by the VS Code Typing Tracker extension.

## 🚀 Features

### Dashboard Analytics
- **Real-time Activity Tracking**: Monitor typed vs pasted lines, daily/weekly stats
- **Advanced Charts**: Multi-tab analytics with trend analysis, user distribution, and activity types
- **Comprehensive Metrics**: Track 7 different metric categories:
  - Text & Performance Metrics
  - AI & Extension Usage
  - System & Environment
  - Terminal Usage
  - Version Control & Git
  - File Operations
  - Command Execution

### User Management
- **User Analytics**: Per-user statistics with productivity badges
- **Leaderboards**: Top contributors, AI power users, commit champions
- **Activity Streaks**: Track consecutive coding days and patterns

### Settings & Configuration
- **API Configuration**: Customize backend endpoint
- **Data Management**: Export/import settings, dark mode
- **Notifications**: Configurable alerts and preferences

## 📊 Metric Categories

1. **Text Metrics** - Lines typed/pasted/deleted, words, characters
2. **File Metrics** - Files edited, opened, closed, created
3. **Performance Metrics** - Typing speed (KPM, WPM), bursts, session duration
4. **Command Metrics** - Commands executed, most used commands
5. **AI Extension Metrics** - AI suggestions, acceptance rates, providers
6. **System Environment Metrics** - Active time, CPU/memory usage, focus score
7. **Terminal Usage Metrics** - Command execution, success rates, build/test metrics
8. **Version Control Metrics** - Commits, PRs, code churn, CI/CD, collaboration scores

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.0 with App Router
- **UI Library**: React 18.2.0
- **Styling**: Tailwind CSS 4.1.9
- **Components**: Radix UI, shadcn/ui
- **Charts**: Recharts
- **Data Fetching**: SWR
- **Forms**: React Hook Form + Zod
- **Theme**: next-themes (dark mode support)
- **Language**: TypeScript 5

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/pnpm
- MongoDB backend running (see backend setup)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dhanush-harikrishnan/frotend-vscode-extension.git
   cd frotend-vscode-extension
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure environment**
   ```bash
   # Create .env file
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Run development server**
   ```bash
   npm run dev
   # or
   PORT=5000 npm run dev
   ```

5. **Open browser**
   ```
   http://localhost:3000
   # or if using PORT=5000
   http://localhost:5000
   ```

## 🔌 API Endpoints

### Activity Endpoints
- `GET /api/activity` - Get all activities
- `POST /api/activity` - Create a single activity
- `POST /api/activity/batch` - Create multiple activities
- `PUT /api/activity/:id` - Update an activity
- `DELETE /api/activity/:id` - Delete an activity

### Metrics Endpoints
- `GET /api/metrics/:username/:date` - Get detailed metrics for a user and date
- `POST /api/metrics/batch` - Get metrics for multiple dates
- `GET /api/summary/:username/:date` - Get user summary
- `GET /api/activities/:username/:date` - Get filtered activities with pagination

### Health Check
- `GET /api/health` - API health status

## 📖 Documentation

- [Frontend & API Design Specification](docs/frontend-api-design.md)
- [API Usage Guide with Examples](docs/API_USAGE.md)
- [Setup Complete Guide](SETUP_COMPLETE.md)

## 💻 Usage Examples

### Fetch Daily Metrics

```typescript
import { useMetrics } from "@/hooks/use-activity"

function DashboardPage() {
  const { metrics, isLoading } = useMetrics("username", "2025-10-31")

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <p>AI Acceptance Rate: {metrics.aiExtensionMetrics.acceptanceRate}%</p>
      <p>Focus Score: {metrics.systemEnvironmentMetrics.focusScore}</p>
      <p>Build Success Rate: {metrics.terminalUsageMetrics.buildSuccessRate}%</p>
      <p>Code Quality Score: {metrics.versionControlMetrics.codeQualityScore}</p>
    </div>
  )
}
```

### Create Activity with Metrics

```typescript
import { createActivity } from "@/hooks/use-activity"

const activity = {
  username: "dhanu",
  fileName: "app.ts",
  date: "2025-10-31",
  actionType: "typing",
  typedLines: 10,
  aiExtensionMetrics: {
    aiSuggestionsShown: 20,
    aiSuggestionsAccepted: 15,
    aiProvider: "GitHub Copilot",
  },
  systemEnvironmentMetrics: {
    activeCodingTime: 300000,
    focusScore: 95.5,
  },
}

const result = await createActivity(activity)
```

See [API_USAGE.md](docs/API_USAGE.md) for more examples.

## 🎨 UI Components

### Dashboard
- Enhanced stats grid with 6 metric cards
- Multi-tab activity analytics (Trend, Users, Types)
- Real-time data updates with SWR

### User Analytics
- User profile cards with avatars and badges
- Productivity tracking and streaks
- Progress bars for efficiency metrics
- Overview statistics

### Settings
- Tabbed interface (API, Display, Notifications, Advanced)
- Import/export configuration
- Real-time API status monitoring
- Dark mode support

## 🔧 Configuration

### Environment Variables

```bash
# Backend API URL (required)
NEXT_PUBLIC_API_URL=http://localhost:3000

# Optional: Analytics
VERCEL_ANALYTICS_ID=your_analytics_id
```

### Customization

- **Theme**: Modify `app/globals.css` for color schemes
- **Charts**: Configure chart types in components
- **API URL**: Update `.env` for production backend

## 🚦 Running the Full Stack

### 1. Start MongoDB Backend
```bash
cd vscode-typing-tracker/server
npm run dev
# Running on http://localhost:3000
```

### 2. Start Next.js Frontend
```bash
cd typing-tracker
PORT=5000 npm run dev
# Running on http://localhost:5000
```

### 3. Configure VS Code Extension
Point the extension to your backend: `http://localhost:3000`

## 📝 Project Structure

```
typing-tracker/
├── app/
│   ├── api/              # API routes (proxy to backend)
│   ├── dashboard/        # Dashboard page
│   ├── logs/            # Activity logs page
│   ├── settings/        # Settings page
│   └── users/           # User analytics page
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── activity-chart.tsx
│   ├── stats-grid.tsx
│   └── user-summary-grid.tsx
├── hooks/
│   ├── use-activity.ts  # Custom API hooks
│   └── use-toast.ts
├── lib/
│   ├── types/
│   │   └── activity.ts  # TypeScript types
│   └── utils.ts
├── docs/
│   ├── frontend-api-design.md
│   └── API_USAGE.md
└── public/
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Links

- **Repository**: https://github.com/Dhanush-harikrishnan/frotend-vscode-extension
- **Backend**: https://github.com/Dhanush-harikrishnan/vscode-typing-tracker
- **Issues**: https://github.com/Dhanush-harikrishnan/frotend-vscode-extension/issues

## 📧 Support

For support, email your-email@example.com or open an issue on GitHub.

---

Built with ❤️ by [Dhanush Harikrishnan](https://github.com/Dhanush-harikrishnan)
