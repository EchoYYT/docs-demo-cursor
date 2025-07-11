"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { TableConfig } from "@/lib/data"

interface ConfigModalProps {
  isOpen: boolean
  onClose: () => void
  config: TableConfig
  onConfigChange: (newConfig: TableConfig) => void
}

export function ConfigModal({ isOpen, onClose, config, onConfigChange }: ConfigModalProps) {
  const [localConfig, setLocalConfig] = React.useState(config)

  React.useEffect(() => {
    setLocalConfig(config)
  }, [config, isOpen])

  const handleSave = () => {
    onConfigChange(localConfig)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Customize Table</DialogTitle>
          <DialogDescription>Select the fields you want to display in the meeting table.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="summary-visibility">Show Summary</Label>
            <Switch
              id="summary-visibility"
              checked={localConfig.includeSummary}
              onCheckedChange={(checked) => setLocalConfig((prev) => ({ ...prev, includeSummary: checked }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="recordings-visibility">Show Recordings</Label>
            <Switch
              id="recordings-visibility"
              checked={localConfig.includeRecordings}
              onCheckedChange={(checked) => setLocalConfig((prev) => ({ ...prev, includeRecordings: checked }))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
