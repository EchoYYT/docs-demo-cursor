"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SalesMeeting } from "@/lib/data"

interface DashboardViewProps {
  meetings: SalesMeeting[]
}

// Default export is necessary for React.lazy to work
export default function DashboardView({ meetings }: DashboardViewProps) {
  const wonCustomers = React.useMemo(() => {
    return meetings.filter((m) => m.stage === "Closed - Won").length
  }, [meetings])

  const stageDistribution = React.useMemo(() => {
    const stages: { [key: string]: number } = {
      "Initial Contact": 0,
      Qualification: 0,
      Proposal: 0,
      Negotiation: 0,
      "Closed - Won": 0,
      "Closed - Lost": 0,
    }
    meetings.forEach((m) => {
      if (stages[m.stage] !== undefined) {
        stages[m.stage]++
      }
    })
    return Object.entries(stages).map(([name, value]) => ({ name, customers: value }))
  }, [meetings])

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Won Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold">{wonCustomers}</div>
          <p className="text-sm text-muted-foreground">Total customers successfully closed.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Customer Stage Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stageDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="customers" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
