import { create } from "zustand"

export interface RedeemedReward {
  id: string
  name: string
  date: string
}

export interface FeedItem {
  id: string
  author: string
  receiver?: string
  content: string
  tag?: string
  likes: number
  isLikedByMe?: boolean
  date: string
}

interface EcoStore {
  ecoPoints: number
  individualCarbonSaved: number
  companyCarbonSaved: number
  redeemedRewards: RedeemedReward[]
  feed: FeedItem[]
  activeGoal: { name: string; cost: number } | null
  dailyQuizCompleted: boolean
  
  addEcoPoints: (points: number, carbon: number, activityName: string) => void
  redeemReward: (cost: number, rewardName: string) => boolean
  setActiveGoal: (name: string, cost: number) => void
  sendPeerPraise: (receiver: string, points: number, message: string, tag: string) => boolean
  toggleLikeFeedItem: (id: string) => void
  completeDailyQuiz: (points: number) => void
}

export const useEcoStore = create<EcoStore>((set, get) => ({
  ecoPoints: 1495,
  individualCarbonSaved: 24.5,
  companyCarbonSaved: 1.4,
  redeemedRewards: [],
  activeGoal: null,
  dailyQuizCompleted: false,
  feed: [
    {
      id: "1",
      author: "Sistema EcoTrack",
      content: "Bem-vindo ao novo Mural Sustentável e de Reconhecimento!",
      tag: "#Inovação",
      likes: 5,
      isLikedByMe: false,
      date: "Hoje"
    }
  ],
  
  addEcoPoints: (points, carbon, activityName) => set((state) => {
    const newFeedItem: FeedItem = {
      id: Date.now().toString(),
      author: "Você",
      content: `Registrou uma ação de sustentabilidade: ${activityName} e ganhou ${points} EcoPoints!`,
      tag: "#Sustentabilidade",
      likes: 0,
      isLikedByMe: false,
      date: "Agora"
    }
    return {
      ecoPoints: state.ecoPoints + points,
      individualCarbonSaved: Number((state.individualCarbonSaved + carbon).toFixed(2)),
      feed: [newFeedItem, ...state.feed]
    }
  }),

  redeemReward: (cost: number, rewardName: string) => {
    const currentPoints = get().ecoPoints
    
    if (currentPoints >= cost) {
      const newFeedItem: FeedItem = {
        id: Date.now().toString(),
        author: "Você",
        content: `Resgatou a recompensa: ${rewardName}!`,
        tag: "#Reconhecimento",
        likes: 0,
        isLikedByMe: false,
        date: "Agora"
      }
      set({ 
        ecoPoints: currentPoints - cost,
        redeemedRewards: [
          { id: Date.now().toString(), name: rewardName, date: new Date().toLocaleDateString("pt-BR") },
          ...get().redeemedRewards
        ],
        feed: [newFeedItem, ...get().feed],
        activeGoal: get().activeGoal?.name === rewardName ? null : get().activeGoal
      })
      return true
    }
    
    return false
  },

  setActiveGoal: (name, cost) => set({ activeGoal: { name, cost } }),

  sendPeerPraise: (receiver, points, message, tag) => {
    const currentPoints = get().ecoPoints
    if (currentPoints >= points) {
      const newFeedItem: FeedItem = {
        id: Date.now().toString(),
        author: "Você",
        receiver: receiver,
        content: message,
        tag: tag,
        likes: 0,
        isLikedByMe: false,
        date: "Agora"
      }
      set({
        ecoPoints: currentPoints - points,
        feed: [newFeedItem, ...get().feed]
      })
      return true
    }
    return false
  },

  toggleLikeFeedItem: (id) => set((state) => ({
    feed: state.feed.map(item => {
      if (item.id === id) {
        if (item.isLikedByMe) {
          return { ...item, likes: item.likes - 1, isLikedByMe: false }
        } else {
          return { ...item, likes: item.likes + 1, isLikedByMe: true }
        }
      }
      return item
    })
  })),

  completeDailyQuiz: (points) => {
    if (!get().dailyQuizCompleted) {
      set({ dailyQuizCompleted: true })
      get().addEcoPoints(points, 0, "Quiz Diário")
    }
  }
}))
