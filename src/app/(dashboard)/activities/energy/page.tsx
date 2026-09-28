import React from "react"
import { CameraUploader } from "@/domains/activities/ui/camera-uploader"
import { Plug } from "lucide-react"

export default function EnergyPage() {
  return (
    <div className="flex flex-col p-4 md:p-6 w-full max-w-lg mx-auto pb-24">
      <div className="mb-6 flex items-start gap-4">
        <div className="bg-green-50 p-3 rounded-xl text-[#00a859]">
          <Plug size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Home Office</h1>
          <p className="text-sm text-gray-500 mt-1">
            Faça upload da sua conta de luz comprovando uso de fontes renováveis ou redução de consumo.
          </p>
        </div>
      </div>

      <CameraUploader activityName="Uso de Fontes Renováveis" points={10} />
    </div>
  )
}
