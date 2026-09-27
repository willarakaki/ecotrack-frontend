import React from "react"
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { LoginForm } from "../login-form"

describe("LoginForm Component", () => {
  it("deve renderizar os campos de email e senha, logo e botões", () => {
    render(<LoginForm />)
    
    expect(screen.getByText("EcoTrack AI")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("E-mail Corporativo")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Entrar com o e-mail da Empresa/i })).toBeInTheDocument()
  })

  it("deve alternar a visibilidade da senha ao clicar no ícone do olho", async () => {
    const user = userEvent.setup()
    render(<LoginForm />)
    
    const passwordInput = screen.getByPlaceholderText("Senha") as HTMLInputElement
    expect(passwordInput.type).toBe("password")

    const toggleButton = screen.getByRole("button", { name: "Mostrar senha" })
    
    await user.click(toggleButton)
    expect(passwordInput.type).toBe("text")
    expect(screen.getByRole("button", { name: "Ocultar senha" })).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Ocultar senha" }))
    expect(passwordInput.type).toBe("password")
  })

  it("deve desabilitar o botão e mostrar o estado de loading durante a submissão", async () => {
    const user = userEvent.setup()
    render(<LoginForm />)
    
    const emailInput = screen.getByPlaceholderText("E-mail Corporativo")
    const passwordInput = screen.getByPlaceholderText("Senha")
    const submitButton = screen.getByRole("button", { name: "Entrar" })

    await user.type(emailInput, "willian@ecotrack.ai")
    await user.type(passwordInput, "senha123")
    
    jest.useFakeTimers() // Inicia os timers falsos SOMENTE após o input (que é assíncrono real)
    
    fireEvent.submit(screen.getByRole("button", { name: "Entrar" }))

    expect(submitButton).toBeDisabled()
    expect(screen.getByRole("button", { name: "Validando..." })).toBeInTheDocument()

    // Avança o timer dentro do act para evitar warnings do React
    act(() => {
      jest.advanceTimersByTime(1500)
    })

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
      expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument()
    })
    
    jest.useRealTimers()
  })
})
