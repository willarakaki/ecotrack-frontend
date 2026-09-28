"use client"

import React from "react"
import { User, Users, Leaf, ArrowRight } from "lucide-react"
import { useEcoStore } from "@/shared/store/use-eco-store"
import { AnimatedNumber } from "@/shared/ui/animated-number"
import Link from "next/link"

export default function DashboardPage() {
  const { individualCarbonSaved, companyCarbonSaved } = useEcoStore()

  // Se o usuário ainda não tiver gerado nenhum impacto, mostramos um estado vazio acolhedor.
  const isEmptyState = individualCarbonSaved === 0

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 w-full max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Olá, Willian!</h1>
        <p className="text-sm text-gray-500 mt-1">
          {isEmptyState ? "Seu primeiro passo rumo à sustentabilidade começa hoje." : "Acompanhe seu impacto e transforme o futuro"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Individual */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gray-100 p-3 rounded-full text-gray-600">
              <User size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Individual</p>
              <h2 className="font-semibold text-gray-900">Sua Pegada de Carbono Evitada</h2>
            </div>
          </div>
          
          <div className="mb-8">
            <span className="text-5xl font-bold text-[#00a859] tracking-tighter">
              -{!isEmptyState ? <AnimatedNumber value={individualCarbonSaved} isFloat /> : 0}
            </span>
            <span className="text-lg text-[#00a859] font-medium ml-2">
              kg de CO₂
            </span>
          </div>

          <div className="mt-auto">
            {isEmptyState ? (
              <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-6 text-center flex flex-col items-center">
                <p className="text-sm text-gray-500 mb-4 font-medium">Você ainda não registrou nenhuma atividade.</p>
                <Link href="/activities" className="bg-[#00a859] hover:bg-[#00904a] text-white text-sm font-medium py-2 px-4 rounded-lg inline-flex items-center gap-2 transition-colors">
                  Validar Primeira Ação
                  <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-4">Evolução nas últimas 4 semanas</p>
                <div className="h-32 w-full border-b border-l border-gray-200 relative flex items-end">
                   <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                     <polyline 
                       points="0,80 33,60 66,40 100,20" 
                       fill="none" 
                       stroke="#00a859" 
                       strokeWidth="2" 
                     />
                     <circle cx="0" cy="80" r="3" fill="#fff" stroke="#00a859" strokeWidth="2" />
                     <circle cx="33" cy="60" r="3" fill="#fff" stroke="#00a859" strokeWidth="2" />
                     <circle cx="66" cy="40" r="3" fill="#fff" stroke="#00a859" strokeWidth="2" />
                     <circle cx="100" cy="20" r="3" fill="#fff" stroke="#00a859" strokeWidth="2" />
                   </svg>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>Sem 1</span>
                  <span>Sem 2</span>
                  <span>Sem 3</span>
                  <span>Sem 4</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Card Coletivo */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gray-100 p-3 rounded-full text-gray-600">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Coletivo / Time</p>
              <h2 className="font-semibold text-gray-900">Impacto Geral da Empresa</h2>
            </div>
          </div>
          
          <div className="mb-8">
            <span className="text-5xl font-bold text-[#00a859] tracking-tighter">
              -{!isEmptyState ? <AnimatedNumber value={companyCarbonSaved} isFloat /> : 0}
            </span>
            <span className="text-lg text-[#00a859] font-medium ml-2">
              Toneladas de CO₂
            </span>
            <p className="text-sm text-gray-500 mt-1">Evitadas coletivamente</p>
          </div>

          <div className="mt-auto">
            <p className="text-sm text-gray-500 mb-2">Progresso da meta de sustentabilidade do mês</p>
            <div className="w-full bg-gray-200 rounded-full h-6 relative overflow-hidden flex items-center">
              <div className="bg-[#00a859] h-full" style={{ width: '80%' }}></div>
              <span className="absolute right-4 text-xs font-bold text-white z-10">80%</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>0%</span>
              <span>100%</span>
            </div>

            <div className="mt-6 bg-gray-100 rounded-lg p-4 flex items-center gap-3">
              <Leaf className="text-gray-500" size={20} />
              <p className="text-sm text-gray-600 font-medium">Juntos, estamos construindo um futuro mais sustentável!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
