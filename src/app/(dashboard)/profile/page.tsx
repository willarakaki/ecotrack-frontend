"use client"

import React, { useState } from "react"
import { User, Mail, Building, Shield, LogOut, Settings, Award, Star, Zap, Coffee } from "lucide-react"
import { Button } from "@/shared/ui/button"
import Link from "next/link"

export default function ProfilePage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  return (
    <div className="flex flex-col p-4 md:p-6 w-full max-w-2xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Meu Perfil</h1>
        <p className="text-sm text-gray-500 mt-1">Gerencie suas informações e preferências.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6 flex items-center gap-6 relative">
        <Link href="/settings" className="absolute top-4 right-4">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-900" title="Configurações">
            <Settings size={20} />
          </Button>
        </Link>
        <div className="relative">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-[#00a859] border-2 border-green-100">
            <User size={40} />
          </div>
          <button 
            className="absolute bottom-0 right-0 bg-white border border-gray-200 shadow-sm p-1 rounded-full text-gray-600 hover:text-[#00a859] transition-colors"
            title="Editar Foto"
            onClick={() => alert("Upload de foto será conectado ao S3 no Backend.")}
          >
            <User size={12} className="m-0.5" />
          </button>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Willian Arakaki</h2>
          <p className="text-sm text-gray-500">willian.arakaki@empresa.com.br</p>
          <div className="inline-flex items-center gap-1 mt-2 bg-green-50 text-[#00a859] px-2 py-1 rounded-md text-xs font-semibold">
            <Building size={12} />
            <span>Engenharia de Software</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-4 flex items-center gap-2">
          <Award size={20} className="text-yellow-500" /> Quadro de Medalhas
        </h3>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-2xl bg-yellow-100 border-2 border-yellow-400 flex items-center justify-center shadow-sm relative">
              <Star size={32} className="text-yellow-500 fill-yellow-500" />
              <div className="absolute -bottom-2 bg-yellow-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-white">NV. 2</div>
            </div>
            <span className="text-xs font-bold text-gray-900 text-center leading-tight">Estrela ESG</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 border-2 border-orange-400 flex items-center justify-center shadow-sm relative">
              <Zap size={32} className="text-orange-500 fill-orange-500" />
            </div>
            <span className="text-xs font-bold text-gray-900 text-center leading-tight">10 Dias de Fogo</span>
          </div>

          <div className="flex flex-col items-center gap-2 opacity-40 grayscale">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 border-2 border-gray-300 flex items-center justify-center">
              <Coffee size={32} className="text-gray-500" />
            </div>
            <span className="text-xs font-bold text-gray-600 text-center leading-tight">Zero Copos</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-8">
        <div 
          className="p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors"
          onClick={() => setNotificationsEnabled(!notificationsEnabled)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg text-gray-600"><Mail size={20} /></div>
            <span className="font-medium text-gray-700">Notificações por E-mail</span>
          </div>
          <div className={`w-12 h-7 rounded-full relative transition-colors ${notificationsEnabled ? 'bg-[#00a859]' : 'bg-gray-300'}`}>
             <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform ${notificationsEnabled ? 'translate-x-6' : 'translate-x-1'}`}></div>
          </div>
        </div>
        
        <div className="p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg text-gray-600"><Shield size={20} /></div>
            <span className="font-medium text-gray-700">Privacidade de Dados</span>
          </div>
        </div>
        
        <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
          <Link href="/login" className="flex items-center gap-3 w-full">
            <div className="p-2 bg-red-50 rounded-lg text-red-500"><LogOut size={20} /></div>
            <span className="font-medium text-red-500">Sair da Conta</span>
          </Link>
        </div>
      </div>
      
      <div className="text-center text-xs text-gray-400">
        <p>EcoTrack AI v1.0.0</p>
        <p>Termos de Uso • Política de Privacidade</p>
      </div>
    </div>
  )
}
