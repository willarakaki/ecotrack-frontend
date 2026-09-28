"use client"

import React from "react"
import { Target, Zap, Gift, Trophy, Lock } from "lucide-react"
import { Button } from "@/shared/ui/button"

export default function ChallengesPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 w-full max-w-2xl mx-auto pb-24">
      
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Missões Diárias</h1>
        <p className="text-sm text-gray-500">Complete tarefas para ganhar baús e bônus!</p>
      </div>

      {/* Missões Diárias */}
      <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm flex flex-col gap-6">
        
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-orange-100 rounded-2xl border-2 border-orange-200 flex items-center justify-center">
            <Zap size={28} className="text-orange-500 fill-orange-500" />
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-gray-900">Ganhe 50 pts hoje</span>
              <span className="text-sm font-bold text-gray-400">15 / 50</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div className="bg-orange-400 h-3 rounded-full w-[30%]"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-green-100 rounded-2xl border-2 border-green-200 flex items-center justify-center">
            <Target size={28} className="text-[#00a859]" />
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-gray-900">Envie 1 Reconhecimento</span>
              <span className="text-sm font-bold text-[#00a859]">Concluído</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div className="bg-[#00a859] h-3 rounded-full w-full"></div>
            </div>
          </div>
        </div>

      </div>

      <div className="flex flex-col gap-2 mt-4">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <Trophy size={20} className="text-yellow-500" /> Desafios Mensais
        </h2>
      </div>

      {/* Desafios Mensais (Travados) */}
      <div className="flex flex-col gap-3">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between opacity-60 grayscale">
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-3 rounded-xl">
              <Lock size={24} className="text-gray-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900">Mês do Plástico Zero</span>
              <span className="text-xs text-gray-500">Desbloqueia em 3 dias</span>
            </div>
          </div>
          <Gift size={24} className="text-gray-300" />
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between opacity-60 grayscale">
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-3 rounded-xl">
              <Lock size={24} className="text-gray-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900">Maratona de Bike</span>
              <span className="text-xs text-gray-500">Nível 5 necessário</span>
            </div>
          </div>
          <Gift size={24} className="text-gray-300" />
        </div>
      </div>
      
    </div>
  )
}
