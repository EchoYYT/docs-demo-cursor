"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { documents, mainActions } from "@/lib/data"
import { cn } from "@/lib/utils"
import { ExternalLink, MessageSquare, MoreHorizontal, Users } from "lucide-react"

export function MainContent({ onRecentItemClick }: { onRecentItemClick: (docId: number) => void }) {
  return (
    <main className="flex-1 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Recent</h1>
      </header>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        {mainActions.map((action) => (
          <Button key={action.name} variant="outline" className="bg-white">
            <action.icon className="mr-2 h-4 w-4" />
            {action.name}
            {action.isNew && <Badge className="ml-2 bg-blue-100 text-blue-600">New</Badge>}
          </Button>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-1/2">Name</TableHead>
              <TableHead>Creator</TableHead>
              <TableHead>Last viewed</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow
                key={doc.id}
                className="group cursor-pointer hover:bg-gray-50"
                onClick={() => onRecentItemClick(doc.id)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <doc.icon
                      className={cn(
                        "h-5 w-5 flex-shrink-0",
                        doc.id === 18 ? "text-purple-500" : doc.isMeeting ? "text-green-500" : "text-blue-500",
                      )}
                    />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      {doc.category && <p className="text-sm text-gray-500">{doc.category}</p>}
                    </div>
                    {doc.isSmartAgenda && (
                      <Badge variant="outline" className="border-yellow-300 bg-yellow-50 text-yellow-700">
                        Smart agenda
                      </Badge>
                    )}
                    {doc.isShared && <Users className="h-4 w-4 text-gray-400" />}
                    {doc.isExternal && <ExternalLink className="h-4 w-4 text-gray-400" />}
                  </div>
                </TableCell>
                <TableCell>{doc.creator}</TableCell>
                <TableCell>{doc.lastViewed}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="fixed bottom-6 right-6">
        <Button size="icon" className="h-12 w-12 rounded-full bg-blue-600 shadow-lg hover:bg-blue-700">
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    </main>
  )
}
