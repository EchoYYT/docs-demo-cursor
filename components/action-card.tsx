"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2 } from "lucide-react"
import type { Action } from "./action-selector"

interface ActionCardProps {
  action: Action & { instanceId: number }
  onDelete: (instanceId: number) => void
}

export function ActionCard({ action, onDelete }: ActionCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <action.icon className="h-5 w-5 text-gray-600" />
            <span className="font-medium">{action.label}</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => onDelete(action.instanceId)}>
            <Trash2 className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
        <div className="mt-4 pl-8 space-y-2">
          {/* Placeholder for action-specific configuration */}
          <div className="flex items-center gap-2">
            <Label htmlFor={`param-${action.instanceId}`} className="w-24">
              Parameter
            </Label>
            <Input id={`param-${action.instanceId}`} placeholder="Configure step..." />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
