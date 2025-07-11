"use client"

import * as React from "react"
import { DndContext, useDraggable, useDroppable, type DragEndEvent } from "@dnd-kit/core"
import { Badge } from "@/components/ui/badge"
import type { SalesMeeting } from "@/lib/data"
import { Building, Clock, Mail, MoreHorizontal, Plus, User } from "lucide-react"
import { Button } from "./ui/button"

const STAGES: SalesMeeting["stage"][] = [
  "Initial Contact",
  "Qualification",
  "Proposal",
  "Negotiation",
  "Closed - Won",
  "Closed - Lost",
]

interface KanbanCardProps {
  meeting: SalesMeeting
}

function KanbanCard({ meeting }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: meeting.id,
    data: meeting,
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="mb-4 rounded-lg border bg-white p-4 shadow-sm"
    >
      <div className="mb-2 flex items-center justify-between">
        <p className="font-semibold text-gray-800">{meeting.topic}</p>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <MoreHorizontal className="h-4 w-4 text-gray-500" />
        </Button>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-400" />
          <span>{meeting.customer}</span>
        </div>
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-gray-400" />
          <span>{meeting.company}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-gray-400" />
          <span className="text-blue-600">{meeting.contact}</span>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>{meeting.time.split(" ")[0]}</span>
          </div>
          <Badge variant="secondary" className="font-mono text-xs">
            {meeting.id}
          </Badge>
        </div>
      </div>
    </div>
  )
}

interface KanbanColumnProps {
  stage: SalesMeeting["stage"]
  meetings: SalesMeeting[]
}

function KanbanColumn({ stage, meetings }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: stage,
  })

  return (
    <div ref={setNodeRef} className="w-72 flex-shrink-0 rounded-lg bg-gray-100/60 p-2">
      <div className="mb-4 flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-700">{stage}</h3>
          <Badge variant="secondary" className="text-xs">
            {meetings.length}
          </Badge>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Plus className="h-4 w-4 text-gray-500" />
        </Button>
      </div>
      <div className="h-full overflow-y-auto">
        {meetings.map((meeting) => (
          <KanbanCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  )
}

interface KanbanBoardProps {
  meetings: SalesMeeting[]
  onStageChange: (meetingId: string, newStage: SalesMeeting["stage"]) => void
}

// Default export is necessary for React.lazy to work
export default function KanbanBoard({ meetings, onStageChange }: KanbanBoardProps) {
  const meetingsByStage = React.useMemo(() => {
    const grouped: { [key: string]: SalesMeeting[] } = {}
    STAGES.forEach((stage) => {
      grouped[stage] = meetings.filter((m) => m.stage === stage)
    })
    return grouped
  }, [meetings])

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event
    if (over && active.id && over.id !== active.data.current?.stage) {
      onStageChange(active.id as string, over.id as SalesMeeting["stage"])
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-6 overflow-x-auto p-1 pb-4">
        {STAGES.map((stage) => (
          <KanbanColumn key={stage} stage={stage} meetings={meetingsByStage[stage]} />
        ))}
        <div className="w-72 flex-shrink-0">
          <Button variant="ghost" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            New group
          </Button>
        </div>
      </div>
    </DndContext>
  )
}
