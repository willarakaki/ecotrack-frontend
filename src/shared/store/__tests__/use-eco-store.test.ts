import { useEcoStore } from "../use-eco-store"

describe("useEcoStore - Zustand Global State", () => {
  // Reseta o estado antes de cada teste
  beforeEach(() => {
    useEcoStore.setState({
      ecoPoints: 1495,
      individualCarbonSaved: 24.5,
      companyCarbonSaved: 1.4,
      redeemedRewards: []
    })
  })

  it("deve inicializar com os valores default corretos", () => {
    const state = useEcoStore.getState()
    expect(state.ecoPoints).toBe(1495)
    expect(state.individualCarbonSaved).toBe(24.5)
    expect(state.companyCarbonSaved).toBe(1.4)
  })

  it("deve adicionar EcoPoints e Carbono evitado corretamente", () => {
    const { addEcoPoints } = useEcoStore.getState()
    
    // Simula validação de um bilhete de transporte via Kafka
    addEcoPoints(5, 1.2, "Teste")
    
    const newState = useEcoStore.getState()
    expect(newState.ecoPoints).toBe(1500) // 1495 + 5
    expect(newState.individualCarbonSaved).toBe(25.7) // 24.5 + 1.2
  })

  it("deve resgatar recompensa se o saldo for suficiente", () => {
    const { redeemReward } = useEcoStore.getState()
    
    // Resgata o cupom do Uber (custa 2000 pontos - Atualmente temos 1495)
    const failResult = redeemReward(2000, "Cupom R$ 20 Uber")
    expect(failResult).toBe(false)
    expect(useEcoStore.getState().ecoPoints).toBe(1495) // Saldo não pode mudar
    
    // Resgata iFood que custa 1500 mas só temos 1495
    const failIfood = redeemReward(1500, "iFood")
    expect(failIfood).toBe(false)
    
    // Adicionamos 5 pontos simulando 1 bilhete validado
    useEcoStore.getState().addEcoPoints(5, 0, "Teste")
    
    // Agora resgata o iFood com 1500 pontos exatos
    const successResult = useEcoStore.getState().redeemReward(1500, "Cupom R$ 15 iFood")
    expect(successResult).toBe(true)
    expect(useEcoStore.getState().ecoPoints).toBe(0) // 1500 - 1500 = 0
    
    // Valida se foi salvo na lista
    expect(useEcoStore.getState().redeemedRewards.length).toBe(1)
    expect(useEcoStore.getState().redeemedRewards[0].name).toBe("Cupom R$ 15 iFood")
  })
})
