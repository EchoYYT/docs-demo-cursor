"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { AlignLeft, Clock, Eye, Plus, Table2 } from "lucide-react"
import { PageHeader } from "./page-header"
import type { Dispatch, SetStateAction } from "react"
import { ProjectManagementTable } from "./project-management-table"
import { AutomationDrawer } from "./automation-drawer"

export function ProjectManagementView({
  setShowProjectManagementView,
}: {
  setShowProjectManagementView: Dispatch<SetStateAction<boolean>>
}) {
  const [isAutomationDrawerOpen, setIsAutomationDrawerOpen] = React.useState(false)

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <PageHeader
        onBack={() => setShowProjectManagementView(false)}
        onAutomationClick={() => setIsAutomationDrawerOpen(true)}
      />
      <main className="mx-auto w-full max-w-screen-xl flex-1 px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Internet Project Management</h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg?height=24&width=24" alt="You" />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
              <span>You</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Updated just now</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>1</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Q3 Projects</h2>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              className="h-8 px-2 text-sm font-medium border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
            >
              <Table2 className="mr-2 h-4 w-4" />
              Table
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 bg-gray-100">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ProjectManagementTable />
      </main>
      <footer className="fixed bottom-4 right-4 flex flex-col gap-2">
        <Button variant="outline" size="icon" className="rounded-full bg-white shadow-md">
          <AlignLeft className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full bg-white shadow-md">
          ?
        </Button>
      </footer>
      <AutomationDrawer isOpen={isAutomationDrawerOpen} onClose={() => setIsAutomationDrawerOpen(false)} />
    </div>
  )
}
