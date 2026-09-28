"use client"

import React from "react"
import { TrendingUp, Users, Leaf, ArrowUpRight, ArrowDownRight, FileCheck, AlertCircle } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      
      {/* Header Info */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Visão Geral do ROI ESG</h1>
          <p className="text-gray-500 mt-1">Acompanhe o retorno sobre investimento e engajamento da EcoCorp S.A.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm">
          Exportar Relatório PDF
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* KPI 1 */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 rounded-xl">
              <Leaf size={24} className="text-emerald-600" />
            </div>
            <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <ArrowUpRight size={14} className="mr-1" /> +12%
            </span>
          </div>
          <span className="text-gray-500 text-sm font-medium">Carbono Evitado (Escopo 3)</span>
          <div className="flex items-baseline gap-2 mt-1">
            <h2 className="text-3xl font-bold text-gray-900">1.4</h2>
            <span className="text-gray-500 font-medium">Toneladas</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-50 rounded-xl">
              <TrendingUp size={24} className="text-indigo-600" />
            </div>
            <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <ArrowUpRight size={14} className="mr-1" /> +R$ 3.2k
            </span>
          </div>
          <span className="text-gray-500 text-sm font-medium">Economia Operacional (Luz/Papel)</span>
          <div className="flex items-baseline gap-2 mt-1">
            <h2 className="text-3xl font-bold text-gray-900">R$ 8.500</h2>
            <span className="text-gray-500 font-medium">vs R$ 5k gasto</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 rounded-xl">
              <Users size={24} className="text-orange-600" />
            </div>
            <span className="flex items-center text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">
              <ArrowDownRight size={14} className="mr-1" /> -2%
            </span>
          </div>
          <span className="text-gray-500 text-sm font-medium">Adoção Ativa do App</span>
          <div className="flex items-baseline gap-2 mt-1">
            <h2 className="text-3xl font-bold text-gray-900">84%</h2>
            <span className="text-gray-500 font-medium">da base</span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Area */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm lg:col-span-2 flex flex-col">
          <h3 className="font-bold text-gray-900 mb-6">Investimento em Recompensas vs Retorno (ROI)</h3>
          
          <div className="flex-1 flex items-end gap-6 h-64 mt-auto border-b border-gray-100 pb-2 relative">
            {/* Fake Chart Grid */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-t border-gray-300 w-full"></div>
              <div className="border-t border-gray-300 w-full"></div>
              <div className="border-t border-gray-300 w-full"></div>
              <div className="border-t border-gray-300 w-full"></div>
            </div>

            {/* Bars */}
            <div className="flex flex-col items-center gap-2 flex-1 group">
              <div className="flex items-end gap-1 w-full justify-center h-full">
                <div className="w-8 bg-slate-200 rounded-t-md h-[30%] group-hover:bg-slate-300 transition-colors relative"><span className="absolute -top-6 text-xs text-gray-500 opacity-0 group-hover:opacity-100 font-medium">R$2k</span></div>
                <div className="w-8 bg-indigo-500 rounded-t-md h-[40%] group-hover:bg-indigo-600 transition-colors relative"><span className="absolute -top-6 text-xs text-indigo-600 opacity-0 group-hover:opacity-100 font-bold">R$3k</span></div>
              </div>
              <span className="text-xs text-gray-500 font-medium">Jun</span>
            </div>

            <div className="flex flex-col items-center gap-2 flex-1 group">
              <div className="flex items-end gap-1 w-full justify-center h-full">
                <div className="w-8 bg-slate-200 rounded-t-md h-[35%] group-hover:bg-slate-300 transition-colors relative"><span className="absolute -top-6 text-xs text-gray-500 opacity-0 group-hover:opacity-100 font-medium">R$2.5k</span></div>
                <div className="w-8 bg-indigo-500 rounded-t-md h-[55%] group-hover:bg-indigo-600 transition-colors relative"><span className="absolute -top-6 text-xs text-indigo-600 opacity-0 group-hover:opacity-100 font-bold">R$4.5k</span></div>
              </div>
              <span className="text-xs text-gray-500 font-medium">Jul</span>
            </div>

            <div className="flex flex-col items-center gap-2 flex-1 group">
              <div className="flex items-end gap-1 w-full justify-center h-full">
                <div className="w-8 bg-slate-200 rounded-t-md h-[50%] group-hover:bg-slate-300 transition-colors relative"><span className="absolute -top-6 text-xs text-gray-500 opacity-0 group-hover:opacity-100 font-medium">R$4k</span></div>
                <div className="w-8 bg-indigo-500 rounded-t-md h-[75%] group-hover:bg-indigo-600 transition-colors relative"><span className="absolute -top-6 text-xs text-indigo-600 opacity-0 group-hover:opacity-100 font-bold">R$6k</span></div>
              </div>
              <span className="text-xs text-gray-500 font-medium">Ago</span>
            </div>

            <div className="flex flex-col items-center gap-2 flex-1 group">
              <div className="flex items-end gap-1 w-full justify-center h-full">
                <div className="w-8 bg-slate-200 rounded-t-md h-[60%] group-hover:bg-slate-300 transition-colors relative"><span className="absolute -top-6 text-xs text-gray-500 opacity-0 group-hover:opacity-100 font-medium">R$5k</span></div>
                <div className="w-8 bg-emerald-500 rounded-t-md h-[95%] group-hover:bg-emerald-600 transition-colors relative"><span className="absolute -top-6 text-xs text-emerald-600 opacity-0 group-hover:opacity-100 font-bold">R$8.5k</span></div>
              </div>
              <span className="text-xs text-gray-900 font-bold">Set</span>
            </div>
          </div>
          
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2 text-xs text-gray-600"><div className="w-3 h-3 bg-slate-200 rounded-sm"></div> Custo em Recompensas</div>
            <div className="flex items-center gap-2 text-xs text-gray-600"><div className="w-3 h-3 bg-indigo-500 rounded-sm"></div> Economia Operacional / Retenção</div>
          </div>
        </div>

        {/* Audit Table Preview */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Últimas Validações de Escopo 3</h3>
            <p className="text-xs text-gray-500 mt-1">Aprovadas via Gatekeeper Ollama/Gemini</p>
          </div>
          
          <div className="flex flex-col">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <FileCheck size={16} />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-sm font-bold text-gray-900">Mobilidade (Metrô)</span>
                  <span className="text-xs text-gray-500">Willian A. • Há 2 horas</span>
                </div>
                <div className="text-right">
                  <span className="block text-xs font-bold text-gray-900">Anexo Seguro</span>
                  <span className="block text-[10px] text-emerald-600 font-medium">1.2kg CO2e</span>
                </div>
              </div>
            ))}
            
            <div className="p-4 text-center">
              <button className="text-indigo-600 text-sm font-bold hover:underline">Ver Tabela Completa →</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
