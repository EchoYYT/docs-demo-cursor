"use client"

import * as React from "react"
import { lazy, Suspense } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { ColumnType, CustomColumn, SalesMeeting, TableConfig, ViewType } from "@/lib/data"
import { AlignLeft, Clock, Eye } from "lucide-react"
import { PageHeader } from "./page-header"
import { TableToolbar } from "./table-toolbar"
import type { Dispatch, SetStateAction } from "react"
import { MeetingTable } from "./meeting-table"

const KanbanBoard = lazy(() => import("./kanban-board"))
const DashboardView = lazy(() => import("./dashboard-view"))

function ViewLoader() {
  return (
    <div className="flex h-96 items-center justify-center rounded-lg border bg-background">
      <p className="text-muted-foreground">Loading view...</p>
    </div>
  )
}

export function SalesView({
  config,
  setShowConfigModal,
  meetings,
  setMeetings,
  customColumns,
  onAddColumn,
  setShowMeetingTable,
}: {
  config: TableConfig
  setShowConfigModal: Dispatch<SetStateAction<boolean>>
  meetings: SalesMeeting[]
  setMeetings: Dispatch<SetStateAction<SalesMeeting[]>>
  customColumns: CustomColumn[]
  onAddColumn: (columnType: ColumnType) => void
  setShowMeetingTable: Dispatch<SetStateAction<boolean>>
}) {
  const [activeViews, setActiveViews] = React.useState<ViewType["id"][]>(["table"])
  const [currentView, setCurrentView] = React.useState<ViewType["id"]>("table")

  const handleAddView = (view: ViewType["id"]) => {
    if (!activeViews.includes(view)) {
      setActiveViews((prev) => [...prev, view])
    }
    setCurrentView(view)
  }

  const handleStageChange = (meetingId: string, newStage: SalesMeeting["stage"]) => {
    setMeetings((prevMeetings) => prevMeetings.map((m) => (m.id === meetingId ? { ...m, stage: newStage } : m)))
  }

  const renderContent = () => {
    switch (currentView) {
      case "table":
        return (
          <MeetingTable config={config} meetings={meetings} customColumns={customColumns} onAddColumn={onAddColumn} />
        )
      case "board":
        return <KanbanBoard meetings={meetings} onStageChange={handleStageChange} />
      case "dashboard":
        return <DashboardView meetings={meetings} />
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <PageHeader setShowMeetingTable={setShowMeetingTable} />
      <main className="mx-auto w-full max-w-screen-xl flex-1 px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Sales Follow-up Meetings</h1>
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
              <span>Updated at 15:47 07/09/2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>1</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>2 mins</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Q3 Sales Pipeline</h2>
        </div>

        <TableToolbar
          setShowConfigModal={setShowConfigModal}
          currentView={currentView}
          onViewChange={setCurrentView}
          activeViews={activeViews}
          onAddView={handleAddView}
        />
        <div className="mt-4">
          <Suspense fallback={<ViewLoader />}>{renderContent()}</Suspense>
        </div>
      </main>
      <footer className="fixed bottom-4 right-4 flex flex-col gap-2">
        <Button variant="outline" size="icon" className="rounded-full bg-white shadow-md">
          <AlignLeft className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full bg-white shadow-md">
          ?
        </Button>
      </footer>
    </div>
  )
}
