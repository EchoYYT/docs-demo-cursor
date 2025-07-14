"use client"

import { useState } from "react"
import { MainContent } from "@/components/main-content"
import { Sidebar } from "@/components/sidebar"
import { ConfigureSync } from "@/components/configure-sync"
import { ConfigModal } from "@/components/config-modal"
import {
  type TableConfig,
  type CustomColumn,
  type ColumnType,
  salesMeetingsData,
  type SalesMeeting,
  mockInsights,
} from "@/lib/data"
import { ProjectManagementView } from "@/components/project-management-view"
import { MeetingTableView } from "@/components/meeting-table-view"
import dynamic from 'next/dynamic';
const Toaster = dynamic(() => import('@/components/ui/toaster'), { ssr: false });


export default function DashboardPage() {
  const [showConfigureScreen, setShowConfigureScreen] = useState(false)
  const [showProjectManagementView, setShowProjectManagementView] = useState(false)
  const [showMeetingTableView, setShowMeetingTableView] = useState(false)
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [tableConfig, setTableConfig] = useState<TableConfig>({
    includeSummary: true,
    includeRecordings: true,
  })
  const [customColumns, setCustomColumns] = useState<CustomColumn[]>([])
  const [meetings, setMeetings] = useState<SalesMeeting[]>(salesMeetingsData)



  const handleAddColumn = (columnType: ColumnType) => {
    const newColumn: CustomColumn = {
      id: `col_${Date.now()}`,
      name: columnType.name,
      type: columnType.type,
      icon: columnType.icon,
    }
    setCustomColumns((prev) => [...prev, newColumn])

    if (columnType.type === "ai_insights") {
      setMeetings((prevMeetings) =>
        prevMeetings.map((m) => ({
          ...m,
          [newColumn.id]: mockInsights[Math.floor(Math.random() * mockInsights.length)],
        })),
      )
    } else {
      setMeetings((prevMeetings) => prevMeetings.map((m) => ({ ...m, [newColumn.id]: "" })))
    }
  }

  const handleRecentItemClick = (docId: number) => {
    if (docId === 17) {
      setShowConfigureScreen(true)
    } else if (docId === 19) {
      setShowProjectManagementView(true)
    }
  }

  if (showConfigureScreen) {
    return (
      <>
        <ConfigureSync
          setShowConfigureScreen={setShowConfigureScreen}
          setShowMeetingTableView={setShowMeetingTableView}
          setTableConfig={setTableConfig}
        />
        <Toaster />
      </>
    )
  }

  if (showMeetingTableView) {
    return (
      <>
        <MeetingTableView 
          setShowMeetingTableView={setShowMeetingTableView}
          config={tableConfig}
          setShowConfigModal={setShowConfigModal}
          meetings={meetings}
          setMeetings={setMeetings}
          customColumns={customColumns}
          onAddColumn={handleAddColumn}
        />
        <ConfigModal
          isOpen={showConfigModal}
          onClose={() => setShowConfigModal(false)}
          config={tableConfig}
          onConfigChange={setTableConfig}
        />
        <Toaster />
      </>
    )
  }

  if (showProjectManagementView) {
    return (
      <>
        <ProjectManagementView setShowProjectManagementView={setShowProjectManagementView} />
        <Toaster />
      </>
    )
  }



  return (
    <>
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <MainContent onRecentItemClick={handleRecentItemClick} />
      </div>
      {/* Toaster 保留，动态导入避免 SSR hydration 问题 */}
      <Toaster />
    </>
  )
}
