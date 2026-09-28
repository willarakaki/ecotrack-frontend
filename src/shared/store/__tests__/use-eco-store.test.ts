import { useEcoStore } from "../use-eco-store"

describe("useEcoStore - Zustand Global State", () => {
  // Reseta o estado antes de cada teste
  beforeEach(() => {
    useEcoStore.setState({
      ecoPoints: 50,
      individualCarbonSaved: 24.5,
      companyCarbonSaved: 1.4,
    })
  })

  it("deve inicializar com os valores default corretos", () => {
    const state = useEcoStore.getState()
    expect(state.ecoPoints).toBe(50)
    expect(state.individualCarbonSaved).toBe(24.5)
    expect(state.companyCarbonSaved).toBe(1.4)
  })

  it("deve adicionar EcoPoints e Carbono evitado corretamente", () => {
    const { addEcoPoints } = useEcoStore.getState()
    
    // Simula validação de um bilhete de transporte via Kafka
    addEcoPoints(50, 1.2)
    
    const newState = useEcoStore.getState()
    expect(newState.ecoPoints).toBe(100) // 50 + 50
    expect(newState.individualCarbonSaved).toBe(25.7) // 24.5 + 1.2
  })

  it("deve resgatar recompensa se o saldo for suficiente", () => {
    const { redeemReward } = useEcoStore.getState()
    
    // Resgata o cupom de R$ 20 do Uber (custa 150 pontos - Atualmente temos 50)
    const failResult = redeemReward(150, "Cupom R$ 20 Uber")
    expect(failResult).toBe(false)
    expect(useEcoStore.getState().ecoPoints).toBe(50) // Saldo não pode mudar
    
    // Mock de saldo alto
    useEcoStore.setState({ ecoPoints: 600 })
    
    // Resgata o 1 Day-off (custa 500)
    const successResult = useEcoStore.getState().redeemReward(500, "1 Day-off (Férias Adicionais)")
    expect(successResult).toBe(true)
    expect(useEcoStore.getState().ecoPoints).toBe(100) // 600 - 500 = 100
    
    // Valida se foi salvo na lista
    expect(useEcoStore.getState().redeemedRewards.length).toBe(1)
    expect(useEcoStore.getState().redeemedRewards[0].name).toBe("1 Day-off (Férias Adicionais)")
  })
})
