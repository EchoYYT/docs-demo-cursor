"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { CalendarIcon, Users, Video } from "lucide-react"
import type { Dispatch, SetStateAction } from "react"
import { format } from "date-fns"
import * as React from "react"
import type { DateRange } from "react-day-picker"
import type { TableConfig } from "@/lib/data"

export function ConfigureSync({
  setShowConfigureScreen,
  setShowMeetingTableView,
  setTableConfig,
}: {
  setShowConfigureScreen: Dispatch<SetStateAction<boolean>>
  setShowMeetingTableView: Dispatch<SetStateAction<boolean>>
  setTableConfig: Dispatch<SetStateAction<TableConfig>>
}) {
  const [date, setDate] = React.useState<DateRange | undefined>()
  const [includeSummary, setIncludeSummary] = React.useState(true)
  const [includeRecordings, setIncludeRecordings] = React.useState(true)
  const [meetingType, setMeetingType] = React.useState("attended")
  const [keyword, setKeyword] = React.useState("")
  const [autoSync, setAutoSync] = React.useState(false)

  const handleCreateTable = () => {
    setTableConfig({ includeSummary, includeRecordings })
    setShowConfigureScreen(false)
    setShowMeetingTableView(true)
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gray-50 p-6 pt-16">
      <div className="w-full max-w-2xl">
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <Video className="h-6 w-6 text-blue-500" />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Configure Zoom Sync</h1>
              <div className="text-gray-400 text-sm font-normal">Select which meetings and data to sync.</div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Select meetings to sync</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={meetingType} onValueChange={setMeetingType} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="attended" id="attended" />
                <label htmlFor="attended" className="text-sm font-medium leading-none">
                  Meetings I attended
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hosted" id="hosted" />
                <label htmlFor="hosted" className="text-sm font-medium leading-none">
                  Meetings I hosted
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="keyword" id="keyword" />
                <label htmlFor="keyword" className="text-sm font-medium leading-none">
                  Topic contains keyword
                </label>
              </div>
            </RadioGroup>
            {meetingType === "keyword" && (
              <div className="pl-6">
                <Input
                  placeholder="Enter keyword..."
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  className="w-64"
                />
              </div>
            )}

            <div>
              <h3 className="mb-3 text-sm font-semibold">Time Range</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
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
              <Switch id="sync-future" checked={autoSync} onCheckedChange={setAutoSync} />
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