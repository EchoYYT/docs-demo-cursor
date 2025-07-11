"use client"

import * as React from "react"
import {
  CalendarClock,
  Check,
  ChevronDown,
  Clock,
  FileEdit,
  FilePlus2,
  Filter,
  MousePointerClick,
  Webhook,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Badge } from "./ui/badge"

const triggerTypes = [
  {
    id: "record-added",
    label: "When a record is added",
    icon: FilePlus2,
    color: "text-orange-500",
  },
  {
    id: "record-modified",
    label: "When a record is modified",
    icon: FileEdit,
    color: "text-pink-500",
  },
  {
    id: "record-matches-conditions",
    label: "When a new/modified record meets conditions",
    icon: Filter,
    color: "text-purple-500",
  },
  {
    id: "date-reached",
    label: "When a time in the record is reached",
    icon: CalendarClock,
    color: "text-green-500",
  },
  {
    id: "scheduled-time",
    label: "Scheduled trigger",
    icon: Clock,
    color: "text-blue-500",
  },
  {
    id: "button-clicked",
    label: "When a button is clicked",
    icon: MousePointerClick,
    color: "text-gray-700",
  },
  {
    id: "webhook-received",
    label: "When a webhook is received",
    icon: Webhook,
    color: "text-rose-500",
    isPremium: true,
  },
]

export function TriggerSelector({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const selectedTrigger = triggerTypes.find((t) => t.id === value) || triggerTypes[0]

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="w-full justify-between bg-transparent"
        >
          <div className="flex items-center gap-2">
            <selectedTrigger.icon className={cn("h-4 w-4", selectedTrigger.color)} />
            {selectedTrigger.label}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-1">
        <div className="space-y-1">
          {triggerTypes.map((trigger) => (
            <Button
              key={trigger.id}
              variant="ghost"
              className="w-full justify-start gap-3 h-auto py-2"
              onClick={() => {
                onChange(trigger.id)
                setIsOpen(false)
              }}
            >
              <trigger.icon className={cn("h-5 w-5", trigger.color)} />
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <span className="text-sm">{trigger.label}</span>
                  {trigger.isPremium && (
                    <Badge variant="outline" className="ml-2 text-orange-500 border-orange-200 bg-orange-50">
                      Value-added
                    </Badge>
                  )}
                </div>
              </div>
              <Check className={cn("ml-auto h-4 w-4", value === trigger.id ? "opacity-100" : "opacity-0")} />
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
