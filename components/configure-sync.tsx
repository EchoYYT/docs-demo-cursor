"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { CalendarIcon, Users, Video } from "lucide-react"
import type { Dispatch, SetStateAction } from "react"
import { format } from "date-fns"
import * as React from "react"
import type { DateRange } from "react-day-picker"
import type { TableConfig } from "@/lib/data"

export function ConfigureSync({
  setShowConfigureScreen,
  setShowMeetingTable,
  setTableConfig,
}: {
  setShowConfigureScreen: Dispatch<SetStateAction<boolean>>
  setShowMeetingTable: Dispatch<SetStateAction<boolean>>
  setTableConfig: Dispatch<SetStateAction<TableConfig>>
}) {
  const [date, setDate] = React.useState<DateRange | undefined>()
  const [includeSummary, setIncludeSummary] = React.useState(true)
  const [includeRecordings, setIncludeRecordings] = React.useState(true)

  const handleCreateTable = () => {
    setTableConfig({ includeSummary, includeRecordings })
    setShowConfigureScreen(false)
    setShowMeetingTable(true)
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gray-50 p-6 pt-16">
      <div className="w-full max-w-2xl">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Synced Meetings</h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-gray-200 text-xs">DY</AvatarFallback>
            </Avatar>
            <span>Diane Yang</span>
            <span>•</span>
            <span>Updated just now</span>
            <span>•</span>
            <Users className="h-4 w-4" />
            <span>2</span>
          </div>
        </div>

        <Card className="w-full">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Video className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Configure Zoom Sync</CardTitle>
                <p className="text-sm text-gray-500">Select which meetings and data to sync.</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 pt-2">
            <div>
              <h3 className="mb-3 text-sm font-semibold">Select meetings to sync</h3>
              <RadioGroup defaultValue="attended" className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="attended" id="attended" />
                  <label htmlFor="attended" className="text-sm">
                    Meetings I attended
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hosted" id="hosted" />
                  <label htmlFor="hosted" className="text-sm">
                    Meetings I hosted
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="keyword" id="keyword" />
                  <label htmlFor="keyword" className="text-sm">
                    Topic contains keyword
                  </label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold">Time Range</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold">Select fields to include</h3>
              <div className="flex items-center gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="summary"
                    checked={includeSummary}
                    onCheckedChange={(checked) => setIncludeSummary(!!checked)}
                  />
                  <label htmlFor="summary" className="text-sm font-medium leading-none">
                    Summary
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="recordings"
                    checked={includeRecordings}
                    onCheckedChange={(checked) => setIncludeRecordings(!!checked)}
                  />
                  <label htmlFor="recordings" className="text-sm font-medium leading-none">
                    Recordings
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <label htmlFor="sync-future" className="text-sm font-medium">
                Automatically sync future meetings
              </label>
              <Switch id="sync-future" />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="ghost" onClick={() => setShowConfigureScreen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTable}>Create Table</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
