"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart as BarChartIcon } from "lucide-react"

const data = [
  { month: "Jan", income: 4000, expenses: 2400 },
  { month: "Feb", income: 3000, expenses: 1398 },
  { month: "Mar", income: 2000, expenses: 9800 },
  { month: "Apr", income: 2780, expenses: 3908 },
  { month: "May", income: 1890, expenses: 4800 },
  { month: "Jun", income: 2390, expenses: 3800 },
]

export function AnalyticsChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <BarChartIcon className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline">Analytics</CardTitle>
        </div>
        <CardDescription>
          Your income and expenses over the last 6 months.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
         <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                    contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))'
                    }}
                />
                <Bar dataKey="income" fill="hsl(var(--accent))" name="Income" radius={[4, 4, 0, 0]}/>
                <Bar dataKey="expenses" fill="hsl(var(--primary))" name="Expenses" radius={[4, 4, 0, 0]}/>
            </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
