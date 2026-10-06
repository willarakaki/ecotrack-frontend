import React from "react"
import { Shield, Lock, Palette, Globe, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/shared/ui/button"

export default function SettingsPage() {
  return (
    <div className="flex flex-col p-4 md:p-6 w-full max-w-2xl mx-auto pb-24">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900">
            <ChevronLeft size={24} />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Configurações</h1>
          <p className="text-sm text-gray-500 mt-1">Ajuste as preferências da sua conta.</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        
        {/* Seção: Conta */}
        <div className="bg-white border border-gray-200 rounded-2xl p-2 shadow-sm overflow-hidden">
          <div className="px-4 py-3 text-sm font-bold text-gray-900 bg-gray-50 border-b border-gray-100 uppercase tracking-wider">
            Sua Conta
          </div>
          
          <div className="p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg text-gray-600"><Lock size={20} /></div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-700">Alterar Senha</span>
                <span className="text-xs text-gray-400">Atualizado há 3 meses</span>
              </div>
            </div>
          </div>

          <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg text-gray-600"><Shield size={20} /></div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-700">Autenticação de 2 Fatores</span>
                <span className="text-xs text-green-500 font-medium">Ativado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Seção: Preferências */}
        <div className="bg-white border border-gray-200 rounded-2xl p-2 shadow-sm overflow-hidden">
          <div className="px-4 py-3 text-sm font-bold text-gray-900 bg-gray-50 border-b border-gray-100 uppercase tracking-wider">
            Preferências do App
          </div>
          
          <div className="p-4 border-b border-gray-100 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg text-gray-600"><Globe size={20} /></div>
              <span className="font-medium text-gray-700">Idioma</span>
            </div>
            <span className="text-sm text-gray-500 font-medium">Português (BR)</span>
          </div>

          <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg text-gray-600"><Palette size={20} /></div>
              <span className="font-medium text-gray-700">Tema Visual</span>
            </div>
            <span className="text-sm text-gray-500 font-medium">Claro</span>
          </div>
        </div>
        
      </div>
      
    </div>
  )
}
