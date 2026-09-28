"use client"

import React from "react"
import { Leaf, Calendar, Car, Info, ChevronRight } from "lucide-react"
import { useEcoStore } from "@/shared/store/use-eco-store"
import { Button } from "@/shared/ui/button"

export default function MarketplacePage() {
  const { ecoPoints, redeemReward } = useEcoStore()

  const handleRedeem = (cost: number, itemName: string) => {
    const success = redeemReward(cost)
    if (success) {
      alert(`Resgate de ${itemName} realizado com sucesso! Aproveite.`)
    } else {
      alert(`Saldo insuficiente. Faltam ${cost - ecoPoints} EcoPoints.`)
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 w-full max-w-4xl mx-auto">
      <div className="bg-[#00a859] rounded-2xl p-6 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded-full text-[#00a859]">
            <Leaf size={32} />
          </div>
          <div>
            <p className="text-sm font-medium text-green-100">Seu saldo atual</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">{ecoPoints}</span>
              <span className="text-sm font-medium">EcoPoints</span>
            </div>
          </div>
        </div>
        <ChevronRight size={24} className="text-green-200" />
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Recompensas disponíveis</h2>
        <p className="text-sm text-gray-500 mt-1">Troque seus EcoPoints por benefícios sustentáveis.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recompensa 1 */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="bg-gray-100 rounded-xl p-4 flex-shrink-0 flex items-center justify-center">
              <Calendar size={48} className="text-gray-700" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">1 Day-off</h3>
              <p className="text-sm text-gray-900 font-medium">(Folga Semanal)</p>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">Um dia de folga para você descansar e recarregar!</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[#00a859] font-semibold text-sm">
            <Leaf size={16} />
            500 EcoPoints
          </div>
          <Button 
            className="w-full bg-gray-100 text-gray-900 hover:bg-gray-200 font-semibold" 
            onClick={() => handleRedeem(500, "1 Day-off")}
          >
            Resgatar
          </Button>
        </div>

        {/* Recompensa 2 */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="bg-gray-100 rounded-xl p-4 flex-shrink-0 flex items-center justify-center font-bold text-2xl text-gray-900 w-[80px] h-[80px]">
              Uber
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">R$ 20</h3>
              <p className="text-sm text-gray-900 font-medium">Cupom de Mobilidade / Uber</p>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">Use seu cupom para corridas mais sustentáveis.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[#00a859] font-semibold text-sm">
            <Leaf size={16} />
            150 EcoPoints
          </div>
          <Button 
            className="w-full bg-gray-100 text-gray-900 hover:bg-gray-200 font-semibold"
            onClick={() => handleRedeem(150, "Cupom Uber R$20")}
          >
            Resgatar
          </Button>
        </div>
      </div>

      <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-3 mt-4 text-gray-700 text-sm font-medium">
        <Info size={20} className="text-gray-500 flex-shrink-0" />
        Novas recompensas são adicionadas toda semana!
      </div>
    </div>
  )
}
