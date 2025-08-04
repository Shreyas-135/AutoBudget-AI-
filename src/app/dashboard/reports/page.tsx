
"use client";

import { AnalyticsChart } from "@/components/dashboard/analytics-chart";
import { SpendingBreakdown } from "@/components/dashboard/spending-breakdown";

export default function ReportsPage() {
    return (
        <div className="p-4 sm:px-6">
            <div className="space-y-2 mb-6">
                <h1 className="text-2xl font-bold font-headline tracking-tight">Reports</h1>
                <p className="text-muted-foreground">Analyze your financial performance.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                <AnalyticsChart />
                <SpendingBreakdown />
            </div>
        </div>
    );
}
