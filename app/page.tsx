"use client"

import { motion } from "framer-motion"
import { MoreVertical, Plus, Filter, Clock, Eye, FileText, Folder, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu,  DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BsLightningCharge } from "react-icons/bs"

// Types for better type safety
interface Project {
  id: string
  title: string
  description: string
  date: string
  pages: number
  status: "Active" | "Completed" | "Under review"
}

interface RecentlyViewedItem {
  id: string
  page: string
  project: string
  timestamp: string
}

interface StatItem {
  label: string
  value: number
}

// Reusable components following DRY principle
const ProjectCard = ({ project }: { project: Project }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-blue-500 hover:bg-blue-600"
      case "Completed":
        return "bg-green-500 hover:bg-green-600"
      case "Under review":
        return "bg-purple-500 hover:bg-purple-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-medium text-gray-900">{project.title}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="text-sm">Edit project</DropdownMenuItem>
              <DropdownMenuItem className="text-sm">Share</DropdownMenuItem>
              <DropdownMenuItem className="text-sm">Archive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

          <p className="text-gray-500 text-sm mb-4 leading-relaxed">{project.description}</p>

          <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {project.date}
              </div>
              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                {project.pages} pages
              </div>
            </div>
            <Badge
              className={`${getStatusColor(project.status)} text-white border-0 px-3 py-1 text-xs font-medium rounded-full`}
            >
              {project.status}
            </Badge>
          </div>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 bg-white border-gray-300 text-gray-700 hover:bg-gray-50 py-2"
          >
            <Folder className="h-4 w-4" />
            Open project
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const StatCard = ({ stat }: { stat: StatItem }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.2 }}
    className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
  >
    <span className="text-gray-600 text-sm">{stat.label}</span>
    <span className="font-semibold text-sm text-gray-900">{stat.value}</span>
  </motion.div>
)

const RecentlyViewedItem = ({ item }: { item: RecentlyViewedItem }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
    className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
  >
    <div className="flex-1">
      <div className="font-semibold text-sm text-gray-900 underline decoration-1 underline-offset-2">{item.page}</div>
      <div className="text-sm text-gray-600 mt-1">{item.project}</div>
      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
        <Clock className="h-3 w-3" />
        {item.timestamp}
      </div>
    </div>
    <Eye className="h-4 w-4 text-gray-400" />
  </motion.div>
)

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

export default function ProjectDashboard() {
  // Mock data - in real app this would come from API/database
  const projects: Project[] = [
    {
      id: "1",
      title: "Downtown Office Complex",
      description: "High-rise commercial building project in Lagos.",
      date: "08/16/2025",
      pages: 24,
      status: "Active",
    },
    {
      id: "2",
      title: "Residential Towers Phase 2",
      description: "Multi-story residential development",
      date: "08/16/2025",
      pages: 104,
      status: "Completed",
    },
    {
      id: "3",
      title: "Industrial Warehouse Renovations",
      description: "Warehouse convertion to mix-use spaces",
      date: "08/16/2025",
      pages: 24,
      status: "Under review",
    },
  ]

  const stats: StatItem[] = [
    { label: "Total projects", value: 4 },
    { label: "Active projects", value: 4 },
    { label: "Total pages", value: 104 },
  ]

  const recentlyViewed: RecentlyViewedItem[] = [
    {
      id: "1",
      page: "Page 12",
      project: "Downtown Office Complex",
      timestamp: "08/16/2025 - 14:30",
    },
    {
      id: "2",
      page: "Page 75",
      project: "Residential Towers Phase 2",
      timestamp: "08/16/2025 - 11:30",
    },
  ]

  return (
    <div className="min-h-screen bg-background ">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border-b border-border px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className=" lg:min-w-[250px]"></div>
            {/* <div className="w-[2px] h-8 bg-muted-foregroun rounded-full" /> */}
            <div className="w-[2px] h-8 bg-muted-foreground/30 rounded-full" />
            <h1 className="text-lg font-medium text-muted-foreground">Project Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
              <BsLightningCharge  className=" font-bold"/>
            </Button>
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
              <SearchIcon />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/professional-headshot.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="px-6 py-8 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">Welcome back, Chinedu.</h2>
          <p className="text-muted-foreground text-lg">
            Manage your construction documents and collaborate with your team using AI-powered tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold">Your projects</h3>
                <Button
                  variant="secondary"
                  className="flex items-center gap-2 bg-gray-200 text-foreground hover:cursor-pointer"
                  // className="flex items-center gap-2 bg-muted hover:bg-muted/80 text-foreground"
                >
                  <Plus className="h-4 w-4" />
                  Create Project
                </Button>
              </div>

              {/* Search and Filter */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search projects..."
                    className="pl-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-10"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 bg-white border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 h-10 hover:cursor-pointer"
                    >
                      <Filter className="h-4 w-4" />
                      All projects
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>All projects</DropdownMenuItem>
                    <DropdownMenuItem>Active</DropdownMenuItem>
                    <DropdownMenuItem>Completed</DropdownMenuItem>
                    <DropdownMenuItem>Under review</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Project Cards */}
              <div className="space-y-4 grid md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-100 rounded-3xl border border-gray-200 overflow-hidden shadow"
            >
              <div className="bg-gray-100 px-4 py-3">
                <h4 className="font-medium text-lg text-gray-800">Quick stats</h4>
              </div>
              <div className="p-4 rounded-t-3xl  bg-white">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    <StatCard stat={stat} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recently Viewed */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gray-100 rounded-3xl border border-gray-200 overflow-hidden shadow"
            >
              <div className=" px-4 py-3">
                <h4 className="font-medium  text-lg text-gray-800">Recently viewed</h4>
              </div>
              <div className="p-4 rounded-t-3xl  bg-white">
                {recentlyViewed.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  >
                    <RecentlyViewedItem item={item} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
