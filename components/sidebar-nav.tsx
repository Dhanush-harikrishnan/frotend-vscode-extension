"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, FileText, Users, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/logs", label: "Activity Logs", icon: FileText },
  { href: "/users", label: "User Summary", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-3 p-6">
      {navigation.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg",
            "transition-all duration-300 ease-in-out",
            "text-sm font-medium",
            pathname === href
              ? "glass-strong bg-gradient-to-r from-primary/50 to-secondary/50 text-accent shadow-lg shadow-primary/20"
              : "text-sidebar-foreground hover:glass hover:text-accent",
          )}
        >
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  )
}
