"use client"

import React from "react"
import { Target, Leaf, Crosshair, Zap, Save, Plus } from "lucide-react"
import { Button } from "@/shared/ui/button"

export default function GoalsPage() {
  const companyGoals = [
    { title: "Net Zero Escopo 3 (Home Office)", target: "10 Toneladas", current: "1.4 Toneladas", progress: 14, color: "bg-emerald-500" },
    { title: "Engajamento da Base ESG", target: "90% Adoção", current: "84%", progress: 93, color: "bg-indigo-500" },
    { title: "Papel Zero (Digitalização)", target: "100.000 Folhas", current: "34.500 Folhas", progress: 34, color: "bg-amber-500" },
  ]

  const pointWeights = [
    { activity: "Deslocamento sem Carbono (Bike/A pé)", currentPoints: 50, suggested: 50 },
    { activity: "Deslocamento Baixo Carbono (Metrô/Trem)", currentPoints: 20, suggested: 25 },
    { activity: "Refeição Vegetariana (Opcional)", currentPoints: 10, suggested: 10 },
    { activity: "Separação de Resíduos (Reciclagem)", currentPoints: 15, suggested: 15 },
    { activity: "Compras de Fornecedores ESG", currentPoints: 100, suggested: 100 },
  ]

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Metas e Diretrizes ESG</h1>
          <p className="text-gray-500 mt-1">Gerencie os objetivos macro da empresa e calibre a gamificação do app.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
          <Save size={16} className="mr-2" /> Salvar Configurações
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Macro Goals */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Target size={22} className="text-emerald-500" />
              Objetivos Corporativos 2026
            </h2>
            <Button variant="ghost" size="sm" className="text-indigo-600 hover:bg-indigo-50">
              <Plus size={16} className="mr-1" /> Nova Meta
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            {companyGoals.map((goal, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-gray-900">{goal.title}</span>
                  <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">Alvo: {goal.target}</span>
                </div>
                
                <div className="flex flex-col gap-1 mt-2">
                  <div className="flex justify-between text-xs font-medium text-gray-500">
                    <span>Atual: {goal.current}</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full ${goal.color}`} style={{ width: `${goal.progress}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gamification Engine (Point Weights) */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Crosshair size={22} className="text-indigo-500" />
                Calibragem da Gamificação
              </h2>
              <p className="text-xs text-gray-500 mt-1">Ajuste quantos pontos cada ação gera para direcionar o comportamento da equipe.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between text-xs font-bold text-gray-500 uppercase">
              <span>Ação de Escopo 3</span>
              <span>Recompensa (Pontos)</span>
            </div>
            
            <div className="flex flex-col divide-y divide-gray-100">
              {pointWeights.map((weight, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Zap size={16} className="text-amber-500 fill-amber-500" />
                    <span className="text-sm font-medium text-gray-900">{weight.activity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      defaultValue={weight.currentPoints}
                      className="w-16 px-2 py-1 text-center text-sm font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="text-xs text-gray-400">pts</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-indigo-50/50 border-t border-indigo-100 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-indigo-700 text-sm font-bold">
                <Leaf size={16} /> Dica Estratégica do Gatekeeper IA
              </div>
              <p className="text-xs text-indigo-600/80 leading-relaxed">
                A IA detectou que a meta "Net Zero Escopo 3" está atrasada (14%). Recomendamos aumentar a recompensa de <strong>Deslocamento Baixo Carbono</strong> temporariamente para +35 pts para acelerar o engajamento nesta categoria.
              </p>
              <button className="self-start text-xs font-bold bg-white text-indigo-700 border border-indigo-200 px-3 py-1.5 rounded-md hover:bg-indigo-100 mt-1 transition-colors shadow-sm">
                Aplicar Sugestão da IA
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}
