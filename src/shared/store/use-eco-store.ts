import { create } from "zustand"

export interface RedeemedReward {
  id: string
  name: string
  date: string
}

interface EcoStore {
  ecoPoints: number
  individualCarbonSaved: number
  companyCarbonSaved: number
  redeemedRewards: RedeemedReward[]
  
  addEcoPoints: (points: number, carbon: number) => void
  redeemReward: (cost: number, rewardName: string) => boolean
}

export const useEcoStore = create<EcoStore>((set, get) => ({
  ecoPoints: 50,
  individualCarbonSaved: 24.5,
  companyCarbonSaved: 1.4,
  redeemedRewards: [],
  
  addEcoPoints: (points, carbon) => set((state) => ({
    ecoPoints: state.ecoPoints + points,
    individualCarbonSaved: Number((state.individualCarbonSaved + carbon).toFixed(2))
  })),

  redeemReward: (cost: number, rewardName: string) => {
    const currentPoints = get().ecoPoints
    
    if (currentPoints >= cost) {
      set({ 
        ecoPoints: currentPoints - cost,
        redeemedRewards: [
          { id: Date.now().toString(), name: rewardName, date: new Date().toLocaleDateString("pt-BR") },
          ...get().redeemedRewards
        ]
      })
      return true
    }
    
    return false
  }
}))
