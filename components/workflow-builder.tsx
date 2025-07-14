"use client"

import * as React from "react"
import { Bot, MoreHorizontal } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { TriggerSelector } from "./trigger-selector"
import type { Automation } from "./automation-drawer"
import { ActionSelector, type Action } from "./action-selector"
import { ActionCard } from "./action-card"

interface WorkflowBuilderProps {
  isOpen: boolean
  onClose: () => void
  onSave: (workflow: Automation) => void
  workflow: Automation | null
}

export function WorkflowBuilder({ isOpen, onClose, onSave, workflow }: WorkflowBuilderProps) {
  const [editedWorkflow, setEditedWorkflow] = React.useState<Automation | null>(workflow)

  React.useEffect(() => {
    setEditedWorkflow(workflow)
  }, [workflow])

  if (!editedWorkflow) return null

  const handleSave = () => {
    onSave(editedWorkflow)
  }

  const handleAddStep = (action: Action) => {
    const newStep = { ...action, instanceId: Date.now() }
    setEditedWorkflow((prev) => {
      if (!prev) return null
      return { ...prev, steps: [...prev.steps, newStep] }
    })
  }

  const handleDeleteStep = (instanceId: number) => {
    setEditedWorkflow((prev) => {
      if (!prev) return null
      return { ...prev, steps: prev.steps.filter((step) => step.instanceId !== instanceId) }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-[85vh] max-h-[85vh] w-full max-w-4xl flex flex-col p-0 gap-0">
        <DialogHeader className="flex flex-row items-center justify-between border-b p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <Bot className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <DialogTitle className="text-lg">
                <Input
                  value={editedWorkflow.name}
                  onChange={(e) => setEditedWorkflow({ ...editedWorkflow, name: e.target.value })}
                  className="border-none text-lg font-semibold p-0 h-auto focus-visible:ring-0"
                  placeholder="Untitled Workflow"
                />
              </DialogTitle>
              <p className="text-sm text-muted-foreground">A brand new workflow</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Never published</span>
            <Button onClick={handleSave}>Finish Up</Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="flex-1 bg-gray-50/50 p-8 overflow-y-auto">
          <div className="mx-auto max-w-2xl">
            <p className="text-muted-foreground mb-8">
              Choose an event to start the workflow, and then add the steps that will follow.
            </p>
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold mb-2">Start the workflow...</h3>
                <TriggerSelector
                  value={editedWorkflow.trigger}
                  onChange={(newTrigger) => setEditedWorkflow({ ...editedWorkflow, trigger: newTrigger })}
                />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Then, do these things</h3>
                <div className="space-y-3">
                  {editedWorkflow.steps.map((step) => (
                    <ActionCard key={step.instanceId} action={step} onDelete={handleDeleteStep} />
                  ))}
                  <ActionSelector onSelect={handleAddStep} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
