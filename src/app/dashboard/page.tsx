import { OverviewCards } from "@/components/dashboard/overview-cards";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { AIAdvisor } from "@/components/dashboard/ai-advisor";
import { AnalyticsChart } from "@/components/dashboard/analytics-chart";
import { SpendingBreakdown } from "@/components/dashboard/spending-breakdown";
import { StockAdvisor } from "@/components/dashboard/stock-advisor";
import { BudgetGoals } from "@/components/dashboard/budget-goals";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Here's a summary of your financial activity.</p>
      </div>
      <OverviewCards />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
            <AnalyticsChart />
        </div>
         <div className="lg:col-span-3">
            <SpendingBreakdown />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <RecentTransactions />
        </div>
        <div className="lg:col-span-3">
          <AIAdvisor />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-3">
          <BudgetGoals />
        </div>
        <div className="lg:col-span-4">
          <StockAdvisor />
        </div>
      </div>
    </div>
  );
}
