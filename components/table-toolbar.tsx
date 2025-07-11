"use client"

import type React from "react"

import {
  ArrowDownUp,
  Database,
  Filter,
  GanttChart,
  KanbanSquare,
  LayoutDashboard,
  Plus,
  Search,
  Settings,
  Table2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Dispatch, SetStateAction } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { viewTypes, type ViewType } from "@/lib/data"
import { cn } from "@/lib/utils"

const viewConfig: Record<ViewType["id"], { icon: React.ElementType; name: string }> = {
  table: { icon: Table2, name: "Table" },
  board: { icon: KanbanSquare, name: "Board" },
  dashboard: { icon: LayoutDashboard, name: "Dashboard" },
  calendar: { icon: GanttChart, name: "Calendar" }, // Placeholder
  gallery: { icon: GanttChart, name: "Gallery" }, // Placeholder
  timeline: { icon: GanttChart, name: "Timeline" }, // Placeholder
  form: { icon: GanttChart, name: "Form" }, // Placeholder
}

export function TableToolbar({
  setShowConfigModal,
  currentView,
  onViewChange,
  activeViews,
  onAddView,
}: {
  setShowConfigModal: Dispatch<SetStateAction<boolean>>
  currentView: ViewType["id"]
  onViewChange: (view: ViewType["id"]) => void
  activeViews: ViewType["id"][]
  onAddView: (view: ViewType["id"]) => void
}) {
  const availableToAdd = viewTypes.filter((v) => !activeViews.includes(v.id))

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        {activeViews.map((viewId) => {
          const config = viewConfig[viewId]
          const Icon = config.icon
          return (
            <Button
              key={viewId}
              variant="outline"
              className={cn(
                "h-8 px-2 text-sm font-medium",
                currentView === viewId
                  ? "border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
                  : "bg-transparent",
              )}
              onClick={() => onViewChange(viewId)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {config.name}
            </Button>
          )
        })}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8 bg-gray-100">
              <Plus className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2">
            <div className="space-y-1">
              {availableToAdd.map((view) => (
                <button
                  key={view.id}
                  onClick={() => onAddView(view.id)}
                  className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <view.icon className="h-4 w-4 text-gray-500" />
                  <span>{view.name}</span>
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Database className="h-4 w-4 text-gray-500" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Filter className="h-4 w-4 text-gray-500" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ArrowDownUp className="h-4 w-4 text-gray-500" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <GanttChart className="h-4 w-4 text-gray-500" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowConfigModal(true)}>
          <Settings className="h-4 w-4 text-gray-500" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Search className="h-4 w-4 text-gray-500" />
        </Button>
        <Button className="h-8 w-8 bg-blue-600 p-0 text-white hover:bg-blue-700">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
