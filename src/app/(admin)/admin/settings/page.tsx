"use client"

import React, { useState } from "react"
import { Building2, Palette, Shield, Bot, Save, CreditCard, Users, Link as LinkIcon, Upload } from "lucide-react"
import { Button } from "@/shared/ui/button"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("whitelabel")

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-12 h-full">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Configurações do Tenant</h1>
          <p className="text-gray-500 mt-1">Personalização do aplicativo (White-label), faturamento e integrações.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
          <Save size={16} className="mr-2" /> Salvar Alterações
        </Button>
      </div>

      <div className="flex gap-8">
        
        {/* Sidebar Settings Menu */}
        <div className="w-64 flex-shrink-0 flex flex-col gap-1">
          <button 
            onClick={() => setActiveTab("whitelabel")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${activeTab === "whitelabel" ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50"}`}
          >
            <Palette size={18} /> Marca e White-label
          </button>
          <button 
            onClick={() => setActiveTab("ai")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${activeTab === "ai" ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50"}`}
          >
            <Bot size={18} /> Gatekeeper e IA
          </button>
          <button 
            onClick={() => setActiveTab("team")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${activeTab === "team" ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50"}`}
          >
            <Users size={18} /> Permissões da Equipe
          </button>
          <button 
            onClick={() => setActiveTab("billing")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${activeTab === "billing" ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50"}`}
          >
            <CreditCard size={18} /> Faturamento (Billing)
          </button>
          <button 
            onClick={() => setActiveTab("integrations")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${activeTab === "integrations" ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50"}`}
          >
            <LinkIcon size={18} /> ERP e Integrações
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm p-8 min-h-[500px]">
          
          {/* Tab: White Label */}
          {activeTab === "whitelabel" && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Personalização (White-Label)</h2>
                <p className="text-sm text-gray-500 mt-1">Adapte a experiência visual do aplicativo para os funcionários da EcoCorp S.A.</p>
              </div>

              <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700">Logo da Empresa</label>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center p-2">
                      <img src="/logo.jpg" alt="Logo" className="max-w-full max-h-full rounded-md" />
                    </div>
                    <Button variant="outline" className="bg-white border-gray-300 text-gray-600">
                      <Upload size={16} className="mr-2" /> Fazer Upload
                    </Button>
                    <span className="text-xs text-gray-400">JPG, PNG ou SVG. Máx 2MB.</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">Cor Primária (Botões e Destaques)</label>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#00a859] border border-gray-200 shadow-sm"></div>
                      <input type="text" defaultValue="#00a859" className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">Nome do Aplicativo</label>
                    <input type="text" defaultValue="EcoTrack Corporate" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <label className="text-sm font-bold text-gray-700">Mensagem de Boas-Vindas (Login)</label>
                  <textarea 
                    defaultValue="Inteligência que transforma ações em impacto positivo." 
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 min-h-[80px]"
                  />
                </div>

              </div>
            </div>
          )}

          {/* Tab: Inteligência Artificial */}
          {activeTab === "ai" && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Motor de Inteligência Artificial</h2>
                <p className="text-sm text-gray-500 mt-1">Configure as políticas do Gatekeeper Anti-Fraude e do Copilot.</p>
              </div>

              <div className="flex flex-col gap-6 border-t border-gray-100 pt-6">
                
                <div className="flex items-center justify-between p-4 border border-indigo-100 bg-indigo-50/50 rounded-xl">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 flex items-center gap-2"><Bot size={18} className="text-indigo-600" /> Copilot Assistente</span>
                    <span className="text-sm text-gray-500">Permitir que os funcionários conversem com a IA corporativa.</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="text-sm font-bold text-gray-700">Rigor do Gatekeeper (Validador de Fotos)</span>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-indigo-500 transition-colors">
                      <span className="block font-bold text-gray-900 mb-1">Brandos (Fast)</span>
                      <span className="text-xs text-gray-500">Aprova maioria das imagens borradas. Usa menos GPU.</span>
                    </div>
                    <div className="border-2 border-indigo-500 bg-indigo-50/20 rounded-xl p-4 cursor-pointer relative">
                      <div className="absolute -top-3 -right-2 bg-indigo-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">Ativo</div>
                      <span className="block font-bold text-gray-900 mb-1">Moderado</span>
                      <span className="text-xs text-gray-500">Equilíbrio perfeito entre fricção e prevenção de fraudes.</span>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-indigo-500 transition-colors">
                      <span className="block font-bold text-gray-900 mb-1">Rígido (High Trust)</span>
                      <span className="text-xs text-gray-500">Rejeita qualquer foto sem texto legível ou data.</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Empty states for other tabs */}
          {["team", "billing", "integrations"].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Shield size={48} className="text-gray-300" />
              <h3 className="font-bold text-gray-900">Em Breve</h3>
              <p className="text-sm text-gray-500 max-w-sm">Esta área estará disponível após o setup inicial da infraestrutura (Sprint 20).</p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
