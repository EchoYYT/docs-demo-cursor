"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Clock, Eye, Plus, Table2 } from "lucide-react"
import { PageHeader } from "./page-header"
import type { Dispatch, SetStateAction } from "react"
import { MeetingTable } from "./meeting-table"
import { AutomationDrawer } from './automation/AutomationDrawer';
import { GenericTableView, type ViewRenderer } from "./generic-table-view"
import {
  type TableConfig,
  type CustomColumn,
  type ColumnType,
  type SalesMeeting,
} from "@/lib/data"

// Lazy load heavy components
const KanbanBoard = React.lazy(() => import("./kanban-board"))
const DashboardView = React.lazy(() => import("./dashboard-view"))

export function MeetingTableView({
  setShowMeetingTableView,
  config,
  setShowConfigModal,
  meetings,
  setMeetings,
  customColumns,
  onAddColumn,
}: {
  setShowMeetingTableView: Dispatch<SetStateAction<boolean>>
  config: TableConfig
  setShowConfigModal: Dispatch<SetStateAction<boolean>>
  meetings: SalesMeeting[]
  setMeetings: Dispatch<SetStateAction<SalesMeeting[]>>
  customColumns: CustomColumn[]
  onAddColumn: (columnType: ColumnType) => void
}) {
  const [isAutomationDrawerOpen, setIsAutomationDrawerOpen] = React.useState(false)

  const handleStageChange = (meetingId: string, newStage: SalesMeeting["stage"]) => {
    setMeetings((prevMeetings) => prevMeetings.map((m) => (m.id === meetingId ? { ...m, stage: newStage } : m)))
  }

  // 定义视图渲染器
  const viewRenderers: ViewRenderer<SalesMeeting> = {
    table: (data, props) => (
      <MeetingTable 
        config={config} 
        meetings={data} 
        customColumns={customColumns} 
        onAddColumn={onAddColumn} 
      />
    ),
    board: (data, props) => (
      <KanbanBoard meetings={data} onStageChange={handleStageChange} />
    ),
    dashboard: (data, props) => (
      <DashboardView meetings={data} />
    ),
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <PageHeader
        onBack={() => setShowMeetingTableView(false)}
        onAutomationClick={() => setIsAutomationDrawerOpen(true)}
      />
      <main className="mx-auto w-full max-w-screen-xl flex-1 px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Meetings with Customers</h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Diane Yang" />
                <AvatarFallback>DY</AvatarFallback>
              </Avatar>
              <span>Diane Yang</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Updated 3 hours ago</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>1</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Sales Meetings</h2>
        </div>

        <GenericTableView
          data={meetings}
          viewRenderers={viewRenderers}
          setShowConfigModal={setShowConfigModal}
          defaultView="table"
          defaultActiveViews={["table"]}
        />
      </main>

      <footer className="fixed bottom-4 right-4 flex flex-col gap-2">
        <Button variant="outline" size="icon" className="rounded-full bg-white shadow-md">
          <Plus className="h-5 w-5" />
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