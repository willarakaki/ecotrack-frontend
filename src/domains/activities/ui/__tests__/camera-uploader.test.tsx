import React from "react"
import { render, screen, waitFor, act, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CameraUploader } from "../camera-uploader"
import { useEcoStore } from "@/shared/store/use-eco-store"

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe("CameraUploader Component", () => {
  beforeEach(() => {
    // Reset Zustand state
    useEcoStore.setState({ ecoPoints: 50, individualCarbonSaved: 24.5 })
  })

  it("deve iniciar no estado idle e mudar para processing ao enviar o ticket", () => {
    jest.useFakeTimers()
    render(<CameraUploader />)
    
    expect(screen.getByText(/Tire uma foto nítida/i)).toBeInTheDocument()
    const sendButton = screen.getByRole("button", { name: /Enviar Comprovante/i })
    
    fireEvent.click(sendButton)
    
    // O mock tem setTimeout(..., 1000) para ir pro processing
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    expect(screen.getByRole("button", { name: /Processando Validação por IA/i })).toBeInTheDocument()
    expect(screen.getByText("METRÔ SP")).toBeInTheDocument() // UI mockada do ticket
    
    jest.useRealTimers()
  })

  it("deve finalizar o processo e adicionar pontos na store do Zustand", async () => {
    jest.useFakeTimers()
    render(<CameraUploader />)
    
    const sendBtn = screen.getByRole("button", { name: /Enviar Comprovante/i })
    fireEvent.click(sendBtn)
    
    // Avança 1s (vai para processing) + 3s (vai para success)
    act(() => {
      jest.advanceTimersByTime(4500)
    })
    
    await waitFor(() => {
      expect(screen.getByText("Evidência Validada com Sucesso!")).toBeInTheDocument()
    })
    
    expect(screen.getByText("Não Detectada")).toBeInTheDocument()
    expect(useEcoStore.getState().ecoPoints).toBe(100)
    
    jest.useRealTimers()
  })
})
