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
    useEcoStore.setState({ ecoPoints: 1495, individualCarbonSaved: 24.5 })
  })

  it("deve iniciar no estado idle e mudar para processing ao enviar o ticket", () => {
    jest.useFakeTimers()
    render(<CameraUploader />)
    
    expect(screen.getByText(/Tire uma foto nítida/i)).toBeInTheDocument()
    const fileInput = screen.getByLabelText(/Fazer upload de comprovante/i)
    
    // Simula a seleção de um arquivo
    fireEvent.change(fileInput, { target: { files: [new File(['(⌐□_□)'], 'ticket.png', { type: 'image/png' })] } })
    
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    
    expect(screen.getByRole("button", { name: /Processando Validação por IA/i })).toBeInTheDocument()
    expect(screen.getByText("METRÔ SP")).toBeInTheDocument()
    
    jest.useRealTimers()
  })

  it("deve finalizar o processo e adicionar pontos na store do Zustand", async () => {
    jest.useFakeTimers()
    render(<CameraUploader />)
    
    const fileInput = screen.getByLabelText(/Fazer upload de comprovante/i)
    fireEvent.change(fileInput, { target: { files: [new File(['test'], 'test.jpg', { type: 'image/jpeg' })] } })
    
    act(() => {
      jest.advanceTimersByTime(4500)
    })
    
    await waitFor(() => {
      expect(screen.getByText("Evidência Validada com Sucesso!")).toBeInTheDocument()
    })
    
    expect(screen.getByText("Não Detectada")).toBeInTheDocument()
    expect(useEcoStore.getState().ecoPoints).toBe(1545) // 1495 + 50 (default props points=50 no teste)
    
    jest.useRealTimers()
  })
})
