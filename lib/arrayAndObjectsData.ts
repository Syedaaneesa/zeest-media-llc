import { BarChart3, FileText, Home, Sparkles } from "lucide-react";

  export const menuItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: Home,
      url: "/dashboard?tab=dashboard",
    },
    {
      id: "guestposting",
      title: "Guest Posts",
      icon: BarChart3,
      url: "/dashboard/guest-posts?tab=guestposting",
    },
    {
      id: "aiprwriter",
      title: "AI PR Generator",
      icon: Sparkles,
      url: "/aiprwriter"
    },
    {
      id: "reports",
      title: "Reports",
      icon: FileText,
      url: "/reports",
    },
  ]