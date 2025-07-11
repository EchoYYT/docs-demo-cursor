"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { columnTypes, type ColumnType } from "@/lib/data"
import { Search } from "lucide-react"

interface AddColumnMenuProps {
  onAddColumn: (columnType: ColumnType) => void
}

export function AddColumnMenu({ onAddColumn }: AddColumnMenuProps) {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredTypes = columnTypes.filter((type) => type.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const aiCompanionTypes = filteredTypes.filter((type) => type.category === "AI Companion")
  const generalTypes = filteredTypes.filter((type) => type.category === "General")

  return (
    <div className="w-64 p-2">
      <div className="relative mb-2">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="max-h-80 overflow-y-auto">
        {aiCompanionTypes.length > 0 && (
          <div>
            <h4 className="px-2 py-1.5 text-xs font-semibold text-gray-500">AI Companion</h4>
            {aiCompanionTypes.map((type) => (
              <button
                key={type.name}
                onClick={() => onAddColumn(type)}
                className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
              >
                <type.icon className="h-4 w-4 text-purple-500" />
                <span>{type.name}</span>
              </button>
            ))}
          </div>
        )}
        {generalTypes.length > 0 && (
          <div className="mt-2">
            <h4 className="px-2 py-1.5 text-xs font-semibold text-gray-500">General</h4>
            {generalTypes.map((type) => (
              <button
                key={type.name}
                onClick={() => onAddColumn(type)}
                className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
              >
                <type.icon className="h-4 w-4 text-gray-500" />
                <span>{type.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
