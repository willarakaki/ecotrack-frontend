import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Home, Leaf, Gift, BarChart2, User, Bell } from "lucide-react"
import { cn } from "./button"

interface AppLayoutProps {
  children: React.ReactNode
  currentPath?: string
}

export function AppLayout({ children, currentPath = "/home" }: AppLayoutProps) {
  const navItems = [
    { label: "Início", path: "/home", icon: Home },
    { label: "Atividades", path: "/activities", icon: Leaf },
    { label: "Recompensas", path: "/marketplace", icon: Gift },
    { label: "Impacto", path: "/impact", icon: BarChart2 },
    { label: "Perfil", path: "/profile", icon: User },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row w-full mx-auto max-w-7xl shadow-sm">
      {/* 
        Sidebar (Desktop) 
        Fica escondida em telas menores que 'md' (768px).
      */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6 flex items-center gap-3">
          <Image src="/logo.jpg" alt="EcoTrack Logo" width={32} height={32} className="rounded-md" />
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

      {/* Container Principal */}
      <div className="flex-1 flex flex-col min-h-screen pb-20 md:pb-0 relative">
        {/* Header Mobile Opcional (Para notificações) */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Image src="/logo.jpg" alt="EcoTrack Logo" width={28} height={28} className="rounded-md" />
            <span className="font-bold text-lg text-gray-900">EcoTrack AI</span>
          </div>
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <Bell size={24} />
          </button>
        </header>

        {/* Header Desktop */}
        <header className="hidden md:flex justify-end p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
           <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
            <Bell size={24} />
          </button>
        </header>

        {/* Conteúdo da Página */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        {/* 
          Bottom Navigation (Mobile)
          Fica fixa no fundo em telas pequenas, escondida no Desktop.
        */}
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
