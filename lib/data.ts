import {
  type LucideIcon,
  Bell,
  File,
  FileText,
  Folder,
  History,
  Plus,
  Settings,
  Star,
  Users,
  Lightbulb,
  MessageSquare,
  Calendar,
  BarChart2,
  LifeBuoy,
  LayoutGrid,
  Globe,
  BookOpen,
  ClipboardList,
  FileBox,
  FilePlus2,
  Table2,
  FileAudio,
  FileUp,
  Wand2,
  Languages,
  Tag,
  FlaskConical,
  CaseSensitive,
  Hash,
  Percent,
  DollarSign,
  CircleDot,
  ListChecks,
  Paperclip,
  CheckSquare,
  ThumbsUp,
  Sigma,
  KanbanSquare,
  CalendarDays,
  GanttChart,
  LayoutDashboard,
} from "lucide-react"

export type NavItem = {
  name: string
  href: string
  icon: LucideIcon
  active?: boolean
  badge?: string | number
  isNew?: boolean
}

export const mainNav: NavItem[] = [
  { name: "Notifications", href: "#", icon: Bell, badge: 88 },
  { name: "Recent", href: "#", icon: History, active: true },
  { name: "My meetings", href: "#", icon: File, isNew: true },
  { name: "My docs", href: "#", icon: FileText },
  { name: "Shared with me", href: "#", icon: Users },
  { name: "Starred", href: "#", icon: Star },
  { name: "All shared folders", href: "#", icon: Folder },
]

export const sharedFolders: NavItem[] = [
  { name: "Meeting to Docs", href: "#", icon: MessageSquare },
  { name: "Zoom Docs Open & Integration", href: "#", icon: Plus },
  { name: "Zoom Docs Space", href: "#", icon: Folder },
  { name: "Project Sun", href: "#", icon: Lightbulb },
  { name: "UX writing", href: "#", icon: BookOpen },
  { name: "Zoom Docs User Guide", href: "#", icon: Users },
  { name: "Jie's Space", href: "#", icon: Folder },
  { name: "Docs Design Team", href: "#", icon: LayoutGrid },
  { name: "EE Frontend", href: "#", icon: Globe },
  { name: "Zoom Calendar", href: "#", icon: Calendar },
  { name: "Product Org QBRs", href: "#", icon: BarChart2 },
  { name: "softve", href: "#", icon: FileBox },
  { name: "Zoom Docs Data", href: "#", icon: Table2 },
  { name: "Meeting Client Desktop Team(US)", href: "#", icon: ClipboardList },
  { name: "AI Agent Solution Team", href: "#", icon: Lightbulb },
  { name: "Meeting Release and Projects", href: "#", icon: MessageSquare },
  { name: "Diane", href: "#", icon: Folder },
  { name: "Docs Growth", href: "#", icon: BarChart2 },
]

export const bottomNav: NavItem[] = [
  { name: "Settings", href: "#", icon: Settings },
  { name: "Help", href: "#", icon: LifeBuoy },
]

export type ActionItem = {
  name: string
  icon: LucideIcon
  isNew?: boolean
}

export const mainActions: ActionItem[] = [
  { name: "New document", icon: FilePlus2 },
  { name: "New data table", icon: Table2, isNew: true },
  { name: "Create from meetings", icon: MessageSquare },
  { name: "Voice recording", icon: FileAudio },
  { name: "Templates", icon: LayoutGrid },
  { name: "Import", icon: FileUp },
]

export type Document = {
  id: number
  name: string
  category?: string
  icon: LucideIcon
  creator: string
  lastViewed: string
  isMeeting?: boolean
  isSmartAgenda?: boolean
  isShared?: boolean
  isExternal?: boolean
}

export const documents: Document[] = [
  {
    id: 17,
    name: "Meetings with Customers (Meeting Table Demo)",
    icon: Table2,
    creator: "Diane Yang",
    lastViewed: "3 hours ago",
    isMeeting: true,
  },
  {
    id: 1,
    name: "Discuss about sd07 for summary 2025-07-04 04:47 PM",
    icon: FileText,
    creator: "Diane Yang",
    lastViewed: "Just now",
  },
  {
    id: 2,
    name: "Compliance Team's Docs Feature Request Discussion 2025-07-04 02:08 PM",
    icon: FileText,
    creator: "Diane Yang",
    lastViewed: "Just now",
    isMeeting: true,
  },
  {
    id: 3,
    name: "Smart agenda GA scope",
    category: "in Empowering Everyone for More Efficient Meetings",
    icon: Lightbulb,
    creator: "Diane Yang",
    lastViewed: "Just now",
    isSmartAgenda: true,
  },
  {
    id: 4,
    name: "PB & Jira follow up",
    category: "in Empowering Everyone for More Efficient Meetings",
    icon: FileText,
    creator: "Diane Yang",
    lastViewed: "Just now",
    isShared: true,
    isExternal: true,
  },
]

export type SalesMeeting = {
  id: string
  topic: string
  time: string
  summary: string
  recordingUrl?: string
  customer: string
  company: string
  contact: string
  stage: "Initial Contact" | "Qualification" | "Proposal" | "Negotiation" | "Closed - Won" | "Closed - Lost"
  [key: string]: any
}

