import { DashboardHeader } from "@/components/dashboard-header"
import { StatsGrid } from "@/components/stats-grid"
import { ActivityChart } from "@/components/activity-chart"

export default function DashboardPage() {
  return (
    <div>
      <DashboardHeader />
      <StatsGrid />
      <div className="grid gap-6 mt-6">
        <ActivityChart />
      </div>
    </div>
  )
}
