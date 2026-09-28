"use client"

import React from "react"
import { Cloud, Train, Home, Bus, Bike, Recycle, Coffee, ChevronRight, Leaf } from "lucide-react"
import { useEcoStore } from "@/shared/store/use-eco-store"
import { AnimatedNumber } from "@/shared/ui/animated-number"

const historyMock = [
  { id: 1, title: "Uso de Metrô - Linha Verde", date: "15/06/2026", time: "08:17", co2: -1.2, icon: Train },
  { id: 2, title: "Home Office Sustentável", date: "12/06/2026", time: "09:30", co2: -0.8, icon: Home },
  { id: 3, title: "Ônibus - Linha 174P", date: "14/06/2026", time: "18:45", co2: -0.6, icon: Bus },
  { id: 4, title: "Bicicleta - 5 km", date: "13/06/2026", time: "07:55", co2: -1.0, icon: Bike },
  { id: 5, title: "Coleta Seletiva", date: "12/06/2026", time: "21:10", co2: -0.4, icon: Recycle },
  { id: 6, title: "Consumo Consciente", date: "11/06/2026", time: "12:05", co2: -0.7, icon: Coffee },
]

export default function ImpactPage() {
  const { individualCarbonSaved } = useEcoStore()

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 w-full max-w-4xl mx-auto pb-24">
      {/* Header Card */}
      <div className="bg-gray-800 rounded-2xl p-6 text-white flex items-center justify-between shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-4 z-10">
          <div className="bg-white p-3 rounded-full text-gray-800 flex-shrink-0">
            <Leaf size={32} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-300">Você já evitou:</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold"><AnimatedNumber value={individualCarbonSaved} isFloat /></span>
              <span className="text-sm font-medium text-gray-300">kg de CO₂</span>
            </div>
          </div>
        </div>
        <Cloud size={64} className="text-gray-700 absolute right-4 opacity-50 z-0" />
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Histórico de Impacto</h2>
        <p className="text-sm text-gray-500 mt-1">Confira suas últimas ações validadas e o impacto gerado.</p>
      </div>

      <div className="flex flex-col gap-3">
        {historyMock.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 p-3 rounded-lg text-gray-600">
                <item.icon size={24} />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-900">{item.title}</span>
                <span className="text-xs text-gray-500">{item.date} • {item.time}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-[#00a859]">{item.co2.toFixed(1)} kg CO₂</span>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 rounded-xl p-4 flex gap-3 mt-2 text-gray-700 text-sm font-medium">
        <Leaf size={20} className="text-gray-500 flex-shrink-0" />
        <p>Os cálculos são baseados em fatores reconhecidos e validados pela EcoTrack AI</p>
      </div>
    </div>
  )
}
