"use client"

import React from "react"
import { Users, Flame, Heart, Zap, Award, Target, Trophy } from "lucide-react"

export default function EngagementPage() {
  const departments = [
    { name: "Engenharia de Software", adoption: 92, praises: 340, trend: "+12%" },
    { name: "Marketing & Vendas", adoption: 85, praises: 210, trend: "+5%" },
    { name: "Recursos Humanos", adoption: 78, praises: 450, trend: "+18%" },
    { name: "Operações e Logística", adoption: 45, praises: 80, trend: "-2%" },
    { name: "Comercial B2B", adoption: 30, praises: 45, trend: "-5%" },
  ]

  const topUsers = [
    { name: "Willian Arakaki", dept: "Engenharia", points: 1495, avatar: "W" },
    { name: "Maria Souza", dept: "RH", points: 850, avatar: "M" },
    { name: "João Silva", dept: "Marketing", points: 320, avatar: "J" },
  ]

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Cultura e Engajamento</h1>
          <p className="text-gray-500 mt-1">Termômetro de adoção, envio de reconhecimentos e gamificação corporativa.</p>
        </div>
        <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm">
          Gerar Relatório de RH
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Adoção Global</span>
            <Users size={18} className="text-indigo-500" />
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <h2 className="text-3xl font-bold text-gray-900">84%</h2>
            <span className="text-emerald-500 text-xs font-bold">+2%</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Elogios Trocados</span>
            <Heart size={18} className="text-rose-500" />
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <h2 className="text-3xl font-bold text-gray-900">1.1k</h2>
            <span className="text-emerald-500 text-xs font-bold">+14%</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Missões Ativas</span>
            <Target size={18} className="text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <h2 className="text-3xl font-bold text-gray-900">432</h2>
            <span className="text-gray-400 text-xs font-medium">Esta semana</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Streaks (Ofensivas)</span>
            <Flame size={18} className="text-orange-500" />
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <h2 className="text-3xl font-bold text-gray-900">145</h2>
            <span className="text-gray-400 text-xs font-medium">Usuários > 5 dias</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Heatmap / Department Adoption */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-gray-900">Termômetro por Departamento</h3>
              <p className="text-xs text-gray-500">Taxa de adoção do app e volume de participações ativas.</p>
            </div>
          </div>

          <div className="flex flex-col gap-5 mt-2">
            {departments.map((dept, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-1/3 flex flex-col">
                  <span className="text-sm font-bold text-gray-900 truncate">{dept.name}</span>
                  <span className="text-xs text-gray-500">{dept.praises} elogios enviados</span>
                </div>
                
                <div className="flex-1 flex items-center gap-3">
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all ${
                        dept.adoption > 80 ? 'bg-emerald-500' : 
                        dept.adoption > 50 ? 'bg-amber-400' : 'bg-rose-400'
                      }`}
                      style={{ width: `${dept.adoption}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-700 w-10 text-right">{dept.adoption}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 3 Leaderboard */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Trophy size={20} className="text-amber-500" />
            <h3 className="font-bold text-gray-900">Top Engajamento</h3>
          </div>

          <div className="flex flex-col gap-4">
            {topUsers.map((user, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all cursor-default">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center flex-shrink-0 relative">
                  {user.avatar}
                  {idx === 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 border border-white rounded-full flex items-center justify-center text-[10px]">👑</span>}
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-sm font-bold text-gray-900">{user.name}</span>
                  <span className="text-xs text-gray-500">{user.dept}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-indigo-600">{user.points}</span>
                  <Zap size={14} className="text-indigo-400 fill-indigo-400" />
                </div>
              </div>
            ))}
          </div>
          
          <button className="mt-auto pt-6 text-indigo-600 text-sm font-bold hover:underline text-center w-full">
            Ver Ranking Completo →
          </button>
        </div>

      </div>

    </div>
  )
}
