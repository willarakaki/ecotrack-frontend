import React from "react"
import { CameraUploader } from "@/domains/activities/ui/camera-uploader"

export default function MobilityPage() {
  return (
    <div className="flex flex-col p-4 md:p-6 w-full max-w-lg mx-auto pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Registrar Mobilidade</h1>
        <p className="text-sm text-gray-500 mt-1">Valide seu transporte sustentável e ganhe pontos.</p>
      </div>

      <CameraUploader />
    </div>
  )
}
