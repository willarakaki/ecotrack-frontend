"use client"

import React, { useState } from "react"
import { Leaf, Calendar, Info, ChevronRight, Gift, Coffee, Headphones, CheckCircle, Ticket } from "lucide-react"
import { useEcoStore } from "@/shared/store/use-eco-store"
import { Button } from "@/shared/ui/button"
import { AnimatedNumber } from "@/shared/ui/animated-number"
import confetti from "canvas-confetti"

export default function MarketplacePage() {
  const { ecoPoints, redeemReward, redeemedRewards } = useEcoStore()
  const [successModal, setSuccessModal] = useState<string | null>(null)
  const [errorModal, setErrorModal] = useState<{ needed: number } | null>(null)

  const handleRedeem = (cost: number, itemName: string) => {
    const success = redeemReward(cost, itemName)
    if (success) {
      setSuccessModal(itemName)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00a859', '#ffffff', '#ffeb3b']
      })
    } else {
      setErrorModal({ needed: cost - ecoPoints })
    }
  }

  const availableRewards = [
    {
      id: "ifood",
      name: "Cupom R$ 15 iFood",
      desc: "Um café ou lanche para o seu dia.",
      points: 1500,
      icon: Coffee,
      label: "R$ 15"
    },
    {
      id: "uber",
      name: "Cupom Uber R$ 20",
      desc: "Use seu cupom para corridas mais sustentáveis.",
      points: 2000,
      icon: null,
      label: "Uber"
    },
    {
      id: "spotify",
      name: "Spotify Premium (1 mês)",
      desc: "Curta suas músicas sem interrupções.",
      points: 5000,
      icon: Headphones,
      label: "Música"
    },
    {
      id: "dayoff",
      name: "1 Day-off",
      desc: "Um dia de folga para você descansar e recarregar!",
      points: 15000,
      icon: Calendar,
      label: "Folga"
    }
  ]

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 w-full max-w-4xl mx-auto pb-24 relative">
      
      {/* Saldo Header */}
      <div className="bg-[#00a859] rounded-2xl p-6 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded-full text-[#00a859]">
            <Leaf size={32} />
          </div>
          <div>
            <p className="text-sm font-medium text-green-100">Seu saldo atual</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold"><AnimatedNumber value={ecoPoints} /></span>
              <span className="text-sm font-medium">EcoPoints</span>
            </div>
          </div>
        </div>
        <ChevronRight size={24} className="text-green-200" />
      </div>

      {/* Rewards Grid */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Recompensas Disponíveis</h2>
        <p className="text-sm text-gray-500 mt-1">Troque seus EcoPoints por benefícios reais.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableRewards.map((reward) => (
          <div key={reward.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between gap-4">
            <div className="flex gap-4">
              <div className="bg-gray-100 rounded-xl p-4 flex-shrink-0 flex items-center justify-center text-gray-900 w-[80px] h-[80px]">
                {reward.icon ? <reward.icon size={32} className="text-gray-700" /> : <span className="font-bold text-xl">{reward.label}</span>}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 leading-tight">{reward.name}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{reward.desc}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1 text-[#00a859] font-bold text-sm bg-green-50 px-2 py-1 rounded-md">
                <Leaf size={14} />
                {reward.points}
              </div>
              <Button 
                size="sm"
                className="bg-gray-900 text-white hover:bg-gray-800 font-semibold rounded-lg px-6" 
                onClick={() => handleRedeem(reward.points, reward.name)}
              >
                Resgatar
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Meus Resgates */}
      {redeemedRewards.length > 0 && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Gift size={20} className="text-[#00a859]"/> Meus Resgates
          </h2>
          <div className="flex flex-col gap-3 mt-4">
            {redeemedRewards.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-lg text-gray-600">
                    <Ticket size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900">{item.name}</span>
                    <span className="text-xs text-[#00a859] font-medium font-mono">CUPOM-{item.id.slice(-6).toUpperCase()}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-400 font-medium">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-3 mt-4 text-gray-700 text-sm font-medium">
        <Info size={20} className="text-gray-500 flex-shrink-0" />
        Novas recompensas são adicionadas toda semana!
      </div>

      {/* Modais Customizados */}
      {successModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#00a859]">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Sucesso!</h3>
            <p className="text-gray-600 mb-6">Você resgatou <strong>{successModal}</strong> com sucesso.</p>
            <Button className="w-full bg-[#00a859] hover:bg-[#00904a] text-white" size="lg" onClick={() => setSuccessModal(null)}>
              Ver meus cupons
            </Button>
          </div>
        </div>
      )}

      {errorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
              <Info size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Saldo Insuficiente</h3>
            <p className="text-gray-600 mb-6">Faltam <strong>{errorModal.needed} EcoPoints</strong> para este resgate. Continue registrando suas ações sustentáveis!</p>
            <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white" size="lg" onClick={() => setErrorModal(null)}>
              Entendido
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
