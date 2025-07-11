"use client"

import * as React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Plus, Trash } from "lucide-react"
import { Button } from "./ui/button"
import { Switch } from "./ui/switch"
import { WorkflowBuilder } from "./workflow-builder"
import type { Action } from "./action-selector"
import { useToast } from "@/hooks/use-toast"

export type Automation = {
  id: number
  name: string
  enabled: boolean
  trigger: string
  steps: (Action & { instanceId: number })[]
}

const initialAutomations: Automation[] = [
  {
    id: 1,
    name: "Notify #general when a task is done",
    enabled: true,
    trigger: "record-modified",
    steps: [],
  },
  {
    id: 2,
    name: "Email project lead when a new task is added",
    enabled: false,
    trigger: "record-added",
    steps: [],
  },
]

export function AutomationDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [automations, setAutomations] = React.useState(initialAutomations)
  const [isBuilderOpen, setIsBuilderOpen] = React.useState(false)
  const [activeWorkflow, setActiveWorkflow] = React.useState<Automation | null>(null)
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = React.useState(false)
  const [automationToDelete, setAutomationToDelete] = React.useState<number | null>(null)
  const { toast } = useToast()

  const handleAddNew = () => {
    const newWorkflow: Automation = {
      id: Date.now(),
      name: "Untitled Workflow",
      enabled: false,
      trigger: "record-added",
      steps: [],
    }
    setActiveWorkflow(newWorkflow)
    setIsBuilderOpen(true)
  }

  const handleEdit = (workflow: Automation) => {
    setActiveWorkflow(workflow)
    setIsBuilderOpen(true)
  }

  const handleSaveWorkflow = (workflowToSave: Automation) => {
    const exists = automations.some((auto) => auto.id === workflowToSave.id)
    if (exists) {
      setAutomations((prev) => prev.map((auto) => (auto.id === workflowToSave.id ? workflowToSave : auto)))
    } else {
      setAutomations((prev) => [...prev, workflowToSave])
    }
    setIsBuilderOpen(false)
    setActiveWorkflow(null)

    toast({
      title: "Workflow Saved",
      description: `"${workflowToSave.name}" has been successfully saved.`,
    })
  }

  const handleDelete = (id: number) => {
    setAutomationToDelete(id)
    setIsDeleteAlertOpen(true)
  }

  const handleConfirmDelete = () => {
    if (automationToDelete !== null) {
      setAutomations((prev) => prev.filter((auto) => auto.id !== automationToDelete))
    }
    setIsDeleteAlertOpen(false)
    setAutomationToDelete(null)
  }

  const handleToggle = (id: number, enabled: boolean) => {
    setAutomations((prev) => prev.map((auto) => (auto.id === id ? { ...auto, enabled } : auto)))
  }

  return (
    <>
      <Drawer open={isOpen} onClose={onClose}>
        <DrawerContent className="h-[85vh]">
          <div className="mx-auto w-full max-w-4xl">
            <DrawerHeader>
              <DrawerTitle className="text-2xl">Automations</DrawerTitle>
              <DrawerDescription>Create workflows to automate tasks in this table.</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="flex items-center justify-end">
                <Button onClick={handleAddNew}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add new automation
                </Button>
              </div>
              <div className="mt-4 space-y-2">
                {automations.map((automation) => (
                  <div key={automation.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <Switch
                        checked={automation.enabled}
                        onCheckedChange={(checked) => handleToggle(automation.id, checked)}
                      />
                      <p className="font-medium">{automation.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" onClick={() => handleEdit(automation)}>
                        Edit
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="text-red-500" onClick={() => handleDelete(automation.id)}>
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <WorkflowBuilder
        isOpen={isBuilderOpen}
        onClose={() => {
          setIsBuilderOpen(false)
          setActiveWorkflow(null) // Reset the active workflow on close
        }}
        onSave={handleSaveWorkflow}
        workflow={activeWorkflow}
      />

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this automation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
