"use client"

import * as React from "react"
import {
  Bot,
  FilePlus2,
  FileText,
  Globe,
  KanbanSquare,
  Mail,
  MessageSquare,
  Plus,
  Rows,
  Search,
  Slack,
  Table2,
  Trash2,
  Video,
  Wand2,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export type Action = {
  id: string
  label: string
  icon: LucideIcon
  category: "Datatable" | "Integrations" | "AI Companion" | "General"
}

const actions: Action[] = [
  { id: "docs-notification", label: "Send docs notification", icon: FileText, category: "General" },
  { id: "create-subpage", label: "Create subpage", icon: FilePlus2, category: "General" },
  { id: "datatable-add-row", label: "Add new row", icon: Rows, category: "Datatable" },
  { id: "datatable-update-row", label: "Update existing row", icon: Table2, category: "Datatable" },
  { id: "datatable-delete-row", label: "Delete row", icon: Trash2, category: "Datatable" },
  { id: "datatable-query", label: "Query data", icon: Search, category: "Datatable" },
  { id: "datatable-update-ai", label: "Update AI-generated content", icon: Wand2, category: "Datatable" },
  { id: "gmail-send", label: "Send email via Gmail", icon: Mail, category: "Integrations" },
  { id: "jira-create-issue", label: "Create Jira issue", icon: KanbanSquare, category: "Integrations" },
  { id: "slack-send-message", label: "Send message to Slack", icon: Slack, category: "Integrations" },
  { id: "teamchat-send-message", label: "Send message to Teamchat", icon: MessageSquare, category: "Integrations" },
  { id: "meeting-schedule", label: "Schedule new meeting", icon: Video, category: "General" },
  { id: "ai-generate-content", label: "Generate content with AI", icon: Bot, category: "AI Companion" },
  { id: "http-request", label: "Custom HTTP request", icon: Globe, category: "General" },
]

const categories = ["Datatable", "Integrations", "AI Companion", "General"]

export function ActionSelector({ onSelect }: { onSelect: (action: Action) => void }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredActions = actions.filter((action) => action.label.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start p-4 bg-white">
          <Plus className="mr-2 h-4 w-4" />
          Add step
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-2" align="start">
        <div className="p-2">
          <Input
            placeholder="Search actions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-2"
          />
        </div>
        <div className="max-h-80 overflow-y-auto">
          {categories.map((category) => {
            const categoryActions = filteredActions.filter((a) => a.category === category)
            if (categoryActions.length === 0) return null
            return (
              <div key={category} className="p-1">
                <h4 className="px-2 py-1.5 text-xs font-semibold text-gray-500">{category}</h4>
                {categoryActions.map((action) => (
                  <Button
                    key={action.id}
                    variant="ghost"
                    className="w-full justify-start gap-3"
                    onClick={() => {
                      onSelect(action)
                      setIsOpen(false)
                      setSearchTerm("")
                    }}
                  >
                    <action.icon className="h-4 w-4 text-gray-500" />
                    {action.label}
                  </Button>
                ))}
              </div>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
