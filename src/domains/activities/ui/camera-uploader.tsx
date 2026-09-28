"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, CheckCircle, Ticket, Info, Loader2 } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { useEcoStore } from "@/shared/store/use-eco-store"

type ValidationState = "idle" | "uploading" | "processing" | "success" | "error"

interface CameraUploaderProps {
  activityName?: string;
  points?: number;
}

export function CameraUploader({ activityName = "Sustentável", points = 50 }: CameraUploaderProps = {}) {
  const [state, setState] = useState<ValidationState>("idle")
  const { addEcoPoints } = useEcoStore()
  const router = useRouter()

  const handleSimulateUpload = () => {
    setState("uploading")
    
    // Simula upload do arquivo
    setTimeout(() => {
      setState("processing") // Simula o Post no Kafka (Backend devolveu 202 Accepted)
      
      // Simula o processamento do Gatekeeper Ollama + Gemini 3.5 demorando uns segundos
      setTimeout(() => {
        setState("success")
        addEcoPoints(points, 1.2) // Soma na store global
      }, 3000)
    }, 1000)
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={64} className="text-[#00a859]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Evidência Validada com Sucesso!</h2>
        <p className="text-lg text-[#00a859] font-bold mb-6">+{points} EcoPoints Acumulados</p>
        
        <div className="bg-white border border-gray-200 rounded-xl w-full text-left p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
            <Ticket size={20} className="text-gray-500" />
            <span className="font-semibold text-gray-700">Log de Validação por IA</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Tipo:</span><span className="font-medium text-right max-w-[200px]">{activityName}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Data:</span><span className="font-medium">Hoje</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Fraude:</span><span className="font-medium text-[#00a859]">Não Detectada</span></div>
          </div>
        </div>

        <Button className="w-full" size="lg" onClick={() => router.push("/marketplace")}>
          Ir para o Marketplace de Benefícios
        </Button>
        <Button variant="ghost" className="w-full mt-2" onClick={() => router.push("/home")}>
          Voltar para o início
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {state === "idle" && (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
          <div className="bg-white p-4 rounded-full shadow-sm mb-4">
            <Ticket size={48} className="text-gray-600" />
          </div>
          <h3 className="font-bold text-lg text-gray-900 mb-2">Como Pontuar:</h3>
          <p className="text-gray-600 text-sm mb-4">
            Tire uma foto nítida do seu bilhete unitário, nota fiscal ou ticket de transporte público.
          </p>
          <p className="text-[#00a859] font-medium text-sm">Nossa IA validará a autenticidade.</p>
        </div>
      )}

      {state === "processing" && (
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
          {/* Mock do ticket sendo escaneado */}
          <div className="w-48 h-64 bg-white border border-gray-200 rounded-lg shadow-sm relative overflow-hidden flex flex-col items-center pt-8">
            <div className="w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center font-bold text-xl mb-4">M</div>
            <p className="text-xs font-bold">METRÔ SP</p>
            <p className="text-[10px] text-gray-500 mb-4">SISTEMA DE TRANSPORTE</p>
            <div className="w-3/4 border-t border-gray-300 mb-4"></div>
            <p className="text-xs font-bold mb-8">BILHETE UNITÁRIO</p>
            <div className="w-24 h-24 bg-gray-200"></div> {/* QR Code placeholder */}
            
            {/* Scanner line animada */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#00a859] shadow-[0_0_15px_rgba(0,168,89,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
      )}

      {state === "idle" && (
        <>
          <div className="relative w-full">
            <input 
              type="file" 
              accept="image/*,application/pdf" 
              capture="environment"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleSimulateUpload()
                }
              }}
              aria-label="Fazer upload de comprovante"
            />
            <Button size="lg" className="w-full text-base relative pointer-events-none z-0">
              <Camera className="mr-2" size={20} />
              Enviar Comprovante ou Print
            </Button>
          </div>

          <div className="bg-gray-100 rounded-xl p-4 flex gap-3 text-gray-600 text-xs">
            <Info size={16} className="flex-shrink-0 mt-0.5" />
            <p>Aceitamos foto de ticket físico, prints de apps de transporte (TOP, Uber, etc.) ou o extrato do seu cartão de transporte.</p>
          </div>
        </>
      )}

      {state === "processing" && (
        <Button size="lg" className="w-full bg-gray-200 text-gray-700 hover:bg-gray-200 cursor-wait">
          <Loader2 className="mr-2 animate-spin" size={20} />
          Processando Validação por IA...
        </Button>
      )}
    </div>
  )
}
