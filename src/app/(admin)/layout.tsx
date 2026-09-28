"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { BarChart3, Users, Leaf, Settings, ShieldCheck, LogOut, FileText } from "lucide-react"
import { cn } from "@/shared/ui/button"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const currentPath = usePathname()

  const navItems = [
    { label: "Visão Geral", path: "/admin/dashboard", icon: BarChart3 },
    { label: "Auditoria Escopo 3", path: "/admin/audit", icon: FileText },
    { label: "Engajamento", path: "/admin/engagement", icon: Users },
    { label: "Metas e ESG", path: "/admin/goals", icon: Leaf },
    { label: "Configurações", path: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex w-full font-sans">
      {/* Sidebar - Fixa à esquerda */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex border-r border-slate-800">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-white rounded-md p-1">
            <Image src="/logo.png" alt="EcoTrack Logo" width={24} height={24} className="rounded-sm" />
          </div>
          <span className="font-bold text-lg text-white tracking-tight">EcoTrack Admin</span>
        </div>
        
        <nav className="flex-1 px-3 py-6 space-y-1">
          <div className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Corporativo</div>
          {navItems.map((item) => {
            const isActive = currentPath === item.path
            return (
              <Link 
                key={item.label} 
                href={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-slate-800 text-white" 
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2">
            <ShieldCheck size={24} className="text-emerald-500" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">Diretoria ESG</span>
              <span className="text-xs text-slate-500">EcoCorp S.A.</span>
            </div>
          </div>
          <Link href="/login" className="flex items-center gap-3 px-3 py-2 mt-2 text-sm text-rose-400 hover:text-rose-300 transition-colors">
            <LogOut size={18} /> Sair do Painel
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
          <h2 className="font-bold text-gray-800 text-lg">Painel Gerencial</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500 border border-gray-200 px-3 py-1 rounded-full bg-gray-50">
              Período: Setembro 2026
            </span>
            <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm border border-indigo-200">
              D
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
