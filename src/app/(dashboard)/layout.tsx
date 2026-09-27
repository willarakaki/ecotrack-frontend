"use client"

import { usePathname } from "next/navigation"
import { AppLayout } from "@/shared/ui/app-layout"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <AppLayout currentPath={pathname}>
      {children}
    </AppLayout>
  )
}
