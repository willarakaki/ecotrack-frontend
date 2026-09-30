"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { useEcoStore } from "@/shared/store/use-eco-store"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email")
    const password = formData.get("password")

    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      if (!res.ok) {
        throw new Error("E-mail ou senha incorretos.")
      }

      const data = await res.json()
      
      localStorage.setItem("user-id", data.userId)
      localStorage.setItem("tenant-id", data.tenantId)
      localStorage.setItem("user-name", data.name)

      useEcoStore.getState().setUserStats(data.ecoCoins, data.totalCo2Saved)
      
      if (data.role === 'ADMIN_RH') { router.push('/admin/dashboard') } else { router.push('/home') }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center px-4">
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="mb-4">
          <Image src="/logo.png" alt="EcoTrack AI Logo" width={100} height={100} priority className="object-contain" unoptimized />
        </div>
        <p className="text-gray-600 mt-2 text-sm max-w-[280px]">
          Inteligencia que transforma acoes em impacto positivo.
        </p>
      </div>

      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        {error && <div className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded">{error}</div>}
        <Input 
          type="email" 
          name="email"
          placeholder="E-mail Corporativo" 
          icon={<Mail size={20} />}
          required
        />
        
        <Input 
          type={showPassword ? "text" : "password"} 
          name="password"
          placeholder="Senha" 
          icon={<Lock size={20} />}
          rightElement={
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="hover:text-gray-700 transition-colors focus:outline-none"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          }
          required
        />

        <div className="flex justify-end w-full">
          <a href="#" className="text-sm text-gray-600 hover:text-[#00a859] underline-offset-4 hover:underline transition-colors">
            Esqueci minha senha
          </a>
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 text-base font-semibold" 
          disabled={isLoading}
        >
          {isLoading ? "Entrando..." : "Entrar na Plataforma"}
        </Button>
      </form>

      <div className="mt-8 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} EcoTrack AI. Todos os direitos reservados.
      </div>
    </div>
  )
}



