import { create } from "zustand"

interface EcoStore {
  // Estado
  ecoPoints: number
  individualCarbonSaved: number
  companyCarbonSaved: number
  
  // Ações de Negócio
  addEcoPoints: (points: number, carbon: number) => void
  redeemReward: (cost: number) => boolean
}

export const useEcoStore = create<EcoStore>((set, get) => ({
  // Valores Iniciais (Mock baseados no Figma)
  ecoPoints: 50,
  individualCarbonSaved: 24.5,
  companyCarbonSaved: 1.4, // Toneladas
  
  // Lógica Otimista de Adicionar Pontos (Chamado após sucesso no Kafka)
  addEcoPoints: (points, carbon) => set((state) => ({
    ecoPoints: state.ecoPoints + points,
    individualCarbonSaved: Number((state.individualCarbonSaved + carbon).toFixed(2))
  })),

  // Lógica Otimista de Resgate no Marketplace
  redeemReward: (cost: number) => {
    const currentPoints = get().ecoPoints
    
    if (currentPoints >= cost) {
      set({ ecoPoints: currentPoints - cost })
      return true // Resgate com sucesso
    }
    
    return false // Saldo insuficiente
  }
}))
