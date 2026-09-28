import React from "react"
import Link from "next/link"
import { Train, Recycle, Plug, ChevronRight } from "lucide-react"

export default function ActivitiesPage() {
  const activities = [
    {
      id: "mobility",
      title: "Mobilidade Urbana (Escopo 3)",
      description: "Ganhe até 50 EcoPoints por bilhete validado",
      icon: Train,
      link: "/activities/mobility"
    },
    {
      id: "waste",
      title: "Gestão de Resíduos",
      description: "Ganhe até 30 EcoPoints por descarte correto",
      icon: Recycle,
      link: "#"
    },
    {
      id: "energy",
      title: "Home Office Sustentável",
      description: "Valide sua economia de energia",
      icon: Plug,
      link: "#"
    }
  ]

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 w-full max-w-4xl mx-auto pb-24">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Atividades Disponíveis</h1>
        <p className="text-sm text-gray-500 mt-1">Selecione uma categoria para registrar sua ação</p>
      </div>

      <div className="flex flex-col gap-4">
        {activities.map((activity) => (
          <Link href={activity.link} key={activity.id} className="block">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:border-[#00a859] hover:shadow-md transition-all group">
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-4 rounded-xl text-gray-600 group-hover:bg-green-50 group-hover:text-[#00a859] transition-colors">
                  <activity.icon size={32} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{activity.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                </div>
              </div>
              <ChevronRight size={24} className="text-gray-400 group-hover:text-[#00a859] transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
