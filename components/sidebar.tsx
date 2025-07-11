import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { bottomNav, mainNav, sharedFolders, type NavItem } from "@/lib/data"
import { cn } from "@/lib/utils"
import { ChevronDown, Plus, Search } from "lucide-react"

function NavLink({ link }: { link: NavItem }) {
  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100",
        link.active && "bg-blue-100 text-blue-600 hover:bg-blue-100",
      )}
    >
      <link.icon className="h-4 w-4" />
      <span>{link.name}</span>
      {link.badge && (
        <Badge className={cn("ml-auto", link.active ? "bg-blue-600 text-white" : "bg-red-500 text-white")}>
          {link.badge}
        </Badge>
      )}
      {link.isNew && <Badge className="ml-auto bg-blue-100 text-blue-600">New</Badge>}
    </Link>
  )
}

export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r bg-gray-50/75 p-4 md:flex">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex w-full items-center justify-between px-2 py-6 text-left">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Diane Yang" />
                <AvatarFallback>DY</AvatarFallback>
              </Avatar>
              <span className="font-semibold">Diane Yang</span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input placeholder="Search" className="pl-9" />
      </div>

      <nav className="flex flex-1 flex-col">
        <div className="space-y-1">
          {mainNav.map((link) => (
            <NavLink key={link.name} link={link} />
          ))}
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between px-3">
            <h2 className="text-xs font-semibold uppercase text-gray-400">Shared folders</h2>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-1">
            {sharedFolders.map((link) => (
              <NavLink key={link.name} link={link} />
            ))}
          </div>
        </div>

        <div className="mt-auto space-y-1">
          {bottomNav.map((link) => (
            <NavLink key={link.name} link={link} />
          ))}
        </div>
      </nav>
    </aside>
  )
}
