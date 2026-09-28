import React from "react"
import { render, screen, act, fireEvent } from "@testing-library/react"
import { CopilotWidget } from "../copilot-widget"

// Mock do react-markdown pois ele é um módulo ESM nativo e conflita com o ambiente CommonJS do Jest
jest.mock("react-markdown", () => {
  return function MockReactMarkdown({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>
  }
})

// Mock do scrollIntoView que não existe nativamente no JSDOM
window.HTMLElement.prototype.scrollIntoView = jest.fn()

describe("CopilotWidget Component", () => {
  it("deve iniciar fechado e abrir ao clicar no botão flutuante", () => {
    render(<CopilotWidget />)
    
    // O botão de abrir está presente (usando o aria-label)
    const openButton = screen.getByLabelText("Abrir Copiloto IA")
    expect(openButton).toBeInTheDocument()
    
    // O chat NÃO deve estar visível ainda
    expect(screen.queryByText("EcoTrack AI Copilot")).not.toBeInTheDocument()
    
    // Clica para abrir
    fireEvent.click(openButton)
    
    // O chat agora está visível
    expect(screen.getByText("EcoTrack AI Copilot")).toBeInTheDocument()
    expect(screen.getByText(/Sou seu Copiloto de Sustentabilidade/i)).toBeInTheDocument()
  })

  it("deve enviar mensagem do usuário e simular resposta da IA", () => {
    jest.useFakeTimers()
    render(<CopilotWidget />)
    
    // Abre o chat
    fireEvent.click(screen.getByLabelText("Abrir Copiloto IA"))
    
    const input = screen.getByPlaceholderText(/Pergunte sobre seu impacto/i)
    const sendButton = screen.getAllByRole("button").find(b => b.querySelector(".lucide-send"))! // Pega o botão com icone de Send
    
    // Digita a mensagem e envia
    fireEvent.change(input, { target: { value: "Como reduzo meu carbono?" } })
    fireEvent.click(sendButton)
    
    // Verifica se a mensagem do usuário apareceu
    expect(screen.getByText("Como reduzo meu carbono?")).toBeInTheDocument()
    
    // O input deve ter limpado
    expect(input).toHaveValue("")
    
    // Avança o timer do mock da API (1800ms)
    act(() => {
      jest.advanceTimersByTime(2000)
    })
    
    // A resposta da IA deve aparecer renderizada pelo markdown
    // O texto contém "metrô por apenas" (ReactMarkdown renderiza texto)
    expect(screen.getByText(/trocar o transporte individual pelo metrô/i)).toBeInTheDocument()
    
    jest.useRealTimers()
  })
})
