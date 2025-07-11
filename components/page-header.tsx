"use client"

import {
  ArrowLeft,
  Bold,
  ChevronDown,
  Cloud,
  Code,
  Italic,
  Link,
  List,
  ListOrdered,
  MoreHorizontal,
  Plus,
  Redo2,
  Search,
  Share2,
  Star,
  Strikethrough,
  Type,
  Undo2,
  Video,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { Dispatch, SetStateAction } from "react"

export function PageHeader({ setShowMeetingTable }: { setShowMeetingTable: Dispatch<SetStateAction<boolean>> }) {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-white px-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setShowMeetingTable(false)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-1">
          <Button variant="ghost" className="p-2 font-medium">
            <span>Meeting with custom...</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Star className="h-4 w-4 text-gray-500" />
          </Button>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Cloud className="h-4 w-4" />
            <span>Saved to cloud</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon">
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Redo2 className="h-4 w-4" />
        </Button>
        <div className="h-6 w-px bg-gray-200 mx-1" />
        <Button variant="ghost" size="icon">
          <Type className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Code className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Link className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" className="px-2">
          More <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
        <Button variant="ghost" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          <Avatar className="h-8 w-8 border-2 border-white">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User 1" />
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8 border-2 border-white">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User 2" />
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
        </div>
        <Button variant="ghost" className="bg-gray-100">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Button variant="ghost" size="icon">
          <Video className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
        <div className="h-6 w-px bg-gray-200" />
        <Button variant="ghost" size="icon">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
