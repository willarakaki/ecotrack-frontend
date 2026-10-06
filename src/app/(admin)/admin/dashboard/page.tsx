"use client"

import React from "react"
import Link from "next/link"
import { TrendingUp, Users, Leaf, ArrowUpRight, ArrowDownRight, FileCheck } from "lucide-react"

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
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm lg:col-span-2 flex flex-col relative">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-bold text-gray-900">Investimento em Recompensas vs Retorno (ROI)</h3>
            <div className="bg-gray-100 p-1 rounded-lg flex text-xs font-medium">
              <button className="px-3 py-1 bg-white shadow-sm rounded-md text-gray-900">Mensal</button>
              <button className="px-3 py-1 text-gray-500 hover:text-gray-900">Semestral</button>
            </div>
          </div>
          
          <div className="flex-1 flex items-end gap-6 h-64 mt-auto border-b border-gray-100 pb-2 relative">
            
            {/* Linha de Tendência de Lucro (SVG Line) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none">
              <path 
                d="M 50,180 C 150,180 250,130 350,100 C 450,70 550,50 650,20" 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="3" 
                strokeDasharray="6 6"
                className="opacity-70"
              />
            </svg>

            {/* Fake Chart Grid */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-t border-gray-300 w-full relative"><span className="absolute -top-3 -left-8 text-[10px]">10k</span></div>
              <div className="border-t border-gray-300 w-full relative"><span className="absolute -top-3 -left-8 text-[10px]">7.5k</span></div>
              <div className="border-t border-gray-300 w-full relative"><span className="absolute -top-3 -left-8 text-[10px]">5k</span></div>
              <div className="border-t border-gray-300 w-full relative"><span className="absolute -top-3 -left-8 text-[10px]">2.5k</span></div>
            </div>

            {/* Bars */}
            <div className="flex flex-col items-center gap-2 flex-1 group z-20 relative">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white shadow-lg border border-gray-100 px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-40 flex flex-col items-center gap-1 whitespace-nowrap pointer-events-none">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Junho</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-slate-300"></div><span className="text-xs font-medium text-slate-600">R$ 2k</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-indigo-500"></div><span className="text-xs font-bold text-indigo-700">R$ 3k</span></div>
                </div>
              </div>
              <div className="flex items-end gap-1 w-full justify-center h-full">
                <div className="w-8 md:w-12 bg-slate-200 rounded-t-md h-[30%] group-hover:bg-slate-300 transition-colors"></div>
                <div className="w-8 md:w-12 bg-indigo-500 rounded-t-md h-[40%] group-hover:bg-indigo-600 transition-colors"></div>
              </div>
              <span className="text-xs text-gray-500 font-medium">Jun</span>
            </div>

            <div className="flex flex-col items-center gap-2 flex-1 group z-20 relative">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white shadow-lg border border-gray-100 px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-40 flex flex-col items-center gap-1 whitespace-nowrap pointer-events-none">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Julho</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-slate-300"></div><span className="text-xs font-medium text-slate-600">R$ 2.5k</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-indigo-500"></div><span className="text-xs font-bold text-indigo-700">R$ 4.5k</span></div>
                </div>
              </div>
              <div className="flex items-end gap-1 w-full justify-center h-full">
                <div className="w-8 md:w-12 bg-slate-200 rounded-t-md h-[35%] group-hover:bg-slate-300 transition-colors"></div>
                <div className="w-8 md:w-12 bg-indigo-500 rounded-t-md h-[55%] group-hover:bg-indigo-600 transition-colors"></div>
              </div>
              <span className="text-xs text-gray-500 font-medium">Jul</span>
            </div>

            <div className="flex flex-col items-center gap-2 flex-1 group z-20 relative">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white shadow-lg border border-gray-100 px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-40 flex flex-col items-center gap-1 whitespace-nowrap pointer-events-none">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Agosto</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-slate-300"></div><span className="text-xs font-medium text-slate-600">R$ 4k</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-indigo-500"></div><span className="text-xs font-bold text-indigo-700">R$ 6k</span></div>
                </div>
              </div>
              <div className="flex items-end gap-1 w-full justify-center h-full">
                <div className="w-8 md:w-12 bg-slate-200 rounded-t-md h-[50%] group-hover:bg-slate-300 transition-colors"></div>
                <div className="w-8 md:w-12 bg-indigo-500 rounded-t-md h-[75%] group-hover:bg-indigo-600 transition-colors"></div>
              </div>
              <span className="text-xs text-gray-500 font-medium">Ago</span>
            </div>

            <div className="flex flex-col items-center gap-2 flex-1 group z-20 relative">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white shadow-lg border border-emerald-200 px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-40 flex flex-col items-center gap-1 whitespace-nowrap pointer-events-none">
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-0.5">Setembro</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-slate-300"></div><span className="text-xs font-medium text-slate-600">R$ 5k</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-emerald-500"></div><span className="text-xs font-bold text-emerald-700">R$ 8.5k</span></div>
                </div>
              </div>
              <div className="flex items-end gap-1 w-full justify-center h-full">
                <div className="w-8 md:w-12 bg-slate-200 rounded-t-md h-[60%] group-hover:bg-slate-300 transition-colors"></div>
                <div className="w-8 md:w-12 bg-emerald-500 rounded-t-md h-[95%] group-hover:bg-emerald-600 transition-colors"></div>
              </div>
              <span className="text-xs text-gray-900 font-bold">Set</span>
            </div>
          </div>
          
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2 text-xs text-gray-600"><div className="w-3 h-3 bg-slate-200 rounded-sm"></div> Custo (Prêmios)</div>
            <div className="flex items-center gap-2 text-xs text-gray-600"><div className="w-3 h-3 bg-indigo-500 rounded-sm"></div> Economia / Retenção</div>
            <div className="flex items-center gap-2 text-xs text-gray-600"><div className="w-4 h-0.5 border-t-2 border-dashed border-emerald-500"></div> Tendência</div>
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
              <Link href="/admin/audit" className="text-indigo-600 text-sm font-bold hover:underline">
                Ver Tabela Completa →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
