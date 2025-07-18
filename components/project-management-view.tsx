"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { AlignLeft, Clock, Eye, Plus, Table2 } from "lucide-react"
import { PageHeader } from "./page-header"
import type { Dispatch, SetStateAction } from "react"
import { ProjectTable } from "./project-table"
import { projectManagementData, type Project } from "@/lib/data"
import { AutomationDrawer } from './automation/AutomationDrawer';
import { GenericTableView, type ViewRenderer } from "./generic-table-view"

export function ProjectManagementView({
  setShowProjectManagementView,
}: {
  setShowProjectManagementView: Dispatch<SetStateAction<boolean>>
}) {
  const [isAutomationDrawerOpen, setIsAutomationDrawerOpen] = React.useState(false)

  // 定义视图渲染器
  const viewRenderers: ViewRenderer<Project> = {
    table: (data, props) => (
      <ProjectTable data={data} />
    ),
    // 可以在这里添加更多视图类型，比如项目看板、甘特图等
  }

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

        <GenericTableView
          data={projectManagementData}
          viewRenderers={viewRenderers}
          defaultView="table"
          defaultActiveViews={["table"]}
        />
      </main>
      <footer className="fixed bottom-4 right-4 flex flex-col gap-2">
        <Button variant="outline" size="icon" className="rounded-full bg-white shadow-md">
          <AlignLeft className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full bg-white shadow-md">
          ?
        </Button>
      </footer>
      {/* 新版自动化 Drawer */}
      <AutomationDrawer 
        isOpen={isAutomationDrawerOpen} 
        onClose={() => setIsAutomationDrawerOpen(false)} 
      />
    </div>
  )
}
