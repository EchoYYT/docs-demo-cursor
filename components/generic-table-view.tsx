"use client"

import * as React from "react"
import { TableToolbar } from "./table-toolbar"
import {
  type ViewType,
} from "@/lib/data"

// 通用视图渲染器接口
interface ViewRenderer<T = any> {
  table?: (data: T[], props: any) => React.ReactNode
  board?: (data: T[], props: any) => React.ReactNode
  dashboard?: (data: T[], props: any) => React.ReactNode
  calendar?: (data: T[], props: any) => React.ReactNode
  gallery?: (data: T[], props: any) => React.ReactNode
  timeline?: (data: T[], props: any) => React.ReactNode
  form?: (data: T[], props: any) => React.ReactNode
}

interface GenericTableViewProps<T = any> {
  data: T[]
  viewRenderers: ViewRenderer<T>
  viewProps?: any
  setShowConfigModal?: React.Dispatch<React.SetStateAction<boolean>>
  defaultView?: ViewType["id"]
  defaultActiveViews?: ViewType["id"][]
  className?: string
  children?: React.ReactNode
}

export function GenericTableView<T = any>({
  data,
  viewRenderers,
  viewProps = {},
  setShowConfigModal,
  defaultView = "table",
  defaultActiveViews = ["table"],
  className = "",
  children
}: GenericTableViewProps<T>) {
  const [activeViews, setActiveViews] = React.useState<ViewType["id"][]>(defaultActiveViews)
  const [currentView, setCurrentView] = React.useState<ViewType["id"]>(defaultView)

  const handleAddView = (view: ViewType["id"]) => {
    if (!activeViews.includes(view)) {
      setActiveViews((prev) => [...prev, view])
    }
    setCurrentView(view)
  }

  const renderContent = () => {
    const renderer = viewRenderers[currentView]
    if (!renderer) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500">
          View "{currentView}" not implemented
        </div>
      )
    }

    return (
      <React.Suspense fallback={<div className="flex items-center justify-center h-64">Loading...</div>}>
        {renderer(data, viewProps)}
      </React.Suspense>
    )
  }

  return (
    <div className={className}>
      {/* 工具栏 */}
      <div className="mb-4">
        <TableToolbar
          setShowConfigModal={setShowConfigModal || (() => {})}
          currentView={currentView}
          onViewChange={setCurrentView}
          activeViews={activeViews}
          onAddView={handleAddView}
        />
      </div>

      {/* 自定义内容（可选） */}
      {children}

      {/* 视图内容 */}
      {renderContent()}
    </div>
  )
}

// 导出类型供其他组件使用
export type { ViewRenderer } 