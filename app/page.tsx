"use client"

import { useState } from "react"
import { MainContent } from "@/components/main-content"
import { Sidebar } from "@/components/sidebar"
import { ConfigureSync } from "@/components/configure-sync"
import { SalesView } from "@/components/sales-view"
import { ConfigModal } from "@/components/config-modal"
import {
  type TableConfig,
  type CustomColumn,
  type ColumnType,
  salesMeetingsData,
  type SalesMeeting,
  mockInsights,
} from "@/lib/data"

export default function DashboardPage() {
  const [showConfigureScreen, setShowConfigureScreen] = useState(false)
  const [showMeetingTable, setShowMeetingTable] = useState(false)
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

  if (showMeetingTable) {
    return (
      <>
        <SalesView
          config={tableConfig}
          setShowConfigModal={setShowConfigModal}
          meetings={meetings}
          setMeetings={setMeetings}
          customColumns={customColumns}
          onAddColumn={handleAddColumn}
          setShowMeetingTable={setShowMeetingTable}
        />
        <ConfigModal
          isOpen={showConfigModal}
          onClose={() => setShowConfigModal(false)}
          config={tableConfig}
          onConfigChange={setTableConfig}
        />
      </>
    )
  }

  if (showConfigureScreen) {
    return (
      <ConfigureSync
        setShowConfigureScreen={setShowConfigureScreen}
        setShowMeetingTable={setShowMeetingTable}
        setTableConfig={setTableConfig}
      />
    )
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <MainContent setShowConfigureScreen={setShowConfigureScreen} />
    </div>
  )
}
