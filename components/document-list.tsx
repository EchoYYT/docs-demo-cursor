import {
  MoreHorizontal,
  FileIcon,
  FileText,
  FileSpreadsheet,
  FileIcon as FilePresentation,
  FileCode2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const documents = [
  { name: "Project Proposal.docx", owner: "Alice", modified: "2 hours ago", type: "word" },
  { name: "Financials Q2.xlsx", owner: "You", modified: "8 hours ago", type: "excel" },
  { name: "Marketing Presentation.pptx", owner: "Bob", modified: "Yesterday", type: "powerpoint" },
  { name: "Onboarding Guide.pdf", owner: "Charlie", modified: "June 5, 2025", type: "pdf" },
  { name: "Design System.json", owner: "You", modified: "June 4, 2025", type: "code" },
  { name: "API Documentation.md", owner: "You", modified: "June 3, 2025", type: "text" },
]

function getFileIcon(type: string) {
  switch (type) {
    case "word":
      return <FileText className="h-5 w-5 text-blue-600" />
    case "excel":
      return <FileSpreadsheet className="h-5 w-5 text-green-600" />
    case "powerpoint":
      return <FilePresentation className="h-5 w-5 text-orange-500" />
    case "pdf":
      return <FileText className="h-5 w-5 text-red-600" />
    case "code":
      return <FileCode2 className="h-5 w-5 text-gray-500" />
    default:
      return <FileIcon className="h-5 w-5 text-gray-500" />
  }
}

export function DocumentList() {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Owner</TableHead>
              <TableHead className="hidden md:table-cell">Last Modified</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.name}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    {getFileIcon(doc.type)}
                    <span>{doc.name}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant={doc.owner === "You" ? "outline" : "secondary"}>{doc.owner}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{doc.modified}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
