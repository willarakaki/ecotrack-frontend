import React from "react"
import { CameraUploader } from "@/domains/activities/ui/camera-uploader"
import { Recycle } from "lucide-react"

export default function WastePage() {
  return (
    <div className="flex flex-col p-4 md:p-6 w-full max-w-lg mx-auto pb-24">
      <div className="mb-6 flex items-start gap-4">
        <div className="bg-green-50 p-3 rounded-xl text-[#00a859]">
          <Recycle size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Gestão de Resíduos</h1>
          <p className="text-sm text-gray-500 mt-1">
            Valide o descarte correto do seu lixo reciclável ou eletrônico. Tire uma foto do material no ecoponto.
          </p>
        </div>
      </div>

      <CameraUploader activityName="Descarte de Recicláveis" points={3} />
    </div>
  )
}
