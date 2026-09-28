"use client"

import React, { useState } from "react"
import { Search, Filter, FileText, CheckCircle, XCircle, Download, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/shared/ui/button"

const auditData = [
  { id: "TKT-8492", user: "Willian Arakaki", dept: "Engenharia", category: "Mobilidade", date: "28 Set 2026", carbon: "1.2 kg", aiStatus: "Aprovado", confidence: "98%" },
  { id: "TKT-8491", user: "Maria Souza", dept: "RH", category: "Resíduos", date: "28 Set 2026", carbon: "0.5 kg", aiStatus: "Aprovado", confidence: "95%" },
  { id: "TKT-8490", user: "João Silva", dept: "Marketing", category: "Energia", date: "27 Set 2026", carbon: "3.4 kg", aiStatus: "Rejeitado", confidence: "45%" },
  { id: "TKT-8489", user: "Carlos Mendes", dept: "Comercial", category: "Mobilidade", date: "27 Set 2026", carbon: "2.1 kg", aiStatus: "Aprovado", confidence: "99%" },
  { id: "TKT-8488", user: "Ana Costa", dept: "Engenharia", category: "Compras ESG", date: "26 Set 2026", carbon: "0.8 kg", aiStatus: "Aprovado", confidence: "92%" },
]

export default function AuditPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto h-full">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Auditoria de Escopo 3</h1>
          <p className="text-gray-500 mt-1">Evidências validadas pelo Gatekeeper de Inteligência Artificial para relatório oficial.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="text-gray-600 border-gray-300 bg-white shadow-sm">
            <Filter size={16} className="mr-2" /> Filtros Avançados
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
            <Download size={16} className="mr-2" /> Exportar CSV/PDF
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por ID, colaborador ou departamento..." 
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-shadow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Total de registros: <strong>1.432</strong></span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">ID Transação</th>
                <th className="px-6 py-4">Colaborador</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Data do Envio</th>
                <th className="px-6 py-4">CO2e Evitado</th>
                <th className="px-6 py-4">Validação IA</th>
                <th className="px-6 py-4 text-right">Comprovante</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {auditData.map((row) => (
                <tr key={row.id} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{row.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900">{row.user}</span>
                      <span className="text-xs text-gray-500">{row.dept}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      {row.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{row.date}</td>
                  <td className="px-6 py-4 font-bold text-emerald-600">{row.carbon}</td>
                  <td className="px-6 py-4">
                    {row.aiStatus === "Aprovado" ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-emerald-500" />
                        <div className="flex flex-col">
                          <span className="text-emerald-700 font-medium text-xs">Aprovado</span>
                          <span className="text-[10px] text-gray-400">Confiança: {row.confidence}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <XCircle size={16} className="text-rose-500" />
                        <div className="flex flex-col">
                          <span className="text-rose-700 font-medium text-xs">Rejeitado</span>
                          <span className="text-[10px] text-gray-400">Suspeita de Fraude</span>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50">
                      <Eye size={16} className="mr-2" /> Visualizar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>Mostrando 1 a 5 de 1.432 resultados</span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="w-8 h-8 rounded-md border-gray-200" disabled>
              <ChevronLeft size={16} />
            </Button>
            <Button variant="outline" className="w-8 h-8 rounded-md bg-indigo-50 border-indigo-200 text-indigo-600 font-bold p-0">1</Button>
            <Button variant="outline" className="w-8 h-8 rounded-md border-gray-200 hover:bg-gray-50 p-0">2</Button>
            <Button variant="outline" className="w-8 h-8 rounded-md border-gray-200 hover:bg-gray-50 p-0">3</Button>
            <span className="px-2">...</span>
            <Button variant="outline" size="icon" className="w-8 h-8 rounded-md border-gray-200 hover:bg-gray-50">
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
