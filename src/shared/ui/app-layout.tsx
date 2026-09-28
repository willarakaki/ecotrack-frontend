import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CopilotWidget } from "@/domains/copilot/ui/copilot-widget"
import { Home, Leaf, Gift, Target, User, Bell, BarChart2 } from "lucide-react"
import { cn } from "./button"

interface AppLayoutProps {
  children: React.ReactNode
  currentPath?: string
}

export function AppLayout({ children, currentPath = "/home" }: AppLayoutProps) {
  const [showNotifications, setShowNotifications] = useState(false)

  const navItems = [
    { label: "Início", path: "/home", icon: Home },
    { label: "Atividades", path: "/activities", icon: Leaf },
    { label: "Recompensas", path: "/marketplace", icon: Gift },
    { label: "Impacto", path: "/impact", icon: BarChart2 },
    { label: "Missões", path: "/challenges", icon: Target },
    { label: "Perfil", path: "/profile", icon: User },
  ]

  const NotificationsPanel = () => (
    <div className="absolute right-4 top-16 w-80 bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden z-50 animate-in slide-in-from-top-2">
      <div className="bg-gray-50 border-b border-gray-100 p-4 font-bold text-gray-900">
        Notificações
      </div>
      <div className="flex flex-col max-h-80 overflow-y-auto">
        <div className="p-4 border-b border-gray-50 hover:bg-gray-50 flex flex-col gap-1 cursor-pointer">
          <span className="font-semibold text-sm text-gray-900">EcoPoints creditados!</span>
          <span className="text-xs text-gray-500">Seu comprovante de mobilidade foi validado. +5 pts.</span>
          <span className="text-xs text-green-600 font-medium mt-1">Há 10 min</span>
        </div>
        <div className="p-4 hover:bg-gray-50 flex flex-col gap-1 cursor-pointer">
          <span className="font-semibold text-sm text-gray-900">Resgate efetuado</span>
          <span className="text-xs text-gray-500">Seu cupom do iFood já está disponível.</span>
          <span className="text-xs text-green-600 font-medium mt-1">Há 1 hora</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row w-full mx-auto max-w-7xl shadow-sm">
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6 flex items-center gap-3">
          <Image src="/logo.png" alt="EcoTrack Logo" width={32} height={32} unoptimized />
          <span className="font-bold text-xl tracking-tight text-gray-900">EcoTrack AI</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.path
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors",
                  isActive 
                    ? "bg-green-50 text-[#00a859]" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen pb-20 md:pb-0 relative">
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="EcoTrack Logo" width={28} height={28} unoptimized />
            <span className="font-bold text-lg text-gray-900">EcoTrack AI</span>
          </div>
          <button 
            className="text-gray-500 hover:text-gray-900 relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={24} />
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
          </button>
        </header>

        <header className="hidden md:flex justify-end p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
           <button 
             className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors relative"
             onClick={() => setShowNotifications(!showNotifications)}
           >
            <Bell size={24} />
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
          </button>
        </header>

        {showNotifications && <NotificationsPanel />}

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        
        <CopilotWidget />

        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 flex justify-between items-center z-50 pb-safe">
          {navItems.map((item) => {
            const isActive = currentPath === item.path
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={cn(
                  "flex flex-col items-center justify-center w-full py-1 gap-1 transition-colors",
                  isActive ? "text-[#00a859]" : "text-gray-500 hover:text-gray-900"
                )}
              >
                <item.icon size={22} className={cn(isActive && "fill-green-100")} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