export const salesMeetingsData: SalesMeeting[] = [
  {
    id: "M-SL001",
    topic: "Final Negotiation Call",
    time: "2025-07-10 10:00 AM",
    summary: "Final pricing agreed. Awaiting legal sign-off. High probability of closing this week.",
    recordingUrl: "https://example.com/recording/sl001",
    customer: "Alex Johnson",
    company: "Innovate Inc.",
    contact: "alex.j@innovate.com",
    stage: "Negotiation",
  },
  {
    id: "M-SL002",
    topic: "Post-Demo Follow-up",
    time: "2025-07-09 02:00 PM",
    summary:
      "Customer is evaluating CompetitorX. Price is a major concern. We are unlikely to win this deal without a significant discount.",
    recordingUrl: "https://example.com/recording/sl002",
    customer: "Brenda Smith",
    company: "Quantum Solutions",
    contact: "brenda.s@quantum.co",
    stage: "Closed - Lost",
  },
  {
    id: "M-SL003",
    topic: "Proposal Review Meeting",
    time: "2025-07-09 11:00 AM",
    summary:
      "Presented the proposal. Customer is reviewing with their technical team. Follow-up scheduled for next week.",
    recordingUrl: "https://example.com/recording/sl003",
    customer: "Carlos Garcia",
    company: "Synergy Corp",
    contact: "carlos.g@synergy.org",
    stage: "Proposal",
  },
  {
    id: "M-SL004",
    topic: "Initial Discovery Call",
    time: "2025-07-08 04:00 PM",
    summary: "Qualified the lead. They have a clear need and budget. Moving to proposal stage.",
    recordingUrl: "https://example.com/recording/sl004",
    customer: "Diana Chen",
    company: "NextGen Enterprises",
    contact: "diana.c@nextgen.io",
    stage: "Qualification",
  },
  {
    id: "M-SL005",
    topic: "Onboarding Kick-off",
    time: "2025-07-07 09:00 AM",
    summary: "Contract signed. Kicked off the onboarding process with their project team.",
    recordingUrl: "https://example.com/recording/sl005",
    customer: "Ethan Wright",
    company: "Apex Industries",
    contact: "ethan.w@apex.net",
    stage: "Closed - Won",
  },
]

export type TableConfig = {
  includeSummary: boolean
  includeRecordings: boolean
}

export type CustomColumn = {
  id: string
  name: string
  type: string
  icon: LucideIcon
}

export type ColumnType = {
  name: string
  icon: LucideIcon
  type: string
  category: "AI Companion" | "General"
}

export const columnTypes: ColumnType[] = [
  { name: "Summary", icon: Wand2, type: "ai_summary", category: "AI Companion" },
  { name: "Translation", icon: Languages, type: "ai_translation", category: "AI Companion" },
  { name: "Category", icon: Tag, type: "ai_category", category: "AI Companion" },
  { name: "Insights", icon: Lightbulb, type: "ai_insights", category: "AI Companion" },
  { name: "Customized autofill", icon: FlaskConical, type: "ai_autofill", category: "AI Companion" },
  { name: "Text", icon: CaseSensitive, type: "text", category: "General" },
  { name: "Number", icon: Hash, type: "number", category: "General" },
  { name: "Percent", icon: Percent, type: "percent", category: "General" },
  { name: "Currency", icon: DollarSign, type: "currency", category: "General" },
  { name: "Single select", icon: CircleDot, type: "single_select", category: "General" },
  { name: "Multiple select", icon: ListChecks, type: "multi_select", category: "General" },
  { name: "Date", icon: Calendar, type: "date", category: "General" },
  { name: "People", icon: Users, type: "people", category: "General" },
  { name: "Image & Files", icon: Paperclip, type: "files", category: "General" },
  { name: "Checkbox", icon: CheckSquare, type: "checkbox", category: "General" },
  { name: "Reaction", icon: ThumbsUp, type: "reaction", category: "General" },
  { name: "Formula", icon: Sigma, type: "formula", category: "General" },
]

export type ViewType = {
  id: "table" | "board" | "calendar" | "gallery" | "timeline" | "dashboard" | "form"
  name: string
  icon: LucideIcon
}

export const viewTypes: ViewType[] = [
  { id: "table", name: "Table view", icon: Table2 },
  { id: "board", name: "Board view", icon: KanbanSquare },
  { id: "calendar", name: "Calendar view", icon: CalendarDays },
  { id: "gallery", name: "Gallery view", icon: LayoutGrid },
  { id: "timeline", name: "Timeline view", icon: GanttChart },
  { id: "dashboard", name: "Dashboard view", icon: LayoutDashboard },
  { id: "form", name: "Form view", icon: ClipboardList },
]

export const mockInsights: string[] = [
  "Action item: Send follow-up email with technical specs.",
  "Decision: Customer has approved the budget for Q3.",
  "Key takeaway: Their primary pain point is integration with legacy systems.",
  "Risk identified: The main project sponsor is leaving the company.",
  "Next steps: Schedule a technical deep-dive with their engineering team.",
  "Question raised: Can we provide on-site training?",
  "Idea proposed: Offer a multi-year discount to secure a longer-term commitment.",
]
