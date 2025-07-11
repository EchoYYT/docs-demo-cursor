import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { ColumnType, CustomColumn, SalesMeeting, TableConfig } from "@/lib/data"
import {
  BarChart,
  Building,
  Calendar,
  Clock,
  FileText,
  GripVertical,
  Mail,
  MessageSquare,
  Mic,
  Plus,
  User,
} from "lucide-react"
import { AddColumnMenu } from "./add-column-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function MeetingTable({
  config,
  meetings,
  customColumns,
  onAddColumn,
}: {
  config: TableConfig
  meetings: SalesMeeting[]
  customColumns: CustomColumn[]
  onAddColumn: (columnType: ColumnType) => void
}) {
  const getStageBadge = (stage: SalesMeeting["stage"]) => {
    switch (stage) {
      case "Closed - Won":
        return "bg-green-100 text-green-800 border-green-200"
      case "Closed - Lost":
        return "bg-red-100 text-red-800 border-red-200"
      case "Negotiation":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Proposal":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="border-b-2 bg-gray-50/50 hover:bg-gray-50/50">
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>Meeting ID</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-gray-500" />
                <span>Meeting Topic</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>Meeting Time</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span>Customer</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-gray-500" />
                <span>Company</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>Contact</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <BarChart className="h-4 w-4 text-gray-500" />
                <span>Stage</span>
              </div>
            </TableHead>
            {config.includeSummary && (
              <TableHead>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>Meeting Summary</span>
                </div>
              </TableHead>
            )}
            {config.includeRecordings && (
              <TableHead>
                <div className="flex items-center gap-2">
                  <Mic className="h-4 w-4 text-gray-500" />
                  <span>Meeting Recording</span>
                </div>
              </TableHead>
            )}
            {customColumns.map((col) => (
              <TableHead key={col.id}>
                <div className="flex items-center gap-2">
                  <col.icon className="h-4 w-4 text-gray-500" />
                  <span>{col.name}</span>
                </div>
              </TableHead>
            ))}
            <TableHead className="w-12">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <AddColumnMenu onAddColumn={onAddColumn} />
                </PopoverContent>
              </Popover>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meetings.map((meeting, index) => (
            <TableRow key={meeting.id} className="group">
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="w-4 text-xs text-gray-400">{index + 1}</span>
                  <GripVertical className="h-4 w-4 text-gray-300 opacity-0 group-hover:opacity-100" />
                </div>
              </TableCell>
              <TableCell className="font-medium">{meeting.id}</TableCell>
              <TableCell>{meeting.topic}</TableCell>
              <TableCell>{meeting.time}</TableCell>
              <TableCell>{meeting.customer}</TableCell>
              <TableCell>{meeting.company}</TableCell>
              <TableCell>{meeting.contact}</TableCell>
              <TableCell>
                <Badge variant="outline" className={cn("font-medium", getStageBadge(meeting.stage))}>
                  {meeting.stage}
                </Badge>
              </TableCell>
              {config.includeSummary && <TableCell className="max-w-xs truncate">{meeting.summary}</TableCell>}
              {config.includeRecordings && (
                <TableCell>
                  {meeting.recordingUrl && (
                    <a
                      href={meeting.recordingUrl}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Link
                    </a>
                  )}
                </TableCell>
              )}
              {customColumns.map((col) => (
                <TableCell key={col.id}>{meeting[col.id] || ""}</TableCell>
              ))}
              <TableCell />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
